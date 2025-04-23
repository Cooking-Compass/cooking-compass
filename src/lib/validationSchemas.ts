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

export const AddRecipeSchema = Yup.object({
  name: Yup.string().required('Recipe title is required'),
  ingredients: Yup.string().required('Ingredients are required'),
  instructions: Yup.string().required('Instructions are required'),
  image: Yup.string().url('Must be a valid URL').required('Image URL is required'),
  description: Yup.string().required('Description is required'),
  owner: Yup.string().required('Owner is required'),
});
