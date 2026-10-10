#!/usr/bin/env bash
# ==============================================================================
# Setup Google Cloud Project, Firebase Hosting & GitHub Actions WIF
# ==============================================================================
# This script idempotently provisions:
# 1. Dedicated Google Cloud Project & links Billing Account
# 2. Enables Firebase & IAM APIs
# 3. Dedicated Service Account for GitHub Actions deployment
# 4. Keyless Workload Identity Federation (WIF) Pool & Provider
# 5. Restricts IAM token exchange strictly to your GitHub repository
# ==============================================================================

set -euo pipefail

# Default configuration values
DEFAULT_REPO="karlalukic/common-key-landing"
POOL_ID="github-actions-pool"
PROVIDER_ID="github-actions-provider"
SA_NAME="github-deployer"
SA_DISPLAY_NAME="GitHub Actions Firebase Deployer"

# State variables
PROJECT_ID=""
BILLING_ACCOUNT_ID=""
GITHUB_REPO="${DEFAULT_REPO}"
DRY_RUN=false

show_help() {
  cat << EOF
Usage: $(basename "$0") [OPTIONS]

Options:
  -p, --project-id <ID>        GCP Project ID (default: generates commonkey-landing-<random>)
  -b, --billing-account <ID>   GCP Billing Account ID (auto-detected if omitted)
  -r, --repo <OWNER/REPO>      GitHub repository path (default: ${DEFAULT_REPO})
  -d, --dry-run                Print actions without making changes
  -h, --help                   Display this help message

Examples:
  $(basename "$0") --dry-run
  $(basename "$0") --project-id commonkey-landing-prod --repo karlalukic/common-key-landing
EOF
}

# Parse CLI arguments
while [[ $# -gt 0 ]]; do
  case "$1" in
    -p|--project-id)
      PROJECT_ID="$2"
      shift 2
      ;;
    -b|--billing-account)
      BILLING_ACCOUNT_ID="$2"
      shift 2
      ;;
    -r|--repo)
      GITHUB_REPO="$2"
      shift 2
      ;;
    -d|--dry-run)
      DRY_RUN=true
      shift
      ;;
    -h|--help)
      show_help
      exit 0
      ;;
    *)
      echo "Error: Unknown argument: $1" >&2
      show_help
      exit 1
      ;;
  esac
done

# Helper function to execute or simulate commands
run_cmd() {
  if [ "$DRY_RUN" = true ]; then
    echo "[DRY-RUN] $*"
  else
    echo "+ $*"
    "$@"
  fi
}

echo "================================================================="
echo " CommonKey Landing Page — GCP & Firebase WIF Setup"
echo "================================================================="

# Check prerequisites
if ! command -v gcloud &> /dev/null; then
  echo "Error: 'gcloud' CLI is required but not installed." >&2
  exit 1
fi

if ! command -v firebase &> /dev/null; then
  echo "Error: 'firebase' CLI is required but not installed." >&2
  exit 1
fi

# Determine Project ID if not supplied
if [ -z "$PROJECT_ID" ]; then
  RANDOM_HEX=$(head -c 3 /dev/urandom | xxd -p 2>/dev/null || od -N 3 -tx1 -An /dev/urandom | tr -d ' ' || echo "web")
  PROJECT_ID="commonkey-landing-${RANDOM_HEX}"
fi

echo "Target GCP Project ID: ${PROJECT_ID}"
echo "Target GitHub Repo:    ${GITHUB_REPO}"

# Check or detect Billing Account ID
if [ -z "$BILLING_ACCOUNT_ID" ] && [ "$DRY_RUN" = false ]; then
  echo "Detecting active GCP Billing Account..."
  BILLING_ACCOUNT_ID=$(gcloud billing accounts list --filter="open=true" --format="value(name)" 2>/dev/null | head -n 1 || true)
  if [ -z "$BILLING_ACCOUNT_ID" ]; then
    echo "Warning: Could not automatically detect an open billing account."
    echo "You may need to link billing manually: gcloud billing projects link ${PROJECT_ID} --billing-account=<ACCOUNT_ID>"
  else
    echo "Detected Billing Account: ${BILLING_ACCOUNT_ID}"
  fi
fi

# 1. Create or verify Project
if [ "$DRY_RUN" = false ]; then
  if gcloud projects describe "$PROJECT_ID" &>/dev/null; then
    echo "Project '${PROJECT_ID}' already exists. Using existing project."
  else
    echo "Creating GCP project '${PROJECT_ID}'..."
    run_cmd gcloud projects create "$PROJECT_ID" --name="CommonKey Landing Page"
  fi
else
  run_cmd gcloud projects create "$PROJECT_ID" --name="CommonKey Landing Page"
fi

# 2. Link Billing
if [ -n "$BILLING_ACCOUNT_ID" ]; then
  run_cmd gcloud billing projects link "$PROJECT_ID" --billing-account="$BILLING_ACCOUNT_ID"
fi

# 3. Enable Required APIs
echo "Enabling required Google Cloud APIs..."
APIS=(
  "firebase.googleapis.com"
  "firebasehosting.googleapis.com"
  "iam.googleapis.com"
  "cloudresourcemanager.googleapis.com"
  "sts.googleapis.com"
  "iamcredentials.googleapis.com"
)

