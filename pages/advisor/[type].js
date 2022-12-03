/**
 *  This page can be loaded with different arguments. based on the argument data is loaded
 *  from a specific csv file and displayed.
 */

import { Button, Col, Container, Row } from "reactstrap";
import LayoutFooterExtended from "../../components/LayoutFooterExtended";
import { ImCheckmark2 } from 'react-icons/im';
import { BsArrowRightCircle } from 'react-icons/bs';
import { useRouter } from 'next/router'
import useSessionStorage from '../../hooks/useSessionStorage';

// This function is called during build and sets the available routes.
export async function getStaticPaths() {
    return {
        paths: [
            { params: { type: 'circular' } },
            { params: { type: 'product' } },
            { params: { type: 'ecodesign' } },
            { params: { type: 'technical' } },
        ],
        fallback: false, // can also be true or 'blocking'
    }
}

// This function gets called at build time
export async function getStaticProps(context) {
    // TODO: Load the csv data here, example is with api request
    // const res = await fetch('https://.../posts')
    // const posts = await res.json()

    // Get the request params
    const type = context.params.type;
    var title;

    switch (type) {
        case "circular":
            title = "Circular Business Models";
            break;
        case "product":
            title = "Lifecycle Phase Intensity"
            break;
        case "ecodesign":
            title = "Ecodesign Approaches"
            break;
        case "technical":
            title = "Technical Design Principles"
            break;
    }

    return {
        props: {
            title: title,
        },
    }
}

// The actual page content
export default function AdvisorPage({ title }) {
    const router = useRouter();
    const prevPath = useSessionStorage('prevPath');
    const currentPath = useSessionStorage('currentPath');

    // Decide which page to display next based on the current and previous page.
    function loadNextPage() {
        var nextPage;
        switch(currentPath) {
            case "/advisor/circular":
                prevPath == "/advisor/product" ? nextPage = "ecodesign" : nextPage = "product";
                break;
            case "/advisor/product":
                prevPath == "/advisor/circular" ? nextPage = "ecodesign" : nextPage = "circular";
                break;
            case "/advisor/ecodesign":
                nextPage = 'technical';
        }

        var result = `/advisor/${nextPage}`;
        return result;
    }

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
            <Col className="d-flex justify-content-center buttonCol">
                <Button href={loadNextPage()} className="standardButton nextButton">
                    Continue
                    <BsArrowRightCircle className="icon" size={30}/>
                </Button>      
            </Col>
        </div>
    );
  }
  
AdvisorPage.getLayout = function getLayout(page) {
    const router = useRouter();
    var pageHistory = router.query;

    return (
        <LayoutFooterExtended metas={page.props} pageTitle="Advisor">{page}</LayoutFooterExtended>
    )
  }