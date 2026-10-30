import React, { useState } from 'react';
import {
  ArrowLeft,
  ShieldCheck,
  Scale,
  Calendar,
  Building2,
  Share2,
  Check,
  FileText,
  Printer
} from 'lucide-react';

interface TermsOfServicePageProps {
  onGoHome: () => void;
}

export interface TermsClause {
  number: string;
  title: string;
  body: string;
  subItems?: {
    label: string;
    title: string;
    body: string;
  }[];
  footerNote?: string;
}

export interface TermsSection {
  id: string;
  number: string;
  title: string;
  clauses: TermsClause[];
}

export const TERMS_METADATA = {
  title: 'Terms of Service',
  canonicalUrl: 'https://commonkeyapp.com/terms',
  effectiveDate: 'October 27, 2026',
  provider:
    'Mykrolabs Pty Ltd (ACN 655 532 086 / ABN 23 655 532 086) trading as CommonKey ("CommonKey", "we", "us", "our"), located in Brisbane, Queensland, Australia.'
};

export const TERMS_SECTIONS: TermsSection[] = [
  {
    id: 'section-1',
    number: '1',
    title: 'Agreement, Individual vs. Scheme Use & Customer Ownership',
    clauses: [
      {
        number: '1.1',
        title: 'Who Can Use CommonKey:',
        body: 'CommonKey is a governance, productivity, and continuity workspace designed for Australian Strata Schemes, Bodies Corporate, Community Titles Schemes, and Owners Corporations (each, a "Scheme"), as well as the individual committee members, lot owners, caretakers, and managers who participate in them. You may register and use a CommonKey workspace in either of two ways:',
        subItems: [
          {
            label: '(a)',
            title: 'Individual / Personal Productivity Use:',
            body: 'An individual committee member, Chairperson, Secretary, Treasurer, lot owner, caretaker, or manager may subscribe to and use CommonKey in their personal capacity as an independent productivity and record-organization tool for a property they are involved with; or'
          },
          {
            label: '(b)',
            title: 'Official Scheme Use:',
            body: 'A workspace may be registered on behalf of, paid for by, reimbursed by, or formally adopted by an incorporated Scheme (whether directly by its Committee or via an appointed Strata Manager).'
          }
        ],
        footerNote:
          '(In these Terms, "Customer" or "you" refers to the subscribing individual or the incorporated Scheme, as applicable).'
      },
      {
        number: '1.2',
        title: 'No Duty on CommonKey to Police Strata Authority:',
        body: 'CommonKey is a software provider and has no obligation to verify or police internal strata resolutions, by-laws, or committee authority when a user creates a workspace. If you register a workspace on behalf of a Scheme, you confirm that you have the authority to do so (or are otherwise responsible for the subscription in your personal capacity until adopted or reimbursed by the Scheme). Where a subscription is paid for or reimbursed by a Scheme’s funds, the workspace and its data belong to the Scheme itself rather than any single individual.'
      },
      {
        number: '1.3',
        title: 'End-User Acceptance:',
        body: 'Every individual who accesses a workspace across CommonKey’s property role hierarchy—including Committee Members (Chairperson, Secretary, Treasurer), Strata Managers, On-Site Caretakers/Building Managers, Lot Owners (including Corporate or Trust Primary Nominees), Residents/Tenants, and Real Estate/Property Manager Agents—agrees to comply with these Terms and the Acceptable Use rules below.'
      }
    ]
  },
  {
    id: 'section-2',
    number: '2',
    title: 'Scope of Services & Important Disclaimers',
    clauses: [
      {
        number: '2.1',
        title: 'Independent Governance Workspace (Not a Strata Manager):',
        body: 'CommonKey provides digital tools for document storage, project and vendor quote tracking, meeting and ballot governance, building asset registration ("Building DNA"), standard operating procedures (SOPs), resident handbooks, and compliance deadline tracking. CommonKey does not replace a licensed strata management agency, nor does it provide trust accounting, levy invoicing, legal advice, engineering advice, or financial services.'
      },
      {
        number: '2.2',
        title: 'Non-Delegable Statutory & Compliance Duties:',
        body: 'While CommonKey’s Automated Statutory Compliance Engine provides visual tracking and reminders for statutory obligations (such as Annual Fire Safety Statements / Form 30 Occupier’s Statements, Essential Safety Measures, Lift Plant Registrations, Asbestos & WHS Audits, Insurance Valuations, and Pool Safety Certificates), the legal and financial responsibility for maintaining common property, verifying the accuracy of all workspace records and renewal dates (whether entered by you, extracted by AI, or imported with our assistance), and meeting statutory deadlines under state and territory legislation—including the Body Corporate and Community Management Act 1997 (QLD), the Building Units and Group Titles Act 1980 (QLD), the Strata Schemes Management Act 2015 (NSW), the Owners Corporations Act 2006 (VIC), the Strata Titles Act 1985 (WA), and equivalent legislation across Australia—rests strictly with the Scheme, its Committee, and its owners. CommonKey is not liable for missed inspections, contractor defaults, regulatory fines, or insurance invalidations. Similarly, any contractor licence metadata displayed from public registers (such as the Queensland Building and Construction Commission (QBCC) Open Data register) is provided as an informational snapshot only; you must independently verify that a contractor holds current, appropriate licensing and insurance before engaging them for works.'
      },
      {
        number: '2.3',
        title: 'AI Search, Fenced RAG & Triage Disclaimer:',
        body: 'CommonKey utilizes generative artificial intelligence (powered by Google Gemini enterprise APIs operating within a tenant-fenced Retrieval-Augmented Generation pipeline) to generate executive document summaries, provide citation-backed conversational search across your workspace archives, and surface priority alerts. AI-generated summaries, citations, answers, and triage alerts are provided on an "as-is" informational basis only, do not constitute legal advice, and may occasionally contain inaccuracies or omissions. Users and Committees must always verify primary source documents (such as registered by-laws, Community Management Statements, engineering reports, insurance policy schedules, or warranties) before executing contracts, conducting formal votes, enforcing by-laws, or expending funds.'
      }
    ]
  },
  {
    id: 'section-3',
    number: '3',
    title: 'Data Sovereignty, Ownership & Portability',
    clauses: [
      {
        number: '3.1',
        title: '100% Customer Data Ownership:',
        body: 'You (or your Scheme, where the workspace is held on behalf of a Scheme) retain 100% ownership and intellectual property rights over all documents, floor plans, meeting minutes, motion voting tallies, contractor quotes, Building DNA asset records, SOPs, resident guides, occupancy and pet registers, and activity logs uploaded to or generated within the workspace ("Workspace Data" or "Scheme Data").'
      },
      {
        number: '3.2',
        title: 'Limited Licence to Host:',
        body: 'You grant CommonKey a limited, non-exclusive licence to host, index, generate tenant-isolated AI summaries and embeddings for, back up, and process Workspace Data solely to provide, secure, and support the workspace. CommonKey never sells your data and never uses your private documents or personal information to train or fine-tune any foundational, third-party, or cross-tenant artificial intelligence models.'
      },
      {
        number: '3.3',
        title: 'Zero-Penalty Data Export & Record Custody:',
        body: 'Unlike agency-owned portals that terminate access or charge document finalisation fees upon manager turnover, you can generate or request complete exports of your Workspace Data at any time at zero additional cost. Following subscription cancellation, CommonKey will provide a reasonable post-cancellation window (typically 60 days) to export your records upon request before permanent deletion from active servers. Because state strata legislation requires Bodies Corporate and Owners Corporations to retain official strata records for prescribed statutory periods (typically 6 to 7 years, or indefinitely for registered plans and by-laws), the Customer is solely responsible for exporting and maintaining its own statutory archives.'
      }
    ]
  },
  {
    id: 'section-4',
    number: '4',
    title: 'Account Administration & Committee Handovers',
    clauses: [
      {
        number: '4.1',
        title: 'Role-Based Access & Sensitive Records:',
        body: 'Property workspace administrators (authorised Committee Members and Strata Managers) control user invitations and role permissions across CommonKey’s property roles (Committee Member, Strata Manager, On-Site Caretaker, Lot Owner, Resident / Tenant, and Real Estate Agent). Designated CommonKey support personnel retain platform-level administrative access solely to provision new properties, maintain system security, and provide customer support when requested. The Customer and its workspace administrators are solely responsible for configuring appropriate role-based visibility restrictions on sensitive, confidential, or legally privileged documents (such as legal advice regarding building defect litigation, insurance disputes, or tribunal proceedings) to prevent unintended disclosure to other users.'
      },
      {
        number: '4.2',
        title: 'AGM Transitions & Discretionary Handover Assistance:',
        body: 'Day-to-day administrative control of a property workspace is managed by its authorised Committee Members and/or Strata Manager. Where a workspace is owned or funded by a Scheme and an outgoing Chairperson or Committee administrator steps down, sells their lot, or is unavailable following an Annual General Meeting (AGM) or Extraordinary General Meeting (EGM), CommonKey may, at its sole discretion, assist in updating workspace administrator access for newly elected office bearers upon receiving reasonable evidence of their appointment (such as official meeting minutes or confirmation from the Scheme’s Strata Manager). However, CommonKey is a software provider—not an adjudicator of strata disputes—and has no obligation to investigate, mediate, or resolve internal committee disputes, contested elections, or competing claims to a workspace. In the event of a dispute, CommonKey may leave existing workspace permissions unchanged (or temporarily pause administrative changes) until the parties provide a mutually agreed instruction or a binding order from the relevant state tribunal, court, or commissioner.'
      }
    ]
  },
  {
    id: 'section-5',
    number: '5',
    title: 'Acceptable Use & Customer Content',
    clauses: [
      {
        number: '5.1',
        title: 'User Responsibilities:',
        body: 'Users must authenticate using their own authorised credentials (via Google Single Sign-On, verified email credentials through Firebase Authentication, or Apple Sign-In where enabled) and must not share login tokens, attempt to bypass role-based visibility restrictions, or upload malicious files.'
      },
      {
        number: '5.2',
        title: 'Your Responsibility for Uploaded Content:',
        body: 'Whether you use CommonKey personally as an individual committee member/owner or on behalf of a Scheme, you are solely responsible for the documents, strata rolls, contact directories, and contractor details you choose to upload or invite into your workspace. You warrant that you have lawful access to the records you upload, and you agree to indemnify CommonKey against third-party claims arising from unlawful, infringing, or defamatory user-uploaded content, or from your unauthorised sharing of records with third parties, except to the extent caused by CommonKey’s breach of these Terms.'
      }
    ]
  },
  {
    id: 'section-6',
    number: '6',
    title: 'Subscriptions, Stripe Billing & Renewals',
    clauses: [
      {
        number: '6.1',
        title: 'Pricing & GST:',
        body: 'Subscription fees are quoted in Australian Dollars (AUD) and are payable annually in advance in accordance with the pricing plan, lot-tier rate, quote, or tax invoice presented to you at the time of subscription or checkout. Unless stated otherwise, quoted fees are exclusive of 10% Goods and Services Tax (GST).'
      },
      {
        number: '6.2',
        title: 'Payment Processing:',
        body: 'Payments are processed securely via Stripe (by credit/debit card or direct bank transfer / tax invoice where enabled). CommonKey does not collect or store raw credit card numbers.'
      },
      {
        number: '6.3',
        title: 'Renewals & Price Increases:',
        body: 'Subscriptions renew automatically on an annual basis unless cancelled prior to the renewal date. CommonKey reserves the right to increase or adjust subscription fees (or transition a subscription from an introductory or promotional rate to our then-current standard rate) effective at the start of any annual renewal term. We will send written notice of any renewal price increase in advance (typically at least 30 days prior to the renewal date) so you have the opportunity to cancel your subscription before the new rate takes effect.'
      },
      {
        number: '6.4',
        title: 'Failed Payments & Continuity Protection:',
        body: 'Because committee members and payment cards rotate, CommonKey will not abruptly delete a workspace’s institutional memory due to an expired card. If a renewal charge fails, CommonKey will notify the workspace’s designated contact(s) and provide a reasonable grace period (typically 30 days) to update billing details before placing the workspace into read-only mode. If a workspace remains unpaid for an extended period in read-only mode (typically 60 days after entering read-only mode), CommonKey may treat the subscription as cancelled and archive or delete the workspace following the post-cancellation export window in Clause 3.3.'
      },
      {
        number: '6.5',
        title: 'Cancellations & Australian Consumer Law:',
        body: 'You may cancel a subscription at any time prior to the next annual renewal date. While pre-paid annual fees are non-refundable for change of mind mid-term, nothing in these Terms excludes, restricts, or modifies any consumer guarantee, right, or remedy conferred by the Australian Consumer Law (Schedule 2 to the Competition and Consumer Act 2010 (Cth)) that cannot be excluded by law.'
      }
    ]
  },
  {
    id: 'section-7',
    number: '7',
    title: 'Limitation of Liability & Governing Law',
    clauses: [
      {
        number: '7.1',
        title: 'Liability Cap & Australian Consumer Law (Section 64A):',
        body: 'To the maximum extent permitted by law, the services are provided on an "as-is" and "as-available" basis, CommonKey’s aggregate liability for all claims arising out of or related to this Agreement will not exceed the total subscription fees paid by the Customer to CommonKey in the twelve (12) months preceding the claim, and neither party is liable for indirect, consequential, or special damages. Where the Australian Consumer Law applies and permits CommonKey to limit its liability for a failure to comply with a statutory consumer guarantee in respect of services not of a kind ordinarily acquired for personal, domestic, or household use (under Section 64A of the Australian Consumer Law), CommonKey limits its liability to (at CommonKey’s election) supplying the services again or paying the cost of having the services supplied again.'
      },
      {
        number: '7.2',
        title: 'Governing Law:',
        body: 'These Terms are governed by the laws of the State of Queensland and the Commonwealth of Australia, and the parties submit to the non-exclusive jurisdiction of the courts of Queensland.'
      }
    ]
  }
];

