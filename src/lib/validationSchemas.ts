import * as Yup from 'yup';

export const AddStuffSchema = Yup.object({
  name: Yup.string().required(),
  quantity: Yup.number().positive().required(),
  condition: Yup.string().oneOf(['excellent', 'good', 'fair', 'poor']).required(),
  owner: Yup.string().required(),
});

export const EditStuffSchema = Yup.object({
  id: Yup.number().required(),
  name: Yup.string().required(),
  quantity: Yup.number().positive().required(),
  condition: Yup.string().oneOf(['excellent', 'good', 'fair', 'poor']).required(),
  owner: Yup.string().required(),
});

export const UserReportSchema = Yup.object({
  yourname: Yup.string().required(),
  criminal: Yup.string().required(),
  description: Yup.string().required(),
  reason: Yup.string().oneOf(['Innapropriate', 'Disgusting', 'Expensive']).required(),
  owner: Yup.string().required(),
});

export const RecipeSchema = Yup.object({
  name: Yup.string().required().max(35),
  description: Yup.string().required().max(300),
  ingredients: Yup.string().required(),
  instructions: Yup.string().required(),
  owner: Yup.string().required(),
  image: Yup.string().required(),
});
