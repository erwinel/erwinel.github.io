# Service Catalog Cheat Sheet

## Catalog Client Scripts

### Set field value from another refrence field

This example sets the `location` field to the location of a selected user.

```javascript
function onChange(control, oldValue, newValue, isLoading) {
    var locationDetails = g_form.getReference("requested_for", setFields);
}

function setFields(sys_user) {
    g_form.setValue("location", sys_user.location);
}
```

### Set field value from another Multiple Choice field

This example sets the `os_name` field to the text value of the selection of the `operating_system` field.

```javascript
function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || newValue == "")
        return;

    var opt = g_form.getOption("operating_system", newValue);
    if (opt != null) {
        var s = "" + opt.text;
        if ((s = s.trim()).length > 0) g_form.setValue("os_name", s);
        else if (newValue != "other") g_form.setValue("os_name", newValue);
    }
}
```

### Set fields to current fiscal year and quarter

```javascript
function onLoad() {
    if (g_form.getValue("fiscal_year") || g_form.getValue("fiscal_quarter"))
        return;
    var date = new Date();
    var monthZ = date.getMonth() - 1;
    var year = parseInt(date.getFullYear());
    var quarter;
    if (monthZ > 8) {
        g_form.setValue("fiscal_year", year + 1);
        g_form.setValue("fiscal_quarter", 1);
    } else {
        g_form.setValue("fiscal_year", year);
        g_form.setValue("fiscal_quarter", (monthZ - (monthZ % 3)) / 3 + 2);
    }
}
```

### Set field placeholder if empty

```javascript
function onChange(control, oldValue, newValue, isLoading) {
    if (newValue == "" && !isLoading)
        name.placeholder = getMessage("Enter a name for this Export Set");
}
```

### Server-side API call

```javascript
function onLoad() {
    //Deactivated due to JAD Session with Chief Corbitt. The Requested for in rare circumstances can be a contractor.
    var submitter = g_user.userID;

    var ga = new GlideAjax("USM157aClientUtils");
    ga.addParam("sysparm_name", "requireRequestor");
    ga.addParam("sysparm_submitter", submitter);
    ga.getXML(requireRequestor);
}
function requireRequestor(response) {
    var answer = response.responseXML.documentElement.getAttribute("answer");
    if (answer == "Mandatory") {
        g_form.setMandatory("u_requested_for", true);
    }
}
```
