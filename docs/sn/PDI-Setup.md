# Personal Developer Instance Setup

This explains how to set up a new Personal Developer Instance for testing USMS components.

- [Import Initial Update Sets](#import-initial-update-sets)
- [Install Products and Plugins](#install-products-and-plugins)
  - [Install from PDI Website](#install-from-pdi-website)
  - [Install Products](#install-products)
  - [Install Store Applications](#install-store-applications)
- [Configure Source Control Credentials](#configure-source-control-credentials)
- [Import USMS Program Operations Application](#import-usms-program-operations-application)
- [Import XML Data](#import-xml-data)
- [Import Additional Update Sets](#import-additional-update-sets)
- [See Also](#see-also)

## Import Initial Update Sets

1. Retrieve and apply the ["Company Setup 2024-02-26" update set](https://github.com/erwinel/Company%20Setup%202024-02-26.xml).
2. Retrieve and apply the ["KB Setup 2022-10-31" update set](https://github.com/erwinel/usms-update-sets/blob/8b4b7e6399ab652bce08f0544157018ea959a481/KB%20Setup%202022-10-31.xml) update set.
3. Retrieve and apply the ["KB Setup 2024-02-26 LTE" update set](https://github.com/erwinel/KB%20Setup%202024-02-26%20LTE.xml).
4. Retrieve and apply the ["KB Setup 2024-02-22" update set](https://github.com/erwinel/KB%20Setup%202024-02-22.xml).
5. Retrieve and apply the ["KB Setup 2024-02-26" update set](https://github.com/erwinel/KB%20Setup%202024-02-26.xml).
6. Retrieve and apply the ["Location Config - 2023-07-20 LTE" update set](https://github.com/erwinel/Location%20Config%20-%202023-07-20%20LTE.xml).
7. Retrieve and apply the ["SLAs and Schedules 2024-02-26" update set](https://github.com/erwinel/SLAs%20and%20Schedules%202024-02-26.xml).

## Install Products and Plugins

### Install from PDI Website

From the "Activate Plugin" option under the "Instance Actions" menu of the Servicenow Developer website, activate the following:

- **Software Asset Management Professional** *(optional)*
- **Discovery** *(optional)*
- **File Based Discovery** *(optional)*
- **Service Mapping** *(optional)*

You can see the status of an ongoing plugin activation by navigating to `System Diagnostics` ⇒ `Progress Workers`.

### Install Products

From the Application Manager in your Personal ServiceNow development instance, install or update the following ServiceNow products:

1. Agile Development
2. Change Management
3. Configuration Management Database (CMDB)
4. Customer Service Management - Pending activiation in on-prem instances.
5. Demand Management - Pending activiation in on-prem instances.
6. Incident Management
7. ITOM Visibility
8. Knowledge Management
9. Project Portfolio Management - Pending activiation in production.
10. Application Portfolio Management - Pending activiation in production.
11. Digital Portfolion Management

### Install Store Applications

From the Application Manager in your Personal ServiceNow development instance, install or update the following ServiceNow store applications:

1. Third Party Risk Management

## Configure Source Control Credentials

The connection to a source control repository uses a Credential file to securely store the credentials to authenticate to the repository. The credentials for an account can be used with multiple repositories.

To create a Credential record:

1. Use the All menu to open `Connections & Credentials` ⇒ `Credentials`.
2. Click the New button.
3. In the What type of Credentials would you like to create? list, select Basic Auth Credentials.
4. Configure the Basic Auth Credentials record.
  The Basic Auth Credentials form has fields to configure Name, Order, User name, Password, Active, and a list of Credential aliases.
   - Name: A name to identify the Credential record.
   - Order: The order in which the credential is attempted if multiple credentials exist. The Order value is not used for source control.
   - User name: The username to authenticate to the source control repository.
   - Password: The password to authenticate to the source control repository. Use a personal access token instead of a password when multi-factor authentication is configured for the source control repository.
   - Active: Select to make the credential available for use.
   - Credential alias: A list of integrations that use the credential. The Credential alias is not used for source control.
5. Click the Submit button.

The predecing content was copied from the training module entitled [Managing the Development Environment](https://developer.servicenow.com/learn/courses/tokyo/app_store_learnv2_devenvironment_tokyo_managing_the_development_environment).

## Import USMS Program Operations Application

First, Open the [x_g_doj_usmsprogop repository in GitHub](https://github.com/erwinel/x_g_doj_usmsprogop), and create a branch for your instance on GitHub. The name of the branch should start with `sn_instances/` followed with the host name of your personal developer instance. For example, if the URL to your personal developer instance is `https://dev193970.service-now.com`, you would use `sn_instances/dev193970`.

Next, using Application Studio, use "Import from Source Control" to import the application from <https://github.com/erwinel/x_g_doj_usmsprogop.git>. The branch name should be auto-populated with the branch you created on GitHub.

## Import XML Data

Import the following XML files:

1. [Users and Groups](https://github.com/erwinel/Users%20and%20Groups.xml)
2. [Sites and Regions](https://github.com/erwinel/Sites%20and%20Regions.xml)
3. [Physical Networks](https://github.com/erwinel/Physical%20Networks.xml)

## Import Additional Update Sets

1. Retrieve and apply the [Company Setup 2024-03-04](https://github.com/erwinel/usms-update-sets/blob/0cd5fc92b4b439e3b3125987c8b40d036a0826b2/Company%20Setup%202024-03-04.xml) update set.
2. Retrieve and apply the ["Service Catalog Baseline - 2024-02-07 LTE" update set](https://github.com/erwinel/Service%20Catalog%20Baseline%20-%202024-02-07%20LTE.xml).
3. Retrieve and apply the ["Dev Setup 2023-09-06 LTE" update set](https://github.com/erwinel/usms-update-sets/blob/355856fca96df093176d54978c40f5973a391fec/Dev%20Setup%202023-09-06%20LTE.xml).
4. Retrieve and apply the ["Production Sync 20240430" update set](https://github.com/erwinel/Production%20Sync%2020240430.xml).
5. Retrieve and apply the ["Service Catalog Updates 20240430" update set](https://github.com/erwinel/Service%20Catalog%20Updates%2020240430.xml.xml).

## See Also

- [GitHub Guide](https://developer.servicenow.com/dev.do#!/guides/tokyo/developer-program/github-guide/github-and-the-developer-site-training-guide-introduction)
- [Creating a personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token#creating-a-token)
- [Managing the Development Environment](https://developer.servicenow.com/learn/courses/tokyo/app_store_learnv2_devenvironment_tokyo_managing_the_development_environment)
