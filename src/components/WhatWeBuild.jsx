import { Zap, Package, Layers, GitMerge, MonitorSmartphone } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const ICONS = [Zap, Package, Layers, GitMerge, MonitorSmartphone]

const COLORS = [
  'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  'text-blue-400 bg-blue-400/10 border-blue-400/20',
  'text-purple-400 bg-purple-400/10 border-purple-400/20',
  'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
  'text-orange-400 bg-orange-400/10 border-orange-400/20',
]

export default function WhatWeBuild() {
  const { t } = useLanguage()
  const s = t.whatWeBuild

  return (
    <section className="py-12 sm:py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <p className="text-forge-fire text-sm font-semibold uppercase tracking-widest mb-3">
            {s.label}
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-4">
            {s.heading}
          </h2>
          <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto">{s.sub}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {s.items.map((item, i) => {
            const Icon = ICONS[i]
            const color = COLORS[i]
            return (
              <div
                key={item.title}
                className="card p-5 flex flex-col gap-4 hover:border-orange-500/30 transition-colors duration-300 relative"
              >
                {item.isNew && (
                  <span className="absolute top-4 right-4 text-xs font-semibold px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
                    {s.badge}
                  </span>
                )}
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 ${color}`}>
                  <Icon size={18} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-base mb-1">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
