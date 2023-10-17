import { InputGroup, Input, Button } from 'reactstrap';
import { useState } from 'react';
import { checkPassword } from './_app';
import { setCookie, getCookie, hasCookie, deleteCookie } from 'cookies-next';
import Router from 'next/router';

export default function Authentication() 
{
    const [message, setMessage] = useState('');
    const [notification, setNotification] = useState('');
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

    return(
        <div style={{ width: '100%', height: '100%', paddingTop: '50px', textAlign: 'center' }}>
            <h1>Please enter the password to access the website.</h1>
            <InputGroup style={{ maxWidth: '70%', margin: 'auto', paddingTop: '20px' }}>
                <Input
                type="password"
                id="message"
                name="message"
                onChange={handleChange}
                value={message}
                />
                <Button onClick={ handleClick }>
                  Unlock Website
                </Button>
            </InputGroup>
            <p>{ notification }</p>
        </div>
    )
} 