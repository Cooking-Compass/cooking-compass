'use client';

import React from 'react';
import Link from 'next/link';
import { Card } from 'react-bootstrap';

// Optional: if you're using Bootstrap
// import { Card } from 'react-bootstrap';

interface Recipe {
  id: number;
  name: string;
  description: string;
  owner: string;
  // Add other fields if needed (e.g., imageUrl, tags)
}

const RecipeCard = ({ recipe }: { recipe: Recipe }) => (
  <Card className="h-100">
    <Card.Body>
      <Card.Title>{recipe.name}</Card.Title>
      <Card.Text>{recipe.description}</Card.Text>
    </Card.Body>
    <Card.Footer className="d-flex justify-content-between align-items-center">
      <small className="text-muted">
        Owner:
        {recipe.owner}
      </small>
      <Link href={`/recipes/${recipe.id}`}>View</Link>
    </Card.Footer>
  </Card>
);

export default RecipeCard;
