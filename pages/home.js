import React, { useState } from "react";
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

  const [hover, setHover] = useState(false);
  const [roadmap, setRoadmap] = useState(false);
  const [library, setLibrary] = useState(false);
  const [project, setProject] = useState(false);
  const [archive, setArchive] = useState(false);

  const onHoverRoadmap = () => {
    //setHover(true);
    setRoadmap(true);
  };
  const onLeaveRoadmap = () => {
    setRoadmap(false);
  };

  const onHoverLibrary = () => {
    //setHover(true);
    setLibrary(true);
  };
  const onLeaveLibrary = () => {
    setLibrary(false);
  };
  
  const onHoverProject = () => {
    //setHover(true);
    setProject(true);
  };
  const onLeaveProject = () => {
    setProject(false);
  };

  const onHoverArchive = () => {
    //setHover(true);
    setArchive(true);
  };
  const onLeaveArchive = () => {
    setArchive(false);
  };

  return (

    <Container className="homePage" fluid>
      <Row>
        
        <Col xs="4" className="colorBackground">
          <h1>RETHINK YOUR IDEAS</h1>
          <p>a tool developed from a scientific work of the Pforzheim University of Applied Sciences, Institute for Industrial Ecology.</p>
        </Col>

        <Col xs="4" className="buttonCol">

          <Row xs={2} style={{margin: 0, height: "40%"}}> 
              
              { /** Library Button */}
              <Col>
                  <div onMouseEnter={onHoverLibrary} onMouseLeave={onLeaveLibrary} style={{ height: "100%" }}>
                    <Button className="navigationButton">
                      <div className={ library == true ? "" : "backgroundImage library" } >
                      {
                        library == true ?
                        <p>LIBRARY</p> :
                        <Image src={"/icons/Bibliothek.png" }
                          width={130}
                          height={130}
                          alt="Library"
                          />
                      }
                      </div>
                    </Button>
                  </div>
              </Col>

              { /** Roadmap Button */}
              <Col>
                <div onMouseEnter={onHoverRoadmap} onMouseLeave={onLeaveRoadmap} style={{ height: "100%" }} >
                  <Button className="navigationButton" onClick={ () => router.push("/roadmap") }>
                    <div className={ roadmap == true ? "" : "backgroundImage roadmap" } >
                      {
                        roadmap == true ?
                        <p>ROADMAP</p> :
                        <Image src={"/icons/Roadmap.png" }
                          width={130}
                          height={130}
                          alt="Roadmap"
                          />
                      }
                    </div>
                  </Button>
                </div>
              </Col>

            </Row>

            { /** New Project Button */}
            <div onMouseEnter={onHoverProject} onMouseLeave={onLeaveProject} style={{width: "100%", height: "60%" }}>
              <Button className="navigationButton" onClick={ () => router.push("/process") } >
                <div className={ project == true ? "" : "backgroundImage newProject" } >
                {
                  project == true ?
                  <p>NEW PROJECT</p> :
                  <Image src={"/icons/NeuesProjekt.png" }
                    width={130}
                    height={130}
                    alt="New Project"
                    />
                }
                </div>
              </Button>
            </div>


        </Col>

        { /** Archive Button */}
        <Col xs="4" className="buttonCol">
            <div onMouseEnter={onHoverArchive} onMouseLeave={onLeaveArchive} style={{width: "100%", height: "100%" }}>
              <Button className="navigationButton">
                <div className={ archive == true ? "" : "backgroundImage archive" } >
                {
                  archive == true ?
                  <p>PROJECT ARCHIVE</p> :
                  <Image src={"/icons/Projektarchiv.png" }
                    width={110}
                    height={120}
                    alt="Project Archive"
                    />
                }
                </div>
              </Button>
            </div>
        </Col>

      </Row>
    </Container>


  )
}