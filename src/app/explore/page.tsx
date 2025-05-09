/* eslint-disable max-len */
import RecipeItem from '@/components/RecipeItem';
import { prisma } from '@/lib/prisma';
import { Jost } from 'next/font/google';
import { Col, Container, Row } from 'react-bootstrap';

export const dynamic = 'force-dynamic';

// import font
const jost = Jost({ subsets: ['latin'] });

const RecipeListPage = async () => {
  const recipes = await prisma.recipe.findMany({
    where: {},
    orderBy: {
      id: 'desc',
    },
  });

  return (
    <main id="explorepage">
      <Container id="list" fluid className={`${jost.className} py-3`}>
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
