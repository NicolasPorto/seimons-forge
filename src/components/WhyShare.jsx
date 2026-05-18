import { Star, Gift, Users, Lightbulb } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const icons = [Star, Gift, Users, Lightbulb]

export default function WhyShare() {
  const { t } = useLanguage()
  const w = t.whyShare

  return (
    <section className="py-20 relative">
      <div className="glow-line mb-20 mx-auto max-w-xs" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-forge-fire text-sm font-semibold uppercase tracking-widest mb-3">
              {w.label}
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 leading-tight">
              {w.headingPre}
              <br />
              <span className="fire-text">{w.headingHighlight}</span>
            </h2>
            <p className="text-gray-500 leading-relaxed mb-6">{w.sub}</p>
            <p className="text-gray-600 text-sm">{w.sub2}</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {w.benefits.map((benefit, i) => {
              const Icon = icons[i]
              return (
                <div key={i} className="card p-5 group hover:border-orange-500/30 transition-colors duration-300">
                  <div className="w-9 h-9 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-4">
                    <Icon size={16} className="text-forge-fire" />
                  </div>
                  <h3 className="text-white font-semibold text-sm mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-xs leading-relaxed">{benefit.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
