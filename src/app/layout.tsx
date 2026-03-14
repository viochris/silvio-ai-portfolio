import type { Metadata } from "next";
import "./globals.css";
import MainLayout from "@/components/MainLayout";

export const metadata: Metadata = {
  metadataBase: new URL("https://silvio-ai-portfolio.vercel.app"),
  title: {
    default: "Silvio.AI | Silvio Christian - Data Scientist & AI Engineer",
    template: "%s | Silvio.AI",
  },
  description:
    "Portfolio of Silvio Christian (Vio), an Informatics Undergraduate, Data Scientist, and AI Engineer specializing in Machine Learning, NLP, and production-ready AI solutions. Transforming unstructured data into intelligence.",
  keywords: [
    "Silvio Christian",
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
  authors: [{ name: "Silvio Christian", url: "https://github.com/viochris" }],
  creator: "Silvio Christian",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://silvio-ai-portfolio.vercel.app",
    siteName: "Silvio.AI Portfolio",
    title: "Silvio Christian | Data Scientist & AI Engineer",
    description:
      "Explore the intersection of Data Science and AI Engineering through the portfolio of Silvio Christian. Specializing in NLP, Machine Learning, and Autonomous Agents.",
    images: [
      {
        url: "/vio-image.png",
        width: 1200,
        height: 630,
        alt: "Silvio Christian Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Silvio Christian | Data Scientist & AI Engineer",
    description: "Personal portfolio showcasing AI solutions and data-driven insights.",
    images: ["/vio-image.png"],
    creator: "@silvio.codes",
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
    // Keep existing Google verification intact
    google: "0m7_K4YS51gzVJGdNr7tdNvIxX6ViAphfdoyiF23s_8",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=Source+Code+Pro:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased bg-black overflow-x-hidden">
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
