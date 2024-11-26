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
import Watermark from "../../components/watermark";

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
            cdpData: null,
            loading: true,
            error: null,
            title: props.initialTitle,
            type: props.initialType,
            oldType: props.initialType,
            elementOpen: false, //only 1 element can be opend at a time, when an element is opend the navbar collapses
            closeElementCallback: null,
            impressumVisible: true,
            windowWidth: 0, // Gets updated to adjust for mobile design
            mobileLayout: false, //dependent on window width but as bool
            key: 0, //used to force rebuild on certain components
        };

        // Bind the method to the class
        this.handleResize = this.handleResize.bind(this);

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
        // Set initial window width and set listener
        this.handleResize();
        window.addEventListener('resize', this.handleResize);
        
        this.loadData();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }
    
    // Apply / unapply mobile design
    handleResize = () => {
        this.setState((prevState) => ({ 
            windowWidth: window.innerWidth,
            mobileLayout: window.innerWidth < 900 ? true : false,
            key: prevState.key + 1, 
        }));
    };

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
            
            console.log(`dATA 1` + data.descriptions);

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

            console.log(`EDDD DATAAAA!!!` + data.descriptions);
                    
            // Set the background color of the coosable elements because its dependent on how many elements there are
            // Color is different based on page
            if( type == 'CBM' ) {
                var r = 213, g = 181, b = 167; // Starting colours
                var _r = 196, _g = 132, _b = 104; // ending colours, all other colours inbetween
            } else if ( type == 'LCP' ) {
                var r = 250, g = 236, b = 208; 
                var _r = 237, _g = 191, _b = 98;
            } else if ( type == 'ED' ) {
                var r = 176, g = 181, b = 174; 
                var _r = 95, _g = 108, _b = 90;
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
        else if( page == "Solution-Overview" )
        {
            return;
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
        var selectedItemsCount = 0;

        // check if user selected at least one item from the list, if not display massage
        var cookie = getCookie( 'selected' );
        
        if( cookie )
        {
            cookie = JSON.parse(cookie);
            cookie.forEach( item => {
                // Check if user has selected at least one item from current type if yes enable next page button
                if( item[1] == type ) {
                    itemsSelected = true;
                    selectedItemsCount++;
                }
            });
            // You can only select 1 cdp, return false if more than 1 is selected
            if( type == "CBM" && selectedItemsCount > 1 ) {
                itemsSelected = false;
            } 
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
            this.setState({
                elementOpen: true,
                // + Toggle the impressum watermark because it overlays the open / close buttons otherwise
                impressumVisible: false
            });
            Navbar.current.setExpanded();
        } 
        // User closes the open element
        else if( elementOpen && bool == false ) {
            this.setState({
                elementOpen: false,
                impressumVisible: true
            });
            Navbar.current.setExpanded();
        }
        // There is already a item open and the user opens another one
        else {
            closeElementCallback();
        }

        
        // Save the callback because we will be using the callback of the previous item when a new item is selected
        this.setState({
            closeElementCallback: callback,
        });
    }

    // just opens and closes the description, used in the pie chart so cb is not needed
    toggleNavbarNoCallback = () => {
        const { Navbar } = this;
        Navbar.current.setExpandedButtons();
        this.setState({ impressumVisible: !this.state.impressumVisible })
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

    isEven (number) {
        return Math.floor(number / 2) * 2 === number;
    }

    // --- Render -------------------------------------------------------------------------------

    // Split up the data and join it so that the element of the forst row and the corresponding element directly underneath it
    // are in the same data subset so that it can then be pushed into the choosable element version with 2 rows 
    createMultipleRows( data ) {
        var rearangedData = [];
        var median = Math.floor( data.length / 2 );
        var excessElement;

        if ( this.isEven( data.length ) ) {

            for( var i=0; i < median; i++ )
            {
                rearangedData.push( [] );
                rearangedData[i].push( data[i] );
                rearangedData[i].push( data[i + median] );
            }
        } else { // JUST A HOTFIX
            for( var i=0; i <= median; i++ )
            {
                rearangedData.push( [] );
                rearangedData[i].push( data[i] );
                rearangedData[i].push( data[i + median] );
            }
        }

        
        // Fix if there is an uneven amount of elements, since we start at 0 we check if the length is even
        // Not working atm, last element is left out on purpose
        if ( !this.isEven( data.length ) ) {
            // excessElement = data[ data.length - 1 ]; // add the last element since it has been ignored before
        }

        // Even number of data
        if ( excessElement == undefined )
        {
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
        } // uneven number, extra steps necessary
        else
        {   // WIP
            return(

                <div>
                <div>
                    {// Regular 2 Row Elements
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
                    ))}
                </div>
                    <div>
                    <ChoosableElement 
                    key={rearangedData.length}
                    id={excessElement.id}
                    description={excessElement.description}
                    name={this.schoeneZeilenumbrueche(excessElement.name, 5)}
                    active={excessElement.active}
                    type={this.state.type}
                    color={excessElement.color}
                    enableNextPageButton={this.enableNextPageButton}
                    toggleNavbar={ this.toggleNavbar } 
                    />
                    </div>
                    </div>
                    
                    );
                }


    }


    render()
    {
        const { data, loading, error, warning, type, title, impressumVisible, windowWidth, key, mobileLayout } = this.state;

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

                    <div style={{ position: "fixed", bottom: "0px", left:"10px", width: "250px" }}>
                        <Watermark visible={ impressumVisible } />
                    </div>

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
    
                    <Container fluid style={{ padding: 0 }} >
                        <Row className="mainRow"> {/* Achieves vertical scroll: "flex-nowrap overflow-auto" */}

                            <CustomNavbar
                                ref={ this.Navbar }
                                nextPage={ this.nextPage }
                                title={ this.state.title }
                                pageIndex={ this.pageOrder.indexOf( type ) +1 }
                                pageOrder={ this.pageOrder }
                                goToPage={ this.goToPage }
                                back={ this.back }
                                key= {key}
                                mobileLayout= { mobileLayout }
                                nextPageButtonActive={ () => { return true; } /** this.areItemsSelected() --commented out because i dont know how items are supposed to be selected yet */ }
                                >
                            </CustomNavbar>

                                <Col className="pieChartCol">
                                    <PieChart toggleDescription={ this.toggleNavbarNoCallback } key= {key} mobileLayout={ mobileLayout } />
                                </Col>

                        </Row>
                    </Container>

                    <div style={{ position: "fixed", bottom: "0px", left:"10px", width: "250px" }}>
                        <Watermark visible={ impressumVisible } />
                    </div>

                </div>
            );
        }

        // Display the result page
        else if ( type == "Solution-Overview" )
        {
            return(
                <div className="advisorPage">

                    <Container fluid style={{ padding: 0 }}>
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
                                <SolutionOverview initialType={ this.props.initialType } />
                            </Col>

                            </Row>
                    </Container>

                    <div style={{ position: "fixed", bottom: "0px", left:"10px", width: "100px" }}>
                        <Watermark visible={true} />
                    </div>

                </div>
            );
        }

        // Show choosable elements in 2 rows because there are too many for 1 row 
        else
        {
            // --- Mobile Design
            if (mobileLayout)
            {
                return(
                    <div className="advisorPage">

                        <CustomNavbar
                                    ref={ this.Navbar }
                                    nextPage={ this.nextPage }
                                    title={ this.state.title }
                                    pageIndex={ this.pageOrder.indexOf( type ) +1 }
                                    pageOrder={ this.pageOrder }
                                    goToPage={ this.goToPage }
                                    back={ this.back }   
                                    nextPageButtonActive={ this.areItemsSelected() }
                                    mobileLayout={true}
                                    >
                        </CustomNavbar>

                        {/*bodyContent*/}
                        {
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
                                mobileLayout={ true } 
                                />
                            ))
                        }

                        <div style={{ position: "fixed", bottom: "0px", left:"10px", width: "250px" }}>
                            <Watermark visible={ impressumVisible } />
                        </div>

                    </div>
                );
            }

            // -- iPad / PC Design
            else
            {
                return(
                    <div className="advisorPage">

                        <Container fluid className="advisorPageContainer">
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
                                    mobileLayout={false}
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
                                            mobileLayout={false} 
                                            />
                                        )) :

                                    // Multiple Rows
                                    this.createMultipleRows( data['descriptions'] )

                                }
                                </Row>

                            </Row>
                        </Container>

                        <div style={{ position: "fixed", bottom: "0px", left:"10px", width: "250px" }}>
                            <Watermark visible={ impressumVisible } />
                        </div>

                    </div>

                );
            }
        }




    }
}
