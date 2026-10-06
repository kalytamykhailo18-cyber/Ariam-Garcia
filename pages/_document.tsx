import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        {/* Preconnect for parallel DNS/TLS setup */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* DNS-prefetch for external destinations users may click through to */}
        <link rel="dns-prefetch" href="https://wa.me" />
        <link rel="dns-prefetch" href="https://github.com" />

        {/* IndieWeb rel=me verification for identity discovery. */}
        <link rel="me" href="https://github.com/kalytamykhailo18-cyber" />
        <link rel="me" href="mailto:kalytamykhailo18@gmail.com" />

        {/* Author link — signals authorship to search engines */}
        <link rel="author" href="/about" />

        {/* Font loaded async via link (not @import — @import blocks CSSOM). */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap"
        />

        {/* Scroll-reveal sections start at opacity 0 and are faded in by JS.
            Without JS (some crawlers, previews, script blockers) keep them visible. */}
        <noscript>
          <style>{`[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important}`}</style>
        </noscript>
      </Head>
      <body className="bg-dark text-slate-100 antialiased">
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
