import { ArrowDown, Zap } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const painPositions = [
  { delay: '0s',   x: '10%', y: '120px' },
  { delay: '1s',   x: '68%', y: '110px' },
  { delay: '2.2s', x: '12%', y: '340px' },
  { delay: '1.8s', x: '65%', y: '310px' },
  { delay: '3s',   x: '70%', y: '490px' },
]

export default function Hero() {
  const { t } = useLanguage()
  const h = t.hero

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-orange-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-orange-600/3 blur-[80px] pointer-events-none" />

      {/* Floating pain bubbles */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block">
        {h.floatingPains.map((text, i) => (
          <div
            key={i}
            className="absolute text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full border border-forge-border/50 bg-forge-card/30 backdrop-blur-sm"
            style={{
              left: painPositions[i].x,
              top: painPositions[i].y,
              animation: 'float 6s ease-in-out infinite',
              animationDelay: painPositions[i].delay,
            }}
          >
            {text}
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-24 pb-12">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-1.5 mb-8">
          <Zap size={12} className="text-forge-fire" fill="currentColor" />
          <span className="text-orange-400 text-xs font-medium tracking-wide uppercase">
            {h.badge}
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-6">
          {h.headlinePre}{' '}
          <span className="fire-text">{h.headlineHighlight}</span>
          <br />
          {h.headlinePost}
        </h1>

        {/* Subheadline */}
        <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-4 leading-relaxed">
          {h.sub}
        </p>

        <p className="text-gray-600 text-sm mb-10">{h.tags}</p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="#submit" className="btn-fire text-base px-8 py-4 w-full sm:w-auto">
            {h.cta}
          </a>
          <a
            href="#como-funciona"
            className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2"
          >
            {h.howItWorks}
            <ArrowDown size={14} />
          </a>
        </div>

        {/* Stats */}
        <div className="mt-16 pt-10 border-t border-forge-border/50 grid grid-cols-3 gap-6 max-w-md mx-auto">
          {h.stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl font-black fire-text">{stat.value}</div>
              <div className="text-gray-600 text-xs mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-forge-bg to-transparent pointer-events-none" />
    </section>
  )
}
