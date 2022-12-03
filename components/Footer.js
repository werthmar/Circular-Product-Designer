import React, { useState } from 'react';
import {
  Nav,
  Navbar,
  Button,
} from 'reactstrap';
import HomeButton from './HomeButton';
import { useRouter } from 'next/router'
import { RiArrowGoBackLine, RiEyeCloseFill } from 'react-icons/ri';
import useSessionStorage from '../hooks/useSessionStorage';

function Footer(args) {
  const router = useRouter();
  const prevPath = useSessionStorage('prevPath');
  const currentPath = useSessionStorage('currentPath');

  function FooterButtons() {

    if( currentPath == "/process") {
      return(
        <Nav className='mx-auto'>
          <Button href={currentPath} passHref className="footerButton footerButtonActive" />
          <Button className="footerButton" disabled />
          <Button className="footerButton" disabled />
          <Button className="footerButton" disabled />
        </Nav>
      );
    }
    else if( currentPath == "/advisor/circular" || currentPath == "/advisor/product" ) {
      return(
        <Nav className='mx-auto'>
          <Button href="/process" passHref className="footerButton" />
          <Button href={currentPath} className="footerButton footerButtonActive" />
          <Button className="footerButton" disabled />
          <Button className="footerButton" disabled />
        </Nav>
      );
    } else if( currentPath == "/advisor/ecodesign" ) {
      return(
        <Nav className='mx-auto'>
          <Button href="/process" passHref className="footerButton" />
          <Button href={prevPath} passHref className="footerButton" />
          <Button href={currentPath} passHref className="footerButton footerButtonActive" />
          <Button href="/process" passHref className="footerButton" disabled />
        </Nav>
      );
    } else {
      return( // Routing only back to circular and from there to product, circular and product are same button, mb change in future
        <Nav className='mx-auto'>
          <Button href="/process" passHref className="footerButton" />
          <Button href="/advisor/circular" passHref className="footerButton" />
          <Button href={prevPath} passHref className="footerButton" />
          <Button href={currentPath} passHref className="footerButton footerButtonActive" />
        </Nav>
      );
    }

  }

  return (
      <Navbar className='footer'> {/*justify-content-center*/}
          <Nav>
            <Button onClick={ () => router.back() } className="backButton">
              <RiArrowGoBackLine size={45} color="grey" />
            </Button>
          </Nav>
          <FooterButtons />
          <Nav className='ml-auto'>
            <HomeButton className="nav-item" size="small" />
          </Nav>
      </Navbar>
  );
}

export default Footer;