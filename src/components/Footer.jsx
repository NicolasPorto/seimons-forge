import { useLanguage } from '../context/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()
  const f = t.footer

  return (
    <footer className="border-t border-forge-border py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-forge-fire flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
              </svg>
            </div>
            <span className="font-bold text-white text-sm">
              Seimons<span className="fire-text">Forge</span>
            </span>
          </div>

          <p className="text-gray-700 text-xs text-center">
            {f.tagline} © {new Date().getFullYear()} Seimons Forge.
          </p>

          <div className="flex gap-4 text-xs text-gray-700">
            <a href="#" className="hover:text-gray-400 transition-colors">{f.privacy}</a>
            <a href="#submit" className="hover:text-forge-fire transition-colors">{f.cta}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
