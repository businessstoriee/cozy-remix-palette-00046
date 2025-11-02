import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFirebaseGreetings, SavedGreeting } from '@/hooks/useFirebaseGreetings';
import { Button } from '@/components/ui/button';
import { Eye, User, ChevronLeft, ChevronRight, Heart, Calendar, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { normalizeViews, formatTimeAgo, getEventGradient, isFirestoreTimestamp } from '@/utils/greetingHelpers';
import { cn } from '@/lib/utils';
import SearchBar, { SearchFilters } from './SearchBar';
import BeautifulGreetingsText from '../landingPage/BeautifulGreetingsText';

interface GreetingCardProps {
  greeting: SavedGreeting;
  index: number;
  onClick: () => void;
}

// Helper function to safely compare timestamps
const isGreetingUpdated = (greeting: SavedGreeting): boolean => {
  if (!greeting.updatedAt || !greeting.createdAt) return false;
  
  try {
    // Handle Firestore timestamps
    const updatedTime = isFirestoreTimestamp(greeting.updatedAt) 
      ? greeting.updatedAt.toDate().getTime()
      : new Date(greeting.updatedAt).getTime();
    
    const createdTime = isFirestoreTimestamp(greeting.createdAt)
      ? greeting.createdAt.toDate().getTime()
      : new Date(greeting.createdAt).getTime();
    
    // Consider it updated if there's more than 5 seconds difference
    return Math.abs(updatedTime - createdTime) > 5000;
  } catch (error) {
    console.warn('Error comparing timestamps:', error);
    return false;
  }
};

const GreetingCard: React.FC<GreetingCardProps> = React.memo(({ greeting, index, onClick }) => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Parse media from greeting data
  const mediaItems = useMemo(() => {
    if (greeting.media && greeting.media.length > 0) {
      return greeting.media.map(m => m.url);
    }
    return greeting.firstMedia ? [greeting.firstMedia] : [];
  }, [greeting.media, greeting.firstMedia]);

  const hasMultipleMedia = mediaItems.length > 1;
  const viewCount = normalizeViews(greeting.viewCount);
  const timeAgo = formatTimeAgo(greeting.createdAt);
  const gradientClass = getEventGradient(greeting.eventName);
  const isUpdated = isGreetingUpdated(greeting);

  const handlePrevMedia = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentMediaIndex((prev) => (prev === 0 ? mediaItems.length - 1 : prev - 1));
  }, [mediaItems.length]);

  const handleNextMedia = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentMediaIndex((prev) => (prev === mediaItems.length - 1 ? 0 : prev + 1));
  }, [mediaItems.length]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.stopPropagation();
      handlePrevMedia(e as any);
    } else if (e.key === 'ArrowRight') {
      e.stopPropagation();
      handleNextMedia(e as any);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  }, [handlePrevMedia, handleNextMedia, onClick]);

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  const cardHeight = greeting.firstText ? 280 : 320;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.05, 0.5), duration: 0.3 }}
      whileHover={{ y: -4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View ${greeting.eventName} greeting from ${greeting.senderName} to ${greeting.receiverName}`}
      className="group cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-xl"
    >
      <div className="relative overflow-hidden rounded-xl border border-border/30 shadow-sm hover:shadow-xl transition-all duration-300 bg-card">
        {/* Media Section */}
        <div 
          className="relative overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5"
          style={{ height: cardHeight }}
        >
          {/* Media Display */}
          {mediaItems.length > 0 && !imageError ? (
            <div className="relative w-full h-full">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentMediaIndex}
                  src={mediaItems[currentMediaIndex]}
                  alt={`${greeting.eventName} greeting card from ${greeting.senderName} to ${greeting.receiverName} - ${greeting.firstText?.substring(0, 80) || 'beautiful personalized greeting'} - free online greeting cards`}
                  draggable={false}
                  loading="lazy"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={handleImageError}
                />
              </AnimatePresence>

              {/* Carousel Navigation */}
              {hasMultipleMedia && (
                <>
                  <button
                    onClick={handlePrevMedia}
                    aria-label="Previous image"
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/50 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70 focus:opacity-100 focus:outline-none"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNextMedia}
                    aria-label="Next image"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/50 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70 focus:opacity-100 focus:outline-none"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  {/* Pagination Dots */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {mediaItems.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentMediaIndex(idx);
                        }}
                        className={cn(
                          "w-1.5 h-1.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white",
                          idx === currentMediaIndex
                            ? "bg-white w-6"
                            : "bg-white/50 hover:bg-white/70"
                        )}
                        aria-label={`Go to image ${idx + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          ) : (
            // Emoji Fallback
            <div className="w-full h-full flex items-center justify-center">
              <motion.div
                animate={{ scale: isHovered ? 1.1 : 1, rotate: isHovered ? 5 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-6xl opacity-90"
              >
                {greeting.eventEmoji || '🎉'}
              </motion.div>
            </div>
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

          {/* Event Badge */}
          <Badge 
            className={cn(
              "absolute top-3 left-3 px-3 py-1 text-xs font-semibold bg-gradient-to-r backdrop-blur-md border-white/20 text-white shadow-lg",
              gradientClass
            )}
          >
            <span className="mr-1.5">{greeting.eventEmoji}</span>
            {greeting.eventName}
          </Badge>

          {/* View Count */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white text-xs font-medium">
            <Eye className="w-3.5 h-3.5" />
            <span>{viewCount}</span>
          </div>

          {/* Bottom Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
            {/* Sender Info */}
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">
                  {greeting.senderName || 'Anonymous'}
                </p>
                <div className="flex items-center gap-1 text-xs text-white/80">
                  {isUpdated ? (
                    <>
                      <Clock className="w-3 h-3" />
                      <span>Updated {timeAgo}</span>
                    </>
                  ) : (
                    <>
                      <Calendar className="w-3 h-3" />
                      <span>Created {timeAgo}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Text Preview */}
            {greeting.firstText && (
              <p className="text-sm leading-relaxed line-clamp-2 opacity-95 mb-2">
                {greeting.firstText}
              </p>
            )}

            {/* Receiver Info */}
            {greeting.receiverName && (
              <p className="text-xs text-white/90">
                For <span className="font-semibold">{greeting.receiverName}</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
});

GreetingCard.displayName = 'GreetingCard';

const PublicGreetingsFeed: React.FC = () => {
  const [publicGreetings, setPublicGreetings] = useState<SavedGreeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [displayCount, setDisplayCount] = useState(20);
  const [filters, setFilters] = useState<SearchFilters>({
    searchQuery: '',
    eventName: '',
    senderName: '',
    receiverName: '',
    dateRange: { from: null, to: null },
    sortBy: 'newest',
  });
  const { getPublicGreetings } = useFirebaseGreetings();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPublicGreetings = async () => {
      try {
        setLoading(true);
        setError(null);
        const greetings = await getPublicGreetings(50);
        setPublicGreetings(greetings);
      } catch (err) {
        console.error('Failed to fetch public greetings:', err);
        setError('Failed to load greetings. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchPublicGreetings();
  }, [getPublicGreetings]);

  // Filter and sort greetings
  const filteredGreetings = useMemo(() => {
    let result = [...publicGreetings];

    // Search query filter
    if (filters.searchQuery.trim()) {
      const query = filters.searchQuery.toLowerCase().trim();
      result = result.filter((g) =>
        g.senderName?.toLowerCase().includes(query) ||
        g.receiverName?.toLowerCase().includes(query) ||
        g.eventName?.toLowerCase().includes(query) ||
        g.firstText?.toLowerCase().includes(query) ||
        g.title?.toLowerCase().includes(query)
      );
    }

    // Event name filter
    if (filters.eventName) {
      result = result.filter((g) => 
        g.eventName?.toLowerCase() === filters.eventName.toLowerCase()
      );
    }

    // Sender name filter
    if (filters.senderName.trim()) {
      const query = filters.senderName.toLowerCase().trim();
      result = result.filter((g) => g.senderName?.toLowerCase().includes(query));
    }

    // Receiver name filter
    if (filters.receiverName.trim()) {
      const query = filters.receiverName.toLowerCase().trim();
      result = result.filter((g) => g.receiverName?.toLowerCase().includes(query));
    }

    // Date range filter
    if (filters.dateRange.from || filters.dateRange.to) {
      result = result.filter((g) => {
        try {
          const greetingDate = isFirestoreTimestamp(g.createdAt) 
            ? g.createdAt.toDate()
            : new Date(g.createdAt);
          
          const fromMatch = filters.dateRange.from ? greetingDate >= filters.dateRange.from : true;
          const toMatch = filters.dateRange.to ? greetingDate <= filters.dateRange.to : true;
          return fromMatch && toMatch;
        } catch {
          return true; // If date parsing fails, include the greeting
        }
      });
    }

    // Sort
    result.sort((a, b) => {
      try {
        const dateA = isFirestoreTimestamp(a.createdAt) ? a.createdAt.toDate() : new Date(a.createdAt);
        const dateB = isFirestoreTimestamp(b.createdAt) ? b.createdAt.toDate() : new Date(b.createdAt);
        
        if (filters.sortBy === 'newest') {
          return dateB.getTime() - dateA.getTime();
        } else if (filters.sortBy === 'oldest') {
          return dateA.getTime() - dateB.getTime();
        } else {
          // most-viewed
          return (b.viewCount || 0) - (a.viewCount || 0);
        }
      } catch {
        return 0;
      }
    });

    return result;
  }, [publicGreetings, filters]);

  const handleGreetingClick = useCallback((slug: string) => {
    navigate(`/${slug}`);
  }, [navigate]);

  const handleShowMore = useCallback(() => {
    setDisplayCount(prev => prev + 12);
  }, []);

  const displayedGreetings = useMemo(() => 
    filteredGreetings.slice(0, displayCount),
    [filteredGreetings, displayCount]
  );

  const hasMoreGreetings = displayCount < filteredGreetings.length;

  // Get unique event names for filter suggestions
  const eventNames = useMemo(() => {
    const events = [...new Set(publicGreetings.map(g => g.eventName).filter(Boolean))];
    return events.sort();
  }, [publicGreetings]);

  if (error) {
    return (
      <div className="text-center py-16 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-4"
        >
          <div className="text-6xl">❌</div>
          <h3 className="text-xl font-semibold text-destructive">Error Loading Greetings</h3>
          <p className="text-muted-foreground">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </motion.div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Loading Skeleton */}
        <div className="text-center space-y-2">
          <div className="h-8 w-64 bg-muted/50 rounded-lg mx-auto animate-pulse" />
          <div className="h-4 w-96 bg-muted/30 rounded mx-auto animate-pulse" />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[3/4] bg-muted/50 rounded-xl" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!loading && publicGreetings.length === 0) {
    return (
      <div className="text-center py-16 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-pink-500/20 to-violet-500/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Heart className="w-10 h-10 text-primary" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-violet-500 to-indigo-500 bg-clip-text text-transparent">
              No Public Greetings Yet
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Be the first to share a beautiful greeting with the community! Create your greeting and make it public to inspire others.
            </p>
          </div>
          <Button 
            onClick={() => navigate('/create')}
            size="lg"
            className="bg-gradient-to-r from-pink-500 via-violet-500 to-indigo-500 hover:opacity-90 text-white px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            <span className="text-lg">✨ Create First Public Greeting</span>
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center space-y-3 px-4"
      >
        <BeautifulGreetingsText text="Community Greetings"/>
        
        <p className={cn(
          "text-base md:text-lg max-w-2xl mx-auto leading-relaxed",
          "text-slate-600 dark:text-slate-300"
        )}>
          Beautiful greetings shared by our community{" "}
          <span className="inline-block text-xl hover:animate-spin cursor-pointer">
            ✨
          </span>
        </p>
        
        <small className="text-gray-400 dark:text-gray-500">
          Posts stay live for 30 days from the time they're created.
        </small>
      </motion.div>

      {/* Search Bar */}
      <SearchBar
        onFiltersChange={setFilters}
        resultsCount={filteredGreetings.length}
      />

      {/* No Results Message */}
      {!loading && filteredGreetings.length === 0 && publicGreetings.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12"
        >
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2">No greetings found</h3>
          <p className="text-muted-foreground">
            Try adjusting your filters or search terms
          </p>
        </motion.div>
      )}

      {/* Instagram Explore Grid */}
      {filteredGreetings.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {displayedGreetings.map((greeting, index) => (
            <GreetingCard
              key={`${greeting.id}-${greeting.updatedAt || greeting.createdAt}`}
              greeting={greeting}
              index={index}
              onClick={() => handleGreetingClick(greeting.slug)}
            />
          ))}
        </div>
      )}

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-6"
      >
        {/* Show More Button */}
        {hasMoreGreetings && (
          <Button
            onClick={handleShowMore}
            size="lg"
            variant="outline"
            className="rounded-full px-6 py-5 text-base font-medium"
          >
            <span className="flex items-center gap-2">
              <span className="text-xl">📜</span>
              <span>Show More ({filteredGreetings.length - displayCount} remaining)</span>
            </span>
          </Button>
        )}

        {/* Create Greeting Button */}
        <Button
          onClick={() => navigate('/create')}
          size="lg"
          className={cn(
            "relative overflow-hidden rounded-full px-6 py-5 text-base font-medium",
            "bg-gradient-to-r from-pink-500 via-violet-500 to-indigo-500",
            "text-white shadow-lg hover:shadow-xl",
            "transition-all duration-300 group",
            "hover:opacity-90 hover:scale-105"
          )}
        >
          <span className="flex items-center gap-2">
            <span className="text-xl">✨</span>
            <span>Create Your Greeting</span>
          </span>
        </Button>
      </motion.div>
    </div>
  );
};

export default PublicGreetingsFeed;