"use client";

import dynamic from "next/dynamic";
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
export default function pdfDisplay() {

    const PDFViewer = dynamic(
        () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
        {
          ssr: false,
          loading: () => <p>Loading...</p>,
        },
      );

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
            flexDirection: 'row',
            backgroundColor: '#E4E4E4'
        },
        section: {
            margin: 10,
            padding: 10,
            flexGrow: 1
        },
        icon: {
          width: 100, // Adjust the width as needed
          height: 100 // Adjust the height as needed
        }
    });
    
    // Create Document Component
    const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Image style={styles.icon} src="/icons/Logo_no_text.png" />
        </View>
        <View style={styles.section}>
          <Text>List of Solutions</Text>
        </View>
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