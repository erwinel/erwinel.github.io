# New Virtual Server

Order guide for new virtual server request that can support [Virtual Server](./Virtual-Server.md) and [Data Volume](./Data-Volume.md) requests.

## TODO

- [ ] Remove Disk Type options.
- [ ] If person selects 'No' for automatic updates, the need to explain how updates are taken care of.
- [ ] Disable or delete New Data Drive catalog item.
- [ ] Dropdown for Domain.
- [ ] Textbox for machine name.
  - [ ] Validate machine name.

## Layout

### Container: [start_add_to_existing_ritm](#start_add_to_existing_ritm)

| Left Column                                                                             | Right Column                                            |
|-----------------------------------------------------------------------------------------|---------------------------------------------------------|
| [Are you adding additional server(s) to an existing request?](#add_to_existing_ritm) | [Requested Item (New Virtual Machine)](#requested_item) |

## Container: [Tenant / Customer Information](#tenant_customer_information_start)

| Left Column                                         | Right Column                                             |
|-----------------------------------------------------|----------------------------------------------------------|
| [Primary Service](#primary_service)                 | [Number of Servers](#server_count)                       |
| [Application Owner Group](#application_owner_group) | [Technical Administration Group](#technical_admin_group) |
| [Primary Application Owner](#primary_owner)         | [Primary Technical Administrator](#primary_admin)        |
| [Secondary Application Owner](#secondary_owner)     | [Secondary Technical Administrator](#secondary_admin)    |
| [Server #1 Role Name](#server_1_role)               | [Server #2 Role Name](#server_2_role)                    |
| [Short Description](#server_1_description)          | [Short Description](#server_2_description)               |
| [Server #3 Role Name](#server_3_role)               | [Server #4 Role Name](#server_4_role)                    |
| [Short Description](#server_3_description)          | [Short Description](#server_4_description)               |

### Container: [Demarcation](#demarcation)

| Left Column               | Right Column              |
|---------------------------|---------------------------|
| [Network](#network)       | [Server #1 Site](#site_1) |
| [Server #2 Site](#site_2) | [Server #3 Site](#site_3) |
| [Server #4 Site](#site_4) |                           |

### Container: [Machine #1 Specifications](#machine_specifications_1)

| Left Column                                   | Right Column                  |
|-----------------------------------------------|-------------------------------|
| [Compute Capacity](#compute_capacity_1) | [Operating System](#operating_system_1) |
| [vCPU(s)](#vcpus_1)                     | [Operating System Name](#os_name_1)     |
| [RAM (GiB)](#ram_gb_1)                  |                                       |

| Left Column                                   | Right Column                                |
|-----------------------------------------------|---------------------------------------------|
| [System Disk Type](#system_disk_type_1)         | [Data Disk Type](#data_disk_type_1)         |
| [System Disk Capacity](#system_disk_capacity_1) | [Data Disk Capacity](#data_disk_capacity_1) |
| [System Volume Label](#system_volume_label_1)   | [Data Volume Label](#data_volume_label_1)   |

### Container [Machine #1 Sustainment](#sustainment_1)

| Left Column                               | Right Column                            |
|-------------------------------------------|-----------------------------------------|
| [Protection Level](#protection_level_1)     | [Automatic Updates](#automatic_updates_1) |
| [Backup System Disk](#backup_system_disk_1) | [Backup System Disk](#backup_data_disk_1) |

[System Volume Backup Scopes and Frequency](#sys_backup_scopes_and_frequency_1)

[Data Volume Backup Scopes and Frequency](#data_backup_scopes_and_frequency_1)

### Container: [Machine #2 Specifications](#machine_specifications_2)

| Left Column                                   | Right Column                  |
|-----------------------------------------------|-------------------------------|
| [Compute Capacity](#compute_capacity_2) | [Operating System](#operating_system_2) |
| [vCPU(s)](#vcpus_2)                     | [Operating System Name](#os_name_2)     |
| [RAM (GiB)](#ram_gb_2)                  |                                       |

| Left Column                                   | Right Column                                |
|-----------------------------------------------|---------------------------------------------|
| [System Disk Type](#system_disk_type_2)         | [Data Disk Type](#data_disk_type_2)         |
| [System Disk Capacity](#system_disk_capacity_2) | [Data Disk Capacity](#data_disk_capacity_2) |
| [System Volume Label](#system_volume_label_2)   | [Data Volume Label](#data_volume_label_2)   |

### Container [Machine #2 Sustainment](#sustainment_2)

| Left Column                               | Right Column                            |
|-------------------------------------------|-----------------------------------------|
| [Protection Level](#protection_level_2)     | [Automatic Updates](#automatic_updates_2) |
| [Backup System Disk](#backup_system_disk_2) | [Backup System Disk](#backup_data_disk_2) |

[System Volume Backup Scopes and Frequency](#sys_backup_scopes_and_frequency_2)

[Data Volume Backup Scopes and Frequency](#data_backup_scopes_and_frequency_2)

### Container: [Machine #3 Specifications](#machine_specifications_3)

| Left Column                                   | Right Column                  |
|-----------------------------------------------|-------------------------------|
| [Compute Capacity](#compute_capacity_3) | [Operating System](#operating_system_3) |
| [vCPU(s)](#vcpus_3)                     | [Operating System Name](#os_name_3)     |
| [RAM (GiB)](#ram_gb_3)                  |                                       |

| Left Column                                   | Right Column                                |
|-----------------------------------------------|---------------------------------------------|
| [System Disk Type](#system_disk_type_3)         | [Data Disk Type](#data_disk_type_3)         |
| [System Disk Capacity](#system_disk_capacity_3) | [Data Disk Capacity](#data_disk_capacity_3) |
| [System Volume Label](#system_volume_label_3)   | [Data Volume Label](#data_volume_label_3)   |

### Container [Machine #3 Sustainment](#sustainment_3)

| Left Column                               | Right Column                            |
|-------------------------------------------|-----------------------------------------|
| [Protection Level](#protection_level_3)     | [Automatic Updates](#automatic_updates_3) |
| [Backup System Disk](#backup_system_disk_3) | [Backup System Disk](#backup_data_disk_3) |

[System Volume Backup Scopes and Frequency](#sys_backup_scopes_and_frequency_3)

[Data Volume Backup Scopes and Frequency](#data_backup_scopes_and_frequency_3)

### Container: [Machine #4 Specifications](#machine_specifications_4)

| Left Column                                   | Right Column                  |
|-----------------------------------------------|-------------------------------|
| [Compute Capacity](#compute_capacity_4) | [Operating System](#operating_system_4) |
| [vCPU(s)](#vcpus_4)                     | [Operating System Name](#os_name_4)     |
| [RAM (GiB)](#ram_gb_4)                  |                                       |

| Left Column                                   | Right Column                                |
|-----------------------------------------------|---------------------------------------------|
| [System Disk Type](#system_disk_type_4)         | [Data Disk Type](#data_disk_type_4)         |
| [System Disk Capacity](#system_disk_capacity_4) | [Data Disk Capacity](#data_disk_capacity_4) |
| [System Volume Label](#system_volume_label_4)   | [Data Volume Label](#data_volume_label_4)   |

### Container [Machine #4 Sustainment](#sustainment_4)

| Left Column                               | Right Column                            |
|-------------------------------------------|-----------------------------------------|
| [Protection Level](#protection_level_4)     | [Automatic Updates](#automatic_updates_4) |
| [Backup System Disk](#backup_system_disk_4) | [Backup System Disk](#backup_data_disk_4) |

[System Volume Backup Scopes and Frequency](#sys_backup_scopes_and_frequency_4)

[Data Volume Backup Scopes and Frequency](#data_backup_scopes_and_frequency_4)

## variables

### start_add_to_existing_ritm

- **Type:** Container Start
- **Layout:** 2 Columns Wide, alternating sides
- **Order:** 100

## add_to_existing_ritm

- **Question:** Are you adding additional server(s) to an existing request?
- **Type:** Yes / No
- **Mandatory:** `true`
- **Default value:** No
- **Order:** 120

### requested_item

- **Question:** Requested Item (New Virtual Machine)
- **Type:** Reference (Requested Item *\[sc_req_item\]*)
- **Reference Qualifier Condition** `active` == `true` AND `item` == `d129234487c8c610246131d70cbb35b6`
- **Hidden:** `true`
- **UI Policy:** Visible and mandatory when [add_to_existing_ritm](#add_to_existing_ritm) == `yes`.
- **Order:** 130

### end_add_to_existing_ritm

- **Type:** Container End
- **Order:** 140

### tenant_customer_information

- **Question:** Tenant / Customer Information
- **Type:** Container Start
- **Layout:** 2 Columns Wide, alternating sides
- **Display title:** `true`
- **Order:** 150

### primary_service

- **Question:** Primary Service
- **Type:** Single Line Text
- **Mandatory:** `true`
- **Order:** 160

This is the name of the primary hosted application or service that the server will provide.

### server_count

- **Question:** Number of Servers
- **Type:** Numeric Scale
- **Mandatory:** `true`
- **Scale min:** 1
- **Scale max:** 4
- **Order:** 170

### application_owner_group

- **Question:** Application Owner Group
- **Type:** Reference (Group *\[sys_user_group\]*)
- **Mandatory:** `true`
- **Order:** 180

Group with overall accountability for the application provided by the requested server.

### technical_admin_group

- **Question:** Technical Administration Group
- **Type:** Reference (Group *\[sys_user_group\]*)
- **Mandatory:** `true`
- **Order:** 190

Group responsible for technical administration of application provided by the requested server (monitoring, patching, etc.).

### primary_owner

- **Question:** Primary Application Owner
- **Type:** Reference (User *\[sys_user\]*)
- **Mandatory:** `true`
- **Order:** 200

Primary non-technical POC for application provided by the requested server.

### primary_admin

- **Question:** Primary Technical Administrator
- **Type:** Reference (User *\[sys_user\]*)
- **Mandatory:** `true`
- **Order:** 210

Primary POC for technical administration of application provided by the requested server (monitoring, patching, etc.).

### secondary_owner

- **Question:** Secondary Application Owner
- **Type:** Reference (User *\[sys_user\]*)
- **Order:** 220

Secondary non-technical POC for application provided by the requested server.

### secondary_admin

- **Question:** Secondary Technical Administrator
- **Type:** Reference (User *\[sys_user\]*)
- **Order:** 230

Secondary POC for technical administration of application provided by the requested server (monitoring, patching, etc.).

### server_1_role

- **Question:** Server #1 Role Name
- **Type:** Single Line Text
- **Order:** 240

This is the role name for the first server. This is applicable for multi-server applications. Examples might be "Database #1" or "Web Front End".

### server_1_description

- **Question:** Short Description
- **Type:**  Single Line Text
- **Order:** 250

Optional short description of the first server.

### server_2_role

- **Question:** Server #2 Role Name
- **Type:** Single Line Text
- **Order:** 260

This is the role name for the second server. This is applicable for multi-server applications. Examples might be "Database #1" or "Web Front End".

### server_2_description

- **Question:** Short Description
- **Type:**  Single Line Text
- **Order:** 270

Optional short description of the second server.

### server_3_role

- **Question:** Server #3 Role Name
- **Type:** Single Line Text
- **Order:** 280

This is the role name for the third server. This is applicable for multi-server applications. Examples might be "Database #2" or "Web Front End".

### server_3_description

- **Question:** Short Description
- **Type:**  Single Line Text
- **Order:** 290

Optional short description of the third server.

### server_4_role

- **Question:** Server #4 Role Name
- **Type:** Single Line Text
- **Order:** 300

This is the role name for the fourth server. This is applicable for multi-server applications. Examples might be "Database #2" or "Web Front End".

### server_4_description

- **Question:** Short Description
- **Type:**  Single Line Text
- **Order:** 310

Optional short description of the fourth server.

### end_tenant_customer_information

- **Type:** Container End
- **Order:** 320

### demarcation

- **Question:** Demarcation
- **Type:** Container Start
- **Layout:** 2 Columns Wide, one side, then the other
- **Order:** 330

### network

- **Question:** Network
- **Type:** Reference (Physical Network *\[x_g_doj_usmsprogop_u_cmdb_ci_physical_network\]*)
- **Mandatory:** `true`
- **Reference Qualifier Condition** `Operational status` is `Operational`
- **Order:** 340

The target network where the server(s) will be created.

### site_1

- **Question:** Server #1 Site
- **Type:** Reference (Location \[cmn_location\])
- **Mandatory:** `true`
- **Reference Qualifier Condition** `Location type` is `Site`
- **Order:** 350

The virtual site location for the first server.

### site_2

- **Question:** Server #2 Site
- **Type:** Reference (Location \[cmn_location\])
- **Mandatory:** `true`
- **Reference Qualifier Condition** `Location type` is `Site`
- **Order:** 360

The virtual site location for the second server.

### site_3

- **Question:** Server #3 Site
- **Type:** Reference (Location \[cmn_location\])
- **Mandatory:** `true`
- **Reference Qualifier Condition** `Location type` is `Site`
- **Order:** 370

The virtual site location for the third server.

### site_4

- **Question:** Server #4 Site
- **Type:** Reference (Location \[cmn_location\])
- **Mandatory:** `true`
- **Reference Qualifier Condition** `Location type` is `Site`
- **Order:** 380

The virtual site location for the fourth server.

### end_demarcation

- **Type:** Container End
- **Order:** 390

### machine_specifications_1

- **Question:** Machine #1 Specifications
- **Type:** Container Start
- **Layout:** 2 Columns Wide, one side, then the other
- **Display title:** `true`
- **Order:** 400

### compute_capacity_1

- **Question:** Compute Capacity
- **Type:** Multiple Choice
  - **small**: Small: 1 vCPU, 2 GB RAM
  - **medium**: Medium: 2 vCPU, 4 GB RAM
  - **large**: Large: 4 vCPU, 8 GB RAM
  - **custom**: Custom (Requires Engineer Review)
- **Mandatory:** `true`
- **Default value:** small
- **Order:** 410

### vcpus_1

- **Question:** vCPU(s)
- **Type:**
- **Default value:** 2
- **Validation Regex:** Number
- **Hidden:** `true`
- **Order:** 420
- **UI Policy:** Visible and mandatory when [Compute Capacity](#compute_capacity_1) is `custom`.

Number of virtual CPUs.

### ram_gb_1

- **Question:** RAM (GiB)
- **Type:** Single Line Text
- **Default value:** 4
- **Validation Regex:** Decimal Value
- **Hidden:** `true`
- **Order:** 430
- **UI Policy:** Visible and mandatory when [Compute Capacity](#compute_capacity_1) is `custom`.

Server Ram in Gigabytes.

### operating_system_1

- **Question:** Operating System
- **Type:** Multiple Choice
  - **win_server_2022**: Windows Server 2022
  - **redhat_8**: Redhat Linux 8
  - **redhat_9**: Redhat Linux 9
  - **win_server_2019**: Windows Server 2019
  - **win_server_2016**: Windows Server 2016
  - **redhat_11**: Redhat Linux 11
  - **other**: Other OS
- **Mandatory:** `true`
- **Default value:** win_server_2022
- **Order:** 440

### os_name_1

- **Question:** Operating System Name
- **Type:** Single Line Text
- **Hidden:** `true`
- **Order:** 450
- **UI Policy:** Visible and mandatory when [Operating System](#operating_system_1) is not `other`.

Please enter the name of the operating system to install on the virtual machine.

### system_disk_type_1

- **Question:** System Disk Type
- **Type:** Multiple Choice
  - **scsi**: SCSI
  - **pci**: PCI
  - **ide**: IDE
  - **sata**: SATA
- **Mandatory:** `true`
- **Order:** 460

The bus type for the system disk.

### system_disk_capacity_1

- **Question:** System Disk Capacity
- **Type:** Single Line Text
- **Default value:** 40 GiB
- **Validation Regex:** Denominated Data Size
- **Order:** 470

Specify size of system volume (drive) using the appropriate byte denomination (i.e, bytes, KB, MB, GB, etc.).

Values without a suffix are assumed to be Gb (gigabytes).

### system_volume_label_1

- **Question:** System Volume Label
- **Type:** Single Line Text
- **Order:** 480

Volume label for the system drive / root partition.

### data_disk_type_1

- **Question:** Type of Data Volume / Drive
- **Type:** Multiple Choice
  - **local_disk**: Local Disk
  - **cifs**: CIFS/SMB
  - **nfs**: NFS
- **Mandatory:** `true`
- **Default value:** none
- **Order:** 490

### data_disk_bus_type_1

- **Question:** Data Disk Bus Type
- **Type:** Multiple Choice
  - **scsi**: SCSI
  - **pci**: PCI
  - **ide**: IDE
  - **sata**: SATA
- **Mandatory:** `true`
- **UI Policy:** Visible and mandatory when [Data Disk Bus Type](#data_disk_type_1) is `local`.
- **Default value:** scsi
- **Order:** 500

The bus type for the local disk.

### file_share_path_1

- **Question:** File Share Path
- **Type:** Single Line Text
- **UI Policy:** Visible and mandatory when [Data Disk Bus Type](#data_disk_type_1) is not `local`.
- **Hidden:** `true`
- **Order:** 510

### mount_point_1

- **Question:** Drive Letter / Mount Path
- **Type:** Single Line Text
- **Mandatory:** `true`
- **Order:** 520

### data_disk_capacity_1

- **Question:** Data Disk Capacity
- **Type:** Single Line Text
- **UI Policy:** Visible and mandatory when [Data Disk Bus Type](#data_disk_type_1) is `local`.
- **Default value:** 40 GiB
- **Validation Regex:** Denominated Data Size
- **Order:** 530

Specify size of system volume (drive) using the appropriate byte denomination (i.e, bytes, KB, MB, GB, etc.).

Values without a suffix are assumed to be Gb (gigabytes).

### data_volume_label_1

- **Question:** Data Volume Label
- **Type:** Single Line Text
- **UI Policy:** Visible and mandatory when [Data Disk Bus Type](#data_disk_type_1) is `local`.
- **Order:** 540

### end_machine_specifications_1

- **Type:** Container End
- **Order:** 550

### sustainment_1

- **Question:** Machine #1 Sustainment
- **Type:** Container Start
- **Layout:** 1 Column Wide
- **Display title:** `true`
- **Order:** 560

### sustainment_table_1

- **Type:** Container Start
- **Layout:** 2 Columns Wide, one side, then the other
- **Order:** 570

### protection_level_1

- **Question:** Protection Level
- **Type:** Multiple Choice
  - **beta**: Beta App Server
  - **mission_support**: Support App Server
  - **mission_critical**: Mission-Critical
- **Mandatory:** `true`
- **Default value:** support
- **Order:** 580

### automatic_updates_1

- **Question:** Automatic Updates
- **Type:** Yes / No
- **Mandatory:** `true`
- **Default value:** yes
- **Order:** 590

### backup_system_disk_1

- **Question:** Backup System Disk
- **Type:** Yes / No
- **Mandatory:** `true`
- **Default value:** no
- **Order:** 600

### backup_data_disk_1

- **Question:** Backup Data Disk
- **Type:** Yes / No
- **Mandatory:** `true`
- **Default value:** no
- **Order:** 610

### end_sustainment_table_1

- **Type:** Container End
- **Order:** 620

### sys_backup_scopes_and_frequency_1

- **Question:** System Volume Backup Scopes and Frequency
- **Type:** Multi Line Text
- **Order:** 630

### data_backup_scopes_and_frequency_1

- **Question:** Data Volume Backup Scopes and Frequency
- **Type:** Multi Line Text
- **Order:** 640

Describe the scope of the backup(s) for the system drive / partition, including the frequency.

The backup scope is typically *"full"* or *"incremental"*.
The frequency refers the intervals at which the backup is taken, such as *"daily"* or *"weekly"*.

This can also include other scope information, such as paths, as well as the time of day for the backup(s).

### end_sustainment_1

- **Type:** Container End
- **Order:** 650

### machine_specifications_2

- **Question:** Machine #2 Specifications
- **Type:** Container Start
- **Layout:** 2 Columns Wide, one side, then the other
- **Display title:** `true`
- **Order:** 270

### compute_capacity_2

- **Question:** Compute Capacity
- **Type:** Multiple Choice
  - **small**: Small: 1 vCPU, 2 GB RAM
  - **medium**: Medium: 2 vCPU, 4 GB RAM
  - **large**: Large: 4 vCPU, 8 GB RAM
  - **custom**: Custom (Requires Engineer Review)
- **Mandatory:** `true`
- **Default value:** small
- **Order:** 330

### vcpus_2

- **Question:** vCPU(s)
- **Type:**
- **Default value:** 2
- **Validation Regex:** Number
- **Hidden:** `true`
- **Order:** 340
- **UI Policy:** Visible and mandatory when [Compute Capacity](#compute_capacity_2) is `custom`.

Number of virtual CPUs.

### ram_gb_2

- **Question:** RAM (GiB)
- **Type:** Single Line Text
- **Default value:** 4
- **Validation Regex:** Decimal Value
- **Hidden:** `true`
- **Order:** 350
- **UI Policy:** Visible and mandatory when [Compute Capacity](#compute_capacity_2) is `custom`.

Server Ram in Gigabytes.

### operating_system_2

- **Question:** Operating System
- **Type:** Multiple Choice
  - **win_server_2022**: Windows Server 2022
  - **redhat_8**: Redhat Linux 8
  - **redhat_9**: Redhat Linux 9
  - **win_server_2019**: Windows Server 2019
  - **win_server_2016**: Windows Server 2016
  - **redhat_11**: Redhat Linux 11
  - **other**: Other OS
- **Mandatory:** `true`
- **Default value:** win_server_2022
- **Order:** 280

### os_name_2

- **Question:** Operating System Name
- **Type:** Single Line Text
- **Hidden:** `true`
- **Order:** 320
- **UI Policy:** Visible and mandatory when [Operating System](#operating_system_2) is not `other`.

Please enter the name of the operating system to install on the virtual machine.

### system_disk_type_2

- **Question:** System Disk Type
- **Type:** Multiple Choice
  - **scsi**: SCSI
  - **pci**: PCI
  - **ide**: IDE
  - **sata**: SATA
- **Mandatory:** `true`
- **Order:** 290

The bus type for the system disk.

### system_disk_capacity_2

- **Question:** System Disk Capacity
- **Type:** Single Line Text
- **Default value:** 40 GiB
- **Validation Regex:** Denominated Data Size
- **Order:** 300

Specify size of system volume (drive) using the appropriate byte denomination (i.e, bytes, KB, MB, GB, etc.).

Values without a suffix are assumed to be Gb (gigabytes).

### system_volume_label_2

- **Question:** System Volume Label
- **Type:** Single Line Text
- **Order:** 310

Volume label for the system drive / root partition.

### data_disk_type_2

- **Question:** Data Volume / Drive Type
- **Type:** Multiple Choice
  - **local_disk**: Local Disk
  - **cifs**: CIFS/SMB
  - **nfs**: NFS
- **Mandatory:** `true`
- **Default value:** local_disk
- **Order:** 160

### data_disk_bus_type_2

- **Question:** Data Disk Bus Type
- **Type:** Multiple Choice
  - **scsi**: SCSI
  - **pci**: PCI
  - **ide**: IDE
  - **sata**: SATA
- **Mandatory:** `true`
- **UI Policy:** Visible and mandatory when [Data Disk Bus Type](#data_disk_type_2) is `local`.
- **Default value:** scsi
- **Order:** 170

The bus type for the local disk.

### file_share_path_2

- **Question:** File Share Path
- **Type:** Single Line Text
- **UI Policy:** Visible and mandatory when [Data Disk Bus Type](#data_disk_type_2) is not `local`.
- **Hidden:** `true`
- **Order:** 180

### mount_point_2

- **Question:** Drive Letter / Mount Path
- **Type:** Single Line Text
- **Mandatory:** `true`
- **Order:** 190

### data_disk_capacity_2

- **Question:** Data Disk Capacity
- **Type:** Single Line Text
- **UI Policy:** Visible and mandatory when [Data Disk Bus Type](#data_disk_type_2) is `local`.
- **Default value:** 40 GiB
- **Validation Regex:** Denominated Data Size
- **Order:** 200

Specify size of system volume (drive) using the appropriate byte denomination (i.e, bytes, KB, MB, GB, etc.).

Values without a suffix are assumed to be Gb (gigabytes).

### data_volume_label_2

- **Question:** Data Volume Label
- **Type:** Single Line Text
- **UI Policy:** Visible and mandatory when [Data Disk Bus Type](#data_disk_type_2) is `local`.
- **Order:** 210

### end_machine_specifications_2

- **Type:** Container End
- **Order:** 360

### sustainment_2

- **Question:** Machine #2 Sustainment
- **Type:** Container Start
- **Layout:** 1 Column Wide
- **Display title:** `true`
- **Order:** 370

### sustainment_table_2

- **Type:** Container Start
- **Layout:** 2 Columns Wide, one side, then the other
- **Order:** 380

### protection_level_2

- **Question:** Protection Level
- **Type:** Multiple Choice
  - **beta**: Beta App Server
  - **mission_support**: Support App Server
  - **mission_critical**: Mission-Critical
- **Mandatory:** `true`
- **Default value:** support
- **Order:** 390

### automatic_updates_2

- **Question:** Automatic Updates
- **Type:** Yes / No
- **Mandatory:** `true`
- **Default value:** yes
- **Order:** 400

### backup_system_disk_2

- **Question:** Backup System Disk
- **Type:** Yes / No
- **Mandatory:** `true`
- **Default value:** no
- **Order:** 410

### backup_data_disk_2

- **Question:** Backup Data Disk
- **Type:** Yes / No
- **Mandatory:** `true`
- **Default value:** no
- **Order:** 410

### end_sustainment_table_2

- **Type:** Container End
- **Order:** 420

### sys_backup_scopes_and_frequency_2

- **Question:** System Volume Backup Scopes and Frequency
- **Type:** Multi Line Text
- **Order:** 430

### data_backup_scopes_and_frequency_2

- **Question:** Data Volume Backup Scopes and Frequency
- **Type:** Multi Line Text
- **Order:** 430

Describe the scope of the backup(s) for the system drive / partition, including the frequency.

The backup scope is typically *"full"* or *"incremental"*.
The frequency refers the intervals at which the backup is taken, such as *"daily"* or *"weekly"*.

This can also include other scope information, such as paths, as well as the time of day for the backup(s).

### end_sustainment_2

- **Type:** Container End
- **Order:** 420

### machine_specifications_3

- **Question:** Machine #3 Specifications
- **Type:** Container Start
- **Layout:** 2 Columns Wide, one side, then the other
- **Display title:** `true`
- **Order:** 270

### compute_capacity_3

- **Question:** Compute Capacity
- **Type:** Multiple Choice
  - **small**: Small: 1 vCPU, 2 GB RAM
  - **medium**: Medium: 2 vCPU, 4 GB RAM
  - **large**: Large: 4 vCPU, 8 GB RAM
  - **custom**: Custom (Requires Engineer Review)
- **Mandatory:** `true`
- **Default value:** small
- **Order:** 330

### vcpus_3

- **Question:** vCPU(s)
- **Type:**
- **Default value:** 2
- **Validation Regex:** Number
- **Hidden:** `true`
- **Order:** 340
- **UI Policy:** Visible and mandatory when [Compute Capacity](#compute_capacity_3) is `custom`.

Number of virtual CPUs.

### ram_gb_3

- **Question:** RAM (GiB)
- **Type:** Single Line Text
- **Default value:** 4
- **Validation Regex:** Decimal Value
- **Hidden:** `true`
- **Order:** 350
- **UI Policy:** Visible and mandatory when [Compute Capacity](#compute_capacity_3) is `custom`.

Server Ram in Gigabytes.

### operating_system_3

- **Question:** Operating System
- **Type:** Multiple Choice
  - **win_server_2022**: Windows Server 2022
  - **redhat_8**: Redhat Linux 8
  - **redhat_9**: Redhat Linux 9
  - **win_server_2019**: Windows Server 2019
  - **win_server_2016**: Windows Server 2016
  - **redhat_11**: Redhat Linux 11
  - **other**: Other OS
- **Mandatory:** `true`
- **Default value:** win_server_2022
- **Order:** 280

### os_name_3

- **Question:** Operating System Name
- **Type:** Single Line Text
- **Hidden:** `true`
- **Order:** 320
- **UI Policy:** Visible and mandatory when [Operating System](#operating_system_3) is not `other`.

Please enter the name of the operating system to install on the virtual machine.

### system_disk_type_3

- **Question:** System Disk Type
- **Type:** Multiple Choice
  - **scsi**: SCSI
  - **pci**: PCI
  - **ide**: IDE
  - **sata**: SATA
- **Mandatory:** `true`
- **Order:** 290

The bus type for the system disk.

### system_disk_capacity_3

- **Question:** System Disk Capacity
- **Type:** Single Line Text
- **Default value:** 40 GiB
- **Validation Regex:** Denominated Data Size
- **Order:** 300

Specify size of system volume (drive) using the appropriate byte denomination (i.e, bytes, KB, MB, GB, etc.).

Values without a suffix are assumed to be Gb (gigabytes).

### system_volume_label_3

- **Question:** System Volume Label
- **Type:** Single Line Text
- **Order:** 310

Volume label for the system drive / root partition.

### data_disk_type_3

- **Question:** Data Volume / Drive Type
- **Type:** Multiple Choice
  - **local_disk**: Local Disk
  - **cifs**: CIFS/SMB
  - **nfs**: NFS
- **Mandatory:** `true`
- **Default value:** local_disk
- **Order:** 160

### data_disk_bus_type_3

- **Question:** Data Disk Bus Type
- **Type:** Multiple Choice
  - **scsi**: SCSI
  - **pci**: PCI
  - **ide**: IDE
  - **sata**: SATA
- **Mandatory:** `true`
- **UI Policy:** Visible and mandatory when [Data Disk Bus Type](#data_disk_type_3) is `local`.
- **Default value:** scsi
- **Order:** 170

The bus type for the local disk.

### file_share_path_3

- **Question:** File Share Path
- **Type:** Single Line Text
- **UI Policy:** Visible and mandatory when [Data Disk Bus Type](#data_disk_type_3) is not `local`.
- **Hidden:** `true`
- **Order:** 180

### mount_point_3

- **Question:** Drive Letter / Mount Path
- **Type:** Single Line Text
- **Mandatory:** `true`
- **Order:** 190

### data_disk_capacity_3

- **Question:** Data Disk Capacity
- **Type:** Single Line Text
- **UI Policy:** Visible and mandatory when [Data Disk Bus Type](#data_disk_type_3) is `local`.
- **Default value:** 40 GiB
- **Validation Regex:** Denominated Data Size
- **Order:** 200

Specify size of system volume (drive) using the appropriate byte denomination (i.e, bytes, KB, MB, GB, etc.).

Values without a suffix are assumed to be Gb (gigabytes).

### data_volume_label_3

- **Question:** Data Volume Label
- **Type:** Single Line Text
- **UI Policy:** Visible and mandatory when [Data Disk Bus Type](#data_disk_type_3) is `local`.
- **Order:** 210

### end_machine_specifications_3

- **Type:** Container End
- **Order:** 360

### sustainment_3

- **Question:** Machine #3 Sustainment
- **Type:** Container Start
- **Layout:** 1 Column Wide
- **Display title:** `true`
- **Order:** 370

### sustainment_table_3

- **Type:** Container Start
- **Layout:** 2 Columns Wide, one side, then the other
- **Order:** 380

### protection_level_3

- **Question:** Protection Level
- **Type:** Multiple Choice
  - **beta**: Beta App Server
  - **mission_support**: Support App Server
  - **mission_critical**: Mission-Critical
- **Mandatory:** `true`
- **Default value:** support
- **Order:** 390

### automatic_updates_3

- **Question:** Automatic Updates
- **Type:** Yes / No
- **Mandatory:** `true`
- **Default value:** yes
- **Order:** 400

### backup_system_disk_3

- **Question:** Backup System Disk
- **Type:** Yes / No
- **Mandatory:** `true`
- **Default value:** no
- **Order:** 410

### backup_data_disk_3

- **Question:** Backup Data Disk
- **Type:** Yes / No
- **Mandatory:** `true`
- **Default value:** no
- **Order:** 410

### end_sustainment_table_3

- **Type:** Container End
- **Order:** 420

### sys_backup_scopes_and_frequency_3

- **Question:** System Volume Backup Scopes and Frequency
- **Type:** Multi Line Text
- **Order:** 430

### data_backup_scopes_and_frequency_3

- **Question:** Data Volume Backup Scopes and Frequency
- **Type:** Multi Line Text
- **Order:** 430

Describe the scope of the backup(s) for the system drive / partition, including the frequency.

The backup scope is typically *"full"* or *"incremental"*.
The frequency refers the intervals at which the backup is taken, such as *"daily"* or *"weekly"*.

This can also include other scope information, such as paths, as well as the time of day for the backup(s).

### end_sustainment_3

- **Type:** Container End
- **Order:** 420

### machine_specifications_4

- **Question:** Machine #4 Specifications
- **Type:** Container Start
- **Layout:** 2 Columns Wide, one side, then the other
- **Display title:** `true`
- **Order:** 270

### compute_capacity_4

- **Question:** Compute Capacity
- **Type:** Multiple Choice
  - **small**: Small: 1 vCPU, 2 GB RAM
  - **medium**: Medium: 2 vCPU, 4 GB RAM
  - **large**: Large: 4 vCPU, 8 GB RAM
  - **custom**: Custom (Requires Engineer Review)
- **Mandatory:** `true`
- **Default value:** small
- **Order:** 330

### vcpus_4

- **Question:** vCPU(s)
- **Type:**
- **Default value:** 2
- **Validation Regex:** Number
- **Hidden:** `true`
- **Order:** 340
- **UI Policy:** Visible and mandatory when [Compute Capacity](#compute_capacity_4) is `custom`.

Number of virtual CPUs.

### ram_gb_4

- **Question:** RAM (GiB)
- **Type:** Single Line Text
- **Default value:** 4
- **Validation Regex:** Decimal Value
- **Hidden:** `true`
- **Order:** 350
- **UI Policy:** Visible and mandatory when [Compute Capacity](#compute_capacity_4) is `custom`.

Server Ram in Gigabytes.

### operating_system_4

- **Question:** Operating System
- **Type:** Multiple Choice
  - **win_server_2022**: Windows Server 2022
  - **redhat_8**: Redhat Linux 8
  - **redhat_9**: Redhat Linux 9
  - **win_server_2019**: Windows Server 2019
  - **win_server_2016**: Windows Server 2016
  - **redhat_11**: Redhat Linux 11
  - **other**: Other OS
- **Mandatory:** `true`
- **Default value:** win_server_2022
- **Order:** 280

### os_name_4

- **Question:** Operating System Name
- **Type:** Single Line Text
- **Hidden:** `true`
- **Order:** 320
- **UI Policy:** Visible and mandatory when [Operating System](#operating_system_4) is not `other`.

Please enter the name of the operating system to install on the virtual machine.

### system_disk_type_4

- **Question:** System Disk Type
- **Type:** Multiple Choice
  - **scsi**: SCSI
  - **pci**: PCI
  - **ide**: IDE
  - **sata**: SATA
- **Mandatory:** `true`
- **Order:** 290

The bus type for the system disk.

### system_disk_capacity_4

- **Question:** System Disk Capacity
- **Type:** Single Line Text
- **Default value:** 40 GiB
- **Validation Regex:** Denominated Data Size
- **Order:** 300

Specify size of system volume (drive) using the appropriate byte denomination (i.e, bytes, KB, MB, GB, etc.).

Values without a suffix are assumed to be Gb (gigabytes).

### system_volume_label_4

- **Question:** System Volume Label
- **Type:** Single Line Text
- **Order:** 310

Volume label for the system drive / root partition.

### data_disk_type_4

- **Question:** Data Volume / Drive Type
- **Type:** Multiple Choice
  - **local_disk**: Local Disk
  - **cifs**: CIFS/SMB
  - **nfs**: NFS
- **Mandatory:** `true`
- **Default value:** local_disk
- **Order:** 160

### data_disk_bus_type_4

- **Question:** Data Disk Bus Type
- **Type:** Multiple Choice
  - **scsi**: SCSI
  - **pci**: PCI
  - **ide**: IDE
  - **sata**: SATA
- **Mandatory:** `true`
- **UI Policy:** Visible and mandatory when [Data Disk Bus Type](#data_disk_type_4) is `local`.
- **Default value:** scsi
- **Order:** 170

The bus type for the local disk.

### file_share_path_4

- **Question:** File Share Path
- **Type:** Single Line Text
- **UI Policy:** Visible and mandatory when [Data Disk Bus Type](#data_disk_type_4) is not `local`.
- **Hidden:** `true`
- **Order:** 180

### mount_point_4

- **Question:** Drive Letter / Mount Path
- **Type:** Single Line Text
- **Mandatory:** `true`
- **Order:** 190

### data_disk_capacity_4

- **Question:** Data Disk Capacity
- **Type:** Single Line Text
- **UI Policy:** Visible and mandatory when [Data Disk Bus Type](#data_disk_type_4) is `local`.
- **Default value:** 40 GiB
- **Validation Regex:** Denominated Data Size
- **Order:** 200

Specify size of system volume (drive) using the appropriate byte denomination (i.e, bytes, KB, MB, GB, etc.).

Values without a suffix are assumed to be Gb (gigabytes).

### data_volume_label_4

- **Question:** Data Volume Label
- **Type:** Single Line Text
- **UI Policy:** Visible and mandatory when [Data Disk Bus Type](#data_disk_type_4) is `local`.
- **Order:** 210

### end_machine_specifications_4

- **Type:** Container End
- **Order:** 360

### sustainment_4

- **Question:** Machine #4 Sustainment
- **Type:** Container Start
- **Layout:** 1 Column Wide
- **Display title:** `true`
- **Order:** 370

### sustainment_table_4

- **Type:** Container Start
- **Layout:** 2 Columns Wide, one side, then the other
- **Order:** 380

### protection_level_4

- **Question:** Protection Level
- **Type:** Multiple Choice
  - **beta**: Beta App Server
  - **mission_support**: Support App Server
  - **mission_critical**: Mission-Critical
- **Mandatory:** `true`
- **Default value:** support
- **Order:** 390

### automatic_updates_4

- **Question:** Automatic Updates
- **Type:** Yes / No
- **Mandatory:** `true`
- **Default value:** yes
- **Order:** 400

### backup_system_disk_4

- **Question:** Backup System Disk
- **Type:** Yes / No
- **Mandatory:** `true`
- **Default value:** no
- **Order:** 410

### backup_data_disk_4

- **Question:** Backup System Disk
- **Type:** Yes / No
- **Mandatory:** `true`
- **Default value:** no
- **Order:** 410

### end_sustainment_table_4

- **Type:** Container End
- **Order:** 420

### sys_backup_scopes_and_frequency_4

- **Question:** System Volume Backup Scopes and Frequency
- **Type:** Multi Line Text
- **Order:** 430

### data_backup_scopes_and_frequency_4

- **Question:** Data Volume Backup Scopes and Frequency
- **Type:** Multi Line Text
- **Order:** 430

Describe the scope of the backup(s) for the system drive / partition, including the frequency.

The backup scope is typically *"full"* or *"incremental"*.
The frequency refers the intervals at which the backup is taken, such as *"daily"* or *"weekly"*.

This can also include other scope information, such as paths, as well as the time of day for the backup(s).

### end_sustainment_4

- **Type:** Container End
- **Order:** 420

### additional_instructions

- **Question:** Additional Instructions
- **Type:** Multi Line Text
- **Order:** 450

**options_start**: 100
**options_split**: 800
| Left                                   | Right                              |
|----------------------------------------|------------------------------------|
| New Keyboard (200)                     | New Mouse (900)                    |
| Replace Existing Keyboard (300)        | Replace Existing Keyboard (1000)   |
| New KVM (400)                          | New Monitor (1100)                 |
| Replace Existing KVM (500)             | Replace Existing Monitor (1200)    |
| New Docking Station (600)              | New PIV Reader (1300)              |
| Replace Existing Docking Station (700) | Replace Existing PIV Reader (1400) |

**options_end**: 1500
**network_start**: 1600
**network_split**: 1900
| Left                          | Right                     |
|-------------------------------|---------------------------|
| Network (1700)                | Enclave (2000)            |
| Network Not Applicable (1800) | Other Enclave Name (2100) |

**network_end**: 2200
**location_start**: 2300
| Left                 | Right                            |
|----------------------|----------------------------------|
| Site (2400)          | Office / Room / Cubicle # (2500) |
| Requested For (2600) |                                  |

**location_end**: 2700

**Special Instructions**: 2800

| Left                             | Right                             |
|----------------------------------|-----------------------------------|
| Thin Client #1 (400)             | Thin Client #2 (1100)             |
| Thin Client #1 Peripherals (500) | Thin Client #2 Peripherals (1200) |
| Thin Client #1 Network (600)     | Thin Client #2 Network (1300)     |
| Thin Client #3 (700)             |                                   |
| Thin Client #3 Peripherals (800) |                                   |
| Thin Client #3 Network (900)     |                                   |

| Left                  | Right                 |
|-----------------------|-----------------------|
| Laptop #1             | Laptop #2             |
| Laptop #1 Peripherals | Laptop #2 Peripherals |
| Laptop #1 Network     | Laptop #2 Network     |

| Left                   | Right                  |
|------------------------|------------------------|
| Desktop #1             | Desktop #2             |
| Desktop #1 Peripherals | Desktop #2 Peripherals |
| Desktop #1 Network     | Desktop #2 Network     |

KVM Option
  Monitor
  Peripherals

Thin Client #1
  
  Thin Client #1 Peripherals: Use KVM / New peripherals / monitor

  Thin Client #1 Network

  Thin Client #2

    Thin Client #2 Peripherals: Use KVM / New peripherals / monitor

    Thin Client #2 Network

Laptop #1

  Laptop #1 Peripherals: Use KVM / New Monitor and Peripherals, New Peripherals, No Peripherals

  Laptop #1 Network

  Laptop #2

    Laptop #2 Peripherals: Use KVM / New Monitor and Peripherals, New Peripherals, No Peripherals

    Laptop #2 Network

Desktop #1

  Desktop #1 Peripherals: Use KVM / New peripherals / monitor

  Desktop #1 Network

  Desktop #2

    Desktop #2 Monitor: Use KVM / New peripherals / monitor

    Desktop #2 Network

Phone

Workspace Type

Office, Cubicle, Field Site

Date Required
