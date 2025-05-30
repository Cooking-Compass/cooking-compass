'use client';

import { Jost } from 'next/font/google';
import React from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';

// import font
const jost = Jost({ subsets: ['latin'] });

interface RecipeFormData {
  name: string;
  ingredients: string;
  instructions: string;
  image: string;
  description: string;
  owner: string;
}

const SubmitRecipeForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RecipeFormData>({
    defaultValues: {
      name: '',
      ingredients: '',
      instructions: '',
      image: '',
      description: '',
      owner: 'defaultUser',
    },
  });

  const onSubmit: SubmitHandler<RecipeFormData> = async (data) => {
    try {
      console.log('Form submitted:', data);
      // eslint-disable-next-line no-alert
      alert('Recipe submitted successfully!');
      reset(); // Reset the form after successful submission
    } catch (error) {
      console.error('Error submitting recipe:', error);
      // eslint-disable-next-line no-alert
      alert('Failed to submit the recipe. Please try again.');
    }
  };

  const onReset = () => {
    reset(); // Reset the form to its initial state
  };

  return (
    <Container id="submitform" className={`${jost.className} py-3`}>
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center">
            <h2>Submit Your Recipe</h2>
          </Col>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                {/* Recipe Title */}
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Recipe Title</Form.Label>
                      <input
                        type="text"
                        {...register('name', { required: 'Recipe title is required' })}
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                      />
                      <div className="invalid-feedback">{errors.name?.message}</div>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Image */}
                <Row>
                  <Col>
                    <Form.Group>
                      <br />
                      <Form.Label>Image</Form.Label>
                      <input
                        type="text"
                        {...register('image', { required: 'Image is required' })}
                        className={`form-control ${errors.image ? 'is-invalid' : ''}`}
                      />
                      <div className="invalid-feedback">{errors.image?.message}</div>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Description */}
                <Row>
                  <Col>
                    <Form.Group>
                      <br />
                      <Form.Label>Description</Form.Label>
                      <textarea
                        {...register('description', { required: 'Description is required' })}
                        className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                      />
                      <div className="invalid-feedback">{errors.description?.message}</div>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Ingredients */}
                <Row>
                  <Col>
                    <Form.Group>
                      <br />
                      <Form.Label>Ingredients</Form.Label>
                      <textarea
                        {...register('ingredients', { required: 'Ingredients are required' })}
                        className={`form-control ${errors.ingredients ? 'is-invalid' : ''}`}
                      />
                      <div className="invalid-feedback">{errors.ingredients?.message}</div>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Instructions */}
                <Form.Group>
                  <br />
                  <Form.Label>Instructions</Form.Label>
                  <textarea
                    {...register('instructions', { required: 'Instructions are required' })}
                    className={`form-control ${errors.instructions ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.instructions?.message}</div>
                </Form.Group>

                {/* Hidden Owner Field */}
                <input type="hidden" {...register('owner')} value="defaultUser" />

                {/* Submit and Reset Buttons */}
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
                      <Button type="button" onClick={onReset} variant="warning" className="float-right">
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
