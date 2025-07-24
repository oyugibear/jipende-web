'use client'

import { useEffect, useState } from 'react'
import { AuthProvider } from '@/context/AuthContext'
import { Providers } from '@/app/GlobalRedux/provider'
import SimpleLoading from '@/components/Constants/Loading/SimpleLoading'

export default function ClientProviders({ children }) {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return <SimpleLoading />
  }

  return (
    <AuthProvider>
      <Providers>
        {children}
      </Providers>
    </AuthProvider>
  )
}
