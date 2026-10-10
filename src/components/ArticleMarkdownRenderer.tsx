import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { ExternalLink } from 'lucide-react';

interface ArticleMarkdownRendererProps {
  content: string;
  className?: string;
}

export const ArticleMarkdownRenderer: React.FC<ArticleMarkdownRendererProps> = ({
  content,
  className = ''
}) => {
  if (!content) return null;

  return (
    <div className={`article-content-rendered prose prose-slate max-w-none ${className}`}>
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-8 mb-4 tracking-tight">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-6 mb-3 tracking-tight border-b border-slate-100 pb-2">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-5 mb-2 tracking-tight">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4">
              {children}
            </p>
          ),
          strong: ({ children }) => (
            <strong className="font-bold text-slate-900">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="italic text-slate-800">{children}</em>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-outside pl-5 space-y-1.5 mb-4 text-slate-700 text-sm sm:text-base">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-outside pl-5 space-y-1.5 mb-4 text-slate-700 text-sm sm:text-base">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="leading-relaxed pl-1">{children}</li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-blue-600 bg-blue-50/50 rounded-r-xl px-4 py-3 my-4 italic text-slate-800 text-sm sm:text-base">
              {children}
            </blockquote>
          ),
          a: ({ href, children }) => {
            const isExternal = href?.startsWith('http') || href?.startsWith('//');
            return (
              <a
                href={href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className="text-blue-600 hover:text-blue-800 underline underline-offset-2 font-medium transition-colors inline-flex items-baseline gap-0.5 cursor-pointer"
              >
                <span>{children}</span>
                {isExternal && (
                  <ExternalLink className="w-3 h-3 text-blue-500 shrink-0 inline translate-y-[1px]" />
                )}
              </a>
            );
          },
          hr: () => <hr className="my-6 border-slate-200" />,
          code: ({ className, children }) => {
            const isBlock = Boolean(className);
            if (isBlock) {
              return (
                <code className="block bg-slate-900 text-slate-100 p-4 rounded-xl text-xs sm:text-sm font-mono overflow-x-auto my-3">
                  {children}
                </code>
              );
            }
            return (
              <code className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded text-xs sm:text-sm font-mono border border-slate-200">
                {children}
              </code>
            );
          },
          table: ({ children }) => (
            <div className="overflow-x-auto my-4 border border-slate-200 rounded-xl">
              <table className="min-w-full divide-y divide-slate-200 text-sm text-left">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-slate-100 text-slate-800 font-bold">{children}</thead>
          ),
          th: ({ children }) => (
            <th className="px-4 py-2.5 font-bold text-slate-900 border-b border-slate-200">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-2.5 border-b border-slate-100 text-slate-700">
              {children}
            </td>
          )
        }}
      >
        {content}
      </Markdown>
    </div>
  );
};
