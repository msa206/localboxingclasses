export function GET(): Response {
  const robotsText = `User-agent: *
Allow: /
Disallow: /classes

Sitemap: https://localboxingclasses.com/sitemap.xml`

  return new Response(robotsText, {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}