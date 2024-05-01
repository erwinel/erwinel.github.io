# Service Catalog

## New Virtual Server

### Tenant / Customer Information

| Left Column                 | Order | Right Column                      | Order |
|-----------------------------|-------|-----------------------------------|-------|
| Primary Service             | 200   | Server Role                       | 600   |
| New Service Name            | 200   | Server Role                       | 600   |
| Application Owner Group     | 300   | Technical Administration Group    | 700   |
| Primary Application Owner   | 400   | Primary Technical Administrator   | 800   |
| Secondary Application Owner | 500   | Secondary Technical Administrator | 900   |

### Demarcation

| Left Column | Order | Right Column | Order |
|-------------|-------|--------------|-------|
| Site        | 1200  | Network      | 1300  |

### Machine Specifications

| Left Column                | Order | Right Column             | Order |
|----------------------------|-------|--------------------------|-------|
| RAM (GB)                   | 1600  | Compute Capacity         | 2100  |
| Operating System           | 1700  | vCPUs                    | 2200  |
| System Volume Storage Type | 1800  | Data Volume Storage type | 2300  |
| System Volume Capacity     | 1900  | Data Volume Capacity     | 2400  |
| System Volume Label        | 2000  | Data Volume Label        | 2500  |

### Sustainment

| Left Column       | Order | Right Column                | Order |
|-------------------|-------|-----------------------------|-------|
| Protection Level  | 2800  | Backups                     | 3000  |
| Automatic Updates | 2900  | Backup Scopes and Frequency | 3100  |

### Primary Service

- For Existing Service
- Additional New Server
- For New Service

Primary Application Owner
primary_owner
Primary non-technical POC for application provided by the requested server (monitoring, patching, etc.).

Primary Technical Administrator
Primary POC for technical administration of application provided by the requested server (monitoring, patching, etc.).
primary_admin

Secondary Technical Administrator
Secondary POC for technical administration of application provided by the requested server (monitoring, patching, etc.).
secondary_admin

## New Storage Device

Request New Storage Device

- **Label:** Single Line Text
- **Storage Type:** Multiple Choice
  - **cifs** CIFS / SMB
  - **local_disk** Local Disk
  - **nfs** NFS
- **Capacity:** Single Line Text *(Decimal Number)*
- **Denomination:** Multiple Choice
  - **gb** Gigabytes
  - **tb** Terabytes
- **backups:** Backups
  - **none:** No Backups
  - **volume:** Entire Volume
  - **directories:** Specific Subdirectories (configured later)
- **target_device:** Target Device
  - **cmdb:** From CMDB
  - **new:** New Device
  - **other:** Other

- **waiting_for_approval:** Waiting for Approval
- **request_approved:** Submitted
- **fulfillment:** Fulfillment
- **complete:** Completed
- **Request Cancelled:** Request Cancelled
