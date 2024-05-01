# New Data Disk

Request to add a data disk to a virtual machine

## Layout

[How do you wish to specify / select the target machine?](#machine_selection_type)

| Left Column | Right Column |
|-------------|--------------|
| [Configuration Item](#configuration_item) | [Volume / Drive Type](#disk_type) |
| [Disk Bus Type](#disk_bus_type) | [Drive Letter / Mount Path](#mount_point) |
| [Disk Capacity](#disk_capacity) | [Volume Label](#volume_label) |

| Left Column | Right Column |
|-------------|--------------|
| [Configuration Item](#configuration_item) | [Volume / Drive Type](#disk_type) |
| [File Share](#file_share) | [Drive Letter / Mount Path](#mount_point) |

| Left Column | Right Column |
|-------------|--------------|
| [Requested Item](#requested_item) | [Volume / Drive Type](#disk_type) |
| [Disk Bus Type](#disk_bus_type) | [Drive Letter / Mount Path](#mount_point) |
| [Disk Capacity](#disk_capacity) | [Volume Label](#volume_label) |

| Left Column | Right Column |
|-------------|--------------|
| [Requested Item](#requested_item) | [Volume / Drive Type](#disk_type) |
| [File Share](#file_share) | [Drive Letter / Mount Path](#mount_point) |

| Left Column | Right Column |
|-------------|--------------|
| [Machine Name](#machine_name) | [Network](#network) |
| [Volume / Drive Type](#disk_type)  | [Disk Bus Type](#disk_bus_type) |
| [Drive Letter / Mount Path](#mount_point) | [Disk Capacity](#disk_capacity) |
| [Volume Label](#volume_label) |   |

| Left Column | Right Column |
|-------------|--------------|
| [Machine Name](#machine_name) | [Network](#network) |
| [Volume / Drive Type](#disk_type) | [File Share](#file_share) |
| [Drive Letter / Mount Path](#mount_point) |   |

[Additional Instructions](#additional_instructions)

## variables

### machine_selection_type

- **Question:** How do you wish to specify / select the target machine?
- **Type:** Multiple Choice
  - **ci**: Existing Configuration Item
  - **ritm**: Existing Virtual Machine Request
  - **name_and_network**: Enter Name and Network
- **Mandatory:** `true`
- **Default value:** ci
- **Order:** 100

### specs_start

- **Type:** Container Start
- **Layout:** 2 Columns Wide, alternating sides
- **Order:** 110

### computer_ci

- **Question:** Computer CI
- **Type:** Reference (Computer *\[cmdb_ci_computer\]*)
- **Mandatory:** `true`
- **UI Policy:** Visible and mandatory when [machine_selection_type](#machine_selection_type) is `ci`.
- **Order:** 120

### requested_item

- **Question:** VM Requested Item
- **Type:** Reference (Requested Item *\[sc_req_item\]*)
- **Reference Qualifier Condition** `active` == `true` AND `item` == `d129234487c8c610246131d70cbb35b6`
- **Hidden:** `true`
- **UI Policy:** Visible and mandatory when [machine_selection_type](#machine_selection_type) is `ritm`.
- **Order:** 130

### machine_name

- **Question:** Machine Name
- **Type:** Single Line Text
- **Hidden:** `true`
- **UI Policy:** Visible and mandatory when [machine_selection_type](#machine_selection_type) is `name_and_network`.
- **Order:** 140

### network

- **Question:** Network
- **Type:** Reference (Physical Network *\[x_g_doj_usmsprogop_u_cmdb_ci_physical_network\]*)
- **Reference Qualifier Condition** `Operational status` is `Operational`
- **Hidden:** `true`
- **UI Policy:** Visible and mandatory when [machine_selection_type](#machine_selection_type) is `name_and_network`.
- **Order:** 150

### disk_type

- **Question:** Volume / Drive Type
- **Type:** Multiple Choice
  - **local_disk**: Local Disk
  - **cifs**: CIFS/SMB
  - **nfs**: NFS
- **Mandatory:** `true`
- **Default value:** local_disk
- **Order:** 160

### disk_bus_type

- **Question:** Disk Bus Type
- **Type:** Multiple Choice
  - **scsi**: SCSI
  - **pci**: PCI
  - **ide**: IDE
  - **sata**: SATA
- **Mandatory:** `true`
- **UI Policy:** Visible and mandatory when [Disk Bus Type](#disk_bus_type) is `local`.
- **Default value:** scsi
- **Order:** 170

The bus type for the local disk.

### file_share_path

- **Question:** File Share Path
- **Type:** Single Line Text
- **UI Policy:** Visible and mandatory when [Disk Bus Type](#disk_bus_type) is not `local`.
- **Hidden:** `true`
- **Order:** 180

### mount_point

- **Question:** Drive Letter / Mount Path
- **Type:** Single Line Text
- **Mandatory:** `true`
- **Order:** 190

### capacity

- **Question:** Capacity
- **Type:** Single Line Text
- **UI Policy:** Visible and mandatory when [Disk Bus Type](#disk_bus_type) is `local`.
- **Default value:** 40 GiB
- **Validation Regex:** Denominated Data Size
- **Order:** 200

Specify size of system volume (drive) using the appropriate byte denomination (i.e, bytes, KB, MB, GB, etc.).

Values without a suffix are assumed to be Gb (gigabytes).

### volume_label

- **Question:** Volume Label
- **Type:** Single Line Text
- **UI Policy:** Visible and mandatory when [Disk Bus Type](#disk_bus_type) is `local`.
- **Order:** 210

### backup_disk

- **Question:** Backup Disk
- **Type:** Yes / No
- **Mandatory:** `true`
- **Default value:** no
- **Order:** 230

### specs_end

- **Type:** Container End
- **Order:** 240

### backup_scopes_and_frequency

- **Question:** Backup Scopes and Frequency
- **Type:** Multi Line Text
- **Order:** 250

Describe the scope of the backup(s) for the system drive / partition, including the frequency.

The backup scope is typically *"full"* or *"incremental"*.
The frequency refers the intervals at which the backup is taken, such as *"daily"* or *"weekly"*.

This can also include other scope information, such as paths, as well as the time of day for the backup(s).

### additional_instructions

- **Question:** Additional Instructions
- **Type:** Multi Line Text
- **Order:** 260
