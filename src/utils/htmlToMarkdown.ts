/**
 * htmlToMarkdown.ts
 * High-fidelity HTML-to-Markdown converter tailored for rich text clipboard data
 * from Google Docs, Microsoft Word (Desktop & Web), modern browsers, Notion, and email clients.
 * Preserves headings, bold, italics, underlines, links, lists, blockquotes, and tables.
 */

// Check if the HTML content contains meaningful formatting
export function hasRichFormatting(html: string): boolean {
  if (!html || typeof html !== 'string') return false;
  // Check for formatting elements or styled spans
  const hasFormattingTags = /<(h[1-6]|b|strong|i|em|u|s|del|strike|a|ul|ol|li|blockquote|table|pre|code|hr|p|br)\b/i.test(html);
  const hasFormattingStyles = /style=["'][^"']*(font-weight\s*:\s*(bold|bolder|[6-9]00)|font-style\s*:\s*italic|text-decoration\s*:\s*(underline|line-through))/i.test(html);
  return hasFormattingTags || hasFormattingStyles;
}

/**
 * Wrap text with prefix and suffix, keeping leading and trailing whitespace outside the delimiters
 * e.g., "  hello  " with "**" -> "  **hello**  "
 */
function wrapWithDelimiters(text: string, prefix: string, suffix: string): string {
  if (!text) return '';
  const trimmed = text.trim();
  if (!trimmed) return text;
  const leadMatch = text.match(/^(\s*)/);
  const trailMatch = text.match(/(\s*)$/);
  const lead = leadMatch ? leadMatch[1] : '';
  const trail = trailMatch ? trailMatch[1] : '';
  return `${lead}${prefix}${trimmed}${suffix}${trail}`;
}

/**
 * Normalize plain text when no rich HTML is available or as fallback:
 * converts unicode bullets to markdown bullets, normalizes numbered items.
 */
export function normalizePlainText(text: string): string {
  if (!text) return '';
  return text
    .replace(/\u00A0/g, ' ')
    // Convert lines starting with unicode bullets (• ⁃ ◦) into markdown bullets
    .replace(/^(\s*)[•⁃◦]\s+/gm, '$1- ')
    // Convert lines starting with 1) or 2) into 1. 2.
    .replace(/^(\s*)(\d+)\)\s+/gm, '$1$2. ');
}

/**
 * Main converter: parses clipboard HTML string and returns formatted Markdown
 */
export function htmlToMarkdown(html: string): string {
  if (!html || typeof html !== 'string') return '';
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // 1. Pre-clean unwanted tags
    const removeSelectors = ['script', 'style', 'meta', 'link', 'xml', 'head'];
    for (const sel of removeSelectors) {
      const els = doc.querySelectorAll(sel);
      els.forEach((el) => el.remove());
    }

    // 2. Remove MS Word conditional comments and list decorations
    const comments: Comment[] = [];
    const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_COMMENT);
    let cNode = walker.nextNode();
    while (cNode) {
      comments.push(cNode as Comment);
      cNode = walker.nextNode();
    }
    comments.forEach((c) => c.remove());

    // 3. Process root body recursively
    const markdown = walkNode(doc.body, { listDepth: 0, inList: false, inTable: false });

    // 4. Post-process cleanup
    return cleanupMarkdown(markdown);
  } catch (err) {
    console.warn('HTML to Markdown conversion error:', err);
    return normalizePlainText(html.replace(/<[^>]+>/g, ''));
  }
}

interface WalkContext {
  listDepth: number;
  inList: boolean;
  inTable: boolean;
}

