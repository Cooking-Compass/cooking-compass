import { Container, Row } from 'react-bootstrap';

const AboutPage = () => (
  <Container id="aboutpage" fluid>
    <Container className="py-5">
      <Row className="justify-content-center">
        <h1 id="titletext">
          <strong>Search Recipes</strong>
        </h1>
      </Row>
      <Row className="justify-content-center text-center">
        <h1 id="titletext">
          <strong>Feel Inspired</strong>
        </h1>
      </Row>
      <Row className="justify-content-end">
        <h1 id="titletext">
          <strong>Submit Your Own</strong>
        </h1>
      </Row>
      <Row className="justify-content-start align-items-end pt-5">
        <h5>About our Website</h5>
        <hr />
      </Row>
      <Row id="aboutrow" className="justify-content-start">
        <h2>
          Cooking Compass is designed to hold every recipe that can be made simply with a toaster oven.
          Search for recipes, view them, and even submit your own recipes to share with the world.
        </h2>
      </Row>
    </Container>
  </Container>
);

export default AboutPage;
