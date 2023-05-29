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
        this.navbarRef = React.createRef();
        this.state = {
            data: null,
            loading: true,
            error: null,
            type: props.initialType,
            oldType: props.initialType
          };
    }

    // --- Data load ------------------------------------------------------------------------------- 
    componentDidMount()
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

    // --- Render -------------------------------------------------------------------------------
    render()
    {
        const { data, loading, error, type } = this.state;

        if (loading) {
            return(
                <div className="advisorPage">
                    <Container fluid>
                        <Row>

                            <CustomNavbar ref={ this.navbarRef } />
                    
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
                <Container fluid>
                    <Row>

                        <CustomNavbar ref={ this.navbarRef } />

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