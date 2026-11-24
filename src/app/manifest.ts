import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Silvio.AI | Silvio Christian, Joe - Data Scientist & AI Engineer',
    short_name: 'Silvio.AI',
    description:
      'Portfolio of Silvio Christian, Joe (Vio), Data Scientist and AI Engineer specializing in Machine Learning, NLP, RAG, and Autonomous AI Agents.',
    start_url: '/',
    display: 'standalone',
    background_color: '#090B14',
    theme_color: '#090B14',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '48x48',
        type: 'image/x-icon',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}
