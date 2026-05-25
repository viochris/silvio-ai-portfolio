
import type { Metadata } from "next";
import { Inter, Space_Grotesk, Source_Code_Pro } from "next/font/google";
import "./globals.css";
import MainLayout from "@/components/MainLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-source-code-pro",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://silvio-ai-portfolio.vercel.app"),
  title: {
    default: "Silvio.AI | Silvio Christian, Joe - Data Scientist & AI Engineer",
    template: "%s | Silvio.AI",
  },
  description:
    "Portfolio of Silvio Christian, Joe (Vio), an Informatics Undergraduate, Data Scientist, and AI Engineer specializing in Machine Learning, NLP, and production-ready AI solutions. Transforming unstructured data into intelligence.",
  keywords: [
    "Silvio Christian Joe",
    "Vio",
    "viochris",
    "Data Scientist",
    "AI Engineer",
    "Machine Learning Engineer",
    "NLP Specialist",
    "Informatics Engineering",
    "Python Developer",
    "Generative AI",
    "Genkit",
    "Firebase App Hosting",
    "Semarang AI Developer",
    "Predictive Modeling",
    "Tabular Data Analysis",
  ],
  authors: [{ name: "Silvio Christian, Joe", url: "https://github.com/viochris" }],
  creator: "Silvio Christian, Joe",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://silvio-ai-portfolio.vercel.app",
    siteName: "Silvio.AI Portfolio",
    title: "Silvio Christian, Joe | Data Scientist & AI Engineer",
    description:
      "Explore the intersection of Data Science and AI Engineering through the portfolio of Silvio Christian, Joe. Specializing in NLP, Machine Learning, and Autonomous Agents.",
    images: [
      {
        url: "/vio-image.png",
        width: 1200,
        height: 630,
        alt: "Silvio Christian Joe Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Silvio Christian, Joe | Data Scientist & AI Engineer",
    description: "Personal portfolio showcasing AI solutions and data-driven insights.",
    images: ["/vio-image.png"],
    creator: "@SilvioCodes",
  },
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
    google: "0m7_K4YS51gzVJGdNr7tdNvIxX6ViAphfdoyiF23s_8",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Silvio Christian, Joe",
    "givenName": "Silvio Christian",
    "familyName": "Joe",
    "alternateName": "Vio",
    "url": "https://silvio-ai-portfolio.vercel.app",
    "image": "https://silvio-ai-portfolio.vercel.app/vio-image.png",
    "description": "Data Scientist and AI Engineer specializing in Machine Learning, NLP, and production-ready AI solutions.",
    "sameAs": [
      "https://github.com/viochris",
      "https://instagram.com/silvio.codes",
      "https://www.linkedin.com/in/silvio-christian-joe",
      "https://x.com/SilvioCodes",
      "https://youtube.com/@silviocodes",
      "https://www.tiktok.com/@silvio.codes?_r=1&_t=ZS-96drUPoz4zP",
      "https://medium.com/@silviochristian",
      "mailto:viochristian12@gmail.com"
    ],
    "jobTitle": "Data Scientist & AI Engineer",
    "worksFor": {
      "@type": "Organization",
      "name": "Silvio.AI"
    },
    "alumniOf": {
      "@type": "CollegeOrUniversity",
      "name": "Dian Nuswantoro University",
      "alternateName": "UDINUS",
      "department": "Informatics Engineering / Computer Science"
    },
    "knowsAbout": [
      "Data Science",
      "AI Engineering",
      "Natural Language Processing",
      "Machine Learning",
      "Generative AI",
      "Next.js",
      "Genkit",
      "Predictive Modeling",
      "Tabular Data Analysis"
    ]
  };

  return (
    <html lang="en" className={`dark scroll-smooth ${inter.variable} ${spaceGrotesk.variable} ${sourceCodePro.variable}`}>
      <head>
        <link rel="icon" type="image/png" href="/icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body antialiased bg-black overflow-x-hidden">
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
