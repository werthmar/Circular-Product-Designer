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
import Image from "next/image";
import { Tooltip } from '@mui/material';

export default function HomePage()
{
  const router = useRouter()

  return (

    <Container className="homePage" fluid>
      <Row>
        
        <Col xs="4" className="colorBackground">
          
        </Col>

        <Col xs="4" className="buttonCol">

        <Row xs={2} style={{margin: 0, height: "40%"}}> 
            <Col>
              <Tooltip arrow title="Roadmap" style={{width: "100%", height: "100%" }}>
              <div>
                <Button className="navigationButton">
                  <div className="backgroundImage roadmap">
                    <Image src={"/icons/Roadmap.png" }
                      width={130}
                      height={130}
                      alt="Roadmap"
                      />
                  </div>
                </Button>
              </div>
              </Tooltip>
            </Col>
    
            <Col>
              <Tooltip arrow title="Library" style={{width: "100%", height: "100%" }}>
                <div>
                  <Button className="navigationButton">
                    <div className="backgroundImage library">
                      <Image src={"/icons/Bibliothek.png" }
                        width={130}
                        height={130}
                        alt="Library"
                        />
                    </div>
                  </Button>
                </div>
              </Tooltip>
            </Col>
          </Row>




          <Tooltip arrow title="New Project" style={{width: "100%", height: "100%" }}>
            <div>
              <Button className="navigationButton" onClick={ () => router.push("/process") } >
                <div className="backgroundImage newProject">
                  <Image src={"/icons/NeuesProjekt.png" }
                    width={130}
                    height={130}
                    alt="New Project"
                    />
                </div>
              </Button>
            </div>
          </Tooltip>  


        </Col>

        <Col xs="4" className="buttonCol">
          <Tooltip arrow title="Project Archive" style={{width: "100%", height: "100%" }}>
            <div>
              <Button className="navigationButton">
                <div className="backgroundImage archive">
                  <Image src={"/icons/Projektarchiv.png" }
                    width={130}
                    height={130}
                    alt="Project Archive"
                    />
                </div>
              </Button>
            </div>
          </Tooltip>  
        </Col>

      </Row>
    </Container>


  )
}