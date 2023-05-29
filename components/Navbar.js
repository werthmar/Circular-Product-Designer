import React from 'react';
import { useState, useEffect } from 'react'
import { Button, Col, Container, List, Nav, Navbar, Alert, Row } from "reactstrap";
import Link from "next/link";
import Image from "next/image";
import { RiArrowGoBackLine } from 'react-icons/ri';
import { BsArrowBarLeft, BsArrowBarRight } from 'react-icons/bs';

class CustomNavbar extends React.Component
{
    constructor()
    {
        super();
        this.state = {
            expanded: true,
            // Just placeholder for the map to work, the array length is all that counts
            pageButtons: [
                'navbarButton',
                'navbarButton',
                'navbarButton',
                'navbarButton',
                'navbarButton',
            ],
            pageIndex: 1
        };
    }

    backButton() {
        console.log(`back`);
        //todo implement back mechanic
    }

    setExpanded() {
        this.setState({ expanded: !this.state.expanded });
        console.log(this.state.expanded);
    }

    setPageIndex( index ) {
        this.setState({ pageIndex: index });
    }

    // Dynamicly create the page navigation buttons based on the current index/page the user is on
    getPageButtons()
    {
        return(
            this.state.pageButtons.map(( item, index ) => (
                <Col>
                    <Button className={
                        // Set the current page active
                        index == this.state.pageIndex ? 'navbarButton navbarButtonActive' : 'navbarButton'  
                    }
                    disabled={
                        //  Disable all pages after the current page 
                        index > this.state.pageIndex ? true : false
                    }
                    />
                </Col>
            ))
        );
    }

    render() {
        return(
            <Col className={ this.state.expanded ? 'CustomNavbar col-6' : 'CustomNavbar' }>
                <Container  fluid>
                    <Row xs="2" noGutters>

                        {/* --- Main Navbar with page buttons ------------------------------------------------ */}
                        <Col className='buttonCol col-4'>
                                    
                                    {/* Expand navbar button only visible when not expanded */}
                                    <Col className='expandButton' style={{ display: this.state.expanded ? 'none' : 'inline-block' }}>
                                        <BsArrowBarRight size={45} color='grey' onClick={ () => this.setExpanded() } />
                                    </Col>

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
                                        { this.getPageButtons() }
                                    </Col>

                                    {/* Back Buttons */}
                                    <Button onClick={ this.backButton } className="backButton">
                                        <RiArrowGoBackLine size={45} color="grey" />
                                    </Button>


                        </Col>

                        {/* --- Initial description which can be hidden ------------------------------------- */}
                        <Col className='descriptionCol' style={{ display: this.state.expanded ? 'inline-block' : 'none' }}>

                            <Container fluid>
                                <Row>
                                    <Col xs="10" style={{ marginBottom: 30 }}>
                                        <h1>
                                            LIFECYCLE PHASE INTENSITY
                                        </h1>
                                    </Col>
                                    <Col xs="2">
                                        <BsArrowBarLeft size={50} textAnchor='test' onClick={ () => this.setExpanded() }/>
                                    </Col>
                                </Row>
                            </Container>

                                    <Col xs="12" style={{ marginBottom: 50 }}>
                                        <p>
                                            Visualieren, testen und validieren Sie Ihre Ideen dynamisch mit verschiedensten Wireframes und Detailmodellen.
                                            <br /><br />
                                            Während Sie Ihr Konzept kontinuierlich weiterentwicklen, iterieren Sie konse- quent, machen den Schritt von Low zu High Fidelity absolut nahtlos. quent, machen den Schritt von Low zu.
                                        </p>
                                    </Col>

                                    <Col xs="12">
                                        <Button>GO ON</Button>
                                    </Col>


                        </Col>

                    </Row>
                </Container>
            </Col>
        );
    }
}

export default CustomNavbar;