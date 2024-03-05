# Incident Resolution Testing Plan #3

Resolve an urgent incident for a non-VIP user with no group memberships.

## Setup

Get the `INC` number of an [open incident where the caller is "Stake Holder" and the urgency is high](https://usmskstage2.servicenowservices.com/now/nav/ui/classic/params/target/incident_list.do%3Fsysparm_query%3Dactive%253Dtrue%255Eincident_stateIN1%252C2%252C3%255Ecaller_id%253Db4f097932f22111004e4d3f62799b690%255Eurgency%253D1).
If none exists, [impersonate](../Impersonation.md) user "Stake Holder" and submit an incident with the urgency set to `1 - High`, making note of the `INC` number.

## Steps

1. [Impersonate](../Impersonation.md) user "Service Minion".
