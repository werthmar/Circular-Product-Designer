import Layout from "../components/Layout";
import MainMenuButton from "../components/MainMenuButton";
import {
  Col,
  Container,
  Row, 
} from "reactstrap";
import HomeButton from "../components/HomeButton";

export default function IndexPage() {
  return (
    <Container className="buttonContainer">
      <Col className="homeButtonCol" align="center">
        <HomeButton size="big" />
      </Col>
      <Col>
        <Row xxl="4" xl="2" xs="1">
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
    </Container>
  )
}

IndexPage.getLayout = function getLayout(page) {
  return (
      <Layout pageTitle="Improvement Advisor Home">{page}</Layout>
  )
}