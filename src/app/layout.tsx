import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import MainLayout from "@/components/MainLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-source-code-pro",
  display: "swap",
});

const SITE_URL = "https://silvio-ai-portfolio.vercel.app";

export const viewport: Viewport = {
  themeColor: "#090B14",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "Silvio.AI",
  title: {
    default: "Silvio.AI | Silvio Christian, Joe - Data Scientist & AI Engineer",
    template: "%s | Silvio.AI",
  },
  description:
    "Portfolio of Silvio Christian, Joe (Vio / viochris), an Informatics Engineering student at Universitas Dian Nuswantoro (GPA 3.96/4.00), Data Scientist, and AI Engineer specializing in Tabular ML, NLP, Vector/Graph/Hybrid RAG, LangGraph Agents, and FastAPI MLOps.",
  keywords: [
    "Silvio Christian, Joe",
    "Silvio Christian Joe",
    "Silvio Christian",
    "Vio",
    "viochris",
    "Silvio.AI",
    "Data Scientist Indonesia",
    "AI Engineer Indonesia",
    "Machine Learning Engineer",
    "NLP Specialist",
    "Informatics Engineering UDINUS",
    "Universitas Dian Nuswantoro",
    "Python Developer",
    "Generative AI",
    "LlamaIndex RAG",
    "LangGraph Agent",
    "Text-to-SQL",
    "FastAPI MLOps",
    "Predictive Modeling",
    "Tabular Data Analysis",
  ],
  authors: [{ name: "Silvio Christian, Joe", url: "https://github.com/viochris" }],
  creator: "Silvio Christian, Joe",
  publisher: "Silvio Christian, Joe",
  category: "technology",
  alternates: {
    canonical: "/",
    types: {
      "text/plain": [
        { url: "/llms.txt", title: "LLM Portfolio Summary (llms.txt)" },
        { url: "/llms-full.txt", title: "Complete 65-Project LLM Knowledge Base (llms-full.txt)" },
      ],
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Silvio.AI",
    title: "Silvio Christian, Joe | Data Scientist & AI Engineer",
    description:
      "Explore 65+ production AI, RAG, LangGraph, LlamaIndex, MLOps, and Data Science projects by Silvio Christian, Joe (Vio).",
    images: [
      {
        url: "/og-banner.png",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Silvio.AI - Silvio Christian, Joe | Data Scientist & AI Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Silvio Christian, Joe | Data Scientist & AI Engineer",
    description:
      "Explore 65+ production AI, RAG, LangGraph, LlamaIndex, MLOps, and Data Science projects by Silvio Christian, Joe (Vio).",
    images: ["/og-banner.png"],
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
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: "Silvio.AI",
        alternateName: [
          "Silvio.AI Portfolio",
          "Silvio Christian, Joe",
          "Silvio Christian Joe Portfolio",
        ],
        url: `${SITE_URL}/`,
        description:
          "Official portfolio of Silvio Christian, Joe (Vio), Data Scientist and AI Engineer.",
        inLanguage: "en-US",
        publisher: {
          "@id": `${SITE_URL}/#person`,
        },
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#profilepage`,
        url: `${SITE_URL}/`,
        name: "Silvio.AI | Silvio Christian, Joe - Data Scientist & AI Engineer",
        isPartOf: {
          "@id": `${SITE_URL}/#website`,
        },
        about: {
          "@id": `${SITE_URL}/#person`,
        },
        mainEntity: {
          "@id": `${SITE_URL}/#person`,
        },
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: "Silvio Christian, Joe",
        givenName: "Silvio Christian",
        familyName: "Joe",
        alternateName: ["Vio", "viochris", "Silvio Christian Joe"],
        url: `${SITE_URL}/`,
        image: {
          "@type": "ImageObject",
          url: `${SITE_URL}/og-banner.png`,
          width: 1200,
          height: 630,
        },
        description:
          "Informatics Engineering undergraduate at Universitas Dian Nuswantoro (GPA 3.96/4.00), Data Scientist, and AI Engineer with 65+ shipped projects across Machine Learning, NLP, Vector/Graph/Hybrid RAG, Autonomous AI Agents, and FastAPI MLOps.",
        email: "mailto:viochristian12@gmail.com",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Semarang",
          addressRegion: "Central Java",
          addressCountry: "ID",
        },
        sameAs: [
          "https://github.com/viochris",
          "https://www.linkedin.com/in/silvio-christian-joe",
          "https://www.kaggle.com/viochristian",
          "https://medium.com/@silviochristian",
          "https://instagram.com/silvio.codes",
          "https://x.com/SilvioCodes",
          "https://youtube.com/@silviocodes",
          "https://www.tiktok.com/@silvio.codes",
        ],
        jobTitle: "Data Scientist & AI Engineer",
        worksFor: {
          "@type": "Organization",
          name: "Silvio.AI",
          url: `${SITE_URL}/`,
        },
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "Universitas Dian Nuswantoro",
          alternateName: "UDINUS",
          department: "Informatics Engineering / Computer Science",
        },
        knowsAbout: [
          "Data Science",
          "AI Engineering",
          "Natural Language Processing",
          "Machine Learning",
          "Retrieval-Augmented Generation (RAG)",
          "Knowledge Graph RAG",
          "Hybrid RAG",
          "Text-to-SQL",
          "LlamaIndex",
          "LangGraph",
          "LangChain",
          "CrewAI",
          "FastAPI",
          "Tabular Data Modeling",
          "Explainable AI (LIME & SHAP)",
        ],
        hasCredential: [
          {
            "@type": "EducationalOccupationalCredential",
            name: "Oracle Cloud Infrastructure 2025 Certified Data Science Professional",
            recognizedBy: { "@type": "Organization", name: "Oracle" },
          },
          {
            "@type": "EducationalOccupationalCredential",
            name: "Oracle Cloud Infrastructure 2025 Certified Generative AI Professional",
            recognizedBy: { "@type": "Organization", name: "Oracle" },
          },
          {
            "@type": "EducationalOccupationalCredential",
            name: "Oracle AI Vector Search Certified Professional",
            recognizedBy: { "@type": "Organization", name: "Oracle" },
          },
          {
            "@type": "EducationalOccupationalCredential",
            name: "IBM Machine Learning Specialization",
            recognizedBy: { "@type": "Organization", name: "IBM" },
          },
        ],
      },
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/#featured-projects`,
        name: "Featured AI & Data Science Projects by Silvio Christian, Joe",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "InsightSQL (LangGraph Engine)",
            url: "https://github.com/viochris/InsightSQL-LangGraph-Engine-Web",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "YouTube Hybrid RAG (LlamaIndex, ChromaDB & Neo4j)",
            url: "https://github.com/viochris/youtube-hybrid-rag-llamaindex",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "SpendSense (Financial AI)",
            url: "https://github.com/viochris/Streamlit-SpendSense",
          },
          {
            "@type": "ListItem",
            position: 4,
            name: "Resume Scanner API (FastAPI, SBERT & TF-IDF)",
            url: "https://github.com/viochris/resume-scanner-api",
          },
          {
            "@type": "ListItem",
            position: 5,
            name: "Auto-README Generator (CrewAI)",
            url: "https://github.com/viochris/auto-readme-generator",
          },
          {
            "@type": "ListItem",
            position: 6,
            name: "Botanica AI (Plant Care Companion)",
            url: "https://github.com/viochris/botanica-ai",
          },
        ],
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`dark scroll-smooth ${inter.variable} ${spaceGrotesk.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
      data-scroll-behavior="smooth"
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="icon" type="image/png" href="/icon-192.png" sizes="192x192" />
        <link rel="icon" type="image/png" href="/icon-512.png" sizes="512x512" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM Context" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body antialiased selection:bg-primary selection:text-primary-foreground bg-background text-foreground overflow-x-hidden">
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
