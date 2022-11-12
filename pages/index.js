import Layout from "../components/Layout";
import Header from "../components/Header";
import MainMenuButton from "../components/MainMenuButton";
import {
  Col,
  Container,
  Row, 
} from "reactstrap";

const Index = () => {
  return (
    <div className="wrapper">

      <Container className="buttonContainer">
        <Row xxl="4" xl="2" xs="1">
          <Col align="center">            
            <MainMenuButton text="New Project" icon="1" />
          </Col>
          <Col align="center">
            <MainMenuButton text="Resume Project" icon="2" />
          </Col>
          <Col align="center">
            <MainMenuButton text="Library" icon="3" />
          </Col>
          <Col align="center">
            <MainMenuButton text="Settings" icon="4" />
          </Col>
        </Row>
      </Container>
    
    </div>
  )
}

export default Index;