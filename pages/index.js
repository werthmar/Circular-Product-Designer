import Layout from "../components/Layout";
import MainMenuButton from "../components/MainMenuButton";
import {
  Col,
  Container,
  Row, 
  Alert,
  Button,
} from "reactstrap";
import { useRouter } from 'next/router'

export default function IndexPage()
{
  const router = useRouter()

  return (

    <Container className="indexPage" fluid>
      <Row>
        
        <Col xs="3" className="buttonCol">
          <Row xs={1} style={{margin: 0}}> 
            <Col style={{paddingBottom: "10px"}}>
              <Button className="navigationButton roadmap">
                Roadmap
              </Button>
            </Col>
    
            <Col style={{paddingTop: "10px"}}>
              <Button className="navigationButton">
                <div className="whiteBlock">
                  test
                </div>
              </Button>
            </Col>
          </Row>
        </Col>

        <Col xs="6" className="buttonCol">
          <Button className="navigationButton" onClick={ () => router.push("/process") } >
            <div className="whiteBlock">
              New Project
            </div>
          </Button>
        </Col>

        <Col xs="3" className="buttonCol">
          <Button className="navigationButton">
          test
          </Button>
        </Col>

      </Row>
    </Container>


  )
}