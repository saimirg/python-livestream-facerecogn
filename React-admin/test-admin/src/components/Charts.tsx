import React, { useEffect, useRef, useState } from 'react';
import { Title, useRecordContext } from 'react-admin';
import ChartsEmbedSDK from '@mongodb-js/charts-embed-dom';
import { useParams } from 'react-router-dom';
import '../css/Charts.css';

const Charts = () => {
    const routeParams = useParams();
    const [inputDate, setInputDate] = useState(routeParams.date);
    const [inputName, setInputName] = useState(routeParams.name);
    const hourChartRef = useRef(null);
    const dayChartRef = useRef(null);
    const monthChartRef = useRef(null);
    // const yearChartRef = useRef(null);
    const tvHourChartRef = useRef(null);
    const tvDayChartRef = useRef(null);
    const tvMonthChartRef = useRef(null);
    // const tvYearChartRef = useRef(null);
    
    const chartIds = {
        hourChartRef: "664753b1-b61f-40cc-8839-22cbab476412",
        dayChartRef: "664753b1-b61f-4e0f-8e57-22cbab476410",
        monthChartRef: "664753b1-b61f-4a39-8bc2-22cbab476414",
        // yearChartRef: "6630c1c8-ad29-4ac2-8f29-b7b364bd79bd",
    };

    const tvChartIds = {
        hourChartRef: "664753b1-b61f-4882-85c0-22cbab476418",
        dayChartRef: "664753b1-b61f-4dd4-80f2-22cbab47641a",
        monthChartRef: "664753b1-b61f-4e88-896b-22cbab47641c",
        // yearChartRef: "6630f71e-6ab3-4fcd-8d2d-48f08c7d5eea",
    };

    useEffect(() => {
        const sdk = new ChartsEmbedSDK({
            baseUrl: "https://charts.mongodb.com/charts-hottelio-minxu",
        });

        const createChart = (chartId:any, filter:any, ref:any) => {
            const chart = sdk.createChart({
                chartId: chartId,
                filter: filter
            });
            if (ref.current) {
                chart.render(ref.current).catch(err => console.error("Chart rendering failed:", err));
            }
        };

        interface Filter {
                        name: string | undefined;
                        date?: string;
                        month?: string;
                        year?: string;
                    }

        let hourFilter : Filter= { name: inputName };
        let dayFilter : Filter= { name: inputName };
        let monthFilter : Filter= { name: inputName };


        if (inputDate) {
            const [month, day, year] = inputDate.split('/');
            const date = `${month}/${day}/${year}`;
            hourFilter.date = date;
            dayFilter.month = month;
            dayFilter.year = year;
            monthFilter.year = year;
        }
        
        
        createChart(chartIds.hourChartRef, hourFilter, hourChartRef);
        createChart(tvChartIds.hourChartRef, hourFilter, tvHourChartRef);

        // Create other charts without filters
        createChart(chartIds.dayChartRef,dayFilter, dayChartRef);
        createChart(tvChartIds.dayChartRef,dayFilter, tvDayChartRef);
        createChart(chartIds.monthChartRef,monthFilter, monthChartRef);
        createChart(tvChartIds.monthChartRef,monthFilter, tvMonthChartRef);
        // createChart(chartIds.yearChartRef, {}, yearChartRef);
        // createChart(tvChartIds.yearChartRef, {}, tvYearChartRef);
    }, [inputName, inputDate]);

    const handleDateChange = (event:any) => {
        setInputDate(event.target.value);
    };

    const handleNameChange = (event:any) => {
        setInputName(event.target.value);
    };

    const names = [
        "Edi Rama", "Eni Vasili", "Fitim Zekthi", "Lulezim Basha",
        "Aldo Bumci", "Ben Andoni", "Blendi Fevziu", "Erjon Veliaj", 
        "Nisida Tufa", "Ola Bruko", "Sali Berisha", "Ilir Meta", 
        "Grida Duma", "Monika Kryemadhi", "Gazment Bardhi", "Lorenc Vangjeli"
    ];

    return (
        <div>
            <Title title='Charts' />
            <h1>{inputName} {inputDate}</h1>
            <div>
                <div>Put a date</div>
                <input 
                    type="text" 
                    value={inputDate} 
                    onChange={handleDateChange} 
                    placeholder="MM/DD/YYYY" 
                />
                <div>
                    Choose Name
                </div>
                <select 
                    value={inputName} 
                    onChange={handleNameChange} 
                >
                    {names.map(name => (
                        <option key={name} value={name}>{name}</option>
                    ))}
                </select>
                
                <div className='chartContainer'>
                    <div className='timeChart'>
                        <div ref={hourChartRef} className='chart' style={{marginBottom:'10px'}}></div>
                        <div ref={dayChartRef} className='chart'style={{marginBottom:'10px'}}></div>
                        <div ref={monthChartRef} className='chart'style={{marginBottom:'10px'}}></div>
                        {/* <div ref={yearChartRef} className='chart'></div> */}
                    </div>
                    <div className='tvChart'>
                        <div ref={tvHourChartRef} className='chartTv'style={{marginBottom:'10px'}}></div>
                        <div ref={tvDayChartRef} className='chartTv'style={{marginBottom:'10px'}}></div>
                        <div ref={tvMonthChartRef} className='chartTv'style={{marginBottom:'10px'}}></div>
                        {/* <div ref={tvYearChartRef} className='chartTv'></div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Charts;
