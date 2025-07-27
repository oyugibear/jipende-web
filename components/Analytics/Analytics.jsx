'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

// Google Analytics 4 Component
export function GoogleAnalytics({ GA_MEASUREMENT_ID }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return

    // Load Google Analytics script
    const script1 = document.createElement('script')
    script1.async = true
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
    document.head.appendChild(script1)

    // Initialize Google Analytics
    window.dataLayer = window.dataLayer || []
    function gtag() {
      window.dataLayer.push(arguments)
    }
    window.gtag = gtag

    gtag('js', new Date())
    gtag('config', GA_MEASUREMENT_ID, {
      page_title: document.title,
      page_location: window.location.href,
    })

    // Enhanced ecommerce events for mental health services
    gtag('config', GA_MEASUREMENT_ID, {
      custom_map: {
        custom_parameter_1: 'service_type',
        custom_parameter_2: 'therapist_id'
      }
    })

  }, [GA_MEASUREMENT_ID])

  useEffect(() => {
    if (!window.gtag) return

    const url = pathname + searchParams.toString()
    
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
      page_title: document.title,
    })
  }, [pathname, searchParams, GA_MEASUREMENT_ID])

  return null
}

// Event tracking functions
export const trackEvent = (eventName, parameters = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      event_category: parameters.category || 'User Interaction',
      event_label: parameters.label,
      value: parameters.value,
      custom_parameter_1: parameters.service_type,
      custom_parameter_2: parameters.therapist_id,
      ...parameters
    })
  }
}

// Mental health specific tracking events
export const mentalHealthEvents = {
  // Service booking events
  bookingStarted: (serviceType, price) => {
    trackEvent('booking_started', {
      category: 'Booking',
      service_type: serviceType,
      value: price,
      currency: 'KES'
    })
  },

  bookingCompleted: (serviceType, price, therapistId) => {
    trackEvent('purchase', {
      category: 'Booking',
      transaction_id: Date.now().toString(),
      value: price,
      currency: 'KES',
      service_type: serviceType,
      therapist_id: therapistId,
      items: [{
        item_id: serviceType,
        item_name: serviceType,
        category: 'Mental Health Service',
        quantity: 1,
        price: price
      }]
    })
  },

  // User engagement events
  serviceViewed: (serviceType) => {
    trackEvent('view_item', {
      category: 'Service',
      service_type: serviceType,
      content_type: 'service'
    })
  },

  contactFormSubmitted: (formType) => {
    trackEvent('form_submit', {
      category: 'Contact',
      form_type: formType
    })
  },

  blogPostRead: (postTitle, timeSpent) => {
    trackEvent('article_read', {
      category: 'Content',
      article_title: postTitle,
      reading_time: timeSpent
    })
  },

  // Registration and login events
  userRegistered: (userType) => {
    trackEvent('sign_up', {
      category: 'Authentication',
      method: 'email',
      user_type: userType
    })
  },

  userLoggedIn: (userType) => {
    trackEvent('login', {
      category: 'Authentication', 
      method: 'email',
      user_type: userType
    })
  },

  // Cart and checkout events
  addToCart: (serviceType, price) => {
    trackEvent('add_to_cart', {
      category: 'Ecommerce',
      currency: 'KES',
      value: price,
      items: [{
        item_id: serviceType,
        item_name: serviceType,
        category: 'Mental Health Service',
        quantity: 1,
        price: price
      }]
    })
  },

  removeFromCart: (serviceType, price) => {
    trackEvent('remove_from_cart', {
      category: 'Ecommerce',
      currency: 'KES',
      value: price,
      items: [{
        item_id: serviceType,
        item_name: serviceType,
        category: 'Mental Health Service',
        quantity: 1,
        price: price
      }]
    })
  },

  // Search events
  searchPerformed: (searchTerm, resultsCount) => {
    trackEvent('search', {
      category: 'Search',
      search_term: searchTerm,
      results_count: resultsCount
    })
  }
}

// Facebook Pixel Component
export function FacebookPixel({ PIXEL_ID }) {
  useEffect(() => {
    if (!PIXEL_ID) return

    // Facebook Pixel Code
    !(function(f, b, e, v, n, t, s) {
      if (f.fbq) return
      n = f.fbq = function() {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
      }
      if (!f._fbq) f._fbq = n
      n.push = n
      n.loaded = !0
      n.version = '2.0'
      n.queue = []
      t = b.createElement(e)
      t.async = !0
      t.src = v
      s = b.getElementsByTagName(e)[0]
      s.parentNode.insertBefore(t, s)
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')

    fbq('init', PIXEL_ID)
    fbq('track', 'PageView')
  }, [PIXEL_ID])

  return null
}

// Microsoft Clarity Component
export function MicrosoftClarity({ CLARITY_ID }) {
  useEffect(() => {
    if (!CLARITY_ID) return

    (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", CLARITY_ID);
  }, [CLARITY_ID])

  return null
}
