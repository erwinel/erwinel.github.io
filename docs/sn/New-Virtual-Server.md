# New Virtual Server

Request 1 or more new virtual servers

- [Order Guide Variables](./New-Virtual-Server-Order-Guide-Variables.md)
- [Create VM, Create VM #2, Create VM #3, and Create VM #4 Catalog Items](./Create-VM.md)

## Catalog Client Scripts

### Update Network on Domain change

- **Type:** `onChange`
- **Variable Name:** `domain`
- **Applies on a Catalog Item view:** True
- **Applies on Requested Items:** True
- **Applies on Catalog Tasks:** True

```javascript
function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || newValue == '')
        return;

    function onRelationshipLoaded(result) {
        if (result.next()) {
            g_form.clearMessages();
            g_form.setValue('network', result.child);
        } else
            g_form.addInfoMessage('Selected domain is not related to a Physical Network.');
    }
    var gr = new GlideRecord('cmdb_rel_ci');
    gr.addQuery('type', '5f985e0ec0a8010e00a9714f2a172815');
    gr.addQuery('parent', newValue);
    gr.query(onRelationshipLoaded);
}
```

### VM Prefix Change

- **Type:** `onChange`
- **Variable Name:** `vm_prefix`
- **Applies on a Catalog Item view:** True
- **Applies on Requested Items:** True
- **Applies on Catalog Tasks:** True

```javascript
function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading)
        return;
    var count = parseInt(g_form.getValue('vm_count'));
    if (newValue == '') {
        g_form.setValue('vm_name_1', '');
        if (count > 1) {
            g_form.setValue('vm_name_2', '');
            if (count > 2) {
                g_form.setValue('vm_name_3', '');
                if (count > 3)
                    g_form.setValue('vm_name_4', '');
            }
        }
        return;
    }
    var nameRe = /^\d{3}-[a-z][a-z\d]+$/i;
    if (nameRe.test(newValue))
        g_form.hideFieldMsg('vm_prefix');
    else {
        g_form.showFieldMsg('vm_prefix', 'Invalid prefix format', 'error', true);
        g_form.setValue('vm_name_1', '');
        if (count > 1) {
            g_form.setValue('vm_name_2', '');
            if (count > 2) {
                g_form.setValue('vm_name_3', '');
                if (count > 3)
                    g_form.setValue('vm_name_4', '');
            }
        }
        return;
    }

    nameRe = /^[a-z][a-z\d]+$/i;
    var idxRe = /^\d+$/;
    var abbr = g_form.getValue('vm_abbreviation_1');
    var index;
    if (abbr.length > 0 && nameRe.test(abbr)) {
        if ((index = g_form.getValue('vm_index_1')) == '')
            g_form.setValue('vm_name_1', newValue.toUpperCase() + '-' + abbr.toUpperCase());
        else if (index.length == 2 && idxRe.test(index)) {
            g_form.setValue('vm_name_1', newValue.toUpperCase() + '-' + abbr.toUpperCase() + '-' + index);
        }
    }

    if (count == 1)
        return;

    abbr = g_form.getValue('vm_abbreviation_2');
    if (abbr.length > 0 && nameRe.test(abbr)) {
        if ((index = g_form.getValue('vm_index_2')) == '')
            g_form.setValue('vm_name_2', newValue.toUpperCase() + '-' + abbr.toUpperCase());
        else if (index.length == 2 && idxRe.test(index)) {
            g_form.setValue('vm_name_2', newValue.toUpperCase() + '-' + abbr.toUpperCase() + '-' + index);
        }
    }

    if (count == 2)
        return;

    abbr = g_form.getValue('vm_abbreviation_3');
    if (abbr.length > 0 && nameRe.test(abbr)) {
        if ((index = g_form.getValue('vm_index_3')) == '')
            g_form.setValue('vm_name_3', newValue.toUpperCase() + '-' + abbr.toUpperCase());
        else if (index.length == 2 && idxRe.test(index)) {
            g_form.setValue('vm_name_3', newValue.toUpperCase() + '-' + abbr.toUpperCase() + '-' + index);
        }
    }

    if (count == 3)
        return;

    abbr = g_form.getValue('vm_abbreviation_4');
    if (abbr.length > 0 && nameRe.test(abbr)) {
        if ((index = g_form.getValue('vm_index_4')) == '')
            g_form.setValue('vm_name_4', newValue.toUpperCase() + '-' + abbr.toUpperCase());
        else if (index.length == 2 && idxRe.test(index)) {
            g_form.setValue('vm_name_4', newValue.toUpperCase() + '-' + abbr.toUpperCase() + '-' + index);
        }
    }
}
```

### VM Count Change

- **Type:** `onChange`
- **Variable Name:** `vm_count`
- **Applies on a Catalog Item view:** True
- **Applies on Requested Items:** True
- **Applies on Catalog Tasks:** True

```javascript
function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || newValue == '')
        return;
    var count = parseInt(newValue);
    var prefix = g_form.getValue('vm_prefix');
    if (prefix == '' || !(/^\d{3}-[a-z][a-z\d]+$/i).test(prefix))
        return;

    var nameRe = /^[a-z][a-z\d]+$/i;
    var idxRe = /^\d+$/;
    var abbr = g_form.getValue('vm_abbreviation_1');
    var index;
    if (abbr.length > 0 && nameRe.test(abbr)) {
        if ((index = g_form.getValue('vm_index_1')) == '')
            g_form.setValue('vm_name_1', prefix.toUpperCase() + '-' + abbr.toUpperCase());
        else if (index.length == 2 && idxRe.test(index)) {
            g_form.setValue('vm_name_1', prefix.toUpperCase() + '-' + abbr.toUpperCase() + '-' + index.toUpperCase());
        }
    }

    if (count == 1) {
        g_form.setValue('vm_name_2', '');
        g_form.setValue('vm_name_3', '');
        g_form.setValue('vm_name_4', '');
        return;
    }

    abbr = g_form.getValue('vm_abbreviation_2');
    if (abbr.length > 0 && nameRe.test(abbr)) {
        if ((index = g_form.getValue('vm_index_2')) == '')
            g_form.setValue('vm_name_2', prefix.toUpperCase() + '-' + abbr.toUpperCase());
        else if (index.length == 2 && idxRe.test(index)) {
            g_form.setValue('vm_name_2', prefix.toUpperCase() + '-' + abbr.toUpperCase() + '-' + index);
        }
    }

    if (count == 2) {
        g_form.setValue('vm_name_3', '');
        g_form.setValue('vm_name_4', '');
        return;
    }

    abbr = g_form.getValue('vm_abbreviation_3');
    if (abbr.length > 0 && nameRe.test(abbr)) {
        if ((index = g_form.getValue('vm_index_3')) == '')
            g_form.setValue('vm_name_3', prefix.toUpperCase() + '-' + abbr.toUpperCase());
        else if (index.length == 2 && idxRe.test(index)) {
            g_form.setValue('vm_name_3', prefix.toUpperCase() + '-' + abbr.toUpperCase() + '-' + index);
        }
    }

    if (count == 3) {
        g_form.setValue('vm_name_4', '');
        return;
    }

    abbr = g_form.getValue('vm_abbreviation_4');
    if (abbr.length > 0 && nameRe.test(abbr)) {
        if ((index = g_form.getValue('vm_index_4')) == '')
            g_form.setValue('vm_name_4', prefix.toUpperCase() + '-' + abbr.toUpperCase());
        else if (index.length == 2 && idxRe.test(index)) {
            g_form.setValue('vm_name_4', prefix.toUpperCase() + '-' + abbr.toUpperCase() + '-' + index);
        }
    }
}
```

### VM #1 Abbr Change

- **Type:** `onChange`
- **Variable Name:** `vm_abbreviation_1`
- **Applies on a Catalog Item view:** True
- **Applies on Requested Items:** True
- **Applies on Catalog Tasks:** True

```javascript
function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading)
        return;

    if (newValue == '') {
        g_form.setValue('vm_name_1', '');
        return;
    }

    if ((/^[a-z][a-z\d]+$/i).test(newValue)) {
        g_form.hideFieldMsg('vm_abbreviation_1');
        var prefix = g_form.getValue('vm_prefix');
        if (prefix == '' || !(/^\d{3}-[a-z][a-z\d]+$/i).test(prefix))
            return;
        var index = g_form.getValue('vm_index_1');
        if (index == '')
            g_form.setValue('vm_name_1', prefix.toUpperCase() + '-' + newValue.toUpperCase());
        else if (index.length == 2 && (/^\d+$/).test(index))
            g_form.setValue('vm_name_1', prefix.toUpperCase() + '-' + newValue.toUpperCase() + '-' + index);
    } else {
        g_form.setValue('vm_name_1', '');
        g_form.showFieldMsg('vm_abbreviation_1', 'Invalid abbreviated role name', 'error', true);
    }
}
```

### VM #1 Index Change

- **Type:** `onChange`
- **Variable Name:** `vm_index_1`
- **Applies on a Catalog Item view:** True
- **Applies on Requested Items:** True
- **Applies on Catalog Tasks:** True

```javascript
function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading)
        return;

    var abbr, prefix;
    if (newValue == '') {
        g_form.hideFieldMsg('vm_index_1');
        if ((prefix = g_form.getValue('vm_prefix')) != '' && (abbr = g_form.getValue('vm_abbreviation_1')) != "" &&
            (/^\d{3}-[a-z][a-z\d]+$/i).test(prefix) && (/^[a-z][a-z\d]+$/i).test(abbr))
            g_form.setValue('vm_name_1', prefix.toUpperCase() + '-' + abbr.toUpperCase());
    } else if (newValue.length == 2 && (/^\d+$/).test(newValue)) {
        g_form.hideFieldMsg('vm_index_1');
        if ((prefix = g_form.getValue('vm_prefix')) != '' && (abbr = g_form.getValue('vm_abbreviation_1')) != "" &&
            (/^\d{3}-[a-z][a-z\d]+$/i).test(prefix) && (/^[a-z][a-z\d]+$/i).test(abbr))
            g_form.setValue('vm_name_1', prefix.toUpperCase() + '-' + abbr.toUpperCase() + '-' + newValue);
    } else
        g_form.showFieldMsg('vm_abbreviation_1', 'Invalid abbreviated role name', 'error', true);
}
```

### VM #2 Abbr Change

- **Type:** `onChange`
- **Variable Name:** `vm_abbreviation_2`
- **Applies on a Catalog Item view:** True
- **Applies on Requested Items:** True
- **Applies on Catalog Tasks:** True

```javascript
function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || parseInt(g_form.getValue('vm_count')) < 2)
        return;

    if (newValue == '') {
        g_form.setValue('vm_name_2', '');
        return;
    }

    if ((/^[a-z][a-z\d]+$/i).test(newValue)) {
        g_form.hideFieldMsg('vm_abbreviation_2');
        var prefix = g_form.getValue('vm_prefix');
        if (prefix == '' || !(/^\d{3}-[a-z][a-z\d]+$/i).test(prefix))
            return;
        var index = g_form.getValue('vm_index_2');
        if (index == '')
            g_form.setValue('vm_name_2', prefix.toUpperCase() + '-' + newValue.toUpperCase());
        else if (index.length == 2 && (/^\d+$/).test(index))
            g_form.setValue('vm_name_2', prefix.toUpperCase() + '-' + newValue.toUpperCase() + '-' + index);
    } else {
        g_form.setValue('vm_name_2', '');
        g_form.showFieldMsg('vm_abbreviation_2', 'Invalid abbreviated role name', 'error', true);
    }
}
```

### VM #2 Index Change

- **Type:** `onChange`
- **Variable Name:** `vm_index_2`
- **Applies on a Catalog Item view:** True
- **Applies on Requested Items:** True
- **Applies on Catalog Tasks:** True

```javascript
function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || parseInt(g_form.getValue('vm_count')) < 2)
        return;

    var abbr, prefix;
    if (newValue == '') {
        g_form.hideFieldMsg('vm_index_2');
        if ((prefix = g_form.getValue('vm_prefix')) != '' && (abbr = g_form.getValue('vm_abbreviation_2')) != "" &&
            (/^\d{3}-[a-z][a-z\d]+$/i).test(prefix) && (/^[a-z][a-z\d]+$/i).test(abbr))
            g_form.setValue('vm_name_2', prefix.toUpperCase() + '-' + abbr.toUpperCase());
    } else if (newValue.length == 2 && (/^\d+$/).test(newValue)) {
        g_form.hideFieldMsg('vm_index_2');
        if ((prefix = g_form.getValue('vm_prefix')) != '' && (abbr = g_form.getValue('vm_abbreviation_2')) != "" &&
            (/^\d{3}-[a-z][a-z\d]+$/i).test(prefix) && (/^[a-z][a-z\d]+$/i).test(abbr))
            g_form.setValue('vm_name_2', prefix.toUpperCase() + '-' + abbr.toUpperCase() + '-' + newValue);
    } else
        g_form.showFieldMsg('vm_abbreviation_2', 'Invalid abbreviated role name', 'error', true);
}
```

### VM #3 Abbr Change

- **Type:** `onChange`
- **Variable Name:** `vm_abbreviation_3`
- **Applies on a Catalog Item view:** True
- **Applies on Requested Items:** True
- **Applies on Catalog Tasks:** True

```javascript
function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || parseInt(g_form.getValue('vm_count')) < 3)
        return;

    if (newValue == '') {
        g_form.setValue('vm_name_3', '');
        return;
    }

    if ((/^[a-z][a-z\d]+$/i).test(newValue)) {
        g_form.hideFieldMsg('vm_abbreviation_3');
        var prefix = g_form.getValue('vm_prefix');
        if (prefix == '' || !(/^\d{3}-[a-z][a-z\d]+$/i).test(prefix))
            return;
        var index = g_form.getValue('vm_index_3');
        if (index == '')
            g_form.setValue('vm_name_3', prefix.toUpperCase() + '-' + newValue.toUpperCase());
        else if (index.length == 2 && (/^\d+$/).test(index))
            g_form.setValue('vm_name_3', prefix.toUpperCase() + '-' + newValue.toUpperCase() + '-' + index);
    } else {
        g_form.setValue('vm_name_3', '');
        g_form.showFieldMsg('vm_abbreviation_3', 'Invalid abbreviated role name', 'error', true);
    }
}
```

### VM #3 Index Change

- **Type:** `onChange`
- **Variable Name:** `vm_index_3`
- **Applies on a Catalog Item view:** True
- **Applies on Requested Items:** True
- **Applies on Catalog Tasks:** True

```javascript
function onChange(control, oldValue, newValue, isLoading) {
  if (isLoading || parseInt(g_form.getValue('vm_count')) < 3)
      return;

  var abbr, prefix;
  if (newValue == '') {
    g_form.hideFieldMsg('vm_index_3');
    if ((prefix = g_form.getValue('vm_prefix')) != '' && (abbr = g_form.getValue('vm_abbreviation_3')) != "" &&
      (/^\d{3}-[a-z][a-z\d]+$/i).test(prefix) && (/^[a-z][a-z\d]+$/i).test(abbr))
        g_form.setValue('vm_name_3', prefix.toUpperCase() + '-' + abbr.toUpperCase());
  } else if (newValue.length == 2 && (/^\d+$/).test(newValue)) {
    g_form.hideFieldMsg('vm_index_3');
    if ((prefix = g_form.getValue('vm_prefix')) != '' && (abbr = g_form.getValue('vm_abbreviation_3')) != "" &&
      (/^\d{3}-[a-z][a-z\d]+$/i).test(prefix) && (/^[a-z][a-z\d]+$/i).test(abbr))
      g_form.setValue('vm_name_3', prefix.toUpperCase() + '-' + abbr.toUpperCase() + '-' + newValue);
  } else 
      g_form.showFieldMsg('vm_abbreviation_3', 'Invalid abbreviated role name', 'error', true);
}
```

### VM #4 Abbr Change

- **Type:** `onChange`
- **Variable Name:** `vm_abbreviation_4`
- **Applies on a Catalog Item view:** True
- **Applies on Requested Items:** True
- **Applies on Catalog Tasks:** True

```javascript
function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || parseInt(g_form.getValue('vm_count')) < 3)
        return;

    if (newValue == '') {
        g_form.setValue('vm_name_4', '');
        return;
    }

    if ((/^[a-z][a-z\d]+$/i).test(newValue)) {
        g_form.hideFieldMsg('vm_abbreviation_4');
        var prefix = g_form.getValue('vm_prefix');
        if (prefix == '' || !(/^\d{3}-[a-z][a-z\d]+$/i).test(prefix))
            return;
        var index = g_form.getValue('vm_index_4');
        if (index == '')
            g_form.setValue('vm_name_4', prefix.toUpperCase() + '-' + newValue.toUpperCase());
        else if (index.length == 2 && (/^\d+$/).test(index))
            g_form.setValue('vm_name_4', prefix.toUpperCase() + '-' + newValue.toUpperCase() + '-' + index);
    } else {
        g_form.setValue('vm_name_4', '');
        g_form.showFieldMsg('vm_abbreviation_4', 'Invalid abbreviated role name', 'error', true);
    }
}
```

### VM #4 Index Change

- **Type:** `onChange`
- **Variable Name:** `vm_index_4`
- **Applies on a Catalog Item view:** True
- **Applies on Requested Items:** True
- **Applies on Catalog Tasks:** True

```javascript
function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || parseInt(g_form.getValue('vm_count')) < 3)
        return;

    var abbr, prefix;
    if (newValue == '') {
        g_form.hideFieldMsg('vm_index_4');
        if ((prefix = g_form.getValue('vm_prefix')) != '' && (abbr = g_form.getValue('vm_abbreviation_4')) != "" &&
            (/^\d{3}-[a-z][a-z\d]+$/i).test(prefix) && (/^[a-z][a-z\d]+$/i).test(abbr))
            g_form.setValue('vm_name_4', prefix.toUpperCase() + '-' + abbr.toUpperCase());
    } else if (newValue.length == 2 && (/^\d+$/).test(newValue)) {
        g_form.hideFieldMsg('vm_index_4');
        if ((prefix = g_form.getValue('vm_prefix')) != '' && (abbr = g_form.getValue('vm_abbreviation_4')) != "" &&
            (/^\d{3}-[a-z][a-z\d]+$/i).test(prefix) && (/^[a-z][a-z\d]+$/i).test(abbr))
            g_form.setValue('vm_name_4', prefix.toUpperCase() + '-' + abbr.toUpperCase() + '-' + newValue);
    } else
        g_form.showFieldMsg('vm_abbreviation_4', 'Invalid abbreviated role name', 'error', true);
}
```

## TODO

- [ ] Remove Disk Type options.
- [ ] If person selects 'No' for automatic updates, the need to explain how updates are taken care of.
- [ ] Disable or delete New Data Drive catalog item.
- [ ] Dropdown for Domain.
- [ ] Textbox for machine name.
  - [ ] Validate machine name.
