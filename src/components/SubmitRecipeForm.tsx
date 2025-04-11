'use client';

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
  const { register, handleSubmit, formState: { errors } } = useForm<RecipeFormData>();

  const onSubmit: SubmitHandler<RecipeFormData> = async (data) => {
    try {
      console.log(data);
    } catch (error) {
      console.error('Error submitting recipe:', error);
    }
  };

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
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Recipe Title</Form.Label>
                      <input
                        type="text"
                        {...register('name')}
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                      />
                      <div className="invalid-feedback">{errors.name?.message}</div>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Ingredients</Form.Label>
                      <textarea
                        {...register('ingredients')}
                        className={`form-control ${errors.ingredients ? 'is-invalid' : ''}`}
                      />
                      <div className="invalid-feedback">{errors.ingredients?.message}</div>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Instructions</Form.Label>
                      <textarea
                        {...register('instructions')}
                        className={`form-control ${errors.instructions ? 'is-invalid' : ''}`}
                      />
                      <div className="invalid-feedback">{errors.instructions?.message}</div>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Image</Form.Label>
                      <input
                        type="text"
                        {...register('image')}
                        className={`form-control ${errors.image ? 'is-invalid' : ''}`}
                      />
                      <div className="invalid-feedback">{errors.image?.message}</div>
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <textarea
                    {...register('description')}
                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.description?.message}</div>
                </Form.Group>
                <input type="hidden" {...register('owner')} value={currentUser} />
                <Form.Group className="form-group">
                  <Row className="pt-3">
                    <Col>
                      <Button type="submit" variant="primary">
                        Submit
                      </Button>
                    </Col>
                    <Col>
                      <Button type="button" onClick={() => onReset()} variant="warning" className="float-right">
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
