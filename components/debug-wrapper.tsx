'use client';

import { useState } from 'react';
import { DebugInfo } from './debug-info';
import { Footer } from './footer';
import type { DebugDateInfo } from './debug-info';

interface DebugWrapperProps {
  debugDateInfo: DebugDateInfo | null;
}

export function DebugWrapper({ debugDateInfo }: DebugWrapperProps) {
  const [showDebug, setShowDebug] = useState(false);
  const toggleDebug = () => setShowDebug(!showDebug);

  return (
    <>
      <DebugInfo showDebug={showDebug} debugDateInfo={debugDateInfo} />
      <Footer showDebug={showDebug} onToggleDebug={toggleDebug} />
    </>
  );
} 