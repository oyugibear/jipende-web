// Metadata for Services Page - Next.js 13+ App Router
export const metadata = {
  title: 'Mental Health Services & Therapy Sessions',
  description: 'Explore our comprehensive range of mental health services including individual therapy, group counseling, couples therapy, and specialized treatment programs in Kenya. Book your session today.',
  keywords: [
    'mental health services Kenya',
    'therapy sessions',
    'counseling services',
    'individual therapy',
    'group therapy',
    'couples counseling',
    'mental health treatment',
    'psychological services',
    'therapy booking Kenya',
    'mental wellness programs'
  ],
  openGraph: {
    title: 'Professional Mental Health Services | Africa Jipende Wellness',
    description: 'Book professional therapy sessions and mental health services. Expert therapists providing individual, group, and specialized counseling in Kenya.',
    images: [
      {
        url: '/assets/services-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Mental Health Services Kenya',
      }
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mental Health Services Kenya | Book Therapy Sessions',
    description: 'Professional therapy and counseling services in Kenya. Individual, group, and couples therapy available.',
  },
  alternates: {
    canonical: 'https://africajipendewellness.com/services',
  },
}

// For use in client components via useHead or similar
export const servicesPageSEO = {
  title: 'Mental Health Services & Therapy Sessions | Africa Jipende Wellness',
  description: 'Explore our comprehensive range of mental health services including individual therapy, group counseling, couples therapy, and specialized treatment programs in Kenya. Book your session today.',
  keywords: 'mental health services Kenya, therapy sessions, counseling services, individual therapy, group therapy, couples counseling, mental health treatment, psychological services, therapy booking Kenya, mental wellness programs',
  url: '/services',
  image: '/assets/services-hero.jpg'
}
