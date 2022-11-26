/**
 *  This page can be loaded with different arguments. based on the argument data is loaded
 *  from a specific csv file and displayed.
 */

import { Button, Col, Row } from "reactstrap";
import LayoutFooterExtended from "../../components/LayoutFooterExtended";
import { ImCheckmark2 } from 'react-icons/im';

// This function is called during build and sets the available routes.
export async function getStaticPaths() {
    return {
        paths: [{ params: { type: 'circular' } }, { params: { type: 'product' } }],
        fallback: false, // can also be true or 'blocking'
    }
}

// This function gets called at build time
export async function getStaticProps(context) {
    // TODO: Load the xml data here, example is with api request
    // const res = await fetch('https://.../posts')
    // const posts = await res.json()
    
    // Get the request params
    const type = context.params.type;
    console.log(context.params.type);
    
    var title;
    switch (type) {
        case "circular":
            title = "Circular Business Models";
            break;
        case "product":
            title = "Lifecycle Phase Intensity"
            break;
    }

    return {
        props: {
            title: title
        },
    }
}

// The actual page content
export default function AdvisorPage({ title }) {
    function ChoosableElement() {
        return(
            <Row xs="2">
                <Col xs="auto" md="auto">
                    <Button className="standardButton">
                        <ImCheckmark2 size={50} />
                    </Button>
                </Col>
                <Col xs="7" md="10">
                    <Col>
                        <h2>title</h2>
                    </Col>
                    <Col>
                        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                        diam nonumy eirmod tempor invidunt ut labore et dolore magna
                        aliquyam erat, sed diam voluptua. At vero eos et accusam et justo
                        duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
                        sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                        consetetur sadipscing elitr,</p>
                    </Col>
                </Col>
            </Row> 
        );    
    }

    return(
        <div className="advisorPage">
            <Col className="titleCol">
                <h1>{title}</h1>
            </Col>
            <Col className="mainCol">
                <ChoosableElement />
                <ChoosableElement />
                <ChoosableElement />
                <ChoosableElement />
                <ChoosableElement />
            </Col>
        </div>
    );
  }
  
AdvisorPage.getLayout = function getLayout(page) {
    return (
        <LayoutFooterExtended pageTitle="Advisor">{page}</LayoutFooterExtended>
    )
  }