"use client";

import { useState } from 'react';
import { HolidayModal } from './holiday-modal';
import { CalendarSection } from './calendar-section';

interface ClientComponentProps {
  initialDate: Date;
  isHoliday: boolean;
  holidayName?: string;
  upcomingHolidays: Holiday[];
}

export function ClientComponent({ initialDate, isHoliday, holidayName, upcomingHolidays }: ClientComponentProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedHolidayName, setSelectedHolidayName] = useState<string>();

  return (
    <>
      <CalendarSection 
        initialDate={initialDate} 
        onSelectDate={(date, holidayName) => {
          setSelectedDate(date);
          setSelectedHolidayName(holidayName);
        }}
      />
      <HolidayModal 
        isOpen={selectedDate !== null}
        onClose={() => setSelectedDate(null)}
        date={selectedDate ?? new Date()}
        holidayName={selectedHolidayName}
      />
    </>
  );
}
