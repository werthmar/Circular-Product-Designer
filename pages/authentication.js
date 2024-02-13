import { InputGroup, Input, Button } from 'reactstrap';
import { checkPassword } from './_app';
import { setCookie, getCookie, hasCookie, deleteCookie } from 'cookies-next';
import Router from 'next/router';
import Image from 'next/image';
import banner from "../public/images/Banner_Coming_soon.jpg";
import bannerMobile from "../public/images/Banner_Smartphone.jpg";
import LinkedInIcon from "/public/icons/LinkedInIcon.png";
import { Link } from '@mui/material';
import React, { useState, useEffect } from 'react';

export default function Authentication() 
{
    const [message, setMessage] = useState('');
    const [notification, setNotification] = useState('');
    const [bannerVisible, setBannerVisible] = useState(true);
    const router = Router;
    const [windowWidth, setWidth] = useState(window.innerWidth);

    // Detecs and updates window width, is used to display diffrent banner images depending on the device / size
    useEffect(() => {
        const handleResize = () => {
          setWidth(window.innerWidth);
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

    const handleChange = (event) => {
        setMessage(event.target.value);
    };

    const handleClick = () => {
        // 👇 "message" stores input field value
        console.log(message);
        var result = checkPassword(message);
        console.log(result);

        if ( result == true ) {
            setCookie('authentication', 'true', { sameSite: true });
            router.push('/');
        } else {
            setNotification("Wrong Password, try again.");
        }

    };

    // The Overlay that displays WorkInProgress and Information
    function BannerOverlay() {
        return(
            <div className="banner" style={{
                position: "absolute",
                zIndex: "1",
                width: "100%",
                height: "100%",
                top: "0",
                backgroundColor: "rgba(189, 189, 189, 0.565)",
                backdropFilter: "blur(6px)"
                }}>

                {/* X Button to close the Banner */}
                <Button
                    style={{
                        zIndex: "3",
                        position: "absolute",
                        fontSize: "30px",
                        backgroundColor: "transparent",
                        border: "none",
                        color: "grey",
                        fontWeight: "bold",
                        right: "30px",
                    }}
                    onClick={ () => setBannerVisible(false) }
                    >
                    X
                </Button>
                
                {/* Linkedin Button */}
                <a href='https://www.linkedin.com/company/inec-pforzheim/'>
                    <Image
                        style={ windowWidth >= 500 ? {
                            zIndex: "3",
                            position: "absolute",
                            bottom: "80px",
                            right: "80px"
                        } :
                        {
                            zIndex: "3",
                            position: "absolute",
                            margin: "auto",
                            bottom: "45px",
                            marginLeft: "-20px"
                        }
                        } 
                        src={LinkedInIcon}
                        width={60}
                        height={60}
                    />
                </a>
                
                <Image 
                    src={ windowWidth <= 500 ? bannerMobile : banner}
                    alt='Banner WorkInProgress'
                    fill={true}
                    priority={true}
                    objectFit='cover'
                    />
            </div>
        );
    }

    return(
        <div style={{ width: '100%', height: '100%', paddingTop: '50px', textAlign: 'center' }}>
            
            { bannerVisible ? <BannerOverlay /> : null }

            <h1>Please enter the password to access the website.</h1>
            
            <InputGroup style={{ maxWidth: '70%', margin: 'auto', paddingTop: '20px' }}>
                <Input
                type="password"
                id="message"
                name="message"
                onChange={handleChange}
                value={message}
                />
                <Button
                style={{zIndex: "0"}} 
                onClick={ handleClick }>
                  Unlock Website
                </Button>
            </InputGroup>
            <p>{ notification }</p>
        </div>
    )
} 