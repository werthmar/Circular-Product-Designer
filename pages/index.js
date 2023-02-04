import Layout from "../components/Layout";
import MainMenuButton from "../components/MainMenuButton";
import {
  Col,
  Container,
  Row, 
  Alert,
} from "reactstrap";
import HomeButton from "../components/HomeButton";

export default function IndexPage() {
  return (
    <Container className="indexPage">
      <Col className="homeButtonCol" align="center">
        <HomeButton size="big" />
      </Col>
      <Col>
        <Row xxl="4" md="2" xs="1">
          <Col align="center">            
            <MainMenuButton text="New Project" icon="1" link="/process" />
          </Col>
          <Col align="center">
            <MainMenuButton text="Resume Project" icon="2" link="/process" />
          </Col>
          <Col align="center">
            <MainMenuButton text="Library" icon="3" link="/process" />
          </Col>
          <Col align="center">
            <MainMenuButton text="Settings" icon="4" link="/process" />
          </Col>
        </Row>
      </Col>

      {/* Information Banner for cookie useage */}
      <Alert className="cookieWarning">
        This website uses essential cookies to ensure a seamless and secure experience for our users. These cookies are necessary for
        the basic functionality of the website and cannot be disabled. By using this website, you consent to the use of these
        essential cookies.
      </Alert>

    </Container>
  )
}

IndexPage.getLayout = function getLayout(page) {
  return (
      <Layout pageTitle="Improvement Advisor Home">{page}</Layout>
  )
}