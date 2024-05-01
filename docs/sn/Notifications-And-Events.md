# Notifications and Events

- [Tables](#tables)
  - [Approval Table](#approval-table)
  - [Catalog Task Table](#catalog-task-table)
  - [Live Feed Message Table](#live-feed-message-table)
  - [Live Mention Table](#live-mention-table)
  - [Incident Table](#incident-table)
  - [Problem Table](#problem-table)
  - [Problem Task Table](#problem-task-table)
  - [Request Table](#request-table)
  - [Requested Item Table](#requested-item-table)
  - [Task Table](#task-table)
- [Business Rules](#business-rules)
  - [Business Rule: Approval Events (Task)](#business-rule-approval-events-task)
  - [Business Rule: global events](#business-rule-global-events)
  - [Business Rule: incident events](#business-rule-incident-events)
  - [Business Rule: live feed events](#business-rule-live-feed-events)
  - [Business Rule: Live Feed message events](#business-rule-live-feed-message-events)
  - [Business Rule: Live message events](#business-rule-live-message-events)
  - [Business Rule: metrics events](#business-rule-metrics-events)
  - [Business Rule: problem events](#business-rule-problem-events)
  - [Business Rule: problem\_task events](#business-rule-problem_task-events)
  - [Business Rule: Raise an event when State changes](#business-rule-raise-an-event-when-state-changes)
  - [Business Rule: sc req item events](#business-rule-sc-req-item-events)
  - [Business Rule: sc request events](#business-rule-sc-request-events)
  - [Business Rule: sc\_req\_item comment events](#business-rule-sc_req_item-comment-events)
  - [Business Rule: sc\_task\_events](#business-rule-sc_task_events)
  - [Business Rule: task events](#business-rule-task-events)
- [Event Registry](#event-registry)
  - [Event: approval.cancelled](#event-approvalcancelled)
  - [Event: approval.inserted](#event-approvalinserted)
  - [Event: approval.rejected](#event-approvalrejected)
  - [Event: approval.rejected.by.other](#event-approvalrejectedbyother)
  - [Event: incident.assigned](#event-incidentassigned)
  - [Event: incident.assigned.to.group](#event-incidentassignedtogroup)
  - [Event: incident.commented](#event-incidentcommented)
  - [Event: incident.escalated](#event-incidentescalated)
  - [Event: incident.inactive](#event-incidentinactive)
  - [Event: incident.inserted](#event-incidentinserted)
  - [Event: incident.priority.1](#event-incidentpriority1)
  - [Event: incident.resolved\_by\_problem](#event-incidentresolved_by_problem)
  - [Event: incident.severity.1](#event-incidentseverity1)
  - [Event: incident.updated](#event-incidentupdated)
  - [Event: incident.updated\_by\_problem](#event-incidentupdated_by_problem)
  - [Event: live\_feed.update](#event-live_feedupdate)
  - [Event: live\_message.group\_inserted](#event-live_messagegroup_inserted)
  - [Event: live\_message.group\_replied](#event-live_messagegroup_replied)
  - [Event: live\_message.inserted](#event-live_messageinserted)
  - [Event: live\_message.mentioned](#event-live_messagementioned)
  - [Event: live\_message.replied](#event-live_messagereplied)
  - [Event: metric.update](#event-metricupdate)
  - [Event: problem.assigned](#event-problemassigned)
  - [Event: problem.assigned.to.group](#event-problemassignedtogroup)
  - [Event: problem.escalated](#event-problemescalated)
  - [Event: problem.inserted](#event-probleminserted)
  - [Event: problem.state\_change](#event-problemstate_change)
  - [Event: problem.updated](#event-problemupdated)
  - [Event: problem.worknoted](#event-problemworknoted)
  - [Event: problem\_task.assigned](#event-problem_taskassigned)
  - [Event: problem\_task.assigned.to.group](#event-problem_taskassignedtogroup)
  - [Event: problem\_task.commented](#event-problem_taskcommented)
  - [Event: problem\_task.inserted](#event-problem_taskinserted)
  - [Event: problem\_task.state.changed](#event-problem_taskstatechanged)
  - [Event: problem\_task.updated](#event-problem_taskupdated)
  - [Event: problem\_task.worknoted](#event-problem_taskworknoted)
  - [Event: request.approval.cancelled](#event-requestapprovalcancelled)
  - [Event: request.approval.inserted](#event-requestapprovalinserted)
  - [Event: request.approval.rejected](#event-requestapprovalrejected)
  - [Event: sc\_req\_item.assigned](#event-sc_req_itemassigned)
  - [Event: sc\_req\_item.change.stage](#event-sc_req_itemchangestage)
  - [Event: sc\_req\_item.commented](#event-sc_req_itemcommented)
  - [Event: sc\_req\_item.commented.itil](#event-sc_req_itemcommenteditil)
  - [Event: sc\_req\_item.delivery](#event-sc_req_itemdelivery)
  - [Event: sc\_req\_item.inserted](#event-sc_req_iteminserted)
  - [Event: sc\_req\_item.updated](#event-sc_req_itemupdated)
  - [Event: sc\_request.approved](#event-sc_requestapproved)
  - [Event: sc\_request.assigned](#event-sc_requestassigned)
  - [Event: sc\_request.commented](#event-sc_requestcommented)
  - [Event: sc\_request.escalated](#event-sc_requestescalated)
  - [Event: sc\_request.inactive](#event-sc_requestinactive)
  - [Event: sc\_request.inserted](#event-sc_requestinserted)
  - [Event: sc\_request.requested\_for](#event-sc_requestrequested_for)
  - [Event: sc\_request.updated](#event-sc_requestupdated)
  - [Event: sc\_task.approval.cancelled](#event-sc_taskapprovalcancelled)
  - [Event: sc\_task.approval.inserted](#event-sc_taskapprovalinserted)
  - [Event: sc\_task.approval.rejected](#event-sc_taskapprovalrejected)
  - [Event: sc\_task.assigned.to.group](#event-sc_taskassignedtogroup)
  - [Event: sc\_task.assigned.to.user](#event-sc_taskassignedtouser)
  - [Event: sc\_task.commented](#event-sc_taskcommented)
  - [Event: sc\_task.state.changed](#event-sc_taskstatechanged)
  - [Event: sc\_task.updated](#event-sc_taskupdated)
  - [Event: sc\_task.worknoted](#event-sc_taskworknoted)
  - [Event: task.approved](#event-taskapproved)
  - [Event: task.rejected](#event-taskrejected)
- [Notifications](#notifications)
  - [Notification: Approval Record Assigned - Request](#notification-approval-record-assigned---request)
  - [Notification: Approval Record Assigned - RITM](#notification-approval-record-assigned---ritm)
  - [Notification: Approval Rejected](#notification-approval-rejected)
  - [Notification: Approval Rejected By Other](#notification-approval-rejected-by-other)
  - [Notification: Approval Request](#notification-approval-request)
  - [Notification: Approval Request USM](#notification-approval-request-usm)
  - [Notification: Assigned Approval](#notification-assigned-approval)
  - [Notification: Catalog Approval Rejected](#notification-catalog-approval-rejected)
  - [Notification: Catalog Approval Request](#notification-catalog-approval-request)
  - [Notification: Catalog task worknoted (to assignee)](#notification-catalog-task-worknoted-to-assignee)
  - [Notification: Catalog task worknoted (unassigned)](#notification-catalog-task-worknoted-unassigned)
  - [Notification: Comment left on incident](#notification-comment-left-on-incident)
  - [Notification: Comment left on request](#notification-comment-left-on-request)
  - [Notification: Email assigned to (sc\_task)](#notification-email-assigned-to-sc_task)
  - [Notification: Email assigned to group (sc\_task)](#notification-email-assigned-to-group-sc_task)
  - [Notification: Incident - Assigned](#notification-incident---assigned)
  - [Notification: Incident assigned to me](#notification-incident-assigned-to-me)
  - [Notification: Incident assigned to my group](#notification-incident-assigned-to-my-group)
  - [Notification: Incident Closed *(Mobile UI)*](#notification-incident-closed-mobile-ui)
  - [Notification: Incident closed](#notification-incident-closed)
  - [Notification: Incident Commented](#notification-incident-commented)
  - [Notification: Incident commented and state changed](#notification-incident-commented-and-state-changed)
  - [Incident commented for ESS](#incident-commented-for-ess)
  - [Notification: Incident commented for ITIL](#notification-incident-commented-for-itil)
  - [Notification: Incident Escalated](#notification-incident-escalated)
  - [Notification:Incident Marked Resolved](#notificationincident-marked-resolved)
  - [Notification: Incident - New Comments](#notification-incident---new-comments)
  - [Notification: Incident Opened and Unassigned](#notification-incident-opened-and-unassigned)
  - [Notification: Incident opened for me](#notification-incident-opened-for-me)
  - [Notification: Incident Resolved *(Mobile UI)*](#notification-incident-resolved-mobile-ui)
  - [Notification: Incident resolved](#notification-incident-resolved)
  - [Notification: Incident resolved by Problem (ITIL)](#notification-incident-resolved-by-problem-itil)
  - [Notification: Incident updated by Problem (ITIL)](#notification-incident-updated-by-problem-itil)
  - [Notification: Incident was opened](#notification-incident-was-opened)
  - [Notification: Incident worknoted for ITIL](#notification-incident-worknoted-for-itil)
  - [Notification: Live Feed MsgReply Subscription](#notification-live-feed-msgreply-subscription)
  - [Notification: Live Message All Subscription](#notification-live-message-all-subscription)
  - [Notification: Live Message Feed Subscription](#notification-live-message-feed-subscription)
  - [Notification: Live Message Mention](#notification-live-message-mention)
  - [Notification: Live Message New Posts Subscription](#notification-live-message-new-posts-subscription)
  - [Notification: Live Message Reply](#notification-live-message-reply)
  - [Notification: New Incident](#notification-new-incident)
  - [Notification: Problem assigned to me](#notification-problem-assigned-to-me)
  - [Notification: Problem assigned to my group](#notification-problem-assigned-to-my-group)
  - [Notification: Problem Closed](#notification-problem-closed)
  - [Notification: Problem Task assigned to me](#notification-problem-task-assigned-to-me)
  - [Notification: Problem Task assigned to my group](#notification-problem-task-assigned-to-my-group)
  - [Notification: Problem Task worknoted (to assignee)](#notification-problem-task-worknoted-to-assignee)
  - [Notification: Problem Task worknoted (unassigned)](#notification-problem-task-worknoted-unassigned)
  - [Notification: Problem worknoted (to ITIL)](#notification-problem-worknoted-to-itil)
  - [Notification: Problem worknoted (unassigned)](#notification-problem-worknoted-unassigned)
  - [Notification: Request approval assigned](#notification-request-approval-assigned)
  - [Notification: Request Approved *(Mobile UI)*](#notification-request-approved-mobile-ui)
  - [Notification: Request approved](#notification-request-approved)
  - [Notification: Request Completed *(Mobile UI)*](#notification-request-completed-mobile-ui)
  - [Notification: Request completed](#notification-request-completed)
  - [Notification: Request Item commented (all assignees)](#notification-request-item-commented-all-assignees)
  - [Notification: Request Completed (multiple RITM)](#notification-request-completed-multiple-ritm)
  - [Notification: Request Completed (one RITM)](#notification-request-completed-one-ritm)
  - [Notification: Request Item assigned to my group](#notification-request-item-assigned-to-my-group)
  - [Notification: Request Item commented](#notification-request-item-commented)
  - [Notification: Request Item Delivery](#notification-request-item-delivery)
  - [Notification: Request Item Incomplete](#notification-request-item-incomplete)
  - [Notification: Request not Processed](#notification-request-not-processed)
  - [Notification: Request Opened on Behalf](#notification-request-opened-on-behalf)
  - [Notification: Request Rejected](#notification-request-rejected)
  - [Notification: Request Rejected *(mobile)*](#notification-request-rejected-mobile)
  - [Notification: Request was opened](#notification-request-was-opened)
  - [Notification: Requested item approval assigned](#notification-requested-item-approval-assigned)
  - [Notification: Requested Item assigned to me](#notification-requested-item-assigned-to-me)

## Tables

### Approval Table

- **System Name:** sysapproval_approver

Business Rules

| Name                                                          | usmsktrain2 | usmskstage2 | usmskdev2 | PDI |
|---------------------------------------------------------------|-------------|-------------|-----------|-----|
| [Approval Events (Task)](#business-rule-approval-events-task) | Yes         | Yes         | Yes       | Yes |

Events

| Name                                                         | usmsktrain2 | usmskstage2 | usmskdev2 | PDI |
|--------------------------------------------------------------|-------------|-------------|-----------|-----|
| [approval.cancelled](#event-approvalcancelled)               | Yes         | Yes         | Yes       | Yes |
| [approval.inserted](#event-approvalinserted)                 | Yes         | Yes         | Yes       | Yes |
| [approval.rejected](#event-approvalrejected)                 | Yes         | Yes         | Yes       | Yes |
| [approval.rejected.by.other](#event-approvalrejectedbyother) | Yes         | Yes         | Yes       | Yes |

### Catalog Task Table

- **System Name:** sc_task

Business Rules

| Name                                            | usmsktrain2 | usmskstage2 | usmskdev2 | PDI |
|-------------------------------------------------|-------------|-------------|-----------|-----|
| [sc_task_events](#business-rule-sc_task_events) | Yes         | Yes         | Yes       | Yes |

Events

| Name                                                        | usmsktrain2 | usmskstage2 | usmskdev2 | PDI |
|-------------------------------------------------------------|-------------|-------------|-----------|-----|
| [sc_task.approval.inserted](#event-sc_taskapprovalinserted) | Yes         | Yes         | Yes       | Yes |
| [sc_task.approval.rejected](#event-sc_taskapprovalrejected) | Yes         | Yes         | Yes       | Yes |
| [sc_task.assigned.to.group](#event-sc_taskassignedtogroup)  | Yes         | Yes         | Yes       | Yes |
| [sc_task.assigned.to.user](#event-sc_taskassignedtouser)    | Yes         | Yes         | Yes       | Yes |
| [sc_task.worknoted](#event-sc_taskworknoted)                | Yes         | Yes         | Yes       | Yes |

### Live Feed Message Table

- **System Name:** live_message

Business Rules

| Name                                                                | usmsktrain2 | usmskstage2 | usmskdev2 | PDI |
|---------------------------------------------------------------------|-------------|-------------|-----------|-----|
| [Live Feed message events](#business-rule-live-feed-message-events) | Yes         | Yes         | Yes       | Yes |
| [Live message events](#business-rule-live-message-events)           | Yes         | Yes         | Yes       | Yes |

Events

| Name                                                             | usmsktrain2 | usmskstage2 | usmskdev2 | PDI |
|------------------------------------------------------------------|-------------|-------------|-----------|-----|
| [live_message.group_inserted](#event-live_messagegroup_inserted) | Yes         | Yes         | Yes       | Yes |
| [live_message.group_replied](#event-live_messagegroup_replied)   | Yes         | Yes         | Yes       | Yes |
| [live_message.inserted](#event-live_messageinserted)             | Yes         | Yes         | Yes       | Yes |
| [live_message.replied](#event-live_messagereplied)               | Yes         | Yes         | Yes       | Yes |

### Live Mention Table

- **System Name:** live_mention

Business Rules

| Name                                                                | usmsktrain2 | usmskstage2 | usmskdev2 | PDI |
|---------------------------------------------------------------------|-------------|-------------|-----------|-----|
| [Live Feed message events](#business-rule-live-feed-message-events) | Yes         | Yes         | Yes       | Yes |

Events

| Name                                                   | usmsktrain2 | usmskstage2 | usmskdev2 | PDI |
|--------------------------------------------------------|-------------|-------------|-----------|-----|
| [live_message.mentioned](#event-live_messagementioned) | Yes         | Yes         | Yes       | Yes |

### Incident Table

- **System Name:** incident

Business Rules

| Name                                              | usmsktrain2 | usmskstage2 | usmskdev2 | PDI |
|---------------------------------------------------|-------------|-------------|-----------|-----|
| [incident events](#business-rule-incident-events) | Yes         | Yes         | Yes       | Yes |

Events

| Name                                                               | usmsktrain2 | usmskstage2 | usmskdev2 | PDI |
|--------------------------------------------------------------------|-------------|-------------|-----------|-----|
| [incident.assigned](#event-incidentassigned)                       | Yes         | Yes         | Yes       | Yes |
| [incident.assigned.to.group](#event-incidentassignedtogroup)       | Yes         | Yes         | Yes       | Yes |
| [incident.commented](#event-incidentcommented)                     | Yes         | Yes         | Yes       | Yes |
| [incident.escalated](#event-incidentescalated)                     | Yes         | Yes         | Yes       | Yes |
| [incident.inactive](#event-incidentinactive)                       | Yes         | Yes         | Yes       | Yes |
| [incident.inserted](#event-incidentinserted)                       | Yes         | Yes         | Yes       | Yes |
| [incident.priority.1](#event-incidentpriority1)                    | Yes         | Yes         | Yes       | Yes |
| [incident.resolved_by_problem](#event-incidentresolved_by_problem) | Yes         | Yes         | Yes       | Yes |
| [incident.severity.1](#event-incidentseverity1)                    | Yes         | Yes         | Yes       | Yes |
| [incident.updated_by_problem](#event-incidentupdated_by_problem)   | Yes         | Yes         | Yes       | Yes |

### Problem Table

- **System Name:** problem

Business Rules

| Name                                                                                  | usmsktrain2 | usmskstage2 | usmskdev2 | PDI |
|---------------------------------------------------------------------------------------|-------------|-------------|-----------|-----|
| [problem events](#business-rule-live-feed-message-events)                             | Yes         | Yes         | Yes       | Yes |
| [Raise an event when State changes](#business-rule-raise-an-event-when-state-changes) | Yes         | Yes         | Yes       | Yes |

Events

| Name                                                       | usmsktrain2 | usmskstage2 | usmskdev2 | PDI |
|------------------------------------------------------------|-------------|-------------|-----------|-----|
| [problem.assigned](#event-problemassigned)                 | Yes         | Yes         | Yes       | Yes |
| [problem.assigned.to.group](#event-problemassignedtogroup) | Yes         | Yes         | Yes       | Yes |
| [problem.escalated](#event-problemescalated)               | Yes         | Yes         | Yes       | Yes |
| [problem.inserted](#event-probleminserted)                 | Yes         | Yes         | Yes       | Yes |
| [problem.state_change](#event-problemstate_change)         | Yes         | Yes         | Yes       | Yes |
| [problem.updated](#event-problemupdated)                   | Yes         | Yes         | Yes       | Yes |
| [problem.worknoted](#event-problemworknoted)                   | Yes         | Yes         | Yes       | Yes |

### Problem Task Table

- **System Name:** problem_task

Business Rules

| Name                                                                                  | usmsktrain2 | usmskstage2 | usmskdev2 | PDI |
|---------------------------------------------------------------------------------------|-------------|-------------|-----------|-----|
| [problem_task events](#business-rule-problem_task-events)                             | Yes         | Yes         | Yes       | Yes |

Events

| Name                                                                 | usmsktrain2 | usmskstage2 | usmskdev2 | PDI |
|----------------------------------------------------------------------|-------------|-------------|-----------|-----|
| [problem_task.assigned](#event-problem_taskassigned)                 | Yes         | Yes         | Yes       | Yes |
| [problem_task.assigned.to.group](#event-problem_taskassignedtogroup) | Yes         | Yes         | Yes       | Yes |
| [problem_task.commented](#event-problem_taskcommented)               | Yes         | Yes         | Yes       | Yes |
| [problem_task.inserted](#event-problem_taskinserted)                 | Yes         | Yes         | Yes       | Yes |
| [problem_task.state.changed](#event-problem_taskstatechanged)        | Yes         | Yes         | Yes       | Yes |
| [problem_task.updated](#event-problem_taskupdated)                   | Yes         | Yes         | Yes       | Yes |
| [problem_task.worknoted](#event-problem_taskworknoted)               | Yes         | Yes         | Yes       | Yes |

### Request Table

- **System Name:** sc_request

Business Rules

| Name                                                  | usmsktrain2 | usmskstage2 | usmskdev2 | PDI |
|-------------------------------------------------------|-------------|-------------|-----------|-----|
| [sc request events](#business-rule-sc-request-events) | Yes         | Yes         | Yes       | Yes |

Events

| Name                                                       | usmsktrain2 | usmskstage2 | usmskdev2 | PDI |
|------------------------------------------------------------|-------------|-------------|-----------|-----|
| [sc_request.approved](#event-sc_requestapproved)           | Yes         | Yes         | Yes       | Yes |
| [sc_request.assigned](#event-sc_requestassigned)           | Yes         | Yes         | Yes       | Yes |
| [sc_request.inserted](#event-sc_requestinserted)           | Yes         | Yes         | Yes       | Yes |
| [sc_request.requested_for](#event-sc_requestrequested_for) | Yes         | Yes         | Yes       | Yes |
| [sc_request.updated](#event-sc_requestupdated)             | Yes         | Yes         | Yes       | Yes |

### Requested Item Table

- **System Name:** sc_req_item

Business Rules

| Name                                                                    | usmsktrain2 | usmskstage2 | usmskdev2 | PDI |
|-------------------------------------------------------------------------|-------------|-------------|-----------|-----|
| [sc req item events](#business-rule-sc-req-item-events)                 | Yes         | Yes         | Yes       | Yes |
| [sc_req_item comment events](#business-rule-sc_req_item-comment-events) | Yes         | Yes         | Yes       | Yes |

Events

| Name                                                          | usmsktrain2 | usmskstage2 | usmskdev2 | PDI |
|---------------------------------------------------------------|-------------|-------------|-----------|-----|
| [sc_req_item.assigned](#event-sc_req_itemassigned)            | Yes         | Yes         | Yes       | Yes |
| [sc_req_item.change.stage](#event-sc_req_itemchangestage)     | Yes         | Yes         | Yes       | Yes |
| [sc_req_item.commented](#event-sc_req_itemcommented)          | Yes         | Yes         | Yes       | Yes |
| [sc_req_item.commented.itil](#event-sc_req_itemcommenteditil) | Yes         | Yes         | Yes       | Yes |
| [sc_req_item.delivery](#event-sc_req_itemdelivery)            | Yes         | Yes         | Yes       | Yes |
| [sc_req_item.inserted](#event-sc_req_iteminserted)            | Yes         | Yes         | Yes       | Yes |

### Task Table

- **System Name:** task

Business Rules

| Name                                                | usmsktrain2 | usmskstage2 | usmskdev2 | PDI |
|-----------------------------------------------------|-------------|-------------|-----------|-----|
| [live feed events](#business-rule-live-feed-events) | Yes         | Yes         | Yes       | Yes |
| [metrics events](#business-rule-metrics-events)     | Yes         | Yes         | Yes       | Yes |
| [task events](#business-rule-task-events)           | Yes         | Yes         | Yes       | Yes |

Events

| Name                                 | usmsktrain2 | usmskstage2 | usmskdev2 | PDI |
|--------------------------------------|-------------|-------------|-----------|-----|
| [task.approved](#event-taskapproved) | Yes         | Yes         | Yes       | Yes |
| [task.rejected](#event-taskrejected) | Yes         | Yes         | Yes       | Yes |

## Business Rules

### Business Rule: Approval Events (Task)

- **Table:** [Approval](#approval-table)
- **When:** After Insert,Update
  
  `(current.sysapproval != '' || new TableUtils(current.source_table).getAbsoluteBase() == 'task') && current.state.changes()`
- **Events Queued:** [approval.cancelled](#event-approvalcancelled), [request.approval.cancelled](#event-requestapprovalcancelled), [sc_task.approval.cancelled](#event-sc_taskapprovalcancelled),
  [approval.inserted](#event-approvalinserted), [request.approval.inserted](#event-requestapprovalinserted), [sc_task.approval.inserted](#event-sc_taskapprovalinserted),
  [approval.rejected](#event-approvalrejected), [request.approval.rejected](#event-requestapprovalrejected), [sc_task.approval.rejected](#event-sc_taskapprovalrejected),
  [approval.rejected.by.other](#event-approvalrejectedbyother)

| Link                                                                                                                          | Active |
|-------------------------------------------------------------------------------------------------------------------------------|--------|
| [usmsktrain2](https://usmsktrain2.servicenowservices.com/nav_to.do?uri=sys_script.do?sys_id=aea34678c61122710151b1b7fdf65762) | true   |
| [usmskstage2](https://usmskstage2.servicenowservices.com/nav_to.do?uri=sys_script.do?sys_id=aea34678c61122710151b1b7fdf65762) | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sys_script.do?sys_id=aea34678c61122710151b1b7fdf65762)     | true   |
| [PDI](https://dev203287.service-now.com/nav_to.do?uri=sys_script.do?sys_id=aea34678c61122710151b1b7fdf65762)                  | true   |

### Business Rule: global events

- **Table:** Global `[global]`
- **When:** After Insert,Update
- **Events Queued:**
  - *table_name*.commented: [incident.commented](#event-incidentcommented), [problem_task.commented](#event-problem_taskcommented), [sc_req_item.commented](#event-sc_req_itemcommented),
  [sc_request.commented](#event-sc_requestcommented), [sc_task.commented](#event-sc_taskcommented)
  - *table_name*.assigned: [incident.assigned](#event-incidentassigned), [problem.assigned](#event-problemassigned), [problem_task.assigned](#event-problem_taskassigned),
  [sc_req_item.assigned](#event-sc_req_itemassigned), [sc_request.assigned](#event-sc_requestassigned)
  - *table_name*.inactive: [incident.inactive](#event-incidentinactive), [sc_request.inactive](#event-sc_requestinactive)
  - *table_name*.inserted: [approval.inserted](#event-approvalinserted), [incident.inserted](#event-incidentinserted), [live_message.inserted](#event-live_messageinserted),
  [problem.inserted](#event-probleminserted), [problem_task.inserted](#event-problem_taskinserted), [sc_req_item.inserted](#event-sc_req_iteminserted), [sc_request.inserted](#event-sc_requestinserted)
  - *table_name*.updated: [incident.updated](#event-incidentupdated), [problem.updated](#event-problemupdated), [problem_task.updated](#event-problem_taskupdated), [sc_req_item.updated](#event-sc_req_itemupdated),
  [sc_request.updated](#event-sc_requestupdated), [sc_task.updated](#event-sc_taskupdated)

| Link                                                                                                                          | Active |
|-------------------------------------------------------------------------------------------------------------------------------|--------|
| [usmsktrain2](https://usmsktrain2.servicenowservices.com/nav_to.do?uri=sys_script.do?sys_id=34593ebc7f000001014fa56603fe3f61) | true   |
| [usmskstage2](https://usmskstage2.servicenowservices.com/nav_to.do?uri=sys_script.do?sys_id=34593ebc7f000001014fa56603fe3f61) | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sys_script.do?sys_id=34593ebc7f000001014fa56603fe3f61)     | true   |
| [PDI](https://dev203287.service-now.com/nav_to.do?uri=sys_script.do?sys_id=34593ebc7f000001014fa56603fe3f61)                  | true   |

### Business Rule: incident events

- **Table:** [Incident](#incident-table)
- **When:** After Insert,Update
- **Events Queued:** [incident.commented](#event-incidentcommented), [incident.inserted](#event-incidentinserted), [incident.updated](#event-incidentupdated), [incident.assigned](#event-incidentassigned),
  [incident.assigned.to.group](#event-incidentassignedtogroup), [incident.priority.1](#event-incidentpriority1), [incident.severity.1](#event-incidentseverity1), [incident.escalated](#event-incidentescalated),
  [incident.inactive](#event-incidentinactive)

| Link                                                                                                                          | Active |
|-------------------------------------------------------------------------------------------------------------------------------|--------|
| [usmsktrain2](https://usmsktrain2.servicenowservices.com/nav_to.do?uri=sys_script.do?sys_id=d56b5d71c0a80164019d0e0be2cf784f) | true   |
| [usmskstage2](https://usmskstage2.servicenowservices.com/nav_to.do?uri=sys_script.do?sys_id=d56b5d71c0a80164019d0e0be2cf784f) | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sys_script.do?sys_id=d56b5d71c0a80164019d0e0be2cf784f)     | true   |
| [PDI](https://dev203287.service-now.com/nav_to.do?uri=sys_script.do?sys_id=d56b5d71c0a80164019d0e0be2cf784f)                  | true   |

### Business Rule: live feed events

- **Table:** [Task](#task-table)
- **When:** After Insert,Update,Delete
  
  `new GlideappLiveFeedEventHandler().watchedTable(current.getTableName());`
- **Events Queued:** [live_feed.update](#event-live_feedupdate)

| Link                                                                                                                          | Active |
|-------------------------------------------------------------------------------------------------------------------------------|--------|
| [usmsktrain2](https://usmsktrain2.servicenowservices.com/nav_to.do?uri=sys_script.do?sys_id=60af94a4c0a8018c004d1e635fe5ad5c) | true   |
| [usmskstage2](https://usmskstage2.servicenowservices.com/nav_to.do?uri=sys_script.do?sys_id=60af94a4c0a8018c004d1e635fe5ad5c) | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sys_script.do?sys_id=60af94a4c0a8018c004d1e635fe5ad5c)     | true   |
| [PDI](https://dev203287.service-now.com/nav_to.do?uri=sys_script.do?sys_id=60af94a4c0a8018c004d1e635fe5ad5c)                  | true   |

### Business Rule: Live Feed message events

- **Table:** [Live Feed Message](#live-feed-message-table)
- **When:** After Insert,Update
- **Events Queued:** [live_message.inserted](#event-live_messageinserted), [live_message.group_inserted](#event-live_messagegroup_inserted), [live_message.group_replied](#event-live_messagegroup_replied),
  [live_message.replied](#event-live_messagereplied), [live_message.mentioned](#event-live_messagementioned)

| Link                                                                                                                          | Active |
|-------------------------------------------------------------------------------------------------------------------------------|--------|
| [usmsktrain2](https://usmsktrain2.servicenowservices.com/nav_to.do?uri=sys_script.do?sys_id=5e5643cdc32321006f333b0ac3d3ae8b) | true   |
| [usmskstage2](https://usmskstage2.servicenowservices.com/nav_to.do?uri=sys_script.do?sys_id=5e5643cdc32321006f333b0ac3d3ae8b) | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sys_script.do?sys_id=5e5643cdc32321006f333b0ac3d3ae8b)     | true   |
| [PDI](https://dev203287.service-now.com/nav_to.do?uri=sys_script.do?sys_id=5e5643cdc32321006f333b0ac3d3ae8b)                  | true   |

### Business Rule: Live message events

- **Table:** [Live Feed Message](#live-feed-message-table)
- **When:** After Insert,Update
- **Events Queued:** [live_message.inserted](#event-live_messageinserted), [live_message.group_inserted](#event-live_messagegroup_inserted), [live_message.group_replied](#event-live_messagegroup_replied),
  [live_message.replied](#event-live_messagereplied)

| Link                                                                                                                          | Active |
|-------------------------------------------------------------------------------------------------------------------------------|--------|
| [usmsktrain2](https://usmsktrain2.servicenowservices.com/nav_to.do?uri=sys_script.do?sys_id=587ae78ac0a80a6d2e2b90533d9919e3) | true   |
| [usmskstage2](https://usmskstage2.servicenowservices.com/nav_to.do?uri=sys_script.do?sys_id=587ae78ac0a80a6d2e2b90533d9919e3) | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sys_script.do?sys_id=587ae78ac0a80a6d2e2b90533d9919e3)     | true   |
| [PDI](https://dev203287.service-now.com/nav_to.do?uri=sys_script.do?sys_id=587ae78ac0a80a6d2e2b90533d9919e3)                  | true   |

### Business Rule: metrics events

- **Table:** [Task](#task-table)
- **When:** After Insert,Update,Delete
- **Events Queued:** [metric.update](#event-metricupdate)

| Link                                                                                                                          | Active |
|-------------------------------------------------------------------------------------------------------------------------------|--------|
| [usmsktrain2](https://usmsktrain2.servicenowservices.com/nav_to.do?uri=sys_script.do?sys_id=35f9861dc0a808ae00ecf631cc51888c) | true   |
| [usmskstage2](https://usmskstage2.servicenowservices.com/nav_to.do?uri=sys_script.do?sys_id=35f9861dc0a808ae00ecf631cc51888c) | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sys_script.do?sys_id=35f9861dc0a808ae00ecf631cc51888c)     | true   |
| [PDI](https://dev203287.service-now.com/nav_to.do?uri=sys_script.do?sys_id=35f9861dc0a808ae00ecf631cc51888c)                  | true   |

### Business Rule: problem events

- **Table:** [Problem](#problem-table)
- **When:** After Insert,Update
- **Events Queued:** [problem.inserted](#event-probleminserted), [problem.updated](#event-problemupdated), [problem.assigned](#event-problemassigned), [problem.escalated](#event-problemescalated)

| Link                                                                                                                          | Active |
|-------------------------------------------------------------------------------------------------------------------------------|--------|
| [usmsktrain2](https://usmsktrain2.servicenowservices.com/nav_to.do?uri=sys_script.do?sys_id=f56c1f9dc611227b001a7aa4be438d49) | true   |
| [usmskstage2](https://usmskstage2.servicenowservices.com/nav_to.do?uri=sys_script.do?sys_id=f56c1f9dc611227b001a7aa4be438d49) | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sys_script.do?sys_id=f56c1f9dc611227b001a7aa4be438d49)     | true   |
| [PDI](https://dev203287.service-now.com/nav_to.do?uri=sys_script.do?sys_id=f56c1f9dc611227b001a7aa4be438d49)                  | true   |

### Business Rule: problem_task events

- **Table:** [Problem Task](#problem-task-table)
- **When:** After Insert,Update
- **Events Queued:** [problem_task.inserted](#event-problem_taskinserted), [problem_task.commented](#event-problem_taskcommented), [problem_task.worknoted](#event-problem_taskworknoted),
  [problem_task.updated](#event-problem_taskupdated), [problem_task.state.changed](#event-problem_taskstatechanged), [problem_task.assigned](#event-problem_taskassigned),
  [problem_task.assigned.to.group](#event-problem_taskassignedtogroup)

| Link                                                                                                                          | Active |
|-------------------------------------------------------------------------------------------------------------------------------|--------|
| [usmsktrain2](https://usmsktrain2.servicenowservices.com/nav_to.do?uri=sys_script.do?sys_id=4a5bf0360a0007040137c500cd65ad24) | true   |
| [usmskstage2](https://usmskstage2.servicenowservices.com/nav_to.do?uri=sys_script.do?sys_id=4a5bf0360a0007040137c500cd65ad24) | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sys_script.do?sys_id=4a5bf0360a0007040137c500cd65ad24)     | true   |
| [PDI](https://dev203287.service-now.com/nav_to.do?uri=sys_script.do?sys_id=4a5bf0360a0007040137c500cd65ad24)                  | true   |

### Business Rule: Raise an event when State changes

- **Table:** [Problem](#problem-table)
- **When:** After Update; State changes
- **Events Queued:** [problem.state_change](#event-problemstate_change)

| Link                                                                                                                          | Active |
|-------------------------------------------------------------------------------------------------------------------------------|--------|
| [usmsktrain2](https://usmsktrain2.servicenowservices.com/nav_to.do?uri=sys_script.do?sys_id=50e7a4be874823000e3dd61e36cb0b21) | true   |
| [usmskstage2](https://usmskstage2.servicenowservices.com/nav_to.do?uri=sys_script.do?sys_id=50e7a4be874823000e3dd61e36cb0b21) | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sys_script.do?sys_id=50e7a4be874823000e3dd61e36cb0b21)     | true   |
| [PDI](https://dev203287.service-now.com/nav_to.do?uri=sys_script.do?sys_id=50e7a4be874823000e3dd61e36cb0b21)                  | true   |

### Business Rule: sc req item events

- **Table:** [Requested Item](#requested-item-table)
- **When:** After Insert,Update
- **Events Queued:** [sc_req_item.inserted](#event-sc_req_iteminserted), [sc_req_item.updated](#event-sc_req_itemupdated), [sc_req_item.delivery](#event-sc_req_itemdelivery),
  [sc_req_item.assigned](#event-sc_req_itemassigned), [sc_req_item.change.stage](#event-sc_req_itemchangestage)

| Link                                                                                                                          | Active |
|-------------------------------------------------------------------------------------------------------------------------------|--------|
| [usmsktrain2](https://usmsktrain2.servicenowservices.com/nav_to.do?uri=sys_script.do?sys_id=2f3fcac6c0a800640039b99d1c2be349) | true   |
| [usmskstage2](https://usmskstage2.servicenowservices.com/nav_to.do?uri=sys_script.do?sys_id=2f3fcac6c0a800640039b99d1c2be349) | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sys_script.do?sys_id=2f3fcac6c0a800640039b99d1c2be349)     | true   |
| [PDI](https://dev203287.service-now.com/nav_to.do?uri=sys_script.do?sys_id=2f3fcac6c0a800640039b99d1c2be349)                  | true   |

### Business Rule: sc request events

- **Table:** [Request](#request-table)
- **When:** After Insert,Update
- **Events Queued:** [sc_request.commented](#event-sc_requestcommented), [sc_request.inserted](#event-sc_requestinserted), [sc_request.updated](#event-sc_requestupdated),
  [sc_request.assigned](#event-sc_requestassigned), [sc_request.requested_for](#event-sc_requestrequested_for), [sc_request.approved](#event-sc_requestapproved), [sc_request.escalated](#event-sc_requestescalated),
  [sc_request.inactive](#event-sc_requestinactive)

| Link                                                                                                                          | Active |
|-------------------------------------------------------------------------------------------------------------------------------|--------|
| [usmsktrain2](https://usmsktrain2.servicenowservices.com/nav_to.do?uri=sys_script.do?sys_id=e8b62f9d7f000001017883801379ff5a) | true   |
| [usmskstage2](https://usmskstage2.servicenowservices.com/nav_to.do?uri=sys_script.do?sys_id=e8b62f9d7f000001017883801379ff5a) | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sys_script.do?sys_id=e8b62f9d7f000001017883801379ff5a)     | true   |
| [PDI](https://dev203287.service-now.com/nav_to.do?uri=sys_script.do?sys_id=e8b62f9d7f000001017883801379ff5a)                  | true   |

### Business Rule: sc_req_item comment events

- **Table:** [Requested Item](#requested-item-table)
- **When:** After Update; current.comments.changes()
- **Events Queued:** [sc_req_item.commented](#event-sc_req_itemcommented), [sc_req_item.commented.itil](#event-sc_req_itemcommenteditil)

| Link                                                                                                                          | Active |
|-------------------------------------------------------------------------------------------------------------------------------|--------|
| [usmsktrain2](https://usmsktrain2.servicenowservices.com/nav_to.do?uri=sys_script.do?sys_id=9790a7400a00070450a5ccf2d15a89c3) | true   |
| [usmskstage2](https://usmskstage2.servicenowservices.com/nav_to.do?uri=sys_script.do?sys_id=9790a7400a00070450a5ccf2d15a89c3) | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sys_script.do?sys_id=9790a7400a00070450a5ccf2d15a89c3)     | true   |
| [PDI](https://dev203287.service-now.com/nav_to.do?uri=sys_script.do?sys_id=9790a7400a00070450a5ccf2d15a89c3)                 | true   |

### Business Rule: sc_task_events

- **Table:** [Catalog Task](#catalog-task-table)
- **When:** After Insert,Update,Delete
- **Events Queued:** [sc_task.commented](#event-sc_taskcommented), [sc_task.worknoted](#event-sc_taskworknoted), [sc_task.updated](#event-sc_taskupdated), [sc_task.state.changed](#event-sc_taskstatechanged),
  [sc_task.assigned.to.user](#event-sc_taskassignedtouser), [sc_task.assigned.to.group](#event-sc_taskassignedtogroup)

| Link                                                                                                                          | Active |
|-------------------------------------------------------------------------------------------------------------------------------|--------|
| [usmsktrain2](https://usmsktrain2.servicenowservices.com/nav_to.do?uri=sys_script.do?sys_id=037d66e0c0a801020161091ecbd08f41) | true   |
| [usmskstage2](https://usmskstage2.servicenowservices.com/nav_to.do?uri=sys_script.do?sys_id=037d66e0c0a801020161091ecbd08f41) | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sys_script.do?sys_id=037d66e0c0a801020161091ecbd08f41)     | true   |
| [PDI](https://dev203287.service-now.com/nav_to.do?uri=sys_script.do?sys_id=037d66e0c0a801020161091ecbd08f41)                  | true   |

### Business Rule: task events

- **Table:** [Task](#task-table)
- **When:** After Insert,Update
- **Events Queued:** [task.approved](#event-taskapproved), [task.rejected](#event-taskrejected)

| Link                                                                                                                          | Active |
|-------------------------------------------------------------------------------------------------------------------------------|--------|
| [usmsktrain2](https://usmsktrain2.servicenowservices.com/nav_to.do?uri=sys_script.do?sys_id=ae4436b7c6112271007c15c067d5969d) | true   |
| [usmskstage2](https://usmskstage2.servicenowservices.com/nav_to.do?uri=sys_script.do?sys_id=ae4436b7c6112271007c15c067d5969d) | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sys_script.do?sys_id=ae4436b7c6112271007c15c067d5969d)     | true   |
| [PDI](https://dev203287.service-now.com/nav_to.do?uri=sys_script.do?sys_id=ae4436b7c6112271007c15c067d5969d)                  | true   |

## Event Registry

### Event: approval.cancelled

- **Table:** [Approval](#approval-table)
- **Priority:** 100
- **Fired By:** [Business Rule: Approval Events (Task)](#business-rule-approval-events-task)
- **Description:** An approval request has been cancelled
- **Links:**
  - [usmsktrain2](https://usmsktrain2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=9277c1d1c0a8010a00c0b38595cb45b2)
  - [usmskstage2](https://usmskstage2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=9277c1d1c0a8010a00c0b38595cb45b2)
  - [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=9277c1d1c0a8010a00c0b38595cb45b2)
  - [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_register.do?sys_id=9277c1d1c0a8010a00c0b38595cb45b2)

### Event: approval.inserted

- **Table:** [Approval](#approval-table)
- **Priority:** 100
- **Fired By:** [Business Rule: Approval Events (Task)](#business-rule-approval-events-task), [Business Rule: global events](#business-rule-global-events)
- **Description:** An approval request has been inserted asking for an approval of a task
- **Links:**
  - [usmsktrain2](https://usmsktrain2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=aea1427ac61122710092a78bbc033211)
  - [usmskstage2](https://usmskstage2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=aea1427ac61122710092a78bbc033211)
  - [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=aea1427ac61122710092a78bbc033211)
  - [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_register.do?sys_id=aea1427ac61122710092a78bbc033211)

### Event: approval.rejected

- **Table:** [Approval](#approval-table)
- **Priority:** 100
- **Fired By:** [Business Rule: Approval Events (Task)](#business-rule-approval-events-task)
- **Description:** The task has been rejected by the approver
- **Links:**
  - [usmsktrain2](https://usmsktrain2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=b2c26697c611227100ff02393aacf99b)
  - [usmskstage2](https://usmskstage2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=b2c26697c611227100ff02393aacf99b)
  - [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=b2c26697c611227100ff02393aacf99b)
  - [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_register.do?sys_id=b2c26697c611227100ff02393aacf99b)

### Event: approval.rejected.by.other

- **Table:**  [Approval](#approval-table)
- **Priority:** 100
- **Fired By:**  [Business Rule: Approval Events (Task)](#business-rule-approval-events-task)
- **Description:** Tell other approvers that at least one approver has rejected this change
- **Links:**
  - [usmsktrain2](https://usmsktrain2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=b3407c4dc61122710045484a18686ab8)
  - [usmskstage2](https://usmskstage2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=b3407c4dc61122710045484a18686ab8)
  - [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=b3407c4dc61122710045484a18686ab8)
  - [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_register.do?sys_id=b3407c4dc61122710045484a18686ab8)

### Event: incident.assigned

- **Table:** [Incident](#incident-table)
- **Priority:** 100
- **Fired By:** [Business Rule: incident events](#business-rule-incident-events), [Business Rule: global events](#business-rule-global-events)
- **Description:** An incident has been assigned to someone
- **Links:**
  - [usmsktrain2](https://usmsktrain2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=e09dd1d4c0a801650069b25fd25627d1)
  - [usmskstage2](https://usmskstage2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=e09dd1d4c0a801650069b25fd25627d1)
  - [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=e09dd1d4c0a801650069b25fd25627d1)
  - [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_register.do?sys_id=e09dd1d4c0a801650069b25fd25627d1)

### Event: incident.assigned.to.group

- **Table:** [Incident](#incident-table)
- **Priority:** 100
- **Fired By:** [Business Rule: incident events](#business-rule-incident-events)
- **Description:** An incident has been assigned to a group
- **Links:**
  - [usmsktrain2](https://usmsktrain2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=4d0b7e44c611227b010619b714a8b983)
  - [usmskstage2](https://usmskstage2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=4d0b7e44c611227b010619b714a8b983)
  - [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=4d0b7e44c611227b010619b714a8b983)
  - [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_register.do?sys_id=4d0b7e44c611227b010619b714a8b983)

### Event: incident.commented

- **Table:** [Incident](#incident-table)
- **Priority:** 100
- **Fired By:** [Business Rule: incident events](#business-rule-incident-events), [Business Rule: global events](#business-rule-global-events)
- **Description:** Something added to the "Additional Comments"  field
- **Links:**
  - [usmsktrain2](https://usmsktrain2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=e0ac240ac0a8016501735f84d2ed1bfd)
  - [usmskstage2](https://usmskstage2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=e0ac240ac0a8016501735f84d2ed1bfd)
  - [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=e0ac240ac0a8016501735f84d2ed1bfd)
  - [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_register.do?sys_id=e0ac240ac0a8016501735f84d2ed1bfd)

### Event: incident.escalated

- **Table:** [Incident](#incident-table)
- **Priority:** 100
- **Fired By:** [Business Rule: incident events](#business-rule-incident-events)
- **Description:** An incident has the escalation field  incremented
- **Links:**
  - [usmsktrain2](https://usmsktrain2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=e6773b5cc0a8016500349a0ef3a35415)
  - [usmskstage2](https://usmskstage2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=e6773b5cc0a8016500349a0ef3a35415)
  - [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=e6773b5cc0a8016500349a0ef3a35415)
  - [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_register.do?sys_id=e6773b5cc0a8016500349a0ef3a35415)

### Event: incident.inactive

- **Table:** [Incident](#incident-table)
- **Priority:** 100
- **Fired By:** [Business Rule: incident events](#business-rule-incident-events), [Business Rule: global events](#business-rule-global-events)
- **Description:** An incident has been closed or resolved
- **Links:**
  - [usmsktrain2](https://usmsktrain2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=e78ace27c0a8016501a86488a1d77c72)
  - [usmskstage2](https://usmskstage2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=e78ace27c0a8016501a86488a1d77c72)
  - usmshttps://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=e78ace27c0a8016501a86488a1d77c72kdev2
  - [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_register.do?sys_id=e78ace27c0a8016501a86488a1d77c72)

### Event: incident.inserted

- **Table:** [Incident](#incident-table)
- **Priority:** 100
- **Fired By:** [Business Rule: incident events](#business-rule-incident-events), [Business Rule: global events](#business-rule-global-events)
- **Description:** An incident has been inserted
- **Links:**
  - [usmsktrain2](https://usmsktrain2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=f56d7795c611227b01d35bf2df091d7e)
  - [usmskstage2](https://usmskstage2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=f56d7795c611227b01d35bf2df091d7e)
  - [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=f56d7795c611227b01d35bf2df091d7e)
  - [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_register.do?sys_id=f56d7795c611227b01d35bf2df091d7e)

### Event: incident.priority.1

- **Table:** [Incident](#incident-table)
- **Priority:** 100
- **Fired By:** [Business Rule: incident events](#business-rule-incident-events)
- **Description:** An incident is priority 1 (the highest)
- **Links:**
  - [usmsktrain2](https://usmsktrain2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=e78bd100c0a8016501438dbed98a85e2)
  - [usmskstage2](https://usmskstage2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=e78bd100c0a8016501438dbed98a85e2)
  - [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=e78bd100c0a8016501438dbed98a85e2)
  - [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_register.do?sys_id=e78bd100c0a8016501438dbed98a85e2)

### Event: incident.resolved_by_problem

- **Table:** [Incident](#incident-table)
- **Priority:** 100
- **Fired By:** *(unknown)*
- **Description:** This event is raised when the Incident state is changed to resolved when Problem is closed/resolved.
- **Links:**
  - [usmsktrain2](https://usmsktrain2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=f5ccfc98534123004247ddeeff7b1297)
  - [usmskstage2](https://usmskstage2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=f5ccfc98534123004247ddeeff7b1297)
  - [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=f5ccfc98534123004247ddeeff7b1297)
  - [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_register.do?sys_id=f5ccfc98534123004247ddeeff7b1297)

### Event: incident.severity.1

- **Table:** [Incident](#incident-table)
- **Priority:** 100
- **Fired By:** [Business Rule: incident events](#business-rule-incident-events)
- **Description:** An incident is severity 1 (the highest)
- **Links:**
  - [usmsktrain2](https://usmsktrain2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=e78b8454c0a80165004b3f8bca8d3089)
  - [usmskstage2](https://usmskstage2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=e78b8454c0a80165004b3f8bca8d3089)
  - [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=e78b8454c0a80165004b3f8bca8d3089)
  - [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_register.do?sys_id=e78b8454c0a80165004b3f8bca8d3089)

### Event: incident.updated

- **Table:** [Incident](#incident-table)
- **Priority:** 100
- **Fired By:** [Business Rule: incident events](#business-rule-incident-events), [Business Rule: global events](#business-rule-global-events)
- **Description:** An incident has been updated in the system
- **Links:**
  - [usmsktrain2](https://usmsktrain2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=e099f8fac0a8016501b7c680e71b90fd)
  - [usmskstage2](https://usmskstage2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=e099f8fac0a8016501b7c680e71b90fd)
  - [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=e099f8fac0a8016501b7c680e71b90fd)
  - [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_register.do?sys_id=e099f8fac0a8016501b7c680e71b90fd)

### Event: incident.updated_by_problem

- **Table:** [Incident](#incident-table)
- **Priority:** 100
- **Fired By:** *(unknown)*
- **Description:** This event is triggered when the Problem associated to the Incident is Risk Accepted
- **Links:**
  - [usmsktrain2](https://usmsktrain2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=5d8dcfb0534123004247ddeeff7b122f)
  - [usmskstage2](https://usmskstage2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=5d8dcfb0534123004247ddeeff7b122f)
  - [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=5d8dcfb0534123004247ddeeff7b122f)
  - [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_register.do?sys_id=5d8dcfb0534123004247ddeeff7b122f)

### Event: live_feed.update

- **Table:** *(none)*
- **Priority:** 100
- **Fired By:** [Business Rule: live feed events](#business-rule-live-feed-events)
- **Description:** Update occured on a table the feed is interested in
- **Links:**
  - [usmsktrain2](https://usmsktrain2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=60c657e3c0a8018c0099ba6cd4f3b11f)
  - [usmskstage2](https://usmskstage2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=60c657e3c0a8018c0099ba6cd4f3b11f)
  - [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=60c657e3c0a8018c0099ba6cd4f3b11f)
  - [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_register.do?sys_id=60c657e3c0a8018c0099ba6cd4f3b11f)

### Event: live_message.group_inserted

- **Table:** [Live Feed Message](#live-feed-message-table)
- **Priority:** 100
- **Fired By:** [Business Rule: Live Feed message events](#business-rule-live-feed-message-events), [Business Rule: Live message events](#business-rule-live-message-events)
- **Description:** A new message was created in a group
- **Links:**
  - [usmsktrain2](https://usmsktrain2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=a28ddc790a0006b844f6fa3f87f15b19)
  - [usmskstage2](https://usmskstage2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=a28ddc790a0006b844f6fa3f87f15b19)
  - [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=a28ddc790a0006b844f6fa3f87f15b19)
  - [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_register.do?sys_id=a28ddc790a0006b844f6fa3f87f15b19)

### Event: live_message.group_replied

- **Table:** [Live Feed Message](#live-feed-message-table)
- **Priority:** 100
- **Fired By:** [Business Rule: Live Feed message events](#business-rule-live-feed-message-events), [Business Rule: Live message events](#business-rule-live-message-events)
- **Description:** A new reply message was created in a group
- **Links:**
  - [usmsktrain2](https://usmsktrain2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=4d972d99ff220000dadaebcfebffadcc)
  - [usmskstage2](https://usmskstage2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=4d972d99ff220000dadaebcfebffadcc)
  - [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=4d972d99ff220000dadaebcfebffadcc)
  - [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_register.do?sys_id=4d972d99ff220000dadaebcfebffadcc)

### Event: live_message.inserted

- **Table:** [Live Feed Message](#live-feed-message-table)
- **Priority:** 100
- **Fired By:** [Business Rule: Live Feed message events](#business-rule-live-feed-message-events), [Business Rule: Live message events](#business-rule-live-message-events), [Business Rule: global events](#business-rule-global-events)
- **Description:** *(none)*
- **Links:**
  - [usmsktrain2](https://usmsktrain2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=585d25a4c0a80a6d3b1fa8e4f7fd6fb2)
  - [usmskstage2](https://usmskstage2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=585d25a4c0a80a6d3b1fa8e4f7fd6fb2)
  - [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=585d25a4c0a80a6d3b1fa8e4f7fd6fb2)
  - [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_register.do?sys_id=585d25a4c0a80a6d3b1fa8e4f7fd6fb2)

### Event: live_message.mentioned

- **Table:** [Live Mention](#live-mention-table)
- **Priority:** 100
- **Fired By:** [Business Rule: Live Feed message events](#business-rule-live-feed-message-events)
- **Description:** Fired when a message has @Mention
- **Links:**
  - [usmsktrain2](https://usmsktrain2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=52808409474221007f47563dbb9a71e2)
  - [usmskstage2](https://usmskstage2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=52808409474221007f47563dbb9a71e2)
  - [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=52808409474221007f47563dbb9a71e2)
  - [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_register.do?sys_id=52808409474221007f47563dbb9a71e2)

### Event: live_message.replied

- **Table:** [Live Feed Message](#live-feed-message-table)
- **Priority:** 100
- **Fired By:** [Business Rule: Live Feed message events](#business-rule-live-feed-message-events), [Business Rule: Live message events](#business-rule-live-message-events)
- **Description:** *(none)*
- **Links:**
  - [usmsktrain2](https://usmsktrain2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=58614ce3c0a80a6d4a02ceb73328c9bd)
  - [usmskstage2](https://usmskstage2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=58614ce3c0a80a6d4a02ceb73328c9bd)
  - [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=58614ce3c0a80a6d4a02ceb73328c9bd)
  - [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_register.do?sys_id=58614ce3c0a80a6d4a02ceb73328c9bd)

### Event: metric.update

- **Table:** *(none)*
- **Priority:** 100
- **Fired By:** [Business Rule: metrics events](#business-rule-metrics-events)
- **Description:** Metrics for this record need to be updated
- **Links:**
  - [usmsktrain2](https://usmsktrain2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=36ff5d20c0a808ae00f3e6f8f3299a3b)
  - [usmskstage2](https://usmskstage2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=36ff5d20c0a808ae00f3e6f8f3299a3b)
  - [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=36ff5d20c0a808ae00f3e6f8f3299a3b)
  - [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_register.do?sys_id=36ff5d20c0a808ae00f3e6f8f3299a3b)

### Event: problem.assigned

- **Table:** [Problem](#problem-table)
- **Priority:** 100
- **Fired By:** [Business Rule: problem events](#business-rule-problem-events), [Business Rule: global events](#business-rule-global-events)
- **Description:** A problem has been assigned
- **Links:**
  - [usmsktrain2](https://usmsktrain2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=f57376c3c611227b008c1852560bc5be)
  - [usmskstage2](https://usmskstage2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=f57376c3c611227b008c1852560bc5be)
  - [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=f57376c3c611227b008c1852560bc5be)
  - [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_register.do?sys_id=f57376c3c611227b008c1852560bc5be)

### Event: problem.assigned.to.group

- **Table:** [Problem](#problem-table)
- **Priority:** 100
- **Fired By:** *(unknown)*
- **Description:** A problem has been assigned to a group
- **Links:**
  - [usmsktrain2](https://usmsktrain2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=bed7f1929760200031af390ddd29753f)
  - [usmskstage2](https://usmskstage2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=bed7f1929760200031af390ddd29753f)
  - [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=bed7f1929760200031af390ddd29753f)
  - [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_register.do?sys_id=bed7f1929760200031af390ddd29753f)

### Event: problem.escalated

- **Table:** [Problem](#problem-table)
- **Priority:** 100
- **Fired By:** [Business Rule: problem events](#business-rule-problem-events)
- **Description:** A problem has been escalated
- **Links:**
  - [usmsktrain2](https://usmsktrain2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=f573d76cc611227b00723704176d3763)
  - [usmskstage2](https://usmskstage2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=f573d76cc611227b00723704176d3763)
  - [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=f573d76cc611227b00723704176d3763)
  - [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_register.do?sys_id=f573d76cc611227b00723704176d3763)

### Event: problem.inserted

- **Table:** [Problem](#problem-table)
- **Priority:** 100
- **Fired By:** [Business Rule: problem events](#business-rule-problem-events), [Business Rule: global events](#business-rule-global-events)
- **Description:** A problem has been inserted
- **Links:**
  - [usmsktrain2](https://usmsktrain2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=f570d8e4c611227b009f662ebd3a2e3b)
  - [usmskstage2](https://usmskstage2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=f570d8e4c611227b009f662ebd3a2e3b)
  - [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=f570d8e4c611227b009f662ebd3a2e3b)
  - [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_register.do?sys_id=f570d8e4c611227b009f662ebd3a2e3b)

### Event: problem.state_change

- **Table:** [Problem](#problem-table)
- **Priority:** 100
- **Fired By:** [Business Rule: Raise an event when State changes](#business-rule-raise-an-event-when-state-changes)
- **Description:** This event is fired whenever there is a change in state of a Problem record
- **Links:**
  - [usmsktrain2](https://usmsktrain2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=e1b724be874823000e3dd61e36cb0be0)
  - [usmskstage2](https://usmskstage2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=e1b724be874823000e3dd61e36cb0be0)
  - [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=e1b724be874823000e3dd61e36cb0be0)
  - [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_register.do?sys_id=e1b724be874823000e3dd61e36cb0be0)

### Event: problem.updated

- **Table:** [Problem](#problem-table)
- **Priority:** 100
- **Fired By:** [Business Rule: problem events](#business-rule-problem-events), [Business Rule: global events](#business-rule-global-events)
- **Description:** A problem has been updated
- **Links:**
  - [usmsktrain2](https://usmsktrain2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=f5714630c611227b01dcb3cda85791bd)
  - [usmskstage2](https://usmskstage2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=f5714630c611227b01dcb3cda85791bd)
  - [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=f5714630c611227b01dcb3cda85791bd)
  - [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_register.do?sys_id=f5714630c611227b01dcb3cda85791bd)

### Event: problem.worknoted

- **Table:** [Problem](#problem-table)
- **Priority:** 100
- **Fired By:** *(unknown)*
- **Description:** A problem has had a worknote added
- **Links:**
  - [usmsktrain2](https://usmsktrain2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=6cd631929760200031af390ddd2975f9)
  - [usmskstage2](https://usmskstage2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=6cd631929760200031af390ddd2975f9)
  - [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=6cd631929760200031af390ddd2975f9)
  - [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_register.do?sys_id=6cd631929760200031af390ddd2975f9)

### Event: problem_task.assigned

- **Table:** [Problem Task](#problem-task-table)
- **Priority:** 100
- **Fired By:** [Business Rule: problem_task events](#business-rule-problem_task-events), [Business Rule: global events](#business-rule-global-events)
- **Description:** A problem task has been assigned
- **Links:**
  - [usmsktrain2](https://usmsktrain2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=4a70db520a0007040020ccac7cdac1de)
  - [usmskstage2](https://usmskstage2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=4a70db520a0007040020ccac7cdac1de)
  - [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=4a70db520a0007040020ccac7cdac1de)
  - [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_register.do?sys_id=4a70db520a0007040020ccac7cdac1de)

### Event: problem_task.assigned.to.group

- **Table:** [Problem Task](#problem-task-table)
- **Priority:** 100
- **Fired By:** [Business Rule: problem_task events](#business-rule-problem_task-events)
- **Description:** A problem task has been assigned to a group
- **Links:**
  - [usmsktrain2](https://usmsktrain2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=4a7192460a000704019a081837d4b385)
  - [usmskstage2](https://usmskstage2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=4a7192460a000704019a081837d4b385)
  - [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=4a7192460a000704019a081837d4b385)
  - [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_register.do?sys_id=4a7192460a000704019a081837d4b385)

### Event: problem_task.commented

- **Table:** [Problem Task](#problem-task-table)
- **Priority:** 100
- **Fired By:** [Business Rule: problem_task events](#business-rule-problem_task-events), [Business Rule: global events](#business-rule-global-events)
- **Description:** Something added to the Additional comments field
- **Links:**
  - [usmsktrain2](https://usmsktrain2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=4a71fea80a00070401ab71c23eccd0c3)
  - [usmskstage2](https://usmskstage2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=4a71fea80a00070401ab71c23eccd0c3)
  - [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=4a71fea80a00070401ab71c23eccd0c3)
  - [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_register.do?sys_id=4a71fea80a00070401ab71c23eccd0c3)

### Event: problem_task.inserted

- **Table:** [Problem Task](#problem-task-table)
- **Priority:** 100
- **Fired By:** [Business Rule: problem_task events](#business-rule-problem_task-events), [Business Rule: global events](#business-rule-global-events)
- **Description:** A problem task has been inserted
- **Links:**
  - [usmsktrain2](https://usmsktrain2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=7a3e87a25f011000b12e3572f2b47752)
  - [usmskstage2](https://usmskstage2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=7a3e87a25f011000b12e3572f2b47752)
  - usmhttps://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=7a3e87a25f011000b12e3572f2b47752skdev2
  - [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_register.do?sys_id=7a3e87a25f011000b12e3572f2b47752)

### Event: problem_task.state.changed

- **Table:** [Problem Task](#problem-task-table)
- **Priority:** 100
- **Fired By:** [Business Rule: problem_task events](#business-rule-problem_task-events)
- **Description:** State has been updated
- **Links:**
  - [usmsktrain2](https://usmsktrain2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=4a726c530a000704016a6469f6fd41bd)
  - [usmskstage2](https://usmskstage2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=4a726c530a000704016a6469f6fd41bd)
  - [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=4a726c530a000704016a6469f6fd41bd)
  - [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_register.do?sys_id=4a726c530a000704016a6469f6fd41bd)

### Event: problem_task.updated

- **Table:** [Problem Task](#problem-task-table)
- **Priority:** 100
- **Fired By:** [Business Rule: problem_task events](#business-rule-problem_task-events), [Business Rule: global events](#business-rule-global-events)
- **Description:** A problem task has been updated
- **Links:**
  - [usmsktrain2](https://usmsktrain2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=4a72bdea0a00070400257edfee9d90a4)
  - [usmskstage2](https://usmskstage2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=4a72bdea0a00070400257edfee9d90a4)
  - [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=4a72bdea0a00070400257edfee9d90a4)
  - [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_register.do?sys_id=4a72bdea0a00070400257edfee9d90a4)

### Event: problem_task.worknoted

- **Table:** [Problem Task](#problem-task-table)
- **Priority:** 100
- **Fired By:** [Business Rule: problem_task events](#business-rule-problem_task-events)
- **Description:** Something added to the Worknotes field
- **Links:**
  - [usmsktrain2](https://usmsktrain2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=4a722ffe0a00070401179ae1e20aab4e)
  - [usmskstage2](https://usmskstage2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=4a722ffe0a00070401179ae1e20aab4e)
  - [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=4a722ffe0a00070401179ae1e20aab4e)
  - [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_register.do?sys_id=4a722ffe0a00070401179ae1e20aab4e)

### Event: request.approval.cancelled

- **Table:** [Approval](#approval-table)
- **Priority:** 100
- **Fired By:**  [Business Rule: Approval Events (Task)](#business-rule-approval-events-task)
- **Description:** An approval request has been cancelled
- **Links:**
  - [usmsktrain2](https://usmsktrain2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=9277f555c0a8010a00e022ae83d234d0)
  - [usmskstage2](https://usmskstage2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=9277f555c0a8010a00e022ae83d234d0)
  - [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=9277f555c0a8010a00e022ae83d234d0)
  - [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_register.do?sys_id=9277f555c0a8010a00e022ae83d234d0)

### Event: request.approval.inserted

- **Table:** [Approval](#approval-table)
- **Priority:** 100
- **Fired By:**  [Business Rule: Approval Events (Task)](#business-rule-approval-events-task)
- **Description:** An approval request has been inserted asking for an approval of a catalog task
- **Links:**
  - [usmsktrain2](https://usmsktrain2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=f1f97c10c0a8011b01e64a3b65526c1e)
  - [usmskstage2](https://usmskstage2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=f1f97c10c0a8011b01e64a3b65526c1e)
  - [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=f1f97c10c0a8011b01e64a3b65526c1e)
  - [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_register.do?sys_id=f1f97c10c0a8011b01e64a3b65526c1e)

### Event: request.approval.rejected

- **Table:** [Approval](#approval-table)
- **Priority:** 100
- **Fired By:**  [Business Rule: Approval Events (Task)](#business-rule-approval-events-task)
- **Description:** The catalog task has been rejected by the approver
- **Links:**
  - [usmsktrain2](https://usmsktrain2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=f1f9bc65c0a8011b0034d46a390a4bdc)
  - [usmskstage2](https://usmskstage2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=f1f9bc65c0a8011b0034d46a390a4bdc)
  - [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=f1f9bc65c0a8011b0034d46a390a4bdc)
  - [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_register.do?sys_id=f1f9bc65c0a8011b0034d46a390a4bdc)

### Event: sc_req_item.assigned

- **Table:** [Requested Item](#requested-item-table)
- **Priority:** 100
- **Fired By:** [Business Rule: sc req item events](#business-rule-sc-req-item-events), [Business Rule: global events](#business-rule-global-events)
- **Description:** Service Catalog request item assigned
- **Links:**
  - [usmsktrain2](https://usmsktrain2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=2d994fc6c611228400f801c423771aa0)
  - [usmskstage2](https://usmskstage2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=2d994fc6c611228400f801c423771aa0)
  - [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=2d994fc6c611228400f801c423771aa0)
  - [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_register.do?sys_id=2d994fc6c611228400f801c423771aa0)

### Event: sc_req_item.change.stage

- **Table:** [Requested Item](#requested-item-table)
- **Priority:** 100
- **Fired By:** [Business Rule: sc req item events](#business-rule-sc-req-item-events)
- **Description:** A Request Item has changes state
- **Links:**
  - [usmsktrain2](https://usmsktrain2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=3adf79d97f00000100e4de50c13b0d72)
  - [usmskstage2](https://usmskstage2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=3adf79d97f00000100e4de50c13b0d72)
  - [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=3adf79d97f00000100e4de50c13b0d72)
  - [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_register.do?sys_id=3adf79d97f00000100e4de50c13b0d72)

### Event: sc_req_item.commented

- **Table:** [Requested Item](#requested-item-table)
- **Priority:** 100
- **Fired By:** [Business Rule: sc_req_item comment events](#business-rule-sc_req_item-comment-events), [Business Rule: global events](#business-rule-global-events)
- **Description:** Service Catalog request item commented (end user notification)
- **Links:**
  - [usmsktrain2](https://usmsktrain2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=1e0608bd0a0a3c74018096fc93d76513)
  - [usmskstage2](https://usmskstage2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=1e0608bd0a0a3c74018096fc93d76513)
  - [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=1e0608bd0a0a3c74018096fc93d76513)
  - [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_register.do?sys_id=1e0608bd0a0a3c74018096fc93d76513)

### Event: sc_req_item.commented.itil

- **Table:** [Requested Item](#requested-item-table)
- **Priority:** 100
- **Fired By:** [Business Rule: sc_req_item comment events](#business-rule-sc_req_item-comment-events)
- **Description:** Service Catalog request item commented (assignee notification)
- **Links:**
  - [usmsktrain2](https://usmsktrain2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=1e2376fd0a0a3c7401655b3386d6ca89)
  - [usmskstage2](https://usmskstage2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=1e2376fd0a0a3c7401655b3386d6ca89)
  - [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=1e2376fd0a0a3c7401655b3386d6ca89)
  - [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_register.do?sys_id=1e2376fd0a0a3c7401655b3386d6ca89)

### Event: sc_req_item.delivery

- **Table:** [Requested Item](#requested-item-table)
- **Priority:** 100
- **Fired By:** [Business Rule: sc req item events](#business-rule-sc-req-item-events)
- **Description:** Service Catalog request item is being delivered
- **Links:**
  - [usmsktrain2](https://usmsktrain2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=2f410a05c0a80064018a62f680622a94)
  - [usmskstage2](https://usmskstage2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=2f410a05c0a80064018a62f680622a94)
  - [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=2f410a05c0a80064018a62f680622a94)
  - [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_register.do?sys_id=2f410a05c0a80064018a62f680622a94)

### Event: sc_req_item.inserted

- **Table:** [Requested Item](#requested-item-table)
- **Priority:** 100
- **Fired By:** [Business Rule: sc req item events](#business-rule-sc-req-item-events), [Business Rule: global events](#business-rule-global-events)
- **Description:** Service Catalog request item inserted
- **Links:**
  - [usmsktrain2](https://usmsktrain2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=2f40ba60c0a800640127077b71e98869)
  - [usmskstage2](https://usmskstage2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=2f40ba60c0a800640127077b71e98869)
  - [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=2f40ba60c0a800640127077b71e98869)
  - [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_register.do?sys_id=2f40ba60c0a800640127077b71e98869)

### Event: sc_req_item.updated

- **Table:** *(none)*
- **Priority:** 100
- **Fired By:** [Business Rule: sc req item events](#business-rule-sc-req-item-events), [Business Rule: global events](#business-rule-global-events)
- **Description:** *(none)*
- **Links:**
  - usmsktrain2: *(not found)*
  - usmskstage2: *(not found)*
  - usmskdev2: *(not found)*
  - PDI: *(not found)*

### Event: sc_request.approved

- **Table:** [Request](#request-table)
- **Priority:** 100
- **Fired By:** [Business Rule: sc request events](#business-rule-sc-request-events)
- **Description:** Service Catalog request approved
- **Links:**
  - [usmsktrain2](https://usmsktrain2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=2d98c90dc61122840136d1d7a0932193)
  - [usmskstage2](https://usmskstage2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=2d98c90dc61122840136d1d7a0932193)
  - [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=2d98c90dc61122840136d1d7a0932193)
  - [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_register.do?sys_id=2d98c90dc61122840136d1d7a0932193)

### Event: sc_request.assigned

- **Table:** [Request](#request-table)
- **Priority:** 100
- **Fired By:**[Business Rule: sc request events](#business-rule-sc-request-events), [Business Rule: global events](#business-rule-global-events)
- **Description:** Service Catalog request assigned
- **Links:**
  - [usmsktrain2](https://usmsktrain2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=2f42f79fc0a8006401ec0130b3ba97f1)
  - [usmskstage2](https://usmskstage2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=2f42f79fc0a8006401ec0130b3ba97f1)
  - [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=2f42f79fc0a8006401ec0130b3ba97f1)
  - [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_register.do?sys_id=2f42f79fc0a8006401ec0130b3ba97f1)

### Event: sc_request.commented

- **Table:** *(none)*
- **Priority:** 100
- **Fired By:** [Business Rule: sc request events](#business-rule-sc-request-events), [Business Rule: global events](#business-rule-global-events)
- **Description:** *(none)*
- **Links:**
  - usmsktrain2: *(not found)*
  - usmskstage2: *(not found)*
  - usmskdev2: *(not found)*
  - PDI: *(not found)*

### Event: sc_request.escalated

- **Table:** *(none)*
- **Priority:** 100
- **Fired By:** [Business Rule: sc request events](#business-rule-sc-request-events)
- **Description:** *(none)*
- **Links:**
  - usmsktrain2: *(not found)*
  - usmskstage2: *(not found)*
  - usmskdev2: *(not found)*
  - PDI: *(not found)*

### Event: sc_request.inactive

- **Table:** *(none)*
- **Priority:** 100
- **Fired By:** [Business Rule: sc request events](#business-rule-sc-request-events), [Business Rule: global events](#business-rule-global-events)
- **Description:** *(none)*
- **Links:**
  - usmsktrain2: *(not found)*
  - usmskstage2: *(not found)*
  - usmskdev2: *(not found)*
  - PDI: *(not found)*

### Event: sc_request.inserted

- **Table:** [Request](#request-table)
- **Priority:** 100
- **Fired By:** [Business Rule: sc request events](#business-rule-sc-request-events), [Business Rule: global events](#business-rule-global-events)
- **Description:** Service Catalog request inserted
- **Links:**
  - [usmsktrain2](https://usmsktrain2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=e8bca6747f00000100e8d404e441bcb9)
  - [usmskstage2](https://usmskstage2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=e8bca6747f00000100e8d404e441bcb9)
  - [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=e8bca6747f00000100e8d404e441bcb9)
  - [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_register.do?sys_id=e8bca6747f00000100e8d404e441bcb9)

### Event: sc_request.requested_for

- **Table:** [Request](#request-table)
- **Priority:** 100
- **Fired By:** [Business Rule: sc request events](#business-rule-sc-request-events)
- **Description:** Service Catalog request requested_for
- **Links:**
  - [usmsktrain2](https://usmsktrain2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=2f336219c0a80064009a44f176e9e7e9)
  - [usmskstage2](https://usmskstage2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=2f336219c0a80064009a44f176e9e7e9)
  - [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=2f336219c0a80064009a44f176e9e7e9)
  - [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_register.do?sys_id=2f336219c0a80064009a44f176e9e7e9)

### Event: sc_request.updated

- **Table:** [Request](#request-table)
- **Priority:** 100
- **Fired By:** [Business Rule: sc request events](#business-rule-sc-request-events), [Business Rule: global events](#business-rule-global-events)
- **Description:** Service Catalog request updated
- **Links:**
  - [usmsktrain2](https://usmsktrain2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=2d989086c611228401eee3fb98941f2f)
  - [usmskstage2](https://usmskstage2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=2d989086c611228401eee3fb98941f2f)
  - [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=2d989086c611228401eee3fb98941f2f)
  - [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_register.do?sys_id=2d989086c611228401eee3fb98941f2f)

### Event: sc_task.approval.cancelled

- **Table:** [Approval](#approval-table)
- **Priority:** 100
- **Fired By:**  [Business Rule: Approval Events (Task)](#business-rule-approval-events-task)
- **Description:** An approval request has been cancelled
- **Links:**
  - [usmsktrain2](https://usmsktrain2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=92781b6bc0a8010a0043671d841cf76f)
  - [usmskstage2](https://usmskstage2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=92781b6bc0a8010a0043671d841cf76f)
  - [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=92781b6bc0a8010a0043671d841cf76f)
  - [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_register.do?sys_id=92781b6bc0a8010a0043671d841cf76f)

### Event: sc_task.approval.inserted

- **Table:** [Catalog Task](#catalog-task-table)
- **Priority:** 100
- **Fired By:**  [Business Rule: Approval Events (Task)](#business-rule-approval-events-task)
- **Description:** An approval record for a Service Catalog Task has been inserted
- **Links:**
  - [usmsktrain2](https://usmsktrain2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=8252f413c0a8010a01bd21845bb17295)
  - [usmskstage2](https://usmskstage2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=8252f413c0a8010a01bd21845bb17295)
  - [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=8252f413c0a8010a01bd21845bb17295)
  - [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_register.do?sys_id=8252f413c0a8010a01bd21845bb17295)

### Event: sc_task.approval.rejected

- **Table:** [Catalog Task](#catalog-task-table)
- **Priority:** 100
- **Fired By:**  [Business Rule: Approval Events (Task)](#business-rule-approval-events-task)
- **Description:** An approval record for a Service Catalog Task has been rejected
- **Links:**
  - [usmsktrain2](https://usmsktrain2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=8253247ac0a8010a018f17ceb08287eb)
  - [usmskstage2](https://usmskstage2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=8253247ac0a8010a018f17ceb08287eb)
  - [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=8253247ac0a8010a018f17ceb08287eb)
  - [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_register.do?sys_id=8253247ac0a8010a018f17ceb08287eb)

### Event: sc_task.assigned.to.group

- **Table:** [Catalog Task](#catalog-task-table)
- **Priority:** 100
- **Fired By:** [Business Rule: sc_task_events](#business-rule-sc_task_events)
- **Description:** A service catalog task has had its assignment group set
- **Links:**
  - [usmsktrain2](https://usmsktrain2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=0395ee4bc0a8010200a4f80e62a53845)
  - [usmskstage2](https://usmskstage2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=0395ee4bc0a8010200a4f80e62a53845)
  - [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=0395ee4bc0a8010200a4f80e62a53845)
  - [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_register.do?sys_id=0395ee4bc0a8010200a4f80e62a53845)

### Event: sc_task.assigned.to.user

- **Table:** [Catalog Task](#catalog-task-table)
- **Priority:** 100
- **Fired By:** [Business Rule: sc_task_events](#business-rule-sc_task_events)
- **Description:** A service catalog task has had its assigned to user set
- **Links:**
  - [usmsktrain2](https://usmsktrain2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=039657f2c0a80102002f3d17967ed845)
  - [usmskstage2](https://usmskstage2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=039657f2c0a80102002f3d17967ed845)
  - [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=039657f2c0a80102002f3d17967ed845)
  - [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_register.do?sys_id=039657f2c0a80102002f3d17967ed845)

### Event: sc_task.commented

- **Table:** *(none)*
- **Priority:** 100
- **Fired By:** [Business Rule: sc_task_events](#business-rule-sc_task_events), [Business Rule: global events](#business-rule-global-events)
- **Description:** *(none)*
- **Links:**
  - usmsktrain2: *(not found)*
  - usmskstage2: *(not found)*
  - usmskdev2: *(not found)*
  - PDI: *(not found)*

### Event: sc_task.state.changed

- **Table:** *(none)*
- **Priority:** 100
- **Fired By:** [Business Rule: sc_task_events](#business-rule-sc_task_events)
- **Description:** *(none)*
- **Links:**
  - usmsktrain2: *(not found)*
  - usmskstage2: *(not found)*
  - usmskdev2: *(not found)*
  - PDI: *(not found)*

### Event: sc_task.updated

- **Table:** *(none)*
- **Priority:** 100
- **Fired By:** [Business Rule: sc_task_events](#business-rule-sc_task_events), [Business Rule: global events](#business-rule-global-events)
- **Description:** *(none)*
- **Links:**
  - usmsktrain2: *(not found)*
  - usmskstage2: *(not found)*
  - usmskdev2: *(not found)*
  - PDI: *(not found)*

### Event: sc_task.worknoted

- **Table:** [Catalog Task](#catalog-task-table)
- **Priority:** 100
- **Fired By:** [Business Rule: sc_task_events](#business-rule-sc_task_events)
- **Description:** [Catalog Task](#catalog-task-table)
- **Links:**
  - [usmsktrain2](https://usmsktrain2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=5038008c4a362312008bdd85783f56f4)
  - [usmskstage2](https://usmskstage2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=5038008c4a362312008bdd85783f56f4)
  - [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=5038008c4a362312008bdd85783f56f4)
  - [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_register.do?sys_id=5038008c4a362312008bdd85783f56f4)

### Event: task.approved

- **Table:** [Task](#task-table)
- **Priority:** 100
- **Fired By:** [Business Rule: task events](#business-rule-task-events)
- **Description:** The task has been approved
- **Links:**
  - [usmsktrain2](https://usmsktrain2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=c9e03d07c6112274004c8422893b98d9)
  - [usmskstage2](https://usmskstage2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=c9e03d07c6112274004c8422893b98d9)
  - [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=c9e03d07c6112274004c8422893b98d9)
  - [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_register.do?sys_id=c9e03d07c6112274004c8422893b98d9)

### Event: task.rejected

- **Table:** [Task](#task-table)
- **Priority:** 100
- **Fired By:** [Business Rule: task events](#business-rule-task-events)
- **Description:** The task has been rejected
- **Links:**
  - [usmsktrain2](https://usmsktrain2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=1a931f1dc61122aa01dc7b3e9a40b0fa)
  - [usmskstage2](https://usmskstage2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=1a931f1dc61122aa01dc7b3e9a40b0fa)
  - [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_register.do?sys_id=1a931f1dc61122aa01dc7b3e9a40b0fa)
  - [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_register.do?sys_id=1a931f1dc61122aa01dc7b3e9a40b0fa)

## Notifications

### Notification: Approval Record Assigned - Request

- **Send When:** Record inserted or updated
- **Table:** [Approval](#approval-table)
- **Conditions:** *(none)*

| Link                                                                                                                                     | Active |
|------------------------------------------------------------------------------------------------------------------------------------------|--------|
| usmsktrain2 | true   |
| usmskstage2 | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_email_action.do?sys_id=96b3629f0f5c33001befa68ca8767e35)     | true   |
| PDI: *not found*                                                                                                                         | *n/a*  |

### Notification: Approval Record Assigned - RITM

- **Send When:** Record inserted or updated
- **Table:** [Approval](#approval-table)
- **Conditions:** *(none)*

| Link                                                                                                                                     | Active |
|------------------------------------------------------------------------------------------------------------------------------------------|--------|
| usmsktrain2 | true   |
| usmskstage2 | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_email_action.do?sys_id=8f96ae930f9c33001befa68ca8767e36)     | true   |
| PDI: *not found*                                                                                                                         | *n/a*  |

### Notification: Approval Rejected

- **Send When:** [approval.rejected](#event-approvalrejected) event is fired
- **Table:** [Approval](#approval-table)
- **Conditions:** *(none)*

| Link                                                                                                                                     | Active |
|------------------------------------------------------------------------------------------------------------------------------------------|--------|
| usmsktrain2 | true   |
| usmskstage2 | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_email_action.do?sys_id=b2c45bcfc611227100d9025488a0cb3b)     | true   |
| [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_email_action.do?sys_id=b2c45bcfc611227100d9025488a0cb3b)                  | true   |

### Notification: Approval Rejected By Other

- **Send When:** [approval.rejected.by.other](#event-approvalrejectedbyother) event is fired
- **Table:** [Approval](#approval-table)
- **Conditions:** *(none)*

| Link                                                                                                                                     | Active |
|------------------------------------------------------------------------------------------------------------------------------------------|--------|
| usmsktrain2 | true   |
| usmskstage2 | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_email_action.do?sys_id=b3459645c6112271016b4e30ab48147d)     | true   |
| [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_email_action.do?sys_id=b3459645c6112271016b4e30ab48147d)                  | true   |

### Notification: Approval Request

- **Send When:** [approval.inserted](#event-approvalinserted) event is fired
- **Table:** [Approval](#approval-table)
- **Conditions:** *(none)*

| Link                                                                                                                                     | Active |
|------------------------------------------------------------------------------------------------------------------------------------------|--------|
| usmsktrain2 | true   |
| usmskstage2 | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_email_action.do?sys_id=aea24ac2c611227101fe910c323fb00e)     | false  |
| [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_email_action.do?sys_id=aea24ac2c611227101fe910c323fb00e)                  | true   |

### Notification: Approval Request USM

- **Send When:** [approval.inserted](#event-approvalinserted) event is fired
- **Table:** [Approval](#approval-table)
- **Conditions:** `sysapproval.sys_class_name!=x_doju2_usm_157a_usm_157a_request^EQ`

| Link                                                                                                                                     | Active |
|------------------------------------------------------------------------------------------------------------------------------------------|--------|
| usmsktrain2 | true   |
| usmskstage2 | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_email_action.do?sys_id=98e8c6a11b821810edce10ad9c4bcba5)     | true   |
| PDI: *not found*                                                                                                                         | *n/a*  |

### Notification: Assigned Approval

- **Send When:** Record inserted or updated
- **Table:** [Approval](#approval-table)
- **Conditions:** *(none)*

| Link                                                                                                                                     | Active |
|------------------------------------------------------------------------------------------------------------------------------------------|--------|
| usmsktrain2 | true   |
| usmskstage2 | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_email_action.do?sys_id=a2b0232adb4184504f4cf5fc0f961985)     | true   |
| PDI: *not found*                                                                                                                         | *n/a*  |

### Notification: Catalog Approval Rejected

- **Send When:** [request.approval.rejected](#event-requestapprovalrejected) event is fired
- **Table:** [Approval](#approval-table)
- **Conditions:** *(none)*

| Link                                                                                                                                     | Active |
|------------------------------------------------------------------------------------------------------------------------------------------|--------|
| usmsktrain2 | true   |
| usmskstage2 | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_email_action.do?sys_id=f1ff45a1c0a8011b01f899e995dc7583)     | true   |
| [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_email_action.do?sys_id=f1ff45a1c0a8011b01f899e995dc7583)                  | true   |

### Notification: Catalog Approval Request

- **Send When:** [request.approval.cancelled](#event-requestapprovalcancelled) event is fired
- **Table:** [Approval](#approval-table)
- **Conditions:** *(none)*

| Link                                                                                                                                     | Active |
|------------------------------------------------------------------------------------------------------------------------------------------|--------|
| usmsktrain2 | true   |
| usmskstage2 | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_email_action.do?sys_id=927afd45c0a8010a001f28267acf98e4)     | true   |
| [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_email_action.do?sys_id=927afd45c0a8010a001f28267acf98e4)                  | true   |

### Notification: Catalog task worknoted (to assignee)

- **Send When:** Record inserted or updated
- **Table:** [Catalog Task](#catalog-task-table)
- **Conditions:** `assigned_toISNOTEMPTY^work_notesVALCHANGES^EQ`

| Link                                                                                                                                     | Active |
|------------------------------------------------------------------------------------------------------------------------------------------|--------|
| usmsktrain2 | true   |
| usmskstage2 | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_email_action.do?sys_id=30c8fc660a0a3c740153e301daacca14)     | true   |
| [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_email_action.do?sys_id=30c8fc660a0a3c740153e301daacca14)                  | true   |

### Notification: Catalog task worknoted (unassigned)

- **Send When:** Record inserted or updated
- **Table:** [Catalog Task](#catalog-task-table)
- **Conditions:** `assigned_toISEMPTY^work_notesVALCHANGES^EQ`

| Link                                                                                                                                     | Active |
|------------------------------------------------------------------------------------------------------------------------------------------|--------|
| usmsktrain2 | true   |
| usmskstage2 | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_email_action.do?sys_id=30c9fc2b0a0a3c740073f3d2fd35066e)     | true   |
| [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_email_action.do?sys_id=30c9fc2b0a0a3c740073f3d2fd35066e)                  | true   |

### Notification: Comment left on incident

- **Send When:** [incident.commented](#event-incidentcommented) event is fired
- **Table:** [Incident](#incident-table)
- **Conditions:** [Approval](#approval-table)

| Link                                                                                                                                     | Active |
|------------------------------------------------------------------------------------------------------------------------------------------|--------|
| usmsktrain2 | true   |
| usmskstage2 | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_email_action.do?sys_id=fc78e05653a6301001b2ddeeff7b128d)     | false  |
| [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_email_action.do?sys_id=fc78e05653a6301001b2ddeeff7b128d)                  | true   |

### Notification: Comment left on request

- **Send When:** Record inserted or updated
- **Table:** [Requested Item](#requested-item-table)
- **Conditions:** `commentsVALCHANGES^EQ`

| Link                                                                                                                                     | Active |
|------------------------------------------------------------------------------------------------------------------------------------------|--------|
| usmsktrain2 | true   |
| usmskstage2 | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_email_action.do?sys_id=78243e8877323010f088a0e89e5a9969)     | false  |
| [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_email_action.do?sys_id=78243e8877323010f088a0e89e5a9969)                  | true   |

### Notification: Email assigned to (sc_task)

- **Send When:** Record inserted or updated
- **Table:** [Catalog Task](#catalog-task-table)
- **Conditions:** `assigned_toISNOTEMPTY^assigned_toVALCHANGES^ORwork_startVALCHANGES^EQ`

| Link                                                                                                                                     | Active |
|------------------------------------------------------------------------------------------------------------------------------------------|--------|
| usmsktrain2 | true   |
| usmskstage2 | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_email_action.do?sys_id=039c7466c0a80102004f66ab6aa3e757)     | true   |
| [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_email_action.do?sys_id=039c7466c0a80102004f66ab6aa3e757)                  | true   |

### Notification: Email assigned to group (sc_task)

- **Send When:** Record inserted or updated
- **Table:** [Catalog Task](#catalog-task-table)
- **Conditions:** `assigned_toISEMPTY^assignment_groupVALCHANGES^ORwork_startVALCHANGES^EQ`

| Link                                                                                                                                     | Active |
|------------------------------------------------------------------------------------------------------------------------------------------|--------|
| usmsktrain2 | true   |
| usmskstage2 | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_email_action.do?sys_id=03973320c0a801020075d86be149dcbb)     | true   |
| [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_email_action.do?sys_id=03973320c0a801020075d86be149dcbb)                  | true   |

### Notification: Incident - Assigned

- **Send When:** Record inserted or updated
- **Table:** [Catalog Task](#catalog-task-table)
- **Conditions:** `assigned_toVALCHANGES^assigned_toISNOTEMPTY^EQ`

| Link                                                                                                                                     | Active |
|------------------------------------------------------------------------------------------------------------------------------------------|--------|
| usmsktrain2 | true   |
| usmskstage2 | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_email_action.do?sys_id=9d4e33dcdbe14c104f4cf5fc0f9619b5)     | true   |
| PDI: *not found*                                                                                                                         | *n/a*  |

### Notification: Incident assigned to me

- **Send When:** Record inserted or updated
- **Table:** [Incident](#incident-table)
- **Conditions:** `assigned_toVALCHANGES^assigned_toISNOTEMPTY^EQ`

| Link                                                                                                                                     | Active |
|------------------------------------------------------------------------------------------------------------------------------------------|--------|
| usmsktrain2 | true   |
| usmskstage2 | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_email_action.do?sys_id=5d078413c0a801640144dc7bc70871ce)     | true   |
| [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_email_action.do?sys_id=5d078413c0a801640144dc7bc70871ce)                  | true   |

### Notification: Incident assigned to my group

- **Send When:** Record inserted or updated
- **Table:** [Incident](#incident-table)
- **Conditions:** `assigned_toISEMPTY^assignment_groupVALCHANGES^assignment_groupISNOTEMPTY^EQ`

| Link                                                                                                                                     | Active |
|------------------------------------------------------------------------------------------------------------------------------------------|--------|
| usmsktrain2 | true   |
| usmskstage2 | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_email_action.do?sys_id=56ae47dfc611227501b04310882ac2ab)     | true   |
| [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_email_action.do?sys_id=56ae47dfc611227501b04310882ac2ab)                  | true   |

### Notification: Incident Closed *(Mobile UI)*

- **Send When:** Record inserted or updated
- **Table:** [Incident](#incident-table)
- **Conditions:** `incident_state=7^universal_requestISEMPTY^EQ`

| Link                                                                                                                                     | Active |
|------------------------------------------------------------------------------------------------------------------------------------------|--------|
| usmsktrain2 | true   |
| usmskstage2 | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_email_action.do?sys_id=24e34b54c61122aa0108c1b7a33697cf)     | false  |
| PDI: *not found*                                                                                                                         | *n/a*  |

### Notification: Incident closed

- **Send When:** Record inserted or updated
- **Table:** [Incident](#incident-table)
- **Conditions:** `incident_state=7^universal_requestISEMPTY^EQ`

| Link                                                                                                                                     | Active |
|------------------------------------------------------------------------------------------------------------------------------------------|--------|
| usmsktrain2 | true   |
| usmskstage2 | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_email_action.do?sys_id=5b82abc767a630105f74e8a331b73092)     | false  |
| [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_email_action.do?sys_id=5b82abc767a630105f74e8a331b73092)                  | true   |

### Notification: Incident Commented

- **Send When:** [incident.commented](#event-incidentcommented) event is fired
- **Table:** [Incident](#incident-table)
- **Conditions:** *(none)*

| Link                                                                                                                                     | Active |
|------------------------------------------------------------------------------------------------------------------------------------------|--------|
| usmsktrain2 | true   |
| usmskstage2 | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_email_action.do?sys_id=8b3233adc0a8016400552379e6462de6)     | true   |
| PDI: *not found*                                                                                                                         | *n/a*  |

### Notification: Incident commented and state changed

- **Send When:** Record inserted or updated
- **Table:** [Incident](#incident-table)
- **Conditions:** `commentsVALCHANGES^stateCHANGESFROM3^stateCHANGESTO2^caller_idDYNAMICMe^EQ`

| Link                                                                                                                                     | Active |
|------------------------------------------------------------------------------------------------------------------------------------------|--------|
| usmsktrain2 | true   |
| usmskstage2 | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_email_action.do?sys_id=e3d6fce487d73200b4ae6c5837cb0b21)     | true   |
| [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_email_action.do?sys_id=e3d6fce487d73200b4ae6c5837cb0b21)                  | true   |

### Incident commented for ESS

- **Send When:** [incident.commented](#event-incidentcommented) event is fired
- **Table:** [Incident](#incident-table)
- **Conditions:** *(none)*

| Link                                                                                                                                     | Active |
|------------------------------------------------------------------------------------------------------------------------------------------|--------|
| usmsktrain2 | true   |
| usmskstage2 | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_email_action.do?sys_id=8f9cea1dc0a801640185982cb7b19252)     | true   |
| PDI: *not found*                                                                                                                         | *n/a*  |

### Notification: Incident commented for ITIL

- **Send When:** Record inserted or updated
- **Table:** [Incident](#incident-table)
- **Conditions:** `commentsVALCHANGES^EQ`

| Link                                                                                                                                     | Active |
|------------------------------------------------------------------------------------------------------------------------------------------|--------|
| usmsktrain2 | true   |
| usmskstage2 | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_email_action.do?sys_id=0d51edbac0a80164006963b000ff644e)     | true   |
| [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_email_action.do?sys_id=0d51edbac0a80164006963b000ff644e)                  | true   |

### Notification: Incident Escalated

- **Send When:** [incident.escalated](#event-incidentescalated) event is fired
- **Table:** *(none)*
- **Conditions:** *(none)*

| Link                                                                                                                                     | Active |
|------------------------------------------------------------------------------------------------------------------------------------------|--------|
| usmsktrain2 | true   |
| usmskstage2 | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_email_action.do?sys_id=662fb96cc0a80164006a60d5c6979470)     | true   |
| [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_email_action.do?sys_id=662fb96cc0a80164006a60d5c6979470)                  | true   |

### Notification:Incident Marked Resolved

- **Send When:** Record inserted or updated
- **Table:** [Incident](#incident-table)
- **Conditions:** `close_notesISNOTEMPTY^EQ`

| Link                                                                                                                                     | Active |
|------------------------------------------------------------------------------------------------------------------------------------------|--------|
| usmsktrain2 | true   |
| usmskstage2 | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_email_action.do?sys_id=03fb775cdbe14c104f4cf5fc0f9619e6)     | true   |
| PDI: *not found*                                                                                                                         | *n/a*  |

### Notification: Incident - New Comments

- **Send When:** Record inserted or updated
- **Table:** [Incident](#incident-table)
- **Conditions:** `commentsVALCHANGES^EQ`

| Link                                                                                                                                     | Active |
|------------------------------------------------------------------------------------------------------------------------------------------|--------|
| usmsktrain2 | true   |
| usmskstage2 | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_email_action.do?sys_id=a81d3b5cdbe14c104f4cf5fc0f96190c)     | true   |
| PDI: *not found*                                                                                                                         | *n/a*  |

### Notification: Incident Opened and Unassigned

- **Send When:** Record inserted or updated
- **Table:** [Incident](#incident-table)
- **Conditions:** `assigned_toISEMPTY^active=true^EQ`

| Link                                                                                                                                     | Active |
|------------------------------------------------------------------------------------------------------------------------------------------|--------|
| usmsktrain2 | true   |
| usmskstage2 | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_email_action.do?sys_id=0d539c30c0a80164013cc05fcf7e5573)     | true   |
| [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_email_action.do?sys_id=0d539c30c0a80164013cc05fcf7e5573)                  | true   |

### Notification: Incident opened for me

- **Send When:** Record inserted or updated
- **Table:** [Incident](#incident-table)
- **Conditions:** `active=true^EQ`

| Link                                                                                                                                     | Active |
|------------------------------------------------------------------------------------------------------------------------------------------|--------|
| usmsktrain2 | true   |
| usmskstage2 | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_email_action.do?sys_id=8f9389b5c0a8016401715c208ff9bf48)     | true   |
| PDI: *not found*                                                                                                                         | *n/a*  |

### Notification: Incident Resolved *(Mobile UI)*

- **Send When:** Record inserted or updated
- **Table:** [Incident](#incident-table)
- **Conditions:** `incident_stateCHANGESTO6^universal_requestISEMPTY^EQ`

| Link                                                                                                                                     | Active |
|------------------------------------------------------------------------------------------------------------------------------------------|--------|
| usmsktrain2 | true   |
| usmskstage2 | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_email_action.do?sys_id=498162a20a0a0b4b00725fb9e5b6aeb3)     | true   |
| PDI: *not found*                                                                                                                         | *n/a*  |

### Notification: Incident resolved

- **Send When:** Record inserted or updated
- **Table:** [Incident](#incident-table)
- **Conditions:** `incident_stateCHANGESTO6^universal_requestISEMPTY^EQ`

| Link                                                                                                                                     | Active |
|------------------------------------------------------------------------------------------------------------------------------------------|--------|
| usmsktrain2 | true   |
| usmskstage2 | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_email_action.do?sys_id=4d505448e5aeb410f8777565f90b2f13)     | false  |
| [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_email_action.do?sys_id=4d505448e5aeb410f8777565f90b2f13)                  | true   |

### Notification: Incident resolved by Problem (ITIL)

- **Send When:** [incident.resolved_by_problem](#event-incidentresolved_by_problem) event is fired
- **Table:** [Incident](#incident-table)
- **Conditions:** *(none)*

| Link                                                                                                                                     | Active |
|------------------------------------------------------------------------------------------------------------------------------------------|--------|
| usmsktrain2 | true   |
| usmskstage2 | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_email_action.do?sys_id=1884091c534123004247ddeeff7b1226)     | true   |
| [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_email_action.do?sys_id=1884091c534123004247ddeeff7b1226)                  | true   |

### Notification: Incident updated by Problem (ITIL)

- **Send When:** [incident.updated_by_problem](#event-incidentupdated_by_problem) event is fired
- **Table:** [Incident](#incident-table)
- **Conditions:** *(none)*

| Link                                                                                                                                     | Active |
|------------------------------------------------------------------------------------------------------------------------------------------|--------|
| usmsktrain2 | true   |
| usmskstage2 | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_email_action.do?sys_id=ac0e43f0534123004247ddeeff7b128a)     | true   |
| [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_email_action.do?sys_id=ac0e43f0534123004247ddeeff7b128a)                  | true   |

### Notification: Incident was opened

- **Send When:** Record inserted or updated
- **Table:** [Incident](#incident-table)
- **Conditions:** `active=true^universal_requestISEMPTY^EQ`

| Link                                                                                                                                     | Active |
|------------------------------------------------------------------------------------------------------------------------------------------|--------|
| usmsktrain2 | true   |
| usmskstage2 | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_email_action.do?sys_id=58e3c1d45322301001b2ddeeff7b1266)     | false  |
| [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_email_action.do?sys_id=58e3c1d45322301001b2ddeeff7b1266)                  | true   |

### Notification: Incident worknoted for ITIL

- **Send When:** Record inserted or updated
- **Table:** [Incident](#incident-table)
- **Conditions:** `work_notesVALCHANGES^EQ`

| Link                                                                                                                                     | Active |
|------------------------------------------------------------------------------------------------------------------------------------------|--------|
| usmsktrain2 | true   |
| usmskstage2 | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_email_action.do?sys_id=fc468017536270108b91ddeeff7b128d)     | true   |
| [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_email_action.do?sys_id=fc468017536270108b91ddeeff7b128d)                  | true   |

### Notification: Live Feed MsgReply Subscription

Notification when a reply or reply_to_reply message is inserted into a thread of message

- **Send When:** [live_message.group_replied](#event-live_messagegroup_replied) event is fired
- **Table:** [Live Feed Message](#live-feed-message-table)
- **Conditions:** *(none)*

| Link                                                                                                                                     | Active |
|------------------------------------------------------------------------------------------------------------------------------------------|--------|
| usmsktrain2 | true   |
| usmskstage2 | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_email_action.do?sys_id=6b55961dff220000dadaebcfebffad87)     | true   |
| [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_email_action.do?sys_id=6b55961dff220000dadaebcfebffad87)                  | true   |

### Notification: Live Message All Subscription

- **Send When:** [live_message.inserted](#event-live_messageinserted) event is fired
- **Table:** [Live Feed Message](#live-feed-message-table)
- **Conditions:** *(none)*

| Link                                                                                                                                     | Active |
|------------------------------------------------------------------------------------------------------------------------------------------|--------|
| usmsktrain2 | true   |
| usmskstage2 | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_email_action.do?sys_id=61c96c68c0a80a6d03e549d84a851989)     | true   |
| [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_email_action.do?sys_id=61c96c68c0a80a6d03e549d84a851989)                  | true   |

### Notification: Live Message Feed Subscription

- **Send When:** [live_message.group_inserted](#event-live_messagegroup_inserted) event is fired
- **Table:** [Live Feed Message](#live-feed-message-table)
- **Conditions:** *(none)*

| Link                                                                                                                                     | Active |
|------------------------------------------------------------------------------------------------------------------------------------------|--------|
| usmsktrain2 | true   |
| usmskstage2 | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_email_action.do?sys_id=a2ac52380a0006b835ae0cdcd6a50ecb)     | true   |
| [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_email_action.do?sys_id=a2ac52380a0006b835ae0cdcd6a50ecb)                  | true   |

### Notification: Live Message Mention

- **Send When:** [live_message.mentioned](#event-live_messagementioned) event is fired
- **Table:** [Live Feed Message](#live-feed-message-table)
- **Conditions:** *(none)*

| Link                                                                                                                                     | Active |
|------------------------------------------------------------------------------------------------------------------------------------------|--------|
| usmsktrain2 | true   |
| usmskstage2 | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_email_action.do?sys_id=121d4e84475221007f47563dbb9a717e)     | true   |
| [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_email_action.do?sys_id=121d4e84475221007f47563dbb9a717e)                  | true   |

### Notification: Live Message New Posts Subscription

- **Send When:** [live_message.inserted](#event-live_messageinserted) event is fired
- **Table:** [Live Feed Message](#live-feed-message-table)
- **Conditions:** `reply_toISEMPTY^EQ`

| Link                                                                                                                                     | Active |
|------------------------------------------------------------------------------------------------------------------------------------------|--------|
| usmsktrain2 | true   |
| usmskstage2 | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_email_action.do?sys_id=61ca2603c0a80a6d1375097afbdec072)     | true   |
| [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_email_action.do?sys_id=58603bddc0a80a6d1493a3def49f617e)                  | true   |

### Notification: Live Message Reply

- **Send When:** [live_message.replied](#event-live_messagereplied) event is fired
- **Table:** [Live Feed Message](#live-feed-message-table)
- **Conditions:** *(none)*

| Link                                                                                                                                     | Active |
|------------------------------------------------------------------------------------------------------------------------------------------|--------|
| usmsktrain2 | true   |
| usmskstage2 | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_email_action.do?sys_id=58603bddc0a80a6d1493a3def49f617e)     | true   |
| [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_email_action.do?sys_id=58603bddc0a80a6d1493a3def49f617e)                  | true   |

### Notification: New Incident

- **Send When:** Record inserted or updated
- **Table:** [Incident](#incident-table)
- **Conditions:** *(none)*

| Link                                                                                                                                     | Active |
|------------------------------------------------------------------------------------------------------------------------------------------|--------|
| usmsktrain2 | true   |
| usmskstage2 | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_email_action.do?sys_id=a42a7fd8dbe14c104f4cf5fc0f96194d)     | true   |
| PDI: *not found*                                                                                                                         | *n/a*  |

### Notification: Problem assigned to me

- **Send When:** Record inserted or updated
- **Table:** [Problem](#problem-table)
- **Conditions:** `assigned_toVALCHANGES^assigned_toISNOTEMPTY^EQ`

| Link                                                                                                                                     | Active |
|------------------------------------------------------------------------------------------------------------------------------------------|--------|
| usmsktrain2 | true   |
| usmskstage2 | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_email_action.do?sys_id=6969cd0b4a36231200ca9e4bbf405a0b)     | true   |
| [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_email_action.do?sys_id=6969cd0b4a36231200ca9e4bbf405a0b)                  | true   |

### Notification: Problem assigned to my group

- **Send When:** Record inserted or updated
- **Table:** [Problem](#problem-table)
- **Conditions:** `assigned_toISEMPTY^assignment_groupISNOTEMPTY^assignment_groupVALCHANGES^EQ`

| Link                                                                                                                                     | Active |
|------------------------------------------------------------------------------------------------------------------------------------------|--------|
| usmsktrain2 | true   |
| usmskstage2 | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_email_action.do?sys_id=696ad0f24a36231200dcf0baf81eaf93)     | true   |
| [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_email_action.do?sys_id=696ad0f24a36231200dcf0baf81eaf93)                  | true   |

### Notification: Problem Closed

- **Send When:** Record inserted or updated
- **Table:** [Problem](#problem-table)
- **Conditions:** `activeCHANGESTOfalse^EQ`

| Link                                                                                                                                     | Active |
|------------------------------------------------------------------------------------------------------------------------------------------|--------|
| usmsktrain2 | true   |
| usmskstage2 | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_email_action.do?sys_id=1e8daa5f9f2202008f97b89a442e70a4)     | true   |
| [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_email_action.do?sys_id=1e8daa5f9f2202008f97b89a442e70a4)                  | true   |

### Notification: Problem Task assigned to me

- **Send When:** Record inserted or updated
- **Table:** [Problem Task](#problem-task-table)
- **Conditions:** `assigned_toISNOTEMPTY^assigned_toVALCHANGES^EQ`

| Link                                                                                                                                     | Active |
|------------------------------------------------------------------------------------------------------------------------------------------|--------|
| usmsktrain2 | true   |
| usmskstage2 | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_email_action.do?sys_id=698bdac84a3623120032d9c4fdc8111c)     | true   |
| [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_email_action.do?sys_id=698bdac84a3623120032d9c4fdc8111c)                  | true   |

### Notification: Problem Task assigned to my group

- **Send When:** Record inserted or updated
- **Table:** [Problem Task](#problem-task-table)
- **Conditions:** `assigned_toISEMPTY^assignment_groupISNOTEMPTY^assignment_groupVALCHANGES^EQ`

| Link                                                                                                                                     | Active |
|------------------------------------------------------------------------------------------------------------------------------------------|--------|
| usmsktrain2 | true   |
| usmskstage2 | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_email_action.do?sys_id=698cb86f4a362312014f273f3dabb026)     | true   |
| [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_email_action.do?sys_id=698cb86f4a362312014f273f3dabb026)                  | true   |

### Notification: Problem Task worknoted (to assignee)

- **Send When:** Record inserted or updated
- **Table:** [Problem Task](#problem-task-table)
- **Conditions:** `assigned_toISNOTEMPTY^work_notesVALCHANGES^EQ`

| Link                                                                                                                                     | Active |
|------------------------------------------------------------------------------------------------------------------------------------------|--------|
| usmsktrain2 | true   |
| usmskstage2 | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_email_action.do?sys_id=698e836e4a36231200389a57530c9642)     | true   |
| [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_email_action.do?sys_id=698e836e4a36231200389a57530c9642)                  | true   |

### Notification: Problem Task worknoted (unassigned)

- **Send When:** Record inserted or updated
- **Table:** [Problem Task](#problem-task-table)
- **Conditions:** `assigned_toISEMPTY^work_notesVALCHANGES^EQ`

| Link                                                                                                                                     | Active |
|------------------------------------------------------------------------------------------------------------------------------------------|--------|
| usmsktrain2 | true   |
| usmskstage2 | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_email_action.do?sys_id=698d9a274a3623120192184e509c1e31)     | true   |
| [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_email_action.do?sys_id=698d9a274a3623120192184e509c1e31)                  | true   |

### Notification: Problem worknoted (to ITIL)

- **Send When:** Record inserted or updated
- **Table:** [Problem](#problem-table)
- **Conditions:** `work_notesVALCHANGES^EQ`

| Link                                                                                                                                     | Active |
|------------------------------------------------------------------------------------------------------------------------------------------|--------|
| usmsktrain2 | true   |
| usmskstage2 | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_email_action.do?sys_id=6967e1124a36231201a7c8664e06eb81)     | true   |
| [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_email_action.do?sys_id=6967e1124a36231201a7c8664e06eb81)                  | true   |

### Notification: Problem worknoted (unassigned)

- **Send When:** Record inserted or updated
- **Table:** [Problem](#problem-table)
- **Conditions:** `assigned_toISEMPTY^EQ`

| Link                                                                                                                                     | Active |
|------------------------------------------------------------------------------------------------------------------------------------------|--------|
| usmsktrain2 | true   |
| usmskstage2 | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_email_action.do?sys_id=696885974a36231200aa934d04480b49)     | true   |
| [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_email_action.do?sys_id=696885974a36231200aa934d04480b49)                  | true   |

### Notification: Request approval assigned

- **Send When:** [request.approval.inserted](#event-requestapprovalinserted) event is fired
- **Table:** [Request](#request-table)
- **Conditions:** *(none)*

| Link                                                                                                                                     | Active |
|------------------------------------------------------------------------------------------------------------------------------------------|--------|
| usmsktrain2 | true   |
| usmskstage2 | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_email_action.do?sys_id=bb32008477623010f088a0e89e5a9945)     | false  |
| [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_email_action.do?sys_id=bb32008477623010f088a0e89e5a9945)                  | true   |

### Notification: Request Approved *(Mobile UI)*

- **Send When:** Record inserted or updated
- **Table:** [Request](#request-table)
- **Conditions:** `approvalCHANGESTOapproved^EQ`

| Link                                                                                                                                     | Active |
|------------------------------------------------------------------------------------------------------------------------------------------|--------|
| usmsktrain2 | true   |
| usmskstage2 | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_email_action.do?sys_id=a42a7fd8dbe14c104f4cf5fc0f96194d)     | true   |
| PDI: *not found*                                                                                                                         | *n/a*  |

### Notification: Request approved

- **Send When:** Record inserted or updated
- **Table:** [Request](#request-table)
- **Conditions:** `approvalCHANGESTOapproved^universal_requestISEMPTY^EQ`

| Link                                                                                                                                     | Active |
|------------------------------------------------------------------------------------------------------------------------------------------|--------|
| usmsktrain2 | true   |
| usmskstage2 | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_email_action.do?sys_id=d0e27780b4b27050f87755e926c38683)     | false  |
| [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_email_action.do?sys_id=d0e27780b4b27050f87755e926c38683)                  | true   |

### Notification: Request Completed *(Mobile UI)*

- **Send When:** Record inserted or updated
- **Table:** [Request](#request-table)
- **Conditions:** `activeCHANGESTOfalse^EQ`

| Link                                                                                                                                     | Active |
|------------------------------------------------------------------------------------------------------------------------------------------|--------|
| usmsktrain2 | true   |
| usmskstage2 | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_email_action.do?sys_id=2da1e256c6112284000b4c69dab7e993)     | true   |
| PDI: *not found*                                                                                                                         | *n/a*  |

### Notification: Request completed

- **Send When:** Record inserted or updated
- **Table:** [Request](#request-table)
- **Conditions:** `activeCHANGESTOfalse^EQ`

| Link                                                                                                                                     | Active |
|------------------------------------------------------------------------------------------------------------------------------------------|--------|
| usmsktrain2 | true   |
| usmskstage2 | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_email_action.do?sys_id=a3360ac0672630105f74e8a331b73019)     | false  |
| [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_email_action.do?sys_id=a3360ac0672630105f74e8a331b73019)                  | true   |

### Notification: Request Item commented (all assignees)

- **Send When:** [sc_req_item.commented.itil](#event-sc_req_itemcommenteditil) event is fired
- **Table:** [Requested Item](#requested-item-table)
- **Conditions:** `request_stateCHANGESTOclosed_complete^universal_requestISEMPTY^EQ`

| Link                                                                                                                                     | Active |
|------------------------------------------------------------------------------------------------------------------------------------------|--------|
| usmsktrain2 | true   |
| usmskstage2 | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_email_action.do?sys_id=1e2b8ea10a0a3c7401d488fb70f99cda)     | true   |
| [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_email_action.do?sys_id=1e2b8ea10a0a3c7401d488fb70f99cda)                  | true   |

### Notification: Request Completed (multiple RITM)

- **Send When:** Record inserted or updated
- **Table:** [Request](#request-table)
- **Conditions:** `request_stateCHANGESTOclosed_complete^universal_requestISEMPTY^EQ`

| Link                                                                                                                                     | Active |
|------------------------------------------------------------------------------------------------------------------------------------------|--------|
| usmsktrain2 | true   |
| usmskstage2 | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_email_action.do?sys_id=3321ea5b0f5c33001befa68ca8767ed2)     | true   |
| [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_email_action.do?sys_id=3321ea5b0f5c33001befa68ca8767ed2)                  | true   |

### Notification: Request Completed (one RITM)

- **Send When:** Record inserted or updated
- **Table:** [Request](#request-table)
- **Conditions:** `stateCHANGESTO3^EQ`

| Link                                                                                                                                     | Active |
|------------------------------------------------------------------------------------------------------------------------------------------|--------|
| usmsktrain2 | true   |
| usmskstage2 | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_email_action.do?sys_id=f460a61b0f5c33001befa68ca8767e75)     | true   |
| [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_email_action.do?sys_id=f460a61b0f5c33001befa68ca8767e75)                  | true   |

### Notification: Request Item assigned to my group

- **Send When:** Record inserted or updated
- **Table:** [Requested Item](#requested-item-table)
- **Conditions:** `assigned_toISEMPTY^assignment_groupVALCHANGES^assignment_groupISNOTEMPTY^EQ`

| Link                                                                                                                                     | Active |
|------------------------------------------------------------------------------------------------------------------------------------------|--------|
| usmsktrain2 | true   |
| usmskstage2 | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_email_action.do?sys_id=57f848d087a08610246131d70cbb3586)     | true   |
| [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_email_action.do?sys_id=57f848d087a08610246131d70cbb3586)                  | true   |

### Notification: Request Item commented

- **Send When:** Record inserted or updated
- **Table:** [Requested Item](#requested-item-table)
- **Conditions:** `activeCHANGESTOfalse^EQ`

| Link                                                                                                                                     | Active |
|------------------------------------------------------------------------------------------------------------------------------------------|--------|
| usmsktrain2 | true   |
| usmskstage2 | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_email_action.do?sys_id=1e327c680a0a3c74004d7cf30e81f8a4)     | true   |
| PDI: *not found*                                                                                                                         | *n/a*  |

### Notification: Request Item Delivery

- **Send When:** Record inserted or updated
- **Table:** [Requested Item](#requested-item-table)
- **Conditions:** `stage=delivery^EQ`

| Link                                                                                                                                     | Active |
|------------------------------------------------------------------------------------------------------------------------------------------|--------|
| usmsktrain2 | true   |
| usmskstage2 | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_email_action.do?sys_id=704d4cc4c611227d00f60f20d0758ddf)     | true   |
| [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_email_action.do?sys_id=704d4cc4c611227d00f60f20d0758ddf)                  | true   |

### Notification: Request Item Incomplete

- **Send When:** Record inserted or updated
- **Table:** [Requested Item](#requested-item-table)
- **Conditions:** `activeCHANGESTOfalse^EQ`

| Link                                                                                                                                     | Active |
|------------------------------------------------------------------------------------------------------------------------------------------|--------|
| usmsktrain2 | true   |
| usmskstage2 | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_email_action.do?sys_id=e1beb90f1b8c60509a872f41f54bcbad)     | true   |
| PDI: *not found*                                                                                                                         | *n/a*  |

### Notification: Request not Processed

- **Send When:** Record inserted or updated
- **Table:** [Request](#request-table)
- **Conditions:** `request_stateCHANGESTOclosed_incomplete^universal_requestISEMPTY^EQ`

| Link                                                                                                                                     | Active |
|------------------------------------------------------------------------------------------------------------------------------------------|--------|
| usmsktrain2 | true   |
| usmskstage2 | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_email_action.do?sys_id=3349d1ee0fe433001befa68ca8767e37)     | true   |
| [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_email_action.do?sys_id=3349d1ee0fe433001befa68ca8767e37)                  | true   |

### Notification: Request Opened on Behalf

- **Send When:** Record inserted or updated
- **Table:** [Request](#request-table)
- **Conditions:** `requested_forISNOTEMPTY^requested_forVALCHANGES^EQ`

| Link                                                                                                                                     | Active |
|------------------------------------------------------------------------------------------------------------------------------------------|--------|
| usmsktrain2 | true   |
| usmskstage2 | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_email_action.do?sys_id=2f2a8d62c0a8006401ee40a4185140b0)     | true   |
| PDI: *not found*                                                                                                                         | *n/a*  |

### Notification: Request Rejected

- **Send When:** Record inserted or updated
- **Table:** [Request](#request-table)
- **Conditions:** `request_stateCHANGESTOclosed_rejected^universal_requestISEMPTY^EQ`

| Link                                                                                                                                     | Active |
|------------------------------------------------------------------------------------------------------------------------------------------|--------|
| usmsktrain2 | true   |
| usmskstage2 | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_email_action.do?sys_id=2bf1538377223010f088a0e89e5a99fb)     | true   |
| [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_email_action.do?sys_id=2bf1538377223010f088a0e89e5a99fb)                  | true   |

### Notification: Request Rejected *(mobile)*

- **Send When:** Record inserted or updated
- **Table:** [Request](#request-table)
- **Conditions:** `request_stateCHANGESTOclosed_rejected^universal_requestISEMPTY^EQ`

| Link                                                                                                                                     | Active |
|------------------------------------------------------------------------------------------------------------------------------------------|--------|
| usmsktrain2 | true   |
| usmskstage2 | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_email_action.do?sys_id=db07d5ea0fe433001befa68ca8767edc)     | false  |
| [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_email_action.do?sys_id=db07d5ea0fe433001befa68ca8767edc)                  | true   |

### Notification: Request was opened

- **Send When:** Record inserted or updated
- **Table:** [Request](#request-table)
- **Conditions:** `requested_forISNOTEMPTY^requested_forVALCHANGES^universal_requestISEMPTY^EQ`

| Link                                                                                                                                     | Active |
|------------------------------------------------------------------------------------------------------------------------------------------|--------|
| usmsktrain2 | true   |
| usmskstage2 | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_email_action.do?sys_id=0b4ae8c0b462b410f87755e926c386c2)     | false  |
| [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_email_action.do?sys_id=0b4ae8c0b462b410f87755e926c386c2)                  | true   |

### Notification: Requested item approval assigned

- **Send When:** Record inserted or updated
- **Table:** [Approval](#approval-table)
- **Conditions:** `stateCHANGESTOrequested^sysapproval.sys_class_name=sc_req_item^EQ`

| Link                                                                                                                                     | Active |
|------------------------------------------------------------------------------------------------------------------------------------------|--------|
| usmsktrain2 | true   |
| usmskstage2 | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_email_action.do?sys_id=d517b828b4fe7050f87755e926c38615)     | false  |
| PDI: *not found*                                                                                                                         | *n/a*  |

### Notification: Requested Item assigned to me

- **Send When:** Record inserted or updated
- **Table:** [Requested Item](#requested-item-table)
- **Conditions:** `assigned_toVALCHANGES^assigned_toISNOTEMPTY^EQ`

| Link                                                                                                                                     | Active |
|------------------------------------------------------------------------------------------------------------------------------------------|--------|
| usmsktrain2 | true   |
| usmskstage2 | true   |
| [usmskdev2](https://usmskdev2.servicenowservices.com/nav_to.do?uri=sysevent_email_action.do?sys_id=c67b485487a08610246131d70cbb35bc)     | true   |
| [PDI](https://dev203287.service-now.com/nav_to.do?uri=sysevent_email_action.do?sys_id=c67b485487a08610246131d70cbb35bc)                  | true   |
