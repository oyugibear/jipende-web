// SEO Utility Functions and Structured Data
export const structuredData = {
  // Organization Schema
  organization: {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    "name": "Africa Jipende Wellness",
    "alternateName": "Jipende Wellness",
    "url": "https://africajipendewellness.com",
    "logo": "https://africajipendewellness.com/assets/logo1.png",
    "description": "Professional mental health and therapy services in Kenya and Africa",
    "foundingDate": "2020",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "Kenya",
      "addressRegion": "Nairobi",
      "addressLocality": "Nairobi"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": ["English", "Swahili"],
      "areaServed": "Kenya"
    },
    "medicalSpecialty": [
      "Mental Health",
      "Psychotherapy", 
      "Counseling Psychology",
      "Clinical Psychology"
    ],
    "sameAs": [
      "https://www.facebook.com/jipendewellness/",
      "https://www.instagram.com/jipendewellness/",
      "https://x.com/jipendewellness",
      "https://www.youtube.com/@africajipendewellness9825"
    ],
    "serviceArea": {
      "@type": "Country",
      "name": "Kenya"
    }
  },

  // Website Schema
  website: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Africa Jipende Wellness",
    "url": "https://africajipendewellness.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://africajipendewellness.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Africa Jipende Wellness"
    }
  },

  // Services Schema
  services: (serviceName, description, price) => ({
    "@context": "https://schema.org",
    "@type": "MedicalService",
    "name": serviceName,
    "description": description,
    "provider": {
      "@type": "MedicalOrganization",
      "name": "Africa Jipende Wellness",
      "url": "https://africajipendewellness.com"
    },
    "serviceType": "Mental Health Service",
    "areaServed": {
      "@type": "Country",
      "name": "Kenya"
    },
    "offers": {
      "@type": "Offer",
      "price": price,
      "priceCurrency": "KES",
      "availability": "https://schema.org/InStock"
    }
  }),

  // FAQ Schema
  faq: (faqs) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }),

  // Article Schema for Blog Posts
  article: (title, description, author, datePublished, image) => ({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "author": {
      "@type": "Person",
      "name": author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Africa Jipende Wellness",
      "logo": {
        "@type": "ImageObject",
        "url": "https://africajipendewellness.com/assets/logo1.png"
      }
    },
    "datePublished": datePublished,
    "dateModified": datePublished,
    "image": image,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://africajipendewellness.com/Blogs"
    }
  })
}

// SEO Keywords by Category
export const keywords = {
  primary: [
    'mental health Kenya',
    'therapy services Africa',
    'counseling Kenya',
    'mental wellness',
    'psychological therapy'
  ],
  services: [
    'individual therapy Kenya',
    'group therapy sessions',
    'couples counseling',
    'family therapy',
    'mental health consultation',
    'psychological assessment',
    'trauma therapy',
    'anxiety treatment',
    'depression counseling'
  ],
  locations: [
    'mental health Nairobi',
    'therapy Mombasa',
    'counseling Kisumu',
    'mental health services Kenya'
  ],
  conditions: [
    'anxiety therapy Kenya',
    'depression treatment',
    'PTSD counseling',
    'stress management',
    'relationship counseling',
    'grief counseling',
    'addiction therapy'
  ]
}

// Page-specific SEO configurations
export const pageConfigs = {
  home: {
    title: 'Africa Jipende Wellness | Mental Health & Therapy Services in Kenya',
    description: 'Transform your mental wellness journey with Africa Jipende Wellness. Professional therapy, counseling, and mental health support services across Kenya and Africa. Book your session today.',
    keywords: [...keywords.primary, ...keywords.services.slice(0, 5)].join(', '),
    structuredData: [structuredData.organization, structuredData.website]
  },
  services: {
    title: 'Mental Health Services & Therapy Sessions',
    description: 'Explore our comprehensive range of mental health services including individual therapy, group counseling, couples therapy, and specialized treatment programs in Kenya.',
    keywords: keywords.services.join(', '),
    structuredData: [structuredData.organization]
  },
  about: {
    title: 'About Us - Mental Health Professionals',
    description: 'Learn about Africa Jipende Wellness, our mission to demystify mental health in Africa, and our team of qualified mental health professionals and therapists.',
    keywords: ['about mental health organization', 'mental health professionals Kenya', 'therapy team Africa', 'mental wellness mission'].join(', ')
  },
  contact: {
    title: 'Contact Us - Book Your Therapy Session',
    description: 'Get in touch with Africa Jipende Wellness to book your therapy session, ask questions, or learn more about our mental health services in Kenya.',
    keywords: ['contact mental health services', 'book therapy session Kenya', 'mental health consultation', 'therapy appointment'].join(', ')
  },
  blogs: {
    title: 'Mental Health Blog & Resources',
    description: 'Read our latest articles on mental health, wellness tips, therapy insights, and mental health awareness. Expert advice from qualified therapists in Kenya.',
    keywords: ['mental health blog Kenya', 'therapy articles', 'mental wellness tips', 'psychology insights', 'mental health resources'].join(', ')
  }
}

// Generate meta tags for any page
export const generateMetaTags = (pageKey, customData = {}) => {
  const config = pageConfigs[pageKey] || pageConfigs.home
  
  return {
    title: customData.title || config.title,
    description: customData.description || config.description,
    keywords: customData.keywords || config.keywords,
    openGraph: {
      title: customData.title || config.title,
      description: customData.description || config.description,
      type: 'website',
      url: `https://africajipendewellness.com${customData.path || ''}`,
      images: [
        {
          url: customData.image || '/assets/logo1.png',
          width: 1200,
          height: 630,
          alt: customData.imageAlt || 'Africa Jipende Wellness'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: customData.title || config.title,
      description: customData.description || config.description,
      images: [customData.image || '/assets/logo1.png']
    },
    structuredData: config.structuredData || [structuredData.organization]
  }
}
