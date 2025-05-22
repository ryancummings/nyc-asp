import holidays from '../data/holidays.json';

export function formatDateId(date: Date): string {
  // Format date with time for unique IDs, still in local timezone
  return `${formatLocalDate(date)}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
}

export function getHolidayDateRange(): { start: Date; end: Date } {
  const dates = Object.keys(holidays).sort();
  const [startYear, startMonth] = dates[0].split('-').map(Number);
  const [endYear, endMonth] = dates[dates.length - 1].split('-').map(Number);

  return {
    start: new Date(startYear, startMonth - 1, 1), // First day of start month
    end: new Date(endYear, endMonth - 1, 1) // First day of end month
  };
}

export function formatLocalDate(date: Date): string {
  // Format date in YYYY-MM-DD using local timezone
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function isHolidayToday(date: Date): { isHoliday: boolean; holidayName?: string } {
  const dateStr = formatLocalDate(date);
  const holidayName = holidays[dateStr as keyof typeof holidays];
  return {
    isHoliday: !!holidayName,
    holidayName
  };
}

export interface Holiday {
  date: Date;
  name: string;
  daysUntil: number;
  dayOfWeek: string;
}

export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isHoliday: boolean;
  holidayName?: string;
}

export function getCalendarMonth(year: number, month: number): CalendarDay[] {
  const firstDayOfMonth = new Date(year, month, 1);
  const startDate = new Date(firstDayOfMonth);
  const today = new Date();
  
  // Start from the last Sunday before the first of the month
  startDate.setDate(1 - firstDayOfMonth.getDay());
  
  const days: CalendarDay[] = [];
  const currentDate = new Date(startDate);
  
  // Generate 6 weeks of dates
  for (let i = 0; i < 42; i++) {
    const date = new Date(currentDate);
    const dateStr = formatLocalDate(date);
    days.push({
      date,
      isCurrentMonth: date.getMonth() === month,
      isToday: formatLocalDate(date) === formatLocalDate(today),
      isHoliday: dateStr in holidays,
      holidayName: holidays[dateStr as keyof typeof holidays]
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return days;
}

/**
 * Calculate the number of days between two dates, ignoring time of day
 */
function getDaysBetween(startDate: Date, endDate: Date): number {
  // Create date objects with time set to noon to avoid DST issues
  const start = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), 12, 0, 0);
  const end = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), 12, 0, 0);
  
  // Calculate the time difference in milliseconds
  const timeDiff = end.getTime() - start.getTime();
  
  // Convert to days and round to handle any DST issues
  return Math.round(timeDiff / (1000 * 60 * 60 * 24));
}

export interface DebugDateInfo {
  inputDate: string;
  normalizedDate: string;
  nextHolidayDate: string;
  calculatedDays: number;
  rawTimeDiff: number;
}

// Global variable to store debug information
export let debugDateInfo: DebugDateInfo | null = null;

export function getUpcomingHolidays(date: Date, count: number = 3): Holiday[] {
  // Store original input date for debugging
  const inputDateStr = date.toString();
  
  // Get today's date with time set to noon (to avoid DST issues)
  const today = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0);
  const normalizedDateStr = today.toString();
  
  // Get tomorrow's date
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const holidayDates = Object.keys(holidays).sort();
  
  const upcomingDates = holidayDates
    .filter(holidayDate => {
      const [year, month, day] = holidayDate.split('-').map(Number);
      // Create holiday date with noon time
      const holiday = new Date(year, month - 1, day, 12, 0, 0);
      return holiday >= tomorrow;
    })
    .slice(0, count);

  if (upcomingDates.length === 0) {
    throw new Error('No future holidays found');
  }

  const result = upcomingDates.map(holidayDate => {
    const [year, month, day] = holidayDate.split('-').map(Number);
    // Create holiday date with noon time
    const holidayDate_ = new Date(year, month - 1, day, 12, 0, 0);
    
    // Calculate days between today and the holiday
    const daysUntil = getDaysBetween(today, holidayDate_);
    
    // For the first holiday, store debug information
    if (upcomingDates.indexOf(holidayDate) === 0) {
      const timeDiff = holidayDate_.getTime() - today.getTime();
      debugDateInfo = {
        inputDate: inputDateStr,
        normalizedDate: normalizedDateStr,
        nextHolidayDate: holidayDate_.toString(),
        calculatedDays: daysUntil,
        rawTimeDiff: timeDiff
      };
    }

    return {
      date: holidayDate_,
      name: holidays[holidayDate as keyof typeof holidays],
      daysUntil,
      dayOfWeek: holidayDate_.toLocaleDateString('en-US', { weekday: 'long' })
    };
  });
  
  return result;
}

export function formatDaysUntil(daysUntil: number): string {
  if (daysUntil === 0) {
    return 'Today';
  } else if (daysUntil === 1) {
    return 'Tomorrow';
  }

  const weeks = Math.floor(daysUntil / 7);
  const days = daysUntil % 7;

  if (weeks === 0) {
    return `In ${days} days`;
  } else if (days === 0) {
    return `In ${weeks} week${weeks > 1 ? 's' : ''}`;
  } else {
    return `In ${weeks} week${weeks > 1 ? 's' : ''} and ${days} day${days > 1 ? 's' : ''}`;
  }
}
