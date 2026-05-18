import { createContext, useContext, useState } from 'react'
import { translations } from '../lib/i18n'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(
    () => localStorage.getItem('sf_lang') || 'pt'
  )

  const toggle = () => {
    const next = lang === 'pt' ? 'en' : 'pt'
    localStorage.setItem('sf_lang', next)
    setLang(next)
  }

  const t = translations[lang]

  return (
    <LanguageContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
