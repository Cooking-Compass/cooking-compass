/* eslint-disable max-len */
import { Col, Container, Row } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import RecipeItem from '@/components/RecipeItem';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';

/** Render a list of recipes for the logged-in user. */
const RecipeListPage = async () => {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
      // eslint-disable-next-line @typescript-eslint/comma-dangle
    } | null,
  );

  const recipes = await prisma.recipe.findMany({
    where: {},
  });

  return (
    <main id="explorepage">
      <Container id="list" fluid className="py-3">
        <Container>
          <Row>
            <Col>
              <h1 className="text-center">Recipes</h1>
              <Row xs={1} md={2} lg={3} className="g-4">
                {recipes.map((recipe) => (
                  <Col>
                    <RecipeItem key={recipe.id} {...recipe} />
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Container>
      </Container>
    </main>
  );
};

export default RecipeListPage;
