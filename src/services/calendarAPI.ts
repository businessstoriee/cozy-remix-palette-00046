/**
 * Calendar API Integration Service
 * Uses free APIs to fetch holidays and events
 */

export interface CalendarEvent {
  id: string;
  name: string;
  date: string; // ISO format YYYY-MM-DD
  emoji: string;
  category: 'national' | 'religious' | 'seasonal' | 'international';
  country?: string;
  description?: string;
}

// Enhanced cache with localStorage persistence
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours
const CACHE_KEY_PREFIX = 'calendar_cache_';

// Initialize cache from localStorage
const initializeCache = (): Map<string, { data: CalendarEvent[], timestamp: number }> => {
  const cache = new Map();
  try {
    const keys = Object.keys(localStorage).filter(key => key.startsWith(CACHE_KEY_PREFIX));
    keys.forEach(key => {
      const data = localStorage.getItem(key);
      if (data) {
        const parsed = JSON.parse(data);
        cache.set(key.replace(CACHE_KEY_PREFIX, ''), parsed);
      }
    });
  } catch (e) {
    console.warn('Failed to load cache from localStorage:', e);
  }
  return cache;
};

const cache = initializeCache();

// Save cache to localStorage
const saveCacheToStorage = (key: string, data: CalendarEvent[], timestamp: number) => {
  try {
    localStorage.setItem(
      `${CACHE_KEY_PREFIX}${key}`,
      JSON.stringify({ data, timestamp })
    );
  } catch (e) {
    console.warn('Failed to save cache to localStorage:', e);
  }
};

/**
 * Fetch holidays from Nager.Date API (free, no key required)
 * Supports worldwide public holidays
 */
export async function fetchPublicHolidays(
  countryCode: string = 'US',
  year: number = new Date().getFullYear()
): Promise<CalendarEvent[]> {
  const cacheKey = `holidays-${countryCode}-${year}`;
  const cached = cache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  try {
    const response = await fetch(
      `https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch holidays');
    }

    const holidays = await response.json();

    const events: CalendarEvent[] = holidays.map((holiday: any) => ({
      id: `holiday-${holiday.date}-${holiday.countryCode}`,
      name: holiday.name || holiday.localName,
      date: holiday.date,
      emoji: getHolidayEmoji(holiday.name),
      category: 'national' as const,
      country: countryCode,
      description: holiday.name,
    }));

    const timestamp = Date.now();
    cache.set(cacheKey, { data: events, timestamp });
    saveCacheToStorage(cacheKey, events, timestamp);
    return events;
  } catch (error) {
    console.error('Error fetching public holidays:', error);
    return [];
  }
}

/**
 * Fetch upcoming holidays from multiple sources
 */
export async function fetchUpcomingEvents(): Promise<CalendarEvent[]> {
  const today = new Date();
  const year = today.getFullYear();
  const nextYear = year + 1;

  try {
    // Fetch holidays for current and next year
    const [currentYearHolidays, nextYearHolidays] = await Promise.all([
      fetchPublicHolidays('US', year),
      fetchPublicHolidays('US', nextYear),
    ]);

    const allEvents = [...currentYearHolidays, ...nextYearHolidays];

    // Filter upcoming events (within next 90 days)
    const upcoming = allEvents.filter((event) => {
      const eventDate = new Date(event.date);
      const daysUntil = Math.ceil(
        (eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
      );
      return daysUntil >= 0 && daysUntil <= 90;
    });

    // Sort by date
    return upcoming.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  } catch (error) {
    console.error('Error fetching upcoming events:', error);
    return [];
  }
}

/**
 * Get emoji for specific holiday
 */
function getHolidayEmoji(holidayName: string): string {
  const name = holidayName.toLowerCase();

  if (name.includes('christmas')) return '🎄';
  if (name.includes('new year')) return '🎆';
  if (name.includes('valentine')) return '❤️';
  if (name.includes('easter')) return '🐰';
  if (name.includes('halloween')) return '🎃';
  if (name.includes('thanksgiving')) return '🦃';
  if (name.includes('independence')) return '🎆';
  if (name.includes('labor')) return '👷';
  if (name.includes('memorial')) return '🇺🇸';
  if (name.includes('mother')) return '👩';
  if (name.includes('father')) return '👨';
  if (name.includes('birthday')) return '🎂';
  if (name.includes('wedding') || name.includes('marriage')) return '💍';
  if (name.includes('anniversary')) return '💕';
  if (name.includes('graduation')) return '🎓';
  if (name.includes('ramadan') || name.includes('eid')) return '🌙';
  if (name.includes('diwali')) return '🪔';
  if (name.includes('hanukkah')) return '🕎';
  if (name.includes('lunar new year') || name.includes('chinese new year')) return '🐉';
  if (name.includes('patrick')) return '☘️';

  return '🎉'; // Default
}

/**
 * Get popular international events
 */
export function getInternationalEvents(): CalendarEvent[] {
  const currentYear = new Date().getFullYear();

  return [
    {
      id: 'mothers-day',
      name: "Mother's Day",
      date: `${currentYear}-05-14`, // 2nd Sunday of May (approximate)
      emoji: '👩',
      category: 'international',
      description: 'Celebrating mothers and motherhood',
    },
    {
      id: 'fathers-day',
      name: "Father's Day",
      date: `${currentYear}-06-18`, // 3rd Sunday of June (approximate)
      emoji: '👨',
      category: 'international',
      description: 'Celebrating fathers and fatherhood',
    },
    {
      id: 'valentines-day',
      name: "Valentine's Day",
      date: `${currentYear}-02-14`,
      emoji: '❤️',
      category: 'international',
      description: 'Day of love and romance',
    },
    {
      id: 'halloween',
      name: 'Halloween',
      date: `${currentYear}-10-31`,
      emoji: '🎃',
      category: 'international',
      description: 'Spooky celebration',
    },
    {
      id: 'christmas',
      name: 'Christmas',
      date: `${currentYear}-12-25`,
      emoji: '🎄',
      category: 'international',
      description: 'Christian holiday celebrating the birth of Jesus',
    },
    {
      id: 'new-year',
      name: "New Year's Day",
      date: `${currentYear + 1}-01-01`,
      emoji: '🎆',
      category: 'international',
      description: 'First day of the new year',
    },
  ];
}

/**
 * Combine all events and remove duplicates
 */
export async function getAllEvents(): Promise<CalendarEvent[]> {
  const [upcomingHolidays, internationalEvents] = await Promise.all([
    fetchUpcomingEvents(),
    Promise.resolve(getInternationalEvents()),
  ]);

  // Combine and deduplicate
  const allEvents = [...upcomingHolidays, ...internationalEvents];
  const uniqueEvents = Array.from(
    new Map(allEvents.map((event) => [event.id, event])).values()
  );

  return uniqueEvents.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
}

/**
 * Format date for display
 */
export function formatEventDate(dateString: string): string {
  const date = new Date(dateString);
  const today = new Date();
  const daysUntil = Math.ceil(
    (date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  if (daysUntil === 0) return `${formattedDate} (Today)`;
  if (daysUntil === 1) return `${formattedDate} (Tomorrow)`;
  if (daysUntil > 0 && daysUntil <= 7) return `${formattedDate} (${daysUntil} days)`;
  
  return formattedDate;
}
