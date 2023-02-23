/**
 * The main page of the application. User chooses if they want to start with a product or
 * circular business model and are then guided through the process. The idea is that the entire
 * process can be done on this page with the page body switching without the need to switch the
 * entire page.
 */

import Link from "next/link";
import { Button, Col, Row } from "reactstrap";
import LayoutFooterExtended from "../components/LayoutFooterExtended";

export default function ProcessPage() {
    return(
        <div className="processPage">
            <Col className="text">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
                dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
                amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
                et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
            </Col>
            <Col>
                <Row className="buttonRow justify-content-center" md="2" xs="1">
                    <Button href="/advisor/CBM" className="standardButton">
                        START <br /> 
                        CIRCULAR BUSINESS MODEL
                    </Button>
                    <Button href="advisor/LCP" className="standardButton">
                        START <br />
                        PRODUCT
                    </Button>
                </Row>
            </Col>
        </div>
    )
}

ProcessPage.getLayout = function getLayout(page) {
    return (
        <LayoutFooterExtended pageTitle="New Advisor Project">{page}</LayoutFooterExtended>
    )
  }