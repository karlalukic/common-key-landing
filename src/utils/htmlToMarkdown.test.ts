import { describe, it, expect } from 'vitest';
import {
  hasRichFormatting,
  normalizePlainText,
  htmlToMarkdown
} from './htmlToMarkdown';

describe('htmlToMarkdown utility', () => {
  describe('hasRichFormatting', () => {
    it('returns true when HTML contains structural formatting tags', () => {
      expect(hasRichFormatting('<h1>Title</h1>')).toBe(true);
      expect(hasRichFormatting('<h2>Heading 2</h2>')).toBe(true);
      expect(hasRichFormatting('<p>Paragraph text</p>')).toBe(true);
      expect(hasRichFormatting('<strong>Bold</strong>')).toBe(true);
      expect(hasRichFormatting('<b>Bold</b>')).toBe(true);
      expect(hasRichFormatting('<em>Italic</em>')).toBe(true);
      expect(hasRichFormatting('<i>Italic</i>')).toBe(true);
      expect(hasRichFormatting('<u>Underline</u>')).toBe(true);
      expect(hasRichFormatting('<s>Strike</s>')).toBe(true);
      expect(hasRichFormatting('<del>Deleted</del>')).toBe(true);
      expect(hasRichFormatting('<a href="https://example.com">Link</a>')).toBe(true);
      expect(hasRichFormatting('<ul><li>Item</li></ul>')).toBe(true);
      expect(hasRichFormatting('<ol><li>Item</li></ol>')).toBe(true);
      expect(hasRichFormatting('<blockquote>Quote</blockquote>')).toBe(true);
      expect(hasRichFormatting('<table><tr><td>Cell</td></tr></table>')).toBe(true);
      expect(hasRichFormatting('<pre><code>Code</code></pre>')).toBe(true);
      expect(hasRichFormatting('<hr />')).toBe(true);
      expect(hasRichFormatting('First line<br/>Second line')).toBe(true);
    });

    it('returns true when element contains inline formatting styles', () => {
      expect(hasRichFormatting('<span style="font-weight: bold">Bold</span>')).toBe(true);
      expect(hasRichFormatting('<span style="font-weight: bolder">Bolder</span>')).toBe(true);
      expect(hasRichFormatting('<span style="font-weight: 700">700 Weight</span>')).toBe(true);
      expect(hasRichFormatting('<span style="font-style: italic">Italic</span>')).toBe(true);
      expect(hasRichFormatting('<span style="text-decoration: underline">Underline</span>')).toBe(true);
      expect(hasRichFormatting('<span style="text-decoration: line-through">Strike</span>')).toBe(true);
    });

    it('returns false for plain unformatted text and unstyled generic spans', () => {
      expect(hasRichFormatting('Plain text without formatting')).toBe(false);
      expect(hasRichFormatting('<span>Neutral span text</span>')).toBe(false);
      expect(hasRichFormatting('')).toBe(false);
      expect(hasRichFormatting(null as any)).toBe(false);
      expect(hasRichFormatting(undefined as any)).toBe(false);
    });
  });

  describe('normalizePlainText', () => {
    it('converts unicode bullets (•, ⁃, ◦) to markdown dashes', () => {
      const input = '• First bullet\n⁃ Second bullet\n◦ Third bullet';
      const expected = '- First bullet\n- Second bullet\n- Third bullet';
      expect(normalizePlainText(input)).toBe(expected);
    });

    it('preserves indentation for nested unicode bullets', () => {
      const input = '  • Indented bullet\n    ◦ Deep bullet';
      const expected = '  - Indented bullet\n    - Deep bullet';
      expect(normalizePlainText(input)).toBe(expected);
    });

    it('converts parenthesis-numbered lists to standard markdown numbered lists', () => {
      const input = '1) First point\n2) Second point\n  1) Sub point';
      const expected = '1. First point\n2. Second point\n  1. Sub point';
      expect(normalizePlainText(input)).toBe(expected);
    });

    it('replaces non-breaking spaces with standard spaces', () => {
      const input = 'Word\u00A0with\u00A0non-breaking\u00A0spaces';
      expect(normalizePlainText(input)).toBe('Word with non-breaking spaces');
    });

    it('returns empty string when input is empty or falsy', () => {
      expect(normalizePlainText('')).toBe('');
      expect(normalizePlainText(null as any)).toBe('');
    });
  });

  describe('htmlToMarkdown conversion', () => {
    describe('Headings', () => {
      it('converts h1 through h4 to markdown hashes', () => {
        expect(htmlToMarkdown('<h1>Main Title</h1>')).toBe('# Main Title');
        expect(htmlToMarkdown('<h2>Section Title</h2>')).toBe('## Section Title');
        expect(htmlToMarkdown('<h3>Subsection</h3>')).toBe('### Subsection');
        expect(htmlToMarkdown('<h4>Minor Heading</h4>')).toBe('#### Minor Heading');
      });

      it('converts MS Word heading classes into markdown headings', () => {
        expect(htmlToMarkdown('<p class="MsoHeading1">Word Heading 1</p>')).toBe('# Word Heading 1');
        expect(htmlToMarkdown('<p class="MsoHeading2">Word Heading 2</p>')).toBe('## Word Heading 2');
        expect(htmlToMarkdown('<p class="MsoHeading3">Word Heading 3</p>')).toBe('### Word Heading 3');
      });
    });

    describe('Inline Formatting', () => {
      it('converts strong and b tags to markdown bold', () => {
        expect(htmlToMarkdown('<strong>Bold text</strong>')).toBe('**Bold text**');
        expect(htmlToMarkdown('<b>Bold text</b>')).toBe('**Bold text**');
      });

      it('converts em and i tags to markdown italics', () => {
        expect(htmlToMarkdown('<em>Italic text</em>')).toBe('*Italic text*');
        expect(htmlToMarkdown('<i>Italic text</i>')).toBe('*Italic text*');
      });

      it('converts inline CSS font weights to bold', () => {
        expect(htmlToMarkdown('<span style="font-weight: 700">Weight 700</span>')).toBe('**Weight 700**');
        expect(htmlToMarkdown('<span style="font-weight: bold">Bold span</span>')).toBe('**Bold span**');
      });

      it('converts inline CSS font styles to italics', () => {
        expect(htmlToMarkdown('<span style="font-style: italic">Italic span</span>')).toBe('*Italic span*');
      });

      it('safely keeps leading and trailing whitespace outside bold/italic delimiters', () => {
        expect(htmlToMarkdown('<b>  padded bold  </b>')).toBe('**padded bold**');
      });

      it('bypasses Google Docs fake bold container with font-weight normal', () => {
        const input = '<b id="docs-internal-guid-123" style="font-weight: normal">Google Docs Normal Text</b>';
        expect(htmlToMarkdown(input)).toBe('Google Docs Normal Text');
      });

      it('converts strikethrough tags (s, strike, del) to markdown tildes', () => {
        expect(htmlToMarkdown('<s>Outdated</s>')).toBe('~~Outdated~~');
        expect(htmlToMarkdown('<del>Removed</del>')).toBe('~~Removed~~');
      });

      it('converts underline tags to u tags', () => {
        expect(htmlToMarkdown('<u>Underlined</u>')).toBe('<u>Underlined</u>');
      });

      it('converts code tags to backticks', () => {
        expect(htmlToMarkdown('<code>const x = 1;</code>')).toBe('`const x = 1;`');
      });

      it('preserves whitespace and delimiters for adjacent bold and italic tags', () => {
        expect(htmlToMarkdown('<b>Alpha</b> <b>Beta</b>')).toBe('**Alpha** **Beta**');
        expect(htmlToMarkdown('<em>hello</em> <em>world</em>')).toBe('*hello* *world*');
        expect(htmlToMarkdown('<strong>One</strong> and <strong>Two</strong>')).toBe('**One** and **Two**');
      });
    });

    describe('Paragraphs and Spacing', () => {
      it('separates consecutive paragraphs with double newlines', () => {
        const input = '<p>First paragraph.</p><p>Second paragraph.</p>';
        expect(htmlToMarkdown(input)).toBe('First paragraph.\n\nSecond paragraph.');
      });

      it('converts br tags to single newlines', () => {
        const input = '<p>Line 1<br/>Line 2</p>';
        expect(htmlToMarkdown(input)).toBe('Line 1\nLine 2');
      });

      it('converts hr tags to markdown horizontal rules', () => {
        const input = '<p>Top</p><hr/><p>Bottom</p>';
        expect(htmlToMarkdown(input)).toBe('Top\n\n---\n\nBottom');
      });
    });

    describe('Links', () => {
      it('converts hyperlinks to markdown format [text](href)', () => {
        const input = '<a href="https://commonkeyapp.com">CommonKey Platform</a>';
        expect(htmlToMarkdown(input)).toBe('[CommonKey Platform](https://commonkeyapp.com)');
      });

      it('outputs bare URL when link has no inner text', () => {
        const input = '<a href="https://commonkeyapp.com"></a>';
        expect(htmlToMarkdown(input)).toBe('https://commonkeyapp.com');
      });

      it('strips javascript: pseudoprotocol links', () => {
        const input = '<a href="javascript:alert(1)">Click Here</a>';
        expect(htmlToMarkdown(input)).toBe('Click Here');
      });
    });

    describe('Blockquotes', () => {
      it('converts blockquotes to markdown chevron syntax', () => {
        const input = '<blockquote>Strata data sovereignty is essential.</blockquote>';
        expect(htmlToMarkdown(input)).toBe('> Strata data sovereignty is essential.');
      });

      it('handles multi-line blockquotes with chevron prefixes', () => {
        const input = '<blockquote>Line 1<br/>Line 2</blockquote>';
        expect(htmlToMarkdown(input)).toBe('> Line 1\n> Line 2');
      });
    });

    describe('Preformatted Code Blocks', () => {
      it('converts pre code blocks to triple backticks', () => {
        const input = '<pre><code>const a = 1;\nconst b = 2;</code></pre>';
        expect(htmlToMarkdown(input)).toBe('```\nconst a = 1;\nconst b = 2;\n```');
      });
    });

    describe('Lists', () => {
      it('converts unordered lists to dash bullet items', () => {
        const input = '<ul><li>Item A</li><li>Item B</li></ul>';
        expect(htmlToMarkdown(input)).toBe('- Item A\n- Item B');
      });

      it('converts ordered lists to numbered items', () => {
        const input = '<ol><li>First</li><li>Second</li></ol>';
        expect(htmlToMarkdown(input)).toBe('1. First\n2. Second');
      });

      it('converts task list checkboxes to markdown [x] and [ ]', () => {
        const input = '<ul><li><input type="checkbox" checked /> Completed task</li><li><input type="checkbox" /> Pending task</li></ul>';
        expect(htmlToMarkdown(input)).toBe('- [x] Completed task\n- [ ] Pending task');
      });
    });

    describe('Tables', () => {
      it('converts HTML tables to GitHub-Flavored Markdown tables', () => {
        const input = `
<table>
  <thead>
    <tr><th>Feature</th><th>CommonKey</th></tr>
  </thead>
  <tbody>
    <tr><td>Data Sovereignty</td><td>100% Scheme Owned</td></tr>
    <tr><td>Search Fees</td><td>$0</td></tr>
  </tbody>
</table>
        `;
        const expected = '| Feature | CommonKey |\n| --- | --- |\n| Data Sovereignty | 100% Scheme Owned |\n| Search Fees | $0 |';
        expect(htmlToMarkdown(input)).toBe(expected);
      });

      it('escapes pipe characters within table cell content', () => {
        const input = '<table><tr><th>Category</th></tr><tr><td>Option A | Option B</td></tr></table>';
        const result = htmlToMarkdown(input);
        expect(result).toContain('Option A \\| Option B');
      });
    });

    describe('Sanitization and Entity Decoding', () => {
      it('removes scripts, styles, metadata, and HTML comments', () => {
        const input = `
<script>alert('bad');</script>
<style>.bad { color: red; }</style>
<!-- Hidden Word comment -->
<p>Clean strata content</p>
        `;
        expect(htmlToMarkdown(input)).toBe('Clean strata content');
      });

      it('decodes HTML entities into normal characters', () => {
        const input = '<p>Tom &amp; Jerry &lt;owners&gt; &quot;quoted&quot; &#39;strata&#39;</p>';
        expect(htmlToMarkdown(input)).toBe("Tom & Jerry <owners> \"quoted\" 'strata'");
      });

      it('collapses excessive consecutive newlines', () => {
        const input = '<p>P1</p><br/><br/><br/><br/><p>P2</p>';
        expect(htmlToMarkdown(input)).toBe('P1\n\nP2');
      });
    });

    describe('Edge Cases and Resilience', () => {
      it('returns empty string for empty, null, or undefined inputs', () => {
        expect(htmlToMarkdown('')).toBe('');
        expect(htmlToMarkdown(null as any)).toBe('');
        expect(htmlToMarkdown(undefined as any)).toBe('');
      });
    });
  });
});
