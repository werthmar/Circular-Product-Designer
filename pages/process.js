/**
 * The main page of the application. User chooses if they want to start with a product or
 * circular business model and are then guided through the process. The idea is that the entire
 * process can be done on this page with the page body switching without the need to switch the
 * entire page.
 */

import Link from "next/link";
import { Button, Col, Row, Container } from "reactstrap";
import LayoutFooterExtended from "../components/LayoutFooterExtended";
import { hasCookie, deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import CustomNavbarButtonsOnly from "../components/NavbarButtonsOnly";
import Image from "next/image";
import { useState } from "react";

export default function ProcessPage()
{
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    let isDeactive = false;

    function nextPage( page )
    {
        setLoading(true);
        if( hasCookie('selected' ) )
        {
            deleteCookie('selected');
        }
        
        if (isDeactive && page == "/advisor/CBM") return
        router.push( page );
    }

    function back()
    {
        setLoading(true);
        router.push('/');
    }

    if(loading) {
        return(
            <div className="processPage">
            <div className="loadingNotification">
                    <div className="loader" />
                    <p>loading...</p>
            </div>
        </div>
        );
    }
    else {
        return(
            <div className="processPage">
                <Container fluid>
                    <Row xs="2">

                        <CustomNavbarButtonsOnly back={ back } />

                        <Col className="title" xs="2">
                            <h1>
                                DO YOU HAVE
                            </h1>
                        </Col>


                        <Row className="col-9" xs="1">
                            <Col className="buttonCol">
                                <Button onClick={ () => nextPage( "/advisor/CBM" ) } className="button cbm">
                                    <p>... a circular business strategy you would like to follow?</p>
                                    <div className="backgroundImage">
                                        <h2>CIRCULAR BUSINESS MODEL</h2>  
                                    </div>
                                </Button>
                            </Col>
                            <Col className="buttonCol">
                                <Button onClick={ () => nextPage( "advisor/LCP" ) } className="button lci">
                                    <p>... a product that you would like to make circular?</p>
                                    <div className="backgroundImage">
                                        <h2>LIFECYCLE PHASE INTENSITY</h2>  
                                    </div>
                                </Button>
                            </Col>
                        </Row>
                    
                    </Row>
                </Container>
            </div>
        )
    }

}
