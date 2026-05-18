import { ArrowDown, Zap } from 'lucide-react'

const floatingPains = [
  { text: '"Faço tudo no Excel"', delay: '0s', x: '5%', y: '20%' },
  { text: '"Perco horas nisso"', delay: '1.5s', x: '80%', y: '15%' },
  { text: '"É tudo manual"', delay: '3s', x: '15%', y: '70%' },
  { text: '"Precisava de um sistema"', delay: '0.8s', x: '70%', y: '65%' },
  { text: '"Odeio esse processo"', delay: '2.2s', x: '45%', y: '80%' },
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-orange-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-orange-600/3 blur-[80px] pointer-events-none" />

      {/* Floating pain bubbles */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block">
        {floatingPains.map((pain, i) => (
          <div
            key={i}
            className="absolute text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full border border-forge-border/50 bg-forge-card/30 backdrop-blur-sm"
            style={{
              left: pain.x,
              top: pain.y,
              animation: `float 6s ease-in-out infinite`,
              animationDelay: pain.delay,
            }}
          >
            {pain.text}
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-24 pb-12">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-1.5 mb-8">
          <Zap size={12} className="text-forge-fire" fill="currentColor" />
          <span className="text-orange-400 text-xs font-medium tracking-wide uppercase">
            Fábrica de software orientada por dores reais
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-6">
          Sua dor{' '}
          <span className="fire-text">vira</span>
          <br />
          produto.
        </h1>

        {/* Subheadline */}
        <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-4 leading-relaxed">
          Conta pra gente o que te trava, o que você faz no braço, o que ainda não existe
          — e a gente transforma isso numa solução digital real.
        </p>

        <p className="text-gray-600 text-sm mb-10">
          Automações · Micro SaaS · Plataformas · Integrações
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#submit"
            className="btn-fire text-base px-8 py-4 w-full sm:w-auto"
          >
            Enviar minha dor agora
          </a>
          <a
            href="#como-funciona"
            className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2"
          >
            Como funciona
            <ArrowDown size={14} />
          </a>
        </div>

        {/* Social proof numbers */}
        <div className="mt-16 pt-10 border-t border-forge-border/50 grid grid-cols-3 gap-6 max-w-md mx-auto">
          {[
            { value: '0 →', label: 'produtos lançados' },
            { value: '∞', label: 'dores possíveis' },
            { value: '100%', label: 'orientado por usuários' },
          ].map((stat, i) => (
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
