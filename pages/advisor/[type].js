/**
 *  This page can be loaded with different arguments. based on the argument data is loaded
 *  from a specific csv file and displayed.
 */

import { Button, Col, Container, Row } from "reactstrap";
import LayoutFooterExtended from "../../components/LayoutFooterExtended";
import { BsArrowRightCircle } from 'react-icons/bs';
import { useRouter } from 'next/router'
import useSessionStorage from '../../hooks/useSessionStorage';
import { getCookie, hasCookie, getCookies } from 'cookies-next';
import ChoosableElement from "../../components/ChoosableElement";
import { useState, useEffect } from 'react'

import * as model from "../../prisma/model";

// --- This function is called during build and sets the available routes. ---------------------------------------
export async function getStaticPaths() {
    return {
        paths: [
            { params: { type: 'circular' } },
            { params: { type: 'product' } },
        ],
        fallback: false, // can also be true or 'blocking'
    }
}

// --- This function gets called at build time, Server-Side --------------------------------------------------
export async function getStaticProps(context) {
    
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
    }

    var data = await model.getDescriptions(type);
    console.log(data);

    // Hand data over to view.
    return {
        props: {
            initialTitle: title,
            initialData: data,
            initialType: type,
        },
    }
}

// --- The actual page content -------------------------------------------------------------------------
export default function AdvisorPage({ initialTitle, initialData, initialType }) {
    const prevPath = useSessionStorage('prevPath');
    const currentPath = useSessionStorage('currentPath');
    const [title, setTitle] = useState( initialTitle );
    const [bodyContent, setBodyContent] = useState( InitBody() );

    // type is the current type or the type which is supposed to be loaded. oldType is used while loading a new type
    // in order to define from which table the relations are drawn. So when i switch from LCP to CBM i have CBM as type
    // and LCP as oldType so i know that i need to take relations from LCPxCBM.
    //var type = initialType;
    //var oldType; // I can not set this with state, if i do the values dont get updated. i think its because there would be to many rerenders but im not sure.
    const [type, setType] = useState( initialType );
    const [oldType, setOldType] = useState( initialType );

    // When the page is opend the first time the data is passed from the backend in during getStaticProps.
    // Why? Faster through Static generation, we always display all data in the begining so it doenst have to be dynamic
    // annnnd.... it just dosnt work otherwise, i cant find a way to initialize my body through client side request.
    function InitBody() {

        () => setOldType('CBM');
        () => setType('CBM');
        /*
        return(
            initialData.map(( item, index ) => (
                <ChoosableElement key={index} id={item.id} description={item.description} name={item.name} />
            ))
        );
        */
    }

    // to be displayed during fetch requests
    function LoadingNotificaiton() {
        
        return(
            <div className="loadingNotification">
                <div className="loader" />
                <p>loading...</p>
            </div>
        )
    }

    // Decide which page to display next based on the current and previous page.
    function loadNextPage() {
        setBodyContent( LoadingNotificaiton() );
        setOldType( type );

        // Tricker useEffect on setType completion
        switch( type ) {

            case "CBM":
                // The user started with CBM and is currently on the CBM page so the next page has to be LCP
                if( currentPath == "/advisor/circular") {
                    setTitle("Lifecycle Phase Intensity");
                    setType("LCP");
                    break;
                } else { // User started with LCP and is already on second page
                    setTitle("Ecodesign Approaches");
                    setType("ED");
                    break;
                }

            case "LCP":
                if( currentPath == "/advisor/product") {
                    setTitle("Circular Business Models");
                    setType("CBM");
                    break;
                } else { 
                    setTitle("Ecodesign Approaches");
                    setType("ED");
                    break;
                }

            case "ED":
                setTitle("Technical Design Principles");
                return; // TDP dosnt exit yet on the database.

        }

    }

    // State dosnt get updated immidiatly so i instead run this function everytime the state of type actually changes.
    useEffect( () => {
        
        var types = [ oldType, type ]
        var selectedItems = getCookie( 'selected' );
        
        // API request for data retrival, selectedItems is not required / can be undefined.
        // https://nextjs.org/docs/basic-features/data-fetching/client-side
        fetch(`/api/descriptions/${types}?items=${selectedItems}`)
        .then((res) => res.json())
        .then((data) => {

            if( selectedItems )
            {
                selectedItems = JSON.parse( "[" + selectedItems + "]" )[0];
    
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

            setBodyContent(
                data['descriptions'].map(( item, index ) => (
                    <ChoosableElement 
                        key={index}
                        id={item.id}
                        description={item.description}
                        name={item.name}
                        active={item.active}
                    />
                    ))
                );
                    
            });

    }, [type] );

    
    // JSX body
    return(
        <div className="advisorPage">
            <Col className="mainCol">
                
            <h1>{title}</h1>
            
            <div>{bodyContent}</div>

            </Col>
            <Col className="d-flex justify-content-center buttonCol">
                <Button onClick={() => loadNextPage()} className="standardButton nextButton">
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