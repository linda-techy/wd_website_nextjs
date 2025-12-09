import type { Metadata } from 'next'
import { Bricolage_Grotesque } from 'next/font/google'
import './globals.css'
import Header from '@/components/Layout/Header'
import Footer from '@/components/Layout/Footer'
import { ThemeProvider } from 'next-themes'
import NextTopLoader from 'nextjs-toploader';
import SessionProviderComp from '@/components/nextauth/SessionProvider'
import LeadCapturePopupWrapper from '@/components/shared/LeadCapturePopup/PopupWrapper'
import WhatsAppButton from '@/components/shared/WhatsAppButton'

const font = Bricolage_Grotesque({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Walldot Builders | Best Home Construction Company in Kerala',
  description: 'Walldot Builders is one of the leading construction companies in Kerala, specializing in custom home building, architectural design, and turnkey projects. We craft homes with precision, quality, and a commitment to excellence across Kerala.',
}


export default function RootLayout({
  children,
  session,
}: Readonly<{
  children: React.ReactNode
  session?: any
}>) {
  return (
    <html lang='en'>
      <body className={`${font.className} bg-white dark:bg-black antialiased`}>
        <NextTopLoader color="#07be8a" />
        <SessionProviderComp session={session}>
          <ThemeProvider
            attribute='class'
            enableSystem={true}
            defaultTheme='light'>
            <Header />
            {children}
            <Footer />
            <LeadCapturePopupWrapper />
            <WhatsAppButton />
          </ThemeProvider>
        </SessionProviderComp>
      </body>
    </html>
  )
}
