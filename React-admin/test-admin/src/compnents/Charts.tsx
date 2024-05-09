// import React, { useEffect, useRef, useState } from 'react';
// import { Title, useRecordContext} from 'react-admin';
// import ChartsEmbedSDK from '@mongodb-js/charts-embed-dom';
// import { useParams } from 'react-router-dom';
// import '../css/Charts.css';



// const Charts = () => {
 
//     const routeParams = useParams();
//     // console.log(routeParams)
//     // const nameChartRef = useRef(null);
//     // const dateChartRef = useRef(null);
//     // const hourChartRef = useRef(null);
//     // const dayChartRef = useRef(null);
//     // const monthChartRef = useRef(null);
//     // const yearChartRef = useRef(null);

//     const [selectedChart, setSelectedChart] = useState('hourChartRef');
//     // Refs for each chart
//     const chartRefs = {
//         hourChartRef: useRef(null),
//         dayChartRef: useRef(null),
//         monthChartRef: useRef(null),
//         yearChartRef: useRef(null)
//     };
    
//     useEffect(() => {
//         const sdk = new ChartsEmbedSDK({
//             baseUrl: "https://charts.mongodb.com/charts-project-0-dkebfip",
//         });

//         // const nameChart = sdk.createChart({
//         //     chartId: "662780e8-002f-4395-8253-5858add36289",
//         //     filter: {'name': routeParams.name} // filter by name
//         // });
//         // // console.log('name',nameChart)

//         // const dateChart = sdk.createChart({
//         //     chartId: "662a682c-7e64-4b10-8757-f9e6d8ebbd49",
//         //     filter: {'name': routeParams.name} // filter by name
//         // });

//         // const hourChart = sdk.createChart({
//         //     chartId: "6630baed-6ab3-4eec-8c04-48f08c0bf272",
//         //     filter: {'name': routeParams.name} // filter by name
//         // });

//         // const dayChart = sdk.createChart({
//         //     chartId: "6630b38a-548d-44b8-813d-8bcbae2c04eb",
//         //     filter: {'name': routeParams.name} // filter by name
//         // });

//         // const monthChart = sdk.createChart({
//         //     chartId: "6630c15a-4e7d-414e-8975-54b4a48236d1",
//         //     filter: {'name': routeParams.name} // filter by name
//         // });

//         // const yearChart = sdk.createChart({
//         //     chartId: "6630c1c8-ad29-4ac2-8f29-b7b364bd79bd",
//         //     filter: {'name': routeParams.name} // filter by name
//         // });
//         const createChart = (chartId:any, ref:any) => {
//             const chart = sdk.createChart({
//                 chartId: chartId,
//                 filter: {'name': routeParams.name} // filter by name
//             });
//             chart.render(ref.current).catch(err => console.error("Chart rendering failed:", err));
//             console.log(chartId)
//             console.log(chart)
//         };

//         // Create and render charts
//         createChart("6630baed-6ab3-4eec-8c04-48f08c0bf272", chartRefs.hourChartRef);
//         createChart("6630b38a-548d-44b8-813d-8bcbae2c04eb", chartRefs.dayChartRef);
//         createChart("6630c15a-4e7d-414e-8975-54b4a48236d1", chartRefs.monthChartRef);
//         createChart("6630c1c8-ad29-4ac2-8f29-b7b364bd79bd", chartRefs.yearChartRef);

//         // if (nameChartRef.current) {
//         //     nameChart.render(nameChartRef.current).catch(err => console.error("Chart rendering failed:", err));
//         // }
//         // if (dateChartRef.current) {
//         //     dateChart.render(dateChartRef.current).catch(err => console.error("Chart rendering failed:", err));
//         // }
//         // if (hourChartRef.current) {
//         //     hourChart.render(hourChartRef.current).catch(err => console.error("Chart rendering failed:", err));
//         // }
//         // if (dayChartRef.current) {
//         //     dayChart.render(dayChartRef.current).catch(err => console.error("Chart rendering failed:", err));
//         // }
//         // if (monthChartRef.current) {
//         //     monthChart.render(monthChartRef.current).catch(err => console.error("Chart rendering failed:", err));
//         // }
//         // if (yearChartRef.current) {
//         //     yearChart.render(yearChartRef.current).catch(err => console.error("Chart rendering failed:", err));
//         // }
//         // return () => {
//         //     if (chartRef.current) {
//         //         chart.dispose(); // Clean up the chart instance when the component unmounts
//         //     }
//         // };
//     }, [routeParams.name, selectedChart]);

//     const handleChartChange = (event:any) => {
//         setSelectedChart(event.target.value);
//         console.log(event.target.value)
//     };


