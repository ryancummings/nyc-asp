# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (uses Turbo for faster builds)
npm run dev

# Build production version
npm run build

# Start production server
npm start

# Run linting (ESLint with Next.js rules)
npm run lint
```

## Architecture Overview

This is a Next.js 15 application that helps NYC residents track Alternate Side Parking (ASP) suspensions due to holidays. The app uses App Router and is deployed as a static site.

### Key Components

- **Core Data**: Holiday data is stored in `data/holidays.json` with YYYY-MM-DD format keys
- **Date Logic**: `utils/dates.ts` handles timezone conversion to EDT, holiday checking, and calendar generation
- **Calendar System**: Two-component architecture with `CalendarSection` (navigation) and `Calendar` (display)
- **Modal System**: `HolidayModal` shows detailed ASP information when dates are clicked

### Data Flow

1. `app/page.tsx` uses server-side rendering with 5-minute revalidation
2. All dates are converted to EDT using `convertToEDT()` for consistent timezone handling
3. Holiday lookups use formatted date strings (YYYY-MM-DD) against the JSON data
4. Calendar components communicate via callback props for date selection

### Styling

- Uses Tailwind CSS 4 with dark theme
- Responsive design: single calendar on mobile, dual calendar on desktop (lg+ breakpoint)
- Custom gradient backgrounds and glass-morphism effects

### Browser Caching

Middleware (`middleware.ts`) prevents browser caching on the homepage to ensure users always see current ASP status.

### Analytics

Google Analytics is implemented via Next.js Script components in the root layout.