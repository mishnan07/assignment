import React, { useEffect, useState } from "react"
import ReactApexChart from "react-apexcharts"
import userInstance from "../../Axios"
import { CardTitle } from "reactstrap"

const PieChart = () => {
  const [series,setSeries] = useState([])
  const [label,setLabels] = useState([])

  useEffect(()=>{
    fetchData()
  },[])
  
  const fetchData = async()=>{
    try {
      const res = await userInstance.get('/pestle')      
      setSeries(res?.data?.data[0]?.pestle)
      setLabels(res?.data?.data[0]?.label)
    } catch (error) {
      
    }
  }
  const options = {
    labels:label,
    colors: [
      "#34c38f",
      "#5b73e8",
      "#f1b44c",
      "#50a5f1",
      "#f46a6a",
      "#6f42c1",
      "#e83e8c",
      "#20c997",
      "#ffc107",
      "#fd7e14",
      "#6610f2",
      "#d63384",
      "#d63384"
    ],
        legend: {
      show: !0,
      position: 'bottom',
      horizontalAlign: 'center',
      verticalAlign: 'middle',
      floating: !1,
      fontSize: '14px',
      offsetX: 0
    },
    responsive: [{
      breakpoint: 600,
      options: {
        chart: {
          height: 240
        },
        legend: {
          show: !1
        },
      }
    }]
  }

  return (
    <>
        <CardTitle className="mb-4 h4">Pestles</CardTitle>

    <ReactApexChart options={options} series={series} type="pie" height="320" className="apex-charts" />
  </>
  )
}

export default PieChart
