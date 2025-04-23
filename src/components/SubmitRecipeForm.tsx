'use client';

import { useSession } from 'next-auth/react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { redirect } from 'next/navigation';
import { addRecipe } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { AddRecipeSchema } from '@/lib/validationSchemas'; // Validation schema for recipes

interface RecipeFormData {
  name: string;
  ingredients: string;
  instructions: string;
  image: string;
  description: string;
  owner: string;
}

const SubmitRecipeForm: React.FC = () => {
  const { data: session, status } = useSession();
  const currentUser = session?.user?.email || ''; // Get the current user's email

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RecipeFormData>({
    resolver: yupResolver(AddRecipeSchema), // Use the validation schema for recipes
    defaultValues: {
      name: '',
      ingredients: '',
      instructions: '',
      image: '',
      description: '',
      owner: currentUser, // Automatically set the owner to the current user's email
    },
  });

  const onSubmit = async (data: RecipeFormData) => {
    try {
      await addRecipe(data); // Call the database action to add the recipe
      swal('Success', 'Your recipe has been added', 'success', {
        timer: 2000,
      });
      reset(); // Reset the form after successful submission
    } catch (error) {
      console.error('Error adding recipe:', error);
      swal('Error', 'Failed to add the recipe. Please try again.', 'error');
    }
  };

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  if (status === 'unauthenticated') {
    redirect('/auth/signin'); // Redirect unauthenticated users to the sign-in page
  }

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center">
            <h2>Submit Your Recipe</h2>
          </Col>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                {/* Recipe Title */}
                <Form.Group>
                  <Form.Label>Recipe Title</Form.Label>
                  <input
                    type="text"
                    {...register('name')}
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.name?.message}</div>
                </Form.Group>

                {/* Ingredients */}
                <Form.Group>
                  <Form.Label>Ingredients</Form.Label>
                  <textarea
                    {...register('ingredients')}
                    className={`form-control ${errors.ingredients ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.ingredients?.message}</div>
                </Form.Group>

                {/* Instructions */}
                <Form.Group>
                  <Form.Label>Instructions</Form.Label>
                  <textarea
                    {...register('instructions')}
                    className={`form-control ${errors.instructions ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.instructions?.message}</div>
                </Form.Group>

                {/* Image */}
                <Form.Group>
                  <Form.Label>Image URL</Form.Label>
                  <input
                    type="text"
                    {...register('image')}
                    className={`form-control ${errors.image ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.image?.message}</div>
                </Form.Group>

                {/* Description */}
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <textarea
                    {...register('description')}
                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.description?.message}</div>
                </Form.Group>

                {/* Hidden Owner Field */}
                <input type="hidden" {...register('owner')} value={currentUser} />

                {/* Submit and Reset Buttons */}
                <Form.Group className="form-group">
                  <Row className="pt-3">
                    <Col>
                      <Button type="submit" variant="primary">
                        Submit
                      </Button>
                    </Col>
                    <Col>
                      <Button type="button" onClick={() => reset()} variant="warning" className="float-right">
                        Reset
                      </Button>
                    </Col>
                  </Row>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SubmitRecipeForm;
