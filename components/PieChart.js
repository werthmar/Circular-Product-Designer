import { React, useRef, useState, useEffect } from "react";
import{
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend 
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Button, Col, Nav, Navbar, Alert, Container, Row } from "reactstrap";
import { RiArrowGoBackLine } from 'react-icons/ri';
import { Pie, getElementAtEvent } from 'react-chartjs-2';
import Router from "next/router";
import { getCookie } from "cookies-next";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    ChartDataLabels
);


export default function PieChart( props )
{
    const [_data, setData] = useState();
    var mobileLayout = props.mobileLayout;

    // fetch data
    useEffect(() => {

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
          setData(data);
        });

    }, []);

    var width = screen.width;
    var height = screen.height;

    const toggleDescription = props.toggleDescription;
    const chartRef = useRef();
    const chartRef2 = useRef();
    const [selectedCategory, setSelectedCategory] = useState();
    const [title, setTitle] = useState();
    const [text, setText] = useState();
    const [loading, setLoading] = useState(false);
    const [subcategoryOpen, setSubcategoryOpen] = useState(false);


    // Rearrange data from database
    //var _data = props.data.descriptions;
    var outerChart = [];
    var outerChartHelp = [];
    var outerChartLength = [];
    var innerChart = ['DOWNLOAD LIST\n OF SOLUTIONS']
    console.log("!cdps: " + _data);

    // Order data into Areas of Solution categories
    var functionality = [];
    var materialSuitability = [];
    var manufacturability = [];
    var assemblabilityAndDisassemblability = [];
    var userFriendliness = [];
    var maintainability = [];
    var recyclability = [];
    var productLabeling = [];
    var transportability = [];

    // Save the items in the right categories for easy access
    try{
        _data.cdps.forEach( (item, index) => {           
            // Only show one item of each cdp, change bcs of only cdp display, not title of solution
            if (item.area_of_action === "Functionality") functionality.push(item);
            if (item.area_of_action === "Material suitability") materialSuitability.push(item);
            if (item.area_of_action === "Manufacturability") manufacturability.push(item);
            if (item.area_of_action === "Assemblability and disassamblability") assemblabilityAndDisassemblability.push(item);
            if (item.area_of_action === "User friendliness") userFriendliness.push(item);
            if (item.area_of_action === "Maintanability") maintainability.push(item);
            if (item.area_of_action === "Recyclability") recyclability.push(item);
            if (item.area_of_action === "Product labeling") productLabeling.push(item);
            if (item.area_of_action === "Transportability") transportability.push(item);
        });
    } catch( error ) {
        console.log(`loading... ${error}`);
    }


    // Only display the Solution categories which have apllieable sulotions for the user made selection
    if (functionality.length != 0) outerChart.push('FUNCTIONALITY');
    if (materialSuitability.length != 0) outerChart.push('MATERIAL SUITABILITY');
    if (manufacturability.length != 0) outerChart.push('MANUFACTURABILITY');
    if (assemblabilityAndDisassemblability.length != 0) outerChart.push('ASSEMBLABILITY AND DISASSEMBLABILITY');
    if (userFriendliness.length != 0) outerChart.push('USER FRIENDLINESS'); 
    if (maintainability.length != 0) outerChart.push('MAINTAINABILITY');
    if (recyclability.length != 0) outerChart.push('RECYCLABILITY'); 
    if (productLabeling.length != 0) outerChart.push('PRODUCT LABELING'); 
    if (transportability.length != 0) outerChart.push('TRANSPORTABILITY'); 
    
    for (var i = 0; i< outerChart.length; i++) {
        outerChartLength.push(1); // all have the same size
        outerChartHelp.push((outerChart.at(i)).replace(" ","\n").replace(" ","\n"))
    }

    // Vordefinierte Werte für verschiedene Auflösungen
    const resolutions = [
        { width: 4096, height: 2060, fontSize1: 40, fontSize2: 40, fontSize3: 40, fontSize4: 30, zeilenlaenge: 20 },
        { width: 1916, height: 1030, fontSize1: 18, fontSize2: 35, fontSize3: 18, fontSize4: 22, zeilenlaenge: 15 },
        { width: 1366, height: 1024, fontSize1: 14, fontSize2: 25, fontSize3: 14, fontSize4: 14, zeilenlaenge: 15  },
        { width: 844, height: 390, fontSize1: 5, fontSize2: 10, fontSize3: 5, fontSize4: 8, zeilenlaenge: 5 }
        // Füge hier weitere Auflösungen hinzu, falls erforderlich
    ];

    // Finde die am nächsten liegende Auflösung
    const closestResolution = resolutions.reduce((prev, curr) => {
        const prevDiff = Math.abs(prev.width - width) + Math.abs(prev.height - height);
        const currDiff = Math.abs(curr.width - width) + Math.abs(curr.height - height);
        return currDiff < prevDiff ? curr : prev;
    });

    // Setze die Schriftgröße im Body-Element
    var string_size_outer = `${closestResolution.fontSize1}px`;

    var string_size_inner = `${closestResolution.fontSize2}px`;


    var string_size_outer_half = `${closestResolution.fontSize3}px`;

    var string_size_inner_half = `${closestResolution.fontSize4}px`;

    var zeilenlaenge = closestResolution.zeilenlaenge


    // 4096 x 2060 = 40 - 60
    // 1916 x 1030 = 18 - 50
    // 1366 x 1024 = 14 - 35
    // 844 x 390 = 5 - 15


    // --- Pie Chart 1 with category selection ----------------------------
    const data = {
        datasets:[
            // Outer Circle
            {
                labels: outerChartHelp,
                data: outerChartLength,
                backgroundColor: [ 'rgb(94, 103, 110)' ],
                borderWidth: 10,
                borderColor: 'rgb(232, 232, 232)', 
                datalabels: {
                    // achieves text rotation, taken from: https://stackoverflow.com/questions/68030418/how-to-rotate-the-label-text-in-doughnut-chart-slice-vertically-in-chart-js-canv
                    anchor: "center", //start, center, end
                    font: {
                        size: string_size_outer,
                        weight: 600
                    },
                    rotation: function(ctx) {
                        const valuesBefore = ctx.dataset.data.slice(0, ctx.dataIndex).reduce((a, b) => a + b, 0);
                        const sum = ctx.dataset.data.reduce((a, b) => a + b, 0);
                        const rotation = ((valuesBefore + ctx.dataset.data[ctx.dataIndex] /2) /sum *360);
                        return rotation < 180 ? rotation-90 : rotation+90;
                    },
                    formatter: (val, ctx) => (ctx.chart.data.datasets[0].labels[ctx.dataIndex])
                }
            },
            // Inner Circle
            {
                labels: innerChart,
                data: [ 1, ],
                backgroundColor: [ 'rgb(47, 52, 55)' ],
                borderColor: 'transparent',
                datalabels: {
                    anchor: "start", //start, center, end
                    font: {
                        size: string_size_inner,
                    },
                    formatter: (val, ctx) => (ctx.chart.data.datasets[1].labels[ctx.dataIndex])
                }
            }
        ]
    };

    const options = {
        plugins: 
            {
                legend: {
                    display: false,
                },
                tooltip: {
                    enabled: false
                },
                datalabels: {
                    color: 'white',
                }
            }        
    };

    const onClick = (event) => {
        // Determine which category the user clicked on
        let element = getElementAtEvent(chartRef.current, event);
        var category = outerChart[ element[0].index ];
        
        toggleDescription();

        // Determine if the user clicked on the Download list of Solutions button by examining the on clicked element and looking for the label
        var datalabel = element[0].element.$datalabels[0].$context.dataset.labels[0];
        if ( datalabel == "DOWNLOAD LIST\n OF SOLUTIONS" ) {
            setLoading(true);
            Router.push("/pdfDisplay");
        }

        // Display the new data
        // the array which saves the subelements of the category
            setTitle( category );
            setSelectedCategory( category );
            setCategoryText( category );
    }

    function getCdpTitles( category , zeilenlaenge)
    {
        var result = [''];
        category.forEach( (item, index ) => {
            const name = item.cdp_title;
            let woerter = name.split(' ');
            let aufgeteilteTeile = [];

            for (let i = 0; i < woerter.length; i++) {
                aufgeteilteTeile = aufgeteilteTeile.concat(woerter[i].split('-')); // Aufteilen nach '-'
            }

            woerter = aufgeteilteTeile
            
            let aktuelleZeile = woerter[0];
            let aktuelleLaenge = woerter[0].length

            for (let i = 1; i < woerter.length; i++) {
                let wort = woerter[i];
                if (wort.length > zeilenlaenge) {
                    // Wenn das Wort länger als die maximale Zeilenlänge ist, unterstreiche es
                    aktuelleZeile += '\n' + wort;
                    aktuelleLaenge = wort.length
                } else if (aktuelleLaenge + 1 + wort.length <= zeilenlaenge) {
                    aktuelleZeile += ' ' + wort;
                    aktuelleLaenge += wort.length + 1
                } else {
                    aktuelleZeile += '\n' + wort;
                    aktuelleLaenge = wort.length
                }
            }

            result.push(aktuelleZeile);
        });
        return result;
    }
    
    function setCategoryText( category ) {

        switch(category)
        {
            case 'FUNCTIONALITY':
                setText("Functionality includes CDPs that improve the functionality of products to minimize design flaws that impact how the product is used. In addition, they enable an extension of functions in the form of upgrades or updates.");
                break;
            case 'MATERIAL SUITABILITY':
                setText("Material suitability describes CDPs that relate to the use of materials. Various material properties play a role here, as does the selection of suitable resources. Materials are increasingly diverse these days, having individual properties, applications, advantages and disadvantages. A clear understanding of the functional requirements of the products is necessary to make the selection of materials. To ensure their economical recycling and consistently high quality, material compatibility and combination should be checked directly at the design stage .");
                break;
            case 'MANUFACTURABILITY':
                setText("Manufacturability includes CDPs that prioritize simple and efficient production of the product. The design will be optimized to fit the manufacturing steps.");
                break;
            case 'ASSEMBLABILITY AND DISASSEMBLABILITY':
                setText("Included CDPs enable easy assembly of a product and efficient disassembly without causing great damage.");
                break;
            case 'USER FRIENDLINESS':
                setText("User friendliness describes principles that improve the user experience with the product. This can intensify and prolong the use of the product.");
                break;
            case 'MAINTAINABILITY':
                setText("Maintainability describes a set of CDPs ensuring components are replaceable and maintenance actions can be carried out, as well as those enable checking the product’s condition.");
                break;
            case 'RECYCLABILITY':
                setText("The CDPs outline strategies for facilitating the recyclability of a product, focusing on the ease of separating its components and identifying the materials they are made of.");
                break;
            case 'PRODUCT LABELING':
                setText("Detailed product labeling is crucial for the proper usage of the product, as well as for maintenance, repair, and end-of-life treatment.");
                break;
            case 'TRANSPORTABILITY':
                setText("The transportability describes all measures concerning the transport and packaging of the product. This is also relevant for internal logistics and reserve logistics.");    
                break;
        }                

    }

    // OnClick function for the second, more detailed pie chart
    const onClick2 = (event) => {
        // Determine which category the user clicked on
        let element = getElementAtEvent(chartRef2.current, event);
        var category;

        // Check if the user clicked on the pieChart or on empty space (for some reason this function triggers even on empty space around the pie chart which leads to an error)
        if ( !element[0] ) return;
        // Check if the inner circle was clicked and if yes do nothing, only outer circle matters here
        if ( element[0].datasetIndex == 1 ) return;
        // Check if the user clicked on the empty halfe of the pie chart
        if ( element[0].index == 0 ) return;

        switch(selectedCategory)
        {
            case 'FUNCTIONALITY':
                category = functionality;
                break;
            case 'MATERIAL SUITABILITY':
                category = materialSuitability;
                break;
            case 'MANUFACTURABILITY':
                category = manufacturability;
                break;
            case 'ASSEMBLABILITY AND DISASSEMBLABILITY':
                category = assemblabilityAndDisassemblability;
                break;
            case 'USER FRIENDLINESS':
                category = userFriendliness;
                break;
            case 'MAINTAINABILITY':
                category = maintainability;
                break;
            case 'RECYCLABILITY':
                category = recyclability;
                break;
            case 'PRODUCT LABELING':
                category = productLabeling;
                break;
            case 'TRANSPORTABILITY':
                category = transportability;
                break;
            }   

            // Update Text and Title
            setTitle( category[ element[0].index - 1 ].cdp_title );
            setText( category[ element[0].index - 1 ].cdp_definition );
            setSubcategoryOpen(true);
    }

    // Function that lets you go back to the first pie chart from the second pie chart
    function back()
    {
        var category = selectedCategory; 
        // Go back to first Pie Chart
        if(!subcategoryOpen) {
            toggleDescription();
            setSelectedCategory( undefined );
        }
        // Go only 1 step back
        else {
            setTitle(category);
            setCategoryText(category);
            setSubcategoryOpen(false);
        }
    } 


    // TODO:
    function whiteElement(label)
    {
        //if (label == title.toUpperCase()) return "white";
        return "black";
    }


    // No category has been selected yet, display pieChart 1
    if ( loading ) {
        return(
            <Col className="loadingNotification">
                    <div className="loader" />
                    <p>loading...</p>
            </Col>
        );
    }
    
    else if( selectedCategory == undefined )
    {
        return(
            <div style={{ width: '100%', height: '100%' }} >
                <Pie
                    data={data}
                    options={options}
                    ref={chartRef}
                    onClick={onClick}
                />
            </div>
        );
    }

    // --- Second pie chart which displays the content of a category -------------------
    else
    {
        // Select the correct data
        var outerChart2;
        switch(selectedCategory)
        {
            case 'FUNCTIONALITY':
                outerChart2 = getCdpTitles(functionality, zeilenlaenge);
                break;
            case 'MATERIAL SUITABILITY':
                outerChart2 = getCdpTitles(materialSuitability, zeilenlaenge);
                break;
            case 'MANUFACTURABILITY':
                outerChart2 = getCdpTitles(manufacturability, zeilenlaenge);
                break;
            case 'ASSEMBLABILITY AND DISASSEMBLABILITY':
                outerChart2 = getCdpTitles(assemblabilityAndDisassemblability, zeilenlaenge);
                break;
            case 'USER FRIENDLINESS':
                outerChart2 = getCdpTitles(userFriendliness, zeilenlaenge);
                break;
            case 'MAINTAINABILITY':
                outerChart2 = getCdpTitles(maintainability, zeilenlaenge);
                break;
            case 'RECYCLABILITY':
                outerChart2 = getCdpTitles(recyclability, zeilenlaenge);
                break;
            case 'PRODUCT LABELING':
                outerChart2 = getCdpTitles(productLabeling, zeilenlaenge);
                break;
            case 'TRANSPORTABILITY':
                outerChart2 = getCdpTitles(transportability, zeilenlaenge);
                break;
        }                
        
        var outerChart2Length = [outerChart2.length - 1 ]; // to make only the left half have the items
        for (var i = 0; i< outerChart2.length - 1; i++) { // -1 bcs of the blank left side added
            outerChart2Length.push(1); // all have the same size
        }
        
        let selectedCategoryHelp = selectedCategory.replace(" ","\n").replace(" ","\n");

        

        const data2 = {
            datasets:[
                // Outer Circle
                {
                    labels: outerChart2,
                    data: outerChart2Length,
                    backgroundColor: [ 'rgb(94, 103, 110)' ],
                    borderWidth: 4,
                    borderColor: 'rgb(232, 232, 232)',
                    hoverBackgroundColor: 'white', 
                    datalabels: {
                        // achieves text rotation, taken from: https://stackoverflow.com/questions/68030418/how-to-rotate-the-label-text-in-doughnut-chart-slice-vertically-in-chart-js-canv
                        anchor: "center", //start, center, end
                        color: whiteElement(),
                        font: {
                            size: string_size_outer_half,
                            weight: 600,
                        },
                        rotation: function(ctx) {
                            const valuesBefore = ctx.dataset.data.slice(0, ctx.dataIndex).reduce((a, b) => a + b, 0);
                            const sum = ctx.dataset.data.reduce((a, b) => a + b, 0);
                            const rotation = ((valuesBefore + ctx.dataset.data[ctx.dataIndex] /2) /sum *360);
                            return rotation < 180 ? rotation-90 : rotation+90;
                        },
                        formatter: (val, ctx) => (ctx.chart.data.datasets[0].labels[ctx.dataIndex])
                    }
                },
                // Inner Circle
                {
                    labels: [ '', selectedCategoryHelp ],
                    data: [ 1, 1 ],
                    backgroundColor: [ 'rgb(47, 52, 55)' ],
                    borderColor: 'transparent',
                    datalabels: {
                        anchor: "center", //start, center, end
                        color: 'white',
                        font: {
                            size: string_size_inner_half,
                        },
                        formatter: (val, ctx) => (ctx.chart.data.datasets[1].labels[ctx.dataIndex])
                    }
                }
            ]
        };

        const options2 = {
            plugins: 
            {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false
                },
                datalabels: {
                },
            },        
            animation: false,
            responsive:true,
            maintainAspectRatio:false
        };

        const options2Mobile = {
            rotation: 90, // Start at the top
            plugins: 
            {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false
                },
                datalabels: {
                },
            },        
            animation: false,
            responsive:true,
            maintainAspectRatio:false
        };


        const setBackgroundBasedOnH1 = (h1Text) => {
            // Je nach Text des h1-Elements das entsprechende Hintergrundbild auswählen
            if (h1Text === "MAINAINABILITY") {
                return "textDisplay_Maintainability";
            } else if (h1Text === "MATERIAL SUITABILITY") {
                return "textDisplay_Material";
            } else if (h1Text === "MANUFACTURABILITY") {
                return "textDisplay_Manufacture";
            } else if (h1Text === "PRODUCT LABELING") {
                return "textDisplay_Product";
            } else if (h1Text === "USER FRIENDLINESS") {
                return "textDisplay_User";
            } else if (h1Text === "TRANSPORTABILITY") {
                return "textDisplay_Transportability";
            } else if (h1Text === "RECYCLABILITY") {
                return "textDisplay_Recycle";
            } else if (h1Text === "FUNCTIONALITY") {
                return "textDisplay_Functionality";
            } else if (h1Text === "ASSEMBLABILITY AND DISASSEMBLABILITY") {
                return "textDisplay_Assem";
            }
            // Fügen Sie hier weitere Bedingungen für die anderen Bilder hinzu
            else {
                return "textDisplay_Maintainability"; // Wenn kein passender Text gefunden wurde, kein Hintergrundbild anzeigen
            }
        };

        if(mobileLayout)
        {
            return(
                <div>

                    { /** Text Display*/ }
                    <div className="flex-auto pieChartDescriptionMobile relative z-10 mb-60 shadow">
                        <h1>{ title.toUpperCase() }</h1>
                        <p>{ text }</p>
                    
                        <Button onClick={ () => back() } className="backButton bg-transparent border-none pt-3">
                            <RiArrowGoBackLine size={45} color="white" />
                        </Button>
                    </div>
                    
                    <div className="w-full h-[100vh] fixed bottom-[-50vh] left-0 z-0">
                        {/** absolute bottom-0 w-full -mb-44 */}
                        <Pie className="halfPieChart"
                                data={data2}
                                options={options2Mobile}
                                ref={chartRef2}
                                onClick={onClick2}/>
                    </div>



                </div>
            );
        }
        else
        {
            return(
                <Row style={{ width: '131%', height: '100%' }} >
                
                    { /** Text Display*/ }
                    <Col xs="7">
                        <div className={setBackgroundBasedOnH1(selectedCategory.toUpperCase())}>
                            <container/>
                            <h1>{ title.toUpperCase() }</h1>
                            <p>{ text }</p>

                            <Button onClick={ () => back() } className="backButton">
                                <RiArrowGoBackLine size={45} color="white" />
                            </Button>

                        </div>
                    </Col>

                    {/** Half pie chart */}
                    <Col xs="5">

                        <Pie className="halfPieChart"
                            data={data2}
                            options={options2}
                            ref={chartRef2}
                            onClick={onClick2}/>

                    </Col>
                </Row>
            );
        }
    }
    
}