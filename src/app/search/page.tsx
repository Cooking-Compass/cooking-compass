import { Suspense } from 'react';
import { Container } from 'react-bootstrap';
import SearchPageClient from './SearchPageClient';

export default function Page() {
  return (
    <Suspense fallback={<p className="text-center mt-4">Loading search results...</p>}>
      <Container id="searchcontainer">
        <h1 className="text-center mt-4 mb-0">Results:</h1>
        <SearchPageClient />
      </Container>
    </Suspense>
  );
}
