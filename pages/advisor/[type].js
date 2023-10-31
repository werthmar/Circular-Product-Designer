/**
 *  This page can be loaded with different arguments. based on the argument data is loaded
 *  from a specific csv file and displayed.
 */
import React from "react";
import { Button, Col, Nav, Navbar, Alert, Container, Row } from "reactstrap";
import LayoutFooterExtended from "../../components/LayoutFooterExtended";
import { BsArrowRightCircle } from 'react-icons/bs';
import { RiArrowGoBackLine } from 'react-icons/ri';
import HomeButton from '../../components/HomeButton';
import Router from 'next/router'
import useSessionStorage from '../../hooks/useSessionStorage';
import { getCookie, hasCookie, getCookies, setCookie } from 'cookies-next';
import ChoosableElement from "../../components/ChoosableElement";
import ChoosableElement2Rows from "../../components/ChoosableElement2Rows";
import { useState, useEffect } from 'react'
import { Value } from "sass";
import CustomNavbar from "../../components/Navbar";
import PieChart from "../../components/PieChart";
import { Pie } from "react-chartjs-2";
import SolutionOverview from "../../components/SolutionOverview";

// This function is called during build and sets the available routes.
export async function getStaticPaths() {
    return {
        paths: [
            { params: { type: 'CBM' } },
            { params: { type: 'LCP' } },
            { params: { type: 'ED' } },
            { params: { type: 'CDP' } },
        ],
        fallback: false, // can also be true or 'blocking'
    }
}

// This function gets called at build time
export async function getStaticProps(context) {
    // TODO: Load the csv data here, example is with api request
    // const res = await fetch('https://.../posts')
    // const posts = await res.json()

    // Get the request params
    const type = context.params.type;
    var title;

    switch (type) {
        case "CBM":
            title = "Circular Business Models";
            break;
        case "LCP":
            title = "Lifecycle Phase Intensity"
            break;
        case "ED":
            title = "Ecodesign Approaches"
            break;
        case "CDP":
            title = "Circular Design Principles"
            break;
    }

    return {
        props: {
            initialTitle: title,
            initialType: type,
        },
    }
}



// --- The actual page content -------------------------------------------------------------------------
export default class AdvisorPage extends React.Component
{
    
    constructor(props)
    {
        super(props);
        //document.title = "Advisor";
        console.log(`props`);
        this.Navbar = React.createRef();
        this.ActiveElement = React.createRef(); // Reference to the open element
        this.state = {
            data: null,
            loading: true,
            error: null,
            title: props.initialTitle,
            type: props.initialType,
            oldType: props.initialType,
            elementOpen: false, //only 1 element can be opend at a time, when an element is opend the navbar collapses
            closeElementCallback: null,
        };

        // Decide in which order the pages will get displayed based on if the user selected LCP or CBM on the previous page
        if( props.initialType == "CBM" ) {
            this.pageOrder = [ "CBM", "LCP", "ED", "CDP", "Solution-Overview" ];
        } else {
            this.pageOrder = [ "LCP", "CBM", "ED", "CDP", "Solution-Overview" ];
        }

    }

    // --- Data load ------------------------------------------------------------------------------- 
    componentDidMount()
    {
        this.loadData();
    }

