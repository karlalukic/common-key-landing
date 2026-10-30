import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import ArticlesPage from './ArticlesPage';
import { Article, getAllArticles } from '../data/articles';

const mockArticles: Article[] = [
  {
    id: 'test-article-1',
    slug: 'test-article-1',
    title: 'Test Governance Article One',
    teaser: 'Teaser summary for test article one discussing data sovereignty.',
    summary: 'Fallback summary for test article one.',
    tags: ['Data Sovereignty', 'Contracts'],
    readTime: '3 min read',
    publishedAt: '26 August 2026',
    publishDate: '2026-08-26T09:00:00.000Z',
    status: 'published',
    content: {
      lead: 'Lead introductory paragraph for article one.',
      keyTakeaways: [
        'Takeaway 1: Volunteer committees own the data.',
        'Takeaway 2: Avoid agency vendor lock-in.',
      ],
      sections: [
        {
          heading: 'Section Heading One',
          paragraphs: ['First paragraph discussing data ownership and records.'],
          highlight: 'Data sovereignty is non-negotiable for strata.',
        },
      ],
      checklistTitle: 'Committee Action Checklist',
      checklist: [
        'Review current strata management agreement',
        'Verify independent data export capabilities',
      ],
    },
  },
  {
    id: 'test-article-2',
    slug: 'test-article-2',
    title: 'Second Article on Strata Search Fees',
    teaser: 'Teaser summary for second article on statutory search fees.',
    tags: ['Records Access', 'Legislation'],
    readTime: '4 min read',
    publishedAt: '19 August 2026',
    status: 'published',
    content: {
      lead: 'Lead paragraph for article two.',
      sections: [
        {
          heading: 'Why Search Fees Exist',
          paragraphs: ['Paragraph explaining proprietary gatekeepers and archive fees.'],
        },
      ],
    },
  },
  {
    id: 'test-article-3',
    slug: 'test-article-3',
    title: 'Third Article About Schedule B Auxiliary Charges',
    teaser: 'Teaser summary for third article on hidden auxiliary charges.',
    tags: ['Strata Fees', 'Schedule B'],
    readTime: '5 min read',
    publishedAt: '12 August 2026',
    status: 'published',
    content: {
      sections: [
        {
          heading: 'Auxiliary Fee Breakdown',
          paragraphs: ['Paragraph on trade quote metering and work orders.'],
        },
      ],
    },
  },
];

