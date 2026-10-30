import React, { useState } from 'react';
import {
  ArrowLeft,
  ShieldCheck,
  Lock,
  Calendar,
  Building2,
  Share2,
  Check,
  FileText,
  Printer,
  Mail,
  MapPin
} from 'lucide-react';

interface PrivacyPolicyPageProps {
  onGoHome: () => void;
}

export interface PrivacyItem {
  label: string;
  body: string;
}

export interface PrivacySection {
  id: string;
  number: string;
  title: string;
  intro?: string;
  items?: PrivacyItem[];
}

export const PRIVACY_METADATA = {
  title: 'Privacy Policy',
  canonicalUrl: 'https://commonkeyapp.com/privacy',
  effectiveDate: 'October 27, 2026',
  lead: 'Mykrolabs Pty Ltd (ACN 655 532 086 / ABN 23 655 532 086) trading as CommonKey ("CommonKey", "we", "us", "our") is committed to protecting the privacy of Australian strata communities. Even where small-business exemptions may apply under Australian law, we voluntarily align our data handling practices with the Privacy Act 1988 (Cth) and the Australian Privacy Principles (APPs) as our baseline standard of care.'
};

export const PRIVACY_SECTIONS: PrivacySection[] = [
  {
    id: 'privacy-section-1',
    number: '1',
    title: 'Personal Information We Collect & How We Collect It',
    intro:
      'To provide our governance and continuity workspace to Australian Bodies Corporate, Strata Schemes, Owners Corporations, and individual committee members or lot owners, we collect only the information necessary for building administration, statutory compliance, and security:',
    items: [
      {
        label: 'Account & Authentication Data:',
        body: 'Names, email addresses, email verification status, property role designations (Committee Member [including Chairperson, Secretary, Treasurer], Strata Manager, On-Site Caretaker, Lot Owner, Resident / Tenant, and Real Estate Agent), and authentication identifiers (UID) when you sign in via Google Single Sign-On, verified email credentials through Firebase Authentication, or Apple Sign-In (where enabled).'
      },
      {
        label: 'Scheme, Occupancy & Directory Records:',
        body: 'Lot/unit numbers, unit entitlements, owner and tenant contact directories (names, emails, phone numbers), corporate or trust ownership entity names, statutory Primary Nominee designations, pet registration records (including pet descriptions, supporting documents, and committee ballot records), and property governance records uploaded to the workspace.'
      },
      {
        label: 'Contractor & Vendor Records:',
        body: 'Business names, contact person details (names, roles, emails, phone numbers), ABNs/ACNs, trade licence details (including publicly sourced Queensland Building and Construction Commission [QBCC] licence verification records), public liability insurance certificates, quotes, and committee quote votes entered into the Vendors, Projects, and Compliance modules.'
      },
      {
        label: 'Audit & Activity Logs:',
        body: 'To maintain a transparent, append-only governance trail for the workspace, the platform automatically logs workspace mutations and governance actions—including user sign-ins, invitation claims, document uploads and edits, project status updates, motion and quote vote submissions, and compliance updates—alongside user identifiers, roles, and timestamps. Underlying cloud infrastructure logs also capture request metadata (such as IP addresses and user-agent strings) for security, rate-limiting, and intrusion prevention.'
      },
      {
        label: 'Billing Metadata:',
        body: 'Payer name, billing email, property/scheme details, lot count, and transaction history processed via Stripe. We do not collect or store raw credit card numbers or bank account credentials on CommonKey servers.'
      },
      {
        label: 'How Information Enters a Workspace:',
        body: 'We collect personal information directly from you when you register, claim a workspace invitation, sign in, or interact with a workspace. Information may also be uploaded into a private workspace by a subscribing committee member, lot owner, or Strata Manager (for example, when uploading meeting minutes, contact directories, or compliance records). Under our Terms of Service, the customer who creates and manages a workspace is responsible for the records they choose to store and share within their private workspace.'
      }
    ]
  },
  {
    id: 'privacy-section-2',
    number: '2',
    title: 'How We Use Information (And Our AI Privacy Guarantee)',
    intro: 'We use personal information strictly to:',
    items: [
      {
        label: '',
        body: 'Operate, maintain, and secure your workspace, enforce role-based access control (RBAC) boundaries, verify email-bound workspace invitations, and send transactional notifications (such as system alerts and compliance expiry reminders).'
      },
      {
        label: '',
        body: 'Index your uploaded documents and operational records so authorised users in your workspace can generate executive summaries and run instant, role-fenced searches within your private Document Vault and AI Research Hub.'
      },
      {
        label: 'Strict AI Privacy Commitment:',
        body: 'Your workspace documents, meeting minutes, AI research threads, and personal data are strictly isolated to your multi-tenant workspace (and further filtered by user role so sensitive committee or vendor records are not exposed to unauthorized roles). We never sell your data, and we never use your private documents or personal information to train or fine-tune any foundational, third-party, or cross-tenant artificial intelligence models.'
      }
    ]
  },
  {
    id: 'privacy-section-3',
    number: '3',
    title: 'Cloud Data Sovereignty, Sub-Processors & Cross-Border Disclosure (APP 8)',
    intro:
      'CommonKey prioritises Australian data residency for your building’s primary operational archives while utilizing trusted global infrastructure providers to deliver enterprise-grade reliability and security. In accordance with Australian Privacy Principle 8 (APP 8), we disclose how and where data is stored and processed:',
    items: [
      {
        label: 'Primary Application, Database & Document Storage — Google Cloud Platform (Sydney, Australia):',
        body: 'Your workspace’s primary Cloud Firestore database records, Google Cloud Storage binary documents (commonkey-docs), and Cloud Run backend services are hosted in Google Cloud’s Sydney, Australia (australia-southeast1) region, encrypted both in transit (TLS 1.3/HTTPS) and at rest (AES-256).'
      },
      {
        label: 'Google Firebase Authentication & Google Gemini Enterprise AI APIs (Australia / United States):',
        body: 'Facilitates secure identity verification, Google OAuth single sign-on, Firebase Hosting global edge delivery, and enterprise Gemini AI document summarization and fenced Retrieval-Augmented Generation (RAG) APIs, which may process data across Google Cloud infrastructure in Australia and the United States.'
      },
      {
        label: 'Stripe (Australia / United States):',
        body: 'Processes subscription payments, tax invoicing, and PCI-DSS Level 1 fraud prevention.'
      },
      {
        label: 'Transactional Email & Notification Providers (Australia / United States):',
        body: 'Delivers password resets, workspace invitation notices, and automated compliance reminders (via Firebase Auth email services and/or transactional email sub-processors such as SendGrid / Twilio).'
      },
      {
        label: 'ImageKit (Global CDN / United States):',
        body: 'Delivers optimised static marketing and interface media assets.'
      }
    ]
  },
  {
    id: 'privacy-section-4',
    number: '4',
    title: 'Statutory Strata Record Inspections, Access Rights & Retention',
    items: [
      {
        label: 'Individual Account Access & Correction:',
        body: 'You may update your personal profile details at any time within your account settings or contact us at info@commonkeyapp.com to request access to or correction of personal information we hold about your individual user account.'
      },
      {
        label: 'Records Uploaded by a Customer / Workspace Administrator:',
        body: 'Where personal information is contained inside documents or directories uploaded to a private workspace by a Customer (such as meeting minutes, lot directories, or governance records), CommonKey acts solely as the cloud hosting provider for that Customer. CommonKey cannot unilaterally edit a Customer’s uploaded documents or disclose private workspace records to third parties; we will refer any request to inspect or amend workspace records to the relevant workspace administrator, Committee, or Strata Manager.'
      },
      {
        label: 'Statutory Strata Inspections:',
        body: 'Please note that statutory requests by lot owners, prospective buyers, or mortgagees to inspect official Body Corporate or Owners Corporation records under state legislation (such as Section 205 of the BCCM Act 1997 (QLD), Section 182 of the Strata Schemes Management Act 2015 (NSW), or Section 146 of the Owners Corporations Act 2006 (VIC)) must be directed to the Scheme’s Committee or licensed Strata Manager, not to CommonKey.'
      },
      {
        label: 'Data Retention & Deletion:',
        body: 'We retain Workspace Data for the duration of an active subscription. Following subscription cancellation, workspaces remain available for zero-cost data export for a reasonable window (typically 60 days) before permanent deletion from our active servers, with encrypted system backups rotating out automatically thereafter.'
      }
    ]
  },
  {
    id: 'privacy-section-5',
    number: '5',
    title: 'Contact & Privacy Inquiries',
    intro:
      'If you have questions about this Privacy Policy, wish to request access to or correction of your account information, or wish to raise a privacy concern, please contact:'
  }
];

