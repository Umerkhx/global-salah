import { ThemeProvider } from "@/components/ui/theme-provider";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import { Toaster } from "sonner";
import Footer from "./(Home)/Footer";
import Navbar from "./(Home)/Navbar";
import "./globals.css";
import HtmlLangSetter from "@/components/HtmlLangSetter";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins-sans',
  display: "swap",
  preload: true
});

export const metadata: Metadata = {
  title: "Global Salah",
  description: "Global Salah is a platform that helps you find the most accurate prayer times for your location.",
  robots: {
    index: false,
    follow: false,
    nocache: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="0likJSP3-if8goGabTQOnxr1vNU8eh-XAd8JWDk3ZyU" />
        <meta name="msvalidate.01" content="D56CF647A902FCA3278A894778A65D88" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="alternate" hrefLang="fr" href="https://globalsalah.com/fr" />
        <link rel="alternate" hrefLang="ar" href="https://globalsalah.com/ar" />
        <link rel="preload" as="fetch" href="/locales/en.json" crossOrigin="anonymous" />
        <link rel="preload" as="fetch" href="/locales/ar.json" crossOrigin="anonymous" />
        <link rel="preload" as="fetch" href="/locales/fr.json" crossOrigin="anonymous" />
        <link rel="preload" as="fetch" href="/locales/es.json" crossOrigin="anonymous" />
        <link rel="preload" as="fetch" href="/locales/de.json" crossOrigin="anonymous" />
        <link rel="preload" as="fetch" href="/locales/ur.json" crossOrigin="anonymous" />
        <link rel="preload" as="fetch" href="/locales/tr.json" crossOrigin="anonymous" />
        <link rel="preload" as="fetch" href="/locales/pt.json" crossOrigin="anonymous" />
        <link rel="preload" as="fetch" href="/locales/ru.json" crossOrigin="anonymous" />
        <link rel="preload" as="fetch" href="/locales/zh-CN.json" crossOrigin="anonymous" />
        <link
          rel="preload"
          as="image"
          href="/banner-img-salah.webp"
          fetchPriority="high"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-KVK6TX0YCX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-KVK6TX0YCX');
        `}
        </Script>

        <Script
          src="https://cdn.jsdelivr.net/gh/manuelmhtr/countries-and-timezones@latest/dist/index.min.js"
          strategy="afterInteractive"
        />
        <Script
          id="cookieyes"
          src="https://cdn-cookieyes.com/client_data/5dcbb80ae3d7d4ff3df3c423/script.js"
          strategy="afterInteractive"
        />

        <Script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Global Salah",
              "url": "https://globalsalah.com/en/",
              "logo": "https://globalsalah.com/global-salah-logo.webp",
              "alternateName": "Global Salah",
              "sameAs": [
                "https://www.facebook.com/globalsalahofficial/",
                "https://x.com/globalsalah",
                "https://www.pinterest.com/globalsalah/"
              ],
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "telephone": "",
                  "contactType": "",
                  "email": "support@globalsalah.com"
                }
              ]
            })
          }}
          strategy="afterInteractive"
        />
      </head>
      <body className={`${poppins.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <HtmlLangSetter />
          <Navbar />
          <Toaster richColors />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
