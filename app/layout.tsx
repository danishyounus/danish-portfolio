import type { Metadata, Viewport } from "next";
import { Inter, Sora, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { personal } from "@/content/personal";
import { site } from "@/content/site";
import { MotionProvider } from "@/components/MotionProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${personal.fullName} — Technology Analyst | Data, Digital Adoption & Experience`,
    template: `%s · ${personal.fullName}`,
  },
  description: site.description,
  keywords: [...site.keywords],
  authors: [{ name: personal.fullName }],
  creator: personal.fullName,
  publisher: personal.fullName,
  category: "technology",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: personal.fullName,
    title: `${personal.fullName} — Technology Analyst`,
    description: site.description,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${personal.fullName} — Technology Analyst, Data, Digital Adoption & Experience`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${personal.fullName} — Technology Analyst`,
    description: site.description,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#050507",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const socials = personal.socials
  .filter((social) => social.visible && social.url)
  .map((social) => social.url);

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personal.fullName,
  alternateName: personal.displayName,
  jobTitle: personal.title,
  description: site.description,
  url: site.url,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bengaluru",
    addressRegion: "Karnataka",
    addressCountry: "IN",
  },
  worksFor: { "@type": "Organization", name: personal.current.employer },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Presidency College" },
  ],
  knowsAbout: [
    "Digital Adoption Platforms",
    "Data Analytics",
    "Power BI",
    "Python",
    "SQL",
    "Machine Learning",
    "Experience Design",
    "Business Transformation",
  ],
  ...(socials.length > 0 ? { sameAs: socials } : {}),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${sora.variable} ${inter.variable} ${instrument.variable}`}>
      <body className="grain relative font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-xs focus:font-medium focus:text-black"
        >
          Skip to content
        </a>

        <div className="page-bg" aria-hidden="true" />
        <div className="page-grid" aria-hidden="true" />

        <MotionProvider>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </MotionProvider>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
