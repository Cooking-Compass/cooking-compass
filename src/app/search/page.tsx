import { Suspense } from 'react';
import SearchPageClient from './SearchPageClient';

export default function Page() {
  return (
    <Suspense fallback={<p className="text-center mt-4">Loading search results...</p>}>
      <SearchPageClient />
    </Suspense>
  );
}
