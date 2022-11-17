import React, { useState } from 'react';
import {
  Nav,
  Navbar,
  Button,
} from 'reactstrap';
import HomeButton from './HomeButton';


function Footer(args) {

  function FooterButton({ active }) {
    return(
      <Button className={"footerButton " + active} />
    )
  }

  return (
      <Navbar className='footer'> {/*justify-content-center*/}
          <Nav className='mx-auto'>
            <FooterButton active="footerButtonActive" />
            <FooterButton />
            <FooterButton />
            <FooterButton />
          </Nav>
          <Nav className='ml-auto'>
            <HomeButton className="nav-item" size="small" />
          </Nav>
      </Navbar>
  );
}

export default Footer;