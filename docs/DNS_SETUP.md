# CommonKey Custom Domain & DNS Setup Guide (`commonkeyapp.com`)

This guide outlines the step-by-step procedure for configuring custom domain routing, SSL certificate provisioning, and automatic `www` ➔ apex redirection for **`commonkeyapp.com`** using Firebase Hosting and Namecheap DNS.

---

## 1. Current Status Summary

| Host | Type | Target / Value | Current Live Status |
| :--- | :--- | :--- | :--- |
| `commonkeyapp.com` (Apex) | `A` | `216.239.32.21`<br>`216.239.34.21`<br>`216.239.36.21`<br>`216.239.38.21` | **Active & Live** (Serving CommonKey landing page with valid TLS) |
| `commonkeyapp.com` (Apex) | `TXT` | `google-site-verification=BTb4a4...` | **Verified** |
| `www.commonkeyapp.com` | `CNAME` | `commonkeyapp.com.` | **Action Required**: Needs to be registered as a Redirect Domain in Firebase Console to trigger SSL certificate provisioning |

---

## 2. Step-by-Step Configuration

### Step A: Configure the `www` Redirect in Firebase Console

1. Navigate to the **[Firebase Console](https://console.firebase.google.com/)**.
2. Select your Firebase project hosting the landing page.
3. In the left navigation sidebar, go to **Build** ➔ **Hosting** (or click **Hosting** under Project Overview).
4. Under the **Custom domains** table (where `commonkeyapp.com` is listed as *Connected*), click **Add custom domain**.
5. In the **Domain** field, enter:
   ```text
   www.commonkeyapp.com
   ```
6. **Important**: Select the checkbox:
   - **"Redirect www.commonkeyapp.com to an existing website"**
7. In the dropdown, choose:
   ```text
   commonkeyapp.com
   ```
8. Click **Save** / **Continue**.

Firebase will now register the domain redirect and automatically request an SSL certificate from Let's Encrypt / Google Trust Services for `www.commonkeyapp.com`.

---

### Step B: Verify Namecheap DNS Records

1. Log into your **[Namecheap Dashboard](https://ap.www.namecheap.com/)**.
2. Go to **Domain List** ➔ locate `commonkeyapp.com` ➔ click **Manage**.
3. Under the **Nameservers** section, verify that **Namecheap BasicDNS** or **Namecheap WebHosting DNS** is selected.
4. Click on the **Advanced DNS** tab.
5. In the **Host Records** section, ensure your records match the following:

| Type | Host | Value / Target | TTL | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **A Record** | `@` | `216.239.32.21` | Automatic | Google Edge IP |
| **A Record** | `@` | `216.239.34.21` | Automatic | Google Edge IP |
| **A Record** | `@` | `216.239.36.21` | Automatic | Google Edge IP |
| **A Record** | `@` | `216.239.38.21` | Automatic | Google Edge IP |
| **TXT Record** | `@` | `google-site-verification=BTb4a4NpVWRjyzcmQ9soUQryrdNj_PpKjZq5YLe9dxM` | Automatic | Domain ownership verification |
| **CNAME Record** | `www` | `commonkeyapp.com.` | Automatic | Points www to apex (or use A records if instructed by Firebase Console) |

> **Note on CNAME:** If Namecheap requires an unpunctuated domain, enter `commonkeyapp.com` without the trailing dot. If Firebase Console presents specific `A` records (such as `199.36.158.100`) for `www`, replace the CNAME with those A records.

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
