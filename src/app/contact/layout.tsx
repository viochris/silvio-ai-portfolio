import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Silvio Christian, Joe & Chat with Silvio.AI Assistant',
  description:
    'Get in touch with Silvio Christian, Joe for Data Science, AI Engineering, freelance, internship, or full-time opportunities, or ask questions via the interactive portfolio AI assistant.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Silvio Christian, Joe | Silvio.AI',
    description:
      'Direct contact details, technical FAQ, and live interactive RAG assistant for Silvio Christian, Joe.',
    url: 'https://silvio-ai-portfolio.vercel.app/contact',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
