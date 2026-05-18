import { DollarSign, Settings, Users, TrendingUp, HeadphonesIcon, Truck, Megaphone, FileText, CalendarClock, BarChart3 } from 'lucide-react'

const categories = [
  { icon: DollarSign, label: 'Financeiro', color: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/20', description: 'Contas, fluxo de caixa, cobranças, conciliações' },
  { icon: Settings, label: 'Operações', color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20', description: 'Processos internos, fluxos, aprovações' },
  { icon: Users, label: 'RH & Pessoas', color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/20', description: 'Onboarding, ponto, férias, comunicados' },
  { icon: TrendingUp, label: 'Vendas', color: 'text-orange-400', bg: 'bg-orange-400/10', border: 'border-orange-400/20', description: 'CRM, follow-up, propostas, pipeline' },
  { icon: HeadphonesIcon, label: 'Atendimento', color: 'text-cyan-400', bg: 'bg-cyan-400/10', border: 'border-cyan-400/20', description: 'Suporte, tickets, chatbots, FAQs' },
  { icon: Truck, label: 'Logística', color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/20', description: 'Estoque, entregas, rastreamento, fornecedores' },
  { icon: Megaphone, label: 'Marketing', color: 'text-pink-400', bg: 'bg-pink-400/10', border: 'border-pink-400/20', description: 'Campanhas, relatórios, automações de e-mail' },
  { icon: FileText, label: 'Documentos', color: 'text-indigo-400', bg: 'bg-indigo-400/10', border: 'border-indigo-400/20', description: 'Contratos, notas, relatórios, assinaturas' },
  { icon: CalendarClock, label: 'Agendamentos', color: 'text-rose-400', bg: 'bg-rose-400/10', border: 'border-rose-400/20', description: 'Agendas, lembretes, confirmações, cancelamentos' },
  { icon: BarChart3, label: 'Dados & BI', color: 'text-teal-400', bg: 'bg-teal-400/10', border: 'border-teal-400/20', description: 'Dashboards, relatórios, KPIs, importações' },
]

export default function Categories() {
  return (
    <section className="py-20 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-forge-fire text-sm font-semibold uppercase tracking-widest mb-3">
            Onde a gente atua
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Toda área tem uma dor
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Não importa se é uma empresa de 1 ou 1000 pessoas. Se tem processo manual, tem espaço pra solução.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat, i) => {
            const Icon = cat.icon
            return (
              <div
                key={i}
                className={`card p-4 flex flex-col items-start gap-3 hover:border-opacity-50 transition-all duration-300 group cursor-default border ${cat.border}`}
              >
                <div className={`w-9 h-9 rounded-lg ${cat.bg} border ${cat.border} flex items-center justify-center`}>
                  <Icon size={16} className={cat.color} />
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
