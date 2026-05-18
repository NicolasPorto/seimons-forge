import { MessageSquare, Search, Rocket } from 'lucide-react'

const steps = [
  {
    icon: MessageSquare,
    number: '01',
    title: 'Você conta sua dor',
    description:
      'Compartilha um problema real do seu dia a dia — algo que você faz manualmente, algo lento, algo que te faz perder tempo ou dinheiro.',
    examples: ['Uso planilha pra tudo', 'Preciso contratar alguém só pra isso', 'Esse processo é horrível'],
  },
  {
    icon: Search,
    number: '02',
    title: 'A gente valida a oportunidade',
    description:
      'Analisamos padrões entre as dores enviadas. Quantas pessoas têm esse mesmo problema? Qual o impacto real? Existe solução no mercado?',
    examples: ['Análise de frequência', 'Pesquisa de mercado', 'Viabilidade técnica'],
  },
  {
    icon: Rocket,
    number: '03',
    title: 'Vira um produto real',
    description:
      'As dores mais votadas e validadas se tornam automações, micro SaaS ou plataformas. Quem enviou a dor tem acesso prioritário.',
    examples: ['Automação personalizada', 'Micro SaaS', 'Acesso antecipado gratuito'],
  },
]

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-forge-fire text-sm font-semibold uppercase tracking-widest mb-3">
            Como funciona
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Da dor ao produto em 3 etapas
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Não construímos no achismo. Construímos a partir de problemas reais, validados por pessoas reais.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-6 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-12 left-[16.66%] right-[16.66%] h-px bg-gradient-to-r from-transparent via-forge-border to-transparent" />

          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <div key={i} className="card p-6 relative group hover:border-orange-500/30 transition-colors duration-300">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-orange-500/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative">
                  {/* Step number + icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                      <Icon size={20} className="text-forge-fire" />
                    </div>
                    <span className="text-4xl font-black text-forge-border">{step.number}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5">{step.description}</p>

                  {/* Examples */}
                  <div className="space-y-2">
                    {step.examples.map((ex, j) => (
                      <div key={j} className="flex items-center gap-2 text-xs text-gray-600">
                        <div className="w-1 h-1 rounded-full bg-forge-fire flex-shrink-0" />
                        {ex}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
