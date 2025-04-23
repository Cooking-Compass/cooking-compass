'use server';

import { Stuff, Condition, Reason } from '@prisma/client';
import { hash } from 'bcrypt';
import { redirect } from 'next/navigation';
import { prisma } from './prisma';

/**
 * Adds a new recipe to the database.
 * @param recipe - An object containing the recipe details.
 */
export async function addRecipe(recipe: {
  name: string;
  ingredients: string;
  instructions: string;
  image: string;
  description: string;
  owner: string; // Assuming this is the user's email
}) {
  await prisma.recipe.create({
    data: {
      name: recipe.name,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      image: recipe.image,
      description: recipe.description,
      owner: {
        connect: {
          email: recipe.owner, // Assuming the `owner` is identified by email in the User model
        },
      },
    },
  });
  redirect('/recipes');
}

/**
 * Adds a new stuff item to the database.
 * @param stuff - An object with the following properties: name, quantity, owner, condition.
 */
export async function addStuff(stuff: { name: string; quantity: number; owner: string; condition: string }) {
  // Map the input condition to the correct Condition type
  let condition: Condition;
  if (stuff.condition.toLowerCase() === 'poor') {
    condition = 'POOR';
  } else if (stuff.condition.toLowerCase() === 'excellent') {
    condition = 'EXCELLENT';
  } else if (stuff.condition.toLowerCase() === 'good') {
    condition = 'GOOD';
  } else {
    condition = 'FAIR'; // Default to FAIR if no match
  }

  await prisma.stuff.create({
    data: {
      name: stuff.name,
      quantity: stuff.quantity,
      condition,
      owner: {
        connect: {
          email: stuff.owner,
        },
      },
    },
  });

  // After adding, redirect to the list page
  redirect('/list');
}

// eslint-disable-next-line max-len
export async function addReport(data: { owner: string; yourname: string; criminal: string; description: string; reason: string }) {
  let reason: Reason = 'Innapropriate';
  if (data.reason === 'Expensive') {
    reason = 'Expensive';
  } else if (data.reason === 'Disgusting') {
    reason = 'Disgusting';
  }
  await prisma.userReport.create({
    data: {
      owner: data.owner,
      yourname: data.yourname,
      criminal: data.criminal,
      description: data.description,
      reason,
    },
  });
  redirect('/list');
}

/**
 * Edits an existing stuff item in the database.
 * @param stuff - An object with the following properties: id, name, quantity, owner, condition.
 */
export async function editStuff(stuff: Stuff) {
  await prisma.stuff.update({
    where: { id: stuff.id },
    data: {
      name: stuff.name,
      quantity: stuff.quantity,
      owner: stuff.owner,
      condition: stuff.condition,
    },
  });
  redirect('/list');
}

/**
 * Deletes an existing stuff item from the database.
 * @param id - The ID of the stuff item to delete.
 */
export async function deleteStuff(id: number) {
  await prisma.stuff.delete({
    where: { id },
  });
  redirect('/list');
}

/**
 * Creates a new user in the database.
 * @param credentials - An object with the following properties: email, password.
 */
export async function createUser(credentials: { email: string; password: string }) {
  const existingUser = await prisma.user.findUnique({
    where: { email: credentials.email },
  });

  if (existingUser) {
    throw new Error('User with this email already exists.');
  }

  const password = await hash(credentials.password, 10);
  await prisma.user.create({
    data: {
      email: credentials.email,
      password,
    },
  });
}

/**
 * Changes the password of an existing user in the database.
 * @param credentials - An object with the following properties: email, password.
 */
export async function changePassword(credentials: { email: string; password: string }) {
  const password = await hash(credentials.password, 10);
  await prisma.user.update({
    where: { email: credentials.email },
    data: {
      password,
    },
  });
}