    loadData()
    {
        this.setState({ loading: true })
        const { type, oldType } = this.state;

        // Prepare selected items from cookie to be used during fetch to remark items as checked when going back
        var selectedItems = [];
        var cookie = getCookie( 'selected' );
        if( cookie )
        {
            cookie = JSON.parse(cookie);
            cookie.forEach( item => {
                selectedItems.push( item[0] );
            });
        }

        // If you go back with the footer buttons set oldtype = type in order to load the complete page instead of filtered result
        // Everytime oldType does not match type the result is filtered based on the selection inside the cookie
        var types = [ oldType, type ]
        if (
            oldType == "ED" && type == "CBM" ||
            oldType == "ED" && type == "LCP" 
        ) {
            types = [ type, type ];
        }
    
        // If the user is on the last page there is no need to load new data, bcs the last page is mainly a summary of the previous page.
        // the data from this page is reused if the user decides to go back with the back button
        if ( type == 'Solution-Overview' )
        {
            // Disable Navbar description
            this.toggleNavbarNoCallback();
            this.setState({ data: this.state.data, loading: false, warning: false, title: 'Solution Overview' });
            return;
        }

        // API request for data retrival, selectedItems is not required / can be undefined.
        // https://nextjs.org/docs/basic-features/data-fetching/client-side
        fetch(`/api/descriptions/${types}?items=${ '[' + selectedItems + ']' }`)
        .then((res) => res.json())
        .then((data) =>
        {
            
            // Mark items which were selected before with the element.active tag
            if( selectedItems.length != 0 )
            {
                data.descriptions.forEach(element => {
                    element.active = selectedItems.includes( element.id );
                });
            }
            else
            {
                data.descriptions.forEach(element => {
                    element.active = false;
                });
            }

            // All EDs are selected by default.
            if( type == "ED" ) {
                data.descriptions.forEach(element => {
                    selectedItems.push( [element.id, type] );
                    cookie.push( [element.id, type] );
                    element.active = true;
                });
                setCookie('selected', cookie, { sameSite: true })
            }
                    
            // Set the background color of the coosable elements because its dependent on how many elements there are
            // Color is different based on page
            if( type == 'CBM' ) {
                var r = 209, g = 180, b = 165; // Starting colours
                var _r = 171, _g = 118, _b = 92; // ending colours, all other colours inbetween
            } else if ( type == 'LCP' ) {
                var r = 250, g = 236, b = 208; 
                var _r = 237, _g = 191, _b = 98;
            } else if ( type == 'ED' ) {
                var r = 164, g = 171, b = 159; 
                var _r = 89, _g = 99, _b = 80;
            } else {
                var r = 250, g = 236, b = 208; 
                var _r = 237, _g = 191, _b = 98;
            }
            
            // interpolation of colours
            var diff_r = _r - r, diff_g = _g - g, diff_b = _b - b; // calc diffrenrez of start/end colours
            diff_r /= data.descriptions.length;
            diff_g /= data.descriptions.length;
            diff_b /= data.descriptions.length;
            // Asign the colour values
            data.descriptions.forEach( function( element, index )
            {
                element.color = `rgb(
                    ${ r + diff_r * index + 1 },
                    ${ g + diff_g * index + 1 },
                    ${ b + diff_b * index + 1 })`;
            });

            // Decide the next Title
            var newTitle;
            switch( this.state.type ) {
                case "CBM":
                    newTitle = "Circular Business Models";
                    break;
                case "LCP":
                    newTitle = "Lifecycle Phase Intensity"
                    break;
                case "ED":
                    newTitle = "Ecodesign Approaches"
                    break;
                case "CDP":
                    newTitle = "Circular Design Principles"
            }

            // Update the component State with the fetched data
            this.setState({ data: data, loading: false, warning: false, title: newTitle });

            console.log(this.state.data);
        })
        .catch(error => {
            // Handle any errors that occurred during fetching
            this.setState({ error, loading: false });
        });
    }

    // --- Page Navigation ----------------------------------------------------------------------
    nextPage = () =>
    {
        const { type } = this.state;

        // Calculate the next page based on the pageOrder defined in the constructor by finding the corresponding index of the next page in the array
        var nextPageIndex = this.pageOrder.indexOf( type ) + 1;

        this.setState({
            oldType: type,
            type: this.pageOrder[ nextPageIndex ]
        },
            // setState callback, otherwise function gets called before state is updated
            this.loadData 
        );
    }

    // Called when the round buttons in the navbar are clicked
    goToPage = ( page ) =>
    {
        var goToIndex = this.pageOrder.indexOf( page );

        if( page == "start" )
        {
            Router.push( "/process" );
        }
        // Set type and old type the same because its the first page of advisor and results should not be filtered
        else if (goToIndex == 0)
        {
            this.setState({
                oldType: this.pageOrder[ goToIndex ],
                type: this.pageOrder[ goToIndex ],
            },
                this.loadData,
                );
            }
            else
            {
                this.setState({
                    oldType: this.pageOrder[ goToIndex - 1 ],
                    type: this.pageOrder[ goToIndex ],
                },
                this.loadData,
            );
        }
    }

    // Go back one page and if you are at the first page return to the /process selection page
    back = () =>
    {
        var goToIndex = this.pageOrder.indexOf( this.state.type );

        switch( goToIndex ) {
            case 0:
                this.goToPage( "start" );
                break;
            default:
                this.goToPage( this.pageOrder[ goToIndex - 1 ] );
        }
    }
    