export default function TermsOfServicePage({ onGoHome }: TermsOfServicePageProps) {
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(TERMS_METADATA.canonicalUrl);
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
            {TERMS_METADATA.title}
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
              title="Print Terms of Service"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>Print</span>
            </button>
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors shadow-2xs cursor-pointer"
              title="Copy link to Terms of Service"
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
            <Scale className="w-3.5 h-3.5 text-blue-600" />
            <span>Legal Agreement</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight mb-6">
            {TERMS_METADATA.title}
          </h1>

          <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs sm:text-sm text-slate-600">
            <div className="flex items-start gap-2.5">
              <Calendar className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-900">Effective Date:</span>{' '}
                <span>{TERMS_METADATA.effectiveDate}</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <FileText className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-900">URL:</span>{' '}
                <a
                  href={TERMS_METADATA.canonicalUrl}
                  className="text-blue-700 hover:underline break-all"
                >
                  {TERMS_METADATA.canonicalUrl}
                </a>
              </div>
            </div>

            <div className="sm:col-span-2 flex items-start gap-2.5 pt-2 border-t border-slate-100">
              <Building2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-900">Provider:</span>{' '}
                <span>{TERMS_METADATA.provider}</span>
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
            {TERMS_SECTIONS.map((section) => (
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

        {/* Legal Sections */}
        <article className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-10 shadow-xs space-y-10">
          {TERMS_SECTIONS.map((section, idx) => (
            <section
              key={section.id}
              id={section.id}
              className={idx > 0 ? 'pt-8 border-t border-slate-200' : ''}
            >
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 tracking-tight mb-6">
                {section.number}. {section.title}
              </h2>

              <div className="space-y-6">
                {section.clauses.map((clause) => (
                  <div key={clause.number} className="space-y-3 text-slate-700 text-sm sm:text-base leading-relaxed">
                    <p>
                      <strong className="font-bold text-slate-950">
                        {clause.number} {clause.title}
                      </strong>{' '}
                      {clause.body}
                    </p>

                    {clause.subItems && clause.subItems.length > 0 && (
                      <div className="pl-4 sm:pl-6 space-y-3 border-l-2 border-blue-200 my-3">
                        {clause.subItems.map((item) => (
                          <p key={item.label} className="text-slate-700">
                            <strong className="font-bold text-slate-900">
                              {item.label} {item.title}
                            </strong>{' '}
                            {item.body}
                          </p>
                        ))}
                      </div>
                    )}

                    {clause.footerNote && (
                      <p className="text-slate-600 italic text-sm">
                        {clause.footerNote}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </article>
      </div>
    </div>
  );
}
