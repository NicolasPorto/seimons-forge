import { useState } from 'react'
import { Send, Loader2, CheckCircle2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { supabase } from '../lib/supabase'
import { useLanguage } from '../context/LanguageContext'
import Select from './Select'

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
  const { t } = useLanguage()
  const f = t.painForm

  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.category || !form.description.trim()) {
      toast.error(f.errorRequired)
      return
    }
    if (form.description.trim().length < 20) {
      toast.error(f.errorShort)
      return
    }

    setLoading(true)
    try {
      const { error } = await supabase.from('pains').insert([{
        name: form.name || null,
        email: form.email || null,
        category: form.category,
        description: form.description.trim(),
        frequency: form.frequency || null,
        current_solution: form.current_solution.trim() || null,
        impact: form.impact || null,
      }])

      if (error) throw error
      setSubmitted(true)
      setForm(initialForm)
    } catch {
      toast.error(f.errorSend)
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
            <h3 className="text-2xl font-black text-white mb-3">{f.successTitle}</h3>
            <p className="text-gray-400 mb-6">{f.successText}</p>
            <button onClick={() => setSubmitted(false)} className="btn-fire">
              {f.successBtn}
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="submit" className="py-24 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-orange-500/5 blur-[100px] pointer-events-none" />

      <div className="relative max-w-2xl mx-auto px-6">
        <div className="text-center mb-10">
          <p className="text-forge-fire text-sm font-semibold uppercase tracking-widest mb-3">
            {f.label}
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">{f.heading}</h2>
          <p className="text-gray-500">{f.sub}</p>
        </div>

        <div className="card p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name + Email */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">
                  {f.fields.name} <span className="text-gray-700">{f.fields.nameOptional}</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder={f.fields.namePlaceholder}
                  className="input-forge"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">
                  {f.fields.email} <span className="text-gray-700">{f.fields.emailHint}</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder={f.fields.emailPlaceholder}
                  className="input-forge"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2">
                {f.fields.category} <span className="text-red-500">{f.required}</span>
              </label>
              <Select
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder={f.fields.categoryDefault}
                options={f.categories.map((cat) => ({ value: cat, label: cat }))}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2">
                {f.fields.description} <span className="text-red-500">{f.required}</span>
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                rows={4}
                placeholder={f.fields.descPlaceholder}
                className="input-forge resize-none"
              />
              <p className="text-gray-700 text-xs mt-1.5">
                {form.description.length}/20 {f.fields.descHint}
              </p>
            </div>

            {/* Frequency + Impact */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">
                  {f.fields.frequency}
                </label>
                <Select
                  name="frequency"
                  value={form.frequency}
                  onChange={handleChange}
                  placeholder={f.fields.freqDefault}
                  options={f.frequencies}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">
                  {f.fields.impact}
                </label>
                <Select
                  name="impact"
                  value={form.impact}
                  onChange={handleChange}
                  placeholder={f.fields.impactDefault}
                  options={f.impacts}
                />
              </div>
            </div>

            {/* Current solution */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2">
                {f.fields.solution} <span className="text-gray-700">{f.fields.solutionOptional}</span>
              </label>
              <textarea
                name="current_solution"
                value={form.current_solution}
                onChange={handleChange}
                rows={2}
                placeholder={f.fields.solutionPlaceholder}
                className="input-forge resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-fire w-full flex items-center justify-center gap-2 py-4 text-base"
            >
              {loading ? (
                <><Loader2 size={18} className="animate-spin" />{f.submitting}</>
              ) : (
                <><Send size={16} />{f.submitBtn}</>
              )}
            </button>

            <p className="text-center text-gray-700 text-xs">{f.privacy}</p>
          </form>
        </div>
      </div>
    </section>
  )
}
