'use client';

import { Jost } from 'next/font/google';
import { Col, Container, Image, Navbar, Row } from 'react-bootstrap';

// import font
const jost = Jost({ subsets: ['latin'] });

const LandingPageBottomMenu = () => (
  <footer className={jost.className} id="menucolor">
    <Container>
      <Row className="justify-content-center text-center mb-4">
        <Col className="mt-4">
          <div>
            <Navbar.Brand href="/">
              <Image src="/logo-white.png" alt="Logo" width={300} id="menucolor" />
            </Navbar.Brand>
          </div>
          <hr />
          <h6>Made by our team of developers: Jasmine Quach, Binh Tran, Derrick Quiamas, Martin Adra</h6>
          <h6>ICS 314: Software Engineering at University of Hawaii at Manoa</h6>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default LandingPageBottomMenu;
