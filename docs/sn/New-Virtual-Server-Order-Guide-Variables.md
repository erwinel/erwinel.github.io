# New Virtual Server Order Guide Variables

## start_primary_options

- **Type:** Container Start
- **Order:** 100
- **Layout:** 2 Columns Wide, one side, then the other

### vm_count

- **Question:** How many virtual machines will you be requesting?'
- **Type:** Numeric Scale
- **Order:** 300
- **Mandatory:**: true
- **Read only:**: false
- **Default Value:** 1

### split_primary_options

- **Type:** Container Split
- **Order:** 300

### domain

This is the primary active directory domain of the network that the virtual server will be connected to.

If you do not want the OS of the virtual machine(s) actually joined to the domain, please indicate thusly in the Additional Instructions field of the individual server tabs when selecting options in the next step.

- **Question:** Which network domain will the virtual machine(s) be connected to?
- **Type:** Reference
- **Reference:** AD Domain `[cmdb_ci_ad_domain]`
  - *Where:* Operational Status is Operational
- **Order:** 400
- **Mandatory:**: true
- **Read only:**: false

### network

The target network where the server(s) will be created. This is used to distinguish between various air-gapped networks.

- **Question:** Host Network
- **Type:** Reference
  - *Where:* Operational Status is Operational
- **Reference:** Physical Network `[x_g_doj_usmsprogop_u_cmdb_ci_physical_network]`
- **Order:** 500
- **Mandatory:**: true
- **Read only:**: false

### end_primary_options

- **Type:** Container End
- **Order:** 600

## start_tenant_customer_information

- **Question:** Tenant / Customer Information
- **Type:** Container Start
- **Order:** 700
- **Layout:** 2 Columns Wide, one side, then the other

### application_owner_group

Group with overall accountability for the application provided by the requested server.

- **Question:** Application Owner Group
- **Type:** Reference
- **Reference:** Group `[sys_user_group]`
  - *Where:* Active is True
- **Order:** 800
- **Mandatory:**: true
- **Read only:**: false

### technical_admin_group

Group responsible for technical administration of application provided by the requested server (monitoring, patching, etc.).

- **Question:** Technical Administration Group
- **Type:** Reference
- **Reference:** Group `[sys_user_group]`
  - *Where:* Active is True
- **Order:** 900
- **Mandatory:**: true
- **Read only:**: false

### primary_owner

Primary non-technical POC for application provided by the requested server.

- **Question:** Primary Application Owner
- **Type:** Reference
- **Reference:** User `[sys_user]`
  - *Where:* Active is True
- **Order:** 1000
- **Mandatory:**: true
- **Read only:**: false

### primary_admin

Primary POC for technical administration of application provided by the requested server (monitoring, patching, etc.).

- **Question:** Primary Technical Administrator
- **Type:** Reference
- **Reference:** User `[sys_user]`
  - *Where:* Active is True
- **Order:** 1100
- **Mandatory:**: true
- **Read only:**: false

### secondary_owner

Secondary non-technical POC for application provided by the requested server.

- **Question:** Secondary Application Owner
- **Type:** Reference
- **Reference:** User `[sys_user]`
  - *Where:* Active is True
- **Order:** 1200
- **Mandatory:**: false
- **Read only:**: false

### secondary_admin

Secondary POC for technical administration of application provided by the requested server (monitoring, patching, etc.).

- **Question:** Secondary Technical Administrator
- **Type:** Reference
- **Reference:** User `[sys_user]`
  - *Where:* Active is True
- **Order:** 1300
- **Mandatory:**: false
- **Read only:**: false

### end_tenant_customer_information

- **Type:** Container End
- **Order:** 1400

## start_vm_identity

- **Question:** Virtual Machine Identity
- **Type:** Container Start
- **Order:** 1500
- **Layout:** 1 Column Wide

### start_primary_service

- **Type:** Container Start
- **Order:** 1600
- **Layout:** 2 Columns Wide, alternating sides

#### primary_service

This is the name of the primary hosted application or service that the server will provide.

- **Question:** Primary Service Description
- **Type:** Single Line Text
- **Order:** 1700
- **Mandatory:**: false
- **Read only:**: false

#### vm_prefix

This is the prefix to use for all machine names in this request. This should start with the 3-digit site number, followed by a dash, and then followed by abbreviated text which represents the service that the VMs in this request provides or supports. Examples include 500-SHAREPOINT and 123-EXCHANGE.

- **Question:** What is the prefix for the machine name(s)?
- **Type:** Single Line Text
- **Max length:** 11
- **Order:** 1800
- **Mandatory:**: true
- **Read only:**: false

#### end_primary_service

- **Type:** Container End
- **Order:** 1900

### start_role_1

- **Type:** Container Start
- **Order:** 2000
- **Layout:** 2 Columns Wide, alternating sides

### vm_role_1

This is for a short description of the role of the first virtual machine. Examples might be "Primary Database Server" or "Web Front End #1".

- **Question:** VM #1 Role Description
- **Type:** Single Line Text
- **Order:** 2100
- **Mandatory:**: false
- **Read only:**: false

#### start_vm_suffix_1

- **Type:** Container Start
- **Order:** 2200
- **Layout:** 2 Columns Wide, alternating sides

##### vm_abbreviation_1

