
import Navbar from '@/components/Navigation/Navbar'
import './globals.css'
import { Montserrat } from 'next/font/google'
import Footer from '@/components/Navigation/Footer'
import ClientProviders from '@/components/Providers/ClientProviders'



const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata = {
  title: 'Africa Jipende Wellness | Mental Health',
  description: 'A holistic mental wellness organisation that demystifies mental health in Africa through therapy',
}

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <head>
        <title>Africa Jipende Wellness | Mental Health</title>
        <meta name="description" content="A holistic mental wellness organisation that demystifies mental health in Africa through therapy" />
      </head>
      <body className={montserrat.className}>
        <ClientProviders>
          <Navbar />
          {children}
          <Footer />
        </ClientProviders>
      </body>
    </html>
  )
}
