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
import ChoosableElement from "../../components/ChoosableElement";

import * as model from "../../prisma/model";

// --- This function is called during build and sets the available routes. ---------------------------------------
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

// --- This function gets called at build time --------------------------------------------------------------------
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

// --- The actual page content -------------------------------------------------------------------------
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

    return(
        <div className="advisorPage">
            <Col className="titleCol">
                <h1>{title}</h1>
            </Col>
            <Col className="mainCol">

                {/* Build the body elements out of the data passed from getStaticProps */}
                {data.map(( item, index ) => (
                    <ChoosableElement key={index} id={item.id} description={item.description} name={item.name} />
                ))}

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
  
// --- Apply page layout -------------------------------------------------------------------------
AdvisorPage.getLayout = function getLayout(page) {
    const router = useRouter();
    var pageHistory = router.query;

    return (
        <LayoutFooterExtended metas={page.props} pageTitle="Advisor">{page}</LayoutFooterExtended>
    )
  }