import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Skills, Tech Stack & 30+ Verified Certifications',
  description:
    'Technical capabilities, AI/ML tech stack (Python, LangGraph, LlamaIndex, FastAPI, Scikit-Learn), and 33 verified credentials from Oracle, IBM, Coursera, and Dicoding.',
  alternates: {
    canonical: '/skills',
  },
  openGraph: {
    title: 'Skills, Tech Stack & Verified Credentials | Silvio Christian, Joe',
    description:
      'Explore Silvio Christian, Joe’s AI/Data Science tech stack and verified professional certifications from Oracle Cloud, IBM, Coursera, and Dicoding.',
    url: 'https://silvio-ai-portfolio.vercel.app/skills',
  },
};

export default function SkillsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
