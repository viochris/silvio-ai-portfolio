import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Featured AI & Data Science Projects | Silvio Christian, Joe',
  description:
    'Explore production AI case studies by Silvio Christian, Joe: InsightSQL (LangGraph Engine), SpendSense (Financial AI), Resume Scanner API, and InsightData (AI Analyst).',
  alternates: {
    canonical: '/projects',
  },
  openGraph: {
    title: 'Featured AI & Data Science Projects | Silvio.AI',
    description:
      'Architecture breakdowns, problem statements, and technical solutions for Silvio Christian, Joe’s flagship GenAI and Machine Learning systems.',
    url: 'https://silvio-ai-portfolio.vercel.app/projects',
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
