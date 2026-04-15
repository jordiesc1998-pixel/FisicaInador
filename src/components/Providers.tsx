'use client';

import { PointsProvider } from '@/contexts/PointsContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PointsProvider>
      {children}
    </PointsProvider>
  );
}
