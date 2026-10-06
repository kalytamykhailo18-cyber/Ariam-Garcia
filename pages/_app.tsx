import type { AppProps } from 'next/app';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      {/* Vercel Analytics — audience metrics. Enable in Vercel dashboard. */}
      <Analytics />
      {/* Vercel Speed Insights — real-user Core Web Vitals (LCP, INP, CLS).
          Google uses CWV as a ranking signal. RUM data > synthetic Lighthouse. */}
      <SpeedInsights />
      {/* Google Analytics 4 — gated on NEXT_PUBLIC_GA_ID. Optional. */}
      {process.env.NEXT_PUBLIC_GA_ID && (
        <>
          <Script
            id="ga4-src"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA_ID}',{anonymize_ip:true});`}
          </Script>
        </>
      )}
      {/* Plausible / Umami — gated on NEXT_PUBLIC_PLAUSIBLE_DOMAIN. Optional privacy-first alternative. */}
      {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN && (
        <Script
          strategy="afterInteractive"
          data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
          src="https://plausible.io/js/script.js"
        />
      )}
    </>
  );
}
