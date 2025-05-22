# NYC Alternate Side Parking Status

A web application that helps NYC residents track Alternate Side Parking (ASP) suspensions due to holidays.

## Features

- Shows if ASP rules are suspended today
- Calendar view of all holidays with ASP suspensions
- Click on dates to see detailed information
- View upcoming ASP suspensions

## Tech Stack

- Next.js 15
- Tailwind CSS 4
- date-fns

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Key Features

- Timezone-aware holiday detection
- Responsive design (single month on mobile, two months on desktop)
- Modal with detailed ASP rules for each date
