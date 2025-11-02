import { eventTypes } from '@/types/eventTypes';
import { blogPosts } from '@/pages/HelpAndInformationPages/blog/BlogData';

export interface SitemapURL {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

/**
 * Generate sitemap URLs for the application
 */
export const generateSitemapURLs = (): SitemapURL[] => {
  const baseUrl = window.location.origin;
  const today = new Date().toISOString().split('T')[0];

  const urls: SitemapURL[] = [
    // Main pages
    {
      loc: `${baseUrl}/`,
      lastmod: today,
      changefreq: 'daily',
      priority: 1.0
    },
    {
      loc: `${baseUrl}/create`,
      lastmod: today,
      changefreq: 'daily',
      priority: 0.9
    },
    {
      loc: `${baseUrl}/templates`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.8
    },
    {
      loc: `${baseUrl}/blog`,
      lastmod: today,
      changefreq: 'daily',
      priority: 0.8
    },
    // Help & Info pages
    {
      loc: `${baseUrl}/help`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.7
    },
    {
      loc: `${baseUrl}/faq`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.7
    },
    {
      loc: `${baseUrl}/about`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.6
    },
    {
      loc: `${baseUrl}/support`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.6
    },
    {
      loc: `${baseUrl}/privacy`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.5
    }
  ];

  // Add event type pages
  eventTypes.forEach(event => {
    urls.push({
      loc: `${baseUrl}/event/${event.value}`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.7
    });
  });

  // Add blog posts
  blogPosts.forEach(post => {
    urls.push({
      loc: `${baseUrl}/blog/${post.id}`,
      lastmod: post.date || today,
      changefreq: 'monthly',
      priority: 0.6
    });
  });

  return urls;
};

/**
 * Generate XML sitemap string
 */
export const generateXMLSitemap = (): string => {
  const urls = generateSitemapURLs();
  
  const urlEntries = urls
    .map(
      url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
};

/**
 * Download sitemap as XML file
 */
export const downloadSitemap = () => {
  const xmlContent = generateXMLSitemap();
  const blob = new Blob([xmlContent], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'sitemap.xml';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
