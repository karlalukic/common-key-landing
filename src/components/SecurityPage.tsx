import React, { useState } from 'react';
import {
  ArrowLeft,
  ShieldCheck,
  Lock,
  Share2,
  Check,
  FileText,
  Printer,
  Mail,
  Building2
} from 'lucide-react';

interface SecurityPageProps {
  onGoHome: () => void;
}

export interface SecurityItem {
  label: string;
  body: string;
}

export interface SecuritySection {
  id: string;
  number: string;
  title: string;
  intro?: string;
  items?: SecurityItem[];
}

export const SECURITY_METADATA = {
  title: 'Security & Data Ownership',
  canonicalUrl: 'https://commonkeyapp.com/security',
  headline: 'Your Building’s History Belongs to Your Building—Period.',
  subheadline:
    'How CommonKey protects your Body Corporate’s operational records, institutional memory, and Australian data sovereignty.',
  operatorNote:
    'CommonKey is operated by Mykrolabs Pty Ltd (ACN 655 532 086 / ABN 23 655 532 086), registered in Queensland, Australia.'
};

export const SECURITY_SECTIONS: SecuritySection[] = [
  {
    id: 'security-section-1',
    number: '1',
    title: '100% Customer & Scheme Data Sovereignty',
    intro:
      'Across Australia, many strata schemes pay annual software surcharges only to discover their records are locked inside a strata management agency’s proprietary database. If the committee changes managers, portal access is cut off and handover fees apply.',
    items: [
      {
        label: 'Flexible, Direct Licensing:',
        body: 'CommonKey can be licensed directly by your Body Corporate / Owners Corporation, or started immediately by an individual Chairperson, Secretary, Treasurer, or lot owner who wants to get their building’s records organized without waiting on agency bureaucracy.'
      },
      {
        label: 'Full Ownership:',
        body: 'You and your Scheme own 100% of all uploaded files, Building DNA asset registers, compliance records, vendor histories, meeting ballots, and activity logs at all times.'
      },
      {
        label: 'Zero-Penalty Exports:',
        body: 'You can generate or request complete exports of your workspace data whenever you choose—with zero exit fees, zero document finalisation tolls, and zero lock-in.'
      }
    ]
  },
  {
    id: 'security-section-2',
    number: '2',
    title: 'Australian Primary Data Residency & Enterprise Cloud Security',
    items: [
      {
        label: 'Australian Primary Storage (australia-southeast1):',
        body: 'Your workspace’s primary database (Google Cloud Firestore) and document vault (Google Cloud Storage) are hosted in Sydney, Australia (australia-southeast1) on enterprise-grade Google Cloud Platform infrastructure, supporting local Australian data sovereignty and low-latency access.'
      },
      {
        label: 'Encryption in Transit & at Rest:',
        body: 'All documents, floor plans, and database records are encrypted in transit via TLS/HTTPS (enforced with HTTP Strict Transport Security) and encrypted at rest using AES-256 encryption. Binary document downloads are protected via Uniform Bucket-Level Access and brokered exclusively through short-lived, cryptographically signed Google Cloud V4 Signed URLs (expiring after 1 hour) with zero public internet bucket exposure.'
      },
      {
        label: 'Strict Multi-Tenant & Role-Fenced AI Isolation:',
        body: 'CommonKey is architected as a zero-trust, multi-tenant workspace partitioned at the property level. Your building’s documents and Gemini-powered AI Research Hub operate inside a strict tenant-fenced Retrieval-Augmented Generation (RAG) sandbox—meaning your data is isolated to your property, respects each user’s role permissions, cannot be accessed by other schemes, and is never used to train public or cross-tenant AI models.'
      }
    ]
  },
  {
    id: 'security-section-3',
    number: '3',
    title: 'Granular Role-Based Access & Verified Authentication',
    intro:
      'Consumer shared drives (like basic cloud folders) often fail committees because files get accidentally deleted, confidential legal advice is exposed to the wrong audience, or permissions break when volunteers rotate. CommonKey enforces structured governance boundaries on the backend:',
    items: [
      {
        label: '6 Property Roles + Dedicated Support Provisioning:',
        body: 'Property administrators (Committee Members and Strata Managers) control view, read, and edit visibility across six purpose-built property roles: Committee Member (Chair, Secretary, Treasurer), Strata Manager, On-Site Caretaker, Lot Owner (including Corporate/Trust Primary Nominees), Resident / Tenant, and Real Estate Agent. Platform Superuser access is restricted exclusively to authorised CommonKey personnel to provision properties and provide technical support when requested.'
      },
      {
        label: 'Role Preview Auditing:',
        body: 'Committee members and administrators can safely simulate lower-privilege views (such as Owner or Tenant visibility) in real time to verify that sensitive contractor quotes or confidential defect reports remain restricted.'
      },
      {
        label: 'Verified-Email Invitation Claiming:',
        body: 'Workspace invitations are strictly bound to the invitee’s verified email address and enforced via server-side RBAC guards and Firestore security rules—ensuring only authenticated, verified members can claim their assigned lot and role permissions.'
      },
      {
        label: 'Modern Sign-In:',
        body: 'Users authenticate via Google Single Sign-On or verified email credentials powered by Google Firebase Authentication (with optional Apple Sign-In support).'
      }
    ]
  },
  {
    id: 'security-section-4',
    number: '4',
    title: 'Append-Only Activity Log & Audit Readiness',
    intro:
      'Every workspace sign-in, invitation claim, document upload, project update, motion or quote vote, compliance status change, and vendor modification is automatically recorded in an append-only Activity Log with user identity, role, and timestamp metadata. Additionally, motion ballots are processed using atomic ACID database transactions to prevent double-voting. This gives your committee a continuous, transparent audit trail to demonstrate reasonable decision-making and satisfy statutory record inspection requests.'
  },
  {
    id: 'security-section-5',
    number: '5',
    title: 'Continuous Backups & Zero-Trust Infrastructure',
    items: [
      {
        label: 'Point-in-Time Recovery (PITR) & Object Versioning:',
        body: 'Production databases are protected by 7-day continuous Point-in-Time Recovery (PITR), and Cloud Storage document vaults maintain automated object versioning so critical building records are resilient against accidental overwrite or hardware failure.'
      },
      {
        label: 'Keyless Deployment Security:',
        body: 'CommonKey’s deployment pipelines use Google Cloud Workload Identity Federation (WIF) with zero long-lived service account keys, alongside automated static analysis and container vulnerability scanning (govulncheck, npm audit, and Trivy).'
      }
    ]
  },
  {
    id: 'security-section-6',
    number: '6',
    title: 'PCI-DSS Level 1 Payment Security',
    intro:
      'CommonKey processes all subscription payments through Stripe. Sensitive credit card numbers and bank credentials never touch CommonKey servers.'
  }
];

