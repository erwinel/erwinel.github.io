# Create VM

Individual server request.

## Layout

### Container: [Tenant / Customer Information](#tenant_customer_information)

| Left Column                                         | Right Column                                             |
|-----------------------------------------------------|----------------------------------------------------------|
| [Primary Service](#primary_service)                 | [Server Role](#server_role)                              |
| [Application Owner Group](#application_owner_group) | [Technical Administration Group](#technical_admin_group) |
| [Primary Application Owner](#primary_owner)         | [Primary Technical Administrator](#primary_admin)        |
| [Secondary Application Owner](#secondary_owner)     | [Secondary Technical Administrator](#secondary_admin)    |

[Short Description](#server_description)

### Container: [Demarcation](#demarcation)

| Left Column   | Right Column        |
|---------------|---------------------|
| [Site](#site) | [Network](#network) |

### Container: [Machine Specifications](#machine_specifications)

| Left Column                                   | Right Column                          |
|-----------------------------------------------|---------------------------------------|
| [Operating System](#operating_system)         | [Operating System Name](#os_name)     |
| [System Disk Type](#system_disk_type)         | [Compute Capacity](#compute_capacity) |
| [System Disk Capacity](#system_disk_capacity) | [vCPU(s)](#vcpus)                     |
| [System Volume Label](#system_volume_label)   | [RAM (GiB)](#ram_gb)                  |

### Container [Sustainment](#sustainment)

| Left Column                               | Right Column                            |
|-------------------------------------------|-----------------------------------------|
| [Protection Level](#protection_level)     | [Automatic Updates](#automatic_updates) |
| [Backup System Disk](#backup_system_disk) |                                         |

[Backup Scopes and Frequency](#backup_scopes_and_frequency)

## (no container)

[Additional Instructions](#additional_instructions)

## Variables

### tenant_customer_information

- **Question:** Tenant / Customer Information
- **Type:** Container Start
- **Layout:** 1 Column Wide
- **Display title:** `true`
- **Order:** 100

### tenant_customer_table

- **Type:** Container Start
- **Layout:** 2 Columns Wide, alternating sides
- **Order:** 110

### primary_service

- **Question:** Primary Service
- **Type:** Single Line Text
- **Mandatory:** `true`
- **Order:** 120

This is the name of the primary hosted application or service that the server will provide.

### server_role

- **Question:** Server Role
- **Type:** Single Line Text
- **Order:** 130

This is the optional role name for the server. This is applicable for multi-server applications. Examples might be "Database #1" or "Web Front End".

### application_owner_group

- **Question:** Application Owner Group
- **Type:** Reference (Group *\[sys_user_group\]*)
- **Mandatory:** `true`
- **Order:** 140

Group with overall accountability for the application provided by the requested server.

### technical_admin_group

- **Question:** Technical Administration Group
- **Type:** Reference (Group *\[sys_user_group\]*)
- **Mandatory:** `true`
- **Order:** 150

Group responsible for technical administration of application provided by the requested server (monitoring, patching, etc.).

### primary_owner

- **Question:** Primary Application Owner
- **Type:** Reference (User *\[sys_user\]*)
- **Mandatory:** `true`
- **Order:** 160

Primary non-technical POC for application provided by the requested server.

### primary_admin

- **Question:** Primary Technical Administrator
- **Type:** Reference (User *\[sys_user\]*)
- **Mandatory:** `true`
- **Order:** 170

Primary POC for technical administration of application provided by the requested server (monitoring, patching, etc.).

### secondary_owner

- **Question:** Secondary Application Owner
- **Type:** Reference (User *\[sys_user\]*)
- **Order:** 180

Secondary non-technical POC for application provided by the requested server.

### secondary_admin

- **Question:** Secondary Technical Administrator
- **Type:** Reference (User *\[sys_user\]*)
- **Order:** 190

Secondary POC for technical administration of application provided by the requested server (monitoring, patching, etc.).

### end_tenant_customer_table

- **Type:** Container End
- **Order:** 200

### server_description

- **Question:** Short Description
- **Type:**  Single Line Text
- **Variable Width:** 100%
- **Order:** 210

Optional short description of server.

### end_tenant_customer_information

- **Type:** Container End
- **Order:** 220

### demarcation

- **Question:** Demarcation
- **Type:** Container Start
- **Layout:** 2 Columns Wide, one side, then the other
- **Order:** 230

### site

- **Question:** Site
- **Type:** Reference (Location \[cmn_location\])
- **Mandatory:** `true`
- **Reference Qualifier Condition** `Location type` is `Site`
- **Order:** 240

The virtual site location for the server.

### network

- **Question:** Network
- **Type:** Reference (Physical Network *\[x_g_doj_usmsprogop_u_cmdb_ci_physical_network\]*)
- **Mandatory:** `true`
- **Reference Qualifier Condition** `Operational status` is `Operational`
- **Order:** 250

The target network where the server will be created.

### end_demarcation

- **Type:** Container End
- **Order:** 260

### machine_specifications

- **Question:** Machine Specifications
- **Type:** Container Start
- **Layout:** 2 Columns Wide, one side, then the other
- **Display title:** `true`
- **Order:** 270

### operating_system

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

### system_disk_type

- **Question:** System Disk Type
- **Type:** Multiple Choice
  - **scsi**: SCSI
  - **pci**: PCI
  - **ide**: IDE
  - **sata**: SATA
- **Mandatory:** `true`
- **Order:** 290

The bus type for the system disk.

### system_disk_capacity

- **Question:** System Disk Capacity
- **Type:** Single Line Text
- **Default value:** 40 GiB
- **Validation Regex:** Denominated Data Size
- **Order:** 300

Specify size of system volume (drive) using the appropriate byte denomination (i.e, bytes, KB, MB, GB, etc.).

Values without a suffix are assumed to be Gb (gigabytes).

### system_volume_label

- **Question:** System Volume Label
- **Type:** Single Line Text
- **Order:** 310

Volume label for the system drive / root partition.

### os_name

- **Question:** Operating System Name
- **Type:** Single Line Text
- **Hidden:** `true`
- **Order:** 320
- **UI Policy:** Visible and mandatory when [Operating System](#operating_system) is not `other`.

Please enter the name of the operating system to install on the virtual machine.

### compute_capacity

- **Question:** Compute Capacity
- **Type:** Multiple Choice
  - **small**: Small: 1 vCPU, 2 GB RAM
  - **medium**: Medium: 2 vCPU, 4 GB RAM
  - **large**: Large: 4 vCPU, 8 GB RAM
  - **custom**: Custom (Requires Engineer Review)
- **Mandatory:** `true`
- **Default value:** small
- **Order:** 330

### vcpus

- **Question:** vCPU(s)
- **Type:**
- **Default value:** 2
- **Validation Regex:** Number
- **Hidden:** `true`
- **Order:** 340
- **UI Policy:** Visible and mandatory when [Compute Capacity](#compute_capacity) is `custom`.

Number of virtual CPUs.

### ram_gb

- **Question:** RAM (GiB)
- **Type:** Single Line Text
- **Default value:** 4
- **Validation Regex:** Decimal Value
- **Hidden:** `true`
- **Order:** 350
- **UI Policy:** Visible and mandatory when [Compute Capacity](#compute_capacity) is `custom`.

Server Ram in Gigabytes.

### end_machine_specifications

- **Type:** Container End
- **Order:** 360

### sustainment

- **Question:** Sustainment
- **Type:** Container Start
- **Layout:** 1 Column Wide
- **Display title:** `true`
- **Order:** 370

### sustainment_table

- **Type:** Container Start
- **Layout:** 2 Columns Wide, one side, then the other
- **Order:** 380

### protection_level

- **Question:** Protection Level
- **Type:** Multiple Choice
  - **beta**: Beta App Server
  - **mission_support**: Support App Server
  - **mission_critical**: Mission-Critical
- **Mandatory:** `true`
- **Default value:** support
- **Order:** 390

### automatic_updates

- **Question:** Automatic Updates
- **Type:** Yes / No
- **Mandatory:** `true`
- **Default value:** yes
- **Order:** 400

### backup_system_disk

- **Question:** Backup System Disk
- **Type:** Yes / No
- **Mandatory:** `true`
- **Default value:** no
- **Order:** 410

### end_sustainment_table

- **Type:** Container End
- **Order:** 420

### backup_scopes_and_frequency

- **Question:** Backup Scopes and Frequency
- **Type:** Multi Line Text
- **Order:** 430

Describe the scope of the backup(s) for the system drive / partition, including the frequency.

The backup scope is typically *"full"* or *"incremental"*.
The frequency refers the intervals at which the backup is taken, such as *"daily"* or *"weekly"*.

This can also include other scope information, such as paths, as well as the time of day for the backup(s).

### end_sustainment

- **Type:** Container End
- **Order:** 440

### additional_instructions

- **Question:** Additional Instructions
- **Type:** Multi Line Text
- **Order:** 450
