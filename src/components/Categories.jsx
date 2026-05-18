import { DollarSign, Settings, Users, TrendingUp, HeadphonesIcon, Truck, Megaphone, FileText, CalendarClock, BarChart3 } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const icons = [DollarSign, Settings, Users, TrendingUp, HeadphonesIcon, Truck, Megaphone, FileText, CalendarClock, BarChart3]
const styles = [
  { color: 'text-green-400',  bg: 'bg-green-400/10',  border: 'border-green-400/20' },
  { color: 'text-blue-400',   bg: 'bg-blue-400/10',   border: 'border-blue-400/20' },
  { color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/20' },
  { color: 'text-orange-400', bg: 'bg-orange-400/10', border: 'border-orange-400/20' },
  { color: 'text-cyan-400',   bg: 'bg-cyan-400/10',   border: 'border-cyan-400/20' },
  { color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/20' },
  { color: 'text-pink-400',   bg: 'bg-pink-400/10',   border: 'border-pink-400/20' },
  { color: 'text-indigo-400', bg: 'bg-indigo-400/10', border: 'border-indigo-400/20' },
  { color: 'text-rose-400',   bg: 'bg-rose-400/10',   border: 'border-rose-400/20' },
  { color: 'text-teal-400',   bg: 'bg-teal-400/10',   border: 'border-teal-400/20' },
]

export default function Categories() {
  const { t } = useLanguage()
  const c = t.categories

  return (
    <section className="py-20 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-forge-fire text-sm font-semibold uppercase tracking-widest mb-3">
            {c.label}
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">{c.heading}</h2>
          <p className="text-gray-500 max-w-xl mx-auto">{c.sub}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {c.items.map((cat, i) => {
            const Icon = icons[i]
            const s = styles[i]
            return (
              <div
                key={i}
                className={`card p-4 flex flex-col items-start gap-3 hover:border-opacity-50 transition-all duration-300 group cursor-default border ${s.border}`}
              >
                <div className={`w-9 h-9 rounded-lg ${s.bg} border ${s.border} flex items-center justify-center`}>
                  <Icon size={16} className={s.color} />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{cat.label}</p>
                  <p className="text-gray-600 text-xs mt-1 leading-relaxed hidden sm:block">{cat.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