export default function SecurityPage({ onGoHome }: SecurityPageProps) {
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(SECURITY_METADATA.canonicalUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const scrollToSection = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="py-12 sm:py-16 bg-[#F8FAFC]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mb-8 flex-wrap">
          <button
            onClick={onGoHome}
            className="hover:text-slate-900 transition-colors cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-slate-900 font-medium">
            {SECURITY_METADATA.title}
          </span>
        </nav>

        {/* Action Bar */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
          <button
            onClick={onGoHome}
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900 transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors shadow-2xs cursor-pointer"
              title="Print Security & Data Ownership"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>Print</span>
            </button>
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors shadow-2xs cursor-pointer"
              title="Copy link to Security & Data Ownership"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Link copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-slate-500" />
                  <span>Copy URL</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Document Header */}
        <header className="mb-10 bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-xs">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-50 border border-blue-200/80 text-blue-800 text-xs font-bold tracking-wider uppercase mb-4">
            <Lock className="w-3.5 h-3.5 text-blue-600" />
            <span>{SECURITY_METADATA.title}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight mb-4">
            {SECURITY_METADATA.headline}
          </h1>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
            {SECURITY_METADATA.subheadline}
          </p>

          <div className="flex items-start gap-2.5 pt-4 border-t border-slate-100 text-xs sm:text-sm text-slate-600">
            <FileText className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-900">URL:</span>{' '}
              <a
                href={SECURITY_METADATA.canonicalUrl}
                className="text-blue-700 hover:underline break-all"
              >
                {SECURITY_METADATA.canonicalUrl}
              </a>
            </div>
          </div>
        </header>

        {/* Quick Section Index */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 mb-10 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider mb-4">
            <ShieldCheck className="w-4 h-4" />
            <span>Architecture & Governance Controls</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-2.5 text-xs sm:text-sm">
            {SECURITY_SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="text-left text-slate-300 hover:text-white py-1.5 px-2.5 rounded-lg hover:bg-slate-800/80 transition-colors flex items-baseline gap-2 cursor-pointer"
              >
                <span className="font-bold text-blue-400 shrink-0">{section.number}.</span>
                <span>{section.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Security & Data Ownership Sections */}
        <article className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-10 shadow-xs space-y-10 mb-10">
          {SECURITY_SECTIONS.map((section, idx) => (
            <section
              key={section.id}
              id={section.id}
              className={idx > 0 ? 'pt-8 border-t border-slate-200' : ''}
            >
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 tracking-tight mb-4">
                {section.number}. {section.title}
              </h2>

              {section.intro && (
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-5">
                  {section.intro}
                </p>
              )}

              {section.items && section.items.length > 0 && (
                <div className="space-y-4">
                  {section.items.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      className="text-slate-700 text-sm sm:text-base leading-relaxed pl-4 border-l-2 border-blue-200"
                    >
                      <p>
                        <strong className="font-bold text-slate-950">
                          {item.label}
                        </strong>{' '}
                        {item.body}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}
        </article>

        {/* Due Diligence & Contact Footer Banner */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md space-y-3">
          <h3 className="text-lg sm:text-xl font-bold text-white">
            Questions about security, vendor due diligence, or onboarding your scheme?
          </h3>
          <p className="text-slate-300 text-sm sm:text-base flex items-center gap-2 flex-wrap">
            <Mail className="w-4 h-4 text-blue-400 shrink-0" />
            <span>
              Contact our founder Karla Lukic directly at{' '}
              <a
                href="mailto:info@commonkeyapp.com"
                className="text-blue-400 hover:text-blue-300 underline font-semibold"
              >
                info@commonkeyapp.com
              </a>
              .
            </span>
          </p>
          <p className="text-xs sm:text-sm text-slate-400 pt-2 border-t border-slate-800 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-slate-500 shrink-0" />
            <span>{SECURITY_METADATA.operatorNote}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
