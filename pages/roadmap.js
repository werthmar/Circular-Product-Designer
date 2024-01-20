import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    Col,
    Container,
    Row, 
    Alert,
    Button,
  } from "reactstrap";
import { Tooltip } from '@mui/material';
import Watermark from "../components/watermark";

export default function Roadmap() {

    return(
        <Container fluid className="Roadmap">
            <Row>

                {/** Left Side */}
                <Col xs={4} className="navbarCol">

                    <Tooltip arrow title="Home">
                        <Link href="/home">
                            <Button className='homeButton'>
                                <Image src="/icons/Menü_Haus.png" width={65} height={55} alt='HomeButton' />
                            </Button>
                        </Link>
                    </Tooltip>

                    <h1>
                        DESIGN FOR CIRCULARITY ROADMAP
                    </h1>

                    <p>
                        The development of circular and resource-efficient products is an important tool to contribute to sustainable development. This requires that product development and design processes automatically evaluate circular economy measures in terms of costeffectiveness, sustainability and resource efficiency. For this purpose, a Design for Circularity framework has been developed.
                        Entry is possible either starting from a previous product or from the strategic level of Circular Business Models. Both ways filter suitable Ecodesign Principles, followed by the assignment of specific Circular Design Principles on an operational level. Finally, technical design options serve as solution proposals, which can be specifically expanded.
                    </p>


                </Col>

                {/** Right Side */}
                <Col className="roadmapCol">
                    <div className="roadmapImage" />
                </Col>

                <div style={{ position: "fixed", bottom: "0px", left:"10px", width: "250px" }}>
                    <Watermark />
                </div>

            </Row>
        </Container>
    );
}