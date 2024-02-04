// The clickable element displaying text aswell as the onClick function which saves data to a cookie
import React from "react";
import { useState, useEffect } from "react";
import { setCookie, getCookie, hasCookie, deleteCookie } from 'cookies-next';
import { ImCheckmark2 } from 'react-icons/im';
import { Button, Col, Container, List, Nav, Navbar, Alert, Row } from "reactstrap";
import Image from "next/image";

export default function ChoosableElement(props) {

    const [clicked, setClicked] = useState( props.active );
    const id = props.id;
    const description = props.description;
    const name = props.name;
    const type = props.type;
    const color = props.color;
    const enableNextPageButton = props.enableNextPageButton;
    const toggleNavbar = props.toggleNavbar;
    // Display the item description
    const [descriptionVisible, setDescriptionVisible] = useState(false);

    // Save selected item in cookie or delete it out of the cookie
    function selectItem() {
        if( !clicked ) {
                        
            // Check if cookie has already been created if yes append data, otherwise create a new
            if ( hasCookie('selected') ) {
                let data = getCookie('selected');
                data = JSON.parse(data);

                data.push( [id, type] );
                setCookie('selected', data, { sameSite: true });
            } else {
                setCookie('selected', [ [id, type] ], { sameSite: true });
            }

            setClicked(true);
            enableNextPageButton(); // callback to advisor page, advisor counts if at least one item is selected and the sets the go on button to active
        }
        else {
            // For some random reaseon the variable gets changed to data1 internaly so i have to change it here to idk why
            let data1 = getCookie('selected');
            data1 = JSON.parse(data1);
            
            // Delete deselected item from the data and update the cookie
            data1.forEach( x => {
                if( x[0]  == id ) {
                    data1.splice(data1.indexOf(x), 1) // Remove the x element and only do it once
                } 
            });
            
            if ( data1.length != 0 ) {
                setCookie('selected', data1, { sameSite: true });
            }else {
                deleteCookie('selected'); // Remove the empty cookie
            }
            
            setClicked(false);
            enableNextPageButton();
        }

    } 
    

    function handleClick () {
        toggleNavbar( !descriptionVisible, toggleDescription );
        setDescriptionVisible( !descriptionVisible );
    }
    
    function toggleDescription() {
        setDescriptionVisible( false );
    }



    const setBackgroundBasedOnH1 = (h1Text) => {

        let help = h1Text;
        help = help.split(" ")

        // Je nach Text des h1-Elements das entsprechende Hintergrundbild auswählen
        if (h1Text === "RAW MATERIAL INTENSIVE PRODUCT") {
            return "description_raw_material";
        } else if (h1Text === "MANUFACTURING INTENSIVE PRODUCTS") {
            return "description_manufacturing";
        } else if (h1Text === "DISTRIBUTION INTENSIVE PRODUCTS") {
            return "description_distribution";
        } else if (h1Text === "USE INTENSIVE PRODUCTS") {
            return "description_use";
        } else if (h1Text === "DISPOSAL INTENSIVE PRODUCTS") {
            return "description_disposal";
        } else if (h1Text === "REUSE & REDESTRIBUTION" || h1Text === "REUSABILITY") {
            return "description_reuse";
        } else if (h1Text === "REMANUFACTURING & REFURBISH" || h1Text === "POSSIBILITY OF MAINTENANCE AND REFURBISHMENT"
        || h1Text === "POSSIBILITY OF MAINTENANCE" || h1Text === "MAINTENANCE / REFURBISHMENT") {
            return "description_remanufacturing";
        } else if (h1Text === "RECYCLING, UPCYCLING") {
            return "description_recycling";
        } else if (h1Text === "INDUSTRIAL SYMBIOSIS") {
            return "description_symbiosis";
        } else if (h1Text === "CIRCULAR SUPPLIES") {
            return "description_circular";
        } else if (h1Text === "DIGITALISATION") {
            return "description_digitalization";
        } else if (h1Text === "SHARING, P2P") {
            return "description_sharing";
        } else if (h1Text === "PSS") {
            return "description_pss";
        } else if (h1Text === "REPAIR & MAINTANANCE" || h1Text === "REPAIRABILITY") {
            return "description_repair";
        } else if (h1Text === "GAP EXPLOITER") {
            return "description_gap";
        } else if (h1Text === "UPGRADING") {
            return "description_upgrading";
        }
        // Fügen Sie hier weitere Bedingungen für die anderen Bilder hinzu
        else {
            return "description_raw_material"; // Wenn kein passender Text gefunden wurde, kein Hintergrundbild anzeigen
        }
    };



    return(
        <Col className={ descriptionVisible ? "choosableElement col-7" : "choosableElement"} 
            //xs={descriptionVisible ? "8" : "3"} 
            //md={descriptionVisible ? "5" : "2"} 
            //xxl={descriptionVisible ? "4" : "1"}
            style={{ backgroundColor: color }}
            >
            <Container fluid>
                <Row>
                    
                    {/* Bar */}
                    <Col className={descriptionVisible ? "col-3" : ""} >

                        <Container fluid>
                            <Row xs={1}>

                                <container/>
                        
                                <Col onClick={() => handleClick()}>
                                    <h1>CHOOSE</h1>
                                </Col>

                                {/* Checkmark Button */}
                                <Col className="buttonCol" onClick={ () => selectItem() }>
                                    <Image src={ clicked ?  "/icons/checkbox_checked.png" : "/icons/checkbox_unmarked.png" }
                                    width={100}
                                    height={65}
                                    alt="checkbox_unchecked"
                                    />
                                </Col>

                                {/* Rotatet Title */}
                                <Col onClick={() => handleClick()}>
                                    <p className="rotated-text">{name.toUpperCase()}</p>
                                </Col>
                        
                                {/* Expanded indicator */}
                                <div className="arrowIcon" onClick={() => handleClick()}>
                                    <Image src="/icons/arrow_black_left.png" style={{display: descriptionVisible ? 'none' : 'inline-block' }} alt="expansion indicator" width={60} height={35} />
                                </div>

                            </Row>
                        </Container>



                    </Col>

                    {/* Description which can be opened on click */}
                    <Col className={setBackgroundBasedOnH1(name.toUpperCase())} style={{display: descriptionVisible ? 'inline-block' : 'none' }} onClick={() => handleClick()}>
                        <container/>
                        <h2>{name.toUpperCase()}</h2>
                        <br/>
                        <p>{description}</p>
                        
                        {/* Expanded indicator */}
                        <div className="arrowIconClose" onClick={() => handleClick()}>
                            <Image src="/icons/arrow_white_right.png" alt="expansion indicator" width={60} height={35} />
                        </div>
                    </Col>

                </Row>
            </Container>    
        </Col>
    );

}