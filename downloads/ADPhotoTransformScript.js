(function runTransformScript(source, map, log, target /*undefined onStart*/ ) {
	//gs.log('User Photo Script: Check for Existing Attachment', 'Active Directory');
	var grPhotoAttachmentExists = new GlideRecord('sys_attachment');
	grPhotoAttachmentExists.addQuery('table_name','ZZ_YYsys_user');
	grPhotoAttachmentExists.addQuery('table_sys_id',target.sys_id);
	grPhotoAttachmentExists.addQuery('file_name','photo');
	grPhotoAttachmentExists.query();
	if (source.u_thumbnailphoto != '') {
		//gs.log('User Photo Script: LDAP Source Photo Exists', 'Active Directory');
		if (!grPhotoAttachmentExists.next()) {
			//gs.log('User Photo Script: No existing photo attachment, attaching new photo', 'Active Directory');
			attachPhoto();
		} else {
			//gs.log('User Photo Script: Photo Attachment Exists, Compare Attachments', 'Active Directory');
			var sysEncodedAttachment = new GlideSysAttachment();
			var binData =sysEncodedAttachment.getBytes(grPhotoAttachmentExists);
			var EncodedBytes = GlideStringUtil.base64Encode(binData);
			//gs.log('User Photo Script: sys_updated_by is ' + grPhotoAttachmentExists.sys_updated_by, 'Active Directory');
			if (EncodedBytes != source.u_thumbnailphoto && grPhotoAttachmentExists.sys_updated_by == 'admin') {
				//gs.log('User Photo Script: Photo attachment exists, bytes does not match, delete existing attachment and attaching new photo', 'Active Directory');
				grPhotoAttachmentExists.deleteRecord();
				attachPhoto();
			} else {
				//gs.log('User Photo Script: Image has not changed or a personal Profile Photo attachment exists. Not updating from system', 'Active Directory');
			}
		}
	} else {
		//gs.log('User Photo Script: AD Source Photo Does Not Exist', 'Active Directory');
		if (grPhotoAttachmentExists.next()) {
			//gs.log('User Photo Script: Deleting existing photo attachment', 'Active Directory');
			grPhotoAttachmentExists.deleteRecord();
		}
	}
	
	function attachPhoto(){
		//gs.log('User Photo Script: Attach Photo', 'Active Directory');
		var sysDecodedAttachment = new GlideSysAttachment();
		var DecodedBytes = GlideStringUtil.base64DecodeAsBytes(source.u_thumbnailphoto);
		var attID = sysDecodedAttachment.write(target, 'photo', 'image/jpeg', DecodedBytes);
		var newAttachment = new GlideRecord("sys_attachment");
		newAttachment.addQuery("sys_id", attID);
		newAttachment.query();
		if (newAttachment.next()) {
			newAttachment.table_name = "ZZ_YYsys_user";
			newAttachment.table_sys_id = target.sys_id;
			newAttachment.content_type = 'image/jpeg';
			newAttachment.update();
		}
	}
	
})(source, map, log, target);