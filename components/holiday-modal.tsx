interface HolidayModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: Date;
  holidayName?: string;
}

export function HolidayModal({ isOpen, onClose, date, holidayName }: HolidayModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose} 
      />
      <div 
        className="relative bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl p-6 max-w-md w-full mx-4 border border-gray-700/50 ring-1 ring-gray-700/30"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-100">{date.toLocaleDateString('en-US', { 
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-300 transition-colors p-1.5 hover:bg-gray-700/50 rounded-lg -mr-1"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          {holidayName ? (
            <>
              <div className="bg-green-900/30 text-green-100 p-4 rounded-lg border border-green-900/50 shadow-lg">
                <p className="font-medium text-lg">ASP Rules Suspended</p>
                <p className="text-green-200/90 mt-1">Due to: {holidayName}</p>
              </div>
              <p className="text-gray-300 text-sm">
                Alternate Side Parking rules are suspended on this date. You do not need to move your vehicle for street cleaning.
              </p>
            </>
          ) : (
            <>
              <div className="bg-blue-900/30 text-blue-100 p-4 rounded-lg border border-blue-900/50 shadow-lg">
                <p className="font-medium text-lg">Regular ASP Rules in Effect</p>
                <p className="text-blue-200/90 mt-1">Please check street signs for specific times</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
