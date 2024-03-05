# Incident Access Testing Plan #2

Access and visibility tests for VIP user with no group memberships.

## Steps

1. [Impersonate](../Impersonation.md) user "Victor Paramount".
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
10. Verify that the `IT` Knowledge Base is visible.
11. Verify that the following Knowledge Bases are **not** visible:
    - Team Knowledge
    - Software Development
