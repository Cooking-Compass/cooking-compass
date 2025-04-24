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
    <main id="explorepage">
      <Container id="list" fluid className="py-3">
        <Container>
          <Row>
            <Col>
              <h1 className="text-center">Recipes</h1>
              <Row xs={1} md={2} lg={3} className="g-4">
                {recipes.map((recipe) => (
                  <Col key={recipe.id}>
                    <div id="recipecard" className="border rounded p-3 shadow-sm">
                      <h5 id="recipetitle">{recipe.name}</h5>
                      <p id="recipedescription">{recipe.description}</p>
                      <Container className="text-end">
                        <button id="viewrecipe" type="button" className="btn">
                          View Recipe
                        </button>
                      </Container>
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
