import { describe, it, expect, beforeEach } from 'vitest';
import {
  ARTICLES,
  getAllArticles,
  formatPublicationDate,
  saveNewArticle,
  publishScheduledArticleNow,
  deleteCustomArticle,
  clearAllArticles,
  type Article
} from './articles';

describe('articles data repository', () => {
  describe('Dataset Integrity and Availability', () => {
    it('getAllArticles returns a non-empty array of articles', () => {
      const articles = getAllArticles();
      expect(Array.isArray(articles)).toBe(true);
      expect(articles.length).toBeGreaterThanOrEqual(3);
      expect(articles).toBe(ARTICLES);
    });

    it('contains all canonical published strata governance articles', () => {
      const slugs = getAllArticles().map((a) => a.slug);
      expect(slugs).toContain('software-surcharges-vs-data-sovereignty-are-you-renting-your-own-records');
      expect(slugs).toContain('document-search-fee-statutory-access-rights-vs-proprietary-gatekeepers');
      expect(slugs).toContain('schedule-b-trap-base-strata-fee-doubles');
    });
  });

  describe('Article Schema Validation', () => {
    it('enforces required schema fields for every article in the repository', () => {
      const articles = getAllArticles();

      for (const article of articles) {
        // id
        expect(typeof article.id).toBe('string');
        expect(article.id.trim().length).toBeGreaterThan(0);
        expect(article.id).toMatch(/^[a-z0-9-]+$/);

        // slug
        expect(typeof article.slug).toBe('string');
        expect(article.slug.trim().length).toBeGreaterThan(0);
        expect(article.slug).toMatch(/^[a-z0-9-]+$/);
        expect(article.slug).toBe(article.id);

        // title
        expect(typeof article.title).toBe('string');
        expect(article.title.trim().length).toBeGreaterThan(10);

        // teaser
        expect(typeof article.teaser).toBe('string');
        expect(article.teaser.trim().length).toBeGreaterThan(20);

        // tags
        expect(Array.isArray(article.tags)).toBe(true);
        expect(article.tags.length).toBeGreaterThan(0);
        article.tags.forEach((tag) => {
          expect(typeof tag).toBe('string');
          expect(tag.trim().length).toBeGreaterThan(0);
        });

        // readTime
        expect(typeof article.readTime).toBe('string');
        expect(article.readTime).toMatch(/^\d+\s+min read$/);

        // publishedAt
        expect(typeof article.publishedAt).toBe('string');
        expect(article.publishedAt.trim().length).toBeGreaterThan(0);

        // optional publishDate validation
        if (article.publishDate) {
          const parsed = Date.parse(article.publishDate);
          expect(Number.isNaN(parsed)).toBe(false);
        }

        // optional status validation
        if (article.status) {
          expect(['published', 'scheduled']).toContain(article.status);
        }

        // content sections
        expect(article.content).toBeDefined();
        expect(Array.isArray(article.content.sections)).toBe(true);
        expect(article.content.sections.length).toBeGreaterThan(0);

        for (const section of article.content.sections) {
          expect(Array.isArray(section.paragraphs)).toBe(true);
          expect(section.paragraphs.length).toBeGreaterThan(0);
          for (const para of section.paragraphs) {
            expect(typeof para).toBe('string');
            expect(para.trim().length).toBeGreaterThan(0);
          }
          if (section.heading !== undefined) {
            expect(typeof section.heading).toBe('string');
            expect(section.heading.trim().length).toBeGreaterThan(0);
          }
        }
      }
    });

    it('has exactly one featured article designated for the hero slot', () => {
      const articles = getAllArticles();
      const featuredArticles = articles.filter((a) => a.featured === true);
      expect(featuredArticles).toHaveLength(1);
      expect(featuredArticles[0].slug).toBe('software-surcharges-vs-data-sovereignty-are-you-renting-your-own-records');
    });
  });

  describe('Uniqueness of Slugs and Identifiers', () => {
    it('guarantees unique slugs across all articles', () => {
      const articles = getAllArticles();
      const slugs = articles.map((a) => a.slug);
      const uniqueSlugs = new Set(slugs);
      expect(uniqueSlugs.size).toBe(slugs.length);
    });

    it('guarantees unique IDs across all articles', () => {
      const articles = getAllArticles();
      const ids = articles.map((a) => a.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });
  });

  describe('formatPublicationDate Utility', () => {
    it('formats ISO timestamps with date and time in en-US format', () => {
      const result = formatPublicationDate('2026-08-26T09:00:00.000Z');
      expect(result).toBe('August 26, 2026 at 9:00 AM');
    });

    it('formats ISO strings with afternoon times correctly (12-hour clock with PM)', () => {
      const result = formatPublicationDate('2026-09-07T14:30');
      expect(result).toBe('September 7, 2026 at 2:30 PM');
    });

    it('formats ISO strings at midnight correctly', () => {
      const result = formatPublicationDate('2026-01-01T00:00');
      expect(result).toBe('January 1, 2026 at 12:00 AM');
    });

    it('formats YYYY-MM-DD date strings without time', () => {
      const result = formatPublicationDate('2026-08-12');
      expect(result).toBe('August 12, 2026');
    });

    it('formats YYYY-MM-DD date strings when separate timeStr is supplied', () => {
      const result = formatPublicationDate('2026-08-12', '14:30');
      expect(result).toBe('August 12, 2026 at 2:30 PM');
    });

    it('returns the input as-is for human-readable date strings without ISO formatting', () => {
      expect(formatPublicationDate('26 August 2026')).toBe('26 August 2026');
      expect(formatPublicationDate('19 August 2026')).toBe('19 August 2026');
    });

    it('returns current date formatted as Month Day, Year when input is empty string', () => {
      const result = formatPublicationDate('');
      expect(result).toMatch(/^[A-Z][a-z]+ \d{1,2}, \d{4}$/);
    });
  });

  describe('Article LocalStorage Mutation Functions', () => {
    const testArticle: Article = {
      id: 'test-governance-article',
      slug: 'test-governance-article',
      title: 'Testing Strata Digital Governance',
      teaser: 'A comprehensive evaluation of strata governance frameworks.',
      tags: ['Governance', 'Testing'],
      readTime: '2 min read',
      publishedAt: '1 October 2026',
      content: {
        sections: [
          {
            paragraphs: ['Test paragraph content.']
          }
        ]
      }
    };

    beforeEach(() => {
      localStorage.clear();
    });

    it('saveNewArticle saves article to localStorage without throwing', () => {
      const result = saveNewArticle(testArticle);
      expect(Array.isArray(result)).toBe(true);
      const savedRaw = localStorage.getItem('commonkey_articles_v2');
      expect(savedRaw).not.toBeNull();
      const parsed = JSON.parse(savedRaw!);
      expect(parsed[0].id).toBe('test-governance-article');
    });

    it('publishScheduledArticleNow updates status in storage', () => {
      const scheduledArticle: Article = {
        ...testArticle,
        id: 'scheduled-article-1',
        slug: 'scheduled-article-1',
        status: 'scheduled',
        scheduledFor: '2026-11-01T10:00:00.000Z'
      };
      saveNewArticle(scheduledArticle);
      publishScheduledArticleNow('scheduled-article-1');

      const savedRaw = localStorage.getItem('commonkey_articles_v2');
      const parsed = JSON.parse(savedRaw!);
      const published = parsed.find((a: Article) => a.id === 'scheduled-article-1');
      expect(published.status).toBe('published');
    });

    it('deleteCustomArticle removes article from storage', () => {
      saveNewArticle(testArticle);
      deleteCustomArticle('test-governance-article');
      const savedRaw = localStorage.getItem('commonkey_articles_v2');
      const parsed = JSON.parse(savedRaw!);
      expect(parsed.find((a: Article) => a.id === 'test-governance-article')).toBeUndefined();
    });

    it('clearAllArticles purges localStorage keys and returns empty array', () => {
      saveNewArticle(testArticle);
      const result = clearAllArticles();
      expect(result).toEqual([]);
      expect(localStorage.getItem('commonkey_articles_v2')).toBeNull();
    });
  });
});