for api in "${APIS[@]}"; do
  run_cmd gcloud services enable "$api" --project="$PROJECT_ID"
done

# 4. Add Firebase to GCP project
echo "Adding Firebase resources to project..."
run_cmd firebase projects:addfirebase "$PROJECT_ID" 2>/dev/null || true

# 5. Create Service Account for GitHub Actions
SA_EMAIL="${SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"
echo "Configuring deployment Service Account: ${SA_EMAIL}..."

if [ "$DRY_RUN" = false ]; then
  if ! gcloud iam service-accounts describe "$SA_EMAIL" --project="$PROJECT_ID" &>/dev/null; then
    run_cmd gcloud iam service-accounts create "$SA_NAME" \
      --project="$PROJECT_ID" \
      --display-name="$SA_DISPLAY_NAME"
  fi
else
  run_cmd gcloud iam service-accounts create "$SA_NAME" \
    --project="$PROJECT_ID" \
    --display-name="$SA_DISPLAY_NAME"
fi

# 6. Grant Firebase Admin Role & Service Usage Viewer
echo "Granting Firebase Hosting Admin and Service Usage Viewer roles to Service Account..."
run_cmd gcloud projects add-iam-policy-binding "$PROJECT_ID" \
  --member="serviceAccount:${SA_EMAIL}" \
  --role="roles/firebasehosting.admin" \
  --condition=None
run_cmd gcloud projects add-iam-policy-binding "$PROJECT_ID" \
  --member="serviceAccount:${SA_EMAIL}" \
  --role="roles/serviceusage.serviceUsageViewer" \
  --condition=None

# 7. Get Project Number
PROJECT_NUMBER="<PROJECT_NUMBER>"
if [ "$DRY_RUN" = false ]; then
  PROJECT_NUMBER=$(gcloud projects describe "$PROJECT_ID" --format="value(projectNumber)")
fi

# 8. Create Workload Identity Pool
echo "Configuring Workload Identity Pool..."
if [ "$DRY_RUN" = false ]; then
  if ! gcloud iam workload-identity-pools describe "$POOL_ID" --project="$PROJECT_ID" --location="global" &>/dev/null; then
    run_cmd gcloud iam workload-identity-pools create "$POOL_ID" \
      --project="$PROJECT_ID" \
      --location="global" \
      --display-name="GitHub Actions Pool"
  fi
else
  run_cmd gcloud iam workload-identity-pools create "$POOL_ID" \
    --project="$PROJECT_ID" \
    --location="global" \
    --display-name="GitHub Actions Pool"
fi

# 9. Create Workload Identity Provider
echo "Configuring Workload Identity Provider for GitHub OIDC..."
if [ "$DRY_RUN" = false ]; then
  if ! gcloud iam workload-identity-pools providers describe "$PROVIDER_ID" --project="$PROJECT_ID" --location="global" --workload-identity-pool="$POOL_ID" &>/dev/null; then
    run_cmd gcloud iam workload-identity-pools providers create-oidc "$PROVIDER_ID" \
      --project="$PROJECT_ID" \
      --location="global" \
      --workload-identity-pool="$POOL_ID" \
      --issuer-uri="https://token.actions.githubusercontent.com" \
      --attribute-mapping="google.subject=assertion.sub,attribute.actor=assertion.actor,attribute.repository=assertion.repository,attribute.ref=assertion.ref" \
      --display-name="GitHub Actions OIDC Provider"
  fi
else
  run_cmd gcloud iam workload-identity-pools providers create-oidc "$PROVIDER_ID" \
    --project="$PROJECT_ID" \
    --location="global" \
    --workload-identity-pool="$POOL_ID" \
    --issuer-uri="https://token.actions.githubusercontent.com" \
    --attribute-mapping="google.subject=assertion.sub,attribute.actor=assertion.actor,attribute.repository=assertion.repository,attribute.ref=assertion.ref" \
    --display-name="GitHub Actions OIDC Provider"
fi

# 10. Bind Workload Identity User to Service Account
echo "Binding Workload Identity User to Service Account (restricted to ${GITHUB_REPO})..."
WIF_PRINCIPAL="principalSet://iam.googleapis.com/projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/${POOL_ID}/attribute.repository/${GITHUB_REPO}"

run_cmd gcloud iam service-accounts add-iam-policy-binding "$SA_EMAIL" \
  --project="$PROJECT_ID" \
  --role="roles/iam.workloadIdentityUser" \
  --member="${WIF_PRINCIPAL}"

WIF_PROVIDER_NAME="projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/${POOL_ID}/providers/${PROVIDER_ID}"

echo ""
echo "================================================================="
echo " Provisioning Configuration Completed Successfully!"
echo "================================================================="
echo ""
echo "Configure the following GitHub Actions Secrets / Variables:"
echo "Repository: https://github.com/${GITHUB_REPO}/settings/secrets/actions"
echo ""
echo "Secret Name / Variable Name:         Value:"
echo "-----------------------------------  -------------------------------------------------"
echo "GCP_PROJECT_ID                       ${PROJECT_ID}"
echo "WIF_PROVIDER                         ${WIF_PROVIDER_NAME}"
echo "WIF_SERVICE_ACCOUNT                  ${SA_EMAIL}"
echo ""
echo "================================================================="
