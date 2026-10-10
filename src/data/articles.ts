export interface Article {
  id: string;
  slug: string;
  title: string;
  teaser: string; // Engaging article teaser displayed on index and card views
  summary?: string; // Fallback description
  tags: string[]; // Multiple individual tags (e.g. ['Strata Fees', 'Schedule B', 'Contracts', 'Procurement'])
  category?: string; // Optional legacy compatibility
  readTime: string;
  publishedAt: string;
  publishDate?: string; // ISO string (e.g. '2026-09-07T14:30' or '2026-08-15')
  status?: 'published' | 'scheduled';
  scheduledFor?: string; // ISO timestamp string if scheduled in the future
  author?: {
    name?: string;
    role?: string;
  };
  featured?: boolean;
  content: {
    lead?: string;
    keyTakeaways?: string[];
    sections: {
      heading?: string;
      paragraphs: string[];
      highlight?: string;
    }[];
    checklistTitle?: string;
    checklist?: string[];
  };
}

export const ARTICLES: Article[] = [
  {
    id: 'software-surcharges-vs-data-sovereignty-are-you-renting-your-own-records',
    slug: 'software-surcharges-vs-data-sovereignty-are-you-renting-your-own-records',
    title: 'Software Surcharges vs. Data Sovereignty: Are You Renting Your Own Records?',
    teaser: 'Across the Australian strata sector, bodies corporate routinely pay pass-through software and storage fees without securing ownership of their data. Here is why agency data lock-in creates switching barriers, and how direct data sovereignty protects committees.',
    summary: 'Across the Australian strata sector, bodies corporate routinely pay pass-through software and storage fees without securing ownership of their data. Here is why agency data lock-in creates switching barriers, and how direct data sovereignty protects committees.',
    tags: ['Data Sovereignty', 'Software Fees', 'Strata Software', 'Governance', 'Contracts'],
    readTime: '3 min read',
    publishedAt: '26 August 2026',
    publishDate: '2026-08-26T09:00:00.000Z',
    status: 'published',
    featured: true,
    content: {
      sections: [
        {
          paragraphs: [
            'Across the Australian strata sector, an uncomfortable pattern exists: bodies corporate regularly fund software platforms without securing legal ownership or continuity of the underlying data. Standard contracts reveal that schemes are routinely billed pass-through technology fees of $25 to $40 per lot each year for enterprise systems, alongside recurring electronic storage fees that run between $200 and $400+ annually.',
            'Despite paying these subscriptions, the scheme enjoys none of the actual data sovereignty:\n\n* Traditional strata software is built for agency trust accounting, bulk levy invoicing, and portfolio management—not long-term building stewardship.\n* If the body corporate votes to change management agencies, access to that portal is terminated immediately.\n* Handing over records often triggers account closure fees ($300+) and document finalisation charges ($250+ or $5/lot). The resulting handover is typically an unstructured dump of unindexed PDFs, severing years of active maintenance context, contractor conversations, and warranty trails.',
            'Policy submissions by the Owners Corporation Network (OCN Australia) have repeatedly highlighted that data lock-in undermines consumer choice and market competition, an issue echoed in broader platform reviews by the Australian Competition and Consumer Commission (ACCC). Schemes hesitate to leave underperforming management agencies because they fear the operational chaos of losing their digital records.'
          ]
        },
        {
          heading: 'How CommonKey Solves This:',
          paragraphs: [
            'CommonKey guarantees 100% data sovereignty for the body corporate. The platform is licensed directly to the scheme, decoupling the property\'s operational history from the external managing agent. Vendor contacts, project management histories, and compliance timelines remain intact with the property regardless of which agency manages the portfolio.'
          ]
        },
        {
          heading: 'The sources:',
          paragraphs: [
            '* Owners Corporation Network (OCN Australia) Policy Submissions\n* [https://www.accc.gov.au/about-us/publications/serial-publications/digital-platform-services-inquiry-2020-25-reports](https://www.accc.gov.au/about-us/publications/serial-publications/digital-platform-services-inquiry-2020-25-reports)\n* NSW Fair Trading McGrathNicol Strata Review'
          ]
        }
      ]
    }
  },
  {
    id: 'document-search-fee-statutory-access-rights-vs-proprietary-gatekeepers',
    slug: 'document-search-fee-statutory-access-rights-vs-proprietary-gatekeepers',
    title: 'The Document Search Fee: Statutory Access Rights vs. Proprietary Gatekeepers',
    teaser: 'Under Australian property law, lot owners have clear statutory rights to inspect scheme records. Here is why proprietary agency databases monetise access through billable archive fees, and how self-serve Knowledge Vaults restore instant, cost-free records access.',
    summary: 'Under Australian property law, lot owners have clear statutory rights to inspect scheme records. Here is why proprietary agency databases monetise access through billable archive fees, and how self-serve Knowledge Vaults restore instant, cost-free records access.',
    tags: ['Records Access', 'Statutory Rights', 'Legislation', 'Knowledge Vault', 'Governance'],
    readTime: '3 min read',
    publishedAt: '19 August 2026',
    publishDate: '2026-08-19T09:00:00.000Z',
    status: 'published',
    content: {
      sections: [
        {
          paragraphs: [
            'Under Australian property law, lot owners and elected committees have a clear legal right to inspect the operational records of their own scheme. Both Section 205 of Queensland\'s Body Corporate and Community Management Act 1997 and Section 182 of the NSW Strata Schemes Management Act 2015 entitle owners to inspect books, records, minutes, and contracts upon written request and payment of a modest statutory search fee.',
            'In practice, however, accessing historical building data often comes with commercial hurdles. Because records are typically hosted inside an agency’s proprietary database, retrieving past documentation frequently triggers "archive retrieval" fees. When a committee needs to inspect a five-year-old membrane warranty, past engineering calculations, or prior tender documents, the agency bills the scheme for the time administrative staff spend searching internal folders. Practice guidelines from the Queensland BCCM Commissioner\'s Office clarify access rules, yet proprietary systems continue to monetise basic record retrieval.',
            'This creates an unnecessary financial barrier:\n\n* Committees often avoid investigating past defect history or contractor pricing simply to protect their administrative budget from hourly fees.\n* Sinking fund forecasts get prepared without ready access to historical invoices, leading to inaccurate reserve estimates.\n* Volunteer owners are forced to make decisions without complete visibility over past contractor negotiations.'
          ]
        },
        {
          heading: 'How CommonKey Solves This:',
          paragraphs: [
            'CommonKey establishes a permanent, self-serve Knowledge Vault owned directly by the body corporate. Every past contract, by-law amendment, building defect report, and maintenance invoice is indexed for instant access. Committee members can retrieve historical engineering files or contractor warranties in seconds at zero extra cost, removing billable gatekeepers from their own data.'
          ]
        },
        {
          heading: 'The Receipts:',
          paragraphs: [
            '* The Queensland Statute: [https://www.legislation.qld.gov.au/view/whole/html/current/act-1997-028](https://www.legislation.qld.gov.au/view/whole/html/current/act-1997-028)\n* The NSW Statute: [https://legislation.nsw.gov.au/view/html/inforce/current/act-2015-050](https://legislation.nsw.gov.au/view/html/inforce/current/act-2015-050)\n* Regulator Directives: [https://www.qld.gov.au/housing/body-corporate/disputes/dispute-services/practice-directions](https://www.qld.gov.au/housing/body-corporate/disputes/dispute-services/practice-directions)'
          ]
        }
      ]
    }
  },
  {
    id: 'schedule-b-trap-base-strata-fee-doubles',
    slug: 'schedule-b-trap-base-strata-fee-doubles',
    title: 'The "Schedule B" Trap: Why Your Base Strata Fee Quietly Doubles',
    teaser: 'How standard body corporate contracts use auxiliary Schedule B schedules—metering trade quotes, work orders, and committee emails—to quietly double base management costs, and how independent procurement restores committee control.',
    summary: 'How standard body corporate contracts use auxiliary Schedule B schedules—metering trade quotes, work orders, and committee emails—to quietly double base management costs, and how independent procurement restores committee control.',
    tags: ['Strata Fees', 'Schedule B', 'Contracts', 'Procurement', 'Governance'],
    readTime: '4 min read',
    publishedAt: '12 August 2026',
    publishDate: '2026-08-12T09:00:00.000Z',
    status: 'published',
    content: {
      sections: [
        {
          paragraphs: [
            'On paper, a body corporate administration agreement looks tidy and predictable. The headline secretarial fee sits at an advertised rate of around $5,500 a year, fitting neatly into the administrative fund budget approved at your Annual General Meeting (AGM). But as many volunteer treasurers eventually discover, that base fee is often just an entry ticket. The real financial drain happens through auxiliary schedules—routinely titled "Schedule B" or "Additional Services" in standard Strata Community Association (SCA) agreements—that monetise everyday building operations through transactional micro-fees.',
            'While some boutique agencies style this section as a "Schedule of Additional Charges" or "Disbursement Schedule", the underlying economic model across the industry is largely identical. The scale of this auxiliary billing structure was exposed in an independent examination into strata management practices conducted by McGrathNicol for NSW Fair Trading and highlighted nationally on ABC News\' Four Corners: The Strata Trap. Traditional agreements systematically structure remuneration around billable administrative add-ons:',
            '* Requesting a single trade quote from a contractor costs around $90 ex GST.\n* Issuing a standard maintenance work order tacks on another $90 ex GST (escalating to $180 for pest control or specialised inspections).\n* Clarifying scopes, liaising with trades, or handling extra committee correspondence starts an hourly meter running between $177 and $300 per hour.\n* Routine office disbursements are metered separately, down to $0.55 per printed page alongside charges for outgoing electronic communications.',
            'When a scheme seeks three competitive quotes to repair a fence and issues a work order, it can accrue hundreds of dollars in clerical dispatch charges before a tradesperson even steps onto the property. Over twelve months across routine gardening, plumbing, gate servicing, and electrical call-outs, these auxiliary fees quietly compound, often doubling the effective management cost under contracts governed by provisions such as Section 60 of the NSW Strata Schemes Management Act 2015.'
          ]
        },
        {
          heading: 'How CommonKey Solves This:',
          paragraphs: [
            'CommonKey provides volunteer committees with an independent Project & Procurement Hub. Instead of relying on your managing agent as an expensive administrative bottleneck for routine trade repairs, committee members can log maintenance requests, compare competing contractor bids side-by-side, coordinate feedback, and execute digital committee votes directly inside their own workspace. Centralising trade procurement eliminates routine dispatch fees and billable hours while ensuring all quotes, scopes, and invoices remain permanently accessible and owned by the scheme.'
          ]
        },
        {
          heading: 'Sources:',
          paragraphs: [
            '* The Investigation: [ABC News Four Corners — The Strata Trap](https://www.abc.net.au/news/2024-09-09/strata-secret-deals-and-phantom-fees-four-corners/104308482)\n* The Government Report: [NSW Fair Trading McGrathNicol Report into Strata Management Practices](https://www.nsw.gov.au/departments-and-agencies/fair-trading/news/nsw-fair-trading-releases-mcgrathnicol-report-into-netstrata)'
          ]
        }
      ]
    }
  }
];

