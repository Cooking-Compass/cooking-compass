/* eslint-disable max-len */
import { getServerSession } from 'next-auth';
import { Container, Row, Col } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import RecipeCard from '@/components/RecipeCard';
import { RecipeItem } from '@/lib/validationSchemas';

const RecipeListPage = async () => {
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(session as { user: { email: string; id: string; randomKey: string } } | null);

  const owner = session?.user?.email ?? '';

  const recipes: RecipeItem[] = await prisma.recipe.findMany({
    where: { owner },
  });

  return (
    <main className="py-4">
      <Container>
        <h1 className="text-center mb-4">My Recipes</h1>
        <Row xs={1} md={2} lg={3} className="g-4">
          {recipes.map((recipe) => (
            <Col key={recipe.id}>
              <RecipeCard recipe={recipe} />
            </Col>
          ))}
        </Row>
      </Container>
    </main>
  );
};

export default RecipeListPage;
