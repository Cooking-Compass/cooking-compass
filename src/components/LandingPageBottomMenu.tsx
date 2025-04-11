import { Container, Row, Col } from 'react-bootstrap';

const LandingPageBottomMenu = () => (
  <footer id="menucolor">
    <Container>
      <Row>
        <Col className="mt-4">
          <div>NAVIGATION</div>
          <hr />
          About us
          <br />
          Contact
        </Col>
      </Row>
    </Container>
  </footer>
);

export default LandingPageBottomMenu;
