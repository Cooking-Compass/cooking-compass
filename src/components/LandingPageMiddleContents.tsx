import { Jost } from 'next/font/google';
import Link from 'next/link';
import { Button, Col, Container, Row } from 'react-bootstrap';

// import font
const jost = Jost({ subsets: ['latin'] });

const LandingPageMiddleContents = () => (
  <Container id="landing-page" fluid className={`${jost.className} py-1`}>
    <Container non-fluid>
      <Row id="middlerow" className="text-center align-items-center">
        <Row />
        <Row>
          <h2 style={{ fontSize: '5rem', color: 'var(--rust)', margin: 0 }}>Cook. Share. Discover.</h2>
          <h1 style={{ margin: 0 }}>Recipes by students for students.</h1>
        </Row>
        <Row className="d-flex justify-content-center">
          <Col xs="2">
            <Link href="/explore" passHref>
              <Button
                variant="primary"
                className="mt-3"
                style={{
                  backgroundColor: 'var(--rust)',
                  borderColor: 'var(--rust)',
                  fontSize: '1.5rem',
                  padding: '0.5rem 1rem',
                }}
              >
                Explore
              </Button>
            </Link>
          </Col>
          <Col xs="2">
            <Link href="/addrecipe" passHref>
              <Button
                variant="primary"
                className="mt-3"
                style={{
                  backgroundColor: 'var(--rust)',
                  borderColor: 'var(--rust)',
                  fontSize: '1.5rem',
                  padding: '0.5rem 1rem',
                }}
              >
                Submit
              </Button>
            </Link>
          </Col>
          <Col xs="2">
            <Link href="/about" passHref>
              <Button
                variant="primary"
                className="mt-3"
                style={{
                  backgroundColor: 'var(--rust)',
                  borderColor: 'var(--rust)',
                  fontSize: '1.5rem',
                  padding: '0.5rem 1rem',
                }}
              >
                About Us
              </Button>
            </Link>
          </Col>
        </Row>

        {/* <Col xs={4}>
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
        </Col> */}
      </Row>
    </Container>
  </Container>
);

export default LandingPageMiddleContents;