function walkNode(node: Node, ctx: WalkContext): string {
  if (node.nodeType === Node.TEXT_NODE) {
    let val = node.textContent || '';
    // If inside table cell, escape pipe characters
    if (ctx.inTable) {
      val = val.replace(/\|/g, '\\|');
    }
    return val;
  }

  if (node.nodeType !== Node.ELEMENT_NODE) {
    return '';
  }

  const el = node as HTMLElement;
  const tag = el.tagName.toUpperCase();
  const style = el.style;

  // Check styling flags
  const fontWeight = (style?.fontWeight || '').toLowerCase();
  const fontStyle = (style?.fontStyle || '').toLowerCase();
  const textDeco = (style?.textDecoration || '').toLowerCase();
  const className = el.className || '';

  // Google Docs fake bold container fix: <b id="docs-internal-guid-..." style="font-weight:normal">
  const isDocsFakeBold = (tag === 'B' || tag === 'STRONG') && (fontWeight === 'normal' || fontWeight === '400');
  const isBold =
    !isDocsFakeBold &&
    (tag === 'STRONG' ||
      tag === 'B' ||
      fontWeight === 'bold' ||
      fontWeight === 'bolder' ||
      parseInt(fontWeight, 10) >= 600 ||
      className.includes('bold'));

  const isItalic =
    tag === 'EM' ||
    tag === 'I' ||
    fontStyle === 'italic' ||
    fontStyle === 'oblique' ||
    className.includes('italic');

  const isUnderline =
    tag === 'U' ||
    tag === 'INS' ||
    textDeco.includes('underline');

  const isStrike =
    tag === 'S' ||
    tag === 'STRIKE' ||
    tag === 'DEL' ||
    textDeco.includes('line-through');

  const isCode = tag === 'CODE' && el.parentElement?.tagName !== 'PRE';

  // Process child nodes
  const childrenText = Array.from(el.childNodes)
    .map((child) => walkNode(child, ctx))
    .join('');

  // 1. Headings (H1 - H6 or MS Word Heading classes)
  if (/^H[1-6]$/.test(tag) || /Mso(Heading[1-6]|Title|Subtitle)/i.test(className)) {
    let level = 2; // Default to H2 for subheadings in body content
    if (tag.startsWith('H')) {
      level = parseInt(tag.charAt(1), 10);
    } else if (/Heading1|Title/i.test(className)) {
      level = 1;
    } else if (/Heading2|Subtitle/i.test(className)) {
      level = 2;
    } else if (/Heading3/i.test(className)) {
      level = 3;
    }
    const cleanHeading = childrenText.trim();
    if (!cleanHeading) return '';
    const hashes = '#'.repeat(level);
    return `\n\n${hashes} ${cleanHeading}\n\n`;
  }

  // 2. Paragraphs & Dividers
  if (tag === 'P') {
    // If inside list item, do not insert double paragraph newlines
    if (ctx.inList) {
      return childrenText;
    }
    const cleanP = childrenText.trim();
    return cleanP ? `\n\n${cleanP}\n\n` : '\n';
  }

  if (tag === 'BR') {
    return '\n';
  }

  if (tag === 'HR') {
    return '\n\n---\n\n';
  }

  // 3. Links
  if (tag === 'A') {
    const href = el.getAttribute('href')?.trim();
    const linkText = childrenText.trim();
    if (!href || href.startsWith('javascript:')) {
      return childrenText;
    }
    // Clean up tracking prefixes if any or format markdown link
    if (!linkText) return href;
    return `[${linkText}](${href})`;
  }

  // 4. Blockquotes
  if (tag === 'BLOCKQUOTE') {
    const lines = childrenText.trim().split('\n');
    const quoteFormatted = lines.map((l) => `> ${l}`).join('\n');
    return `\n\n${quoteFormatted}\n\n`;
  }

  // 5. Preformatted code blocks
  if (tag === 'PRE') {
    const code = el.textContent || '';
    return `\n\n\`\`\`\n${code.trim()}\n\`\`\`\n\n`;
  }

  // 6. Lists: UL / OL
  if (tag === 'UL' || tag === 'OL') {
    const isOrdered = tag === 'OL';
    const nextDepth = ctx.listDepth + 1;
    let listOutput = '\n';
    let itemIdx = 1;

    for (const child of Array.from(el.children)) {
      if (child.tagName === 'LI') {
        const indent = '  '.repeat(ctx.listDepth);
        const prefix = isOrdered ? `${itemIdx++}. ` : '- ';
        
        // Check for checkbox in list item (task list)
        const checkbox = child.querySelector('input[type="checkbox"]');
        let checkPrefix = '';
        if (checkbox) {
          checkPrefix = (checkbox as HTMLInputElement).checked ? '[x] ' : '[ ] ';
        }

        const itemContent = walkNode(child, {
          listDepth: nextDepth,
          inList: true,
          inTable: ctx.inTable
        }).trim();

        listOutput += `${indent}${prefix}${checkPrefix}${itemContent}\n`;
      }
    }
    return `${listOutput}\n`;
  }

  if (tag === 'LI') {
    return childrenText;
  }

  // 7. Tables
  if (tag === 'TABLE') {
    return `\n\n${convertTableToMarkdown(el)}\n\n`;
  }

  // 8. General Divs / Containers
  if (tag === 'DIV' || tag === 'SECTION' || tag === 'ARTICLE' || tag === 'HEADER' || tag === 'ASIDE') {
    // If div acts as line break or paragraph
    if (childrenText.trim()) {
      return `\n${childrenText}\n`;
    }
    return '';
  }

  // 9. Inline formatting wraps
  let formatted = childrenText;
  if (isCode) {
    formatted = wrapWithDelimiters(formatted, '`', '`');
  }
  if (isBold) {
    formatted = wrapWithDelimiters(formatted, '**', '**');
  }
  if (isItalic) {
    formatted = wrapWithDelimiters(formatted, '*', '*');
  }
  if (isUnderline) {
    formatted = wrapWithDelimiters(formatted, '<u>', '</u>');
  }
  if (isStrike) {
    formatted = wrapWithDelimiters(formatted, '~~', '~~');
  }

  return formatted;
}

/**
 * Converts a HTML <table> element into a GitHub-Flavored Markdown table
 */
function convertTableToMarkdown(tableEl: HTMLElement): string {
  const rows = Array.from(tableEl.querySelectorAll('tr'));
  if (rows.length === 0) return '';

  const tableData: string[][] = [];
  let maxCols = 0;

  for (const row of rows) {
    const cells = Array.from(row.querySelectorAll('th, td'));
    const rowData = cells.map((c) => {
      return (c.textContent || '').replace(/\s+/g, ' ').replace(/\|/g, '\\|').trim();
    });
    if (rowData.length > maxCols) maxCols = rowData.length;
    tableData.push(rowData);
  }

  if (maxCols === 0) return '';

  // Pad all rows to maxCols
  const padded = tableData.map((row) => {
    while (row.length < maxCols) row.push('');
    return row;
  });

  const headerRow = padded[0];
  const headerLine = `| ${headerRow.join(' | ')} |`;
  const separatorLine = `| ${headerRow.map(() => '---').join(' | ')} |`;
  const bodyLines = padded.slice(1).map((row) => `| ${row.join(' | ')} |`);

  return [headerLine, separatorLine, ...bodyLines].join('\n');
}

/**
 * Final cleanup of converted Markdown text
 */
function cleanupMarkdown(md: string): string {
  return md
    // Replace non-breaking spaces with standard space
    .replace(/\u00A0/g, ' ')
    // Decode common entities
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    // Fix consecutive underlines with empty content
    .replace(/<u>\s*<\/u>/g, '')
    // Collapse 3 or more newlines into max 2
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}
