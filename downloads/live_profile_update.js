// Name Change Profile Update
// first_name or last_name changes
(function executeRule(current, previous /*null when async*/) {
	
	// PRB666963
	// This business rule is being used to update the live_profile record
	// for a user if their first or last name changes. When a sys_user record
	// is updated it runs a query against the live_profile table to match the
	// document field with the sys ID of the user and then updates the name
	// field of the live_profile record with the name value from the sys_user
	// record.	
	
	var userLiveProfile = new GlideRecord("live_profile");
	userLiveProfile.addQuery("document", current.sys_id);
	userLiveProfile.query();
	if (userLiveProfile.next()) {
		userLiveProfile.name = current.name;
		userLiveProfile.update();
	}
})(current, previous);

// Update live_profile with sys_user
/// name changes
(function executeRule(current, previous /*null when async*/) {
	if (current.name != previous.name) {
		var sysUser = new GlideRecord("sys_user");
		sysUser.addQuery("table", "sys_user");
		sysUser.addQuery("sys_id", current.sys_id);
		sysUser.query();
		
		var liveProfile = new GlideRecord("live_profile");
		liveProfile.addQuery("document", current.sys_id);
		liveProfile.query();
		
		if(sysUser.next() && liveProfile.next()) {
			liveProfile.name = sysUser.name;
			liveProfile.update();	
		}
	}

})(current, previous);

bb18915bdb893340b53f341f7c96196f


var sys_id = "9944fdc4db6c7700b53f341f7c961997";
var sysUser = new GlideRecord("sys_user");
sysUser.addQuery("sys_id", sys_id);
sysUser.query();
var liveProfile = new GlideRecord("live_profile");
liveProfile.addQuery("document", sys_id);
liveProfile.query();
var result = { profileFound: liveProfile.next(), userFound: sysUser.next() };
if (result.userFound) {
    if (gs.nil(sysUser.photo))
        result.userPhoto = "nil";
    else
    result.userPhoto = sysUser.getDisplayValue('photo');
}
if (result.profileFound) {
    if (gs.nil(liveProfile.photo))
        result.profilePhoto = "nil";
    else
        result.profilePhoto = liveProfile.getDisplayValue('photo');
}
gs.info(JSON.stringify(result));






// User VIP Changed

(function executeRule(current, previous /*null when async*/) {
	var gr = new GlideRecord('u_caller_vip_lookup_rules');
    gr.addQuery('u_caller', current.sys_id);
    gr.query();
    if (gr.next()) {
        gr.setValue('u_vip_priority', current.vip);
        gr.update();
    } else {

    }
    
	gr = new GlideRecord('incident');
	gr.addActiveQuery();
    gr.addQuery('caller_id', current.sys_id);
    gr.addQuery('u_vip_priority', !current.vip);
	var lookups = [null, null, null];
	while (gr.next()) {
		gr.u_vip_priority = current.vip;
		var impact = gr.getValue('impact');
		var urgency = gr.getValue('urgency');
		if (impact > 0 && impact < 4 && urgency > 0 && urgency < 4) {
			var arr;
			if (gs.nil(lookups[impact]))
				lookups[impact] = arr = [null, null, null];
			else
				arr = lookups[impact];
			var a;
			if (gs.nil(arr[urgency]))
				arr[urgency] = a = [null, null];
			else
				a = arr[urgency];
			var i = (gr.getValue('u_is_mission_related')) ? 1 : 0;
            if (gs.nil(a[i]))
                a[i] = arr = [null, null];
            else
                arr = a[i];
            i = (current.vip) ? 1 : 0;
            if (gs.nil(arr[i])) {
                var p = new GlideRecord('u_vip_priority_lookup_matcher_rules');
                p.addActiveQuery();
                p.addQuery('u_impact', gr.impact);
                p.addQuery('u_urgency', gr.urgency);
                p.addQuery('u_is_mission_related', gr.getValue('u_is_mission_related'));
                p.addQuery('u_vip_priority', current.vip);
                p.query();
                if (p.next())
                    arr[i] = i = p.getValue('u_incident_priority');
                else
                    arr[i] = i = 0;
            } else
                i = arr[i];
            if (i > 0)
                gr.setValue('priority', i);
        }
        gr.update();
	}
})(current, previous);