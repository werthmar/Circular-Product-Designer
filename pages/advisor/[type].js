/**
 *  This page can be loaded with different arguments. based on the argument data is loaded
 *  from a specific csv file and displayed.
 */

import { Button, Col, Container, Row } from "reactstrap";
import LayoutFooterExtended from "../../components/LayoutFooterExtended";
import { BsArrowRightCircle } from 'react-icons/bs';
import { useRouter } from 'next/router'
import useSessionStorage from '../../hooks/useSessionStorage';
import { getCookie, hasCookie, getCookies } from 'cookies-next';
import ChoosableElement from "../../components/ChoosableElement";
import { useState, useEffect } from 'react'

// --- This function gets called at build time, Server-Side --------------------------------------------------
export async function getServerSideProps(context) {
    
    // Get the request params, type gets overwritten with the code CBM / LCP / ED which can be used in the database
    var type = context.params.type;
    var title;
    
    switch (type) {
        case "circular":
            title = "Circular Business Models";
            type = "CBM";
            break;
        case "product":
            title = "Lifecycle Phase Intensity";
            type = "LCP";
            break;
        case "ecodesign":
            title = "Ecodesign Approaches";
            type = "ED";
            break;
        case "technical":
            title = "Technical Design Principles";
            break;
    }


    // Hand data over to view.
    return {
        props: {
            initialTitle: title,
            type: type,
        },
    }
}

// --- The actual page content -------------------------------------------------------------------------
export default function AdvisorPage({ initialTitle, type }) {
    const prevPath = useSessionStorage('prevPath');
    const currentPath = useSessionStorage('currentPath');
    const [title, setTitle] = useState(initialTitle);
    
    // Decide which page to display next based on the current and previous page.
    function loadNextPage() {
        setTitle("test");
    }
    
    // https://nextjs.org/docs/basic-features/data-fetching/client-side
    function FetchData() {
        
        const [data, setData] = useState(null)
        const [isLoading, setLoading] = useState(false)
      
        useEffect(() => {
          setLoading(true)
          fetch(`/api/descriptions/${type}`)
            .then((res) => res.json())
            .then((data) => {
              setData(data)
              setLoading(false)
            })
        }, [])
      
        if (isLoading) return <p>Loading...</p>
        if (!data) return <p>No profile data</p>
        
        return(
            data['descriptions'].map(( item, index ) => (
                <ChoosableElement key={index} id={item.id} description={item.description} name={item.name} />
            ))
        );

    }
      
    return(
        <div className="advisorPage">
            <Col className="mainCol">
                
            <h1>{title}</h1>
            
                <FetchData />

            



            </Col>
            <Col className="d-flex justify-content-center buttonCol">
                <Button onClick={() => loadNextPage()} className="standardButton nextButton">
                    Continue
                    <BsArrowRightCircle className="icon" size={30}/>
                </Button>      
            </Col>
        </div>
    );
  }
  
// --- Apply page layout -------------------------------------------------------------------------
AdvisorPage.getLayout = function getLayout(page) {
    const router = useRouter();
    var pageHistory = router.query;

    return (
        <LayoutFooterExtended metas={page.props} pageTitle="Advisor">{page}</LayoutFooterExtended>
    )
  }