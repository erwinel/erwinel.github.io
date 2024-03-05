# Incident Cancellation Testing Plan #5

Cancel a non-urgent incident for an ITIL user.

## Setup

Get the `INC` number of an [open incident where the caller is "Hunter Pickering" and the urgency is not high](https://usmskstage2.servicenowservices.com/now/nav/ui/classic/params/target/incident_list.do%3Fsysparm_query%3Dactive%253Dtrue%255Eincident_stateIN1%252C2%252C3%255Ecaller_id%253Ddac1050a473a11103f08bce5536d43fe%255Eurgency!%253D1).
If none exists, [impersonate](../Impersonation.md) user "Hunter Pickering" and submit an incident with the urgency **not** set to `1 - High`, making note of the `INC` number.

## Steps

1. [Impersonate](../Impersonation.md) user "Service Minion".
