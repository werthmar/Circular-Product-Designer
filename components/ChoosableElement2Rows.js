// The clickable element displaying text aswell as the onClick function which saves data to a cookie
import React from "react";
import { useState, useEffect } from "react";
import { setCookie, getCookie, hasCookie, deleteCookie } from 'cookies-next';
import { ImCheckmark2 } from 'react-icons/im';
import { Button, Col, Container, List, Nav, Navbar, Alert, Row } from "reactstrap";
import Image from "next/image";

export default function ChoosableElement2Rows(props) {

    const [clicked, setClicked] = useState( props.active );
    const [clicked2, setClicked2] = useState( props.active2 );
    const id = props.id;
    const id2 = props.id2;
    const description = props.description;
    const description2 = props.description2;
    const name = props.name;
    const name2 = props.name2;
    const type = props.type;
    const color = props.color;
    const color2 = props.color2;
    const enableNextPageButton = props.enableNextPageButton;
    const toggleNavbar = props.toggleNavbar;
    // Display the item description
    const [descriptionVisible, setDescriptionVisible] = useState(false);
    const [descriptionVisible2, setDescriptionVisible2] = useState(false);

    // Save selected item in cookie or delete it out of the cookie
    function selectItem( buttonNumber ) {
        if( !clicked && buttonNumber == 1 || !clicked2 && buttonNumber == 2 ) {
                        
            // Check if cookie has already been created if yes append data, otherwise create a new
            if ( hasCookie('selected') ) {
                let data = getCookie('selected');
                data = JSON.parse(data);

                // Differentiate between which button was pressed
                if( buttonNumber == 1 ) {
                    data.push( [id, type] );
                } else {
                    data.push( [id2, type] );
                }
                
                setCookie('selected', data, { sameSite: true });
            } else {
                buttonNumber == 1 ? setCookie('selected', [ [id, type] ], { sameSite: true }) : setCookie('selected', [ [id2, type] ], { sameSite: true });
            }

            buttonNumber == 1 ? setClicked(true) : setClicked2(true);
            enableNextPageButton(); // callback to advisor page, advisor counts if at least one item is selected and the sets the go on button to active
        }
        else {
            // For some random reaseon the variable gets changed to data1 internaly so i have to change it here to idk why
            let data1 = getCookie('selected');
            data1 = JSON.parse(data1);
            
            if( buttonNumber == 1 )
            {
                // Delete deselected item from the data and update the cookie
                data1.forEach( x => {
                    if( x[0]  == id ) {
                        data1.splice(data1.indexOf(x), 1) // Remove the x element and only do it once
                    } 
                });
            }
            else {
                // Delete deselected item from the data and update the cookie
                data1.forEach( x => {
                    if( x[0]  == id2 ) {
                        data1.splice(data1.indexOf(x), 1) // Remove the x element and only do it once
                    } 
                });
            }
            
            if ( data1.length != 0 ) {
                setCookie('selected', data1, { sameSite: true });
            }else {
                deleteCookie('selected'); // Remove the empty cookie
            }
            
            buttonNumber == 1 ? setClicked(false) : setClicked2(false);
            enableNextPageButton();
        }

    } 
    

    function handleClick ( elementNumber ) {

        if( elementNumber == 1 && descriptionVisible || elementNumber == 1 && !descriptionVisible ) {
            toggleNavbar( !descriptionVisible, toggleDescription );
            setDescriptionVisible( !descriptionVisible );
        } else if ( elementNumber == 2 && descriptionVisible2 || elementNumber == 2 && !descriptionVisible2 ) {
            toggleNavbar( !descriptionVisible2, toggleDescription2 );
            setDescriptionVisible2( !descriptionVisible2 );
        } else if( elementNumber == 1 && descriptionVisible2 ) { // e.g. description 2 is already open and user opens description 1
            toggleNavbar( !descriptionVisible, toggleDescription );
            setDescriptionVisible( !descriptionVisible );
            setDescriptionVisible2( !descriptionVisible2 ); // close desc2
        } else if( elementNumber == 2 && descriptionVisible ) {
            toggleNavbar( !descriptionVisible2, toggleDescription2 );
            setDescriptionVisible2( !descriptionVisible2 );
            setDescriptionVisible( !descriptionVisible );
        }

    }
    
    function toggleDescription() {
        setDescriptionVisible( false );
    }
    function toggleDescription2() {
        setDescriptionVisible2( false );
    }

    const setBackgroundBasedOnH1 = (h1Text) => {

        let help = h1Text;
        help = help.split(" ")
        
        // Je nach Text des h1-Elements das entsprechende Hintergrundbild auswählen
        if (h1Text === "GAP\nEXPLOITER") {
            if (descriptionVisible2 == true) return "description_Industrial_Symbiosis";
            return "description_Gap_Exploiter";
        } else if (h1Text === "LONG LASTING\nPRODUCT\nDESIGN") {
            if (descriptionVisible2 == true) return "description_circular_supplies";
            return "description_LLPD";
        } else if (h1Text === "PSS") {
            if (descriptionVisible2 == true) return "description_Remanufacturing" 
            return "description_PSS";
        } else if (h1Text === "REPAIR &\nMAINTANANCE") {
            if (descriptionVisible2 == true) return "description_Recycling";
            return "description_Industrial_Repair";
        } else if (h1Text === "SHARING, P2P") {
            if (descriptionVisible2 == true) return "description_Reuse" 
            return "description_sharing";
        } else if (h1Text === "DURABILITY") {
            // hier fehlen die richtigen Bilder
            if (descriptionVisible2 == true) return "description_circular_supplies";
            return "description_LLPD";
        } else if (h1Text === "RELIABILITY") {
            // hier fehlen die richtigen Bilder
            if (descriptionVisible2 == true) return "description_Remanufacturing" 
            return "description_PSS";
        } else if (h1Text === "REUSABILITY") {
            if (descriptionVisible2 == true) return "description_Recycling";
            return "description_Reuse";
        } else if (h1Text === "REPAIRABILITY") {
            if (descriptionVisible2 == true) return "description_Recycling" 
            return "description_Industrial_Repair";
        } else if (h1Text === "POSSIBILITY\nOF\nMAINTENANCE\nAND\nREFURBISHMENT") {
            // hier fehlen die richtigen Bilder
            if (descriptionVisible2 == true) return "description_Reuse" 
            return "description_sharing";
        }
        // Fügen Sie hier weitere Bedingungen für die anderen Bilder hinzu
        else {
            return "description_Recycling"; // Wenn kein passender Text gefunden wurde, kein Hintergrundbild anzeigen
        }
    };


    //name = name.replace(/(.{8})/g, "$1\n");
    //document.getElementsByName("descriptionRow col-7 row").backgroundImage = 'url("../public/images/CBM/CBM_Icons-sharing.png")';
    return(

            <Row className={ descriptionVisible || descriptionVisible2 ? "descriptionRow col-7" : "descriptionRow col d-flex" }>

                <Row className={ descriptionVisible || descriptionVisible2 ? "twoElementRow col-3" : "twoElementRow" }>

                    {/* Upper Choosable Element */}
                    <Col className="choosableElement2Row col-12" 
                        //xs={descriptionVisible ? "8" : "3"} 
                        //md={descriptionVisible ? "5" : "2"} 
                        //xxl={descriptionVisible ? "4" : "1"}
                        style={{ backgroundColor: color }}
                        >
                        <Container fluid>
                            <Row>
                                
                                {/* Bar */}
                                <Col>

                                    <Container fluid>
                                        <Row xs={1}>
                                            
                                            <container/>

                                            <Col onClick={() => handleClick(1)}>
                                                <h1>CHOOSE</h1>
                                            </Col>

                                            {/* Checkmark Button */}
                                            <Col className="buttonCol" onClick={ () => selectItem(1) }>
                                                <Image src={ clicked ?  "/icons/checkbox_checked.png" : "/icons/checkbox_unmarked.png" }
                                                width={100}
                                                height={65}
                                                alt="checkbox_unchecked"
                                                />
                                            </Col>

                                            {/* Rotatet Title */}
                                            <Col onClick={() => handleClick(1)}>
                                                <p className="rotated-text">{name.toUpperCase()}</p>
                                            </Col>
                                    
                                            {/* Expanded indicator */}
                                            <div className="arrowIcon" onClick={() => handleClick(1)}>
                                                <Image src="/icons/arrow_black_left.png" style={{display: descriptionVisible ? 'none' : 'inline-block' }} alt="expansion indicator" width={60} height={35} />
                                            </div>

                                        </Row>
                                    </Container>

                                </Col>

                            </Row>
                        </Container>    
                    </Col>
                    
                    {/* Lower Choosable Element */}
                    <Col className="choosableElement2Row col-12" 
                        //xs={descriptionVisible ? "8" : "3"} 
                        //md={descriptionVisible ? "5" : "2"} 
                        //xxl={descriptionVisible ? "4" : "1"}
                        style={{ backgroundColor: color2 }}
                        >
                        <Container fluid>
                            <Row>
                                
                                {/* Bar */}
                                <Col>

                                    <Container fluid>
                                        <Row xs={1}>

                                            <container/>

                                            <Col onClick={() => handleClick(2)}>
                                                <h1>CHOOSE</h1>
                                            </Col>

                                            {/* Checkmark Button */}
                                            <Col className="buttonCol" onClick={ () => selectItem(2) }>
                                                <Image src={ clicked2 ?  "/icons/checkbox_checked.png" : "/icons/checkbox_unmarked.png" }
                                                width={100}
                                                height={65}
                                                alt="checkbox_unchecked"
                                                />
                                            </Col>

                                            {/* Rotatet Title */}
                                            <Col onClick={() => handleClick(2)}>
                                                <p className="rotated-text">{name2.toUpperCase()}</p>
                                            </Col>
                                    
                                            {/* Expanded indicator */}
                                            <div className="arrowIcon" onClick={() => handleClick(2)}>
                                                <Image src="/icons/arrow_black_left.png" style={{display: descriptionVisible2 ? 'none' : 'inline-block' }} alt="expansion indicator" width={60} height={35} />
                                            </div>

                                        </Row>
                                    </Container>

                                </Col>

                            </Row>
                        </Container>    
                    </Col>
        
                </Row>

                {/* Description which can be opened on click */}
                <Col className={setBackgroundBasedOnH1(name.toUpperCase())} style={{display: descriptionVisible ? 'inline-block' : 'none', backgroundColor: color,'--custom-background-image': 'url("../public/images/CBM/CBM_Icons-sharing.png")',}} onClick={() => handleClick(1)}>
                    
                    <container/>
                    <h2>{name.toUpperCase()}</h2>
                    <br/>
                    <p>{description}</p>

                    {/* Expanded indicator */}
                    <div className="arrowIconClose" onClick={() => handleClick()}>
                        <Image src="/icons/arrow_white_right.png" alt="expansion indicator" width={60} height={35} />
                    </div>
                </Col>

                <Col className={setBackgroundBasedOnH1(name.toUpperCase())} style={{display: descriptionVisible2 ? 'inline-block' : 'none', backgroundColor: color2, '--custom-background-image': `url("../public/images/CBM/CBM_Icons-sharing.png")`}} onClick={() => handleClick(2)}>
                    <container/>
                    <h2>{name2.toUpperCase()}</h2>
                    <br/>
                    <p>{description2}</p>
                </Col>

                {/* Expanded indicator */}
                <div className="arrowIconClose" onClick={() => handleClick()}>
                    <Image src="/icons/arrow_white_right.png" alt="expansion indicator" width={60} height={35} />
                </div>

            </Row>

    );

}