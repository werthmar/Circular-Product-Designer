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
            expandedButtons: true, //if you only want to hide the description but keep the buttons
            // contains the page the button will point too, buttons are generatet based on this array
            pageButtons: [
                'start',
                props.pageOrder[0],
                props.pageOrder[1],
                props.pageOrder[2],
                props.pageOrder[3],
                props.pageOrder[4],
            ],
            pageIndex: props.pageIndex,
            title: props.title,
            nextPageButtonActive: props.nextPageButtonActive,
            mobileLayout: props.mobileLayout,
        };
    }

    setExpanded() {
        this.setState({ expanded: !this.state.expanded });
        console.log(this.state.expanded);
    }
    
    setExpandedButtons() {
        this.setState({ expandedButtons: !this.state.expandedButtons });
    }

    setPageIndex( index ) {
        this.setState({ pageIndex: index });
    }

    setNextPageButtonActive( bool ) {
        this.setState({ nextPageButtonActive: bool });
    }

    // Color of go on button and navigation buttons changes based on current page
    decideButtonColor( index )
    {
        //console.log(this.state.pageIndex, this.props.pageOrder);
        //switch( this.props.pageOrder[ this.state.pageIndex - 1 ] )

        var result;

        // Color each button according to the page that is connected to it.
        // -1 because the first button is for the previous page.
        switch( this.props.pageOrder[ index - 1 ] )
        {
            case 'CBM':
                result = 'rgb(196, 132, 104)';
                break;
            case 'LCP':
                result ='rgb(237, 191, 98)';
                break;
            case 'ED':
                result = 'rgb(95, 108, 90)';
                break;
            case 'CDP':
                result = 'rgb(94, 103, 110)';
                break;
            case 'Solution-Overview':
                result = 'rgb(0, 0, 0)';
                break;
            default:
                result = 'rgb(179, 179,179)';
        }

        return result;
    }

    decideDescription()
    {
        let title = this.state.title;
        if ( title == 'Circular Business Models' ) {
            return <p>Circular business models (CBMs) are essential in the transition towards a circular economy by facilitating closed loops and resource-efficient production and consumption systems. All of these business models can be divided into four circular business model strategies. In Contrast, Sustainable Business Models (SBM) includes principals of sustainability and involves the generation of non-monetary value. Although there is a significant overlap between sustainable business models and circular business models, it is important to note that not all CBMs qualify as SBMs.</p>
        }
         else if ( title == 'Lifecycle Phase Intensity') {
            return <p>Environmental impacts caused by products are typically concentrated in one or a few phases of their life cycle. The product life cycle phases commonly used in life cycle assessment (LCA), including raw material extraction, production, logistics, use, and disposal, provide guidance for this clustering. A hotspot analysis based on LCA can be employed to pinpoint the life cycle phase with the most significant environmental impacts. Based on that, measures and solutions relevant to that phase can be prioritized holding the highest potential for improvement.​</p>
        }
         else if ( title == 'Ecodesign Approaches') {
            return <p>Ecodesign principles serve as a guide to optimize environmental-related product improvements that are in line with the circular economy at the operational level. Implementing these principles is crucial for the success of the CE. The European Commission provides a common definition of ecodesign principles.</p>
        }
        else if ( title == 'Circular Design Principles') {
            return <p>The Circular Design Principles (CDP) provide specific guidelines for implementing circular measures at the constructive level for optimization. Concrete solution proposals for the design are included in each of the CDPs, which can be supplemented with internal knowledge and specifications. The CDPs are grouped into different areas of action.</p>
        }
    }

    // Dynamicly create the page navigation buttons based on the current index/page the user is on
    getPageButtons()
    {
        if(this.state.mobileLayout)
        {
            return(
                this.state.pageButtons.map(( page, index ) => (
                    <Button className='navbarButton'
                    style={
                        // Set the current page active / or set all buttons active with color, if your on the last page
                        index <= this.state.pageIndex ? { backgroundColor: this.decideButtonColor( index ) } : {}   
                    }
                    disabled={
                        //  Disable all pages after the current page 
                        index > this.state.pageIndex ? true : false
                    }
                    onClick={ () => this.props.goToPage( page ) }
                    />
                ))
            );
        }
        else
        {
            return(
                this.state.pageButtons.map(( page, index ) => (
                    <Col>
                        <Button className='navbarButton'
                        style={
                            // Set the current page active / or set all buttons active with color, if your on the last page
                            index <= this.state.pageIndex ? { backgroundColor: this.decideButtonColor( index ) } : {}   
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
    }

    render()
    {
        const { expanded, expandedButtons, title, mobileLayout } = this.state;

        if(mobileLayout)
        {
            return(
                <div className='flex pt-5 CustomNavbar items-center justify-center'>

                    {/* Home button */}
                    <div className=''>
                        <Tooltip arrow title="Home">
                            <Link href="/home">
                                <Button className='homeButton'>
                                    <Image src="/icons/Menü_Haus.png" width={65} height={55} alt='HomeButton' />
                                </Button>
                            </Link>
                        </Tooltip>
                    </div>
                
                    <div className=''>test</div>

                    {/* Page Buttons */}
                    <div className='flex-grow flex justify-center space-x-2'>
                        { this.getPageButtons() }
                    </div>

                </div>
            );
        }
        else
        {
            return(
                <Col className={ expandedButtons ? 'CustomNavbar col-5' : 'CustomNavbar col-1' } style={{ display: expanded ? 'inline-block' : 'none' }}>
                    <Container  fluid>
                        <Row xs="2">

                            {/* --- Main Navbar with page buttons ------------------------------------------------ */}
                            <Col className={ expandedButtons ? 'buttonCol col-3' : 'buttonCol col-12' }>
                                        
                                        {/* Home button */}
                                        <Col>
                                            <Tooltip arrow title="Home">
                                                <Link href="/home">
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

                                        {/* Back Button */}
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
                            <Col className='descriptionCol col-9' style={{ display: expandedButtons ? 'inline-block' : 'none' }}>
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
                                            <p className='userHelp'>{ title == 'Circular Business Models' ? "Please select only one option to continue" : title == "Circular Design Principles" ? "" : "Please select at least one option to continue" }</p>
                                        </Col>

                                        <Col>
                                            <Tooltip arrow title="Select items by clicking on the box underneath CHOOSE in the elements to the right">
                                                <div>
                                                    {/* The callback is the nextPage function from the advisor page which is passed into this class  */}
                                                    <Button
                                                        className={ this.state.nextPageButtonActive ? "" : "disabled" }
                                                        style={{ borderColor: this.decideButtonColor() }}
                                                        onClick={ () => this.props.nextPage() }>
                                                        { title == 'Circular Design Principles' ? 'CONTINUE' : 'GO ON' }
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
}