//     return (
//         <div>
//             <Title title='Charts'/>
//             <h1>{routeParams.name}</h1>
//             {/* <div className='chartContainer'>
//                 <div ref={nameChartRef} id="nameChart" className='namechart'></div>
//                 <div ref={dateChartRef} id="dateChart" className='datechart'></div>
//             </div> */}
//             <div>
//                 <select onChange={handleChartChange} value={selectedChart}>
//                     <option value="hourChartRef">Hour</option>
//                     <option value="dayChartRef">Day</option>
//                     <option value="monthChartRef">Month</option>
//                     <option value="yearChartRef">Year</option>
//                 </select>
//                 <div>
//                     {selectedChart === 'hourChartRef' && <div ref={chartRefs.hourChartRef} className='chart'></div>}
//                     {selectedChart === 'dayChartRef' && <div ref={chartRefs.dayChartRef} className='chart'></div>}
//                     {selectedChart === 'monthChartRef' && <div ref={chartRefs.monthChartRef} className='chart'></div>}
//                     {selectedChart === 'yearChartRef' && <div ref={chartRefs.yearChartRef} className='chart'></div>}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Charts;


import React, { useEffect, useRef, useState } from 'react';
import { Title, useRecordContext} from 'react-admin';
import ChartsEmbedSDK from '@mongodb-js/charts-embed-dom';
import { useParams } from 'react-router-dom';
import '../css/Charts.css';

const Charts = () => {
 
    const routeParams = useParams();
    const [selectedChart, setSelectedChart] = useState('hourChartRef');
    const chartRef = useRef(null);
    const tvChartRef = useRef(null);

    // Refs for each chart
    const chartIds = {
        hourChartRef: "6630baed-6ab3-4eec-8c04-48f08c0bf272",
        dayChartRef: "6630b38a-548d-44b8-813d-8bcbae2c04eb",
        monthChartRef: "6630c15a-4e7d-414e-8975-54b4a48236d1",
        yearChartRef: "6630c1c8-ad29-4ac2-8f29-b7b364bd79bd",
    };
    const tvChartIds = {
        hourChartRef:"6630f35e-5bea-40df-8b00-65720438c740",
        dayChartRef: "6630f588-9994-4e86-8182-52d16ccb4032",
        monthChartRef: "6630f6b0-548d-40a9-895d-8bcbaeb3ad6e",
        yearChartRef: "6630f71e-6ab3-4fcd-8d2d-48f08c7d5eea",
    };

    useEffect(() => {
        const sdk = new ChartsEmbedSDK({
            baseUrl: "https://charts.mongodb.com/charts-project-0-dkebfip",
        });
    
        const createChart = (chartId:any, filter:any) => {
            const chart = sdk.createChart({
                chartId: chartId,
                filter: filter
            });
            if(chartRef.current){
                chart.render(chartRef.current).catch(err => console.error("Chart rendering failed:", err));
            }
        };
    
        const createChartTv = (chartId:any, filter:any) => {
            const chartTv = sdk.createChart({
                chartId: chartId,
                filter: filter
            });
            if(tvChartRef.current){
                chartTv.render(tvChartRef.current).catch(err => console.error("Chart rendering failed:", err));
            }
        };
        

        interface Filter {
            name: string | undefined;
            date?: string;  // Make the date property optional
            month?:string;
            year?:string;
        }
        let filter: Filter = {'name': routeParams.name};
        if (routeParams.date) {
            if (selectedChart === 'hourChartRef' || selectedChart==='dayChartRef') {
               filter = {'name': routeParams.name, 'date': routeParams.date}
            } else {
                filter = filter // Simple date filtering for other charts
            }
        }
        if (routeParams.month) {
            if (selectedChart === 'monthChartRef') {
               filter = {'name': routeParams.name, 'month': routeParams.month}
            } else {
                filter = filter // Simple date filtering for other charts
            }
        }
        if (routeParams.year) {
            if (selectedChart === 'yearChartRef') {
               filter = {'name': routeParams.name, 'year': routeParams.year}
            } else {
                filter = filter // Simple date filtering for other charts
            }
        }
    
        createChart(chartIds[selectedChart as keyof typeof chartIds], filter);
        createChartTv(tvChartIds[selectedChart as keyof typeof tvChartIds], filter);
    }, [selectedChart, routeParams.name, routeParams.date]);
    

    const handleChartChange = (event:any) => {
        setSelectedChart(event.target.value);
    };

    return (
        <div>
            <Title title='Charts'/>
            <h1>{routeParams.name} {routeParams.date}</h1>
            <div>
                <select onChange={handleChartChange} value={selectedChart}>
                    <option value="hourChartRef">Hour</option>
                    <option value="dayChartRef">Day</option>
                    <option value="monthChartRef">Month</option>
                    <option value="yearChartRef">Year</option>
                </select>
                <div className='chartContainer'>
                    <div className='timeChart'>
                        <div ref={chartRef} className='chart'></div>
                    </div>
                    <div className='tvChart'>
                        <div ref={tvChartRef} className='chartTv'></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Charts;