const ARTICLES_STORAGE_KEY = 'commonkey_articles_v2';

// Purge any legacy mock or test articles from previous versions
try {
  if (typeof window !== 'undefined' && window.localStorage) {
    window.localStorage.removeItem('commonkey_published_articles');
    window.localStorage.removeItem('commonkey_articles');
    window.localStorage.removeItem('commonkey_custom_articles');
    window.localStorage.removeItem('commonkey_articles_v2');
  }
} catch {
  // ignore
}

export function formatPublicationDate(dateIsoOrStr: string, timeStr?: string): string {
  try {
    if (!dateIsoOrStr) {
      return new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
    }

    // If it includes 'T' (datetime-local or ISO string)
    if (dateIsoOrStr.includes('T')) {
      const [datePart, timePart] = dateIsoOrStr.split('T');
      const [y, m, d] = datePart.split('-').map(Number);
      const [h, min] = (timePart || '00:00').split(':').map(Number);
      const dt = new Date(y, m - 1, d, h || 0, min || 0);
      const dateFormatted = dt.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
      const timeFormatted = dt.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
      return `${dateFormatted} at ${timeFormatted}`;
    }

    // If it's YYYY-MM-DD
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateIsoOrStr)) {
      const [y, m, d] = dateIsoOrStr.split('-').map(Number);
      if (timeStr) {
        const [h, min] = timeStr.split(':').map(Number);
        const dtWithTime = new Date(y, m - 1, d, h || 0, min || 0);
        const dateFormatted = dtWithTime.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        });
        const timeFormatted = dtWithTime.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        });
        return `${dateFormatted} at ${timeFormatted}`;
      }
      const dt = new Date(y, m - 1, d);
      return dt.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
    }

    return dateIsoOrStr;
  } catch {
    return dateIsoOrStr;
  }
}

