import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Building2, 
  CheckCircle2, 
  Menu, 
  X, 
  ShieldCheck, 
  Mail, 
  Users, 
  Lock, 
  Search, 
  ChevronDown, 
  Layers, 
  History, 
  CheckCircle, 
  FileCheck, 
  CalendarDays, 
  Shield, 
  Clock, 
  ArrowUpRight, 
  AlertTriangle, 
  DollarSign, 
  Banknote, 
  RefreshCw, 
  FolderSearch, 
  Sparkles, 
  Plus, 
  Minus, 
  Copyright,
  Copy,
  Check,
  ArrowUp
} from 'lucide-react';
import React, { useState, useEffect } from 'react';
import ArticlesPage from './components/ArticlesPage';
import { getAllArticles, Article } from './data/articles';

const CALENDAR_LINK = "https://calendar.app.google/8LsRqfY3xuX15yQa7";

// Assets provided
const ASSETS = {
  dashboard: "https://ik.imagekit.io/vgcja8lfq/CommonKey/Dashboard.png",
  compliance: "https://ik.imagekit.io/vgcja8lfq/CommonKey/Compliance%20Matrix%20(Action%20Required).png",
  projects: "https://ik.imagekit.io/vgcja8lfq/CommonKey/Projects.png",
  activityLog: "https://ik.imagekit.io/vgcja8lfq/CommonKey/Activity%20Log.png",
  documents: "https://ik.imagekit.io/vgcja8lfq/CommonKey/Dashboard.png"
};