export default function PrivacyPolicyPage({ onGoHome }: PrivacyPolicyPageProps) {
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(PRIVACY_METADATA.canonicalUrl);
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
            {PRIVACY_METADATA.title}
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
              title="Print Privacy Policy"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>Print</span>
            </button>
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors shadow-2xs cursor-pointer"
              title="Copy link to Privacy Policy"
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-bold tracking-wider uppercase mb-4">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>Data Protection & Privacy</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight mb-4">
            {PRIVACY_METADATA.title}
          </h1>

          <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-6">
            {PRIVACY_METADATA.lead}
          </p>

          <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs sm:text-sm text-slate-600">
            <div className="flex items-start gap-2.5">
              <Calendar className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-900">Effective Date:</span>{' '}
                <span>{PRIVACY_METADATA.effectiveDate}</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <FileText className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-900">URL:</span>{' '}
                <a
                  href={PRIVACY_METADATA.canonicalUrl}
                  className="text-blue-700 hover:underline break-all"
                >
                  {PRIVACY_METADATA.canonicalUrl}
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Quick Section Index */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 mb-10 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider mb-4">
            <ShieldCheck className="w-4 h-4" />
            <span>Contents Overview</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-2.5 text-xs sm:text-sm">
            {PRIVACY_SECTIONS.map((section) => (
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

        {/* Privacy Policy Sections */}
        <article className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-10 shadow-xs space-y-10">
          {PRIVACY_SECTIONS.map((section, idx) => (
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
                        {item.label ? (
                          <>
                            <strong className="font-bold text-slate-950">
                              {item.label}
                            </strong>{' '}
                            {item.body}
                          </>
                        ) : (
                          item.body
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Section 5 Contact Card & OAIC Notice */}
              {section.number === '5' && (
                <div className="space-y-5 mt-4">
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 sm:p-6 space-y-2.5 text-sm sm:text-base text-slate-700">
                    <div className="flex items-center gap-2 font-bold text-slate-950">
                      <Building2 className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>Privacy Officer — CommonKey (Mykrolabs Pty Ltd, ABN 23 655 532 086)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>
                        <strong className="font-semibold text-slate-900">Email:</strong>{' '}
                        <a
                          href="mailto:info@commonkeyapp.com"
                          className="text-blue-700 hover:underline font-medium"
                        >
                          info@commonkeyapp.com
                        </a>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>
                        <strong className="font-semibold text-slate-900">Location:</strong>{' '}
                        Brisbane, Queensland, Australia
                      </span>
                    </div>
                  </div>

                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                    We take all privacy inquiries seriously and aim to acknowledge and resolve any complaint within a reasonable timeframe (typically within 30 days). If you are unsatisfied with our response, you may contact the Office of the Australian Information Commissioner (OAIC) at{' '}
                    <a
                      href="https://www.oaic.gov.au"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 hover:underline font-semibold"
                    >
                      www.oaic.gov.au
                    </a>
                    .
                  </p>
                </div>
              )}
            </section>
          ))}
        </article>
      </div>
    </div>
  );
}
