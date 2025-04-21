import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export default async function handler(req: Request) {
  try {
    const data = await req.json();
    const newRecipe = await prisma.recipe.create({
      data: {
        name: data.name,
        ingredients: data.ingredients,
        instructions: data.instructions,
        image: data.image,
        description: data.description,
        owner: data.owner,
      },
    });

    return NextResponse.json({ success: true, recipe: newRecipe });
  } catch (error) {
    console.error('Error creating recipe:', error);
    return NextResponse.json({ success: false, error: 'Failed to create recipe' }, { status: 500 });
  }
}
