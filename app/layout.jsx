
import Navbar from '@/components/Navigation/Navbar'
import './globals.css'
import { Montserrat } from 'next/font/google'
import Footer from '@/components/Navigation/Footer'
import ClientProviders from '@/components/Providers/ClientProviders'
import AnalyticsWrapper from '@/components/Analytics/AnalyticsWrapper'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata = {
  metadataBase: new URL('https://africajipendewellness.com'),
  title: {
    default: 'Africa Jipende Wellness | Mental Health & Therapy Services in Kenya',
    template: '%s | Africa Jipende Wellness'
  },
  description: 'Africa Jipende Wellness is a leading mental health organization providing professional therapy, counseling, and wellness services across Africa, Europe, and North America. We demystify mental health globally through evidence-based therapeutic approaches.',
  keywords: [
    'mental health Africa Europe North America',
    'therapy services global',
    'counseling international', 
    'mental wellness worldwide',
    'psychological therapy global',
    'mental health support international',
    'African mental health services',
    'therapy sessions worldwide',
    'mental health professionals global',
    'wellness programs international',
    'psychological counseling worldwide',
    'mental health awareness global',
    'therapeutic services international',
    'mental health consultation global'
  ],
  authors: [{ name: 'Africa Jipende Wellness' }],
  creator: 'Africa Jipende Wellness',
  publisher: 'Africa Jipende Wellness',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['en_GB', 'en_CA', 'fr_FR', 'es_ES'],
    url: 'https://africajipendewellness.com',
    title: 'Africa Jipende Wellness | Global Mental Health Services',
    description: 'Transform your mental wellness journey with Africa Jipende Wellness. Professional therapy, counseling, and mental health support services across Africa, Europe, and North America.',
    siteName: 'Africa Jipende Wellness',
    images: [
      {
        url: '/assets/logo1.png',
        width: 1200,
        height: 630,
        alt: 'Africa Jipende Wellness Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Africa Jipende Wellness | Mental Health Services',
    description: 'Professional mental health and therapy services in Kenya. Book your session today.',
    site: '@jipendewellness',
    creator: '@jipendewellness',
    images: ['/assets/logo1.png'],
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  alternates: {
    canonical: 'https://africajipendewellness.com',
  },
  category: 'Healthcare',
}

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#eab308" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalOrganization",
              "name": "Africa Jipende Wellness",
              "url": "https://africajipendewellness.com",
              "logo": "https://africajipendewellness.com/assets/logo1.png",
              "description": "Professional mental health and therapy services across Africa, Europe, and North America",
              "areaServed": [
                {
                  "@type": "Place",
                  "name": "Africa"
                },
                {
                  "@type": "Place", 
                  "name": "Europe"
                },
                {
                  "@type": "Place",
                  "name": "North America"
                }
              ],
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "Kenya",
                "addressRegion": "Nairobi"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "availableLanguage": ["English", "French", "Spanish", "Swahili"]
              },
              "medicalSpecialty": "Mental Health",
              "serviceType": "Online Mental Health Services",
              "sameAs": [
                "https://www.facebook.com/jipendewellness/",
                "https://www.instagram.com/jipendewellness/",
                "https://x.com/jipendewellness",
                "https://www.youtube.com/@africajipendewellness9825"
              ]
            })
          }}
        />
      </head>
      <body className={montserrat.className}>
        {/* Analytics Components */}
        <AnalyticsWrapper 
          GA_MEASUREMENT_ID="G-XXXXXXXXXX"
          PIXEL_ID="XXXXXXXXXX" 
          CLARITY_ID="XXXXXXXXXX"
        />
        
        <ClientProviders>
          <Navbar />
          {children}
          <Footer />
        </ClientProviders>
      </body>
    </html>
  )
}
