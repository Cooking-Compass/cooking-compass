/* eslint-disable import/extensions */

'use client';

import { deleteRecipe, editRecipe } from '@/lib/dbActions';
import { EditRecipeSchema } from '@/lib/validationSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import { Recipe } from '@prisma/client';
import { Jost } from 'next/font/google';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';

const jost = Jost({ subsets: ['latin'] });

const onSubmit = async (data: Recipe) => {
  // console.log(`onSubmit data: ${JSON.stringify(data, null, 2)}`);s
  await editRecipe(data);
  swal('Success', 'Your item has been updated', 'success', {
    timer: 2000,
  });
};

const EditRecipeForm = ({ recipe }: { recipe: Recipe }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Recipe>({
    resolver: yupResolver(EditRecipeSchema),
  });
  // console.log(stuff);

  return (
    <Container fluid className={`${jost.className} py-3 d-flex flex-column min-vh-100`}>
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center">
            <h2>Edit Recipe</h2>
          </Col>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <input type="hidden" {...register('id')} value={recipe.id} />
                <Form.Group>
                  <Form.Label>Recipe Title</Form.Label>
                  <input
                    type="text"
                    {...register('name')}
                    defaultValue={recipe.name}
                    required
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.name?.message}</div>
                </Form.Group>
                <Form.Group className="mt-2">
                  <Form.Label>Image Url</Form.Label>
                  <input
                    type="text"
                    {...register('image')}
                    className={`form-control ${errors.image ? 'is-invalid' : ''}`}
                    defaultValue={recipe.image}
                  />
                  <div className="invalid-feedback">{errors.image?.message}</div>
                </Form.Group>
                <Form.Group className="mt-2">
                  <Form.Label>Describe your food!</Form.Label>
                  <textarea
                    rows={3}
                    {...register('description')}
                    maxLength={300}
                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                    defaultValue={recipe.description}
                  />
                  <div className="invalid-feedback">{errors.description?.message}</div>
                </Form.Group>
                <Form.Group className="mt-2">
                  <Form.Label>Ingredients (Please separate using newlines)</Form.Label>
                  <textarea
                    rows={5}
                    {...register('ingredients')}
                    className={`form-control ${errors.ingredients ? 'is-invalid' : ''}`}
                    defaultValue={recipe.ingredients}
                  />
                  <div className="invalid-feedback">{errors.ingredients?.message}</div>
                </Form.Group>
                <Form.Group className="mt-2">
                  <Form.Label>Instructions (Please separate using newlines)</Form.Label>
                  <textarea
                    rows={8}
                    {...register('instructions')}
                    className={`form-control ${errors.instructions ? 'is-invalid' : ''}`}
                    defaultValue={recipe.instructions}
                  />
                  <div className="invalid-feedback">{errors.instructions?.message}</div>
                </Form.Group>
                <input type="hidden" {...register('owner')} value={recipe.owner} />
                <Form.Group className="form-group">
                  <Row className="pt-3">
                    <Col className="text-start">
                      <Button
                        style={{
                          backgroundColor: 'var(--rust)',
                          borderColor: 'var(--rust)',
                        }}
                        type="submit"
                        variant="primary"
                      >
                        Submit
                      </Button>
                    </Col>
                    <Col className="text-center">
                      <Button type="button" onClick={() => reset()} variant="warning" className="float-right">
                        Reset
                      </Button>
                    </Col>
                    <Col className="text-end">
                      <Button
                        type="button"
                        onClick={() => {
                          swal({
                            title: 'Are you sure?',
                            text: 'Once deleted, you will not be able to recover this recipe!',
                            icon: 'warning',
                            buttons: ['Cancel', 'Delete'],
                            dangerMode: true,
                          }).then((willDelete) => {
                            if (willDelete) {
                              deleteRecipe(recipe.id); // Execute delete if confirmed
                              swal('Deleted!', 'Your recipe has been deleted.', 'success');
                            }
                          });
                        }}
                        variant="danger"
                        className="float-right"
                      >
                        Delete Recipe
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

export default EditRecipeForm;
