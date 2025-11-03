# Calendar Integration APIs

This document outlines free APIs that can be used for calendar integrations and event management in the greeting card application.

## 🎯 Recommended Free APIs

### 1. **Calendarific API** (Free Tier Available)
- **Purpose**: Global holidays and events
- **Free Tier**: 1000 requests/month
- **Website**: https://calendarific.com/
- **Features**:
  - Public holidays for 230+ countries
  - Religious holidays
  - Observances and festivals
  - Historical events
  
**Use Case**: Automatically suggest greeting cards based on upcoming holidays worldwide.

```javascript
// Example API Call
const API_KEY = 'your_api_key';
const country = 'US';
const year = 2024;

fetch(`https://calendarific.com/api/v2/holidays?api_key=${API_KEY}&country=${country}&year=${year}`)
  .then(response => response.json())
  .then(data => console.log(data.response.holidays));
```

---

### 2. **Abstract API - Holidays API** (Free Tier)
- **Purpose**: Public holidays worldwide
- **Free Tier**: 1000 requests/month
- **Website**: https://www.abstractapi.com/holidays-api
- **Features**:
  - 200+ countries
  - National and regional holidays
  - JSON format

**Use Case**: Show holiday reminders and suggest appropriate greeting templates.

---

### 3. **Nager.Date API** (Completely Free)
- **Purpose**: Worldwide public holidays
- **Free Tier**: Unlimited (no API key required)
- **Website**: https://date.nager.at/
- **Features**:
  - 100+ countries
  - No authentication required
  - RESTful API

**Use Case**: Simple integration for global holiday tracking.

```javascript
// Example: Get US holidays for 2024
fetch('https://date.nager.at/api/v3/PublicHolidays/2024/US')
  .then(response => response.json())
  .then(holidays => console.log(holidays));
```

---

### 4. **Open Holiday API** (Free & Open Source)
- **Purpose**: Public holidays
- **Free Tier**: Unlimited
- **GitHub**: https://github.com/openprogramming/open-holiday-api
- **Website**: https://www.openholidaysapi.org/
- **Features**:
  - European countries focus
  - School holidays
  - Public holidays

**Use Case**: European market holiday tracking.

---

### 5. **Aladhan API** (Completely Free)
- **Purpose**: Islamic prayer times and events
- **Free Tier**: Unlimited
- **Website**: https://aladhan.com/prayer-times-api
- **Features**:
  - Prayer times
  - Islamic calendar events
  - Ramadan, Eid dates
  - Global coverage

**Use Case**: Suggest Islamic holiday greetings (Ramadan, Eid, etc.).

```javascript
// Get Islamic calendar date
fetch('https://api.aladhan.com/v1/gToH/12-03-2024')
  .then(response => response.json())
  .then(data => console.log(data.data.hijri));
```

---

### 6. **Hebcal - Jewish Calendar API** (Free)
- **Purpose**: Jewish holidays and events
- **Free Tier**: Unlimited
- **Website**: https://www.hebcal.com/home/developer-apis
- **Features**:
  - Jewish holidays
  - Torah readings
  - Candle lighting times
  - Hebrew dates

**Use Case**: Suggest Jewish holiday greetings (Hanukkah, Passover, etc.).

---

### 7. **Holiday API (by Holiday-API.com)** (Free Tier)
- **Purpose**: US holidays
- **Free Tier**: 1000 requests/month
- **Website**: https://holiday-api.com/
- **Features**:
  - US federal holidays
  - Popular observances
  - Date search

---

## 🗓️ Calendar Sync APIs

### 8. **Google Calendar API** (Free)
- **Purpose**: Full calendar integration
- **Free Tier**: Yes (requires OAuth)
- **Website**: https://developers.google.com/calendar
- **Features**:
  - Create/read/update events
  - Reminders
  - Recurring events
  - Multiple calendars

**Use Case**: Allow users to import birthdays and anniversaries from Google Calendar.

**Implementation Steps**:
1. Enable Google Calendar API in Google Cloud Console
2. Set up OAuth 2.0
3. Use the API to fetch events
4. Suggest greetings based on upcoming events

---

### 9. **Microsoft Graph API (Outlook Calendar)** (Free Tier)
- **Purpose**: Outlook/Office 365 calendar
- **Free Tier**: Yes (requires OAuth)
- **Website**: https://docs.microsoft.com/en-us/graph/api/resources/calendar
- **Features**:
  - Similar to Google Calendar
  - Enterprise focus

---

## 🎂 Birthday & Event APIs

### 10. **Abstraction Birthday API** (Free)
- **Purpose**: Birthday-related data
- **Website**: Various birthday APIs available

---

## 📱 Social Media APIs (for Event Import)

### 11. **Facebook Graph API** (Free with limitations)
- **Purpose**: Import birthdays from Facebook friends
- **Limitations**: Requires app review and user permissions
- **Website**: https://developers.facebook.com/docs/graph-api/

**Note**: Facebook has restricted birthday data access significantly. May not be viable.

---

### 12. **LinkedIn API** (Limited Free)
- **Purpose**: Professional connections and events
- **Website**: https://docs.microsoft.com/en-us/linkedin/
- **Limitations**: Requires partnership program for full access

---

## 🛠️ Implementation Recommendations

### Phase 1: Basic Holiday Integration
1. Integrate **Nager.Date API** (no auth required)
2. Display upcoming holidays on dashboard
3. Suggest relevant templates

### Phase 2: Religious Holidays
1. Add **Aladhan API** for Islamic holidays
2. Add **Hebcal API** for Jewish holidays
3. Cultural-specific greeting suggestions

### Phase 3: Calendar Sync (Requires Backend)
1. Implement Google Calendar OAuth
2. Allow users to import events
3. Set up automatic reminders
4. Suggest greetings 1 week before events

### Phase 4: Advanced Features
1. Recurring event support
2. Timezone handling
3. Multi-calendar aggregation
4. Smart notification timing

---

## 🔒 Security & Privacy Notes

1. **Never store calendar data permanently** - Only cache temporarily
2. **Respect user privacy** - Clear data on logout
3. **OAuth best practices** - Use secure token storage
4. **Rate limiting** - Implement request throttling
5. **User consent** - Always ask permission before accessing calendars

---

## 📊 Recommended Tech Stack

- **Frontend**: React with `react-query` for API caching
- **Backend**: Supabase Edge Functions for OAuth flows
- **Storage**: Supabase for user preferences (not calendar data)
- **Caching**: Session storage for temporary data

---

## 💡 Feature Ideas

1. **Smart Reminders**: Send notifications 1 week, 3 days, and 1 day before events
2. **Auto-Suggest**: AI-powered greeting suggestions based on relationship and occasion
3. **Recurring Events**: Handle birthdays, anniversaries automatically
4. **Multi-Calendar**: Aggregate from Google, Outlook, Apple Calendar
5. **Social Import**: (If APIs allow) Import birthdays from social platforms
6. **Event Categories**: Birthdays, Anniversaries, Holidays, Work Events, etc.

---

## 🚀 Getting Started

1. Choose APIs based on your target market
2. Implement free, no-auth APIs first (Nager.Date)
3. Add OAuth-based calendar sync later
4. Test with rate limits in mind
5. Implement graceful fallbacks for API failures

---

## 📞 Support Resources

- Calendarific: support@calendarific.com
- Nager.Date: GitHub Issues
- Google Calendar API: Stack Overflow, Google Developer Forums
- Aladhan API: GitHub Issues

---

**Last Updated**: March 2024  
**Author**: Development Team  
**Version**: 1.0
