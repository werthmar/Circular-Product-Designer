import React from 'react';
import { Button, Col, Container, List, Nav, Navbar, Alert, Row } from "reactstrap";
import Link from "next/link";
import Image from "next/image";
import { RiArrowGoBackLine } from 'react-icons/ri';

class CustomNavbar extends React.Component {

    constructor() {
        super();
        this.state = {expanded: true};
    }

    backButton() {
        console.log(`back`);
        //todo implement back mechanic
    }

    setExpanded() {
        this.setState({ expanded: !this.state.expanded })
        console.log(this.state.expanded);
    }

    render() {
        return(
            <Col className={ this.state.expanded ? 'CustomNavbar col-6' : 'CustomNavbar' }>
                <Container  fluid>
                    <Row xs="2" noGutters>

                        {/* --- Main Navbar with page buttons ------------------------------------------------ */}
                        <Col className='buttonCol col-4'>
                            
                            {/* Home button */}
                            <Col>
                                <Link href="/">
                                    <Button className='homeButton'>
                                        <Image src="/icons/Menü_Haus.png" width={120} height={65} alt='HomeButton' />
                                    </Button>
                                </Link>
                            </Col>

                            {/* Page Buttons */}
                            <Col>
                                <Button className='navbarButton' />
                            </Col>
                            <Col>
                                <Button className='navbarButton navbarButtonActive' />
                            </Col>
                            <Col>
                                <Button className='navbarButton' />
                            </Col>
                            <Col>
                                <Button className='navbarButton' />
                            </Col>
                            <Col>
                                <Button className='navbarButton' />
                            </Col>


                            {/* Back Buttons */}
                            <Button onClick={ this.backButton } className="backButton">
                                <RiArrowGoBackLine size={45} color="grey" />
                            </Button>

                        </Col>

                        {/* --- Initial description which can be hidden ------------------------------------- */}
                        <Col className='descriptionCol' style={{ display: this.state.expanded ? 'inline-block' : 'none' }}>

                            <h1>
                                LIFECYCLE PHASE INTENSITY
                            </h1>
                            <br />
                            <p>
                                Visualieren, testen und validieren Sie Ihre Ideen dynamisch mit verschiedensten Wireframes und Detailmodellen.
                                <br /><br />
                                Während Sie Ihr Konzept kontinuierlich weiterentwicklen, iterieren Sie konse- quent, machen den Schritt von Low zu High Fidelity absolut nahtlos. quent, machen den Schritt von Low zu.
                            </p>
                            <br/>
                            <Button>GO ON</Button>

                        </Col>

                    </Row>
                </Container>
            </Col>
        );
    }
}

export default CustomNavbar;