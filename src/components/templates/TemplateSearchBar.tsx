import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface TemplateFilters {
  searchQuery: string;
  category: string;
  sortBy: 'name' | 'popular' | 'newest';
}

interface TemplateSearchBarProps {
  onFiltersChange: (filters: TemplateFilters) => void;
  resultsCount: number;
  categories: string[];
}

const TemplateSearchBar: React.FC<TemplateSearchBarProps> = ({ 
  onFiltersChange, 
  resultsCount,
  categories 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<TemplateFilters>({
    searchQuery: '',
    category: 'all',
    sortBy: 'name',
  });
  const [isFocused, setIsFocused] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Real-time search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      const updatedFilters = { ...filters, searchQuery };
      setFilters(updatedFilters);
      onFiltersChange(updatedFilters);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleClear = () => {
    setSearchQuery('');
    const clearedFilters: TemplateFilters = {
      searchQuery: '',
      category: 'all',
      sortBy: 'name',
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const handleFilterChange = (key: keyof TemplateFilters, value: string) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const hasActiveFilters = filters.category !== 'all' || filters.sortBy !== 'name';

  return (
    <div className="w-full space-y-4">
      {/* Main Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <div
          className={cn(
            "relative flex items-center gap-2 p-2 rounded-2xl border-2 transition-all duration-300",
            isFocused
              ? "border-primary shadow-xl shadow-primary/20 bg-card"
              : "border-border bg-card/50 backdrop-blur-sm"
          )}
        >
          {/* Search Icon */}
          <motion.div
            animate={{ scale: isFocused ? 1.1 : 1 }}
            transition={{ duration: 0.2 }}
            className="pl-2"
          >
            <Search className={cn(
              "w-5 h-5 transition-colors",
              isFocused ? "text-primary" : "text-muted-foreground"
            )} />
          </motion.div>

          {/* Input Field */}
          <Input
            type="text"
            placeholder="Search templates by name, occasion, or style..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent text-base placeholder:text-muted-foreground/60"
          />

          {/* Clear Button */}
          <AnimatePresence>
            {searchQuery && (
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                onClick={handleClear}
                className="p-1.5 rounded-full hover:bg-muted transition-colors"
                aria-label="Clear search"
              >
                <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Filter Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
            className="relative"
            aria-label="Toggle filters"
          >
            <SlidersHorizontal className="w-4 h-4" />
            {hasActiveFilters && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-primary"
              />
            )}
          </Button>
        </div>
      </motion.div>

      {/* Filters Row */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-wrap items-center gap-3"
          >
            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Category:</span>
              <Select
                value={filters.category}
                onValueChange={(value) => handleFilterChange('category', value)}
              >
                <SelectTrigger className="w-[180px] h-9">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Sort Filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort:</span>
              <Select
                value={filters.sortBy}
                onValueChange={(value) => handleFilterChange('sortBy', value as 'name' | 'popular' | 'newest')}
              >
                <SelectTrigger className="w-[150px] h-9">
                  <SelectValue placeholder="Name" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name A-Z</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClear}
                className="h-9 text-xs hover:text-destructive"
              >
                Clear filters
              </Button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Count */}
      <AnimatePresence>
        {(searchQuery || hasActiveFilters) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-sm text-muted-foreground px-2"
          >
            <span className="font-medium text-foreground">{resultsCount}</span>
            {' '}template{resultsCount !== 1 ? 's' : ''} found
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TemplateSearchBar;
