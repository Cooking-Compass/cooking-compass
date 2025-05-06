import { Recipe } from '@prisma/client';
import Link from 'next/link';
import { Col, Container, Image, Row } from 'react-bootstrap';

const RecipeItem = ({ id, name, description, image }: Recipe) => (
  <div id="recipecard" className="border rounded p-3 shadow-sm">
    <h5 id="recipetitle">{name}</h5>
    <p id="recipedescription">{description}</p>
    <Row className="justify-content-center mb-3" id="recipeimagebox">
      <Col xs={6} className="text-center">
        {image ? (
          <Image id="recipeimage" src={image} alt="Recipe Image" />
        ) : (
          <p>No image available</p>
        )}
      </Col>
      <Col xs={6} className="d-flex align-items-end justify-content-center">
        <Container className="text-end">
          <Link href={`/recipe/${id}`}>
            <button id="viewrecipe" type="button" className="btn">
              View Recipe
            </button>
          </Link>
        </Container>
      </Col>
    </Row>
  </div>
);

export default RecipeItem;
