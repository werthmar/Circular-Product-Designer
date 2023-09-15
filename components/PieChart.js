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
    var innerChart = ['DOWNLOAD LIST OF SOLUTIONS']
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

    _data.forEach( (item, index) => {
        if (item.id >= 46 && item.id <= 58) functionality.push(item);
        if (item.id >= 59 && item.id <= 76) materialSuitability.push(item);
        if (item.id >= 77 && item.id <= 93) manufacturability.push(item);
        if (item.id >= 94 && item.id <= 109) assemblabilityAndDisassemblability.push(item);
        if (item.id >= 110 && item.id <= 121) userFriendliness.push(item);
        if (item.id >= 122 && item.id <= 132) maintainability.push(item);
        if (item.id >= 133 && item.id <= 145) recyclability.push(item);
        if (item.id >= 146 && item.id <= 153) productLabeling.push(item);
        if (item.id >= 154 && item.id <= 163) transportability.push(item);
    });

    // Only display the Solution categories which have apllieable sulotions for the user made selection
    if (functionality.length != 0) outerChart.push('FUNCTIONALITY');
    if (materialSuitability.length != 0) outerChart.push('MATERIAL SUITABILITY');
    if (manufacturability.length != 0) outerChart.push('MANUFACTURABILITY');
    if (assemblabilityAndDisassemblability.length != 0) outerChart.push('ASSEMBLABILITY AND DISASSEMBLABILITY');
    if (userFriendliness.length != 0) outerChart.push('USER FRIENDLINESS'); 
    if (maintainability.length != 0) outerChart.push('MAINAINABILITY');
    if (recyclability.length != 0) outerChart.push('RECYCLABILITY'); 
    if (productLabeling.length != 0) outerChart.push('PRODUCT LABELING'); 
    if (transportability.length != 0) outerChart.push('TRANSPORTABILITY'); 
    
    for (var i = 0; i< outerChart.length; i++) {
        outerChartLength.push(1); // all have the same size
    }

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
                        size: 12,
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
                        size: 30,
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
            setText("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tincidunt tempus nisi, dictum dignissim enim faucibus vitae. Aenean egestas nunc commodo erat feugiat elementum. In hac habitasse platea dictumst. Proin ornare dignissim justo, sit amet tincidunt erat lobortis nec. Sed pulvinar condimentum dolor vitae consequat. Nunc pretium aliquet purus, et commodo felis lobortis nec. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec sed libero at lectus semper imperdiet vel nec dolor. Cras et pretium lectus. Nulla et est ornare, ultrices magna vel, facilisis justo. ");
            setSelectedCategory( category );
    }

    function getCdpTitles( category )
    {
        var result = [''];
        category.forEach( (item, index ) => {
            result.push(item.cdp_title);
        });
        return result;
    }

    // OnClick function for the second, more detailed pie chart
    const onClick2 = (event) => {
        // Determine which category the user clicked on
        let element = getElementAtEvent(chartRef2.current, event);
        var category;

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
            setTitle( category[ element[0].index - 1 ].cdp_title );
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
                            size: 16,
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
                    labels: [ selectedCategory ],
                    data: [ 1, ],
                    backgroundColor: [ 'rgb(47, 52, 55)' ],
                    borderColor: 'transparent',
                    datalabels: {
                        anchor: "start", //start, center, end
                        color: 'white',
                        font: {
                            size: 30,
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
        };


        return(
            <Row style={{ width: '100%', height: '100%' }} >
            
                { /** Text Display*/ }
                <Col xs="7">
                    <div className="textDisplay">
                        <h1>{ title }</h1>
                        <p>{ text }</p>

                        <Button onClick={ () => back() } className="backButton">
                            <RiArrowGoBackLine size={45} color="white" />
                        </Button>

                    </div>
                </Col>

                {/** make the text display here, make inside new bootstrap row */}
                <Col xs="5">

                <Pie className="halfPieChart"
                    data={data2}
                    options={options2}
                    ref={chartRef2}
                    onClick={onClick2}
                />
                </Col>
            </Row>
        );
    }

}