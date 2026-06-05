'use client'

import { AuthProvider } from '@/context/AuthContext'
import { Providers } from '@/app/GlobalRedux/provider'

export default function ClientProviders({ children }) {
  return (
    <AuthProvider>
      <Providers>
        {children}
      </Providers>
    </AuthProvider>
  )
}
