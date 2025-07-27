'use client'

import Head from 'next/head'

export default function SEOHead({ 
  title,
  description,
  keywords,
  image = '/assets/logo1.png',
  url,
  type = 'website',
  noindex = false 
}) {
  const siteUrl = 'https://africajipendewellness.com'
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl
  const fullTitle = title ? `${title} | Africa Jipende Wellness` : 'Africa Jipende Wellness | Mental Health & Therapy Services in Kenya'

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content="Africa Jipende Wellness" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${image}`} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="Africa Jipende Wellness" />
      <meta property="og:locale" content="en_KE" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@jipendewellness" />
      <meta name="twitter:creator" content="@jipendewellness" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${image}`} />

      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#eab308" />
      <meta name="msapplication-TileColor" content="#eab308" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Geo Tags for Kenya */}
      <meta name="geo.region" content="KE" />
      <meta name="geo.placename" content="Kenya" />
      <meta name="ICBM" content="-1.2864, 36.8172" />
      
      {/* Business Schema */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HealthAndBeautyBusiness",
            "name": "Africa Jipende Wellness",
            "image": `${siteUrl}/assets/logo1.png`,
            "url": fullUrl,
            "telephone": "+254-XXX-XXXX",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Nairobi",
              "addressLocality": "Nairobi",
              "addressCountry": "KE"
            },
            "openingHours": "Mo-Fr 08:00-18:00",
            "priceRange": "$$",
            "acceptsReservations": true,
            "servesCuisine": [],
            "makesOffer": {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Mental Health Therapy Services",
                "description": description
              }
            }
          })
        }}
      />
    </Head>
  )
}
