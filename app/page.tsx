import { isHolidayToday, getUpcomingHolidays, formatDaysUntil, formatDateId, type Holiday } from '../utils/dates';
import { CalendarSection } from '../components/calendar-section';
import { Footer } from '../components/footer';

export default function Home() {
  const today = new Date();
  const { isHoliday, holidayName } = isHolidayToday(today);
  const upcomingHolidays = getUpcomingHolidays(today);

  return (
    <main className="min-h-screen p-3 sm:p-8 bg-gradient-to-b from-gray-900 to-gray-800">
      <section className="max-w-4xl mx-auto bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-2xl p-4 sm:p-8 text-center border border-gray-700/50 ring-1 ring-gray-700/50">
        <h1 className="text-4xl font-bold mb-8 text-white">NYC Alternate Side Parking Status</h1>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-gray-100">Today&apos;s Status</h2>
          <div className={`text-xl p-6 rounded-xl shadow-lg transition-all ${isHoliday ? 'bg-green-900/90 text-green-100 ring-1 ring-green-500/50' : 'bg-blue-900/90 text-blue-100 ring-1 ring-blue-500/50'}`}>
            {isHoliday ? (
              <>
                <div>Today is a holiday: </div>
                <div>{holidayName}</div>
                <div className="mt-1 font-bold">ASP is suspended!</div>
              </>
            ) : (
              'Regular ASP rules are in effect today'
            )}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">Upcoming ASP Holidays</h2>
          <div className="grid gap-4">
            {upcomingHolidays.map((holiday: Holiday) => (
              <div key={formatDateId(holiday.date)} className="bg-gray-700/50 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-gray-600/50">
                <p className="text-lg font-medium text-gray-100">{holiday.name}</p>
                <p className="text-gray-300">
                  {formatDaysUntil(holiday.daysUntil)} • {holiday.dayOfWeek}
                </p>
              </div>
            ))}
          </div>
        </div>

        <CalendarSection initialDate={today} />
      </section>
      
      <Footer />
    </main>
  );
}
