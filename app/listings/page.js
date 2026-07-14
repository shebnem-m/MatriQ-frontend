'use client'; 

import { Suspense } from 'react';
import { ListingsPage } from '@/src/features/listings';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading listings...</div>}>
      <ListingsPage />
    </Suspense>
  );
}