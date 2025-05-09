// this page fetches data from the database and generates a new page per recipe entry
import IndividualRecipe from '@/components/IndividualRecipe';
import { prisma } from '@/lib/prisma';

interface RecipePageProps {
  params: {
    id: string;
  };
}

const getRecipe = async (id: string) => {
  const recipe = await prisma.recipe.findUnique({
    where: { id: parseInt(id, 10) },
  });

  if (!recipe) {
    throw new Error(`Recipe not found with ID: ${id}`);
  }

  return {
    title: recipe.name,
    image: recipe.image,
    description: recipe.description,
    ingredients: recipe.ingredients.split('\n'), // splits by newlines
    instructions: recipe.instructions.split('\n').map((step, index) => ({
      id: `${index + 1}`,
      step: step.trim(),
    })),
  };
};

const RecipePage = async ({ params }: RecipePageProps) => {
  // console.log('Rendering RecipePage with params:', params);
  const { id } = params;
  const recipe = await getRecipe(id!);

  return <IndividualRecipe recipe={recipe} />;
};

export default RecipePage;