    // --- Page control -------------------------------------------------------------------------
    // In seperate function bcs its also used to initialise the navbar in case the user goes back to a page where an item has already been selected
    areItemsSelected() {
        const { type } = this.state;
        var itemsSelected = false;
        
        // check if user selected at least one item from the list, if not display massage
        var cookie = getCookie( 'selected' );
        
        if( cookie )
        {
            cookie = JSON.parse(cookie);
            cookie.forEach( item => {
                // Check if user has selected at least one item from current type if yes enable next page button
                if( item[1] == type ) {
                    itemsSelected = true;
                }
            });
        }
        return itemsSelected;
    }

    // Controlls the Navbar NextPage Button based on if at least 1 item has been selected on this page
    enableNextPageButton = () => 
    {
        const { Navbar } = this;
        var itemsSelected = this.areItemsSelected();    
        Navbar.current.setNextPageButtonActive( itemsSelected );
    }
    
    // Collapse and expand the navbar, there can only be either the Navbar or 1 element open at one time
    toggleNavbar = ( bool, callback ) =>
    {
        const { Navbar } = this;
        const { elementOpen, closeElementCallback } = this.state;

        // No element is currently open (=Navbar expanded) and now an element has been opened
        if( !elementOpen && bool == true )
        {
            this.setState({ elementOpen: true });
            Navbar.current.setExpanded();
        } 
        // User closes the open element
        else if( elementOpen && bool == false ) {
            this.setState({ elementOpen: false });
            Navbar.current.setExpanded();
        }
        // There is already a item open and the user opens another one
        else {
            closeElementCallback();
        }

        // Save the callback because we will be using the callback of the previous item when a new item is selected
        this.setState({ closeElementCallback: callback });
    }

    // just opens and closes the description, used in the pie chart so cb is not needed
    toggleNavbarNoCallback = () => {
        const { Navbar } = this;
        Navbar.current.setExpandedButtons();
    }

    schoeneZeilenumbrueche = (text, zeilenlaenge) => {
        let woerter = text.split(' ');
        let aktuelleZeile = woerter[0];
        let aktuelleLaenge = woerter[0].length

        for (let i = 1; i < woerter.length; i++) {
            let wort = woerter[i];
            if (wort.length > zeilenlaenge) {
                // Wenn das Wort länger als die maximale Zeilenlänge ist, unterstreiche es
                aktuelleZeile += '\n' + wort;
                aktuelleLaenge = wort.length
            } else if (aktuelleLaenge + 1 + wort.length <= zeilenlaenge) {
                aktuelleZeile += ' ' + wort;
                aktuelleLaenge += wort.length + 1
            } else {
                aktuelleZeile += '\n' + wort;
                aktuelleLaenge = wort.length
            }
        }

        return aktuelleZeile; 

    }

    // --- Render -------------------------------------------------------------------------------

    // Split up the data and join it so that the element of the forst row and the corresponding element directly underneath it
    // are in the same data subset so that it can then be pushed into the choosable element version with 2 rows 
    createMultipleRows( data ) {
        var rearangedData = [];
        var median = data.length / 2;

        for( var i=0; i<median; i++ )
        {
            rearangedData.push( [] );
            rearangedData[i].push( data[i] );
            
            // Fix for an uneven number of elements
            if( data[ median + i ] ) {
                rearangedData[i].push( data[ median + i ] );
            } else { // Just add the same item twice, easiest solution
                rearangedData[i].push( data[i] );
            }
        }

        return ( 
            rearangedData.map(( item, index ) => (
                <ChoosableElement2Rows 
                key={index}
                id={item[0].id}
                id2={item[1].id}
                description={this.schoeneZeilenumbrueche(item[0].description,111164)}
                description2={this.schoeneZeilenumbrueche(item[1].description,111164)}
                name={this.schoeneZeilenumbrueche(item[0].name, 12)}//{item[0].name.replace(/(.{11})/g, "$1\n")}//{item[0].name}
                name2={this.schoeneZeilenumbrueche(item[1].name, 12)}
                active={item[0].active}
                active2={item[1].active}
                type={this.state.type}
                color={item[0].color}
                color2={item[1].color}
                enableNextPageButton={this.enableNextPageButton}
                toggleNavbar={ this.toggleNavbar } 
                />
            ))    
        );
    }


