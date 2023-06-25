import React from 'react';
import { useState, useEffect } from 'react'
import { Button, Col, Container, List, Nav, Navbar, Alert, Row } from "reactstrap";
import Link from "next/link";
import Image from "next/image";
import { RiArrowGoBackLine } from 'react-icons/ri';
import { BsArrowBarLeft, BsArrowBarRight } from 'react-icons/bs';
import { Tooltip } from '@mui/material';

export default class CustomNavbar extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            expanded: true,
            // contains the page the button will point too, buttons are generatet based on this array
            pageButtons: [
                'start',
                props.pageOrder[0],
                props.pageOrder[1],
                props.pageOrder[2],
                props.pageOrder[3],
            ],
            pageIndex: props.pageIndex,
            title: props.title,
            nextPageButtonActive: false
        };
    }

    setExpanded() {
        this.setState({ expanded: !this.state.expanded });
        console.log(this.state.expanded);
    }

    setPageIndex( index ) {
        this.setState({ pageIndex: index });
    }

    setNextPageButtonActive( bool ) {
        this.setState({ nextPageButtonActive: bool });
    }

    // Dynamicly create the page navigation buttons based on the current index/page the user is on
    getPageButtons()
    {
        return(
            this.state.pageButtons.map(( page, index ) => (
                <Col>
                    <Button className={
                        // Set the current page active
                        index == this.state.pageIndex ? 'navbarButton navbarButtonActive' : 'navbarButton'  
                    }
                    disabled={
                        //  Disable all pages after the current page 
                        index > this.state.pageIndex ? true : false
                    }
                    onClick={ () => this.props.goToPage( page ) }
                    />
                </Col>
            ))
        );
    }

    render()
    {
        const { expanded, title } = this.state;

        return(
            <Col className={ expanded ? 'CustomNavbar col-6' : 'CustomNavbar' }>
                <Container  fluid>
                    <Row xs="2">

                        {/* --- Main Navbar with page buttons ------------------------------------------------ */}
                        <Col className='buttonCol col-4'>
                                    
                                    {/* Expand navbar button only visible when not expanded */}
                                    <Col className='expandButton' style={{ display: expanded ? 'none' : 'inline-block' }}>
                                        <BsArrowBarRight size={45} color='grey' onClick={ () => this.setExpanded() } />
                                    </Col>

                                    {/* Home button */}
                                    <Col>
                                        <Tooltip arrow title="home">
                                            <Link href="/">
                                                <Button className='homeButton'>
                                                    <Image src="/icons/Menü_Haus.png" width={120} height={65} alt='HomeButton' />
                                                </Button>
                                            </Link>
                                        </Tooltip>
                                    </Col>

                                    {/* Page Buttons */}
                                    <Col>
                                        { this.getPageButtons() }
                                    </Col>

                                    {/* Back Buttons */}
                                    <Tooltip arrow title="back">
                                        <div>
                                            <Button onClick={ () => this.props.back() } className="backButton">
                                                <RiArrowGoBackLine size={45} color="grey" />
                                            </Button>
                                        </div>
                                    </Tooltip>


                        </Col>

                        {/* --- Initial description which can be hidden ------------------------------------- */}
                        <Col className='descriptionCol' style={{ display: expanded ? 'inline-block' : 'none' }}>

                            <Container fluid>
                                <Row>
                                    <Col xs="10" style={{ marginBottom: 30 }}>
                                        <h1>
                                            { title != undefined ? title.toUpperCase() : "Loading ..." }
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
                                        <Tooltip arrow title="Please select at least 1 item from the list in order to proceed.">
                                            <div>
                                                {/* The callback is the nextPage function from the advisor page which is passed into this class  */}
                                                <Button
                                                    className={ this.state.nextPageButtonActive ? "" : "disabled" }
                                                    onClick={ () => this.props.nextPage() }>
                                                    GO ON
                                                </Button>
                                            </div>
                                        </Tooltip>
                                    </Col>


                        </Col>

                    </Row>
                </Container>
            </Col>
        );
    }
}
