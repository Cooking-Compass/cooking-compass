import EditRecipeForm from '@/components/EditRecipeForm';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';
import { Recipe } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { Jost } from 'next/font/google';
import { notFound } from 'next/navigation';

// import font
const jost = Jost({ subsets: ['latin'] });

export default async function EditStuffPage({ params }: { params: { id: string | string[] } }) {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
      // eslint-disable-next-line @typescript-eslint/comma-dangle
    } | null,
  );
  const id = Number(Array.isArray(params?.id) ? params?.id[0] : params?.id);
  // console.log(id);
  const recipe: Recipe | null = await prisma.recipe.findUnique({
    where: { id },
  });
  // console.log(stuff);
  if (!recipe) {
    return notFound();
  }

  return (
    <main className={jost.className}>
      <EditRecipeForm recipe={recipe} />
    </main>
  );
}
