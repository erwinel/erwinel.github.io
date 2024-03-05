# PIV Logins for Internet-facing Instances

## Self Registration for users

1. Open browser page to the ServicNow instance.
2. Select your PIV certificate and click `OK`.

   ![Image of Certificate selection dialog](./Images/SelectUserCertificate.png)
3. Log into instance using username and password. Do not use `Log in with PIV/CAC card` button, yet.

   ![Image of login form](./Images/LoginForm.png)
4. Click on the Profile link from User dropdown menu in the upper-right corner.

   ![Image of User Profile dropdown](./Images//UserProfileMenuOption.png)
5. Click the "Register client certificate" link toward the bottom

   ![Image of Register client certificate link](./Images//RegisterClientCertificateLink.png)

## Manually Add User Certificate

1. Obtain and open the target user's "Authentication" PIV certificate.
2. In the target ServiceNow instance, navigate to `Certificated Based Authentication` => `CA Certificate Chain`.
   a. Verify that the `Valid from` and `Expires` matches the `Valid from` and `Valid to` dates in each of the issuing certificates in the user's certificate chain. If they don't match, you will need to add them. See [Add Issuer Certificate](#add-issuer-certificate) for details.
3. Export user certificate as "Base-64 encoded X.509".
4. Change the file extension to `.pem`.
5. In the target ServiceNow instance, navigate to `Certificated Based Authentication` => `User to Certificates Mapping`, and click `New`.
   1. In the "Name" and "Short Description" fields, you can simply enter the user's first and last name.
   2. Select the target user for the "User" field.
   3. Attach the '.pem' file.
      - Use the paperclip icon, versus Drag-and-drop; otherwise, you may get an error message.
   4. The `Notify on expiration` field is optional.

## Add Issuer Certificate

If the certificate chain for a user doesn't exist in ServiceNow's certificate store, you will need to add the missing certificates.

Some users may have certificates with the same canonical name, but will have a different thumbprint, and will usually have a different expiration date as well. In this case, you will need to upload the newer certificate. You should **not** delete any existing certificates that have the same canonical name unless you are absolutely sure that nobody's PIV has that in their certificate chain.

1. Export certificate as "Base-64 encoded X.509".
2. Change file extension to `.pem`.
3. In the target ServiceNow instance, navigate to `Certificated Based Authentication` => `CA Certificate Chain` and click `New`.
   1. For the "Name" and "Short Description" fields, you can use the `CN` component of the certificate Subject.
      - If there are multiple certificates with the same subject name, you can append the expiration date.
   2. For the "Type" field, select `CA Cert` if this is the root certificate in the user's certificate chain;
   otherwise, select `Intermediate Cert`.
   3. Attach the '.pem' file.
      - Use the paperclip icon, versus Drag-and-drop; otherwise, you may get an error message.
   4. The `Notify on expiration` field is optional.
