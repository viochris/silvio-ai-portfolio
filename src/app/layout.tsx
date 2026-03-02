import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Silvio.AI Portfolio | Silvio Christian, Joe',
  description: 'Portfolio of Silvio Christian, Joe - Data Scientist & AI Engineer',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=Source+Code+Pro:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
