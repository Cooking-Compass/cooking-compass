/* eslint-disable max-len */
import { Col, Container, Row } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import RecipeItem from '@/components/RecipeItem';

/** Render a list of recipes for the logged-in user. */
const RecipeListPage = async () => {
  const recipes = await prisma.recipe.findMany({
    where: {},
    orderBy: {
      id: 'desc',
    },
  });

  return (
    <main id="explorepage">
      <Container id="list" fluid className="py-3">
        <Container>
          <h1 className="text-center">Recipes</h1>
          <Row xs={1} md={2} lg={3} className="g-4">
            {recipes.map((recipe) => (
              <Col key={recipe.id}>
                <RecipeItem {...recipe} />
              </Col>
            ))}
          </Row>
        </Container>
      </Container>
    </main>
  );
};

export default RecipeListPage;
