import { getServerSession } from 'next-auth';
// eslint-disable-next-line import/extensions
import authOptions from '@/lib/authOptions';
// eslint-disable-next-line import/extensions
import { loggedInProtectedPage } from '@/lib/page-protection';
// eslint-disable-next-line import/extensions
import RecipeForm from '@/components/SubmitRecipe';

const AddRecipe = async () => {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );
  return (
    <main>
      <RecipeForm />
    </main>
  );
};

export default AddRecipe;
