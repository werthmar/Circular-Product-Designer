// Stylesheets
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.scss';
import '../styles/footer.scss';
import '../styles/index.scss';
import '../styles/mainMenuButton.scss';
import '../styles/homeButton.scss';
import '../styles/process.scss';
import '../styles/advisor.scss';
import '../styles/playground.scss';
import '../styles/fonts.scss';
import '../styles/navbar.scss';
import '../styles/choosableElement.scss';
import '../styles/solutionOverview.scss';
import '../styles/home.scss';
import '../styles/roadmap.scss'

import React from 'react';
import { useRouter } from "next/router";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  // Saves the previous path the user came from e.g. /process. acces with storage.getItem("prevPath")
  // define storage with const storage = globalThis?.sessionStorage;
  useEffect(() => storePathValues, [router.asPath]);
  function storePathValues() {
    const storage = globalThis?.sessionStorage;
    if (!storage) return;
    // Set the previous path as the value of the current path.
    const prevPath = storage.getItem("currentPath");
    storage.setItem("prevPath", prevPath);
    // Set the current path value by looking at the browser's location object.
    storage.setItem("currentPath", globalThis.location.pathname);
  }

  return getLayout(<Component {...pageProps} />)
}

// Only used for Website activation as long as there is no impresum
export function checkPassword( userInput ) {
  const password = "circular33!";

  if( userInput == password ) {
      return true;
  } else {
      return false;
  }
}

export default MyApp