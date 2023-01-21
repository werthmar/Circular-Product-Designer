/**
 *  This page can be loaded with different arguments. based on the argument data is loaded
 *  from a specific csv file and displayed.
 */

import { Button, Col, Container, Row } from "reactstrap";
import LayoutFooterExtended from "../../components/LayoutFooterExtended";
import { ImCheckmark2 } from 'react-icons/im';
import { BsArrowRightCircle } from 'react-icons/bs';
import { useRouter } from 'next/router'
import useSessionStorage from '../../hooks/useSessionStorage';
import { useState } from "react";
import { setCookie, getCookie, hasCookie, deleteCookie } from 'cookies-next';

import * as model from "../../prisma/model";

// This function is called during build and sets the available routes.
export async function getStaticPaths() {
    return {
        paths: [
            { params: { type: 'circular' } },
            { params: { type: 'product' } },
            { params: { type: 'ecodesign' } },
            { params: { type: 'technical' } },
        ],
        fallback: false, // can also be true or 'blocking'
    }
}

// This function gets called at build time
export async function getStaticProps(context) {
    // TODO: Load the csv data here, example is with api request
    // const res = await fetch('https://.../posts')
    // const posts = await res.json()
    //getDescriptions();
    
    // Get the request params, type gets overwritten with the code CBM / LCP / ED which can be used in the database
    var type = context.params.type;
    var title;
    
    switch (type) {
        case "circular":
            title = "Circular Business Models";
            type = "CBM";
            break;
        case "product":
            title = "Lifecycle Phase Intensity";
            type = "LCP";
            break;
        case "ecodesign":
            title = "Ecodesign Approaches";
            type = "ED";
            break;
        case "technical":
            title = "Technical Design Principles";
            break;
    }

    var data = await model.getDescriptions(type);
    console.log(data);

    // Hand data over to frontend.
    return {
        props: {
            title: title,
            data: data,
        },
    }
}

// The actual page content
export default function AdvisorPage({ title,  data }) {
    const router = useRouter();
    const prevPath = useSessionStorage('prevPath');
    const currentPath = useSessionStorage('currentPath');

    // Decide which page to display next based on the current and previous page.
    function loadNextPage() {
        var nextPage;
        switch(currentPath) {
            case "/advisor/circular":
                prevPath == "/advisor/product" ? nextPage = "ecodesign" : nextPage = "product";
                break;
            case "/advisor/product":
                prevPath == "/advisor/circular" ? nextPage = "ecodesign" : nextPage = "circular";
                break;
            case "/advisor/ecodesign":
                nextPage = 'technical';
        }

        var result = `/advisor/${nextPage}`;
        return result;
    }

    // The clickable element displaying text aswell as the onClick function which saves data to a cookie
    function ChoosableElement(id) {
        const [clicked, setClicked] = useState(false);

        return(
            <Row xs="2">
                <Col xs="auto" md="auto">
                    {/* Save selected elements in a cookie and change color of button */}
                    <Button onClick={ () => {

                        if( !clicked ) {
                            
                            // Check if cookie has already been created if yes append data, otherwise create a new
                            if ( hasCookie('selected') ) {
                                let data = getCookie('selected');
                                data = JSON.parse(data);

                                data.push(id);
                                setCookie('selected', data, { sameSite: true });
                            } else {
                                setCookie('selected', [id], { sameSite: true });
                            }

                            setClicked(true);
                        }
                        else {
                            // For some random reaseon the variable gets changed to data1 internaly so i have to change it here to idk why
                            let data1 = getCookie('selected');
                            data1 = JSON.parse(data1);

                            // Delete deselected item from the data and update the cookie
                            data1.forEach( x => {
                                x["id"] == id["id"] ? data1.splice(data1.indexOf(x), 1) : ''; // Remove the x element and only do it once
                            });

                            if ( data1.length != 0 ) {
                                setCookie('selected', data1, { sameSite: true });
                            }else {
                                deleteCookie('selected'); // Remove the empty cookie
                            }

                            setClicked(false);
                        }

                    } } 
                    className={clicked ? "standardButton clicked" : "standardButton"}>
                        <ImCheckmark2 size={50} />
                    </Button>
                </Col>
                <Col xs="7" md="10">
                    <Col>
                        <h2>title</h2>
                    </Col>
                    <Col>
                        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                        diam nonumy eirmod tempor invidunt ut labore et dolore magna
                        aliquyam erat, sed diam voluptua. At vero eos et accusam et justo
                        duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
                        sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                        consetetur sadipscing elitr,</p>
                    </Col>
                </Col>
            </Row> 
        );    
    }

    return(
        <div className="advisorPage">
            <Col className="titleCol">
                <h1>{title}</h1>
            </Col>
            <Col className="mainCol">
                
                <ChoosableElement id='5' />

            </Col>
            <Col className="d-flex justify-content-center buttonCol">
                <Button href={loadNextPage()} className="standardButton nextButton">
                    Continue
                    <BsArrowRightCircle className="icon" size={30}/>
                </Button>      
            </Col>
        </div>
    );
  }
  
AdvisorPage.getLayout = function getLayout(page) {
    const router = useRouter();
    var pageHistory = router.query;

    return (
        <LayoutFooterExtended metas={page.props} pageTitle="Advisor">{page}</LayoutFooterExtended>
    )
  }