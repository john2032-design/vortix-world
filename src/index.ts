export default {
  async fetch(request) {
    const ALLOWED_ORIGIN = 'https://vortix-world-bypass.vercel.app'
    const SECRET_KEY = 'h135355N-9FQeZKpL2A8YwXrD'
    const reqUrl = new URL(request.url)
    const origin = request.headers.get('Origin') || ''
    const referer = request.headers.get('Referer') || ''

    if (!origin.startsWith(ALLOWED_ORIGIN) && !referer.startsWith(ALLOWED_ORIGIN)) {
      return new Response(JSON.stringify({ status: 'error' }), { status: 403 })
    }

    if (reqUrl.searchParams.get('key') !== SECRET_KEY) {
      return new Response(JSON.stringify({ status: 'error' }), { status: 403 })
    }

    const target = reqUrl.searchParams.get('url')
    if (!target || !target.startsWith('http')) {
      return new Response(JSON.stringify({ status: 'error' }), { status: 400 })
    }

    try {
      const r = await fetch('https://nigger-jet.vercel.app/bypass?url=' + encodeURIComponent(target))
      const j = await r.json()

      return new Response(JSON.stringify({
        status: j.status || 'error',
        time_taken: j.time_taken || 0,
        result: j.result || ''
      }), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': ALLOWED_ORIGIN
        }
      })
    } catch {
      return new Response(JSON.stringify({ status: 'error' }), { status: 500 })
    }
  }
}
