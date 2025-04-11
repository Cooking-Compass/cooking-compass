import { Container, Row, Col } from 'react-bootstrap';

const LandingPageBottomMenu = () => (
  <footer id="menucolor">
    <Container>
      <Row className="justify-content-center text-center mb-4">
        <Col className="mt-4">
          <div>
            <h3>Cooking Compass</h3>
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
