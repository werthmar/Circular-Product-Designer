// page for testing out new design
import { Button, Col, Container, List, Nav, Navbar, Alert, Row } from "reactstrap";
import { useState } from "react";
import Image from "next/image";

export default function Playground()
{

    function ChoosableElement() {
        const [descriptionVisible, setDescriptionVisible] = useState(false);

        const handleClick = () => {
            console.log(`CLICK!!`);
            setDescriptionVisible(!descriptionVisible);
        }

        return(

            <Col className="element">
                <Container fluid>
                    <Row>
                        
                        {/* Bar */}
                        <Col className={descriptionVisible ? "col-4" : ""} onClick={() => handleClick()}>

                                    <Col>
                                        <h1>CHOOSE</h1>
                                    </Col>

                                    {/* Checkmark Button */}
                                    <Col className="buttonCol">
                                        <Image src="/checkbox_unmarked.png" width={100} height={65} />
                                    </Col>

                                    {/* Rotatet Title */}
                                    <Col>
                                        <p className="rotated-text">Column1</p>
                                    </Col>
                            
                        </Col>

                        {/* Description which can be opened on click */}
                        <Col className="description" style={{display: descriptionVisible ? 'inline-block' : 'none' }}>

                            <h2>test</h2>
                            <p>
                                Tempor ea veniam anim duis deserunt ut duis. Et culpa aute nulla nisi ipsum nisi nostrud ex anim quis eu ut aute dolore. Mollit nostrud voluptate pariatur ut reprehenderit sit pariatur consectetur consectetur ex veniam ut amet. Veniam duis esse amet in qui aute esse aute laborum culpa qui. Duis qui cupidatat aliqua amet incididunt excepteur cillum.
                                <br/><br/>
                                Quis esse nisi non nisi elit consequat. Et amet proident dolor laborum. Sunt officia adipisicing ad quis qui velit qui ea occaecat nulla ad ut ad officia. Laboris cupidatat aliquip dolore enim fugiat dolore sunt labore exercitation minim occaecat proident duis.
                                <br/><br/>
                                Reprehenderit esse quis eiusmod et commodo aute Lorem. Velit et incididunt excepteur laboris aliquip laboris et. Ea adipisicing eiusmod esse sunt ut ea esse ad sint incididunt incididunt.
                            </p>
            
                        </Col>

                    </Row>
                </Container>    
            </Col>
        );
    }

    return(
        <Container className="playground" fluid>

            <Row xs="8">

                <ChoosableElement />
                <ChoosableElement />
                <ChoosableElement />
                <ChoosableElement />
                <ChoosableElement />
                <ChoosableElement />
                <ChoosableElement />
                <ChoosableElement />

            </Row>

      

        </Container>
    );
}
  