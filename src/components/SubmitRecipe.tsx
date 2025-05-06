/* eslint-disable import/extensions */

'use client';

import LoadingSpinner from '@/components/LoadingSpinner';
import { addRecipe } from '@/lib/dbActions';
import { RecipeSchema } from '@/lib/validationSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSession } from 'next-auth/react';
import { Jost } from 'next/font/google';
import { redirect } from 'next/navigation';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';

// import font
const jost = Jost({ subsets: ['latin'] });

// eslint-disable-next-line max-len
const onSubmit = async (data: {
  name: string;
  description: string;
  ingredients: string;
  instructions: string;
  owner: string;
  image: string;
}) => {
  // console.log(`onSubmit data: ${JSON.stringify(data, null, 2)}`);
  await addRecipe(data);
  swal('Success', 'Your item has been added', 'success', {
    timer: 2000,
  }).then(() => {
    window.location.href = '/explore';
  });
};

const RecipeForm: React.FC = () => {
  const { data: session, status } = useSession();
  const currentUser = session?.user?.email || '';
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RecipeSchema),
  });
  if (status === 'loading') {
    return <LoadingSpinner />;
  }
  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }

  return (
    <Container id="submitrecipe" fluid className={`${jost.className} py-3 d-flex flex-column min-vh-100`}>
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center">
            <h2>Submit Your Recipe</h2>
          </Col>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mt-2">
                  <Form.Label>Recipe Title</Form.Label>
                  <input
                    type="text"
                    {...register('name')}
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
                  />
                  <div className="invalid-feedback">{errors.image?.message}</div>
                </Form.Group>
                <Form.Group className="mt-2">
                  <Form.Label>Ingredients (Please separate using commas)</Form.Label>
                  <textarea
                    {...register('ingredients')}
                    className={`form-control ${errors.ingredients ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.ingredients?.message}</div>
                </Form.Group>
                <Form.Group className="mt-2">
                  <Form.Label>Description</Form.Label>
                  <textarea
                    {...register('description')}
                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.description?.message}</div>
                </Form.Group>
                <Form.Group className="mt-2">
                  <Form.Label>Instructions</Form.Label>
                  <textarea
                    {...register('instructions')}
                    className={`form-control ${errors.instructions ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.instructions?.message}</div>
                </Form.Group>
                <input type="hidden" {...register('owner')} value={currentUser} />
                <Form.Group className="form-group">
                  <Row className="pt-3">
                    <Col>
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

export default RecipeForm;
