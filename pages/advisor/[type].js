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
import { useRouter } from 'next/router'
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
            { params: { type: 'TC' } },
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
        case "TDP":
            title = "Technical Design Principles"
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
            history: [ props.initialType ]
          };

        // Decide in which order the pages will get displayed based on if the user selected LCP or CBM on the previous page
        if( props.initialType == "CBM" ) {
            this.pageOrder = [ "CBM", "LCP", "ED", "TDP" ];
        } else {
            this.pageOrder = [ "LCP", "CBM", "ED", "TDP" ];
        }

    }

    // --- Data load ------------------------------------------------------------------------------- 
    componentDidMount()
    {
        this.loadData();
    }

    loadData()
    {
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
            // Mark items which were selected before wiht the element.active tag
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

            // Update the component State with the fetched data
            this.setState({ data: data, loading: false });

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
        this.setState({ loading: true })
        
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

    // --- Render -------------------------------------------------------------------------------
    render()
    {
        const { data, loading, error, warning, type } = this.state;

        if (loading) {
            return(
                <div className="advisorPage">
                    <Container fluid>
                        <Row>

                            <CustomNavbar AdvisorPage={ this } />
                    
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
                    <Row>

                        <CustomNavbar ref={ this.Navbar } nextPage={ this.nextPage } />

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
                                />
                            ))
                        }

                    </Row>
                </Container>
            </div>
            
        );
    }
}