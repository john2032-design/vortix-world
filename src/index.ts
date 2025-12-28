export default {
  async fetch(request) {
    const { searchParams } = new URL(request.url)
    const target = searchParams.get('url')

    if (!target || !target.startsWith('http')) {
      return new Response(JSON.stringify({ error: 'Missing url' }), { status: 400 })
    }

    const providers = [
      'https://ancient-dew-2472.fly.dev/api?url=',
      'https://bypass.pm/bypass?url='
    ]

    for (const base of providers) {
      try {
        const r = await fetch(base + encodeURIComponent(target))
        if (!r.ok) continue
        const body = await r.text()
        return new Response(body, {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        })
      } catch {}
    }

    return new Response(JSON.stringify({ error: 'All providers failed' }), { status: 502 })
  }
}
