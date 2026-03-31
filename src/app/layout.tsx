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
import SmoothScroll from '@/components/animations/SmoothScroll'
import Preloader from '@/components/animations/Preloader'
import CustomCursor from '@/components/animations/CustomCursor'

const font = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://walldotbuilders.com'),
  title: {
    default: 'Walldot Builders | Premium Home Construction in Kerala',
    template: '%s | Walldot Builders',
  },
  description: 'Walldot Builders is one of the leading construction companies in Kerala, specializing in custom home building, architectural design, and turnkey projects. We craft homes with precision, quality, and a commitment to excellence.',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-video-preview": -1, "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://walldotbuilders.com",
    siteName: "Walldot Builders",
    images: [{ url: "/images/brochure-og.jpg", width: 1200, height: 630, alt: "Walldot Builders Portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: 'Walldot Builders | Premium Home Construction in Kerala',
    description: 'Specializing in custom home building, architectural design, and turnkey projects across Kerala.',
    images: ["/images/brochure-og.jpg"],
  }
}


export default function RootLayout({
  children,
  session,
}: Readonly<{
  children: React.ReactNode
  session?: any
}>) {
  return (
    <html lang='en-IN'>
      <body className={`${font.className} bg-white dark:bg-black antialiased`}>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": ["GeneralContractor", "LocalBusiness"],
                  "name": "Walldot Builders",
                  "image": "https://walldotbuilders.com/images/header/logo-original.svg",
                  "logo": "https://walldotbuilders.com/images/header/logo-original.svg",
                  "url": "https://walldotbuilders.com",
                  "telephone": "+91-9074-9548-74",
                  "email": "info@walldotbuilders.com",
                  "description": "Walldot Builders is a premium construction company in Thrissur, Kerala, specialising in custom homes, luxury villas, apartments, and commercial buildings.",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "West Fort",
                    "addressLocality": "Thrissur",
                    "addressRegion": "Kerala",
                    "postalCode": "680004",
                    "addressCountry": "IN"
                  },
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 10.5276,
                    "longitude": 76.2144
                  },
                  "areaServed": [
                    { "@type": "State", "name": "Kerala" },
                    { "@type": "City", "name": "Thrissur" },
                    { "@type": "City", "name": "Kochi" },
                    { "@type": "City", "name": "Kozhikode" }
                  ],
                  "serviceType": ["Residential Construction", "Luxury Villa Construction", "Apartment Construction", "Commercial Construction", "Turnkey Projects", "Interior Design"],
                  "sameAs": [
                    "https://www.instagram.com/walldotbuilders",
                    "https://www.facebook.com/walldotbuilders"
                  ],
                  "openingHoursSpecification": {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
                    "opens": "09:00",
                    "closes": "18:00"
                  }
                })
            }}
        />
        <NextTopLoader color="#07be8a" />
        <SessionProviderComp session={session}>
          <ThemeProvider
            attribute='class'
            enableSystem={true}
            defaultTheme='light'>
            <Preloader />
            <CustomCursor />
            <Header />
            <SmoothScroll>
              {children}
            </SmoothScroll>
            <Footer />
            <LeadCapturePopupWrapper />
            <WhatsAppButton />
          </ThemeProvider>
        </SessionProviderComp>
      </body>
    </html>
  )
}
