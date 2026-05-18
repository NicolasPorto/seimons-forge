const examples = [
  {
    quote: 'Todo fim de mês gasto 2 dias consolidando planilhas de vendas de 5 lojas diferentes. É tudo manual.',
    area: 'Varejo · Financeiro',
    impact: 'Perco tempo e dinheiro',
  },
  {
    quote: 'Minha equipe usa WhatsApp pra aprovar orçamentos. Perco o histórico, perco aprovações, perco clientes.',
    area: 'Serviços · Vendas',
    impact: 'Perco clientes',
  },
  {
    quote: 'Tenho um salão de beleza e ainda marco tudo no caderno. Quando cancela não sei, quando remarcar não lembro.',
    area: 'Beleza · Agendamentos',
    impact: 'Perco tempo e clientes',
  },
  {
    quote: 'Preciso cruzar nota fiscal com boleto bancário toda semana. Faço no braço. Leva o dia inteiro.',
    area: 'Contabilidade · Financeiro',
    impact: 'Perco muito tempo',
  },
  {
    quote: 'Meu estoque fica desatualizado porque ninguém lembra de dar baixa. Sempre vendo produto que não tenho.',
    area: 'E-commerce · Logística',
    impact: 'Perco clientes',
  },
  {
    quote: 'Onboarding de funcionários é uma pasta no Google Drive com 40 arquivos. Ninguém sabe por onde começar.',
    area: 'Empresa · RH',
    impact: 'Estresso minha equipe',
  },
]

export default function PainExamples() {
  return (
    <section className="py-20 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-forge-fire text-sm font-semibold uppercase tracking-widest mb-3">
            Exemplos de dores reais
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Você se identifica com alguma?
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Essas são dores típicas que recebemos. A sua provavelmente é diferente — e isso é ainda melhor.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {examples.map((ex, i) => (
            <div
              key={i}
              className="card p-5 hover:border-orange-500/20 transition-colors duration-300 flex flex-col justify-between gap-4"
            >
              <p className="text-gray-300 text-sm leading-relaxed italic">
                "{ex.quote}"
              </p>
              <div className="pt-3 border-t border-forge-border flex items-center justify-between">
                <span className="text-gray-600 text-xs">{ex.area}</span>
                <span className="text-orange-500/70 text-xs">{ex.impact}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
