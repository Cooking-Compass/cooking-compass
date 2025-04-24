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
  name: Yup.string().required('Recipe name is required'),
  description: Yup.string().required('Description is required'),
  owner: Yup.string().required('Owner email is required'),
  image: Yup.string().url('Must be a valid image URL').optional(), // optional support for images
});

export interface RecipeItem {
  id?: number;
  name: string;
  description: string;
  owner: string;
  image?: string;
}
