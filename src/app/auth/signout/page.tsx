'use client';

import { signOut } from 'next-auth/react';
import { Jost } from 'next/font/google';
import { Button, Col, Row } from 'react-bootstrap';

// import font
const jost = Jost({ subsets: ['latin'] });

/** After the user clicks the "SignOut" link in the NavBar, log them out and display this page. */
const SignOut = () => (
  <Col id="signout-page" className={`${jost.className} text-center py-3`}>
    <h2>Do you want to sign out?</h2>
    <br />
    <Row>
      <Col xs={4} />
      <Col>
        <Button variant="danger" onClick={() => signOut({ callbackUrl: '/', redirect: true })}>
          Sign Out
        </Button>
      </Col>
      <Col>
        <Button variant="secondary" href="/">
          Cancel
        </Button>
      </Col>
      <Col xs={4} />
    </Row>
  </Col>
);

export default SignOut;
