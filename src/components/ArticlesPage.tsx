import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Clock, 
  Calendar, 
  ArrowLeft, 
  ArrowRight, 
  Share2, 
  CheckCircle2, 
  BookOpen, 
  ShieldCheck, 
  Building2,
  Tag,
  Check,
  Sparkles,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getAllArticles, Article } from '../data/articles';
import { ArticleMarkdownRenderer } from './ArticleMarkdownRenderer';

interface ArticlesPageProps {
  articles?: Article[];
  currentArticleSlug?: string;
  onSelectArticle: (slug: string) => void;
  onBackToArticles: () => void;
  onGoHome: () => void;
  calendarLink: string;
}

export default function ArticlesPage({
  articles: propArticles,
  currentArticleSlug,
  onSelectArticle,
  onBackToArticles,
  onGoHome,
  calendarLink
}: ArticlesPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [copiedLink, setCopiedLink] = useState(false);

  const articles = useMemo(() => {
    return Array.isArray(propArticles)
      ? propArticles
      : getAllArticles() || [];
  }, [propArticles]);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    articles.forEach((a) => {
      if (Array.isArray(a.tags) && a.tags.length > 0) {
        a.tags.forEach((t) => {
          if (t && typeof t === 'string' && t.trim()) tagSet.add(t.trim());
        });
      } else if (a.category) {
        tagSet.add(a.category);
      }
    });
    return ['All', ...Array.from(tagSet)];
  }, [articles]);

  const currentArticle = useMemo(() => {
    if (!currentArticleSlug) return null;
    return (articles || []).find((a) => a && a.slug === currentArticleSlug) || null;
  }, [currentArticleSlug, articles]);

  const filteredArticles = useMemo(() => {
    return (articles || []).filter((article) => {
      if (!article) return false;
      const articleTags = Array.isArray(article.tags) && article.tags.length > 0
        ? article.tags
        : (article.category ? [article.category] : []);
      
      const matchesTag = selectedTag === 'All' || articleTags.includes(selectedTag);
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        (article.title || '').toLowerCase().includes(query) ||
        (article.teaser || '').toLowerCase().includes(query) ||
        (article.summary || '').toLowerCase().includes(query) ||
        articleTags.some((t) => t.toLowerCase().includes(query));

      return matchesTag && matchesSearch;
    });
  }, [searchQuery, selectedTag, articles]);

  const featuredArticle = useMemo(() => {
    // The most recent article is always the featured article
    return (articles && articles.length > 0) ? articles[0] : null;
  }, [articles]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // If viewing a single article
  if (currentArticle) {
    const relatedArticles = articles.filter((a) => a.slug !== currentArticle.slug).slice(0, 2);

    return (
      <div className="py-12 sm:py-16 bg-[#F8FAFC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mb-8 flex-wrap">
            <button 
              onClick={onGoHome} 
              className="hover:text-slate-900 transition-colors"
            >
              Home
            </button>
            <span>/</span>
            <button 
              onClick={onBackToArticles} 
              className="hover:text-slate-900 transition-colors"
            >
              Articles
            </button>
            <span>/</span>
            <span className="text-slate-900 font-medium truncate max-w-xs sm:max-w-md">
              {currentArticle.title}
            </span>
          </nav>

          {/* Back button & Share */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={onBackToArticles}
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to all articles
            </button>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors shadow-sm cursor-pointer"
              title="Copy link to article"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Link copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-slate-500" />
                  <span>Share article</span>
                </>
              )}
            </button>
          </div>

          {/* Article Header */}
          <header className="mb-10 bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm">
            <div className="flex flex-wrap items-center gap-2 mb-4 text-xs font-semibold text-slate-500">
              {(currentArticle.tags && currentArticle.tags.length > 0
                ? currentArticle.tags
                : (currentArticle.category ? [currentArticle.category] : [])
              ).map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    setSelectedTag(tag);
                    onBackToArticles();
                  }}
                  className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors font-semibold text-xs border border-blue-100/80 cursor-pointer"
                  title={`Filter articles by ${tag}`}
                >
                  {tag}
                </button>
              ))}
              <span className="flex items-center gap-1.5 ml-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {currentArticle.readTime}
              </span>
              <span>•</span>
              {currentArticle.status === 'scheduled' && currentArticle.scheduledFor && new Date(currentArticle.scheduledFor).getTime() > Date.now() ? (
                <span className="inline-flex items-center gap-1.5 text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full font-bold text-xs">
                  <Clock className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                  Scheduled for {currentArticle.publishedAt}
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {currentArticle.publishedAt}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight mb-6">
              {currentArticle.title}
            </h1>

            {currentArticle.content?.lead && (
              <p className="text-lg text-slate-600 leading-relaxed">
                {currentArticle.content.lead}
              </p>
            )}
          </header>

          {/* Key Takeaways Box (rendered only if explicitly provided) */}
          {Array.isArray(currentArticle.content?.keyTakeaways) && currentArticle.content.keyTakeaways.length > 0 && (
            <div className="bg-blue-50/60 border border-blue-200/80 rounded-xl p-6 sm:p-8 mb-10">
              <div className="flex items-center gap-2 text-sm font-bold text-blue-900 uppercase tracking-wider mb-4">
                <ShieldCheck className="w-5 h-5 text-blue-700" />
                Key Governance Takeaways
              </div>
              <ul className="space-y-3">
                {(currentArticle.content.keyTakeaways || []).map((takeaway, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Article Main Body */}
          <article className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-10 shadow-sm space-y-8 mb-12">
            {(currentArticle.content?.sections || []).map((section, idx) => {
              const paragraphs = Array.isArray(section.paragraphs)
                ? section.paragraphs
                : (typeof section.paragraphs === 'string' ? [section.paragraphs] : []);

              return (
                <div key={idx} className={idx > 0 ? "pt-6 border-t border-slate-100" : ""}>
                  {section.heading && (
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-950 tracking-tight mb-4">
                      {section.heading}
                    </h2>
                  )}
                  <div className="space-y-4 text-slate-700 text-base leading-relaxed">
                    {paragraphs.map((p, pIdx) => (
                      <ArticleMarkdownRenderer key={pIdx} content={p} />
                    ))}
                  </div>
                  {section.highlight && (
                    <div className="mt-6 p-4 sm:p-5 border-l-4 border-blue-600 bg-slate-50 rounded-r-lg italic text-slate-800 text-sm sm:text-base font-medium">
                      "{section.highlight}"
                    </div>
                  )}
                </div>
              );
            })}

            {/* Checklist if present */}
            {Array.isArray(currentArticle.content?.checklist) && currentArticle.content.checklist.length > 0 && (
              <div className="pt-6 border-t border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-emerald-600" />
                  {currentArticle.content?.checklistTitle || 'Action Checklist'}
                </h3>
                <div className="space-y-2.5">
                  {currentArticle.content.checklist.map((item, cIdx) => (
                    <div key={cIdx} className="flex items-start gap-3 text-sm text-slate-700 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                      <div className="w-5 h-5 rounded border border-slate-300 bg-white flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-slate-700" />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* Walkthrough CTA Banner */}
          <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-10 mb-16 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="max-w-xl">
              <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">
                Independent Building Sovereignty
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Keep your building's permanent history in committee hands.
              </h3>
              <p className="text-sm text-slate-300">
                Experience how CommonKey streamlines compliance milestones, documents, and project management handovers.
              </p>
            </div>
            <a
              href={calendarLink}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-lg shadow-lg hover:shadow-blue-500/25 transition-all inline-flex items-center gap-2"
            >
              Book 30-Min Walkthrough
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Related Articles */}
          <div className="border-t border-slate-200 pt-10">
            <h3 className="text-xl font-bold text-slate-900 mb-6">
              More Governance Articles
            </h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {(relatedArticles || []).map((rel) => (
                <div 
                  key={rel.id} 
                  onClick={() => onSelectArticle(rel.slug)}
                  className="bg-white border border-slate-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {(rel.tags && rel.tags.length > 0
                        ? rel.tags
                        : (rel.category ? [rel.category] : [])
                      ).slice(0, 3).map((tag) => (
                        <span key={tag} className="text-[11px] font-semibold text-blue-700">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h4 className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors text-base mb-2">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-slate-600 line-clamp-2">
                      {rel.teaser || rel.summary}
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span>{rel.readTime}</span>
                    <span className="text-blue-700 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                      Read article <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    );
  }

  // Articles Directory View
  return (
    <div className="py-12 sm:py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Hero */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-700 tracking-wider uppercase mb-3">
              <BookOpen className="w-4 h-4" />
              Articles & Governance Resources
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight mb-4">
              Published Insights for Body Corporate Committees
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Independent guidance, statutory compliance breakdowns, and operational playbooks designed to protect Australian volunteer committees from key person dependencies and costly administrative fees.
            </p>
          </div>
        </div>

        {articles.length > 0 && (
          <>
            {/* Search & Tag Filter Bar */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 mb-12 shadow-sm">
              <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                {/* Search Input */}
                <div className="relative w-full md:w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search articles or tags..."
                    className="w-full pl-10 pr-9 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-slate-900"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-md transition-colors"
                      aria-label="Clear search"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Tag Pills */}
                <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                        selectedTag === tag
                          ? 'bg-slate-900 text-white shadow-sm'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                      }`}
                    >
                      {tag === 'All' ? 'All Tags' : tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Featured Article (if no specific search/filter query active) */}
            {selectedTag === 'All' && !searchQuery && featuredArticle && (
              <div className="mb-14">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-blue-600" />
                  Featured Read
                </div>
                <div 
                  onClick={() => onSelectArticle(featuredArticle.slug)}
                  className="bg-white border border-slate-200 hover:border-blue-300 rounded-2xl p-6 sm:p-10 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col lg:flex-row gap-8 items-start justify-between"
                >
                  <div className="max-w-2xl">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-3 flex-wrap">
                      {(featuredArticle.tags && featuredArticle.tags.length > 0
                        ? featuredArticle.tags
                        : (featuredArticle.category ? [featuredArticle.category] : [])
                      ).map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 font-semibold text-[11px] border border-blue-100/60"
                        >
                          {tag}
                        </span>
                      ))}
                      <span className="text-slate-300">•</span>
                      <span>{featuredArticle.readTime}</span>
                      <span className="text-slate-300">•</span>
                      {featuredArticle.status === 'scheduled' && featuredArticle.scheduledFor && new Date(featuredArticle.scheduledFor).getTime() > Date.now() ? (
                        <span className="inline-flex items-center gap-1.5 text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full font-bold text-[11px]">
                          <Clock className="w-3 h-3 text-amber-600 animate-pulse" />
                          Scheduled: {featuredArticle.publishedAt}
                        </span>
                      ) : (
                        <span>{featuredArticle.publishedAt}</span>
                      )}
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 group-hover:text-blue-700 transition-colors tracking-tight leading-tight mb-4">
                      {featuredArticle.title}
                    </h2>
                    <p className="text-slate-600 text-base leading-relaxed">
                      {featuredArticle.teaser || featuredArticle.summary}
                    </p>
                  </div>
                  <div className="w-full lg:w-auto lg:self-center shrink-0">
                    <span className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-blue-50 text-blue-700 font-semibold text-sm group-hover:bg-blue-600 group-hover:text-white transition-all w-full lg:w-auto">
                      Read full article
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Article Grid */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-950">
                  {searchQuery || selectedTag !== 'All' ? `Matching Articles (${filteredArticles.length})` : 'All Articles'}
                </h2>
                {selectedTag !== 'All' && (
                  <button
                    onClick={() => setSelectedTag('All')}
                    className="text-xs text-blue-700 hover:underline font-semibold cursor-pointer"
                  >
                    Reset filter
                  </button>
                )}
              </div>

              {filteredArticles.length === 0 ? (
                <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center max-w-lg mx-auto">
                  <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-4" />
                  <h3 className="font-bold text-slate-900 text-lg mb-2">
                    No matching articles
                  </h3>
                  <p className="text-sm text-slate-500 mb-6">
                    We couldn't find any articles matching your search query or selected tag filter.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedTag('All');
                    }}
                    className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Clear Search Filters
                  </button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {filteredArticles.map((article) => (
                    <div
                      key={article.id}
                      onClick={() => onSelectArticle(article.slug)}
                      className="bg-white border border-slate-200 hover:border-blue-300 rounded-xl p-6 sm:p-7 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex flex-wrap items-center gap-1.5 mb-3">
                          {(article.tags && article.tags.length > 0
                            ? article.tags
                            : (article.category ? [article.category] : [])
                          ).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium text-[11px]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                          <span>{article.readTime}</span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors tracking-tight leading-snug mb-3">
                          {article.title}
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-6">
                          {article.teaser || article.summary}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs flex-wrap gap-2">
                        <div className="flex items-center gap-1.5 text-slate-500">
                          <span>{article.publishedAt}</span>
                        </div>
                        <span className="text-blue-700 font-semibold group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                          Read <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
