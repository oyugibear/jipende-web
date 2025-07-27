import { NextResponse } from 'next/server'

export async function GET() {
  // Dynamic sitemap for Africa Jipende Wellness - serving Africa, Europe & North America
  const baseUrl = 'https://africajipendewellness.com'
  const currentDate = new Date().toISOString().split('T')[0]

  // Static pages with enhanced SEO priorities for global reach
  const staticPages = [
    { url: '', priority: '1.0', changefreq: 'weekly' },
    { url: '/services', priority: '0.9', changefreq: 'weekly' },
    { url: '/about', priority: '0.8', changefreq: 'monthly' },
    { url: '/contacts', priority: '0.8', changefreq: 'monthly' },
    { url: '/Blogs', priority: '0.8', changefreq: 'weekly' },
    { url: '/auth/login', priority: '0.6', changefreq: 'monthly' },
    { url: '/auth/register', priority: '0.6', changefreq: 'monthly' },
    { url: '/cart', priority: '0.5', changefreq: 'weekly' },
    { url: '/account', priority: '0.4', changefreq: 'monthly' },
    { url: '/sessions', priority: '0.5', changefreq: 'weekly' },
    { url: '/terms', priority: '0.3', changefreq: 'yearly' },
    { url: '/serviceDescription', priority: '0.7', changefreq: 'monthly' },
    { url: '/forms', priority: '0.6', changefreq: 'monthly' },
  ]

  // TODO: Add dynamic pages from database for global service reach
  // const services = await fetch(`${process.env.NEXT_PUBLIC_API_URL || baseUrl}/api/services`).then(res => res.json())
  // const blogs = await fetch(`${process.env.NEXT_PUBLIC_API_URL || baseUrl}/api/blogs`).then(res => res.json())
  
  // Enhanced sitemap with structured data for global mental health services
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${staticPages.map(page => `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <mobile:mobile/>
    ${page.url === '' ? `
    <image:image>
      <image:loc>${baseUrl}/assets/logo1.png</image:loc>
      <image:title>Africa Jipende Wellness - Mental Health Services</image:title>
      <image:caption>Professional mental health and therapy services across Africa, Europe and North America</image:caption>
    </image:image>` : ''}
  </url>
`).join('')}
</urlset>`

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate'
    }
  })
}
