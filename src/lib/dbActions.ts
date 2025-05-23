'use server';

import { Stuff, Condition, Reason, Recipe } from '@prisma/client';
import { hash } from 'bcrypt';
import { redirect } from 'next/navigation';
import { prisma } from './prisma';

/**
 * Adds a new stuff to the database.
 * @param stuff, an object with the following properties: name, quantity, owner, condition.
 */
export async function addStuff(stuff: { name: string; quantity: number; owner: string; condition: string }) {
  // console.log(`addStuff data: ${JSON.stringify(stuff, null, 2)}`);
  let condition: Condition = 'good';
  if (stuff.condition === 'poor') {
    condition = 'poor';
  } else if (stuff.condition === 'excellent') {
    condition = 'excellent';
  } else {
    condition = 'fair';
  }
  await prisma.stuff.create({
    data: {
      name: stuff.name,
      quantity: stuff.quantity,
      owner: stuff.owner,
      condition,
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
  redirect('/');
}

export async function addRecipe(data: {
  name: string;
  description: string;
  ingredients: string;
  instructions: string;
  owner: string;
  image: string;
}) {
  await prisma.recipe.create({
    data: {
      name: data.name,
      description: data.description,
      ingredients: data.ingredients,
      instructions: data.instructions,
      owner: data.owner,
      image: data.image,
    },
  });
}

export async function editRecipe(data: Recipe) {
  await prisma.recipe.update({
    where: { id: data.id },
    data: {
      name: data.name,
      description: data.description,
      ingredients: data.ingredients,
      instructions: data.instructions,
      owner: data.owner,
      image: data.image,
    },
  });
  // After updating, redirect to the myrecipe page
  redirect('/myrecipes');
}

/**
 * Edits an existing stuff in the database.
 * @param stuff, an object with the following properties: id, name, quantity, owner, condition.
 */
export async function editStuff(stuff: Stuff) {
  // console.log(`editStuff data: ${JSON.stringify(stuff, null, 2)}`);
  await prisma.stuff.update({
    where: { id: stuff.id },
    data: {
      name: stuff.name,
      quantity: stuff.quantity,
      owner: stuff.owner,
      condition: stuff.condition,
    },
  });
  // After updating, redirect to the list page
  redirect('/list');
}

/**
 * Deletes an existing stuff from the database.
 * @param id, the id of the stuff to delete.
 */
export async function deleteStuff(id: number) {
  // console.log(`deleteStuff id: ${id}`);
  await prisma.stuff.delete({
    where: { id },
  });
  // After deleting, redirect to the list page
  redirect('/list');
}

export async function deleteRecipe(id: number) {
  // console.log(`deleteStuff id: ${id}`);
  await prisma.recipe.delete({
    where: { id },
  });
  // After deleting, redirect to the list page
  redirect('/myrecipes');
}

/**
 * Creates a new user in the database.
 * @param credentials, an object with the following properties: email, password.
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
 * @param credentials, an object with the following properties: email, password.
 */
export async function changePassword(credentials: { email: string; password: string }) {
  // console.log(`changePassword data: ${JSON.stringify(credentials, null, 2)}`);
  const password = await hash(credentials.password, 10);
  await prisma.user.update({
    where: { email: credentials.email },
    data: {
      password,
    },
  });
}
