// Metadata for Services page - Global reach
export const metadata = {
  title: 'Global Mental Health Services & Online Therapy Sessions',
  description: 'Explore our comprehensive range of mental health services including individual therapy, group counseling, couples therapy, and specialized treatment programs across Africa, Europe, and North America. Book your session today.',
  keywords: [
    'mental health services global',
    'online therapy sessions',
    'international counseling services',
    'individual therapy worldwide',
    'group therapy international',
    'couples counseling global',
    'mental health treatment worldwide',
    'psychological services international',
    'therapy booking online',
    'mental wellness programs global',
    'teletherapy services',
    'virtual counseling'
  ],
  openGraph: {
    title: 'Global Mental Health Services | Africa Jipende Wellness',
    description: 'Book professional therapy sessions and mental health services. Expert therapists providing individual, group, and specialized counseling across Africa, Europe, and North America.',
    images: [
      {
        url: '/assets/logo1.png',
        width: 1200,
        height: 630,
        alt: 'Global Mental Health Services',
      }
    ],
    type: 'website',
    url: 'https://africajipendewellness.com/services',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Global Mental Health Services | Book Online Therapy Sessions',
    description: 'Professional therapy and counseling services worldwide. Individual, group, and couples therapy available across Africa, Europe, and North America.',
    images: ['/assets/logo1.png'],
  },
  alternates: {
    canonical: 'https://africajipendewellness.com/services',
  },
}

export default function ServicesLayout({ children }) {
  return children
}