const FadeIn = ({ 
  children, 
  delay = 0, 
  className = "" 
}: { 
  children: React.ReactNode, 
  delay?: number, 
  className?: string,
  key?: React.Key
}) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const Button = ({ 
  children, 
  href, 
  primary = true, 
  className = "",
  onClick
}: { 
  children: React.ReactNode, 
  href?: string, 
  primary?: boolean, 
  className?: string,
  onClick?: () => void
}) => {
  const baseStyle = "inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-xl whitespace-nowrap text-sm sm:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 active:scale-[0.99] cursor-pointer";
  const primaryStyle = "bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-md hover:shadow-blue-600/20 px-5 sm:px-6 py-2.5 sm:py-3";
  const secondaryStyle = "bg-white text-slate-800 hover:bg-slate-50 border border-slate-200 shadow-sm hover:border-slate-300 px-5 sm:px-6 py-2.5 sm:py-3";

  if (href) {
    return (
      <a 
        href={href} 
        target={href.startsWith('http') ? "_blank" : undefined}
        rel={href.startsWith('http') ? "noopener noreferrer" : undefined}
        className={`${baseStyle} ${primary ? primaryStyle : secondaryStyle} ${className}`}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <button 
      onClick={onClick}
      className={`${baseStyle} ${primary ? primaryStyle : secondaryStyle} ${className}`}
    >
      {children}
    </button>
  );
};

// Modern Browser Frame Component wrapping ImageKit screenshots with zero-broken-image resilience
const BrowserFrame = ({ 
  src, 
  alt, 
  badge,
  className = "" 
}: { 
  src: string; 
  alt: string; 
  badge?: string;
  className?: string;
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`rounded-2xl border border-slate-200/90 bg-white shadow-xl shadow-slate-900/5 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-slate-900/10 ${className}`}>
      {/* Browser header bar */}
      <div className="h-10 bg-slate-50/95 border-b border-slate-200/80 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5" aria-hidden="true">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-300 border border-slate-400/30" />
            <div className="w-2.5 h-2.5 rounded-full bg-slate-300 border border-slate-400/30" />
            <div className="w-2.5 h-2.5 rounded-full bg-slate-300 border border-slate-400/30" />
          </div>
          <div className="flex items-center gap-1.5 ml-2 sm:ml-3 px-2.5 sm:px-3 py-1 bg-white border border-slate-200 rounded-md text-[10px] sm:text-[11px] text-slate-600 font-mono shadow-2xs">
            <Lock className="w-3 h-3 text-emerald-600 shrink-0" />
            <span>CommonKey.app</span>
          </div>
        </div>
        {badge && (
          <span className="text-[11px] font-semibold text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md">
            {badge}
          </span>
        )}
      </div>

      {/* Screenshot container */}
      <div className="relative bg-slate-100 min-h-[220px]">
        {imgError ? (
          <div className="p-12 text-center flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 min-h-[300px]">
            <Building2 className="w-12 h-12 text-blue-600 mb-3 opacity-80" />
            <h4 className="font-bold text-slate-900 text-base mb-1">{alt}</h4>
            <p className="text-xs text-slate-500 max-w-sm">Secure, cloud-hosted strata governance interface.</p>
          </div>
        ) : (
          <img 
            src={src} 
            alt={alt} 
            onError={() => setImgError(true)}
            className="w-full h-auto object-cover block transition-opacity duration-300"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        )}
      </div>
    </div>
  );
};

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [currentView, setCurrentView] = useState<'landing' | 'articles'>('landing');
  const [currentArticleSlug, setCurrentArticleSlug] = useState<string | undefined>(undefined);
  const [articles, setArticles] = useState<Article[]>(() => getAllArticles() || []);
  const [lotsCount, setLotsCount] = useState<number>(12);

  // Dynamic pricing calculation:
  // 1 to 8 lots: $299 + GST / year (minimum floor)
  // 9 to 24 lots: lots * $36 + GST / year ($3/month x 12 months)
  // 25+ lots: $899 + GST / year (maximum cap)
  const effectiveLots = lotsCount > 0 ? lotsCount : 12;
  const calculateAnnualCost = (lots: number) => {
    if (lots <= 8) return 299;
    if (lots <= 24) return lots * 36;
    return 899;
  };
  const calculatedAnnualCost = calculateAnnualCost(effectiveLots);
  // Standard pricing baseline: $8/lot/month = $96/lot/year
  // e.g. for 12 lots: 12 * 96 = $1,152, saving $1,152 - $432 = $720/year
  const standardBaselineCost = effectiveLots * 96;
  const calculatedSavings = Math.max(0, standardBaselineCost - calculatedAnnualCost);

  const [showScrollTop, setShowScrollTop] = useState(false);
  const [copiedProposal, setCopiedProposal] = useState(false);

  // Synchronize routing with window.location.hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/articles/')) {
        const slug = hash.replace('#/articles/', '').split('?')[0];
        setCurrentView('articles');
        setCurrentArticleSlug(slug || undefined);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#/articles' || hash === '#articles') {
        setCurrentView('articles');
        setCurrentArticleSlug(undefined);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentView('landing');
        setCurrentArticleSlug(undefined);
        if (hash && hash.length > 1 && !hash.startsWith('#/')) {
          setTimeout(() => {
            const elem = document.querySelector(hash);
            if (elem) elem.scrollIntoView({ behavior: 'smooth' });
          }, 50);
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Listen to scroll for back-to-top and keyboard for escape
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleCopyProposal = () => {
    const summaryText = `Proposal for Strata Committee:
Scheme: ${effectiveLots} lots
CommonKey Annual Subscription: $${calculatedAnnualCost.toLocaleString()} + GST / year ($${Math.round(calculatedAnnualCost / effectiveLots)}/lot/year ≈ $${(calculatedAnnualCost / effectiveLots / 52).toFixed(2)}/week per lot)
Payment Source: Administrative Fund (Standard governance tool, can be approved by simple committee vote)
Includes: Statutory Compliance Matrix, Project Management & Quote Comparisons, Immutable Activity Ledger, Free White-Glove Migration Setup.
Walkthrough: ${CALENDAR_LINK}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(summaryText);
      setCopiedProposal(true);
      setTimeout(() => setCopiedProposal(false), 2500);
    }
  };

  const navigateToArticles = (slug?: string) => {
    if (slug) {
      window.location.hash = `#/articles/${slug}`;
      setCurrentArticleSlug(slug);
    } else {
      window.location.hash = `#/articles`;
      setCurrentArticleSlug(undefined);
    }
    setCurrentView('articles');
    setMobileMenuOpen(false);
  };

  const navigateToHomeSection = (sectionId?: string) => {
    setCurrentView('landing');
    setCurrentArticleSlug(undefined);
    if (sectionId) {
      window.location.hash = sectionId;
      setTimeout(() => {
        const elem = document.querySelector(sectionId);
        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
      }, 80);
    } else {
      window.location.hash = '';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const navLinks = [
    { label: 'Features', href: '#features', isPage: false },
    { label: 'Problem', href: '#problem', isPage: false },
    { label: 'Comparison', href: '#comparison', isPage: false },
    { label: 'Pricing', href: '#pricing', isPage: false },
    { label: 'Articles', href: '#/articles', isPage: true },
    { label: 'FAQ', href: '#faq', isPage: false },
  ];

  const faqs = [
    {
      q: "Does CommonKey replace our Strata Manager?",
      a: "No. CommonKey is the committee's independent governance system. Managers handle trust accounting, levy notices, and portfolio administration; CommonKey permanently retains building history, project context, and compliance for the scheme."
    },
    {
      q: "We have a manager portal, why CommonKey?",
      a: "Agency portals are static compliance archives designed for internal agency record-keeping. Project context gets buried, searching past documents often incurs $150-$300/hr admin fees, and data is lost or locked if you ever switch strata agencies. CommonKey stays with your scheme forever."
    },
    {
      q: "Our Chair knows everything, why change?",
      a: "That's the \"Hero Trap.\" It creates a single point of failure where the Chair cannot easily take leave or step down without the building stalling, and succession becomes intimidating for new volunteers. CommonKey captures all institutional knowledge continuously."
    },
    {
      q: "Isn't compliance the manager's legal responsibility?",
      a: "No. Under Australian strata legislation, statutory and financial liability rests squarely on the Committee / Owners Corporation. CommonKey gives volunteer committees direct, transparent visibility over all statutory deadlines."
    },
    {
      q: "Who owns our data & where is it hosted?",
      a: "The Body Corporate owns 100% of the data at all times. All records and documents are encrypted at rest and in transit, hosted on secure cloud infrastructure, and fully exportable anytime."
    },
    {
      q: "Is it hard for volunteers to use?",
      a: "No. Committee members can sign in seamlessly via Google, Apple, or secure email credentials. It is designed specifically for time-poor volunteers with intuitive dashboards and zero steep learning curve."
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 relative">
      
      {/* 1. NAVIGATION BAR */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-shadow duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-3 sm:gap-4">
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  navigateToHomeSection();
                }}
                className="flex items-center gap-2.5 text-slate-950 font-bold text-xl tracking-tight cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg p-1 -m-1"
              >
                <div className="w-9 h-9 rounded-xl bg-slate-950 text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200">
                  <Building2 className="w-5 h-5 text-blue-400" />
                </div>
                <span className="font-extrabold tracking-tight">CommonKey</span>
              </a>
            </div>

            {/* Desktop Links */}
            <nav className="hidden md:flex items-center gap-7 lg:gap-8 text-sm font-semibold">
              {navLinks.map((link) => (
                <a 
                  key={link.label} 
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    if (link.isPage) {
                      navigateToArticles();
                    } else {
                      navigateToHomeSection(link.href);
                    }
                  }}
                  className={`transition-colors py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-md px-1 ${
                    link.isPage && currentView === 'articles'
                      ? 'text-blue-700 font-bold border-b-2 border-blue-600'
                      : 'text-slate-600 hover:text-slate-950'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Button href={CALENDAR_LINK}>
                Book a 30-Min Walkthrough
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-lg text-slate-700 hover:text-slate-950 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu overlay backdrop */}
        {mobileMenuOpen && (
          <div 
            className="fixed inset-0 top-20 bg-slate-950/40 backdrop-blur-xs z-40 md:hidden animate-fadeIn" 
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden relative z-50 border-b border-slate-200 bg-white px-5 pt-3 pb-6 space-y-3 shadow-xl">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  if (link.isPage) {
                    navigateToArticles();
                  } else {
                    navigateToHomeSection(link.href);
                  }
                }}
                className={`block py-2.5 text-base font-semibold transition-colors ${
                  link.isPage && currentView === 'articles'
                    ? 'text-blue-700 font-bold'
                    : 'text-slate-800 hover:text-blue-600'
                }`}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2">
              <Button href={CALENDAR_LINK} className="w-full">
                Book a 30-Min Walkthrough
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* VIEW SWITCHER: ARTICLES vs LANDING PAGE */}
      {currentView === 'articles' ? (
        <ArticlesPage
          articles={articles || []}
          currentArticleSlug={currentArticleSlug}
          onSelectArticle={(slug) => navigateToArticles(slug)}
          onBackToArticles={() => navigateToArticles()}
          onGoHome={() => navigateToHomeSection()}
          calendarLink={CALENDAR_LINK}
        />
      ) : (
        <>
          {/* 2. HERO SECTION */}
          <section id="platform" className="relative pt-12 sm:pt-16 pb-20 sm:pb-28 overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-[#F8FAFC] border-b border-slate-200/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center max-w-4xl mx-auto">
                {/* H1 */}
                <FadeIn>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.12] mb-6 text-balance">
                    Stop Running Your Strata Committee Out of Your Inbox.
                  </h1>
                </FadeIn>

                {/* Subhead */}
                <FadeIn delay={0.2}>
                  <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-8 sm:mb-10 max-w-3xl mx-auto text-balance">
                    The independent governance software that protects Australian volunteer committees from strata manager turnover, lost records, and personal liability. Get your weekends back and give your building a permanent digital brain.
                  </p>
                </FadeIn>

                {/* CTAs */}
                <FadeIn delay={0.3}>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                    <Button href={CALENDAR_LINK} className="w-full sm:w-auto px-8 py-3.5 text-base shadow-lg shadow-blue-600/20 group">
                      Book a 30-Minute Walkthrough
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform inline-block" />
                    </Button>
                    <Button href="#features" primary={false} className="w-full sm:w-auto px-7 py-3.5 text-base">
                      Explore Features
                    </Button>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 italic">
                    Purpose-built for Australian Body Corporates, Strata Schemes, and Owners Corporations.
                  </p>
                </FadeIn>

                {/* 3-Column Benefit Cards directly under the subtext */}
                <FadeIn delay={0.35} className="mt-10 sm:mt-12 text-left">
                  <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
                    {/* Column 1: Shield */}
                    <div className="bg-white/95 backdrop-blur-sm border border-slate-200/90 border-t-2 border-t-blue-500 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 group flex flex-col justify-between">
                      <div>
                        <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 border border-blue-200/60 flex items-center justify-center mb-4 transition-colors group-hover:bg-blue-100">
                          <Shield className="w-5 h-5 text-blue-600" />
                        </div>
                        <h3 className="font-bold text-slate-950 text-lg mb-2 tracking-tight">
                          Protect Your Liability
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed">
                          Never miss a statutory fire or lift audit. Visual compliance tracking protects committee members from legal and financial risk.
                        </p>
                      </div>
                    </div>

                    {/* Column 2: Clock */}
                    <div className="bg-white/95 backdrop-blur-sm border border-slate-200/90 border-t-2 border-t-indigo-500 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 group flex flex-col justify-between">
                      <div>
                        <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200/60 flex items-center justify-center mb-4 transition-colors group-hover:bg-indigo-100">
                          <Clock className="w-5 h-5 text-indigo-600" />
                        </div>
                        <h3 className="font-bold text-slate-950 text-lg mb-2 tracking-tight">
                          Reclaim Your Time
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed">
                          Stop digging through endless reply-all email chains. Find any building document, warranty, or quote in seconds.
                        </p>
                      </div>
                    </div>

                    {/* Column 3: Dollar Note */}
                    <div className="bg-white/95 backdrop-blur-sm border border-slate-200/90 border-t-2 border-t-emerald-500 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 group flex flex-col justify-between">
                      <div>
                        <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200/60 flex items-center justify-center mb-4 transition-colors group-hover:bg-emerald-100">
                          <Banknote className="w-5 h-5 text-emerald-600" />
                        </div>
                        <h3 className="font-bold text-slate-950 text-lg mb-2 tracking-tight">
                          Eliminate Hidden Fees
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed">
                          Stop paying your strata manager expensive hourly administrative search fees just to retrieve your own building's history.
                        </p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              </div>

              {/* Hero Visual - Real Screenshot wrapped in BrowserFrame */}
              <FadeIn delay={0.4} className="mt-12 sm:mt-14 max-w-5xl mx-auto">
                <BrowserFrame 
                  src={ASSETS.dashboard} 
                  alt="CommonKey Committee Governance Dashboard"
                  badge="Executive Overview"
                />
              </FadeIn>
            </div>
          </section>

          {/* 3. PROBLEM SECTION */}
          <section id="problem" className="py-24 bg-[#F8FAFC] border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto text-center mb-16">
                <FadeIn>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight mb-6">
                    Volunteering Shouldn't Be This Hard
                  </h2>
                  <p className="text-slate-700 text-base sm:text-lg leading-relaxed text-balance mb-4">
                    You volunteered for the committee to protect your property investment, not to take on a second, unpaid job. Everything might feel like smooth sailing right now, but what happens when the waters change? If your building relies on just one person's memory, you are one resignation, property sale, or sudden handover away from a rip current of operational chaos.
                  </p>
                  <p className="text-slate-900 font-semibold text-base sm:text-lg leading-relaxed">
                    Right now, your building’s history is likely trapped in three fragile places:
                  </p>
                </FadeIn>
              </div>

              {/* 3 Fragile Places Cards */}
              <div className="grid md:grid-cols-3 gap-8">
                {/* Card 1 */}
                <FadeIn delay={0.1} className="h-full">
                  <div className="bg-white border border-slate-200/90 rounded-2xl p-8 h-full flex flex-col transition-all hover:border-slate-300 hover:shadow-md">
                    <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 border border-amber-200/60 flex items-center justify-center mb-6 shrink-0">
                      <Users className="w-6 h-6 text-amber-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-950 mb-3">
                      The "Hero Chair" Trap
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed flex-1">
                      One person holds 10 years of building history in their head. They can never take a holiday, and nobody wants to take their place.
                    </p>
                  </div>
                </FadeIn>

                {/* Card 2 */}
                <FadeIn delay={0.2} className="h-full">
                  <div className="bg-white border border-slate-200/90 rounded-2xl p-8 h-full flex flex-col transition-all hover:border-slate-300 hover:shadow-md">
                    <div className="w-12 h-12 rounded-xl bg-red-50 text-red-700 border border-red-200/60 flex items-center justify-center mb-6 shrink-0">
                      <RefreshCw className="w-6 h-6 text-red-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-950 mb-3">
                      The Strata Manager Merry-Go-Round
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed flex-1">
                      Your superstar strata manager leaves, and your building's operational history walks out the door with them. The new manager starts from scratch.
                    </p>
                  </div>
                </FadeIn>

                {/* Card 3 */}
                <FadeIn delay={0.3} className="h-full">
                  <div className="bg-white border border-slate-200/90 rounded-2xl p-8 h-full flex flex-col transition-all hover:border-slate-300 hover:shadow-md">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 border border-blue-200/60 flex items-center justify-center mb-6 shrink-0">
                      <Mail className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-950 mb-3">
                      The Reply-All Black Hole
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed flex-1">
                      Vendor quotes, resident complaints, and compliance deadlines are buried in messy email chains, turning a quick catch-up into hours of weekend admin.
                    </p>
                  </div>
                </FadeIn>
              </div>
            </div>
          </section>

          {/* 4. COMPARISON MATRIX: Why Your Strata Manager's Portal Isn't Enough */}
          <section id="comparison" className="py-24 bg-slate-50 border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto text-center mb-16">
                <FadeIn>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight mb-4">
                    Why Your Strata Manager's Portal Isn't Enough
                  </h2>
                  <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                    Traditional strata portals are built for agency portfolio management (trust accounting and levy notices). CommonKey is built specifically for committee governance and continuity.
                  </p>
                </FadeIn>
              </div>

              <FadeIn delay={0.2} className="max-w-6xl mx-auto">
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  {/* Table Header on Desktop */}
                  <div className="hidden md:grid grid-cols-12 gap-6 border-b border-slate-200 bg-slate-100/75 p-5 text-xs font-bold tracking-wider uppercase">
                    <div className="col-span-4 text-slate-600">The Governance Challenge</div>
                    <div className="col-span-4 text-rose-700">The Status Quo</div>
                    <div className="col-span-4 text-emerald-700">The CommonKey Solution</div>
                  </div>

                  <div className="divide-y divide-slate-200">
                    {/* Row 1 */}
                    <div className="grid grid-cols-1 md:grid-cols-12 p-6 gap-6 items-stretch hover:bg-slate-50/70 transition-colors">
                      <div className="md:col-span-4 flex flex-col justify-center">
                        <span className="md:hidden text-xs font-bold text-slate-400 uppercase tracking-wide block mb-1">The Governance Challenge</span>
                        <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                          Finding Historical Documents
                        </h3>
                      </div>
                      <div className="md:col-span-4 h-full flex flex-col justify-start bg-rose-50/70 border border-rose-200/80 rounded-xl p-5 text-sm">
                        <span className="md:hidden text-xs font-bold text-rose-600 uppercase tracking-wide block mb-1">The Status Quo</span>
                        <div className="font-bold text-rose-900 mb-1.5 flex items-center gap-1.5">
                          <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                          <span>The "Billable Meter"</span>
                        </div>
                        <p className="text-xs sm:text-sm text-rose-900/80 leading-relaxed flex-1">
                          Paying your strata manager expensive hourly admin fees just to dig up a 5-year-old roof warranty.
                        </p>
                      </div>
                      <div className="md:col-span-4 h-full flex flex-col justify-start bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-5 text-sm">
                        <span className="md:hidden text-xs font-bold text-emerald-600 uppercase tracking-wide block mb-1">The CommonKey Solution</span>
                        <div className="font-bold text-emerald-900 mb-1.5 flex items-center gap-1.5">
                          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>Instant Self-Serve</span>
                        </div>
                        <p className="text-xs sm:text-sm text-emerald-900/80 leading-relaxed flex-1">
                          A free, lightning-fast archive where any committee member can find records and context in seconds.
                        </p>
                      </div>
                    </div>

                    {/* Row 2 */}
                    <div className="grid grid-cols-1 md:grid-cols-12 p-6 gap-6 items-stretch hover:bg-slate-50/70 transition-colors">
                      <div className="md:col-span-4 flex flex-col justify-center">
                        <span className="md:hidden text-xs font-bold text-slate-400 uppercase tracking-wide block mb-1">The Governance Challenge</span>
                        <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                          Statutory Compliance
                        </h3>
                      </div>
                      <div className="md:col-span-4 h-full flex flex-col justify-start bg-rose-50/70 border border-rose-200/80 rounded-xl p-5 text-sm">
                        <span className="md:hidden text-xs font-bold text-rose-600 uppercase tracking-wide block mb-1">The Status Quo</span>
                        <div className="font-bold text-rose-900 mb-1.5 flex items-center gap-1.5">
                          <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                          <span>The Liability Trap</span>
                        </div>
                        <p className="text-xs sm:text-sm text-rose-900/80 leading-relaxed flex-1">
                          Third-party contractors miss fire or lift audits, but the volunteer committee holds the legal and financial liability.
                        </p>
                      </div>
                      <div className="md:col-span-4 h-full flex flex-col justify-start bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-5 text-sm">
                        <span className="md:hidden text-xs font-bold text-emerald-600 uppercase tracking-wide block mb-1">The CommonKey Solution</span>
                        <div className="font-bold text-emerald-900 mb-1.5 flex items-center gap-1.5">
                          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>Automated Protection</span>
                        </div>
                        <p className="text-xs sm:text-sm text-emerald-900/80 leading-relaxed flex-1">
                          Real-time visual tracking of statutory deadlines so you are never caught off guard.
                        </p>
                      </div>
                    </div>

                    {/* Row 3 */}
                    <div className="grid grid-cols-1 md:grid-cols-12 p-6 gap-6 items-stretch hover:bg-slate-50/70 transition-colors">
                      <div className="md:col-span-4 flex flex-col justify-center">
                        <span className="md:hidden text-xs font-bold text-slate-400 uppercase tracking-wide block mb-1">The Governance Challenge</span>
                        <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                          Committee Handover
                        </h3>
                      </div>
                      <div className="md:col-span-4 h-full flex flex-col justify-start bg-rose-50/70 border border-rose-200/80 rounded-xl p-5 text-sm">
                        <span className="md:hidden text-xs font-bold text-rose-600 uppercase tracking-wide block mb-1">The Status Quo</span>
                        <div className="font-bold text-rose-900 mb-1.5 flex items-center gap-1.5">
                          <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                          <span>Starting from Scratch</span>
                        </div>
                        <p className="text-xs sm:text-sm text-rose-900/80 leading-relaxed flex-1">
                          When a key volunteer moves on, years of context are lost.
                        </p>
                      </div>
                      <div className="md:col-span-4 h-full flex flex-col justify-start bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-5 text-sm">
                        <span className="md:hidden text-xs font-bold text-emerald-600 uppercase tracking-wide block mb-1">The CommonKey Solution</span>
                        <div className="font-bold text-emerald-900 mb-1.5 flex items-center gap-1.5">
                          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>Permanent Institutional Memory</span>
                        </div>
                        <p className="text-xs sm:text-sm text-emerald-900/80 leading-relaxed flex-1">
                          An unbroken ledger of decisions and rationale that stays with the property forever.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </section>

          {/* 5. CORE MODULES / FEATURES */}
          <section id="features" className="py-24 bg-white border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto text-center mb-20">
                <FadeIn>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight mb-4">
                    Everything Your Committee Needs to Govern With Confidence
                  </h2>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    Purpose-built modules that give volunteer committees institutional-grade control over compliance, active projects, and operational records.
                  </p>
                </FadeIn>
              </div>

              <div className="space-y-24 max-w-6xl mx-auto">
                {/* Module 1: Compliance - Text Left, Image Right */}
                <div className="grid lg:grid-cols-12 gap-10 items-center">
                  <FadeIn className="lg:col-span-5 space-y-5">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-bold tracking-wider uppercase">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Statutory Compliance</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                      Never Miss an Audit (and Protect Yourself from Liability)
                    </h3>
                    <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                      Stop worrying about what you might have forgotten. CommonKey provides real-time, visual tracking of fire safety, lift audits, and statutory deadlines.
                    </p>
                    <ul className="space-y-3 pt-2 text-sm text-slate-700 font-medium">
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Automated alerts for critical renewals.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Clear matrix of upcoming deadlines.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Zero reliance on third-party contractor memory.</span>
                      </li>
                    </ul>
                  </FadeIn>

                  <FadeIn delay={0.2} className="lg:col-span-7">
                    <BrowserFrame 
                      src={ASSETS.compliance} 
                      alt="CommonKey Compliance Matrix"
                      badge="Statutory Compliance"
                    />
                  </FadeIn>
                </div>

                {/* Module 2: Project Management - Image Left, Text Right */}
                <div className="grid lg:grid-cols-12 gap-10 items-center">
                  <FadeIn delay={0.2} className="lg:col-span-7 order-2 lg:order-1">
                    <BrowserFrame 
                      src={ASSETS.projects} 
                      alt="CommonKey Project Management & Vendor Quotes"
                      badge="Project Management Hub"
                    />
                  </FadeIn>

                  <FadeIn className="lg:col-span-5 order-1 lg:order-2 space-y-5">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-50 border border-blue-200/80 text-blue-800 text-xs font-bold tracking-wider uppercase">
                      <Layers className="w-4 h-4 text-blue-600" />
                      <span>Project Management</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                      Stop Losing Vendor Quotes in Messy Email Chains
                    </h3>
                    <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                      Take the chaos out of major repairs. Log building projects, compare vendor quotes side-by-side, and vote without the email clutter.
                    </p>
                    <ul className="space-y-3 pt-2 text-sm text-slate-700 font-medium">
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span>Transparent voting on contractors.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span>Budget scopes and side-by-side quote comparisons.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span>Permanent warranty and defect rectification logs so warranties never lapse.</span>
                      </li>
                    </ul>
                  </FadeIn>
                </div>

                {/* Module 3: Decision History - Text Left, Image Right */}
                <div className="grid lg:grid-cols-12 gap-10 items-center">
                  <FadeIn className="lg:col-span-5 space-y-5">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-purple-50 border border-purple-200/80 text-purple-800 text-xs font-bold tracking-wider uppercase">
                      <History className="w-4 h-4 text-purple-600" />
                      <span>Decision History</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                      Hand Over the Reins Without the Guilt
                    </h3>
                    <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                      Step down from the committee knowing the building won't fall apart. Maintain an unalterable activity trail of every decision, document view, and vendor change.
                    </p>
                    <ul className="space-y-3 pt-2 text-sm text-slate-700 font-medium">
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                        <span>Centralised AGM/EGM resolution rationale (know why a by-law was changed).</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                        <span>Seamless, instant onboarding for new committee members.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                        <span>An immutable audit ledger for complete transparency.</span>
                      </li>
                    </ul>
                  </FadeIn>

                  <FadeIn delay={0.2} className="lg:col-span-7">
                    <BrowserFrame 
                      src={ASSETS.activityLog} 
                      alt="CommonKey Immutable Activity Log"
                      badge="Audit Ledger"
                    />
                  </FadeIn>
                </div>

                {/* Module 4: The Research Hub - Image Left, Text Right */}
                <div className="grid lg:grid-cols-12 gap-10 items-center">
                  <FadeIn delay={0.2} className="lg:col-span-7 order-2 lg:order-1">
                    <BrowserFrame 
                      src={ASSETS.documents} 
                      alt="CommonKey Research Hub"
                      badge="The Research Hub"
                    />
                  </FadeIn>

                  <FadeIn className="lg:col-span-5 order-1 lg:order-2 space-y-5">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-amber-50 border border-amber-200/80 text-amber-800 text-xs font-bold tracking-wider uppercase">
                      <Search className="w-4 h-4 text-amber-600" />
                      <span>The Research Hub</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                      Find the Answer, Not Just the File.
                    </h3>
                    <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                      Stop waiting days for your strata manager to reply—or paying their hourly rate just to explain a past decision. CommonKey’s Research Hub is an intelligent search engine for your committee that does the detective work for you, instantly pulling together documents, context, and history.
                    </p>
                    <ul className="space-y-3.5 pt-2 text-sm text-slate-700">
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-1" />
                        <span>
                          <strong className="text-slate-950 font-bold">Understand the &ldquo;why&rdquo; instantly:</strong>{' '}
                          Stop wasting your weekend trying to connect the dots. The system automatically links files, vendor quotes, and past committee notes so you know exactly why a historical decision was made.
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-1" />
                        <span>
                          <strong className="text-slate-950 font-bold">Bypass the &ldquo;billable meter&rdquo;:</strong>{' '}
                          Never pay an administrative search fee again just to check a roof warranty or dig up a five-year-old by-law change.
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-1" />
                        <span>
                          <strong className="text-slate-950 font-bold">100% committee-owned:</strong>{' '}
                          Your building&apos;s operational memory is instantly accessible 24/7, completely independent of whoever is managing your strata today.
                        </span>
                      </li>
                    </ul>
                  </FadeIn>
                </div>
              </div>
            </div>
          </section>

          {/* 5B. PRICING SECTION */}
          <section id="pricing" className="py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-b border-slate-200 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <FadeIn>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight mb-6">
                    <span>Transparent Pricing.</span>
                    <span className="block mt-1 sm:mt-2 text-blue-600">Zero Search Fees.</span>
                  </h2>
                  <p className="text-slate-700 text-base sm:text-lg leading-relaxed text-balance">
                    Stop paying steep hourly rates every time you need a historical document. CommonKey secures your building for the year for less than a typical strata manager call-out. Designed to fit comfortably inside your existing Administrative Fund, you can approve this via a simple committee vote today.
                  </p>
                </FadeIn>
              </div>

              {/* Main Pricing Box */}
              <FadeIn delay={0.15}>
                <div className="bg-white border-2 border-blue-600/30 rounded-3xl shadow-xl shadow-blue-950/5 overflow-hidden transition-all hover:border-blue-600/50">
                  {/* Banner */}
                  <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white px-6 py-3.5 text-center text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 tracking-wider uppercase shadow-xs">
                    <Clock className="w-4 h-4 text-blue-200 shrink-0" />
                    <span>2026 Introductory Rate</span>
                  </div>

                  <div className="p-8 sm:p-12">
                    {/* Rate Strikethrough & Overview */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-slate-200">
                      <div>
                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          <span className="line-through text-slate-400 text-xl sm:text-2xl font-semibold decoration-red-500/80 decoration-2">
                            Standard $8/lot
                          </span>
                          <span className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                            Just $3 per lot, per month
                          </span>
                          <span className="text-xs sm:text-sm text-slate-500 font-medium">
                            (Billed annually)
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Scheme Parameters & Guarantee Grid */}
                    <div className="grid md:grid-cols-3 gap-6 py-8 border-b border-slate-200">
                      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5.5 flex flex-col justify-between">
                        <div>
                          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                            Minimum Scheme Rate
                          </div>
                          <div className="text-2xl font-black text-slate-950 mb-1 tabular-nums">
                            $299 <span className="text-sm font-semibold text-slate-600">+ GST / year</span>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            Minimum floor for boutique schemes and duplex/triplex lots (1 to 8 lots).
                          </p>
                        </div>
                      </div>

                      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5.5 flex flex-col justify-between">
                        <div>
                          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                            Large Scheme Cap
                          </div>
                          <div className="text-2xl font-black text-slate-950 mb-1 tabular-nums">
                            Maximum $899 <span className="text-sm font-semibold text-slate-600">+ GST / year</span>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            Maximum cap for buildings with 25+ lots, preventing ballooning costs.
                          </p>
                        </div>
                      </div>

                      <div className="bg-emerald-50/70 border border-emerald-200/90 rounded-2xl p-5.5 flex flex-col justify-between">
                        <div>
                          <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <ShieldCheck className="w-4 h-4 text-emerald-600" />
                            The Guarantee
                          </div>
                          <div className="text-base font-bold text-emerald-950 mb-1">
                            Zero Budget Shocks
                          </div>
                          <p className="text-xs text-emerald-900/90 leading-relaxed">
                            Lock in this exact same rate for Year 2 when you renew early, ensuring zero budget shocks at your next AGM.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Interactive Calculator Block (Positioned below the scheme parameters & guarantee cards) */}
                    <div className="bg-slate-50/90 border border-slate-200/90 rounded-2xl p-6 sm:p-8 my-8 shadow-sm">
                      <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-8">
                          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight mb-2">
                            Calculate Your Building's Cost
                          </h3>
                          <p className="text-slate-600 text-sm sm:text-base">
                            Enter your total number of lots to see your Founding Committee rate.
                          </p>
                        </div>

                        <div className="grid lg:grid-cols-12 gap-8 items-center bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
                          {/* Input controls */}
                          <div className="lg:col-span-6 space-y-5">
                            <div>
                              <div className="flex justify-between items-center mb-2">
                                <label htmlFor="lots-input" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                                  Enter Number of Lots
                                </label>
                                <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                                  {effectiveLots <= 8 
                                    ? "Minimum Floor Applied" 
                                    : effectiveLots <= 24 
                                    ? `$36/lot/yr calculation` 
                                    : "Large Scheme Cap Active"}
                                </span>
                              </div>
                              <div className="relative flex items-center">
                                <input 
                                  id="lots-input"
                                  type="number"
                                  min={1}
                                  max={300}
                                  value={lotsCount === 0 ? '' : lotsCount}
                                  onChange={(e) => {
                                    const raw = e.target.value;
                                    if (raw === '') {
                                      setLotsCount(0);
                                      return;
                                    }
                                    const parsed = parseInt(raw, 10);
                                    if (!isNaN(parsed)) {
                                      setLotsCount(Math.max(1, Math.min(300, parsed)));
                                    }
                                  }}
                                  placeholder="e.g., 12"
                                  className="w-full px-4 py-3 text-xl font-bold bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-slate-900 transition-all shadow-inner tabular-nums"
                                />
                                <span className="absolute right-4 text-sm font-semibold text-slate-400 pointer-events-none">
                                  lots
                                </span>
                              </div>
                            </div>

                            {/* Draggable slider */}
                            <div>
                              <div className="flex justify-between text-xs font-medium text-slate-500 mb-2">
                                <span>Adjust with Slider</span>
                                <span className="font-bold text-slate-900 tabular-nums">{effectiveLots} lots</span>
                              </div>
                              <input 
                                type="range"
                                min={1}
                                max={60}
                                value={Math.min(60, effectiveLots)}
                                onChange={(e) => setLotsCount(parseInt(e.target.value, 10))}
                                className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                                aria-label="Adjust lots count slider"
                              />
                              <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-mono">
                                <span>1-8 lots ($299 floor)</span>
                                <span>12 lots ($432)</span>
                                <span>25+ lots ($899 cap)</span>
                              </div>
                            </div>

                            {/* Quick selection pills */}
                            <div className="pt-1">
                              <span className="block text-xs text-slate-500 font-semibold mb-2">Quick presets:</span>
                              <div className="flex flex-wrap gap-1.5">
                                {[
                                  { label: '4 (Duplex)', val: 4 },
                                  { label: '8 (Floor)', val: 8 },
                                  { label: '12 (Townhouses)', val: 12 },
                                  { label: '18 (Mid-rise)', val: 18 },
                                  { label: '25 (Capped)', val: 25 },
                                  { label: '50 (High-rise)', val: 50 }
                                ].map((preset) => (
                                  <button
                                    key={preset.val}
                                    type="button"
                                    onClick={() => setLotsCount(preset.val)}
                                    className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors cursor-pointer border ${
                                      effectiveLots === preset.val 
                                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs' 
                                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200/80'
                                    }`}
                                  >
                                    {preset.label}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Calculated Output Display */}
                          <div className="lg:col-span-6 bg-gradient-to-br from-blue-50/90 to-indigo-50/70 border border-blue-200/90 rounded-2xl p-6 sm:p-7 text-center flex flex-col justify-center">
                            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                              Your Annual Subscription:
                            </div>

                            <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight mb-1 tabular-nums">
                              ${calculatedAnnualCost.toLocaleString()}
                              <span className="text-base sm:text-lg font-bold text-slate-600 ml-2">
                                + GST / year
                              </span>
                            </div>

                            <div className="text-xs text-slate-600 font-medium mb-3">
                              ≈ ${(calculatedAnnualCost / effectiveLots / 52).toFixed(2)}/week per apartment (${Math.round(calculatedAnnualCost / effectiveLots)}/lot/year)
                            </div>

                            <div className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs sm:text-sm font-semibold border border-emerald-200/90 mb-6 max-w-fit mx-auto">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                              <span>You are saving ${calculatedSavings.toLocaleString()}/year compared to standard pricing!</span>
                            </div>

                            <div className="space-y-3">
                              <Button 
                                href={CALENDAR_LINK}
                                className="w-full py-3.5 text-base shadow-lg shadow-blue-600/25 group"
                              >
                                Claim Your Rate & Book a Tour
                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform inline-block" />
                              </Button>

                              <p className="text-xs text-slate-500 font-medium text-center">
                                Grab a 15-minute time slot to secure your introductory pricing.
                              </p>

                              <button
                                type="button"
                                onClick={handleCopyProposal}
                                className="w-full py-2.5 px-4 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                                title="Copy a structured summary to paste into an email or AGM agenda"
                              >
                                {copiedProposal ? (
                                  <>
                                    <Check className="w-4 h-4 text-emerald-600" />
                                    <span className="text-emerald-700 font-bold">Proposal Summary Copied to Clipboard!</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-4 h-4 text-slate-500" />
                                    <span>Copy Summary for Committee Vote</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bonus White-Glove Setup Feature Box */}
                    <div className="pt-8">
                      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-blue-200/80 bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white p-6 sm:p-8 shadow-xl shadow-slate-950/15">
                        {/* Decorative Background Elements */}
                        <div className="absolute -right-20 -top-20 w-72 h-72 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute -left-20 -bottom-20 w-72 h-72 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

                        {/* Top Meta Badges Bar */}
                        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 mb-5">
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold tracking-wide uppercase shadow-xs">
                            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                            <span>Included Free For 2026 Founding Cohort</span>
                          </div>

                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold">
                            <span className="line-through text-emerald-400/70 text-[11px] font-normal">$1,500 Value</span>
                            <span>$0 Today</span>
                          </div>
                        </div>

                        {/* Main Header & Intro */}
                        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 mb-7 pb-6 border-b border-slate-800">
                          <div className="flex items-start sm:items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/25 ring-4 ring-blue-500/10">
                              <Sparkles className="w-7 h-7 text-yellow-300" />
                            </div>
                            <div>
                              <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-1">
                                Bonus White-Glove Setup
                              </h4>
                              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                                Migrating historical strata records is tedious — so our specialist team does 100% of the heavy lifting for you. Send us your messy files, and we will configure your turnkey workspace.
                              </p>
                            </div>
                          </div>

                          <div className="shrink-0">
                            <a
                              href={CALENDAR_LINK}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-md shadow-blue-600/30 active:scale-98 whitespace-nowrap cursor-pointer"
                            >
                              <span>Claim Setup on Your Call</span>
                              <ArrowRight className="w-4 h-4" />
                            </a>
                          </div>
                        </div>

                        {/* 3 Step-by-Step Value Cards */}
                        <div className="relative z-10 grid sm:grid-cols-3 gap-4 mb-6">
                          <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-4.5 backdrop-blur-xs flex flex-col justify-between">
                            <div className="flex items-center gap-2.5 mb-2.5">
                              <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">
                                01
                              </div>
                              <span className="font-bold text-sm text-white">Hand Over Raw Files</span>
                            </div>
                            <p className="text-xs text-slate-300 leading-relaxed">
                              Send your last 2 years of AGM minutes, active warranty certificates, and contractor contact sheets via email or cloud drive.
                            </p>
                          </div>

                          <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-4.5 backdrop-blur-xs flex flex-col justify-between">
                            <div className="flex items-center gap-2.5 mb-2.5">
                              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs">
                                02
                              </div>
                              <span className="font-bold text-sm text-white">We Extract & Map</span>
                            </div>
                            <p className="text-xs text-slate-300 leading-relaxed">
                              We manually audit statutory dates, populate your compliance calendar, structure project files, and upload historical records.
                            </p>
                          </div>

                          <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-4.5 backdrop-blur-xs flex flex-col justify-between">
                            <div className="flex items-center gap-2.5 mb-2.5">
                              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                                03
                              </div>
                              <span className="font-bold text-sm text-white">Turnkey Handover</span>
                            </div>
                            <p className="text-xs text-slate-300 leading-relaxed">
                              Log in to a fully configured, audit-ready portal in under 5 business days — ready for committee review and AGM distribution.
                            </p>
                          </div>
                        </div>

                        {/* Reassurance Footer Badges */}
                        <div className="relative z-10 flex flex-wrap items-center justify-center sm:justify-start gap-y-2 gap-x-6 pt-3 text-xs text-slate-400 border-t border-slate-800/80">
                          <div className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span>Zero committee hours required</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Lock className="w-4 h-4 text-blue-400 shrink-0" />
                            <span>Strict NDA & Australian data privacy</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Building2 className="w-4 h-4 text-indigo-400 shrink-0" />
                            <span>Calibrated to state strata legislation</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </section>

          {/* 6. FAQ ACCORDION */}
          <section id="faq" className="py-24 bg-[#F8FAFC] border-b border-slate-200">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <FadeIn>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
                    Frequently Asked Questions
                  </h2>
                </FadeIn>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <FadeIn key={index} delay={index * 0.04}>
                      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm transition-colors hover:border-slate-300">
                        <button
                          onClick={() => toggleFaq(index)}
                          className="w-full px-6 py-5 text-left font-bold text-base sm:text-lg text-slate-900 flex justify-between items-center gap-4 focus:outline-none"
                          aria-expanded={isOpen}
                        >
                          <span>{faq.q}</span>
                          <div className={`w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-blue-50 text-blue-600' : 'text-slate-500'}`}>
                            <ChevronDown className="w-4 h-4" />
                          </div>
                        </button>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: "easeInOut" }}
                            >
                              <div className="px-6 pb-6 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100">
                                {faq.a}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </FadeIn>
                  );
                })}
              </div>
            </div>
          </section>

          {/* 9. CONVERSION CTA */}
          <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
            
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
              <FadeIn>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6 text-balance">
                  Stop Running Your Strata Committee Out of Your Inbox.
                </h2>
                <p className="text-lg sm:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed text-balance">
                  Protect your building's history, eliminate single-person dependency, and reclaim your weekends. Lock in the Founding Committee rate before spots fill up for the year.
                </p>
                <div className="mb-10">
                  <Button 
                    href={CALENDAR_LINK}
                    className="w-full sm:w-auto px-8 sm:px-10 py-4 text-base sm:text-lg shadow-xl shadow-blue-600/30 group"
                  >
                    Claim Your Spot: Book a 30-Minute Walkthrough
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform inline-block" />
                  </Button>
                </div>

                {/* Reassurance Checklist */}
                <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-300 font-medium">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Purpose-built for committees</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>100% data ownership</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Fast assisted onboarding</span>
                  </div>
                </div>
              </FadeIn>
            </div>
          </section>
        </>
      )}

      {/* 10. FOOTER */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 py-12 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigateToHomeSection()} 
                className="flex items-center gap-2 text-white font-bold text-lg tracking-tight cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-blue-400" />
                </div>
                <span>CommonKey</span>
              </button>
            </div>
            <p className="text-center md:text-right text-xs sm:text-sm text-slate-400">
              The Independent Governance & Continuity Platform for Strata Committees.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs">
            <div className="flex items-center gap-1.5 text-slate-400">
              <Copyright className="w-3.5 h-3.5 text-slate-500" />
              <span>© 2026 CommonKey. All rights reserved.</span>
            </div>

            <div className="flex flex-wrap gap-6 text-slate-400">
              <button 
                onClick={() => navigateToHomeSection()} 
                className="hover:text-white transition-colors cursor-pointer"
              >
                Home
              </button>
              <button 
                onClick={() => navigateToHomeSection('#pricing')} 
                className="hover:text-white transition-colors cursor-pointer"
              >
                Pricing
              </button>
              <button 
                onClick={() => navigateToArticles()} 
                className="hover:text-white transition-colors cursor-pointer"
              >
                Articles
              </button>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Security & Data Ownership</a>
              <a href={CALENDAR_LINK} className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Back to Top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-40 p-3 bg-white text-slate-700 hover:text-blue-600 hover:bg-slate-50 border border-slate-200/90 rounded-full shadow-lg shadow-slate-900/10 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 cursor-pointer"
            aria-label="Scroll back to top"
            title="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
