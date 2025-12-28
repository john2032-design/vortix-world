export default {
  async fetch(request) {
    const ALLOWED_ORIGIN = 'https://vortix-world-bypass.vercel.app/'
    const SECRET_KEY = 'h135355N'
    const reqUrl = new URL(request.url)
    const origin = request.headers.get('Origin') || ''
    const referer = request.headers.get('Referer') || ''

    if (!origin.startsWith(ALLOWED_ORIGIN) && !referer.startsWith(ALLOWED_ORIGIN)) {
      return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403, headers: { 'Content-Type': 'application/json' } })
    }

    if (reqUrl.searchParams.get('key') !== SECRET_KEY) {
      return new Response(JSON.stringify({ error: 'Invalid key' }), { status: 403, headers: { 'Content-Type': 'application/json' } })
    }

    const target = reqUrl.searchParams.get('url')
    if (!target || !target.startsWith('http')) {
      return new Response(JSON.stringify({ error: 'Missing url' }), { status: 400, headers: { 'Content-Type': 'application/json' } })
    }

    try {
      const r = await fetch('https://nigger-jet.vercel.app/bypass?url=' + encodeURIComponent(target))
      const body = await r.text()
      return new Response(body, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': ALLOWED_ORIGIN
        }
      })
    } catch {
      return new Response(JSON.stringify({ error: 'Upstream failed' }), { status: 502, headers: { 'Content-Type': 'application/json' } })
    }
  }
}
