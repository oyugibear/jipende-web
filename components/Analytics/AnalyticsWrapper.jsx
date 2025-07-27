'use client'

import { Suspense } from 'react'
import { GoogleAnalytics, FacebookPixel, MicrosoftClarity } from './Analytics'

// Wrapper component that handles Suspense for analytics
function AnalyticsContent({ GA_MEASUREMENT_ID, PIXEL_ID, CLARITY_ID }) {
  return (
    <>
      <GoogleAnalytics GA_MEASUREMENT_ID={GA_MEASUREMENT_ID} />
      <FacebookPixel PIXEL_ID={PIXEL_ID} />
      <MicrosoftClarity CLARITY_ID={CLARITY_ID} />
    </>
  )
}

export default function AnalyticsWrapper({ GA_MEASUREMENT_ID, PIXEL_ID, CLARITY_ID }) {
  return (
    <Suspense fallback={null}>
      <AnalyticsContent 
        GA_MEASUREMENT_ID={GA_MEASUREMENT_ID}
        PIXEL_ID={PIXEL_ID}
        CLARITY_ID={CLARITY_ID}
      />
    </Suspense>
  )
}
