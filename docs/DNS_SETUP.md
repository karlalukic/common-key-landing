# CommonKey Custom Domain & DNS Setup Guide (`commonkeyapp.com`)

This guide outlines the step-by-step procedure for configuring custom domain routing, SSL certificate provisioning, and automatic `www` ➔ apex redirection for **`commonkeyapp.com`** using Firebase Hosting and Namecheap DNS.

---

## 1. Project & Current Status Summary

- **Firebase Project ID**: `commonkey-landing-2a4a2d`
- **Default Site URL**: `https://commonkey-landing-2a4a2d.web.app` (Live & Serving with 200 OK)
- **Apex Domain**: `commonkeyapp.com` (Registered in Firebase Hosting)
- **Subdomain**: `www.commonkeyapp.com` (Configured to 301/302 redirect to `commonkeyapp.com`)

---

## 2. Namecheap DNS Host Records Table

In your **[Namecheap Dashboard](https://ap.www.namecheap.com/)** ➔ **Domain List** ➔ `commonkeyapp.com` ➔ **Advanced DNS**, update your **Host Records** to match:

| Type | Host | Value / Target | TTL | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **A Record** | `@` | `199.36.158.100` | Automatic (or 1 min) | Primary Firebase Hosting IP |
| **TXT Record** | `@` | `hosting-site=commonkey-landing-2a4a2d` | Automatic (or 1 min) | Firebase Site Ownership Verification |
| **TXT Record** | `@` | `google-site-verification=BTb4a4NpVWRjyzcmQ9soUQryrdNj_PpKjZq5YLe9dxM` | Automatic | Google Workspace / Search Console |
| **CNAME Record** | `www` | `commonkey-landing-2a4a2d.web.app.` | Automatic (or 1 min) | Redirect `www` to Firebase Site |

> **Note on Existing Records:** Remove any outdated `216.239.*` A records or legacy CNAME pointing to `commonkeyapp.com` in Namecheap to prevent ACME SSL certificate issuance conflicts.

---

## 3. Propagation & Verification

Once you click **Save** in Firebase Console:

1. **DNS Detection**: Firebase will detect the existing `www` CNAME record in Namecheap (typically within 1–5 minutes).
2. **Status Changes in Firebase Console**:
   - `Needs setup` ➔ `Pending verification` ➔ `Provisioning certificate` ➔ `Connected`.
3. **SSL Certificate Provisioning**:
   - Google automatically issues and binds the TLS certificate for `www.commonkeyapp.com`.
   - This process typically takes **15 to 30 minutes** (occasionally up to 24 hours).
4. **Verification Commands**:
   You can verify from your terminal once provisioned:
   ```bash
   # Check redirect headers (should return HTTP 301 or 302 to https://commonkeyapp.com/)
   curl -sI https://www.commonkeyapp.com

   # Check SSL certificate details
   curl -Iv https://www.commonkeyapp.com
   ```
