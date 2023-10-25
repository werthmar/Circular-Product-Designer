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
                                    <Image src={ descriptionVisible ? "/icons/arrow_white_right.png" : "/icons/arrow_black_left.png" } alt="expansion indicator" width={60} height={35} />
                                </div>

                            </Row>
                        </Container>



                    </Col>

                    {/* Description which can be opened on click */}
                    <Col className="description" style={{display: descriptionVisible ? 'inline-block' : 'none' }} onClick={() => handleClick()}>

                        <h2>{name.toUpperCase()}</h2>
                        <br/>
                        
                        <p>{description}</p>
                        
                    </Col>

                </Row>
            </Container>    
        </Col>
    );

}