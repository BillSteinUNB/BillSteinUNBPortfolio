import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { ThemeProvider } from "@/components/providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Terminal } from "@/components/ui/Terminal";
import { SITE_TITLE, SITE_DESCRIPTION, SITE_NAME, EMAIL, PROFESSIONAL_TITLE, SOCIAL_LINKS } from "@/lib/constants";

const inter = Inter({ subsets: ["latin"] });

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: SITE_NAME,
  url: 'https://www.billsteincs.com',
  image: 'https://www.billsteincs.com/og-image.png',
  jobTitle: PROFESSIONAL_TITLE,
  worksFor: {
    '@type': 'Organization',
    name: 'University of New Brunswick'
  },
  email: EMAIL,
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'New Brunswick',
    addressCountry: 'CA'
  },
  sameAs: SOCIAL_LINKS.filter(link => link.url !== '/').map(link => link.url),
  knowsAbout: [
    'Web Development',
    'React',
    'Next.js',
    'TypeScript',
    'Full-Stack Development',
    'JavaScript',
    'Node.js',
    'Python',
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.billsteincs.com'),
  title: {
    default: SITE_TITLE,
    template: '%s | Bill Stein'
  },
  description: SITE_DESCRIPTION,
  keywords: ['Full-Stack Developer', 'React', 'Next.js', 'TypeScript', 'Web Development', 'Computer Science', 'Bill Stein', 'Frontend Developer', 'Backend Developer'],
  authors: [{ name: 'Bill Stein', url: 'https://billstein.dev' }],
  creator: 'Bill Stein',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: 'Bill Stein Portfolio',
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Bill Stein - Full-Stack Developer',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Add your actual verification code
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main id="main-content" className="flex-1">{children}</main>
            <Footer />
            <Terminal />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
