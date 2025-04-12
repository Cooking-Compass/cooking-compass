import { Col, Container, Row } from 'react-bootstrap';
import { ChatDotsFill, EggFill, PeopleFill } from 'react-bootstrap-icons';

const LandingPageMiddleContents = () => (
  <Container id="landing-page" fluid className="py-5">
    <Container non-fluid>
      <Row id="middlerow" className="align-middle text-center align-items-center">
        <Col xs={4}>
          <EggFill size={150} />
          <br />
          <br />
          <h2>
            <strong>
              Tasty Food
            </strong>
          </h2>
          <strong>
            Enjoy easy food recipes all made with toaster ovens.
          </strong>
        </Col>
        <Col xs={4}>
          <PeopleFill size={150} />
          <br />
          <br />
          <h2>
            <strong>
              Recipes
            </strong>
          </h2>
          <strong>
            View recipes made by our community.
          </strong>
        </Col>
        <Col xs={4}>
          <ChatDotsFill size={150} />
          <br />
          <br />
          <h2>
            <strong>
              Community
            </strong>
          </h2>
          <strong>
            Be able to submit your own recipes and share them with the world.
          </strong>
        </Col>
      </Row>
    </Container>
  </Container>
);

export default LandingPageMiddleContents;
