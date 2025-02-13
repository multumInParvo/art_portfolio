import type { Metadata } from "next"
import { Playfair_Display, Nunito, Cinzel_Decorative } from "next/font/google"
import "./globals.css"
import { PaintingProvider } from "./context/PaintingContext"
import LayoutWrapper from "./components/LayoutWrapper"
import type React from "react" 

export const metadata: Metadata = {
  metadataBase: new URL("https://oleksandrpryvalov.art/"),
  title: {
    default: "Oleksandr Pryvalov | Artiste Peintre - Artist",
    template: "%s | Oleksandr Pryvalov",
  },
  description:
    "Découvrez le portfolio artistique d'Oleksandr Pryvalov, artiste peintre basé en France. Explore the artistic portfolio of Oleksandr Pryvalov, artist based in France.",
  keywords: [
    "artiste peintre",
    "artist",
    "paintings",
    "peintures",
    "art contemporain",
    "contemporary art",
    "France",
    "Oleksandr Pryvalov",
  ],
  creator: "Oleksandr Pryvalov",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    alternateLocale: "en_US",
    title: "Oleksandr Pryvalov | Artiste Peintre - Artist",
    description:
      "Découvrez le portfolio artistique d'Oleksandr Pryvalov, artiste peintre basé en France. Explore the artistic portfolio of Oleksandr Pryvalov, artist based in France.",
    siteName: "Oleksandr Pryvalov Art",
    images: [
      {
        url: "/images/leaving_the_nest.webp",
        width: 1200,
        height: 630,
        alt: "Oeuvre d'art par Oleksandr Pryvalov - Artwork by Oleksandr Pryvalov",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  alternates: {
    languages: {
      en: "/",
      fr: "/fr",
    },
  },
}

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
})

const cinzel = Cinzel_Decorative({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-cinzel-decorative",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${nunito.variable} ${cinzel.variable}`}>
      <head>
        <link rel="alternate" href="https://oleksandrpryvalov.art/" hrefLang="en" />
        <link rel="alternate" href="https://oleksandrpryvalov.art/" hrefLang="fr" />
      </head>
      <body>
          <PaintingProvider>
              <LayoutWrapper>{children}</LayoutWrapper>
          </PaintingProvider>
      </body>
    </html>
  )
}

