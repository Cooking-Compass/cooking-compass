/* eslint-disable no-nested-ternary */

'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
// eslint-disable-next-line import/extensions
import { Recipe } from '@prisma/client';
// eslint-disable-next-line import/extensions
import RecipeItem from '@/components/RecipeItem';

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await fetch(`/api/recipes?search=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to fetch recipes:', err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    if (query) fetchResults();
  }, [query]);

  return (
    <main className="py-4" id="searchpage">
      <Container>
        {loading ? (
          <p className="text-center mt-4">Loading...</p>
        ) : results.length === 0 ? (
          <p className="text-center mt-4 text-muted"><strong>No recipes found.</strong></p>
        ) : (
          <Row xs={1} md={2} lg={3} className="g-4 mt-3">
            {results.map((recipe) => (
              <Col key={recipe.id}>
                <RecipeItem {...recipe} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </main>
  );
};

export default SearchPage;