describe('ArticlesPage Component', () => {
  const defaultProps = {
    articles: mockArticles,
    currentArticleSlug: undefined,
    onSelectArticle: vi.fn(),
    onBackToArticles: vi.fn(),
    onGoHome: vi.fn(),
    calendarLink: 'https://calendar.app.google/LnCqDH1YajG5Wx417',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Suite 1: Directory Index & Featured Card
  describe('Suite 1: Directory Index & Featured Card', () => {
    it('renders the header title and descriptive subtitle', () => {
      render(<ArticlesPage {...defaultProps} />);
      expect(
        screen.getByRole('heading', { name: /Published Insights for Body Corporate Committees/i })
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Independent guidance, statutory compliance breakdowns/i)
      ).toBeInTheDocument();
    });

    it('renders the featured article section with the first article', () => {
      render(<ArticlesPage {...defaultProps} />);
      expect(screen.getByText('Featured Read')).toBeInTheDocument();
      expect(
        screen.getAllByRole('heading', { name: 'Test Governance Article One' })[0]
      ).toBeInTheDocument();
      expect(screen.getByText(/Read full article/i)).toBeInTheDocument();
    });

    it('renders all article cards in the article grid', () => {
      render(<ArticlesPage {...defaultProps} />);
      expect(screen.getByRole('heading', { name: /All Articles/i })).toBeInTheDocument();
      expect(screen.getByText('Second Article on Strata Search Fees')).toBeInTheDocument();
      expect(screen.getByText('Third Article About Schedule B Auxiliary Charges')).toBeInTheDocument();
    });

    it('calls onSelectArticle when an article card is clicked', () => {
      render(<ArticlesPage {...defaultProps} />);
      const secondArticleHeading = screen.getByText('Second Article on Strata Search Fees');
      fireEvent.click(secondArticleHeading);
      expect(defaultProps.onSelectArticle).toHaveBeenCalledWith('test-article-2');
    });

    it('falls back to default articles from repository when articles prop is not provided', () => {
      const realArticles = getAllArticles();
      render(
        <ArticlesPage
          currentArticleSlug={undefined}
          onSelectArticle={defaultProps.onSelectArticle}
          onBackToArticles={defaultProps.onBackToArticles}
          onGoHome={defaultProps.onGoHome}
          calendarLink={defaultProps.calendarLink}
        />
      );
      expect(
        screen.getByRole('heading', { name: /Published Insights for Body Corporate Committees/i })
      ).toBeInTheDocument();
      expect(screen.getAllByText(realArticles[0].title).length).toBeGreaterThanOrEqual(1);
    });
  });

  // Suite 2: Keyword Search & Empty State
  describe('Suite 2: Keyword Search & Empty State', () => {
    it('filters articles based on search query in title and teaser', () => {
      render(<ArticlesPage {...defaultProps} />);
      const searchInput = screen.getByPlaceholderText(/Search articles or tags\.\.\./i);

      fireEvent.change(searchInput, { target: { value: 'Search Fees' } });

      expect(screen.getByRole('heading', { name: /Matching Articles \(1\)/i })).toBeInTheDocument();
      expect(screen.getByText('Second Article on Strata Search Fees')).toBeInTheDocument();
      expect(screen.queryByText('Third Article About Schedule B Auxiliary Charges')).not.toBeInTheDocument();
    });

    it('clears search input when clicking the clear search (X) button', () => {
      render(<ArticlesPage {...defaultProps} />);
      const searchInput = screen.getByPlaceholderText(/Search articles or tags\.\.\./i);

      fireEvent.change(searchInput, { target: { value: 'Search Fees' } });
      const clearBtn = screen.getByRole('button', { name: /Clear search/i });
      expect(clearBtn).toBeInTheDocument();

      fireEvent.click(clearBtn);

      expect(searchInput).toHaveValue('');
      expect(screen.getByRole('heading', { name: /All Articles/i })).toBeInTheDocument();
      expect(screen.getByText('Third Article About Schedule B Auxiliary Charges')).toBeInTheDocument();
    });

    it('displays empty state with reset button when query has no matches', () => {
      render(<ArticlesPage {...defaultProps} />);
      const searchInput = screen.getByPlaceholderText(/Search articles or tags\.\.\./i);

      fireEvent.change(searchInput, { target: { value: 'NonExistentTopic999' } });

      expect(screen.getByRole('heading', { name: /No matching articles/i })).toBeInTheDocument();
      expect(
        screen.getByText(/We couldn't find any articles matching your search query or selected tag filter\./i)
      ).toBeInTheDocument();

      const clearFiltersBtn = screen.getByRole('button', { name: /Clear Search Filters/i });
      fireEvent.click(clearFiltersBtn);

      expect(screen.getByRole('heading', { name: /All Articles/i })).toBeInTheDocument();
      expect(screen.getAllByText('Test Governance Article One').length).toBeGreaterThanOrEqual(1);
    });
  });

  // Suite 3: Tag Pill Filtering
  describe('Suite 3: Tag Pill Filtering', () => {
    it('renders all tag pill buttons including All Tags', () => {
      render(<ArticlesPage {...defaultProps} />);
      expect(screen.getByRole('button', { name: 'All Tags' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Data Sovereignty' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Records Access' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Strata Fees' })).toBeInTheDocument();
    });

    it('filters articles when clicking a tag pill and provides a reset button', () => {
      render(<ArticlesPage {...defaultProps} />);
      const dataSovereigntyTag = screen.getByRole('button', { name: 'Data Sovereignty' });

      fireEvent.click(dataSovereigntyTag);

      expect(screen.getByRole('heading', { name: /Matching Articles \(1\)/i })).toBeInTheDocument();
      expect(screen.getByText('Test Governance Article One')).toBeInTheDocument();
      expect(screen.queryByText('Second Article on Strata Search Fees')).not.toBeInTheDocument();

      // Reset filter button
      const resetBtn = screen.getByRole('button', { name: /Reset filter/i });
      fireEvent.click(resetBtn);

      expect(screen.getByRole('heading', { name: /All Articles/i })).toBeInTheDocument();
      expect(screen.getByText('Second Article on Strata Search Fees')).toBeInTheDocument();
    });
  });

  // Suite 4: Article Detail View (Breadcrumbs, Takeaways, Checklist)
  describe('Suite 4: Article Detail View', () => {
    it('renders the complete article detail view when currentArticleSlug is set', () => {
      render(<ArticlesPage {...defaultProps} currentArticleSlug="test-article-1" />);

      // Title & lead
      expect(screen.getByRole('heading', { level: 1, name: 'Test Governance Article One' })).toBeInTheDocument();
      expect(screen.getByText('Lead introductory paragraph for article one.')).toBeInTheDocument();

      // Section & highlight
      expect(screen.getByRole('heading', { level: 2, name: 'Section Heading One' })).toBeInTheDocument();
      expect(screen.getByText('First paragraph discussing data ownership and records.')).toBeInTheDocument();
      expect(screen.getByText(/"Data sovereignty is non-negotiable for strata\."/i)).toBeInTheDocument();
    });

    it('renders breadcrumbs and navigates back to Home and Articles', () => {
      render(<ArticlesPage {...defaultProps} currentArticleSlug="test-article-1" />);

      const homeBreadcrumb = screen.getByRole('button', { name: 'Home' });
      fireEvent.click(homeBreadcrumb);
      expect(defaultProps.onGoHome).toHaveBeenCalledTimes(1);

      const articlesBreadcrumb = screen.getByRole('button', { name: 'Articles' });
      fireEvent.click(articlesBreadcrumb);
      expect(defaultProps.onBackToArticles).toHaveBeenCalledTimes(1);

      const backBtn = screen.getByRole('button', { name: /Back to all articles/i });
      fireEvent.click(backBtn);
      expect(defaultProps.onBackToArticles).toHaveBeenCalledTimes(2);
    });

    it('renders Key Governance Takeaways when present in article content', () => {
      render(<ArticlesPage {...defaultProps} currentArticleSlug="test-article-1" />);

      expect(screen.getByText(/Key Governance Takeaways/i)).toBeInTheDocument();
      expect(screen.getByText('Takeaway 1: Volunteer committees own the data.')).toBeInTheDocument();
      expect(screen.getByText('Takeaway 2: Avoid agency vendor lock-in.')).toBeInTheDocument();
    });

    it('renders Action Checklist when present in article content', () => {
      render(<ArticlesPage {...defaultProps} currentArticleSlug="test-article-1" />);

      expect(screen.getByText('Committee Action Checklist')).toBeInTheDocument();
      expect(screen.getByText('Review current strata management agreement')).toBeInTheDocument();
      expect(screen.getByText('Verify independent data export capabilities')).toBeInTheDocument();
    });

    it('renders related articles section and selects related article on click', () => {
      render(<ArticlesPage {...defaultProps} currentArticleSlug="test-article-1" />);

      expect(screen.getByRole('heading', { name: /More Governance Articles/i })).toBeInTheDocument();
      const relatedArticle = screen.getByText('Second Article on Strata Search Fees');
      fireEvent.click(relatedArticle);

      expect(defaultProps.onSelectArticle).toHaveBeenCalledWith('test-article-2');
    });

    it('renders the walkthrough CTA banner in article detail view', () => {
      render(<ArticlesPage {...defaultProps} currentArticleSlug="test-article-1" />);

      expect(screen.getByText(/Keep your building's permanent history in committee hands\./i)).toBeInTheDocument();
      const ctaLink = screen.getByRole('link', { name: /Book 30-Min Walkthrough/i });
      expect(ctaLink).toHaveAttribute('href', defaultProps.calendarLink);
      expect(ctaLink).toHaveAttribute('target', '_blank');
    });
  });

  // Suite 5: Social Share Link Copying
  describe('Suite 5: Social Share Link Copying', () => {
    it('copies the article URL to clipboard and displays confirmation badge', async () => {
      render(<ArticlesPage {...defaultProps} currentArticleSlug="test-article-1" />);

      const shareBtn = screen.getByRole('button', { name: /Share article/i });
      expect(shareBtn).toBeInTheDocument();

      fireEvent.click(shareBtn);

      expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1);
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(window.location.href);

      expect(screen.getByText('Link copied!')).toBeInTheDocument();
    });
  });
});
