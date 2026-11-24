import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: [
          'Googlebot',
          'Bingbot',
          'GPTBot',
          'OAI-SearchBot',
          'ChatGPT-User',
          'PerplexityBot',
          'ClaudeBot',
          'anthropic-ai',
          'Google-Extended',
          'Applebot-Extended',
          'Meta-ExternalAgent',
        ],
        allow: '/',
      },
    ],
    host: 'https://silvio-ai-portfolio.vercel.app',
    sitemap: 'https://silvio-ai-portfolio.vercel.app/sitemap.xml',
  };
}
