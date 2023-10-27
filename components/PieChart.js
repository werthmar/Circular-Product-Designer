import { React, useRef, useState } from "react";
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

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    ChartDataLabels
);


export default function PieChart( props )
{

    var width = screen.width;
    var height = screen.height;

    const toggleDescription = props.toggleDescription;
    const chartRef = useRef();
    const chartRef2 = useRef();
    const [selectedCategory, setSelectedCategory] = useState();
    const [title, setTitle] = useState();
    const [text, setText] = useState();

    // Rearrange data from database
    var _data = props.data.descriptions;
    var outerChart = [];
    var outerChartLength = [];
    var innerChart = ['DOWNLOAD LIST\n OF SOLUTIONS']
    console.log(_data);

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
    var lastItemName;
    _data.forEach( (item, index) => {           
        // Only show one item of each cdp, change bcs of only cdp display, not title of solution
        if ( item.name != lastItemName ) {   
            if (item.id >= 46 && item.id <= 58) functionality.push(item);
            if (item.id >= 59 && item.id <= 76) materialSuitability.push(item);
            if (item.id >= 77 && item.id <= 93) manufacturability.push(item);
            if (item.id >= 94 && item.id <= 109) assemblabilityAndDisassemblability.push(item);
            if (item.id >= 110 && item.id <= 121) userFriendliness.push(item);
            if (item.id >= 122 && item.id <= 132) maintainability.push(item);
            if (item.id >= 133 && item.id <= 145) recyclability.push(item);
            if (item.id >= 146 && item.id <= 153) productLabeling.push(item);
            if (item.id >= 154 && item.id <= 163) transportability.push(item);
            lastItemName = item.name;
        }
    });


    // Only display the Solution categories which have apllieable sulotions for the user made selection
    if (functionality.length != 0) outerChart.push('FUNCTIONALITY');
    if (materialSuitability.length != 0) outerChart.push('MATERIAL SUITABILITY');
    if (manufacturability.length != 0) outerChart.push('MANUFACTURABILITY');
    if (assemblabilityAndDisassemblability.length != 0) outerChart.push('ASSEMBLABILITY AND\n DISASSEMBLABILITY');
    if (userFriendliness.length != 0) outerChart.push('USER FRIENDLINESS'); 
    if (maintainability.length != 0) outerChart.push('MAINAINABILITY');
    if (recyclability.length != 0) outerChart.push('RECYCLABILITY'); 
    if (productLabeling.length != 0) outerChart.push('PRODUCT LABELING'); 
    if (transportability.length != 0) outerChart.push('TRANSPORTABILITY'); 
    
    for (var i = 0; i< outerChart.length; i++) {
        outerChartLength.push(1); // all have the same size
    }

    // Vordefinierte Werte für verschiedene Auflösungen
    const resolutions = [
        { width: 4096, height: 2060, fontSize1: 40, fontSize2: 60 },
        { width: 1916, height: 1030, fontSize1: 18, fontSize2: 50 },
        { width: 1366, height: 1024, fontSize1: 14, fontSize2: 35 },
        { width: 844, height: 390, fontSize1: 5, fontSize2: 15 }
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

    // 4096 x 2060 = 40 - 60
    // 1916 x 1030 = 18 - 50
    // 1366 x 1024 = 14 - 35
    // 844 x 390 = 5 - 15

    // --- Pie Chart 1 with category selection ----------------------------
    const data = {
        datasets:[
            // Outer Circle
            {
                labels: outerChart,
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
                    display: false
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

        // Display the new data
            // the array which saves the subelements of the category
            setTitle( category );
            setSelectedCategory( category );
            setCategoryText( category );
    }

    function getCdpTitles( category )
    {
        var result = [''];
        category.forEach( (item, index ) => {
            result.push(item.name);
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
            case 'MAINAINABILITY':
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
            case 'MAINAINABILITY':
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
            setTitle( category[ element[0].index - 1 ].name );
            setText( category[ element[0].index - 1 ].description );
    }

    // Function that lets you go back to the first pie chart from the second pie chart
    function back()
    {
        toggleDescription();
        setSelectedCategory( undefined );
    } 


    // No category has been selected yet, display pieChart 1
    if( selectedCategory == undefined )
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
                outerChart2 = getCdpTitles(functionality);
                break;
            case 'MATERIAL SUITABILITY':
                outerChart2 = getCdpTitles(materialSuitability);
                break;
            case 'MANUFACTURABILITY':
                outerChart2 = getCdpTitles(manufacturability);
                break;
            case 'ASSEMBLABILITY AND DISASSEMBLABILITY':
                outerChart2 = getCdpTitles(assemblabilityAndDisassemblability);
                break;
            case 'USER FRIENDLINESS':
                outerChart2 = getCdpTitles(userFriendliness);
                break;
            case 'MAINAINABILITY':
                outerChart2 = getCdpTitles(maintainability);
                break;
            case 'RECYCLABILITY':
                outerChart2 = getCdpTitles(recyclability);
                break;
            case 'PRODUCT LABELING':
                outerChart2 = getCdpTitles(productLabeling);
                break;
            case 'TRANSPORTABILITY':
                outerChart2 = getCdpTitles(transportability);
                break;
        }                
        
        var outerChart2Length = [outerChart2.length - 1 ]; // to make only the left half have the items
        for (var i = 0; i< outerChart2.length - 1; i++) { // -1 bcs of the blank left side added
            outerChart2Length.push(1); // all have the same size
        }
        
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
                        color: 'black',
                        font: {
                            size: 12,
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
                    labels: [ '', selectedCategory ],
                    data: [ 1, 1 ],
                    backgroundColor: [ 'rgb(47, 52, 55)' ],
                    borderColor: 'transparent',
                    datalabels: {
                        anchor: "center", //start, center, end
                        color: 'white',
                        font: {
                            size: 15,
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
        
        return(
            <Row style={{ width: '131%', height: '100%' }} >
            
                { /** Text Display*/ }
                <Col xs="7">
                    <div className="textDisplay">
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