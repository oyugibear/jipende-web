
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
    default: 'Africa Jipende Wellness | Therapy Platform in Kenya',
    template: '%s | Africa Jipende Wellness'
  },
  description: 'Africa Jipende Wellness is a Kenya-based hybrid therapy platform supporting online and in-person mental wellness care for clients, therapists, and administrators.',
  keywords: [
    'therapy Kenya',
    'online therapy Kenya',
    'in-person therapy Nairobi',
    'mental wellness Kenya',
    'Africa Jipende Wellness',
    'couples therapy Kenya',
    'family therapy Nairobi',
    'corporate wellness Kenya',
    'school wellness Kenya',
    'therapist portal',
    'client therapy portal',
    'mental health platform Kenya'
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
    locale: 'en_KE',
    alternateLocale: ['en_US', 'en_GB'],
    url: 'https://africajipendewellness.com',
    title: 'Africa Jipende Wellness | Therapy Platform in Kenya',
    description: 'Online and in-person therapy in Kenya with secure client, therapist, and admin portal experiences.',
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
    title: 'Africa Jipende Wellness | Therapy Platform',
    description: 'Hybrid therapy in Kenya with secure portal experiences for clients and therapists.',
    site: '@jipendewellness',
    creator: '@jipendewellness',
    images: ['/assets/logo1.png'],
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
        <meta name="theme-color" content="#0F1115" />
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
              "description": "Hybrid online and in-person mental wellness care in Kenya",
              "areaServed": [
                {
                  "@type": "Place",
                  "name": "Kenya"
                },
                {
                  "@type": "Place", 
                  "name": "East Africa"
                }
              ],
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Kilimani",
                "addressLocality": "Nairobi",
                "addressCountry": "Kenya",
                "addressRegion": "Nairobi"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "email": "info@africajipendewellness.com",
                "availableLanguage": ["English", "Swahili"]
              },
              "medicalSpecialty": "Mental Health",
              "serviceType": "Online and In-Person Therapy",
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
      <body className={`${montserrat.className} bg-[#FAFAF8] text-[#0F1115] antialiased`}>
        {/* Analytics Components */}
        <AnalyticsWrapper 
          GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}
          PIXEL_ID={process.env.NEXT_PUBLIC_PIXEL_ID}
          CLARITY_ID={process.env.NEXT_PUBLIC_CLARITY_ID}
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
