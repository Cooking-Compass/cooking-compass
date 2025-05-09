'use client';

import '@/app/globals.css';
import { Jost } from 'next/font/google';
import { Button, Container, Image } from 'react-bootstrap';

// import font
const jost = Jost({ subsets: ['latin'] });

// getting data
type RecipeData = {
  title: string;
  image: string;
  description: string;
  ingredients: string[];
  instructions: { id: string; step: string }[];
};

const Recipe = ({ recipe }: { recipe: RecipeData }) => (
  <main className={`${jost.className} recipe`}>
    <h1 className="text-center py-3">{recipe.title}</h1>

    <Container className="flex-container">
      <Image src={recipe.image} className="recipe-image" fluid />
      <div className="recipe-text">
        <section className="description">
          <h2>About This Recipe</h2>
          <p>{recipe.description}</p>
        </section>
        <section className="ingredients">
          <h2>Ingredients</h2>
          <ul>
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
        </section>
        <section className="instructions">
          <h2>Instructions</h2>
          <ol>
            {recipe.instructions.map((instruction) => (
              <li key={instruction.id}>{instruction.step}</li>
            ))}
          </ol>
        </section>
      </div>
      <div className="text-end">
        <Button
          style={{
            backgroundColor: 'var(--rust)',
            borderColor: 'var(--rust)',
          }}
          className="mt-3"
        >
          <a href="/report" className="text-white text-decoration-none">
            Report
          </a>
        </Button>
      </div>
    </Container>
    <br />
  </main>
);

export default Recipe;
