'use client';

import { useSession } from 'next-auth/react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { redirect } from 'next/navigation';
import LoadingSpinner from '@/components/LoadingSpinner';
import { UserReportSchema } from '@/lib/validationSchemas';
import { addReport } from '@/lib/dbActions';

// eslint-disable-next-line max-len
const onSubmit = async (data: { owner: string; yourname: string; criminal: string; description: string; reason: string }) => {
  // console.log(`onSubmit data: ${JSON.stringify(data, null, 2)}`);
  await addReport(data);
  swal('Success', 'Your item has been added', 'success', {
    timer: 2000,
  });
};

const ReportForm: React.FC = () => {
  const { data: session, status } = useSession();
  const currentUser = session?.user?.email || '';
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(UserReportSchema),
  });
  if (status === 'loading') {
    return <LoadingSpinner />;
  }
  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }

  return (
    <Container id="reportpage" fluid className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center">
            <h2>Report User</h2>
          </Col>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mt-2">
                  <Form.Label>Your name</Form.Label>
                  <input
                    type="text"
                    {...register('yourname')}
                    className={`form-control ${errors.yourname ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.yourname?.message}</div>
                </Form.Group>
                <Form.Group className="mt-2">
                  <Form.Label>Who are you reporting?</Form.Label>
                  <input
                    type="text"
                    {...register('criminal')}
                    className={`form-control ${errors.criminal ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.criminal?.message}</div>
                </Form.Group>
                <Form.Group className="mt-2">
                  <Form.Label>Reason</Form.Label>
                  <select {...register('reason')} className={`form-control ${errors.reason ? 'is-invalid' : ''}`}>
                    <option value="Innapropriate">Innapropriate</option>
                    <option value="Disgusting">Disgusting</option>
                    <option value="Expensive">Expensive</option>
                  </select>
                  <div className="invalid-feedback">{errors.reason?.message}</div>
                </Form.Group>
                <Form.Group className="mt-2">
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

export default ReportForm;
