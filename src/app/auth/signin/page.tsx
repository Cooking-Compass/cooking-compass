'use client';

import { signIn } from 'next-auth/react';
import { Jost } from 'next/font/google';
import React from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import '../../globals.css';

// import font
const jost = Jost({ subsets: ['latin'] });

/** The sign in page. */
const SignIn = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    const email = target.email.value;
    const password = target.password.value;
    const result = await signIn('credentials', {
      callbackUrl: '/',
      email,
      password,
    });

    if (result?.error) {
      console.error('Sign in failed: ', result.error);
    }
  };

  return (
    <main className={`${jost.className} signin d-flex flex-column min-vh-100`}>
      <div className="flex-grow-1">
        <Container>
          <Row className="justify-content-center" height="500px">
            <Col xs={5}>
              <br />
              <h1 className="text-center">Sign In</h1>
              <Card>
                <Card.Body>
                  <Form method="post" onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Email</Form.Label>
                      <input name="email" type="text" className="form-control" />
                    </Form.Group>
                    <Form.Group>
                      <br />
                      <Form.Label>Password</Form.Label>
                      <input name="password" type="password" className="form-control" />
                    </Form.Group>
                    <br />
                    <Button
                      style={{
                        backgroundColor: 'var(--rust)',
                        borderColor: 'var(--rust)',
                      }}
                      type="submit"
                      className="mt-3"
                    >
                      Sign in
                    </Button>
                  </Form>
                </Card.Body>
                <Card.Footer>
                  Don&apos;t have an account?
                  {' '}
                  <a href="/auth/signup">Sign up!</a>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </main>
  );
};

export default SignIn;
