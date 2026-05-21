import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') ?? ''
const NOTIFY_EMAILS  = Deno.env.get('NOTIFY_EMAILS') ?? ''
const WEBHOOK_SECRET = Deno.env.get('WEBHOOK_SECRET') ?? ''

const FREQUENCY_LABELS: Record<string, string> = {
  daily:        'Todos os dias',
  weekly:       'Toda semana',
  monthly:      'Todo mês',
  occasionally: 'Às vezes',
}

const IMPACT_LABELS: Record<string, string> = {
  time:      'Perco muito tempo',
  money:     'Perco dinheiro',
  customers: 'Perco clientes',
  team:      'Estresso minha equipe',
  all:       'Tudo acima',
}

function buildHtml(pain: Record<string, string | null>): string {
  const row = (label: string, value: string | null) =>
    value
      ? `<tr>
           <td style="padding:8px 12px;color:#888;font-size:13px;white-space:nowrap;vertical-align:top">${label}</td>
           <td style="padding:8px 12px;color:#e5e5e5;font-size:13px">${value}</td>
         </tr>`
      : ''

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#0d0d0d;font-family:Arial,Helvetica,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0d0d0d;padding:32px 16px">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#111;border:1px solid #1e1e1e;border-radius:12px;overflow:hidden;max-width:560px;width:100%">

        <!-- Header -->
        <tr>
          <td style="background:#f97316;padding:4px 0"></td>
        </tr>
        <tr>
          <td style="padding:24px 28px 16px">
            <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:2px;color:#f97316;text-transform:uppercase">Seimons Forge</p>
            <h1 style="margin:6px 0 0;font-size:20px;font-weight:800;color:#ffffff">Nova dor recebida 🔥</h1>
          </td>
        </tr>

        <!-- Badge categoria -->
        <tr>
          <td style="padding:0 28px 20px">
            <span style="display:inline-block;font-size:12px;font-weight:600;padding:4px 12px;border-radius:20px;background:rgba(249,115,22,0.15);color:#fb923c;border:1px solid rgba(249,115,22,0.3)">
              ${pain.category ?? '—'}
            </span>
          </td>
        </tr>

        <!-- Campos -->
        <tr>
          <td style="padding:0 16px 24px">
            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">
              ${row('Descrição', pain.description)}
              ${row('Frequência', pain.frequency ? FREQUENCY_LABELS[pain.frequency] ?? pain.frequency : null)}
              ${row('Impacto', pain.impact ? IMPACT_LABELS[pain.impact] ?? pain.impact : null)}
              ${row('Solução atual', pain.current_solution)}
              ${row('Nome', pain.name)}
              ${row('E-mail', pain.email)}
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:16px 28px;border-top:1px solid #1e1e1e">
            <p style="margin:0;font-size:12px;color:#444">seimons.com.br</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}

serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  // Verificar secret se configurado
  if (WEBHOOK_SECRET) {
    const secret = req.headers.get('x-webhook-secret')
    if (secret !== WEBHOOK_SECRET) {
      return new Response('Unauthorized', { status: 401 })
    }
  }

  let payload: { type: string; record: Record<string, string | null> }
  try {
    payload = await req.json()
  } catch {
    return new Response('Invalid JSON', { status: 400 })
  }

  if (payload.type !== 'INSERT' || !payload.record) {
    return new Response('Not an insert event', { status: 200 })
  }

  const pain = payload.record
  const toEmails = NOTIFY_EMAILS.split(',').map(e => e.trim()).filter(Boolean)

  if (toEmails.length === 0) {
    console.error('NOTIFY_EMAILS not configured')
    return new Response('NOTIFY_EMAILS not configured', { status: 500 })
  }

  const emailRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Seimons Forge <onboarding@resend.dev>',
      to: toEmails,
      subject: `Nova dor recebida: ${pain.category ?? 'sem categoria'}`,
      html: buildHtml(pain),
    }),
  })

  if (!emailRes.ok) {
    const err = await emailRes.text()
    console.error('Resend error:', err)
    return new Response('Email send failed', { status: 500 })
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
})
