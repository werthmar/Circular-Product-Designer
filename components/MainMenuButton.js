/**
 * Big Panel Button used on the index page
 * input:
 * string text -> the text which is displayed beneath the icon on the button.
 * string icon -> 1,2,3,4 used to decide which icon should be displayed.
 * string link -> e.g. /process the page the buttonpress will lead to.
 *  icons have to be imported and added in the icon function
 */

import { Button, Col } from "reactstrap";
import Link from 'next/link';
import { AiFillBook } from 'react-icons/ai';
import { GiBookshelf } from 'react-icons/gi';
import { FiSettings } from 'react-icons/fi';
import { HiDocumentText } from 'react-icons/hi';

 //import React from 'react';
 const MainMenuButton = (props) => {

    function Icon({ icon }) {
        switch( icon ) {
            case '1':
                return <AiFillBook size={100} />
            case '2':
                return <HiDocumentText size={100} />
            case '3':
                return <GiBookshelf size={100} />
            case '4':
                return <FiSettings size={100} />
        }
    }

    return(
        <Button className="MainMenuButton">
            <Link href={props.link}>
                <Col className="icon">
                    <Icon icon={props.icon} />
                </Col>
                <Col className="text">
                    {props.text}
                </Col>
            </Link>
        </Button>
    )
 }

 export default MainMenuButton;