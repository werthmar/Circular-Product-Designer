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
    const mobileLayout = props.mobileLayout;
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

    // New version which isnt using scss, old version is still used in desktop layout, new version in mobile.
    // returns direct image source based on title
    const getBackgroundImage = () =>
    {
        var h1Text = name.toUpperCase();

        switch (h1Text) {
            case "RAW MATERIAL INTENSIVE PRODUCT":
                return "/images/LCI/Icon_raw_material_intensive.png";
            case "MANUFACTURING INTENSIVE PRODUCTS":
                return "/images/LCI/Icon_manufacturing_intensive.png";
            case "DISTRIBUTION INTENSIVE PRODUCTS":
                return "/images/LCI/Icon_distribution_intensive.png";
            case "USE INTENSIVE PRODUCTS":
                return "/images/LCI/Icon_use_intensive.png";
            case "DISPOSAL INTENSIVE PRODUCTS" || "REUSE & REDESTRIBUTION":
                return "/images/LCI/Icon_disposal_intensive.png";
            case "REUSABILITY" || "REMANUFACTURING & REFURBISH" || "POSSIBILITY OF MAINTENANCE AND REFURBISHMENT" || "POSSIBILITY OF MAINTENANCE" || "MAINTENANCE / REFURBISHMENT":
                return "/images/CBM/CBM_Icons-reuse.png";
            case "RECYCLING, UPCYCLING":
                return "/images/CBM/CBM_Icons_Recycling.png";
            case "INDUSTRIAL SYMBIOSIS":
                return "/images/CBM/CBM_Icons-Industrial_symbiosis.png";
            case "CIRCULAR SUPPLIES":
                return "/images/CBM/CBM_Icons-circular_supplies.png";
            case "DIGITALISATION":
                return "/images/CBM/CBM_Icons-digitalization.png";
            case "SHARING, P2P":
                return "/images/CBM/CBM_Icons-sharing.png";
            case "PSS":
                return "/images/CBM/CBM_Icons-PSS.png";
            case "REPAIR & MAINTANANCE" || "REPAIRABILITY":
                return "/images/CBM/CBM_Icons-repair.png";
            case "GAP EXPLOITER":
                return "/images/CBM/CBM_Icons-Gap_Exploiter.png";
            case "UPGRADING":
                return "/images/CBM/CBM_Icons-upgrading.png";
            default:
                return "/images/CBM/CBM_Icons-sharing.png";
        }
    }


    if(mobileLayout)
    {
        return(
            <div>

                <div className="flex items-center justify-center text-center h-28" style={{ backgroundColor: color }}>

                    {/* Expanded indicator */}
                    <div class="flex-initial w-28">
                        <div className="arrowIcon"
                            onClick={() => handleClick()}>
                            <Image
                            class={
                                `transform transition-transform duration-500
                                ${descriptionVisible ? 'rotate-[270deg]' : 'rotate-90'}`
                            }
                            src="/icons/arrow_black_left.png"
                            style={{display: 'inline-block' }}
                            alt="expansion indicator"
                            width={50}
                            height={30}
                            />
                        </div>
                    </div>
                
                    {/* Title */}
                    <div className="flex-auto w-60">
                        <Col onClick={() => handleClick()}>
                            <p className="text-xl hyphenated">{name.toUpperCase()}</p>
                        </Col>
                    </div>
                
                    {/* Checkmark Button */}
                    <div class="flex-initial w-32 h-full" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)'}}>
                        <div className="flex items-center justify-center h-full buttonCol" onClick={() => selectItem()}>
                            <Image
                            src={clicked ? "/icons/checkbox_checked.png" : "/icons/checkbox_unmarked.png"}
                            width={120}
                            height={85}
                            alt="checkbox_unchecked"
                            />
                        </div>
                    </div>

                    <div class="flex-initial w-24">
                        <Col onClick={() => handleClick()}>
                            <h1 class="rotated-text mobile-totated-text">CHOOSE</h1>
                        </Col>
                    </div>
                
                </div>

                {/** Description */}
                <div className={`mobileDescription transition-max-height duration-700 ease-in-out overflow-hidden ${descriptionVisible ? 'max-h-[500px]' : 'max-h-0'} bg-white`}
                >

                    {/*
                    <h2>{name.toUpperCase()}</h2>
                    <br/>
                    */}
                        <p class="p-8 mt-0.5 bg-no-repeat bg-cover bg-center h-full w-full" style={{ backgroundColor: color, backgroundImage: `url(${getBackgroundImage()})`}}>
                            {description}
                        </p>
                
                </div>

            </div>

        );
    }
    // PC / Ipad
    else
    {
        return(
            <Col className={ descriptionVisible ? "choosableElement col-6" : "choosableElement"} 
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

}