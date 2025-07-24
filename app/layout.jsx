import Navbar from '@/components/Navigation/Navbar'
import './globals.css'
import { Montserrat } from 'next/font/google'
import Footer from '@/components/Navigation/Footer'
import { UserProvider } from '@/context'
import { Providers } from './GlobalRedux/provider'


const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata= {
  title: 'Africa Jipende Wellness | Mental Health',
  description: 'A holistic mental wellness organisation that demystifies mental health in Africa through therapy',
}


export default function RootLayout({
  children,
}) {

  return (
    <html lang="en">
      <UserProvider children={children}>
        <body className={montserrat.className}>
          <Providers >
            <Navbar />
              {children}
            <Footer />
          </Providers>
        </body>
      </UserProvider>
    </html>
  )
}
