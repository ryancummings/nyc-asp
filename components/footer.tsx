export function Footer() {
  return (
    <footer className="mt-12 py-6 border-t border-gray-700/50">
      <div className="max-w-4xl mx-auto text-center text-gray-400 text-sm">
        <p className="mb-2">
          For official information and regulations, visit the{' '}
          <a 
            href="https://portal.311.nyc.gov/article/?kanumber=KA-01011"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline transition-colors"
          >
            NYC Alternate Side Parking Homepage
          </a>
        </p>
        <p className="mb-4">
          This application is for informational purposes only.
        </p>
      </div>
    </footer>
  );
}
