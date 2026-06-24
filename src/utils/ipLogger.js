const IPIFY_URL = 'https://api.ipify.org?format=json'
const IPAPI_URL = 'https://ipapi.co/{ip}/json/'
const LOG_KEY = '__site_visit_logged'

export async function logVisitor(webhookUrl) {
  try {
    const logged = sessionStorage.getItem(LOG_KEY)
    if (logged) return

    const ipRes = await fetch(IPIFY_URL)
    const { ip } = await ipRes.json()

    const geoRes = await fetch(IPAPI_URL.replace('{ip}', ip))
    const geo = await geoRes.json()

    const visitData = {
      ip,
      location: `${geo.city || 'Unknown'}, ${geo.region || ''} ${geo.country || ''}`,
      isp: geo.org || 'Unknown',
      timezone: geo.timezone || 'Unknown',
      userAgent: navigator.userAgent.slice(0, 100),
      screen: `${window.screen.width}x${window.screen.height}`,
      referrer: document.referrer || 'Direct',
      timestamp: new Date().toISOString(),
    }

    console.log(
      '%c[VISITOR LOG]',
      'background:#00ff41;color:#000;font-weight:bold;padding:2px 6px;border-radius:2px;',
      visitData
    )

    if (webhookUrl) {
      const payload = {
        embeds: [{
          title: 'New Site Visitor',
          color: 65280,
          fields: [
            { name: 'IP Address', value: `||${ip}||`, inline: true },
            { name: 'Location', value: visitData.location, inline: true },
            { name: 'ISP', value: visitData.isp, inline: true },
            { name: 'Timezone', value: visitData.timezone, inline: true },
            { name: 'User Agent', value: visitData.userAgent, inline: false },
            { name: 'Screen', value: visitData.screen, inline: true },
            { name: 'Referrer', value: visitData.referrer, inline: true },
          ],
          timestamp: visitData.timestamp,
          footer: { text: 'SangeethK Portfolio — Visitor Log' },
        }],
      }

      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    }

    sessionStorage.setItem(LOG_KEY, '1')
  } catch (err) {
    console.warn('[VisitorLog] Failed to log visit:', err)
  }
}
