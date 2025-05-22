'use client';

export interface DebugDateInfo {
  inputDate: string;
  normalizedDate: string;
  nextHolidayDate: string;
  calculatedDays: number;
  rawTimeDiff: number;
  isEDTEnvironment: boolean;
  localTimeZoneOffset: number;
  edtOffset: number;
}

interface DebugInfoProps {
  showDebug: boolean;
  debugDateInfo: DebugDateInfo | null;
}

export function DebugInfo({ showDebug, debugDateInfo }: DebugInfoProps) {
  if (!debugDateInfo) return null;

  return (
    <div className="mt-8 p-4 bg-gray-700/50 rounded-lg text-left text-xs font-mono overflow-auto" style={{ display: showDebug ? 'block' : 'none' }}>
      <h3 className="font-bold mb-2 text-yellow-400">Debug Date Information:</h3>
      <pre className="whitespace-pre-wrap break-all">
        <p><span className="text-blue-400">Input Date:</span> {debugDateInfo.inputDate}</p>
        <p><span className="text-blue-400">Normalized Date:</span> {debugDateInfo.normalizedDate}</p>
        <p><span className="text-blue-400">Next Holiday Date:</span> {debugDateInfo.nextHolidayDate}</p>
        <p><span className="text-blue-400">Calculated Days:</span> {debugDateInfo.calculatedDays}</p>
        <p><span className="text-blue-400">Raw Time Diff (ms):</span> {debugDateInfo.rawTimeDiff}</p>
        <p><span className="text-blue-400">Raw Time Diff (days):</span> {debugDateInfo.rawTimeDiff / (1000 * 60 * 60 * 24)}</p>
        <p><span className="text-red-400">Is EDT Environment:</span> {debugDateInfo.isEDTEnvironment ? 'Yes (Already in EDT)' : 'No (Converted to EDT)'}</p>
        <p><span className="text-green-400">Local Time Zone Offset:</span> {debugDateInfo.localTimeZoneOffset} hours from UTC</p>
        <p><span className="text-green-400">EDT Offset:</span> {debugDateInfo.edtOffset} hours from UTC</p>
        <p><span className="text-green-400">Time Zone Adjustment:</span> {debugDateInfo.isEDTEnvironment ? 'None needed' : `Applied ${(debugDateInfo.localTimeZoneOffset - debugDateInfo.edtOffset).toFixed(1)} hour offset`}</p>
      </pre>
    </div>
  );
} 