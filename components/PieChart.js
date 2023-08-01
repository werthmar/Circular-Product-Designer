import { React, useRef } from "react";
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


export default function PieChart()
{
    const chartRef = useRef();
    const data = {
        datasets:[
            // Outer Circle
            {
                labels: [ 'x', 'y', 'z' ],
                data: [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
                backgroundColor: [ 'rgb(146, 154, 158)' ],
                datalabels: {
                    color: 'black',
                    formatter: (val, ctx) => (ctx.chart.data.datasets[0].labels[ctx.dataIndex])
                }
            },
            // Inner Circle
            {
                labels: [ 'one', 'two', 'three' ],
                data: [ 1, 1, 1, 1, 1, 1 ],
                backgroundColor: [ 'rgb(94, 103, 110)' ],
                datalabels: {
                    color: 'white',
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
                    // achieves text rotation, taken from: https://stackoverflow.com/questions/68030418/how-to-rotate-the-label-text-in-doughnut-chart-slice-vertically-in-chart-js-canv
                    anchor: "center", //start, center, end
                    rotation: function(ctx) {
                        const valuesBefore = ctx.dataset.data.slice(0, ctx.dataIndex).reduce((a, b) => a + b, 0);
                        const sum = ctx.dataset.data.reduce((a, b) => a + b, 0);
                        const rotation = ((valuesBefore + ctx.dataset.data[ctx.dataIndex] /2) /sum *360);
                        return rotation < 180 ? rotation-90 : rotation+90;
                    },
                }
            }        
    };

    const onClick = (event) => {
        console.log(getElementAtEvent(chartRef.current, event));
    }

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