This is for the portion of the formatted machine name that represents the role of the first virtual machine.

- **Question:** VM #1 Role Abbreviation
- **Type:** Single Line Text
- **Max length:** 5
- **Order:** 2300
- **Mandatory:**: true
- **Read only:**: false

##### vm_index_1

This is the index number to append to the name of the first virtual machine. This distinguishes it from other machine names that may share the same base name components.

- **Question:** Index Number for VM #1
- **Type:** Single Line Text
- **Max length:** 2
- **Order:** 2400
- **Mandatory:**: false
- **Read only:**: false

##### end_vm_suffix_1

- **Type:** Container End
- **Order:** 2500

#### vm_name_1

- **Question:** VM #1 Name
- **Type:** Single Line Text
- **Order:** 2600
- **Mandatory:**: false
- **Read only:**: true

#### end_role_1

- **Type:** Container End
- **Order:** 2700

### start_role_2

- **Type:** Container Start
- **Order:** 2800
- **Layout:** 2 Columns Wide, alternating sides

#### vm_role_2

This is for a short description of the role of the second virtual machine. Examples might be "Failover Database Server" or "Web Front End #2".

- **Question:** VM #2 Role Description
- **Type:** Single Line Text
- **Order:** 2900
- **Mandatory:**: false
- **Read only:**: false

#### start_vm_suffix_2

- **Type:** Container Start
- **Order:** 3000
- **Layout:** 2 Columns Wide, alternating sides

##### vm_abbreviation_2

This is for the portion of the formatted machine name that represents the role of the second virtual machine.

- **Question:** VM #2 Role Abbreviation
- **Type:** Single Line Text
- **Max length:** 5
- **Order:** 3100
- **Mandatory:**: true
- **Read only:**: false

##### vm_index_2

This is the index number to append to the name of the second virtual machine. This distinguishes it from other machine names that may share the same base name components.

- **Question:** Index Number for VM #2
- **Type:** Single Line Text
- **Max length:** 2
- **Order:** 3200
- **Mandatory:**: false
- **Read only:**: false

##### end_vm_suffix_2

- **Type:** Container End
- **Order:** 3300

#### vm_name_2

- **Question:** VM #2 Name
- **Type:** Single Line Text
- **Order:** 3400
- **Mandatory:**: false
- **Read only:**: true

#### end_role_2

- **Type:** Container End
- **Order:** 3500

### start_role_3

- **Type:** Container Start
- **Order:** 3600
- **Layout:** 2 Columns Wide, alternating sides

#### vm_role_3

This is for a short description of the role of the third virtual machine.

- **Question:** VM #3 Role Description
- **Type:** Single Line Text
- **Order:** 3700
- **Mandatory:**: false
- **Read only:**: false

#### start_vm_suffix_3

- **Type:** Container Start
- **Order:** 3800
- **Layout:** 2 Columns Wide, alternating sides

##### vm_abbreviation_3

This is for the portion of the formatted machine name that represents the role of the third virtual machine.

- **Question:** VM #3 Role Abbreviation
- **Type:** Single Line Text
- **Max length:** 5
- **Order:** 3900
- **Mandatory:**: true
- **Read only:**: false

##### vm_index_3

This is the index number to append to the name of the third virtual machine. This distinguishes it from other machine names that may share the same base name components.

- **Question:** Index Number for VM #3
- **Type:** Single Line Text
- **Max length:** 2
- **Order:** 4000
- **Mandatory:**: false
- **Read only:**: false

##### end_vm_suffix_3

- **Type:** Container End
- **Order:** 4100

#### vm_name_3

- **Question:** VM #3 Name
- **Type:** Single Line Text
- **Order:** 4200
- **Mandatory:**: false
- **Read only:**: true

#### end_role_3

- **Type:** Container End
- **Order:** 4300

### start_role_4

- **Type:** Container Start
- **Order:** 4400
- **Layout:** 2 Columns Wide, alternating sides

#### vm_role_4

This is for a short description of the role of the fourth virtual machine.

- **Question:** VM #4 Role Description
- **Type:** Single Line Text
- **Order:** 4500
- **Mandatory:**: false
- **Read only:**: false

#### start_vm_suffix_4

- **Type:** Container Start
- **Order:** 4600
- **Layout:** 2 Columns Wide, alternating sides

##### vm_abbreviation_4

This is for the portion of the formatted machine name that represents the role of the fourth virtual machine.

- **Question:** VM #4 Role Abbreviation
- **Type:** Single Line Text
- **Max length:** 5
- **Order:** 4700
- **Mandatory:**: true
- **Read only:**: false

##### vm_index_4

This is the index number to append to the name of the fourth virtual machine. This distinguishes it from other machine names that may share the same base name components.

- **Question:** Index Number for VM #4
- **Type:** Single Line Text
- **Max length:** 2
- **Order:** 4800
- **Mandatory:**: false
- **Read only:**: false

##### end_vm_suffix_4

- **Type:** Container End
- **Order:** 4900

#### vm_name_4

- **Question:** VM #4 Name
- **Type:** Single Line Text
- **Order:** 5000
- **Mandatory:**: false
- **Read only:**: true

#### end_role_4

- **Type:** Container End
- **Order:** 5100

### end_vm_identity

- **Type:** Container End
- **Order:** 5200
