import React from 'react';
import { useState, useEffect } from 'react'
import { Button, Col, Container, List, Nav, Navbar, Alert, Row } from "reactstrap";
import Link from "next/link";
import Image from "next/image";
import { RiArrowGoBackLine } from 'react-icons/ri';
import { BsArrowBarLeft, BsArrowBarRight } from 'react-icons/bs';
import { Tooltip } from '@mui/material';

export default class CustomNavbarButtonsOnly extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return(
            <Col className='CustomNavbar col-1'>
                <Container  fluid>
                    <Row xs="2">

                        {/* --- Main Navbar with page buttons ------------------------------------------------ */}
                        <Col className='buttonCol col-12'>
                                    
                                    {/* Home button */}
                                    <Col>
                                        <Tooltip arrow title="Home">
                                            <Link href="/home">
                                                <Button className='homeButton'>
                                                    <Image src="/icons/Menü_Haus.png" width={65} height={55} alt='HomeButton' />
                                                </Button>
                                            </Link>
                                        </Tooltip>
                                    </Col>

                                    {/* Page Buttons */}
                                    <Col>
                                        <Col>
                                            <Button className='navbarButton' style={{ backgroundColor: 'lightGrey' }} />
                                        </Col>
                                        <Col>
                                            <Button className='navbarButton' disabled />
                                        </Col>
                                        <Col>
                                            <Button className='navbarButton' disabled />
                                        </Col>
                                        <Col>
                                            <Button className='navbarButton' disabled />
                                        </Col>
                                        <Col>
                                            <Button className='navbarButton' disabled />
                                        </Col>
                                        <Col>
                                            <Button className='navbarButton' disabled />
                                        </Col>
                                    </Col>

                                    {/* Back Buttons */}
                                    <Col>
                                        <Tooltip arrow title="Back">
                                            <div>
                                                <Button onClick={ () => this.props.back() } className="backButton">
                                                    <RiArrowGoBackLine size={45} color="grey" />
                                                </Button>
                                            </div>
                                        </Tooltip>
                                    </Col>


                        </Col>

                    </Row>
                </Container>
            </Col>
        );
    }
}
