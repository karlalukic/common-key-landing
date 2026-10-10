import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ArticleMarkdownRenderer } from './ArticleMarkdownRenderer';

describe('ArticleMarkdownRenderer', () => {
  describe('Resilience and Container Rendering', () => {
    it('returns null when content is empty string', () => {
      const { container } = render(<ArticleMarkdownRenderer content="" />);
      expect(container.firstChild).toBeNull();
    });

    it('renders outer container with default typography classes', () => {
      const { container } = render(<ArticleMarkdownRenderer content="Simple paragraph text." />);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).not.toBeNull();
      expect(wrapper).toHaveClass('article-content-rendered');
      expect(wrapper).toHaveClass('prose');
      expect(wrapper).toHaveClass('prose-slate');
      expect(wrapper).toHaveClass('max-w-none');
    });

    it('appends custom className to the root container', () => {
      const { container } = render(
        <ArticleMarkdownRenderer content="Test content" className="custom-test-class mt-4" />
      );
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('custom-test-class');
      expect(wrapper).toHaveClass('mt-4');
      expect(wrapper).toHaveClass('article-content-rendered');
    });
  });

  describe('Headings and Typography', () => {
    it('renders h1, h2, and h3 with appropriate styling classes', () => {
      const markdown = `
# Main Article Title
## Key Section Heading
### Subsection Heading
      `;
      render(<ArticleMarkdownRenderer content={markdown} />);

      const h1 = screen.getByRole('heading', { level: 1, name: 'Main Article Title' });
      expect(h1).toBeInTheDocument();
      expect(h1).toHaveClass('text-2xl', 'font-extrabold', 'text-slate-950');

      const h2 = screen.getByRole('heading', { level: 2, name: 'Key Section Heading' });
      expect(h2).toBeInTheDocument();
      expect(h2).toHaveClass('text-xl', 'font-bold', 'text-slate-900', 'border-b');

      const h3 = screen.getByRole('heading', { level: 3, name: 'Subsection Heading' });
      expect(h3).toBeInTheDocument();
      expect(h3).toHaveClass('text-lg', 'font-bold', 'text-slate-900');
    });

    it('renders paragraphs, strong bold text, and emphasis italics', () => {
      const markdown = 'This is a **bold claim** and an *italic note* in a paragraph.';
      render(<ArticleMarkdownRenderer content={markdown} />);

      const paragraph = screen.getByText(/This is a/i);
      expect(paragraph.tagName).toBe('P');
      expect(paragraph).toHaveClass('text-slate-700', 'leading-relaxed');

      const strong = screen.getByText('bold claim');
      expect(strong.tagName).toBe('STRONG');
      expect(strong).toHaveClass('font-bold', 'text-slate-900');

      const em = screen.getByText('italic note');
      expect(em.tagName).toBe('EM');
      expect(em).toHaveClass('italic', 'text-slate-800');
    });

    it('renders horizontal divider rule', () => {
      const markdown = 'Above divider\n\n---\n\nBelow divider';
      const { container } = render(<ArticleMarkdownRenderer content={markdown} />);

      const hr = container.querySelector('hr');
      expect(hr).toBeInTheDocument();
      expect(hr).toHaveClass('my-6', 'border-slate-200');
    });
  });

  describe('Blockquotes', () => {
    it('renders blockquote with custom blue border styling', () => {
      const markdown = '> "Committees should control their historical vendor data."';
      render(<ArticleMarkdownRenderer content={markdown} />);

      const blockquote = screen.getByText(/"Committees should control their historical vendor data\."/i).closest('blockquote');
      expect(blockquote).toBeInTheDocument();
      expect(blockquote).toHaveClass('border-l-4', 'border-blue-600', 'bg-blue-50/50', 'rounded-r-xl');
    });
  });

  describe('Lists', () => {
    it('renders unordered list with bullet styles', () => {
      const markdown = `
* First item
* Second item
* Third item
      `;
      render(<ArticleMarkdownRenderer content={markdown} />);

      const list = screen.getByRole('list');
      expect(list.tagName).toBe('UL');
      expect(list).toHaveClass('list-disc', 'list-outside', 'pl-5');

      const items = screen.getAllByRole('listitem');
      expect(items).toHaveLength(3);
      expect(items[0]).toHaveTextContent('First item');
      expect(items[1]).toHaveTextContent('Second item');
      expect(items[2]).toHaveTextContent('Third item');
    });

    it('renders ordered list with decimal styles', () => {
      const markdown = `
1. Step one
2. Step two
      `;
      render(<ArticleMarkdownRenderer content={markdown} />);

      const list = screen.getByRole('list');
      expect(list.tagName).toBe('OL');
      expect(list).toHaveClass('list-decimal', 'list-outside', 'pl-5');

      const items = screen.getAllByRole('listitem');
      expect(items).toHaveLength(2);
      expect(items[0]).toHaveTextContent('Step one');
      expect(items[1]).toHaveTextContent('Step two');
    });
  });

  describe('Inline and Block Code', () => {
    it('renders inline code with gray pill styling', () => {
      const markdown = 'Use `localStorage.getItem()` for persistent state.';
      render(<ArticleMarkdownRenderer content={markdown} />);

      const code = screen.getByText('localStorage.getItem()');
      expect(code.tagName).toBe('CODE');
      expect(code).toHaveClass('bg-slate-100', 'text-slate-800', 'font-mono');
      expect(code).not.toHaveClass('block');
    });

    it('renders fenced code blocks with dark container styling', () => {
      const markdown = '```ts\nconst test = "strata";\nconsole.log(test);\n```';
      const { container } = render(<ArticleMarkdownRenderer content={markdown} />);

      const codeBlock = container.querySelector('code.block');
      expect(codeBlock).toBeInTheDocument();
      expect(codeBlock).toHaveClass('bg-slate-900', 'text-slate-100', 'font-mono', 'rounded-xl');
      expect(codeBlock?.textContent).toContain('const test = "strata";');
    });
  });

  describe('Links and External Link Target Handling', () => {
    it('renders external HTTPS links with target="_blank", rel="noopener noreferrer", and ExternalLink icon', () => {
      const markdown = '[ACCC Report](https://www.accc.gov.au/report)';
      render(<ArticleMarkdownRenderer content={markdown} />);

      const link = screen.getByRole('link', { name: /ACCC Report/i });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', 'https://www.accc.gov.au/report');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');

      const icon = link.querySelector('svg');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass('text-blue-500');
    });

    it('renders protocol-relative links as external links', () => {
      const markdown = '[Protocol Relative](//example.com/data)';
      render(<ArticleMarkdownRenderer content={markdown} />);

      const link = screen.getByRole('link', { name: /Protocol Relative/i });
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      expect(link.querySelector('svg')).toBeInTheDocument();
    });

    it('renders internal relative links without target="_blank" and without icon', () => {
      const markdown = '[Articles Directory](/articles)';
      render(<ArticleMarkdownRenderer content={markdown} />);

      const link = screen.getByRole('link', { name: /Articles Directory/i });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/articles');
      expect(link).not.toHaveAttribute('target');
      expect(link).not.toHaveAttribute('rel');
      expect(link.querySelector('svg')).toBeNull();
    });

    it('renders internal anchor links without target="_blank"', () => {
      const markdown = '[View Pricing](#pricing)';
      render(<ArticleMarkdownRenderer content={markdown} />);

      const link = screen.getByRole('link', { name: /View Pricing/i });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '#pricing');
      expect(link).not.toHaveAttribute('target');
      expect(link.querySelector('svg')).toBeNull();
    });
  });

  describe('Markdown Tables', () => {
    it('renders GFM tables with header, rows, and responsive scroll wrapper', () => {
      const markdown = `
| Feature | CommonKey | Traditional Agent |
| :--- | :--- | :--- |
| Ownership | Body Corporate | Agency Locked |
| Search Fee | $0 Self-serve | $180/hr Billable |
      `;
      const { container } = render(<ArticleMarkdownRenderer content={markdown} />);

      const tableWrapper = container.querySelector('.overflow-x-auto');
      expect(tableWrapper).toBeInTheDocument();
      expect(tableWrapper).toHaveClass('border-slate-200', 'rounded-xl');

      const table = screen.getByRole('table');
      expect(table).toBeInTheDocument();
      expect(table).toHaveClass('min-w-full', 'divide-y');

      const headers = screen.getAllByRole('columnheader');
      expect(headers).toHaveLength(3);
      expect(headers[0]).toHaveTextContent('Feature');
      expect(headers[1]).toHaveTextContent('CommonKey');
      expect(headers[2]).toHaveTextContent('Traditional Agent');

      const rows = screen.getAllByRole('row');
      expect(rows).toHaveLength(3);

      const cells = screen.getAllByRole('cell');
      expect(cells).toHaveLength(6);
      expect(cells[0]).toHaveTextContent('Ownership');
      expect(cells[1]).toHaveTextContent('Body Corporate');
      expect(cells[2]).toHaveTextContent('Agency Locked');
    });
  });

  describe('Raw HTML Embedded Elements', () => {
    it('parses inline raw HTML markup via rehype-raw without escaping', () => {
      const markdown = 'Important: <span class="custom-badge font-bold">Verified Statutory Right</span> for all owners.';
      const { container } = render(<ArticleMarkdownRenderer content={markdown} />);

      const span = container.querySelector('.custom-badge');
      expect(span).toBeInTheDocument();
      expect(span).toHaveTextContent('Verified Statutory Right');
    });
  });
});
