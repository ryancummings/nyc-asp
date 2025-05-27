import { getCalendarMonth, formatDateId, convertToEDT } from '../utils/dates';

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface CalendarProps {
  year: number;
  month: number;
  onDateClick?: (date: Date, holidayName?: string) => void;
}

export function Calendar({ year, month, onDateClick }: CalendarProps) {
  const days = getCalendarMonth(year, month);
  const monthName = convertToEDT(new Date(year, month)).toLocaleString('en-US', { month: 'long' });

  return (
    <div className="w-full bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-xl">
      <div className="px-3 sm:px-6 py-4 bg-gray-800 border-b border-gray-700">
        <h3 className="text-lg font-semibold text-gray-100">{monthName} {year}</h3>
      </div>
      <div className="p-2 sm:p-4">
        <div className="bg-gray-700/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-600/50 ring-1 ring-gray-600/30">
          <div className="grid grid-cols-7 gap-2 mb-4">
            {/* Day headers */}
            {DAYS_OF_WEEK.map(day => (
              <div key={day} className="text-sm font-semibold text-gray-400">{day}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {/* Calendar days */}
            {days.map((day) => {
              const isWeekend = day.date.getDay() === 0 || day.date.getDay() === 6;
              const isTodayAndHoliday = day.isToday && day.isHoliday;
              return (
                <div
                  key={formatDateId(day.date)}
                  onClick={() => onDateClick?.(day.date, day.holidayName)}
                  className={`
                    relative aspect-square flex items-center justify-center
                    text-sm font-medium rounded-lg transition-all duration-200 ease-in-out
                    ${day.isCurrentMonth 
                      ? 'hover:bg-gray-600/70 hover:shadow-md hover:scale-105 cursor-pointer' 
                      : 'opacity-25 cursor-default'}
                    ${isTodayAndHoliday
                      ? 'ring-4 ring-blue-500 bg-green-900/80 text-yellow-100 shadow-xl scale-110 z-10'
                      : day.isToday
                        ? 'ring-2 ring-blue-500 shadow-lg shadow-blue-500/20'
                        : ''}
                    ${!isTodayAndHoliday && day.isHoliday 
                      ? 'bg-green-900/50 hover:bg-green-800/70 ring-1 ring-green-500/30' 
                      : ''}
                    ${isWeekend ? 'text-gray-500' : 'text-gray-200'}
                  `}
                >
                  {day.date.getDate()}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
