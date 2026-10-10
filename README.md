# CommonKey Landing Page

The official static landing page and informational portal for [CommonKey](https://commonkeyapp.com) — the independent strata and body corporate governance workspace.

---

## 🌟 Overview & Architecture

This repository hosts the marketing, informational, and resource portal for CommonKey. It is architected as a **pure static Single Page Application (SPA)** with zero server-side dependencies, optimized for extreme performance, security, and global edge delivery via **Firebase Hosting**.

- **Frontend Core:** React 19, TypeScript, Vite 6, Tailwind CSS v4, Motion (Framer Motion), Lucide React.
- **Hosting & CDN:** Google Firebase Hosting with global SSD CDN and automated TLS.
- **CI/CD Pipeline:** GitHub Actions with **Keyless Workload Identity Federation (WIF)** (zero static service account keys).
- **Custom Domains:** `commonkeyapp.com` (apex) and `www.commonkeyapp.com` (automated 301 redirect to apex).

---

## 🚀 Local Development

### Prerequisites
- **Node.js**: v20 or higher (`node -v`)
- **npm**: v10 or higher (`npm -v`)

### Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/karlalukic/common-key-landing.git
   cd common-key-landing
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser. Hot Module Replacement (HMR) is enabled.

4. **Verify all checks before pushing:**
   ```bash
   npm run verify
   ```
   Runs TypeScript type checking, 140+ unit/component tests, dependency security audit, and production build in one single command.

> 📖 **Complete Step-by-Step Guide:** See **[docs/DEVELOPER_WORKFLOW.md](docs/DEVELOPER_WORKFLOW.md)** for our full development lifecycle, TDD workflow, pre-push checklist, CI/CD monitoring, and rollback strategies.

---

## 🧪 Testing & Quality Assurance

The codebase includes an extensive automated test suite powered by **Vitest** and **React Testing Library** covering smoke tests, brand navigation, interactive pricing calculators, FAQ accordions, and article renderers.

| Command | Description |
| :--- | :--- |
| `npm run verify` | **Primary Pre-Push Check:** Runs lint, all 140+ Vitest tests, audit, and build in one shot. |
| `npm test` | Runs the full Vitest suite (140+ unit/component tests across 6 suites). |
| `npm run test:watch` | Runs tests in interactive watch mode for TDD. |
| `npm run lint` | Runs TypeScript compiler checks (`tsc --noEmit`) with zero error tolerance. |
| `npm audit --audit-level=high` | Scans all dependencies for high or critical security vulnerabilities. |
| `npm run build` | Compiles optimized static production assets into `dist/`. |
| `npm run preview` | Spins up a local server serving the compiled `dist/` production assets. |

---

## ☁️ Infrastructure & Security

### Google Cloud & Firebase Setup
- **GCP Project ID:** `commonkey-landing-2a4a2d`
- **GCP Project Number:** `421092939194`
- **Default Site URL:** [https://commonkey-landing-2a4a2d.web.app](https://commonkey-landing-2a4a2d.web.app)
- **Primary Domain:** [https://commonkeyapp.com](https://commonkeyapp.com)
- **Redirect Domain:** [https://www.commonkeyapp.com](https://www.commonkeyapp.com)

### Security Headers
Configured directly in [`firebase.json`](firebase.json) and enforced at edge:
- `Strict-Transport-Security: max-age=31556926; includeSubDomains; preload`
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`

### Keyless GitHub Actions CI/CD (Workload Identity Federation)
The project adheres to Google Cloud zero-trust security best practices: **no long-lived JSON service account keys exist**. Authentication is performed via short-lived OIDC tokens exchanged between GitHub and Google Cloud STS.

- **Workload Identity Pool:** `github-actions-pool`
- **Workload Identity Provider:** `github-actions-provider`
- **OIDC Provider URL:** `https://token.actions.githubusercontent.com`
- **Attribute Mapping:** `google.subject=assertion.sub`, `attribute.repository=assertion.repository`
- **Attribute Condition:** `assertion.repository == 'karlalukic/common-key-landing'`
- **Deployer Service Account:** `github-deployer@commonkey-landing-2a4a2d.iam.gserviceaccount.com`
- **Assigned IAM Roles:**
  - `roles/firebasehosting.admin`
  - `roles/serviceusage.serviceUsageViewer`
  - `roles/iam.workloadIdentityUser`

#### Required GitHub Secrets (Repository Settings):
1. `GCP_PROJECT_ID`: `commonkey-landing-2a4a2d`
2. `WIF_PROVIDER`: `projects/421092939194/locations/global/workloadIdentityPools/github-actions-pool/providers/github-actions-provider`
3. `WIF_SERVICE_ACCOUNT`: `github-deployer@commonkey-landing-2a4a2d.iam.gserviceaccount.com`

---

## 📁 Project Structure

```text
common-key-landing/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Dual-stage CI/CD: Quality Verification + Keyless WIF Deployment
├── docs/
│   ├── ARCHITECTURE.md         # Technical architecture & deployment flow
│   ├── DEVELOPER_WORKFLOW.md   # Step-by-step development, testing, release & rollback guide
│   └── DNS_SETUP.md            # Namecheap custom domain & DNS configuration reference
├── public/
│   ├── favicon.svg             # CommonKey brand favicon
│   ├── robots.txt              # Search crawler directives
│   └── sitemap.xml             # Search engine sitemap
├── scripts/
│   └── setup-gcp-wif.sh        # Idempotent GCP project, IAM & WIF provisioning script
├── src/
│   ├── components/             # React UI components (Navigation, Hero, Articles, Pricing, etc.)
│   ├── data/                   # Educational articles, FAQ data, and constants
│   ├── test/                   # Vitest configuration and setup
│   ├── App.tsx                 # Root application component
│   └── main.tsx                # Client-side React 19 entry point
├── .firebaserc                 # Firebase CLI active project mapping
├── firebase.json               # Firebase Hosting routing rules and security caching headers
├── package.json                # Project dependencies, test overrides, and npm scripts
├── tsconfig.json               # TypeScript strict configuration
└── vite.config.ts              # Vite bundling, Tailwind CSS, and Vitest configuration
```

---

## 🌐 Custom Domain & DNS

For details on configuring and verifying Namecheap DNS records (A, TXT, CNAME) and automatic SSL certificate provisioning, see **[docs/DNS_SETUP.md](docs/DNS_SETUP.md)**.
