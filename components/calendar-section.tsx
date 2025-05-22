'use client';

import { useState } from 'react';
import { Calendar } from './calendar';
import { HolidayModal } from './holiday-modal';
import { getHolidayDateRange } from '../utils/dates';

interface CalendarSectionProps {
  initialDate: Date;
}

export function CalendarSection({ initialDate }: CalendarSectionProps) {
  const { start: minDate, end: maxDate } = getHolidayDateRange();
  const [baseDate, setBaseDate] = useState(initialDate);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedHolidayName, setSelectedHolidayName] = useState<string>();
  
  const canGoBack = new Date(baseDate.getFullYear(), baseDate.getMonth() - 1, 1) >= minDate;
  const canGoForward = new Date(baseDate.getFullYear(), baseDate.getMonth() + 2, 1) <= maxDate;
  
  const goToPreviousMonth = () => {
    if (canGoBack) {
      setBaseDate(new Date(baseDate.getFullYear(), baseDate.getMonth() - 1, 1));
    }
  };
  
  const goToNextMonth = () => {
    if (canGoForward) {
      setBaseDate(new Date(baseDate.getFullYear(), baseDate.getMonth() + 1, 1));
    }
  };

  return (
    <>
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-100">Calendar View</h2>
          <div className="flex items-center gap-4">
            <button
              onClick={goToPreviousMonth}
              disabled={!canGoBack}
              className={`p-2 rounded-full hover:bg-gray-700 transition-colors ${!canGoBack ? 'opacity-50 cursor-not-allowed' : ''}`}
              aria-label="Previous month"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              onClick={goToNextMonth}
              disabled={!canGoForward}
              className={`p-2 rounded-full hover:bg-gray-700 transition-colors ${!canGoForward ? 'opacity-50 cursor-not-allowed' : ''}`}
              aria-label="Next month"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Always show current month */}
          <Calendar 
            year={baseDate.getFullYear()} 
            month={baseDate.getMonth()} 
            onDateClick={(date, holidayName) => {
              setSelectedDate(date);
              setSelectedHolidayName(holidayName);
            }}
          />
          {/* Only show next month on larger screens */}
          <div className="hidden lg:block">
            <Calendar 
              year={baseDate.getMonth() === 11 ? baseDate.getFullYear() + 1 : baseDate.getFullYear()} 
              month={baseDate.getMonth() === 11 ? 0 : baseDate.getMonth() + 1} 
              onDateClick={(date, holidayName) => {
                setSelectedDate(date);
                setSelectedHolidayName(holidayName);
              }}
            />
          </div>
        </div>
      </div>

      <HolidayModal 
        isOpen={selectedDate !== null}
        onClose={() => setSelectedDate(null)}
        date={selectedDate ?? new Date()}
        holidayName={selectedHolidayName}
      />
    </>
  );
}
