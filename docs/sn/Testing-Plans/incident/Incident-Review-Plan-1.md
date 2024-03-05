# Incident Review Testing Plan #1

Review and close a resolved incident for a non-VIP user with no group memberships.

## Steps

1. [Impersonate](../Impersonation.md) user "Stake Holder".
2. Submit an incident with the urgency **not** set to `1 - High`, making note of the `INC` number.
3. [Impersonate](../Impersonation.md) user "Hunter Pickering".
4. Open the incident that was just submitted.
5. Click the `Resolve` button at the top of the form.
   - You should see a warning stating that mandatory fields are not filled in.
6. Select the `Resolution Information` tab and fill in the following fields:
   - Knowledge: Unchecked
   - Resolution Code: Any of the *"Solved"* options.
   - Resolved by: `Hunter Pickering`
   - Resolved: Select today's date/time.
   - Resolution Notes: Any arbitrary text.
7. Click the `Resolve` button at the top of the form.
8. [Impersonate](../Impersonation.md) user "Service Minion".
9. Open the incident that was just resolved.
10. Verify that the following fields are read-only:
    - Number
    - Priority
    - Resolution information tab:
       - Resolved by
       - Resolved
11. At the top of the form, click the `Close incident` button.
12. Verify that the following fields are read-only:
    - Number
    - Caller
    - Category
    - State
    - Impact
    - Urgency
    - Priority
    - Assignment Group
    - Assigned to
    - Configuration item
    - Short description
    - All fields in the Resolution information tab
13. End impersonation.
14. Navigate to `All` ⇒ `System Logs` ⇒ `Emails`.
15. Open the entry with `stake.holder@example.com` as the recipient with the subject, indicating that the incident has been closed.
16. Toward the bottom, under `Related Links`, click the `Preview Email` link and review the text for accuracy.
