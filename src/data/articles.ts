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
    id: 'the-end-of-strata-kickbacks-victoria-and-nsw-crackdowns-on-commissions',
    slug: 'the-end-of-strata-kickbacks-victoria-and-nsw-crackdowns-on-commissions',
    title: 'The End of Strata Kickbacks: Inside the Victoria and NSW Crackdowns on Insurance and Repair Commissions',
    teaser: 'Following landmark regulatory moves in Victoria and New South Wales, the era of hidden 15%–20% insurance commissions and repair kickbacks is coming to a close. Here is what is changing across Australia’s two largest strata markets and how committees can prepare for a transparent, fee-for-service future.',
    summary: 'Following landmark regulatory moves in Victoria and New South Wales, the era of hidden 15%–20% insurance commissions and repair kickbacks is coming to a close. Here is what is changing across Australia’s two largest strata markets and how committees can prepare for a transparent, fee-for-service future.',
    tags: ['Insurance Commissions', 'Legislation', 'Strata Fees', 'Governance', 'Procurement'],
    readTime: '5 min read',
    publishedAt: '27 October 2026',
    publishDate: '2026-10-27T09:00:00.000Z',
    status: 'published',
    featured: true,
    content: {
      sections: [
        {
          paragraphs: [
            'For decades, one of the biggest financial blind spots in Australian apartment living has been the "low base fee" illusion. On paper, an owners corporation or body corporate management agreement often advertises a modest annual base fee—typically around $5,000 to $7,000—that fits comfortably inside the administrative budget. Behind the scenes, however, the traditional agency business model has heavily relied on third-party insurance commissions of up to 15% to 20%, repair rebates, and itemised "Schedule B" auxiliary charges to make the numbers work.',
            'Following landmark regulatory moves in Victoria and New South Wales, the era of hidden strata kickbacks and conflicted remuneration is officially coming to a close.',
            'Here is what is changing across Australia’s two largest strata markets, why regulators are stepping in, and how both volunteer committees and ethical strata managers can prepare for a transparent, fee-for-service future.'
          ]
        },
        {
          heading: 'Victoria: A Total Ban on Kickbacks and a Dedicated Taskforce',
          paragraphs: [
            'Affecting more than 500,000 strata-managed properties across the state, Victoria has moved from relying on fine-print disclosures to proposing an outright prohibition on conflicted payments:',
            '* **The Announcement:** On 24 October 2026, the Victorian Government officially pledged to introduce laws banning owners corporation managers from taking kickbacks and commissions on services like building insurance and repairs, as outlined in the [Premier of Victoria Official Statement](https://www.premier.vic.gov.au/no-more-kickbacks-strata-managers).\n* **The Enforcement:** To ensure compliance, the government announced it will establish a dedicated Owners Corporations Taskforce monitored by [Consumer Affairs Victoria (CAV)](https://www.consumer.vic.gov.au/) to police the new rules, audit management contracts, and review back-door broker payments.'
          ]
        },
        {
          heading: 'New South Wales: A $300M+ Shift Toward Fee-for-Service',
          paragraphs: [
            'Victoria’s crackdown follows intense regulatory reform in New South Wales, where systemic conflicts of interest were brought into the national spotlight by the [ABC News Four Corners ("The Strata Trap")](https://www.abc.net.au/news/2024-09-09/the-strata-trap/104330248) investigation (and its accompanying [written investigative report](https://www.abc.net.au/news/2024-09-09/strata-secret-deals-and-phantom-fees-four-corners/104308482)) alongside the [NSW Fair Trading McGrathNicol Report](https://www.nsw.gov.au/departments-and-agencies/fair-trading/news/nsw-fair-trading-releases-mcgrathnicol-report-into-netstrata).',
            '* **The Review:** In March 2026, the NSW Productivity and Equality Commission published its final report detailing options to phase out or outright prohibit conflicted remuneration, as documented in the [NSW Productivity and Equality Commission Strata Review](https://www.nsw.gov.au/departments-and-agencies/nsw-productivity-and-equality-commission/document-library/review-of-market-impacts-of-prohibiting-strata-managers-from-accepting-commissions-and-other-conflicted-remuneration).\n* **Current Status:** The government is considering four distinct path options to move the sector toward a direct fee-for-service model, which could save apartment owners over $300 million ($333 million in net benefits) over 15 years, according to the [NSW Government Strata Commissions Report](https://www.nsw.gov.au/departments-and-agencies/nsw-productivity-and-equality-commission/document-library/review-of-market-impacts-of-prohibiting-strata-managers-from-accepting-commissions-and-other-conflicted-remuneration).',
            [
              '<div class="my-5 max-w-lg mx-auto rounded-xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5 shadow-sm not-prose">',
              '<div class="pb-3 mb-3.5 border-b border-slate-200">',
              '<div class="text-[11px] font-bold uppercase tracking-wider text-blue-700 mb-0.5">2026 Regulatory Reform Snapshot</div>',
              '<div class="text-sm sm:text-base font-extrabold text-slate-900">The National Crackdown on Strata Commissions</div>',
              '</div>',
              '<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">',
              '<div class="rounded-lg bg-white border border-slate-200 p-3.5 shadow-2xs">',
              '<div class="flex items-center justify-between gap-2 mb-1.5">',
              '<span class="text-xs font-extrabold text-slate-900">Victoria</span>',
              '<span class="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide rounded bg-blue-50 text-blue-700 border border-blue-200">Oct 2026</span>',
              '</div>',
              '<div class="text-xs font-semibold text-slate-700 leading-snug">Pledged laws banning insurance &amp; repair kickbacks + new CAV Taskforce enforcement.</div>',
              '</div>',
              '<div class="rounded-lg bg-white border border-slate-200 p-3.5 shadow-2xs">',
              '<div class="flex items-center justify-between gap-2 mb-1.5">',
              '<span class="text-xs font-extrabold text-slate-900">New South Wales</span>',
              '<span class="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide rounded bg-blue-50 text-blue-700 border border-blue-200">Mar 2026</span>',
              '</div>',
              '<div class="text-xs font-semibold text-slate-700 leading-snug">Productivity Commission review projects <span class="text-blue-700 font-bold">$300M+</span> in owner savings over 15 years.</div>',
              '</div>',
              '</div>',
              '<div class="mt-3 rounded-lg bg-white border border-slate-200 p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">',
              '<div>',
              '<div class="text-[10px] font-bold uppercase tracking-wider text-rose-600">Old Commission Model</div>',
              '<div class="text-sm font-extrabold text-slate-900 font-mono">15%–20% <span class="text-xs font-normal font-sans text-slate-500">insurance cut</span></div>',
              '</div>',
              '<div class="hidden sm:block text-slate-400 font-bold">→</div>',
              '<div class="sm:text-right">',
              '<div class="text-[10px] font-bold uppercase tracking-wider text-emerald-700">The New Industry Standard</div>',
              '<div class="text-sm font-extrabold text-emerald-700">Transparent Fee-for-Service</div>',
              '</div>',
              '</div>',
              '</div>'
            ].join('')
          ]
        },
        {
          heading: 'Why States Are Banning Commissions',
          paragraphs: [
            'Across both jurisdictions, economic and consumer watchdogs identified three structural flaws with commission-driven strata management:',
            '* **Conflict of Interest:** Investigations showed that insurance relationships create financial incentives that do not align with the best interests of owners, a concern detailed in the [NSW Productivity Commission Media Release](https://www.nsw.gov.au/departments-and-agencies/nsw-productivity-and-equality-commission/news/departmental-release-ending-commissions-for-strata-managers-could-save-nsw-333-million-over-15-years). Historically, standard management contracts not only embedded 15% to 20% insurance commissions, but also penalised committees that shopped around—waiving claims administration inside the manager\'s preferred broker network while charging $150 to $250 per hour to process claims if the committee chose an independent broker.\n* **Hidden Costs:** Industry practices have historically allowed hidden third-party payments to quietly inflate annual levies, causing poor governance and artificial price signals, as noted in the [SCA NSW Industry Phased Ban Summary](https://scansw.com.au/faqs/phased-replacement) (and the accompanying [SCA NSW Phased Out Announcement](https://scansw.com.au/news/sca-nsw-to-phase-out-strata-insurance-commissions)). Because base management fees were artificially compressed to win tenders, agencies often relied on insurance rebates or "Schedule B" auxiliary charges ($80 to $100 per quote request or work order) just to fund everyday operations.\n* **Transition to Fee-for-Service:** Removing commissions shifts the entire sector toward a transparent, flat-fee or fee-for-service payment model to build trust, as discussed in the [Insurance News Regulatory Review](https://www.insurancenews.com.au/regulatory-government/labor-lines-up-victorian-strata-commissions-ban). While base management fees may adjust to reflect the real cost of skilled administration, committees gain total visibility to compare providers on merit, coverage quality, and genuine service.'
          ]
        },
        {
          heading: 'Why This Reform Is a Win for Ethical Strata Managers, Too',
          paragraphs: [
            'It is important to recognise that the commission trap did not just hurt lot owners—it also disadvantaged transparent, ethical strata managers.',
            'When an individual strata manager is juggling an average of 785 to 890 lots across 20 to 35 separate buildings, competing against agencies that slash their headline base fee and recoup their margin through hidden 20% insurance commissions or repair markups makes honest pricing nearly impossible. Moving to a clean fee-for-service environment levels the playing field, allowing dedicated strata managers to charge transparently for their professional expertise, rebuild trust with their committees, and recommend policies and trades purely on merit.'
          ]
        },
        {
          heading: 'How CommonKey Solves This',
          paragraphs: [
            'As Victoria, NSW, and the wider Australian market transition away from commission-driven contracts toward fee-for-service transparency, volunteer committees need independent records to verify that their building is getting true market value.',
            'CommonKey equips committees—and the transparent strata managers who partner with them—with a 100% scheme-owned governance workspace:',
            '* **Independent Asset & Insurance Register:** Instead of having your insurance history locked inside an external broker or agency portal, CommonKey centralises past policy schedules, building valuations, excess histories, and claims documentation in one permanent dashboard. When renewal season arrives, your committee has the complete historical data required to benchmark brokers objectively.\n* **Transparent Project & Procurement Hub:** Eliminate any suspicion of repair kickbacks or $90 quote-dispatch markups. Committees can log maintenance scopes, upload competing trade quotes side-by-side, and record formal digital committee votes backed by an Immutable Activity Log.\n* **100% Scheme Data Sovereignty:** Whether your building stays with its current manager for a decade or transitions to a new fee-for-service agency, 100% of your warranties, compliance timelines, and procurement records remain permanently with the property.'
          ]
        },
        {
          heading: 'Sources:',
          paragraphs: [
            '* **Premier of Victoria Official Statement (24 Oct 2026):** [No More Kickbacks For Strata Managers](https://www.premier.vic.gov.au/no-more-kickbacks-strata-managers)\n* **Consumer Affairs Victoria (CAV):** [Owners Corporations Resources & Regulation](https://www.consumer.vic.gov.au/)\n* **NSW Productivity and Equality Commission Strata Review & Report (Mar 2026):** [Review of Market Impacts of Prohibiting Strata Managers from Accepting Commissions and Other Conflicted Remuneration](https://www.nsw.gov.au/departments-and-agencies/nsw-productivity-and-equality-commission/document-library/review-of-market-impacts-of-prohibiting-strata-managers-from-accepting-commissions-and-other-conflicted-remuneration)\n* **NSW Productivity Commission Media Release:** [Ending Commissions for Strata Managers Could Save NSW $333 Million Over 15 Years](https://www.nsw.gov.au/departments-and-agencies/nsw-productivity-and-equality-commission/news/departmental-release-ending-commissions-for-strata-managers-could-save-nsw-333-million-over-15-years)\n* **SCA NSW Industry Phased Ban Summary:** [Key Information About Phased Replacement of Insurance Commissions](https://scansw.com.au/faqs/phased-replacement) & [SCA NSW Official Announcement](https://scansw.com.au/news/sca-nsw-to-phase-out-strata-insurance-commissions)\n* **Insurance News Regulatory Review:** [Labor Lines Up Victorian Strata Commissions Ban](https://www.insurancenews.com.au/regulatory-government/labor-lines-up-victorian-strata-commissions-ban)\n* **ABC News Four Corners ("The Strata Trap"):** [Official Episode Page](https://www.abc.net.au/news/2024-09-09/the-strata-trap/104330248) & [Written Investigation: Secret Deals and Phantom Fees](https://www.abc.net.au/news/2024-09-09/strata-secret-deals-and-phantom-fees-four-corners/104308482)\n* **NSW Fair Trading McGrathNicol Report:** [NSW Fair Trading Media Release](https://www.nsw.gov.au/departments-and-agencies/fair-trading/news/nsw-fair-trading-releases-mcgrathnicol-report-into-netstrata) & [Summary of Findings and Report Page](https://www.nsw.gov.au/housing-and-construction/strata/independent-expert-report-into-netstrata-summary-of-findings-and-recommendations)'
          ]
        }
      ]
    }
  },
  {
    id: 'caught-in-the-same-broken-system-committee-frustration-and-strata-manager-burnout',
    slug: 'caught-in-the-same-broken-system-committee-frustration-and-strata-manager-burnout',
    title: 'Caught in the Same Broken System: What 8 Years of Data Reveals About Committee Frustration and Strata Manager Burnout',
    teaser: 'An eight-year longitudinal study of body corporate committee surveys reveals how rising administrative pressures, slow response times, and 24% annual manager turnover are hurting both volunteer committees and the strata managers trying to support them.',
    summary: 'An eight-year longitudinal study of body corporate committee surveys reveals how rising administrative pressures, slow response times, and 24% annual manager turnover are hurting both volunteer committees and the strata managers trying to support them.',
    tags: ['Strata Management', 'Governance', 'Knowledge Vault', 'Strata Software', 'Industry Data'],
    readTime: '4 min read',
    publishedAt: '2 September 2026',
    publishDate: '2026-09-02T09:00:00.000Z',
    status: 'published',
    content: {
      sections: [
        {
          paragraphs: [
            'If you serve on a body corporate committee, you know the frustration of waiting days for a reply to an urgent maintenance email, or the exhaustion of bringing a newly assigned portfolio manager up to speed on your building’s history.',
            'But step onto the other side of the desk, and the picture looks just as overwhelming. Across Australia, dedicated strata managers are drowning in hundreds of daily emails, refereeing tense neighbourhood disputes, navigating complex legislative reforms, and attending evening meetings long after standard business hours end.',
            'A longitudinal study published by enterprise strata software provider [StrataMax (Market Trends in Strata 2023)](https://www.stratamax.com/news/market-trends-in-strata-2023) puts hard numbers behind this shared strain. By analysing eight years of biannual Net Promoter Score (NPS) surveys from committee members between 2015 and 2023—comparing satisfied Promoters against dissatisfied Detractors—the report shows how rising operational pressures are hurting both committees and the managers trying to support them.'
          ]
        },
        {
          heading: 'The Data: Four Shifts Reshaping Australian Strata (2015 vs. 2023)',
          paragraphs: [
            'Across eight years of committee feedback, four major trends stood out in the StrataMax dataset:',
            '1. **Response Times Are the #1 Pressure Point (Up from 26% to 31%):** Poor response time remains the single biggest complaint among dissatisfied committees, rising from 26% of all Detractor feedback in 2015 to 31% in 2023. As StrataMax rightly notes, with the ever-increasing regulatory and administrative demands placed on individual strata managers, this bottleneck is hardly a surprise.\n2. **Manager Burnout and Turnover Have Tripled in Impact:** Between 2015 and 2023, staff turnover tripled in significance (climbing from just 2% of Detractor complaints in 2015) as a primary reason committees wouldn\'t recommend their agency. The report points directly to unprecedented job pressure and burnout. This mirrors findings from the [Macquarie Business Banking Strata Benchmarking Report](https://www.macquarie.com.au/business-banking/strata-industry.html), which shows national manager churn sitting at 18% to 24% annually, with the average manager juggling roughly 890 lots across 20 to 35 separate buildings.\n3. **Clear Communication Is Make-or-Break:** When committees are unhappy, "poor communication" is a top-five driver, rising from 12% to 15% of Detractor feedback. Conversely, when committees love their strata manager, citing "good communication" more than doubled from 3% in 2015 to 7% in 2023.\n4. **Committees Value Service Over Rock-Bottom Fees (Down from 18%):** Complaints about management fees being "expensive or poor value" accounted for 18% of Detractor scores in 2015, but trended steadily downward by 2023. Committees are signalling that they aren\'t looking for the cheapest possible fee—they are looking for breathing room, continuity, and reliable support.',
            [
              '<div class="my-5 max-w-lg mx-auto rounded-xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5 shadow-sm not-prose">',
              '<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-200">',
              '<div>',
              '<div class="text-[11px] font-bold uppercase tracking-wider text-blue-700 mb-0.5">StrataMax NPS Detractor Feedback (2015 vs. 2023)</div>',
              '<div class="text-sm sm:text-base font-extrabold text-slate-900">Rising Committee Frustration Over 8 Years</div>',
              '</div>',
              '<div class="flex items-center gap-3 text-xs font-semibold text-slate-600">',
              '<span class="inline-flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-sm bg-slate-300 border border-slate-400/50"></span>2015</span>',
              '<span class="inline-flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-sm bg-blue-600"></span>2023</span>',
              '</div>',
              '</div>',
              '<div class="relative pt-2 pb-1 px-2 sm:px-4">',
              '<div class="grid grid-cols-2 gap-6 sm:gap-10 items-end h-40 border-b border-slate-300 px-2 sm:px-6">',
              '<div class="flex flex-col items-center h-full justify-end">',
              '<div class="flex items-end justify-center gap-2.5 sm:gap-4 w-full h-full">',
              '<div class="flex flex-col items-center justify-end h-full w-10 sm:w-14">',
              '<span class="text-xs font-bold text-slate-600 mb-1 font-mono">26%</span>',
              '<div class="w-full bg-slate-300 border border-slate-400/40 rounded-t-md transition-all" style="height: 68%"></div>',
              '</div>',
              '<div class="flex flex-col items-center justify-end h-full w-10 sm:w-14">',
              '<span class="text-xs font-extrabold text-blue-700 mb-1 font-mono">31%</span>',
              '<div class="w-full bg-blue-600 rounded-t-md shadow-sm transition-all" style="height: 82%"></div>',
              '</div>',
              '</div>',
              '</div>',
              '<div class="flex flex-col items-center h-full justify-end">',
              '<div class="flex items-end justify-center gap-2.5 sm:gap-4 w-full h-full">',
              '<div class="flex flex-col items-center justify-end h-full w-10 sm:w-14">',
              '<span class="text-xs font-bold text-slate-600 mb-1 font-mono">12%</span>',
              '<div class="w-full bg-slate-300 border border-slate-400/40 rounded-t-md transition-all" style="height: 32%"></div>',
              '</div>',
              '<div class="flex flex-col items-center justify-end h-full w-10 sm:w-14">',
              '<span class="text-xs font-extrabold text-blue-700 mb-1 font-mono">15%</span>',
              '<div class="w-full bg-blue-600 rounded-t-md shadow-sm transition-all" style="height: 40%"></div>',
              '</div>',
              '</div>',
              '</div>',
              '</div>',
              '<div class="grid grid-cols-2 gap-6 sm:gap-10 pt-2.5 px-2 sm:px-6 text-center">',
              '<div>',
              '<div class="flex justify-center gap-2.5 sm:gap-4 text-[11px] font-mono text-slate-500 mb-1">',
              '<span class="w-10 sm:w-14">2015</span>',
              '<span class="w-10 sm:w-14 font-semibold text-blue-700">2023</span>',
              '</div>',
              '<div class="text-xs sm:text-sm font-bold text-slate-900">Slow Response Time</div>',
              '<div class="text-[11px] font-semibold text-rose-600 mt-0.5">#1 Complaint (+5%)</div>',
              '</div>',
              '<div>',
              '<div class="flex justify-center gap-2.5 sm:gap-4 text-[11px] font-mono text-slate-500 mb-1">',
              '<span class="w-10 sm:w-14">2015</span>',
              '<span class="w-10 sm:w-14 font-semibold text-blue-700">2023</span>',
              '</div>',
              '<div class="text-xs sm:text-sm font-bold text-slate-900">Poor Communication</div>',
              '<div class="text-[11px] font-semibold text-amber-700 mt-0.5">Top-5 Driver (+3%)</div>',
              '</div>',
              '</div>',
              '</div>',
              '</div>'
            ].join('')
          ]
        },
        {
          heading: 'Why Is Everyone Burning Out? The "Human Search Engine" Problem',
          paragraphs: [
            'When a single portfolio manager is responsible for 30 different buildings, even the most organised professional is set up for an impossible inbox battle.',
            'To help agencies cope with the deluge, the [StrataMax report](https://www.stratamax.com/news/market-trends-in-strata-2023) explores Self-Service, Request Management, and Expectation Management—including using auto-replies to outline office hours, or using Microsoft Outlook’s delayed-delivery feature so emails written after-hours are only sent during business hours to protect staff boundaries and manage response expectations.',
            'While boundaries and structured workflows are vital for protecting strata managers\' mental health, the underlying bottleneck goes deeper than email habits: traditional strata software was built for back-office trust accounting, not day-to-day committee context.',
            'Because traditional agency portals act like static PDF filing cabinets, volunteer committee members often can\'t find the historical "why" behind past decisions on their own. As a result, committees unintentionally treat their overworked strata manager like a human search engine—emailing them to track down a five-year-old roof warranty, check the status of a trade quote, or clarify a 2019 by-law decision.',
            'Worse still, when a manager inevitably burns out and leaves, their replacement inherits thousands of unindexed files with zero operational context—forcing the incoming manager and the volunteer committee to spend months piecing the building\'s history back together from scratch.'
          ]
        },
        {
          heading: 'How CommonKey Supports Both Committees and Strata Managers',
          paragraphs: [
            'CommonKey was built to take the unfair pressure off both volunteer committees and portfolio managers. It doesn\'t replace your strata manager’s trust accounting system—it sits alongside it as the building’s permanent digital brain and collaborative workspace:',
            '* **Stops Treating Managers Like Human Search Engines (Solves the 31% Response Bottleneck):** With CommonKey’s self-serve Knowledge Vault, committee members can search decades of building records, warranties, and past decisions in seconds. Committees get instant answers without waiting days or triggering hourly archive search fees, and strata managers have up to 60% fewer routine "can you dig up this file?" emails clogging their inboxes.\n* **Turns "Reply-All" Chaos Into Clean Instructions (Solves the 15% Communication Gap):** Instead of drowning managers and volunteers in 30-message "reply-all" threads over maintenance repairs, committees use CommonKey to compare quotes side-by-side and log formal digital votes in one place. Your strata manager receives clear, unified decisions ready for action.\n* **Gives Incoming Managers a 15-Minute Handover (Solves the 3x Turnover Crisis):** When portfolio managers rotate, neither the new manager nor the committee has to start from Year Zero. Because the building’s active projects, compliance calendar, and decision history stay permanently with the scheme in CommonKey, a newly assigned manager can log in on Day 1 and see the complete operational picture in minutes.',
            'When a building owns its institutional memory, volunteers get their evenings back—and strata managers finally get the breathing room to do the high-value stewardship they were hired for.'
          ]
        },
        {
          heading: 'Sources:',
          paragraphs: [
            '* **The 8-Year NPS Study:** [StrataMax: Market Trends in Strata 2023](https://www.stratamax.com/news/market-trends-in-strata-2023)\n* **Industry Workload & Churn Benchmarks:** [Macquarie Business Banking: Strata Industry Benchmarking Reports](https://www.macquarie.com.au/business-banking/strata-industry.html)\n* **Peak Body Sustainability Insights:** [Strata Community Association (SCA)](https://www.strata.community/)\n* **National Strata Demographics:** [UNSW City Futures Research Centre: Australasian Strata Insights](https://cityfutures.ada.unsw.edu.au/research/projects/2024-australasian-strata-insights/)'
          ]
        }
      ]
    }
  },
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
          heading: 'Sources:',
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
          heading: 'Sources:',
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
