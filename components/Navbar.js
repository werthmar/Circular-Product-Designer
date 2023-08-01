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
            nextPageButtonActive: props.nextPageButtonActive
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

    // Color of go on button and navigation buttons changes based on current page
    decideButtonColor()
    {
        switch( this.props.pageOrder[ this.state.pageIndex - 1 ] )
        {
            case 'CBM':
                return 'rgb(171, 118, 92)';
            case 'LCP':
                return 'rgb(237, 191, 98)';
            case 'ED':
                return 'rgb(89, 99, 80)';
            default:
                return 'grey';
        }
    }

    decideDescription()
    {
        if (this.state.title == 'Circular Design Principles') {
            return <p>The Circular Design Principles (CDP) provide specific guidelines for implementing circular measures at the constructive level for optimization. Concrete solution proposals for the design are included in each of the CDPs, which can be supplemented with internal knowledge and specifications. The CDPs are grouped into different areas of action.'</p>
        } else {
            return <p>
                Visualieren, testen und validieren Sie Ihre Ideen dynamisch mit verschiedensten Wireframes und Detailmodellen.
                <br /><br />
                Während Sie Ihr Konzept kontinuierlich weiterentwicklen, iterieren Sie konse- quent, machen den Schritt von Low zu High Fidelity absolut nahtlos. quent, machen den Schritt von Low zu.
            </p>
            
        }
    }

    // Dynamicly create the page navigation buttons based on the current index/page the user is on
    getPageButtons()
    {
        return(
            this.state.pageButtons.map(( page, index ) => (
                <Col>
                    <Button className='navbarButton'
                    style={
                        // Set the current page active
                        index == this.state.pageIndex ? { backgroundColor: this.decideButtonColor() } : {}   
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
            <Col className='CustomNavbar col-5' style={{ display: expanded ? 'inline-block' : 'none' }}>
                <Container  fluid>
                    <Row xs="2">

                        {/* --- Main Navbar with page buttons ------------------------------------------------ */}
                        <Col className={ expanded ? 'buttonCol col-3' : 'buttonCol col-12' }>
                                    
                                    {/* Home button */}
                                    <Col>
                                        <Tooltip arrow title="Home">
                                            <Link href="/">
                                                <Button className='homeButton'>
                                                    <Image src="/icons/Menü_Haus.png" width={65} height={55} alt='HomeButton' />
                                                </Button>
                                            </Link>
                                        </Tooltip>
                                    </Col>

                                    {/* Page Buttons */}
                                    <Col>
                                        { this.getPageButtons() }
                                    </Col>

                                    {/* Back Buttons */}
                                    <Col>
                                        <Tooltip arrow title="Back">
                                            <div>
                                                <Button onClick={ () => this.props.back() } className="backButton">
                                                    <RiArrowGoBackLine size={45} color="grey" />
                                                </Button>
                                            </div>
                                        </Tooltip>
                                    </Col>


                        </Col>

                        {/* --- Initial description which can be hidden ------------------------------------- */}
                        <Col className='descriptionCol col-9'>
                            <Container fluid>
                                <Row xs={1}>

                                    <Col style={{ marginBottom: 30 }}>
                                        <h1>
                                            { title != undefined ? title.toUpperCase() : "Loading ..." }
                                        </h1>
                                    </Col>

                                    <Col style={{ marginBottom: 50 }}>
                                            { this.decideDescription() }
                                    </Col>

                                    <Col>
                                        <Tooltip arrow title="Please select at least 1 item from the list in order to proceed.">
                                            <div>
                                                {/* The callback is the nextPage function from the advisor page which is passed into this class  */}
                                                <Button
                                                    className={ this.state.nextPageButtonActive ? "" : "disabled" }
                                                    style={{ borderColor: this.decideButtonColor() }}
                                                    onClick={ () => this.props.nextPage() }>
                                                    { title == 'Circular Design Principles' ? 'CHOOSE' : 'GO ON' }
                                                </Button>
                                            </div>
                                        </Tooltip>
                                    </Col>

                                </Row>
                            </Container>
                        </Col>

                    </Row>
                </Container>
            </Col>
        );
    }
}
