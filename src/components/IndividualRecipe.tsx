'use client';

import { Jost } from 'next/font/google';
import { Container, Image } from 'react-bootstrap';
import '../globals.css';

// import font
const jost = Jost({ subsets: ['latin'] });

// getting data
type RecipeData = {
  title: string;
  image: string;
  description: string;
  ingredients: string[];
  instructions: string[];
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
          <p>{recipe.ingredients}</p>
        </section>
        <section className="instructions">
          <h2>Instructions</h2>
          <p>{recipe.instructions}</p>
        </section>
      </div>
    </Container>
    <br />
  </main>
);

export default Recipe;
