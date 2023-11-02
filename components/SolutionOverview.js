import React from "react";
import { setCookie, getCookie, hasCookie, deleteCookie } from 'cookies-next';

export default function SolutionOverview( props )
{
    var cbmCount = 0;
    var lcpCount = 0;
    var edCount = 0;
    var cdpCount = props.cdpCount;

    // count the amount of selected items in each category
    var cookie = getCookie( 'selected' );
    cookie = JSON.parse(cookie);
    cookie.forEach( item => 
    {
        switch ( item[1] )
        {
            case 'CBM':
                cbmCount++;
                break;
            case 'LCP':
                lcpCount++;
                break;
            case 'ED':
                edCount++;
                break;
        }
    });

    return(
        <div className="solutionOverview">
            <div className={ props.initialType == "CBM" ? "cbm-background" : "lcp-background" } >
                
                <h1>SOLUTION <br/> OVERVIEW</h1>

                <div className="textBox box1">
                    <h2 className="number">{ props.initialType == "CBM" ? cbmCount : lcpCount }</h2>
                    <p>
                        {
                            props.initialType == "CBM" ?
                            "Circular business models enable closed loops and resource-efficient production and consumption systems." :
                            "Life cycyle intensities define product classifications based on environmental hotspots, following the product life cycle."
                        }
                    </p>
                    <h2 className="subtitle">{ props.initialType == "CBM" ? "Circular Business Models" : "Life Cycle Intesity" }</h2>
                </div>
                
                <div className="textBox box2">
                    <h2 className="number">{ props.initialType != "CBM" ? cbmCount : lcpCount }</h2>
                    <p>
                        {
                            props.initialType != "CBM" ?
                            "Circular business models enable closed loops and resource-efficient production and consumption systems." :
                            "Life cycyle intensities define product classifications based on environmental hotspots, following the product life cycle."
                        }
                    </p>
                    <h2 className="subtitle">{ props.initialType != "CBM" ? "Circular Business Models" : "Life Cycle Intesity" }</h2>
                </div>
                
                <div className="textBox box3">
                    <h2 className="number">{ edCount }</h2>
                    <p>
                        Ecodesign principles serve as a guide to optimize environmental-related product improvements that are in line with the circular economy at the operational level.
                    </p>
                    <h2 className="subtitle">ECODESIGN PRINCIPLES</h2>
                </div>
               
                <div className="textBox box4">
                    <h2 className="number">{ cdpCount }</h2>
                    <p>
                        The Circular Design Principles provide specific guidelines for implementing circular measures at the constructive level for optimization. These principles are grouped into different areas of action.
                    </p>
                    <h2 className="subtitle">CIRCULAR DESIGN PRINCIPLES</h2>
                </div>

                {/** Link Displays */}
                <div className="link link1">
                    <p>
                        SAVE YOUR PROJECT!
                    </p>
                </div>
                <div className="link link2">
                    <p>
                        LEARN MORE ABOUT INDICATORS
                    </p>
                </div>
                <div className="link link3">
                    <p>
                        GET YOUR LIST OF CIRCULAR DESIGN PRINCIPLES
                    </p>
                </div>

            </div>
        </div>
    ); 
}