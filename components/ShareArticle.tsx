'use client';
import { useState } from 'react';

interface Props {
  url: string;
  title: string;
  text: string;
}

export default function ShareArticle({ url, title, text }: Props) {
  const [copied, setCopied] = useState(false);

  const nativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch {
        // user cancelled or share unavailable — silent
      }
    } else {
      copy();
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard blocked — no-op
    }
  };

  const encoded = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const xHref = `https://x.com/intent/tweet?url=${encoded}&text=${encodedTitle}`;
  const waHref = `https://api.whatsapp.com/send?text=${encodedTitle}%20${encoded}`;
  const emailHref = `mailto:?subject=${encodedTitle}&body=${encoded}`;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        onClick={nativeShare}
        className="px-3 py-1.5 rounded-lg border border-slate-700 text-sm text-slate-200 hover:border-indigo-500/50 hover:text-white transition"
        aria-label="Share this article"
      >
        Share
      </button>
      <button
        onClick={copy}
        className="px-3 py-1.5 rounded-lg border border-slate-700 text-sm text-slate-200 hover:border-indigo-500/50 hover:text-white transition"
        aria-label="Copy article link"
      >
        {copied ? 'Copied ✓' : 'Copy link'}
      </button>
      <a
        href={xHref}
        target="_blank"
        rel="noopener noreferrer"
        className="px-3 py-1.5 rounded-lg border border-slate-700 text-sm text-slate-200 hover:border-indigo-500/50 hover:text-white transition"
        aria-label="Share on X"
      >
        X
      </a>
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        className="px-3 py-1.5 rounded-lg border border-slate-700 text-sm text-slate-200 hover:border-indigo-500/50 hover:text-white transition"
        aria-label="Share on WhatsApp"
      >
        WhatsApp
      </a>
      <a
        href={emailHref}
        className="px-3 py-1.5 rounded-lg border border-slate-700 text-sm text-slate-200 hover:border-indigo-500/50 hover:text-white transition"
        aria-label="Share via email"
      >
        Email
      </a>
    </div>
  );
}
