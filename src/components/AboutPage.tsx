import { Col, Container, Row } from 'react-bootstrap';
import { Compass } from 'react-bootstrap-icons';

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
    <Container>
      <Row id="aboutrow">
        <Col md={6} className="text-center">
          <Compass size={250} />
        </Col>
        <Col md={6} className="text-end">
          <h1 className="pb-3">
            <strong>Our Vision</strong>
          </h1>
          <hr />
          <p>
            The goal of this site is to help improve the nutritional content and variety of foods eaten
            by students by providing recipes from their fellow colleagues. Being able to easily access and scroll
            through these recipes from other UH students, they can also learn and create new, and maybe fun, foods
            to eat. Of course, admins will monitor the site to make sure there are no absurd “recipes” to keep it
            authentic.
          </p>
        </Col>
      </Row>
    </Container>
    <Container>
      <Row id="aboutrow" className="mt-5">
        <Col md={12}>
          <h1 className="text-center">
            <strong>Frequently Asked Questions</strong>
          </h1>
          <hr />
          <ul>
            <li>
              <strong>I have my own recipe to submit, how do I do that?</strong>
              <ul>
                <li>
                  To submit your own recipe, you must first create an account. Once you have an account, you can
                  submit your recipe by clicking the &apos;Add Recipe&apos; button.
                </li>
              </ul>
            </li>
            <br />
            <li>
              <strong>I found a really offensive recipe!</strong>
              <ul>
                <li>
                  Click the report button found at the bottom of the recipe. This will send the report to our admins.
                </li>
              </ul>
            </li>
            <br />
            <li>
              <strong>bruh we need more questions</strong>
              <ul>
                <li>
                  add more later
                </li>
              </ul>
            </li>
            <br />
          </ul>
        </Col>
      </Row>
    </Container>
  </Container>
);

export default AboutPage;
