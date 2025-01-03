// page for testing out new design
import React from "react";
import { Button, Col, Container, List, Nav, Navbar, Alert, Row } from "reactstrap";
import { useState } from "react";
import Image from "next/image";
import CustomNavbar from "../components/Navbar";
import { BsArrowRight } from 'react-icons/bs';
import Watermark from "../components/watermark";

export default function IndexPage()
{
   

    return(
        <div className="indexPage">

            <div className="watermark">
                <Watermark visible={true} />
            </div>

            <div className="greyBox">
                <p>Decision <br/> Support <br/> Tool</p>
            </div>

            <div className="bigBallContainer">
                <Image 
                    src={"/images/Kugel.png"}
                    width={700}
                    height={700}
                />
            </div>

            <div className="logoContainer">
                <Image 
                    src={"/images/Logo.png"}
                    width={490}
                    height={200}
                />
            </div>

            <Button className="loginButton" disabled>
                Login
            </Button>

            <div className="startButtonContainer">
                <h2>Start now</h2>
                <Button className="button" href="/home">
                    <BsArrowRight size={30} color="white" />
                </Button>
            </div>

            <div className="flyingText">
                <p>
                    Navigate yourself <br/> through the <br/> world of circular <br/> product design.
                </p>
            </div>

        </div>
    );
}