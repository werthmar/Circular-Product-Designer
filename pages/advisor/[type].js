/**
 *  This page can be loaded with different arguments. based on the argument data is loaded
 *  from a specific csv file and displayed.
 */

import { Button, Col, Nav, Navbar, Alert } from "reactstrap";
import LayoutFooterExtended from "../../components/LayoutFooterExtended";
import { BsArrowRightCircle } from 'react-icons/bs';
import { RiArrowGoBackLine } from 'react-icons/ri';
import HomeButton from '../../components/HomeButton';
import { useRouter } from 'next/router'
import useSessionStorage from '../../hooks/useSessionStorage';
import { getCookie, hasCookie, getCookies } from 'cookies-next';
import ChoosableElement from "../../components/ChoosableElement";
import { useState, useEffect } from 'react'
import { Value } from "sass";

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
export default function AdvisorPage({ initialTitle, initialType }) {
    const prevPath = useSessionStorage('prevPath');
    const currentPath = useSessionStorage('currentPath');
    const router = useRouter();
    const [title, setTitle] = useState( initialTitle );
    const [bodyContent, setBodyContent] = useState();
    const [showWarning, setShowWarning] = useState( false );

    // type is the current type or the type which is supposed to be loaded. oldType is used while loading a new type
    // in order to define from which table the relations are drawn. So when i switch from LCP to CBM i have CBM as type
    // and LCP as oldType so i know that i need to take relations from LCPxCBM.
    //var type = initialType;
    //var oldType; // I can not set this with state, if i do the values dont get updated. i think its because there would be to many rerenders but im not sure.
    const [type, setType] = useState( initialType );
    const [oldType, setOldType] = useState( initialType );

    // For footer
    const [button1, setButton1] = useState( false );
    const [button2, setButton2] = useState( true );
    const [button3, setButton3] = useState( true );
    const [button4, setButton4] = useState( true );
    const [button1Active, setButton1Active] = useState();
    const [button2Active, setButton2Active] = useState();
    const [button3Active, setButton3Active] = useState();
    const [button4Active, setButton4Active] = useState();

    // Idea: keeps track of the routes visited before and allows to go back with footer
    const [history, setHistory] = useState([]);

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
        
        var cookie = getCookie( 'selected' );
        var itemSelected = false;
        
        // check if user selected at least one item from the list, if not display massage
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
            setShowWarning( true );
            return;
        }

        // All clear, user selected an item, disable showWarning in case it was shown before
        setShowWarning( false );
        setBodyContent( LoadingNotificaiton() );

        // Update history
        history.push( type );

        setOldType( type );

        // Tricker useEffect on setType completion
        switch( type ) {

            case "CBM":
                // The user started with CBM and is currently on the CBM page so the next page has to be LCP
                if( currentPath == "/advisor/CBM") {
                    setTitle("Lifecycle Phase Intensity");
                    setType("LCP");
                    break;
                } else { // User started with LCP and is already on second page
                    setTitle("Ecodesign Approaches");
                    setType("ED");
                    break;
                }

            case "LCP":
                if( currentPath == "/advisor/LCP") {
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
                setType("TDP");
                return; // TDP dosnt exit yet on the database.
        }

    }

    

    // State dosnt get updated immidiatly so i instead run this function everytime the state of type actually changes.
    useEffect( () => {
        
        var types = [ oldType, type ]

        // var selectedItems = getCookie('selected');
        
        // Filter the selected items by id, type is only used when checking if an item has been selected on this page
        var selectedItems = [];
        var cookie = getCookie( 'selected' );
        if( cookie )
        {
            cookie = JSON.parse(cookie);
            cookie.forEach( item => {
                selectedItems.push( item[0] );
            });
        }
        
        setFooterButtons();

        // If you go back with the footer buttons set oldtype = type in order to load the complete page instead of filtered result
        if (
            oldType == "ED" && type == "CBM" ||
            oldType == "ED" && type == "LCP" 
            // oldType == "TC" && type == "ED" ||
        ) {
            types = [ type, type ];
        }

        // API request for data retrival, selectedItems is not required / can be undefined.
        // https://nextjs.org/docs/basic-features/data-fetching/client-side
        fetch(`/api/descriptions/${types}?items=${ '[' + selectedItems + ']' }`)
        .then((res) => res.json())
        .then((data) => {

            if( selectedItems.length != 0 )
            {
                //selectedItems = JSON.parse( "[" + selectedItems + "]" )[0];
    
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

            // #TODO: wenn man durch den footer zurück geht werden aktivierte elemente nicht wieder markiert, abwohl active auf true gesetzt wird.
            // Bei refresh funkt es aber...
            setBodyContent(
                data['descriptions'].map(( item, index ) => (
                    <ChoosableElement 
                        //key={index}
                        id={item.id}
                        description={item.description}
                        name={item.name}
                        active={item.active}
                        type={type}
                    />
                    ))
                );
                    
            });

            // Shallow Routing
            router.push(`/advisor/${type}`, undefined, { shallow: true })

    }, [type] );

    function setFooterButtons()
    {
        // Set the footer buttons, true = disabled, footerButtonActive = current page marked in blue
        if( history.length == 0 ) { // = first page
            setButton1( false );
            setButton2( true );
            setButton3( true );
            setButton4( true );
            setButton1Active( "footerButtonActive" );
            setButton2Active();
            setButton3Active();
            setButton4Active();
        // = page 2
        } else if( history.length == 1 ) {
            setButton1( false );
            setButton2( false );
            setButton3( true );
            setButton4( true );
            setButton1Active();
            setButton2Active( "footerButtonActive" );
            setButton3Active();
            setButton4Active();
        }
        else if( history.length == 2 ) { 
            setButton1( false );
            setButton2( false );
            setButton3( false );
            setButton4( true );
            setButton1Active();
            setButton2Active();
            setButton3Active( "footerButtonActive" );
            setButton4Active();
        } else {
            setButton1( false );
            setButton2( false );
            setButton3( false );
            setButton4( false );
            setButton1Active();
            setButton2Active();
            setButton3Active();
            setButton4Active( "footerButtonActive" );
        }
    }

    // The index defined in the footer buttons stands for the index in the history array to which the user wants to jump to
    function footerNavigation( index )
    {
        // History only gets set when you exit the first page, if its not set do nothing
        if( history.length == 0 ) {
            return;
        }

        setBodyContent( LoadingNotificaiton() );

        // Set the old type to the old type from the history
        //setOldType( index > 0 ? history[index-1] : history[index] );

        var page = history[index];
        // Delete the history elements which came after the selected footer button history element
        for ( var i = index; i <= history.length; i++ )
        {
            history.splice(i);
        }
        
        // Tricker useEffect on setType completion
        switch( page )
        {
            case "CBM":
                setTitle("Circular Business Models");
                setType("CBM");
                break;
            case "LCP":
                setTitle("Lifecycle Phase Intensity");
                setType("LCP");
                break;
            case "ED":
                setTitle("Ecodesign Approaches");
                setType("ED");
                break;
            case "TDP":
                setTitle("Technical Design Principles");
                setType("TDP");
                break; // TDP dosnt exit yet on the database.
        }

    }

    function Footer()
    {
        return(
            <div>

            <Navbar className='footer'> {/*justify-content-center*/}
                <Nav>
                <Button onClick={ () => router.back() } className="backButton">
                    <RiArrowGoBackLine size={45} color="grey" />
                </Button>
                </Nav>

                <Nav className='mx-auto'>
                    <Button onClick={ () => router.push("/process") } className="footerButton" />
                    <Button onClick={ () => footerNavigation( 0 ) } className={"footerButton " + button1Active} disabled={button1} />
                    <Button onClick={ () => footerNavigation( 1 ) } className={"footerButton " + button2Active} disabled={button2} />
                    <Button onClick={ () => footerNavigation( 2 ) } className={"footerButton " + button3Active} disabled={button3} />
                    <Button onClick={ () => footerNavigation( 3 ) } className={"footerButton " + button4Active} disabled={button4} />
                </Nav>

                <Nav className='ml-auto'>
                <HomeButton className="nav-item" size="small" />
                </Nav>
            </Navbar>
            </div>
        );
    }
    
    // JSX body
    return(
        <div className="advisorPage">
            <Col className="mainCol">
                
            <h1>{title}</h1>

            <Alert color="warning" style={{visibility: showWarning ? 'visible' : 'hidden' }}>
                You must select at least 1 item from the list.
            </Alert>
            
            <div>{bodyContent}</div>

            </Col>
            <Col className="d-flex justify-content-center buttonCol">
                <Button onClick={() => loadNextPage()} className="standardButton nextButton">
                    Continue
                    <BsArrowRightCircle className="icon" size={30}/>
                </Button>      
            </Col>

            <Footer />

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