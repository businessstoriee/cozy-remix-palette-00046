/**
 * Enhanced SEO utilities for better search engine optimization
 */

export interface StructuredDataConfig {
  type: 'Article' | 'WebPage' | 'Organization' | 'Event' | 'CreativeWork' | 'Product';
  data: Record<string, any>;
}

export interface AdvancedSEOData {
  title: string;
  description: string;
  keywords: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogImageAlt?: string;
  ogType?: string;
  twitterCard?: string;
  twitterImage?: string;
  canonical?: string;
  lang?: string;
  robots?: string;
  structuredData?: any;
  hrefLang?: Record<string, string>;
}

/**
 * Update page SEO with advanced settings
 */
export const updateAdvancedPageSEO = (data: AdvancedSEOData): void => {
  // Update title
  document.title = data.title;

  // Update or create meta tags
  const updateMetaTag = (name: string, content: string, isProperty = false) => {
    const attribute = isProperty ? 'property' : 'name';
    let meta = document.querySelector(`meta[${attribute}="${name}"]`);
    
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute(attribute, name);
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
  };

  // Basic meta tags
  updateMetaTag('description', data.description);
  updateMetaTag('keywords', data.keywords.join(', '));
  
  if (data.robots) {
    updateMetaTag('robots', data.robots);
  }

  // Open Graph tags
  if (data.ogTitle) updateMetaTag('og:title', data.ogTitle, true);
  if (data.ogDescription) updateMetaTag('og:description', data.ogDescription, true);
  if (data.ogImage) updateMetaTag('og:image', data.ogImage, true);
  if (data.ogImageAlt) updateMetaTag('og:image:alt', data.ogImageAlt, true);
  if (data.ogType) updateMetaTag('og:type', data.ogType, true);

  // Twitter Card tags
  if (data.twitterCard) updateMetaTag('twitter:card', data.twitterCard);
  if (data.twitterImage) updateMetaTag('twitter:image', data.twitterImage);

  // Canonical URL
  if (data.canonical) {
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = data.canonical;
  }

  // Language
  if (data.lang) {
    document.documentElement.lang = data.lang;
  }

  // Structured data
  if (data.structuredData) {
    let script = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data.structuredData);
  }

  // HrefLang tags
  if (data.hrefLang) {
    Object.entries(data.hrefLang).forEach(([lang, url]) => {
      let link = document.querySelector(`link[hreflang="${lang}"]`) as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'alternate';
        link.hreflang = lang;
        document.head.appendChild(link);
      }
      link.href = url;
    });
  }
};

/**
 * Generate advanced SEO data for different event types
 */
export const generateAdvancedSEO = (eventType: string, languageCode: string = 'en'): AdvancedSEOData => {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  
  const eventTitles: Record<string, string> = {
    birthday: 'Birthday Greeting Card',
    anniversary: 'Anniversary Greeting Card',
    wedding: 'Wedding Greeting Card',
    graduation: 'Graduation Greeting Card',
    'thank-you': 'Thank You Card',
    congratulations: 'Congratulations Card',
    'get-well-soon': 'Get Well Soon Card',
    sympathy: 'Sympathy Card',
    'new-baby': 'New Baby Card',
    retirement: 'Retirement Card',
  };

  const title = eventTitles[eventType] || 'Beautiful Greeting Card';
  const description = `Create a personalized ${title.toLowerCase()} online. Add photos, custom messages, and beautiful designs to make it truly special.`;

  return {
    title: `${title} | Beautiful Greeting Cards`,
    description,
    keywords: [
      eventType,
      `${eventType} card`,
      `${eventType} greeting`,
      `${eventType} wishes`,
      'greeting card',
      'personalized card',
      'custom greeting',
      'online card maker',
      'free greeting card',
    ],
    ogTitle: title,
    ogDescription: description,
    ogImage: `${baseUrl}/icon-512.png`,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    canonical: typeof window !== 'undefined' ? window.location.href : baseUrl,
    lang: languageCode,
    robots: 'index, follow',
  };
};

/**
 * Generate JSON-LD structured data
 */
export const generateStructuredData = (config: StructuredDataConfig): string => {
  const baseData = {
    '@context': 'https://schema.org',
    '@type': config.type,
    ...config.data,
  };

  return JSON.stringify(baseData, null, 2);
};

/**
 * Generate breadcrumb structured data
 */
export const generateBreadcrumbSchema = (items: { name: string; url: string }[]): string => {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  });
};

/**
 * Generate FAQ structured data
 */
export const generateFAQSchema = (faqs: { question: string; answer: string }[]): string => {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  });
};

/**
 * Generate Organization structured data
 */
export const generateOrganizationSchema = (): string => {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Beautiful Greeting Cards',
    url: baseUrl,
    logo: `${baseUrl}/icon-512.png`,
    sameAs: [
      // Add social media profiles here when available
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: ['English'],
    },
  });
};

/**
 * Generate Event structured data for calendar integrations
 */
export const generateEventSchema = (event: {
  name: string;
  date: string;
  description?: string;
  location?: string;
}): string => {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.name,
    startDate: event.date,
    description: event.description || '',
    location: event.location ? {
      '@type': 'Place',
      name: event.location,
    } : undefined,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
  });
};

/**
 * Generate CreativeWork schema for greeting cards
 */
export const generateGreetingCardSchema = (greeting: {
  title: string;
  description: string;
  creator: string;
  recipient: string;
  eventType: string;
  mediaUrl?: string;
  dateCreated?: string;
}): string => {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: greeting.title,
    description: greeting.description,
    creator: {
      '@type': 'Person',
      name: greeting.creator,
    },
    about: {
      '@type': 'Event',
      name: greeting.eventType,
    },
    image: greeting.mediaUrl,
    dateCreated: greeting.dateCreated || new Date().toISOString(),
    inLanguage: 'en',
    isAccessibleForFree: true,
    url: baseUrl,
  });
};

/**
 * Meta tags generator for social sharing
 */
export const generateMetaTags = (config: {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  keywords?: string[];
}): Record<string, string> => {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const defaultImage = `${baseUrl}/icon-512.png`;

  return {
    // Basic Meta
    'title': config.title,
    'description': config.description,
    'keywords': config.keywords?.join(', ') || '',
    
    // Open Graph
    'og:title': config.title,
    'og:description': config.description,
    'og:image': config.image || defaultImage,
    'og:url': config.url || baseUrl,
    'og:type': config.type || 'website',
    'og:site_name': 'Beautiful Greeting Cards',
    
    // Twitter Card
    'twitter:card': 'summary_large_image',
    'twitter:title': config.title,
    'twitter:description': config.description,
    'twitter:image': config.image || defaultImage,
    
    // Additional
    'theme-color': '#9b87f5',
  };
};

/**
 * Generate canonical URL
 */
export const generateCanonicalURL = (path: string): string => {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
};

/**
 * Generate alternate language links (hrefLang)
 */
export const generateHrefLangTags = (languages: string[]): Record<string, string> => {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
  
  const tags: Record<string, string> = {};
  languages.forEach(lang => {
    tags[`alternate-${lang}`] = `${baseUrl}${currentPath}?lang=${lang}`;
  });
  
  return tags;
};
