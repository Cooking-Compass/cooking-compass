/* eslint-disable max-len */
import { getServerSession } from 'next-auth';
import { Col, Container, Row } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import { loggedInProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';

interface Recipe {
  id: number;
  name: string;
  description: string;
  owner: string;
}

/** Render a list of recipes for the logged-in user. */
const RecipeListPage = async () => {
  // Protect the page
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(session as { user: { email: string; id: string; randomKey: string } } | null);

  const owner = session?.user?.email || '';

  const recipes: Recipe[] = await prisma.recipe.findMany({
    where: { owner },
  });

  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Container>
          <Row>
            <Col>
              <h1 className="text-center">My Recipes</h1>
              <Row xs={1} md={2} lg={3} className="g-4">
                {recipes.map((recipe) => (
                  <Col key={recipe.id}>
                    <div className="border rounded p-3 bg-light shadow-sm">
                      <h5>{recipe.name}</h5>
                      <p>{recipe.description}</p>
                    </div>
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
