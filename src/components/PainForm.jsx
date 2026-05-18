import { useState } from 'react'
import { Send, Loader2, CheckCircle2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { supabase } from '../lib/supabase'

const categories = [
  'Financeiro',
  'Operações',
  'RH & Pessoas',
  'Vendas',
  'Atendimento',
  'Logística',
  'Marketing',
  'Documentos',
  'Agendamentos',
  'Dados & BI',
  'Outro',
]

const frequencies = [
  { value: 'daily', label: 'Todos os dias' },
  { value: 'weekly', label: 'Toda semana' },
  { value: 'monthly', label: 'Todo mês' },
  { value: 'occasionally', label: 'Às vezes' },
]

const impacts = [
  { value: 'time', label: '⏱️ Perco muito tempo' },
  { value: 'money', label: '💸 Perco dinheiro' },
  { value: 'customers', label: '😤 Perco clientes' },
  { value: 'team', label: '🤯 Estresso minha equipe' },
  { value: 'all', label: '🔥 Tudo acima' },
]

const initialForm = {
  name: '',
  email: '',
  category: '',
  description: '',
  frequency: '',
  current_solution: '',
  impact: '',
}

export default function PainForm() {
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.category || !form.description.trim()) {
      toast.error('Preencha pelo menos a categoria e a descrição da dor.')
      return
    }

    if (form.description.trim().length < 20) {
      toast.error('Descreva um pouco mais sua dor. Seja específico!')
      return
    }

    setLoading(true)
    try {
      const { error } = await supabase.from('pains').insert([
        {
          name: form.name || null,
          email: form.email || null,
          category: form.category,
          description: form.description.trim(),
          frequency: form.frequency || null,
          current_solution: form.current_solution.trim() || null,
          impact: form.impact || null,
        },
      ])

      if (error) throw error

      setSubmitted(true)
      setForm(initialForm)
    } catch (err) {
      console.error(err)
      toast.error('Erro ao enviar. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <section id="submit" className="py-24 relative">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="card p-12">
            <div className="w-16 h-16 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={32} className="text-forge-fire" />
            </div>
            <h3 className="text-2xl font-black text-white mb-3">Dor recebida. 🔥</h3>
            <p className="text-gray-400 mb-6">
              Sua dor foi registrada e vai entrar no nosso funil de análise. Se ela aparecer bastante, vira produto.
              Se você deixou seu e-mail, você será o primeiro a saber.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="btn-fire"
            >
              Enviar outra dor
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="submit" className="py-24 relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-orange-500/5 blur-[100px] pointer-events-none" />

      <div className="relative max-w-2xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-forge-fire text-sm font-semibold uppercase tracking-widest mb-3">
            Compartilhe sua dor
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            O que te trava hoje?
          </h2>
          <p className="text-gray-500">
            Seja específico. Quanto mais detalhe, maior a chance da sua dor virar um produto real.
          </p>
        </div>

        {/* Form card */}
        <div className="card p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name + Email */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">
                  Seu nome <span className="text-gray-700">(opcional)</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="João Silva"
                  className="input-forge"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">
                  Seu e-mail <span className="text-gray-700">(para acesso antecipado)</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="joao@empresa.com"
                  className="input-forge"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2">
                Área do problema <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                className="input-forge appearance-none cursor-pointer"
              >
                <option value="" disabled>Selecione uma categoria...</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2">
                Descreva sua dor <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Ex: Todo mês eu preciso consolidar os relatórios de vendas de 5 planilhas diferentes, copiar os dados manualmente, calcular os totais... levo uns 2 dias só nisso."
                className="input-forge resize-none"
              />
              <p className="text-gray-700 text-xs mt-1.5">
                {form.description.length}/20 caracteres mínimos
              </p>
            </div>

            {/* Frequency + Impact */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">
                  Com que frequência ocorre?
                </label>
                <select
                  name="frequency"
                  value={form.frequency}
                  onChange={handleChange}
                  className="input-forge appearance-none cursor-pointer"
                >
                  <option value="">Selecione...</option>
                  {frequencies.map((f) => (
                    <option key={f.value} value={f.value}>{f.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">
                  Qual o principal impacto?
                </label>
                <select
                  name="impact"
                  value={form.impact}
                  onChange={handleChange}
                  className="input-forge appearance-none cursor-pointer"
                >
                  <option value="">Selecione...</option>
                  {impacts.map((imp) => (
                    <option key={imp.value} value={imp.value}>{imp.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Current solution */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2">
                Como você resolve hoje? <span className="text-gray-700">(opcional)</span>
              </label>
              <textarea
                name="current_solution"
                value={form.current_solution}
                onChange={handleChange}
                rows={2}
                placeholder="Ex: Planilha no Excel, WhatsApp, post-it, papel..."
                className="input-forge resize-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-fire w-full flex items-center justify-center gap-2 py-4 text-base"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send size={16} />
                  Enviar minha dor
                </>
              )}
            </button>

            <p className="text-center text-gray-700 text-xs">
              Seus dados são privados. Não compartilhamos com terceiros.
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
