# MID Servers

Some links (mostly the KB articles) require an account on HIWAVE. Please contact a ServiceNow Administrator for assistance if needed.

See Also:

- [ServiceNow Documentation](https://docs.servicenow.com/bundle/utah-servicenow-platform/page/product/mid-server/concept/mid-server-landing.html)
- [KB0540193: Discovery and MID Server Resources](https://hiwave.servicenowservices.com/kb?id=kb_article_view&sysparm_article=KB0540193)
- [Discovery](./Discovery.md)
- [Configuration Management](./Configuration-Management.md)
- [Self-Hosted References](./Self-Hosted.md)
- [Home](./README.md)

## Operations / Troubleshooting

- [KB0597571: Troubleshooting Guide: MID Server](https://hiwave.servicenowservices.com/kb?id=kb_article_view&sysparm_article=KB0597571)
  - [KB0863673: MID Servers and Certificates](https://hiwave.servicenowservices.com/kb?id=kb_article_view&sysparm_article=KB0863673)
  - [KB0863109: MID Server cannot connect to ServiceNow instance, error in agent log: org.apache.commons.httpclient.HttpException: javax.net.ssl.SSLPeerUnverifiedException: peer not authenticated](https://hiwave.servicenowservices.com/kb?id=kb_article_view&sysparm_article=KB0863109)
- [KB0744261: Troubleshooting MID server SSL issues](https://hiwave.servicenowservices.com/kb?id=kb_article_view&sysparm_article=KB0744261)

## Deploy / Update

- [MID Server system requirements](https://docs.servicenow.com/bundle/utah-servicenow-platform/page/product/mid-server/reference/r_MIDServerSystemRequirements.html)
- [Installing the MID Server](https://docs.servicenow.com/bundle/utah-servicenow-platform/page/product/mid-server/concept/mid-server-installation.html)
- [KB0760123: MID Server installation and upgrade in a self-hosted environment that blocks internet access](https://hiwave.servicenowservices.com/kb?id=kb_article_view&sysparm_article=KB0760123)
- [KB0565184: How to upgrade a MID Server that does not have access to the AutoUpgrade install server on the Internet](https://hiwave.servicenowservices.com/kb?id=kb_article_view&sysparm_article=KB0565184)
- [Add SSL certificates for the MID Server](https://docs.servicenow.com/bundle/utah-servicenow-platform/page/product/mid-server/task/add-ssl-certificates.html)
- [KB0864770: MID Server certificate check security policies for self-hosted customers](https://support.servicenow.com/kb?id=kb_article_view&sysparm_article=KB0864770)
- [Configure MID Server network connectivity](https://docs.servicenow.com/bundle/utah-servicenow-platform/page/product/mid-server/task/t_ConfigMIDSvrConnecPrereq.html)
- [keytool (oracle.com)](https://docs.oracle.com/en/java/javase/11/tools/keytool.html)

### Connections and Credentials

- [ServiceNow Documentation](https://docs.servicenow.com/bundle/utah-platform-security/page/product/credentials/reference/r-credentials.html)
- [Windows credentials](https://docs.servicenow.com/bundle/utah-platform-security/page/product/credentials/reference/r_WindowsCredentialsForm.html)
  - The MID Server service must have domain admin credentials to have access to the Windows machines in the domain (see [Set up MID Servers to use PowerShell](https://docs.servicenow.com/bundle/utah-it-operations-management/page/product/discovery/task/t_SetUpAMIDServerToUsePowerShell.html)).
- [SSH credentials](https://docs.servicenow.com/bundle/utah-platform-security/page/product/credentials/reference/r_SSHCredentialsForm.html)
- [SNMP credentials](https://docs.servicenow.com/bundle/utah-platform-security/page/product/credentials/concept/c_SNMPCredentials.html)
- [KB0867669: CMDB - Create a Windows service account with "Log on as Service"](https://hiwave.servicenowservices.com/kb?id=kb_article_view&sysparm_article=KB0867669)
