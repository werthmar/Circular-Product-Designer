"use client";

import dynamic from "next/dynamic";
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font, PDFDownloadLink } from '@react-pdf/renderer';
import { Container } from "reactstrap";
import { getCookie, hasCookie, getCookies, setCookie } from 'cookies-next';

export default function pdfDisplay() {
  
  const [areasOfAction, setAreasOfAction] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const [solutionApproachCount, setSolutionApproachCount] = React.useState();

  // = componentDidMount
  React.useEffect(() => {
    
    // Get selected item ids
    var selectedItems = [];
        var cookie = getCookie( 'selected' );
        if( cookie )
        {
            cookie = JSON.parse(cookie);
            cookie.forEach( item => {
                selectedItems.push( item[0] );
            });
        }

    fetch(`/api/cdp?items=${ '[' + selectedItems + ']' }`)
    .then((res) => res.json())
    .then((data) =>
    {
        // Group CDPs by Area of Action
        var lastCdp;
        var areasOfAction = [];
        var slCount = 0;

        data.cdps.forEach( ( cdp, index ) =>
        {
          var areaOfActionFound = false;
          slCount += cdp.solution_approaches.length
          
          areasOfAction.forEach( (area, index ) =>
          {
            if( area.title == cdp.area_of_action )
            {
              area.cdp.push( cdp );
              areaOfActionFound = true;
              return;
            }
          });
          
          // areaOfAction not already present in array, create new area as category for the cdp
          if( areaOfActionFound == false )
          {
            areasOfAction.push(
              {
                title: cdp.area_of_action,
                cdp: [
                  cdp
                ]
              }
            )
          }
          
        });

        // Save data to state
        setAreasOfAction( areasOfAction );
        setSolutionApproachCount( slCount );
        setLoading(false);

    });
   
  }, [])

  
  
  const PDFViewer = dynamic(
    () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
    {
      ssr: false,
      loading: () => <p>Loading...</p>,
    },
  );

  // Register font files
  Font.register({
    family: 'BarlowCondensed',
    format: "truetype",
    fontStyle: "normal",
    fonts: [
      { src: "fonts/BarlowCondensed-Light.ttf", fontWeight: 300 },
      { src: "fonts/BarlowCondensed-Medium.ttf", fontWeight: 500 },
      { src: "/fonts/BarlowCondensed-SemiBold.ttf", fontWeight: 600 },
    ]
  });

  // Create styles
  const styles = StyleSheet.create({
    pdfViewer: {
      width: '100vw',
      height: '100vh',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 9999 // Ensure the viewer is on top
    },  
    page: {
      paddingLeft: 25,
      //color: "rgb(204,0,0)",
      backgroundColor: 'rgb(230,230,230)',
    },
    column: {
      flexDirection: "column",
    },
    row: {
      flexDirection: "row",
    },

    // --- Top/Header part of the Document ---
    header: {
      flexDirection: 'row',
    },
    logo: {
        marginTop: 15,
        padding: 10,
    },
    title: {
      marginTop: 20,
      marginLeft: 240,
      padding: 10,
      fontFamily: "BarlowCondensed",
      fontWeight: "600",
      fontSize: 25,
      color: "black"
    },
    horrizontalGreyBar: {
      width: "240px",
      height: "25px",
      marginBottom: 5,
      backgroundColor: "rgb(83, 83, 83)"
    },
    icon: {
      width: 80, // Adjust the width as needed
      height: 80 // Adjust the height as needed
    },
    
    // --- Row with the Document Info like Date ---
    documentInfo:{
      marginTop: 15,
      flexDirection: "row",
      textAlign: "left",
    },
    verticalGreyBar1: {
      width: "4px",
      height: "50px",
      marginLeft: 20,
      marginRight: 10,
      backgroundColor: "rrgb(83, 83, 83)"
    },
    verticalGreyBar2: {
      width: "4px",
      height: "50px",
      marginLeft: 50,
      marginRight: 10,
      backgroundColor: "rgb(83, 83, 83)"
    },
    infoTitle: {
      paddingTop: 7,
      fontSize: 14,
      fontFamily: "BarlowCondensed",
      fontWeight: 600,
      color: "black",
    },
    infoText: {
      fontSize: 14,
      fontFamily: "BarlowCondensed",
      fontWeight: 300,
    },

    // --- Table which displays the selected CDPs ---
    column: {
      flexDirection: "column",
    },
    row: {
      flexDirection: "row",
    },
    tableTitleBar: {
      backgroundColor: "rgb(83, 83, 83)",
      fontSize: 12,
      fontFamily: "BarlowCondensed",
      fontWeight: 600,
      marginTop: 12,
      padding: 6,
      marginLeft: 0,
      color: "black",
    },
    // Container including the vertical text
    cdpRow: {
      flexDirection: "row",
      //alignItems: 'center',
      //flexWrap: 'wrap', // Wrap items to next row
      //justifyContent: 'flex-start', // Space evenly between items
      //height: '100%', // Fill 100% of available height
      width: "100%",
      maxWidth: "100%",
      paddingTop: 10,
      borderTopWidth: 4, // Set border width for the bottom side only
      borderTopColor: 'rgb(94, 103, 110)', // Set border color for the bottom side only
      borderTopStyle: 'solid', 
      borderLeftWidth: 4, // Set border width for the bottom side only
      borderLeftColor: 'rgb(94, 103, 110)', // Set border color for the bottom side only
      borderLeftStyle: 'solid', 
    },
    areaOfActionCol: {
      // backgroundColor: "rgb(94, 103, 110)",
      width: "100%",
      //height: 30,
      textAlign: 'start',
      paddingBottom: 4,
      //borderBottomWidth: 4, // Set border width for the bottom side only
      //borderBottomColor: 'rgb(94, 103, 110)', // Set border color for the bottom side only
      //borderBottomStyle: 'solid', 
    },
    areaOfAction: {
      paddingLeft: 15,
      marginTop: 10,
      fontSize: 14,
      fontFamily: "BarlowCondensed",
      fontWeight: 600,
      color: "black",
    },
    // Taken out for now because Reactpds lacks appropriate solutions for vertical text
    verticalText: {
      transform: 'rotate(-90deg)', // Rotate the text 90 degrees counter-clockwise
      //height: 40,
      //width: "100%", // Adjust width as needed
      //marginTop: 'auto', // Align the text to the bottom of the container
      //marginBottom: 'auto',
      fontSize: 14,
      fontFamily: "BarlowCondensed",
      fontWeight: 600,
      padding: 0,
      margin: 0,
    },
    cdpCol: {
      height: "100%",
      backgroundColor: "rgb(174, 182, 184)",
      maxWidth: 130,
      width: "100%",
      marginLeft: 12,
      marginRight: 15,
    },
    cdpText: {
      fontSize: 12,
      fontFamily: "BarlowCondensed",
      fontWeight: 600,
      margin: "auto"
    },
    solutionApproachRow: {
      position: "relative",
      flexDirection: "row",
      alignContent: "center",
      alignItems: "center",
      borderBottomWidth: 1, // Set border width for the bottom side only
      borderBottomColor: 'black', // Set border color for the bottom side only
      borderBottomStyle: 'solid', 
    },
    titleIndex: {
      fontSize: 14,
      fontFamily: "BarlowCondensed",
      fontWeight: 600,
    },
    solutionApproachTitle: {
      fontSize: 12,
      fontFamily: "BarlowCondensed",
      fontWeight: 500,
      width: 100,
      marginLeft: 5,
      marginRight: 4,
    },
    solutionApproachDescription: {
      fontSize: 10,
      fontFamily: "BarlowCondensed",
      fontWeight: 300,
      width: 240,
    },
    roundButton: {
      width: 14,
      height: 14,
      borderWidth: 1,
      borderColor: 'black',
      borderStyle: 'solid',
      borderRadius: 50,
      alignSelf: "center",
      //marginLeft: 10,
      //paddingLeft: 10,
      //margin: "auto",
      position: "absolute",
      right: "-20px",
      padding: 0,
      margin: 0, 
      //right: -20,
      
    },

  });

  // used display the increasing numbers next to the title
  var globalIndex =0;
  
  function getIndex() {
    globalIndex++;
    return globalIndex;
  }

  // Date object used to cunstruct the date inside the document
  const currentDate = new Date();

  // Create Document Component
  const MyDocument = () => (
    <Document
      title="List of Solutions"
      author="Universität Pforzheim"
      subject="List of Solutions"
      //renderMode="svg" // required for pdf gen to work on iOS
      >
      <Page size="A4" style={styles.page}>

        {/** --- Header --- */}
        <View style={styles.header}>
          <View style={styles.logo}>
            <Image style={styles.icon} src="/icons/Logo_no_text.png" />
          </View>
          <View style={styles.title}>
            <div style={styles.horrizontalGreyBar}></div>
            <Text>List of Solutions</Text>
          </View>
        </View>

        {/** --- Document Info --- */}
        <View style={styles.documentInfo}>
          <View>
            <Text style={styles.infoTitle}>Project</Text>
            <Text style={styles.infoText}>X</Text>
          </View>
          <View style={styles.verticalGreyBar1} />
          <View>
            <Text style={styles.infoTitle}>Date</Text>
            <Text style={styles.infoText}>      
              { 
                String(currentDate.getDate()).padStart(2, '0') + "-"
                // Month starts at 0
                + String(currentDate.getMonth() + 1).padStart(2, '0') + "-"
                + currentDate.getFullYear()
              }
            </Text>
          </View>
          <View style={styles.verticalGreyBar2} />
          <View>
            <Text style={styles.infoTitle}>Number of solution approaches</Text>
            <Text style={styles.infoText}>{solutionApproachCount}</Text>
          </View>
        </View>

        {/** --- CDP Table --- */}
        <View style={styles.tableTitleBar}>
          <Text>CIRCULAR DESIGN PRINCIPLES</Text>
        </View>


          {/* Map over data and generate elements */}
          {areasOfAction.map(item => (

            <View wrap={false} style={styles.column}>

            {/** Areas of Action */}
            <View style={styles.areaOfActionCol}>
              <Text style={styles.areaOfAction}>{item.title}</Text>
            </View>

            <View style={styles.cdpRow}>  
              
              {/** CDP Map */}
              <View style={styles.column}>
                {item.cdp.map((cdp, cdpIndex) => (

                  <View style={ cdpIndex == 0 ? { flexDirection: "row", } : { flexDirection: "row", marginTop: 15 }}>
                    
                    {/** CDP Name */}
                    <View style={styles.cdpCol}>
                      <Text style={styles.cdpText}>{cdp.cdp_title}</Text> 
                    </View>
              
                    {/** Title of Solution Approaches Map */}
                    <View style={styles.column}>
                      {cdp.solution_approaches.map((solution, index) => (

                        <View style={styles.row}>

                          <View style={ index == 0 ? "" : { marginTop: 5 } }>

                            <View style={styles.solutionApproachRow}>
                              <Text style={styles.titleIndex}>{ getIndex() }. </Text>
                              <Text style={styles.solutionApproachTitle}>{ solution.sl_title }</Text>
                              <Text style={styles.solutionApproachDescription}>{ solution.sl_description }</Text>
                            </View>
                          
                          </View>

                          {/** Round Button */}
                          <View style={styles.roundButton} />
                     
                        </View>

                      ))}
                    </View>
                    

                  </View>    

                ))}
              </View>


            </View>

            </View>
          ))}


      </Page>
    </Document>
  );

  if( loading ) {
    return(
      <div className="loadingNotification">
        <div className="loader" />
        <p>loading...</p>
      </div>
    );
  } 
  else
  {
    return(    

      <div style={{ margin: "auto", textAlign: "center", fontSize: "30px", marginTop: "20%", fontWeight: "bold" }}>
        <PDFDownloadLink document={<MyDocument />} fileName="List of Solutions.pdf">
          {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
        </PDFDownloadLink>
      </div>

      /*
      <div style={styles.pdfViewer}>
        <PDFViewer width="100%" height="100%" >
          <MyDocument />
        </PDFViewer>
      </div>
      */
    );
  }

}