import { InputGroup, Input, Button } from 'reactstrap';
import { useState } from 'react';
import { checkPassword } from './_app';
import { setCookie, getCookie, hasCookie, deleteCookie } from 'cookies-next';
import Router from 'next/router';
import Image from 'next/image';
import banner from "../public/images/Banner_Coming_soon.png";

export default function Authentication() 
{
    const [message, setMessage] = useState('');
    const [notification, setNotification] = useState('');
    const [bannerVisible, setBannerVisible] = useState(true);
    const router = Router;

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

                <Button
                    style={{
                        zIndex: "3",
                        position: "absolute",
                        fontSize: "50px",
                        backgroundColor: "transparent",
                        border: "none",
                        color: "black",
                        fontWeight: "bold",
                        right: "30px",
                    }}
                    onClick={ () => setBannerVisible(false) }
                    >
                    X
                </Button>
                
                <Image 
                    src={banner}
                    alt='Banner WorkInProgress'
                    fill={true}
                    priority={true}
                    objectFit='contain'
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