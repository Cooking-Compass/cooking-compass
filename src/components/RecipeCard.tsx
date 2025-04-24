'use client';

import React from 'react';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';

interface Recipe {
  id: number;
  name: string;
  description: string;
  owner: string;
}

const RecipeCard = ({ recipe }: { recipe: Recipe }) => (
  <Card className="h-100 shadow-sm">
    <Card.Body>
      <Card.Title>{recipe.name}</Card.Title>
      <Card.Text>{recipe.description}</Card.Text>
    </Card.Body>
    <Card.Footer className="d-flex justify-content-between align-items-center">
      <small className="text-muted">
        Owner:
        {recipe.owner}
      </small>
      <Link href={`/recipes/${recipe.id}`} passHref legacyBehavior>
        <Button variant="primary" size="sm">View</Button>
      </Link>
    </Card.Footer>
  </Card>
);

export default RecipeCard;
