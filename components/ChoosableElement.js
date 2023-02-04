// The clickable element displaying text aswell as the onClick function which saves data to a cookie
import { useState } from "react";
import { setCookie, getCookie, hasCookie, deleteCookie } from 'cookies-next';
import { Button, Col, Row } from "reactstrap";
import { ImCheckmark2 } from 'react-icons/im';

export default function ChoosableElement(props) {

    const [clicked, setClicked] = useState(false);
    const id = props.id;
    const description = props.description;
    const name = props.name;

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
                    <h2>{name}</h2>
                </Col>
                <Col>
                    <p>{description}</p>
                </Col>
            </Col>
        </Row> 
    );    
}