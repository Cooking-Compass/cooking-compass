/* eslint-disable import/extensions */
/* eslint-disable max-len */
import { Col, Container, Row } from 'react-bootstrap';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import RecipeItemMine from '@/components/RecipeItemMine';

export const dynamic = 'force-dynamic';

const RecipeListPage = async () => {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
      // eslint-disable-next-line @typescript-eslint/comma-dangle
    } | null,
  );
  const owner = (session && session.user && session.user.email) || '';

  const recipes = await prisma.recipe.findMany({
    where: {
      owner,
    },
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
                <RecipeItemMine {...recipe} />
              </Col>
            ))}
          </Row>
        </Container>
      </Container>
    </main>
  );
};

export default RecipeListPage;
