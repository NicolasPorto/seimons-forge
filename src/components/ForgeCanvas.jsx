import { useEffect, useRef } from 'react'

const COLORS = ['#f97316', '#fb923c', '#fdba74', '#fbbf24', '#ea580c']
const CONNECTION_DIST = 130
const MAX_PARTICLES = 80

class Particle {
  constructor(w, h, scatterY = false) {
    this.w = w
    this.h = h
    this.reset(scatterY)
  }

  reset(scatterY = false) {
    this.x      = Math.random() * this.w
    this.y      = scatterY ? Math.random() * this.h : this.h + Math.random() * 100
    this.size   = Math.random() * 1.8 + 0.4
    this.speedY = -(Math.random() * 0.5 + 0.2)
    this.speedX = (Math.random() - 0.5) * 0.3
    this.maxOp  = Math.random() * 0.5 + 0.2
    this.opacity = scatterY ? this.maxOp : 0
    this.fadeIn  = Math.random() * 0.008 + 0.005
    this.rising  = !scatterY
    this.color   = COLORS[Math.floor(Math.random() * COLORS.length)]
  }

  update() {
    this.x += this.speedX
    this.y += this.speedY

    // Fade in rápido ao nascer
    if (this.rising && this.opacity < this.maxOp) {
      this.opacity = Math.min(this.opacity + this.fadeIn, this.maxOp)
    }

    // Fade out suave só quando está perto do topo
    if (this.y < 120) {
      this.opacity -= 0.006
    }

    if (this.y < -10 || this.opacity <= 0) {
      this.reset()
    }
  }

  draw(ctx) {
    ctx.save()
    ctx.globalAlpha = Math.max(0, this.opacity)
    ctx.fillStyle   = this.color
    ctx.shadowBlur  = 8
    ctx.shadowColor = this.color
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }
}

export default function ForgeCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    let rafId
    let particles = []

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }

    const init = (scatter = false) => {
      const count = Math.min(
        Math.floor((canvas.width * canvas.height) / 9000),
        MAX_PARTICLES
      )
      particles = Array.from(
        { length: count },
        () => new Particle(canvas.width, canvas.height, scatter)
      )
    }

    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx   = particles[i].x - particles[j].x
          const dy   = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist >= CONNECTION_DIST) continue

          ctx.save()
          ctx.globalAlpha = (1 - dist / CONNECTION_DIST) * 0.1
          ctx.strokeStyle = '#f97316'
          ctx.lineWidth   = 0.5
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.stroke()
          ctx.restore()
        }
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawConnections()
      particles.forEach((p) => { p.update(); p.draw(ctx) })
      rafId = requestAnimationFrame(animate)
    }

    const handleResize = () => { resize(); init() }

    resize()
    init(true)
    animate()
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9999,
        opacity: 0.25,
      }}
    />
  )
}