    render()
    {
        const { data, loading, error, warning, type, title } = this.state;

        if (loading) {
            return(
                <div className="advisorPage">
                    <Container fluid>
                        <Row>

                            <CustomNavbar pageOrder={ this.pageOrder } />
                    
                            <Col className="loadingNotification">
                                    <div className="loader" />
                                    <p>loading...</p>
                            </Col>

                        </Row>
                    </Container>
                </div>
            );
        }

        else if (error) {
            return <div>Error: {error.message}</div>;
        }

        // Display a pie chart display for the last page / Circular Design Principles
        else if ( type == "CDP" )
        {
            return(
                <div className="advisorPage">

                    <Container fluid>
                        <Row className="mainRow"> {/* Achieves vertical scroll: "flex-nowrap overflow-auto" */}

                            <CustomNavbar
                                ref={ this.Navbar }
                                nextPage={ this.nextPage }
                                title={ this.state.title }
                                pageIndex={ this.pageOrder.indexOf( type ) +1 }
                                pageOrder={ this.pageOrder }
                                goToPage={ this.goToPage }
                                back={ this.back }   
                                nextPageButtonActive={ () => { return true; } /** this.areItemsSelected() --commented out because i dont know how items are supposed to be selected yet */ }
                                >
                            </CustomNavbar>

                            <Col className="pieChartCol">
                                <PieChart data={ data } toggleDescription={ this.toggleNavbarNoCallback } />
                            </Col>

                            </Row>
                    </Container>

                </div>
            );
        }

        // Display the result page
        else if ( type == "Solution-Overview" )
        {
            return(
                <div className="advisorPage">

                    <Container fluid>
                        <Row className="mainRow"> {/* Achieves vertical scroll: "flex-nowrap overflow-auto" */}

                            <div>{/** Used to force rerender */}</div>

                            <CustomNavbar
                                ref={ this.Navbar }
                                nextPage={ this.nextPage }
                                title={ this.state.title }
                                pageIndex={ this.pageOrder.indexOf( type ) +1 }
                                pageOrder={ this.pageOrder }
                                goToPage={ this.goToPage }
                                back={ this.back }   
                                nextPageButtonActive={ this.areItemsSelected() }
                                >
                            </CustomNavbar>

                            <Col className="solutionOverview">
                                <SolutionOverview initialType={ this.props.initialType } cdpCount={ data.descriptions.length } />
                            </Col>

                            </Row>
                    </Container>

                </div>
            );
        }

        // Show choosable elements in 2 rows because there are too many for 1 row 
        else{
            return(

                <div className="advisorPage">

                    <Container fluid>
                        <Row className="mainRow"> {/* Achieves vertical scroll: "flex-nowrap overflow-auto" */}

                            <CustomNavbar
                                ref={ this.Navbar }
                                nextPage={ this.nextPage }
                                title={ this.state.title }
                                pageIndex={ this.pageOrder.indexOf( type ) +1 }
                                pageOrder={ this.pageOrder }
                                goToPage={ this.goToPage }
                                back={ this.back }   
                                nextPageButtonActive={ this.areItemsSelected() }
                                >
                            </CustomNavbar>

                            {/*bodyContent*/}
                            <Row className={ this.state.elementOpen ? "elementRow" : "elementRow col-7" } > {/* xs={ data['descriptions'].length <= 7 ? "" : "6" /* limit the amount of items in a row only when 2 rows are needed */ }
                            {
                                // Single Row
                                data['descriptions'].length <= 7 ?
                                    data['descriptions'].map(( item, index ) => (
                                        <ChoosableElement 
                                        key={index}
                                        id={item.id}
                                        description={item.description}
                                        name={item.name}
                                        active={item.active}
                                        type={type}
                                        color={item.color}
                                        enableNextPageButton={this.enableNextPageButton}
                                        toggleNavbar={ this.toggleNavbar } 
                                        />
                                    )) :

                                // Multiple Rows
                                this.createMultipleRows( data['descriptions'] )

                            }
                            </Row>

                        </Row>
                    </Container>
                </div>

            );
        }




    }
}
