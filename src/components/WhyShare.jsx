import { Star, Gift, Users, Lightbulb } from 'lucide-react'

const benefits = [
  {
    icon: Star,
    title: 'Acesso antecipado gratuito',
    description: 'Quem enviou a dor que originou o produto tem acesso gratuito antes do lançamento público.',
  },
  {
    icon: Gift,
    title: 'Desconto vitalício',
    description: 'Fundadores da dor recebem desconto permanente no produto que nasceu do seu problema.',
  },
  {
    icon: Users,
    title: 'Faça parte da construção',
    description: 'Você é convidado a testar, dar feedback e ajudar a moldar o produto durante o desenvolvimento.',
  },
  {
    icon: Lightbulb,
    title: 'Sua dor resolve de verdade',
    description: 'Ao contrário de produtos genéricos, o que sai daqui foi feito pra resolver o SEU problema específico.',
  },
]

export default function WhyShare() {
  return (
    <section className="py-20 relative">
      {/* Divider */}
      <div className="glow-line mb-20 mx-auto max-w-xs" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: text */}
          <div>
            <p className="text-forge-fire text-sm font-semibold uppercase tracking-widest mb-3">
              Por que compartilhar?
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 leading-tight">
              Você não tá só desabafando.
              <br />
              <span className="fire-text">Você tá co-criando.</span>
            </h2>
            <p className="text-gray-500 leading-relaxed mb-6">
              Cada dor enviada aqui é uma oportunidade de mercado não explorada. Quando você compartilha, você nos ajuda
              a construir o produto certo — e em troca, você é o primeiro a ter acesso a ele.
            </p>
            <p className="text-gray-600 text-sm">
              Já ajudou alguém enviando sua dor. Agora ela pode se tornar a solução que milhares de pessoas precisavam.
            </p>
          </div>

          {/* Right: benefits grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {benefits.map((benefit, i) => {
              const Icon = benefit.icon
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
