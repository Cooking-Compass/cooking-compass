import { Recipe } from '@prisma/client';
import { Container } from 'react-bootstrap';

const RecipeItem = ({ name, description }: Recipe) => (
  <div id="recipecard" className="border rounded p-3 shadow-sm">
    <h5 id="recipetitle">{name}</h5>
    <p id="recipedescription">{description}</p>
    <Container className="text-end">
      <button id="viewrecipe" type="button" className="btn">
        View Recipe
      </button>
    </Container>
  </div>
);

export default RecipeItem;
