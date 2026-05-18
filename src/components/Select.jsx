import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check } from 'lucide-react'

export default function Select({ options, value, onChange, placeholder, name }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const selected = options.find((o) => (o.value ?? o) === value)
  const label = selected ? (selected.label ?? selected) : null

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleSelect = (optValue) => {
    onChange({ target: { name, value: optValue } })
    setOpen(false)
  }

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`
          w-full flex items-center justify-between gap-3
          bg-forge-muted border rounded-xl px-4 py-3
          text-sm transition-all duration-200 outline-none text-left
          ${open
            ? 'border-forge-fire shadow-[0_0_0_3px_rgba(249,115,22,0.1)]'
            : 'border-forge-border hover:border-gray-600'
          }
          ${label ? 'text-white' : 'text-gray-600'}
        `}
      >
        <span className="truncate">{label ?? placeholder}</span>
        <ChevronDown
          size={15}
          className={`flex-shrink-0 text-gray-500 transition-transform duration-200 ${open ? 'rotate-180 text-forge-fire' : ''}`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 left-0 right-0 mt-2 rounded-xl border border-forge-border bg-[#141414] shadow-[0_8px_32px_rgba(0,0,0,0.6)] overflow-hidden">
          <div className="max-h-56 overflow-y-auto scrollbar-hide py-1">
            {options.map((opt) => {
              const optValue = opt.value ?? opt
              const optLabel = opt.label ?? opt
              const isSelected = optValue === value

              return (
                <button
                  key={optValue}
                  type="button"
                  onClick={() => handleSelect(optValue)}
                  className={`
                    w-full flex items-center justify-between gap-3
                    px-4 py-2.5 text-sm text-left transition-colors duration-100
                    ${isSelected
                      ? 'bg-orange-500/10 text-orange-400'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                    }
                  `}
                >
                  <span>{optLabel}</span>
                  {isSelected && <Check size={13} className="flex-shrink-0 text-forge-fire" />}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
