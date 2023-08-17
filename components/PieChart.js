import { React, useRef, useState } from "react";
import{
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend 
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { Pie, getElementAtEvent } from 'react-chartjs-2';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    ChartDataLabels
);


export default function PieChart( props )
{
    const chartRef = useRef();
    const [selectedCategory, setSelectedCategory] = useState();

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
        
        // Display the new data
        setSelectedCategory( category ); // the array which saves the subelements of the category
    }

    function getCdpTitles( category )
    {
        var result = [''];
        category.forEach( (item, index ) => {
            result.push(item.cdp_title);
        });
        return result;
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

        var outerChart2Length = [outerChart2.length]; // to make only the left half have the items
        for (var i = 0; i< outerChart2.length - 1; i++) { // -1 bcs of bug, there is one item too much otherwise dont know why
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
                    }
                }        
        };

        return(
            <div style={{ width: '100%', height: '100%' }} >
                <Pie
                    data={data2}
                    options={options2}
                    //ref={chartRef}
                    //onClick={onClick}
                />
            </div>
        );
    }

}