# Update Sets

> The actual update set files can be found in the `Update Sets and Exports` subdirectory of the Shared ServiceNow folder.

## Committed Dates

| Name                                                                                          | usmskdev2    | usmskstage2 | usmsktrain2  | snow_dev   | snow_test  | snow_prod  |
|-----------------------------------------------------------------------------------------------|--------------|-------------|--------------|------------|------------|------------|
| [Service Catalog Baseline - 2023-09-06 a LTE](#service-catalog-baseline---2023-09-06-a-lte)   | 09/06/2023   |             |              |            |            |            |
| [*Service Catalog Baseline - 2023-09-01 LTE*](#service-catalog-baseline---2023-09-01-lte)     | *09/06/2023* |             |              |            |            |            |
| [Dev Setup - 2023-08-31 LTE](#dev-setup---2023-08-31-lte)                                     | 09/06/2023   | 09/01/2023  |              |            |            |            |
| [*Service Catalog Baseline - 2023-08-30 LTE*](#service-catalog-baseline---2023-08-30-lte)     | *09/01/2023* |             | *09/01/2023* |            |            |            |
| [Location Config - 2023-07-20 LTE](#location-config---2023-07-20-lte)                         | 08/31/2023   | 08/31/2023  | 08/31/2023   |            |            |            |
| [SLAs and Schedules - 2023-08-03 LTE](#slas-and-schedules---2023-08-03-lte)                     | 08/03/2023   |             |              | 08/03/2023 | 08/03/2023 | 08/03/2023 |
| [Pre-prod Config Sync - 2023-07-20 LTE](#pre-prod-config-sync---2023-07-20-lte)               | 07/20/2023   | 07/20/2023  | 07/20/2023   |            |            |            |
| [KB Setup 2022-10-31](#kb-setup-2022-10-31)                                                   |              |             |              |            |            |            |
| [Company Setup 2022-10-31](#company-setup-2022-10-31)                                         |              |             |              |            |            |            |

## Update Set Sources

| Name                                                                                          | Source Instance         | Completed On |
|-----------------------------------------------------------------------------------------------|-------------------------|--------------|
| [Service Catalog Baseline - 2023-09-06 a LTE](#service-catalog-baseline---2023-09-06-a-lte)   | usmskdev2               | 09/06/2023   |
| [*Service Catalog Baseline - 2023-09-01 LTE*](#service-catalog-baseline---2023-09-01-lte)     | *usmskdev2*             | *09/06/2023* |
| [Dev Setup - 2023-08-31 LTE](#dev-setup---2023-08-31-lte)                                     | usmskstage2             | 09/01/2023   |
| [*Service Catalog Baseline - 2023-08-30 LTE*](#service-catalog-baseline---2023-08-30-lte)     | *usmsktrain2*           | *09/01/2023* |
| [Location Config - 2023-07-20 LTE](#location-config---2023-07-20-lte)                         | usmskdev2               | 08/31/2023   |
| [SLAs and Schedules - 2023-08-03 LTE](#slas-and-schedules---2023-08-03-lte)                     | usmskdev2               | 08/03/2023   |
| [Pre-prod Config Sync - 2023-07-20 LTE](#pre-prod-config-sync---2023-07-20-lte)               | usmsktrain2             | 07/20/2023   |
| [KB Setup 2022-10-31](#kb-setup-2022-10-31)                                                   | *personal dev instance* | 11/15/2022   |
| [Company Setup 2022-10-31](#company-setup-2022-10-31)                                         | *personal dev instance* | 11/15/2022   |

## Update Set Details

## Service Catalog Baseline - 2023-09-06 a LTE

Reorganization of categories and catalogs, and adds more catalog items.

- **Source Instance:** usmskdev2
- **Completed On:** 09/06/2023

Known Issues

- **sc_cat_item_catalog_6dd2628d1b81b9509a872f41f54bcb78:** Could not find a record in sc_cat_item for column sc_cat_item referenced in this update
  - Catalog Item **Software Incident** *(dbeafdcd1bce9410edce10ad9c4bcbe3)* is missing. This is obsolete and should be removed.
- **sc_cat_item_catalog_de822e4d1b81b9509a872f41f54bcbbd:** Could not find a record in sc_cat_item for column sc_cat_item referenced in this update
  - Catalog Item **Create Normal Change** *(4d5e08b21b759010edce10ad9c4bcb48)* is missing. This is obsolete and should be removed.
- **sc_cat_item_catalog_de822e4d1b81b9509a872f41f54bcbc5:** Could not find a record in sc_cat_item for column sc_cat_item referenced in this update
  - Catalog Item **Create Emergency Change** *(d698b5b31b825010edce10ad9c4bcb98)* is missing. This is obsolete and should be removed.
- **sc_cat_item_catalog_a5d2628d1b81b9509a872f41f54bcb4b:** Could not find a record in sc_cat_item for column sc_cat_item referenced in this update
  - Catalog Item **Hardware Incident** *(abd5d1091b8e9410edce10ad9c4bcb4b)* is missing. This is obsolete and should be removed.

## Service Catalog Baseline - 2023-09-01 LTE

- **Source Instance:** usmskdev2
- **Completed On:** 09/06/2023
- **Superceded By:** [Service Catalog Baseline - 2023-09-06 a LTE](#service-catalog-baseline---2023-09-06-a-lte)

Selected updates from another user's update set, which added more catalog items.

## Dev Setup - 2023-08-31 LTE

- **Source Instance:** usmskstage2
- **Completed On:** 09/01/2023

## Service Catalog Baseline - 2023-08-30 LTE

- **Source Instance:** usmsktrain2
- **Completed On:** 09/01/2023
- **Superceded By:** [Service Catalog Baseline - 2023-09-06 a LTE](#service-catalog-baseline---2023-09-06-a-lte)

Establishes a baseline of service catalog categories and items.

## Location Config - 2023-07-20 LTE

- **Source Instance:** usmskdev2
- **Completed On:** 08/31/2023

Modifications to Location, User, and Task fields and form layouts.

Known Issues

- **sys_ui_section_434dba9dc0a801640003eb8a19faf7ca:** Could not find a table field (cmn_location.u_site_id) referenced in this update
  - This is for an obsolete field and needs to be removed.
- **sys_ui_list_cmn_location_text_search:** Could not find a table field (cmn_location.u_site_id) referenced in this update
  - This is for an obsolete field and needs to be removed.
- **sys_ui_section_434dba9dc0a801640003eb8a19faf7ca:** Found a local update that is newer than this one
  - This is for a customized layout of the default form view. It is okay to accept remote update.
- **sys_ui_section_4fe9e901c0a8016400b9726e64f2a0a5:** Could not find a table field (sys_user.u_contractor) referenced in this update
  - This is for an obsolete field and needs to be removed.
- **sys_ui_list_cmn_location_null:** Could not find a table field (cmn_location.u_site_id) referenced in this update
  - This is for an obsolete field and needs to be removed.
- **sys_ui_section_737909df1b80f910edce10ad9c4bcb3b:** Could not find a table field (cmn_location.u_region) referenced in this update
  - This is for an obsolete field and needs to be removed.

## SLAs and Schedules - 2023-08-03 LTE

- **Source Instance:** usmskdev2
- **Completed On:** 08/03/2023

Initial definitions for Schedules and SLAs, including holiday definitions.

Known Issues

- **kb_knowledge_0a3245f31bd03d509a872f41f54bcb68:** Could not find a record in kb_knowledge_base for column kb_knowledge_base referenced in this update
  - Knowledge Base **Using ServiceNow** *(7a2cec7aaf91f01064bb30330e274939)* is not present. This record needs to be imported from [Knowledge Bases.xml](./data/Knowledge%20Bases.xml).
- **kb_knowledge_0a3245f31bd03d509a872f41f54bcb68:** Could not find a record in kb_category for column kb_category referenced in this update
  - Knowledge Category **ServiceNow Applications** *(556a696d1b5c7150edce10ad9c4bcbae)* is not present. This record needs to be imported from [Knowledge Bases.xml](./data/Knowledge%20Bases.xml).

## Pre-prod Config Sync - 2023-07-20 LTE

- **Source Instance:** usmsktrain2
- **Completed On:** 07/20/2023

Makes sure definitions relating to Locations and Users are the same across all production and pre-production instances.

## KB Setup 2022-10-31

- **Source Instance:** *personal dev instance*
- **Completed On:** 11/15/2022

- **kb_uc_can_contribute_mtom_aa3363972f62111004e4d3f62799b632:** Could not find a record in kb_knowledge_base for column kb_knowledge_base referenced in this update
  - Knowledge Base **Team Knowledge** *(6941e943afd9b4103a4ea33b3e27)* is not present. This record needs to be imported from [Knowledge Bases.xml](./data/Knowledge%20Bases.xml).
- **kb_knowledge_base_0507239b2f62111004e4d3f62799b67e:** Could not find a record in sys_data_policy2 for column data_policy referenced in this update
  - Data Policy *a5376b9b2f62111004e4d3f62799b6fc* is not present.
- **kb_knowledge_cfae5cf11b4a55101497a820f54bcbbe:** Could not find a record in sys_user for column author referenced in this update
  - Author for **KB0010149** references missing User *47954a0edbdc3300b53f341f7c9619f4*
- **kb_knowledge_c0fd45751b8a55101497a820f54bcb70:** Could not find a record in sys_user for column author referenced in this update
  - Author for **KB0010153** references missing User *47954a0edbdc3300b53f341f7c9619f4*
- **kb_knowledge_ae2a5dc21bce9510ec0320efe54bcb55:** Could not find a record in sys_user for column author referenced in this update
  - Author for **KB0010152** references missing User *47954a0edbdc3300b53f341f7c9619f4*
- **kb_uc_can_contribute_mtom_cab86f9b2f62111004e4d3f62799b634:** Could not find a record in user_criteria for column user_criteria referenced in this update
  - User Criteria *b6572f9b2f62111004e4d3f62799b6f3* is not present. This record needs to be imported from [Knowledge Bases.xml](./data/Knowledge%20Bases.xml).
- **kb_uc_can_contribute_mtom_cab86f9b2f62111004e4d3f62799b634:** Could not find a record in user_criteria for column user_criteria referenced in this update
  - User Criteria *b6572f9b2f62111004e4d3f62799b6f3* is not present. This record needs to be imported from [Knowledge Bases.xml](./data/Knowledge%20Bases.xml).

Defines Knowledge bases, KB catagories and KB articles shared across instances.

## Company Setup 2022-10-31

- **Source Instance:** *personal dev instance*
- **Completed On:** 11/15/2022

Defines baseline Groups, Companies, Departments, and Business Units shared across instances.

Known Issues

- **business_unit_32fe2621477211103f08bce5536d43cd:** Could not find a record in core_company for column company referenced in this update
  - Company **U.S. Marhsals Service** *(2688e2a9473211103f08bce5536d4357)* is not present. This record needs to be imported from [Users and Groups.xml](./data/Users%20and%20Groups.xml).
