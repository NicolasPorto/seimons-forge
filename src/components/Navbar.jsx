export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-forge-border/50 backdrop-blur-md bg-forge-bg/80">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-forge-fire flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
              <path d="M13.5 5.5c0 .83-.67 1.5-1.5 1.5S10.5 6.33 10.5 5.5 11.17 4 12 4s1.5.67 1.5 1.5z"/>
            </svg>
          </div>
          <span className="font-bold text-white tracking-tight">
            Seimons<span className="fire-text">Forge</span>
          </span>
        </div>

        <a
          href="#submit"
          className="btn-fire text-sm px-4 py-2 hidden sm:block"
        >
          Enviar minha dor
        </a>
      </div>
    </nav>
  )
}
