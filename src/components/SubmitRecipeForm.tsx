'use client';

import React, { useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';

interface RecipeFormData {
  name: string;
  ingredients: string;
  instructions: string;
  image: string;
  description: string;
  owner: string;
}

const SubmitRecipeForm: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

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
      owner: 'defaultUser', // replace with actual user data (if necessary)
    },
  });

  const onSubmit: SubmitHandler<RecipeFormData> = async (data) => {
    try {
      const response = await fetch('/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit recipe');
      }

      const result = await response.json();
      console.log('Recipe submitted successfully:', result);
      setSuccessMessage('Recipe submitted successfully!');
      setErrorMessage(null); // clear any previous error messages
      reset(); // reset the form after successful submission
    } catch (error) {
      console.error('Error submitting recipe:', error);
      setErrorMessage('Failed to submit the recipe. Please try again. ');
      setSuccessMessage(null); // clear any previous success messages
    }
  };

  return (
    <Container className="py-3" id="submitform">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center">
            <h2>Submit Your Recipe</h2>
          </Col>
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
          {successMessage && (
            <div className="alert alert-success" role="alert">
              {successMessage}
            </div>
          )}
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
                      <Form.Label>Image URL</Form.Label>
                      <input
                        type="text"
                        {...register('image', { required: 'Image URL is required' })}
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
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Instructions</Form.Label>
                      <textarea
                        {...register('instructions', { required: 'Instructions are required' })}
                        className={`form-control ${errors.instructions ? 'is-invalid' : ''}`}
                      />
                      <div className="invalid-feedback">{errors.instructions?.message}</div>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Hidden Owner Field */}
                <input type="hidden" {...register('owner')} value="defaultUser" />

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
