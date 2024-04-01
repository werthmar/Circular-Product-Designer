"use client";

import dynamic from "next/dynamic";
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';
import { Container } from "reactstrap";

export default function pdfDisplay() {
  
  // Sample data, to be replaced by real data
  const data = [
    { id: 1,
      AreasOfAction: 'Funktions & Nutzergerechte Gestaltung',
      CDP: [
        {
          name: "Functionsbeständigkeit",
          solutionApproaches: [
            {
              title: "Verschleißzustand", 
              description: "Machen Sie den Verschleißzustand möglichst leicht und eindeutig erkennbar, um Abnutzungsvorrat bzw. Wiederverwendbarkeit beurteilen zu können.",
            },
            {
              title: "Automatische Systeme",
              description: "Verwenden Sie automatische Systeme, die Fehlfunktionen von Produkten oder Komponenten anzeigen."
            },
            {
              title: "Begrenzter Verschleiß",
              description: "Beschränken Sie den Verschleiß, z.B. durch das Auftragen von Hart- oder Verschlussschichten."
            }
          ],
        },
        {
          name: "Funktionserweiterung",
          solutionApproaches: [
            {
              title: "title4",
              description: "description4"
            }
          ],
        },
        {
          name: "Ergonomische Gestaltung",
          solutionApproaches: [
            {
              title: "title5", 
              description: "description5"
            },
            {
              title: "title6", 
              description: "description6"
            },
            {
              title: "title7", 
              description: "description7"
            },
            {
              title: "title8", 
              description: "description8"
            },
            {
              title: "title9", 
              description: "description9"
            },
          ]
        },
      ],
    },

  ];
  
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
        //backgroundColor: '#E4E4E4'
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
    },
    horrizontalGreyBar: {
      width: "240px",
      height: "25px",
      marginBottom: 5,
      backgroundColor: "rgb(168, 187, 191)"
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
      backgroundColor: "rgb(168, 187, 191)"
    },
    verticalGreyBar2: {
      width: "4px",
      height: "50px",
      marginLeft: 50,
      marginRight: 10,
      backgroundColor: "rgb(168, 187, 191)"
    },
    infoTitle: {
      paddingTop: 7,
      fontSize: 14,
      fontFamily: "BarlowCondensed",
      fontWeight: 600,
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
      backgroundColor: "rgb(168, 187, 191)",
      fontSize: 12,
      fontFamily: "BarlowCondensed",
      fontWeight: 600,
      marginTop: 12,
      padding: 6,
      marginLeft: 44
    },
    // Container including the vertical text
    cdpRow: {
      flexDirection: "row",
      //alignItems: 'center',
      //flexWrap: 'wrap', // Wrap items to next row
      //justifyContent: 'flex-start', // Space evenly between items
      //height: '100%', // Fill 100% of available height
      width: "100%",
      marginTop: 15,
    },
    // Row including everything except the vertical text
    mainRow: {
      flexDirection: "row",
      marginBottom: 15,
    },
    columnVertical: {
      backgroundColor: "rgb(94, 103, 110)",
      transform: 'rotate(-90deg)', // Rotate the text 90 degrees counter-clockwise
      textAlign: 'center',
      //width: "100%", // Adjust width as needed
      //marginTop: 'auto', // Align the text to the bottom of the container
      //marginBottom: 'auto',
      height: 40,
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
      marginLeft: 20,
      marginRight: 20,
    },
    cdpText: {
      fontSize: 12,
      fontFamily: "BarlowCondensed",
      fontWeight: 600,
      margin: "auto"
    },
    solutionApproachRow: {
      flexDirection: "row",
      marginBottom: 5,
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
      fontSize: 14,
      fontFamily: "BarlowCondensed",
      fontWeight: 500,
      width: 100,
      marginLeft: 5
    },
    solutionApproachDescription: {
      fontSize: 10,
      fontFamily: "BarlowCondensed",
      fontWeight: 300,
      width: 220
    },
    roundButton: {
      width: 14,
      height: 14,
      borderWidth: 1,
      borderColor: 'black',
      borderStyle: 'solid',
      borderRadius: 50,
      alignSelf: "center",
      marginLeft: 10,
      padding: 0
    },

    test: {
      maxWidth: 40,
      height: "100%",
    }

  });

  // used display the increasing numbers next to the title
  var globalIndex = 0;
  
  // Create Document Component
  const MyDocument = () => (
    <Document title="List of Solutions" author="Universität Pforzheim" subject="List of Solutions">
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
            <Text style={styles.infoText}>XX-XX-XXXX</Text>
          </View>
          <View style={styles.verticalGreyBar2} />
          <View>
            <Text style={styles.infoTitle}>Number of solution approaches</Text>
            <Text style={styles.infoText}>X</Text>
          </View>
        </View>

        {/** --- CDP Table --- */}
        <View style={styles.tableTitleBar}>
          <Text>CIRCULAR DESIGN PRINCIPLES      GENERIC SOLUTION APPROACHES</Text>
        </View>


          {/* Map over data and generate elements */}
          {data.map(item => (

            <View key={item.id} style={styles.cdpRow}>
              
              {/** Areas of Action */}
              <View style={styles.test}>
                <Text style={styles.columnVertical}>{item.AreasOfAction}</Text>
              </View>
              
              {/** CDP Map */}
              <View style={styles.column}>
                {item.CDP.map((cdp, cdpIndex) => (

                  <View style={styles.mainRow}>
                    
                    {/** CDP Name */}
                    <View style={styles.cdpCol}>
                      <Text style={styles.cdpText}>{cdp.name}</Text> 
                    </View>
              
                    {/** Title of Solution Approaches Map */}
                    <View style={styles.column}>
                      {cdp.solutionApproaches.map((solution, index) => (

                        <View style={styles.row}>

                          <View style={styles.solutionApproachRow}>
                            <Text style={styles.titleIndex}>{index + 1}. </Text>
                            <Text style={styles.solutionApproachTitle}>{solution.title}</Text>
                            <Text style={styles.solutionApproachDescription}>{solution.description}</Text>
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
          ))}


      </Page>
    </Document>
  );

  return(
    <div style={styles.pdfViewer}>
      <PDFViewer width="100%" height="100%" >
        <MyDocument />
      </PDFViewer>
    </div>
  );

}