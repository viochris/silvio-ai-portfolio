import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Project Repository (65+ AI, RAG, ML & Web Projects)',
  description:
    'Browse all 65 open-source repositories by Silvio Christian, Joe (viochris) across GenAI, LlamaIndex RAG, LangGraph, FastAPI MLOps, Prefect Automation, Tabular Data Science, and Vibe Coding.',
  alternates: {
    canonical: '/repository',
  },
  openGraph: {
    title: 'Complete 65-Project Repository Archive | Silvio.AI',
    description:
      'Searchable catalog of 65 AI, Machine Learning, NLP, RAG, MLOps, Automation, and Full-Stack repositories with live demos and source code.',
    url: 'https://silvio-ai-portfolio.vercel.app/repository',
  },
};

export default function RepositoryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
