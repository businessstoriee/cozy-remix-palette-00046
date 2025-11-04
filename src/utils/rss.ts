import { blogPosts } from '@/pages/HelpAndInformationPages/blog/BlogData';

export interface RSSItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  guid: string;
  category?: string;
}

/**
 * Generate RSS feed for blog posts
 */
export const generateRSSFeed = (): string => {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://greetingmessagecard.lovable.app';
  const buildDate = new Date().toUTCString();

  const items = blogPosts
    .map(post => {
      const pubDate = post.date ? new Date(post.date).toUTCString() : buildDate;
      
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${baseUrl}/blog/${post.id}</link>
      <description>${escapeXml(post.excerpt || '')}</description>
      <pubDate>${pubDate}</pubDate>
      <guid isPermaLink="true">${baseUrl}/blog/${post.id}</guid>
      ${post.category ? `<category>${escapeXml(post.category)}</category>` : ''}
    </item>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Beautiful Greeting Cards - Blog</title>
    <link>${baseUrl}/blog</link>
    <description>Create beautiful, personalized greeting cards online. Tips, guides, and inspiration for every occasion.</description>
    <language>en-us</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${baseUrl}/icon-512.png</url>
      <title>Beautiful Greeting Cards</title>
      <link>${baseUrl}</link>
    </image>
${items}
  </channel>
</rss>`;
};

/**
 * Escape XML special characters
 */
function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Download RSS feed as XML file
 */
export const downloadRSSFeed = () => {
  const xmlContent = generateRSSFeed();
  const blob = new Blob([xmlContent], { type: 'application/rss+xml' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'rss.xml';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
