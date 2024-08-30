import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Card, CardBody, CardTitle } from "reactstrap";
import CountUp from 'react-countup';
import userInstance from "../../Axios";
import './style.css'
import moment from 'moment';


const SalesAnalyticsChart = () => {
    const [series, setSeries] = useState([]);
    const [labels, setLabels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sectorOptions,setSectorOptions] = useState([])
    const [topicsOPtions,setTopicsOptions] = useState([])
    const [regionOptions,setRegionOptions] = useState([])

    const initial = {
        startDate : "2016-01-01",
        endDate :"2024-12-30",
        sector:"",
        topic:"",
        region:""
    }
    const [filterData,setFilterData] = useState(initial)

    useEffect(() => {
        fetchData();
    }, [filterData]);

    useEffect(()=>{
      const fetchSector = async()=>{
        try {
            const res = await userInstance.get(`/sector`);
            setSectorOptions(res?.data?.data)
        } catch (error) {
            
        }
      }
      fetchSector()
    },[])

    useEffect(()=>{
        const fetchTopic = async()=>{
          try {
              const res = await userInstance.get(`/topic`);
              setTopicsOptions(res?.data?.data)
          } catch (error) {
              
          }
        }
        fetchTopic()
      },[])

      useEffect(()=>{
        const fetchTopic = async()=>{
          try {
              const res = await userInstance.get(`/region`);
              setRegionOptions(res?.data?.data)
          } catch (error) {
              
          }
        }
        fetchTopic()
      },[])
    

    const generateYearLabels = (startDate, endDate) => {
        const startYear = moment(startDate).year();
        const endYear = moment(endDate).year();
        const years = [];

        for (let year = startYear; year <= endYear; year++) {
            years.push(moment(year, 'YYYY').format('YYYY'));
        }

        return years;
    };

    
 

    const fetchData = async () => {
        try {
            const response = await userInstance.get(`/Yearly?startDate=${filterData?.startDate}&endDate=${filterData?.endDate}&sector=${filterData?.sector}&topic=${filterData?.topic}&region=${filterData?.region}`);

            const fetchedData = response.data.data;

            if(fetchedData?.length > 0){
            const intensityData = fetchedData[0].totalIntensity || [];
            const likelihoodData = fetchedData[0].totalLikelihood || [];
            const relevanceData = fetchedData[0].totalRelevance || [];

            const labelsData = generateYearLabels(filterData?.startDate, filterData?.endDate); 
            const fetchedYears = fetchedData[0].year;
            const missedIndexes = labelsData
                .map((year, index) => (fetchedYears.includes(Number(year)) ? -1 : index))
                .filter(index => index !== -1);

           if(missedIndexes?.length > 0){
            missedIndexes.map((item)=>{
                intensityData[item] = 0
                likelihoodData[item] = 0
                relevanceData[item] = 0
            })
           }
           setSeries([
            { name: 'Intensity', type: 'column', data: intensityData },
            { name: 'Likelihood', type: 'area', data: likelihoodData  },
            { name: 'Relevance', type: 'line', data: relevanceData } 
        ]);
        setLabels(labelsData); 

        }else{
            setSeries([
                { name: 'Intensity', type: 'column', data: [] },
                { name: 'Likelihood', type: 'area', data: []  },
                { name: 'Relevance', type: 'line', data: [] } 
            ]);
        }
          
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data", error);
            setLoading(false);
        }
    };


    const options = {
        chart: {
            stacked: false,
            toolbar: {
                show: false
            }
        },
        stroke: {
            width: [0, 2, 4],
            curve: 'smooth'
        },
        plotOptions: {
            bar: {
                columnWidth: '30%'
            }
        },
        colors: ['#5b73e8', '#28a745', '#f1b44c'],
        fill: {
            opacity: [0.85, 0.25, 1],
            gradient: {
                inverseColors: false,
                shade: 'light',
                type: "vertical",
                opacityFrom: 0.85,
                opacityTo: 0.55,
                stops: [0, 100, 100, 100]
            }
        },
        labels: labels,
        markers: {
            size: 0
        },
        xaxis: {
            type: 'category',
            labels: {
                formatter: function (value) {
                    return value;
                }
            }
        },
        yaxis: {
            title: {
                text: 'Points',
            },
        },
        tooltip: {
            shared: true,
            intersect: false,
            y: {
                formatter: function (y) {
                    if (typeof y !== "undefined") {
                        return y.toFixed(0) + " points";
                    }
                    return y;
                }
            }
        },
        grid: {
            borderColor: '#f1f1f1'
        },
      
    };
    

    
    console.log(options,'series');

    return (
        <React.Fragment>
            <Card>
                <CardBody>
                    <div className="float-end">
                        <div className="date-filter">
                            <div className="date-input">
                                <label htmlFor="startDate">From:</label>
                                <input
                                    type="date"
                                    id="startDate"
                                    className="form-control me-2"
                                    value={filterData?.startDate}
                                    onChange={(e) => setFilterData({...filterData,startDate:e.target.value})}
                                />
                            </div>
                            <div className="date-input">
                                <label htmlFor="endDate">To:</label>
                                <input
                                    type="date"
                                    id="endDate"
                                    className="form-control me-2"
                                    value={filterData?.endDate}
                                    onChange={(e) => setFilterData({...filterData,endDate:e.target.value})}
                                />
                            </div>
                            <div className="select-input">
                                <label htmlFor="filterOption">Topic:</label>
                                <select
                                    id="filterOption"
                                    className="form-control me-2"
                                    value={filterData?.topic}
                                    onChange={(e) => setFilterData({ ...filterData, topic: e.target.value })}
                                >
                                    <option value="">Select an option</option>
                                    {topicsOPtions?.map((item, index) => (
                                        <option key={index} value={item._id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="select-input">
                                <label htmlFor="filterOption">Sector:</label>
                                <select
                                    id="filterOption"
                                    className="form-control me-2"
                                    value={filterData?.sector}
                                    onChange={(e) => setFilterData({ ...filterData, sector: e.target.value })}
                                >
                                    <option value="">Select an option</option>
                                    {sectorOptions?.map((item, index) => (
                                        <option key={index} value={item._id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="select-input">
                                <label htmlFor="filterOption">Region:</label>
                                <select
                                    id="filterOption"
                                    className="form-control me-2"
                                    value={filterData?.region}
                                    onChange={(e) => setFilterData({ ...filterData, region: e.target.value })}
                                >
                                    <option value="">Select an option</option>
                                    {regionOptions?.map((item, index) => (
                                        <option key={index} value={item._id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mt-4">
                            <button
                                className="btn btn-secondary"
                                onClick={() => setFilterData(initial)}
                            >
                                Reset
                            </button>
                        </div>

                        </div>
                    </div>
                    <CardTitle className="mb-4 h4"> Analytics</CardTitle>
                   
                    <div className="mt-3">
                        {loading ? <p>Loading...</p> : (
                            <ReactApexChart
                                options={options}
                                series={series}
                                height="339"
                                type="line"
                                className="apex-charts"
                            />
                        )}
                    </div>
                </CardBody>
            </Card>
        </React.Fragment>
    );
}

export default SalesAnalyticsChart;
