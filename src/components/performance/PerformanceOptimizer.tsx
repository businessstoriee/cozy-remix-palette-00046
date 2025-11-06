import { useEffect, useState } from 'react';

/**
 * Performance Optimization Utilities
 * - Lazy loading images
 * - Prefetching critical resources
 * - Performance monitoring
 */

/**
 * useLazyImage - Lazy load images with intersection observer
 */
export const useLazyImage = (src: string, options?: IntersectionObserverInit) => {
  const [imageSrc, setImageSrc] = useState<string | undefined>();
  const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!imageRef) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setImageSrc(src);
          observer.unobserve(entry.target);
        }
      });
    }, options);

    observer.observe(imageRef);

    return () => {
      if (imageRef) {
        observer.unobserve(imageRef);
      }
    };
  }, [imageRef, src, options]);

  return { imageSrc, setImageRef };
};

/**
 * prefetchImage - Prefetch an image
 */
export const prefetchImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

/**
 * prefetchImages - Prefetch multiple images
 */
export const prefetchImages = async (srcs: string[]): Promise<void> => {
  await Promise.all(srcs.map(src => prefetchImage(src)));
};

/**
 * usePerformanceMonitor - Monitor page performance
 */
export const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<{
    loadTime?: number;
    fcp?: number;
    lcp?: number;
    fid?: number;
    cls?: number;
  }>({});

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Page Load Time
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    setMetrics(prev => ({ ...prev, loadTime }));

    // Web Vitals using PerformanceObserver
    try {
      // First Contentful Paint (FCP)
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const fcp = entries[0]?.startTime;
        if (fcp) setMetrics(prev => ({ ...prev, fcp }));
      });
      fcpObserver.observe({ type: 'paint', buffered: true });

      // Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        const lcp = lastEntry?.renderTime || lastEntry?.loadTime;
        if (lcp) setMetrics(prev => ({ ...prev, lcp }));
      });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

      // First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const fid = (entries[0] as any)?.processingStart - (entries[0] as any)?.startTime;
        if (fid) setMetrics(prev => ({ ...prev, fid }));
      });
      fidObserver.observe({ type: 'first-input', buffered: true });

      // Cumulative Layout Shift (CLS)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as any[]) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            setMetrics(prev => ({ ...prev, cls: clsValue }));
          }
        }
      });
      clsObserver.observe({ type: 'layout-shift', buffered: true });
    } catch (error) {
      console.log('Performance monitoring not fully supported');
    }
  }, []);

  return metrics;
};

/**
 * OptimizedImage - Performance optimized image component
 */
interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  lazy?: boolean;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  lazy = true,
  className,
  ...props
}) => {
  const { imageSrc, setImageRef } = useLazyImage(src, {
    rootMargin: '50px',
  });

  if (!lazy) {
    return <img src={src} alt={alt} className={className} {...props} />;
  }

  return (
    <img
      ref={setImageRef}
      src={imageSrc || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E'}
      alt={alt}
      className={className}
      loading="lazy"
      {...props}
    />
  );
};

/**
 * prefetchRoute - Prefetch a route for faster navigation
 */
export const prefetchRoute = (path: string) => {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = path;
  document.head.appendChild(link);
};

/**
 * useIdleCallback - Run callback when browser is idle
 */
export const useIdleCallback = (callback: () => void, timeout = 2000) => {
  useEffect(() => {
    if ('requestIdleCallback' in window) {
      const handle = window.requestIdleCallback(callback, { timeout });
      return () => window.cancelIdleCallback(handle);
    } else {
      const handle = setTimeout(callback, timeout);
      return () => clearTimeout(handle);
    }
  }, [callback, timeout]);
};

/**
 * useReduceMotion - Detect if user prefers reduced motion
 */
export const useReduceMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
};

export default {
  useLazyImage,
  prefetchImage,
  prefetchImages,
  usePerformanceMonitor,
  OptimizedImage,
  prefetchRoute,
  useIdleCallback,
  useReduceMotion
};
