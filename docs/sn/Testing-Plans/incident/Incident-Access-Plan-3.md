# Incident Access Testing Plan #3

Access and visibility tests for ITIL user.

## Steps

1. [Impersonate](../Impersonation.md) user "Service Minion".
2. Click on `All` at the top of the page and verify that the following items appear under `Self Service`:
   - Service Catalog
   - Knowledge
   - Incidents
   - Watched Incidents
3. Navigate to `All` ⇒ `Self Service` ⇒ `Service Catalog`.
4. Verify that the `Can We Help You?` item exists.
5. Open the `Can We Help You?` item.
6. Verify that the `Create Incident` item exists.
7. Navigate to `All` ⇒ `Self Service` ⇒ `Incidents`.
8. Verify that the `New` button exists at the top of the incident listing.
9. Navigate to `All` ⇒ `Self Service` ⇒ `Knowledge`.
10. Verify that the following Knowledge Bases are visible:
    - Team Knowledge
    - IT
    - Using ServiceNow
11. Verify that the `Software Development` Knowledge Base is **not** visible.
