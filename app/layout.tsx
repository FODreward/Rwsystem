import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { QueryProvider } from "@/components/providers/query-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: {
    default: "SURVECTA",
    template: "%s | SURVECTA",
  },
  description:
    "Unlock Rewards, Earn Points, Live Better. Join Survecta's reward system and start earning points for completing surveys and activities.",
  keywords: ["rewards", "surveys", "points", "earn money", "survecta", "survey rewards", "online rewards"],
  authors: [{ name: "Survecta Team" }],
  creator: "Survecta",
  publisher: "Survecta",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://survecta.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://survecta.com",
    title: "SURVECTA - Unlock Rewards, Earn Points, Live Better",
    description:
      "Join Survecta's reward system and start earning points for completing surveys and activities. Turn your opinions into rewards.",
    siteName: "SURVECTA",
    images: [
      {
        url: "https://survecta.com/favicon.png",
        width: 1200,
        height: 630,
        alt: "SURVECTA - Unlock Rewards, Earn Points, Live Better",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SURVECTA - Unlock Rewards, Earn Points, Live Better",
    description: "Join Survecta's reward system and start earning points for completing surveys and activities.",
    images: ["https://survecta.com/favicon.png"],
    creator: "@survecta",
  },
  icons: {
    icon: [
      { url: "https://survecta.com/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "https://survecta.com/favicon.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "https://survecta.com/favicon.png",
    apple: [{ url: "https://survecta.com/favicon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          httpEquiv="Delegate-CH"
          content="Sec-CH-UA https://s.magsrv.com; Sec-CH-UA-Mobile https://s.magsrv.com; Sec-CH-UA-Arch https://s.magsrv.com; Sec-CH-UA-Model https://s.magsrv.com; Sec-CH-UA-Platform https://s.magsrv.com; Sec-CH-UA-Platform-Version https://s.magsrv.com; Sec-CH-UA-Bitness https://s.magsrv.com; Sec-CH-UA-Full-Version-List https://s.magsrv.com; Sec-CH-UA-Full-Version https://s.magsrv.com;"
        />
        <meta
          httpEquiv="Delegate-CH"
          content="Sec-CH-UA https://s.pemsrv.com; Sec-CH-UA-Mobile https://s.pemsrv.com; Sec-CH-UA-Arch https://s.pemsrv.com; Sec-CH-UA-Model https://s.pemsrv.com; Sec-CH-UA-Platform https://s.pemsrv.com; Sec-CH-UA-Platform-Version https://s.pemsrv.com; Sec-CH-UA-Bitness https://s.pemsrv.com; Sec-CH-UA-Full-Version-List https://s.pemsrv.com; Sec-CH-UA-Full-Version https://s.pemsrv.com;"
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <QueryProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <div>
              {children}
              <Toaster />
            </div>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