export function getAllArticles(): Article[] {
  return ARTICLES;
}

export function saveNewArticle(article: Article): Article[] {
  try {
    const saved = localStorage.getItem(ARTICLES_STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    const existing: Article[] = Array.isArray(parsed) ? parsed : [];
    const index = existing.findIndex((a) => a && (a.id === article.id || a.slug === article.slug));
    let updated: Article[];
    if (index >= 0) {
      updated = [...existing];
      updated[index] = article;
    } else {
      updated = [article, ...existing];
    }
    localStorage.setItem(ARTICLES_STORAGE_KEY, JSON.stringify(updated));
    return getAllArticles();
  } catch (e) {
    console.error('Error saving article to storage:', e);
    return getAllArticles();
  }
}

export function publishScheduledArticleNow(id: string): Article[] {
  try {
    const saved = localStorage.getItem(ARTICLES_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      const existing: Article[] = Array.isArray(parsed) ? parsed : [];
      const updated = existing.map((a) => {
        if (a && a.id === id) {
          const nowStr = new Date().toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          });
          return {
            ...a,
            status: 'published' as const,
            scheduledFor: undefined,
            publishedAt: nowStr,
            publishDate: new Date().toISOString()
          };
        }
        return a;
      });
      localStorage.setItem(ARTICLES_STORAGE_KEY, JSON.stringify(updated));
    }
  } catch (e) {
    console.error('Error publishing scheduled article now:', e);
  }
  return getAllArticles();
}

export function deleteCustomArticle(id: string): Article[] {
  try {
    const saved = localStorage.getItem(ARTICLES_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      const existing: Article[] = Array.isArray(parsed) ? parsed : [];
      const updated = existing.filter((a) => a && a.id !== id);
      localStorage.setItem(ARTICLES_STORAGE_KEY, JSON.stringify(updated));
    }
  } catch (e) {
    console.error('Error deleting custom article:', e);
  }
  return getAllArticles();
}

export function clearAllArticles(): Article[] {
  try {
    localStorage.removeItem(ARTICLES_STORAGE_KEY);
    localStorage.removeItem('commonkey_published_articles');
    localStorage.removeItem('commonkey_articles');
  } catch (e) {
    console.error('Error clearing articles:', e);
  }
  return [];
}
