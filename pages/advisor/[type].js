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
import { useState, useEffect } from 'react'
import { Value } from "sass";
import CustomNavbar from "../../components/Navbar";

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
        this.state = {
            data: null,
            loading: true,
            error: null,
            warning: false,
            title: props.initialTitle,
            type: props.initialType,
            oldType: props.initialType,
          };

        // Decide in which order the pages will get displayed based on if the user selected LCP or CBM on the previous page
        if( props.initialType == "CBM" ) {
            this.pageOrder = [ "CBM", "LCP", "ED", "CDP" ];
        } else {
            this.pageOrder = [ "LCP", "CBM", "ED", "CDP" ];
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
        var types = [ this.state.oldType, this.state.type ]
        if (
            this.state.oldType == "ED" && this.state.type == "CBM" ||
            this.state.oldType == "ED" && this.state.type == "LCP" 
        ) {
            types = [ this.state.type, this.state.type ];
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

            // Set the background color of the coosable elements because its dependent on how many elements there are
            var r = 250, g = 236, b = 208; // Starting colours
            var _r = 237, _g = 191, _b = 98; // ending colours, all other colours inbetween
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
        
        }).catch(error => {
            // Handle any errors that occurred during fetching
            this.setState({ error, loading: false });
        });
    }

    // --- Page Navigation ----------------------------------------------------------------------
    nextPage = () =>
    {
        const { type } = this.state;

        // check if user selected at least one item from the list, if not display massage
        var cookie = getCookie( 'selected' );
        var itemSelected = false;
        
        if( cookie )
        {
            cookie = JSON.parse(cookie);
            cookie.forEach( item => {
                // Check if user has selected at least one item from current type
                if( item[1] == type ) {
                    itemSelected = true;
                }
            });
        }
        if( itemSelected != true ) {
            this.setState({ warning: true });
            return;
        }

        // Check pased, at least 1 item has been selected, proceed with data load
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
                this.loadData
            );
        }
        else
        {
            this.setState({
                oldType: this.pageOrder[ goToIndex - 1 ],
                type: this.pageOrder[ goToIndex ],
            },
                this.loadData
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
    

    // --- Render -------------------------------------------------------------------------------
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

        if (error) {
            return <div>Error: {error.message}</div>;
        }

        return(

            <div className="advisorPage">

                <Alert color="danger" className="warningMessage" onClick={() => this.setState({ warning: false })}  style={{display: warning ? 'inline-block' : 'none' }}>
                    You must select at least 1 item from the list.
                </Alert>

                <Container fluid>
                    <Row className="flex-nowrap overflow-auto"> {/* Achieves vertical scroll */}

                        <CustomNavbar
                            ref={ this.Navbar }
                            nextPage={ this.nextPage }
                            title={ this.state.title }
                            pageIndex={ this.pageOrder.indexOf( type ) +1 }
                            pageOrder={ this.pageOrder }
                            goToPage={ this.goToPage }
                            back={ this.back } >    
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
                                />
                            ))
                        }

                    </Row>
                </Container>
            </div>
            
        );
    }
}
