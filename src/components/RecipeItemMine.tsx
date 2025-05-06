import { Recipe } from '@prisma/client';
import Link from 'next/link';
import { Col, Image, Row } from 'react-bootstrap';

const RecipeItem = ({ id, name, description, image }: Recipe) => (
  <div id="recipecard" className="border rounded p-3 shadow-sm">
    <h5 id="recipetitle">{name}</h5>
    <p id="recipedescription">{description}</p>
    <Row className="justify-content-center mb-4" id="recipeimagebox">
      <Col xs={6} className="d-flex align-items-center justify-content-center">
        {image ? (
          <Image id="recipeimage" src={image} alt="Recipe Image" />
        ) : (
          <p>No image available</p>
        )}
      </Col>
    </Row>
    <Row className="justify-content-center mb-3" id="recipebuttonbox">
      <Col xs={9} className="d-flex justify-content-start">
        <Link href={`/recipe/${id}`}>
          <button id="viewrecipe" type="button" className="btn">
            View Recipe
          </button>
        </Link>
      </Col>
      <Col xs={3} className="d-flex justify-content-center">
        <Link href={`/edit/${id}`}>
          <button id="viewrecipe" type="button" className="btn">
            Edit
          </button>
        </Link>
      </Col>
    </Row>
  </div>
);

export default RecipeItem;
