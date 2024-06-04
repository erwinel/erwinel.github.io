# Record Producer: Create Incident

Create an Incident record to report and request assistance with an issue you are having (USMS version)

**Description:**

```html
<p style="margin: 0px;"><span style="color: #808080; font-family: arial,helvetica,sans-serif; font-size: medium;">Request assistance with an issue you are having. An incident record will be created and managed through to successful resolution. You will also be notified of progress.</span></p>
```

**Redirect To:** Generated task record

**Script:**

```javascript
var isMobile = GlideMobileExtensions.getDeviceType() == 'm';
var link = isMobile ? '#/!list/incident/q:active=true%5Ecaller_id=javascript:gs.user_id()%5EEQ' : 'home.do';

var linkLbl = isMobile ? "List" : "Homepage";
var br = '<br/>';
var linkURL = '<a href="' + link + '">' + gs.getMessage(linkLbl) + '</a>';
var msgArgs = [br, linkURL];

var info = gs.getMessage("This incident was opened on your behalf{0}The IT department will contact you if they need any further information{0}You can track status from this {1} {0}", msgArgs);

gs.addInfoMessage(info);
var caller = gs.getUserID();
var parent_table = RP.getParameterValue('sysparm_parent_table');
if (JSUtil.notNil(parent_table)) {
    var parent_map = new GlideRecord('request_parent_mapping');
    parent_map.addQuery('parent_table', parent_table);
    parent_map.query();
    if (parent_map.next())
        var requested_for_field = parent_map.getValue('requested_for_field');
    var parentGR = new GlideRecord(parent_table);
    parentGR.addQuery('sys_id', RP.getParameterValue('sysparm_parent_sys_id'));
    parentGR.query();
    if (parentGR.next())
        caller = parentGR.getValue(requested_for_field);
}
current.contact_type = 'self-service';
if (current.caller_id.nil())
    current.caller_id = caller;
if (producer.comments.length > 80)
    current.short_description = producer.comments.substring(0, 79);
else
    current.short_description = producer.comments;
current.description = producer.comments;
if (current.category.nil()) {
    var value = current.category.getED().getDefault();
    if (!gs.nil(value)) {
        current.setValue('category', value);
        value = current.subcategory.getED().getDefault();
        if (!gs.nil(value))
            current.setValue('subcategory', value);
    }
}
if (current.urgency.nil()) {
    var value = current.urgency.getED().getDefault();
    if (!gs.nil(value))
        current.setValue('urgency', value);
}

var incRPUtil = new LinkRecordProducerToIncident();
incRPUtil.linkRecordProducerToParentIncident(RP.getParameterValue('sysparm_parent_sys_id'), current);
```

## Variables

| Order | Name                   | Question                         | Mandatory | Type                                                       |
|------ |------------------------|----------------------------------|-----------|------------------------------------------------------------|
| 100   | comments               | Please describe your issue below | true      | Multi Line Text                                            |
| 200   | container1_start       |                                  |           | Container Start (2 Columns Wide, one side, then the other) |
| 300   | network                | Associated Network               | true      | Reference                                                  |
| 400   | network_not_applicable | Network not applicable           | false     | CheckBox                                                   |
| 500   | container1_split       |                                  |           | Container Split                                            |
| 600   | location               | Site                             | true      | Reference                                                  |
| 700   | urgency                | Urgency                          | true      | Select Box                                                 |
| 800   | container1_end         |                                  |           | Container End                                              |
| 900   | container2_start       |                                  |           | Container Start (2 Columns Wide, one side, then the other) |
| 1000  | category               | Category                         | false     | Lookup Select Box                                          |
| 1100  | subcategory            | Subcategory                      | false     | Lookup Select Box                                          |
| 1200  | container2_split       |                                  |           | Container Split                                            |
| 1300  | on_behalf_of           | On Behalf of                     | true      | Multiple Choice                                            |
| 1400  | caller_id              | User                             | true      | Reference                                                  |
| 1500  | container2_end         |                                  |           | Container End                                              |

### Please describe your issue below

- **Name:** comments
- **Type:** Multi Line Text
- **Field:** Additional Comments (`comments`)

### Associated Network

- **Name:** network
- **Type:** Reference: Physical Network `[x_doj_usmsprogop_u_cmdb_ci_physical_network]`
- **Reference qualifier condition:** *Operational Status* is *Operational* (`operational_status=1^EQ`)

### Site

- **Name:** location
- **Type:** Reference: Location `[cmn_location]`
- **Reference qualifier condition:** *Location type* is *Site* **AND** *Parent.Location type* is *Region* (`cmn_location_type=site^parent.cmn_location_type=region^EQ`)
- **Field:** Location (`location`)
- **Variable attributes:** `ref_auto_completer=AJAXTableCompleter,ref_ac_columns_search=true,ref_ac_columns=city;state;name`

### Urgency

- **Name:** urgency
- **Type:** Select Box
- **Choice Table:** Incident `[incident]`
- **Choice Field:** Urgency (`urgency`)
- **Include none:** Checked

### Category

- **Name:** category
- **Type:** Select Select Box
- **Lookup from table:** Choice `[sys_choice]`
- **Lookup value field:** Value (`value`)
- **Lookup label field(s):** `label`
- **Include none:** Checked
- **Reference qualifier:** `name=incident^element=category`

### Subcategory

- **Name:** subcategory
- **Type:** Select Select Box
- **Lookup from table:** Choice `[sys_choice]`
- **Lookup value field:** Value (`value`)
- **Lookup label field(s):** `label`
- **Include none:** Checked
- **Reference qualifier:** `javascript:"name=incident^element=subcategory^dependent_value=" + current.variables.category;`
- **Variable attributes:** `ref_qual_elements=category`

### On Behalf of

- **Name:** on_behalf_of
- **Type:** Multiple Choice
- **Choices:**
  - Myself (`self`)
  - Someone else (`other`)
- **Default Value:** `self`
- **Choice direction:** Down

### User

- **Name:** caller_id
- **Type:** Reference: User `[sys_user]`
- **Reference qualifier condition:** *Active* is *true* (`active=true^EQ`)
- **Field:** Caller (`caller_id`)

## Catalog UI Policies

### Hide network when not applicable

- **Catalog Conditions:** `network_not_applicable` is `true`
- **Applies on a Catalog Item view:** Checked
- **Applies on the Target Record:** Checked
- **On Load:** Checked
- **Reverse if false:** Checked

**Catalog UI Policy Actions:**

| Name    | Mandatory | Visible | Read only   |
|---------|-----------|---------|-------------|
| network | False     | False   | Leave alone |

### Hide caller when on behalf of self

- **Catalog Conditions:** `on_behalf_of` is Myself (`self`)
- **Applies on a Catalog Item view:** Checked
- **Applies on the Target Record:** Checked
- **On Load:** Checked
- **Reverse if false:** Checked

**Catalog UI Policy Actions:**

| Name      | Mandatory | Visible | Read only   |
|-----------|-----------|---------|-------------|
| caller_id | False     | False   | Leave alone |

### Hide Subcategory when no Category

- **Catalog Conditions:** `category` is *-- None --*
- **Applies on a Catalog Item view:** Checked
- **Applies on the Target Record:** *Not Checked*
- **On Load:** Checked
- **Reverse if false:** Checked

**Catalog UI Policy Actions:**

| Name        | Mandatory   | Visible | Read only   |
|-------------|-------------|---------|-------------|
| subcategory | Leave alone | False   | Leave alone |
