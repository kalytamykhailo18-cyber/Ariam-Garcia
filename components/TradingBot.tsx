'use client';
import { useEffect, useRef } from 'react';
import { tradingBotFeatures } from '../lib/data';
import BarChartIcon from '@mui/icons-material/BarChart';

const CHART_BARS = [30, 55, 40, 70, 60, 80, 50, 90, 65, 75, 85, 70, 95, 80, 60];

export default function TradingBot() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.tb-reveal').forEach((el, i) => {
            (el as HTMLElement).style.animation = `fadeInUp 0.6s ease-out ${i * 0.1}s both`;
          });
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="trading" className="section-wrapper grid-bg-sm relative overflow-hidden" ref={ref}>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }}
      />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Heading */}
        <div className="text-center mb-16 tb-reveal" style={{ opacity: 0 }}>
          <span className="text-xs font-bold tracking-widest uppercase text-amber-400 mb-3 block">
            Fintech &amp; Automation
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Algorithmic <span className="gradient-text-amber">Trading Bot</span>
          </h2>
          <div className="w-16 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg,#f59e0b,#fbbf24)' }} />
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left — Info */}
          <div className="space-y-6">
            <div className="glass-amber p-8 tb-reveal" style={{ opacity: 0 }}>
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.35)', color: '#fbbf24' }}
                >
                  <BarChartIcon style={{ fontSize: '1.5rem' }} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">MT5 Trading Bot</h3>
                  <p className="text-amber-400 text-sm font-medium">MetaTrader 5 · Python Automation</p>
                </div>
              </div>
              <p className="text-slate-400 leading-relaxed mb-6">
                A strategy only earns if it runs the same way every time, including at 3am and during bad news.
                The bot holds the rules and the risk limits so the decision never depends on how the day is going.
                Separate buy and sell engines keep the logic clean and the performance of each one visible.
              </p>

              <div className="flex flex-wrap gap-2">
                {['Python', 'MT5 API', 'Pandas', 'RSI', 'MACD', 'EMA', 'Fibonacci'].map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-full text-xs font-semibold"
                    style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', color: '#fbbf24' }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Features grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {tradingBotFeatures.map((f, i) => (
                <div
                  key={f.label}
                  className="glass p-4 skill-card tb-reveal"
                  style={{ opacity: 0, animationDelay: `${i * 0.08 + 0.3}s`, borderColor: 'rgba(245,158,11,0.15)' }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(245,158,11,0.4)';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(245,158,11,0.12)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(245,158,11,0.15)';
                    (e.currentTarget as HTMLElement).style.boxShadow = '';
                  }}
                >
                  <div className="text-amber-400 text-xs font-bold mb-1">{f.label}</div>
                  <div className="text-slate-400 text-xs leading-relaxed">{f.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Chart visual */}
          <div className="tb-reveal" style={{ opacity: 0 }}>
            <div className="glass-amber p-6 rounded-2xl" style={{ borderColor: 'rgba(245,158,11,0.25)' }}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-xs text-slate-500 font-medium">Risk dashboard · 1H timeframe</span>
                  <div className="text-2xl font-black text-white mt-0.5">
                    +12.4%{' '}
                    <span className="text-slate-500 text-sm">sample period</span>
                  </div>
                </div>
                <div
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
                  style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.35)', color: '#fbbf24' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  SAMPLE
                </div>
              </div>

              <div className="flex items-end gap-1 h-32 mb-4">
                {CHART_BARS.map((h, i) => {
                  const isGreen = h > 60;
                  return (
                    <div
                      key={i}
                      className="flex-1 rounded-sm transition-all duration-300 hover:opacity-80"
                      style={{
                        height: `${h}%`,
                        background: isGreen ? 'linear-gradient(to top,#10b981,#34d399)' : 'linear-gradient(to top,#ef4444,#f87171)',
                        boxShadow: isGreen ? '0 0 4px rgba(16,185,129,0.4)' : '0 0 4px rgba(239,68,68,0.4)',
                      }}
                    />
                  );
                })}
              </div>

              <div className="grid grid-cols-3 gap-3 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                {[
                  { name: 'RSI',     value: '62.4',    color: '#818cf8' },
                  { name: 'MACD',    value: '+0.0023', color: '#34d399' },
                  { name: 'EMA(20)', value: '1.0842',  color: '#22d3ee' },
                ].map((ind) => (
                  <div key={ind.name} className="text-center">
                    <div className="text-xs text-slate-500 mb-0.5">{ind.name}</div>
                    <div className="text-sm font-bold" style={{ color: ind.color }}>{ind.value}</div>
                  </div>
                ))}
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                {[
                  { label: 'Max Drawdown',  value: '3.2%', color: '#f87171' },
                  { label: 'Profit Factor', value: '2.41', color: '#34d399' },
                ].map((m) => (
                  <div
                    key={m.label}
                    className="p-3 rounded-xl text-center"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <div className="text-xs text-slate-500 mb-1">{m.label}</div>
                    <div className="text-lg font-bold" style={{ color: m.color }}>{m.value}</div>
                  </div>
                ))}
              </div>

              <p className="mt-4 text-center text-xs text-slate-600 leading-relaxed">
                Interface preview with sample values. Real figures depend on the strategy,
                the instrument and the account.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
