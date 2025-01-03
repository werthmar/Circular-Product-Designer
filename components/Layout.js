/*
Standard Layout with Navbar at the bottom.
Navbar ist referenced as Footer because it is at the bottom of the page.
*/

import React from 'react';
import Head from 'next/head';

const Layout = (props) => {
  return (
    <div>
      <Head>
        <title>{props.pageTitle}</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      </Head>
      <div className="wrapper">     
        
        {/* Body content */}
        {props.children}
        
      </div>
    </div>
  )
}
export default Layout;