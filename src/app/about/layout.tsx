import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Silvio Christian, Joe | Education, Timeline & GitHub Metrics',
  description:
    'Learn about Silvio Christian, Joe (Vio), an Informatics Engineering student at Universitas Dian Nuswantoro (GPA 3.96/4.00) specializing in Data Science, NLP, and AI Agent Engineering.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Silvio Christian, Joe | Data Scientist & AI Engineer',
    description:
      'Academic background at Universitas Dian Nuswantoro (UDINUS), technical evolution timeline, focus areas, and open-source GitHub metrics.',
    url: 'https://silvio-ai-portfolio.vercel.app/about',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
