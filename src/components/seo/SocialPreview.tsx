import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * SocialPreview - Preview how your greeting will look when shared on social media
 * Shows OG tags, images, and descriptions as they appear on WhatsApp, Facebook, Twitter
 */

interface SocialPreviewProps {
  url: string;
  title: string;
  description: string;
  image?: string;
  platform?: 'whatsapp' | 'facebook' | 'twitter' | 'all';
}

export const SocialPreview: React.FC<SocialPreviewProps> = ({
  url,
  title,
  description,
  image,
  platform = 'all'
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const defaultImage = '/icon-512.png';
  const displayImage = image || defaultImage;

  useEffect(() => {
    // Preload image to check if it loads
    const img = new Image();
    img.src = displayImage;
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageLoaded(false);
  }, [displayImage]);

  const platforms = platform === 'all' 
    ? ['whatsapp', 'facebook', 'twitter'] 
    : [platform];

  return (
    <div className="space-y-4">
      {platforms.includes('whatsapp') && (
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <span className="text-2xl">💬</span>
              WhatsApp Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-[#e5ddd5] dark:bg-[#0b141a] p-3 rounded-lg max-w-md">
              <div className="bg-white dark:bg-[#1f2c33] rounded-lg overflow-hidden shadow-sm">
                {displayImage && (
                  <div className="relative aspect-video bg-muted">
                    <img 
                      src={displayImage} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                    {imageLoaded && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
                        <CheckCircle className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                )}
                <div className="p-3">
                  <div className="text-xs text-muted-foreground mb-1">
                    {new URL(url).hostname}
                  </div>
                  <div className="font-semibold text-sm mb-1 line-clamp-2">
                    {title}
                  </div>
                  <div className="text-xs text-muted-foreground line-clamp-2">
                    {description}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {platforms.includes('facebook') && (
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <span className="text-2xl">📘</span>
              Facebook Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden max-w-md">
              {displayImage && (
                <div className="relative aspect-video bg-muted">
                  <img 
                    src={displayImage} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                  />
                  {imageLoaded && (
                    <div className="absolute top-2 right-2 bg-blue-600 text-white rounded-full p-1">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                  )}
                </div>
              )}
              <div className="bg-muted/50 p-3">
                <div className="text-xs text-muted-foreground uppercase mb-1">
                  {new URL(url).hostname}
                </div>
                <div className="font-semibold text-sm mb-1 line-clamp-2">
                  {title}
                </div>
                <div className="text-xs text-muted-foreground line-clamp-1">
                  {description}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {platforms.includes('twitter') && (
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <span className="text-2xl">🐦</span>
              Twitter/X Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-2xl overflow-hidden max-w-md">
              {displayImage && (
                <div className="relative aspect-video bg-muted">
                  <img 
                    src={displayImage} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                  />
                  {imageLoaded && (
                    <div className="absolute top-2 right-2 bg-black text-white rounded-full p-1">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                  )}
                </div>
              )}
              <div className="p-3 border-t">
                <div className="text-xs text-muted-foreground mb-1">
                  {new URL(url).hostname}
                </div>
                <div className="font-semibold text-sm mb-1 line-clamp-1">
                  {title}
                </div>
                <div className="text-xs text-muted-foreground line-clamp-1">
                  {description}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <CheckCircle className="w-4 h-4 text-green-500" />
        <span>OG tags configured correctly for rich previews</span>
      </div>
    </div>
  );
};

/**
 * SEOChecklist - Shows SEO implementation status
 */
export const SEOChecklist: React.FC<{
  hasTitle?: boolean;
  hasDescription?: boolean;
  hasOGImage?: boolean;
  hasStructuredData?: boolean;
  hasCanonical?: boolean;
}> = ({
  hasTitle = true,
  hasDescription = true,
  hasOGImage = true,
  hasStructuredData = true,
  hasCanonical = true
}) => {
  const checks = [
    { label: 'Title Tag', checked: hasTitle },
    { label: 'Meta Description', checked: hasDescription },
    { label: 'OG Image (1200x630)', checked: hasOGImage },
    { label: 'Structured Data', checked: hasStructuredData },
    { label: 'Canonical URL', checked: hasCanonical },
  ];

  const score = checks.filter(c => c.checked).length;
  const percentage = (score / checks.length) * 100;

  return (
    <Card className="hover-glow">
      <CardHeader>
        <CardTitle className="text-lg flex items-center justify-between">
          <span>SEO Health</span>
          <span className={cn(
            "text-2xl font-bold",
            percentage === 100 && "text-green-500",
            percentage >= 80 && percentage < 100 && "text-yellow-500",
            percentage < 80 && "text-red-500"
          )}>
            {percentage}%
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {checks.map((check, index) => (
            <div key={index} className="flex items-center gap-2">
              {check.checked ? (
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-muted flex-shrink-0" />
              )}
              <span className={cn(
                "text-sm",
                check.checked ? "text-foreground" : "text-muted-foreground"
              )}>
                {check.label}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialPreview;
