import React, { useEffect, useState } from "react"
import { Container, Row, Col, CardBody, Card } from "reactstrap"
import { Link } from "react-router-dom"


//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//Import Components
import SalesAnalyticsChart from "./salesanalytics-chart"
import TopProduct from "./top-country"
import TopUser from "./topuser"
import RecentActivity from "./recent-activity"
import SocialSource from "./socialsource"
import LatestTransaction from "./latest-transaction"
//Import Image
// import setupanalytics from "../../assets/images/setup-analytics-amico.svg"
import MiniWidget from "./mini-widget"
import userInstance from "../../Axios"
import { FaFire, FaStar, FaGlobe } from 'react-icons/fa';
import { MdAssessment } from 'react-icons/md';
import MyTable from "./MyTable"
import PieChart from "./PieChart"

const series1 = [{
  data: [25, 66, 41, 89, 63, 25, 44, 20, 36, 40, 54]
}]

const options1 = {
  fill: {
    colors: ['#5b73e8']
  },
  chart: {
    width: 70,
    sparkline: {
      enabled: !0
    }
  },
  plotOptions: {
    bar: {
      columnWidth: '50%'
    }
  },
  labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  xaxis: {
    crosshairs: {
      width: 1
    },
  },
  tooltip: {
    fixed: {
      enabled: !1
    },
    x: {
      show: !1
    },
    y: {
      title: {
        formatter: function (seriesName) {
          return ''
        }
      }
    },
    marker: {
      show: !1
    }
  }
};

const series2 = [70]

const options2 = {
  fill: {
    colors: ['#34c38f']
  },
  chart: {
    sparkline: {
      enabled: !0
    }
  },
  dataLabels: {
    enabled: !1
  },
  plotOptions: {
    radialBar: {
      hollow: {
        margin: 0,
        size: '60%'
      },
      track: {
        margin: 0
      },
      dataLabels: {
        show: !1
      }
    }
  }
};

const series3 = [55]

const options3 = {
  fill: {
    colors: ['#5b73e8']
  },
  chart: {
    sparkline: {
      enabled: !0
    }
  },
  dataLabels: {
    enabled: !1
  },
  plotOptions: {
    radialBar: {
      hollow: {
        margin: 0,
        size: '60%'
      },
      track: {
        margin: 0
      },
      dataLabels: {
        show: !1
      }
    }
  }
};

const series4 = [{
  data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54]
}]

const options4 = {

  fill: {
    colors: ['#f1b44c']
  },
  chart: {
    width: 70,
    sparkline: {
      enabled: !0
    }
  },
  plotOptions: {
    bar: {
      columnWidth: '50%'
    }
  },
  labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  xaxis: {
    crosshairs: {
      width: 1
    },
  },
  tooltip: {
    fixed: {
      enabled: !1
    },
    x: {
      show: !1
    },
    y: {
      title: {
        formatter: function (seriesName) {
          return ''
        }
      }
    },
    marker: {
      show: !1
    }
  }
};

const Dashboard = () => {

  const [summary,setSummary] = useState({})  

  useEffect(()=>{
    getData()
  },[])

  const getData = async()=>{
    try {
        const response = await userInstance.get('/summary')        
        setSummary(response.data)
    } catch (error) {
        
    }
}




const iconStyle = {
  fontSize: '24px', // Adjust this value to change the font size
  color: '#000', // Optional: set the color of the icon
};

const reports = [
  {
    id: 1,
    icon: <FaFire style={iconStyle} />, // Apply inline style
    title: "Total Intensity",
    value: summary?.totalIntensity || 0,
    prefix: "",
    suffix: "",
    badgeValue: "2.65%",
    decimal: 0,
    charttype: "bar",
    chartheight: 40,
    chartwidth: 70,
    color: "success",
    desc: "since last week",
    series: series1,
    options: options1,
  },
  {
    id: 2,
    icon: <MdAssessment style={iconStyle} />, // Apply inline style
    title: "Total Likelihood",
    value: summary?.totalLikelihood || 0,
    decimal: 0,
    charttype: "radialBar",
    chartheight: 45,
    chartwidth: 45,
    prefix: "",
    suffix: "",
    badgeValue: "0.82%",
    color: "danger",
    desc: "since last week",
    series: series2,
    options: options2,
  },
  {
    id: 3,
    icon: <FaStar style={iconStyle} />, // Apply inline style
    title: "Total Relevance",
    value: summary?.totalRelevance || 0,
    decimal: 0,
    prefix: "",
    suffix: "",
    charttype: "radialBar",
    chartheight: 45,
    chartwidth: 45,
    badgeValue: "6.24%",
    color: "danger",
    desc: "since last week",
    series: series3,
    options: options3,
  },
  {
    id: 4,
    icon: <FaGlobe style={iconStyle} />, // Apply inline style
    title: "Total Countries",
    value: summary?.totalCountries,
    decimal: 0,
    prefix: "",
    suffix: "",
    charttype: "bar",
    chartheight: 40,
    chartwidth: 70,
    badgeValue: "10.51%",
    color: "success",
    desc: "since last week",
    series: series4,
    options: options4,
  },
];



  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Charts" breadcrumbItem="Dashboard" />
          <Row>
            <MiniWidget reports={reports} />
          </Row>

          <Row className="mt-3">
            <Col md='12'>
              <SalesAnalyticsChart />
            </Col>
            <Col md='4' className="mt-3">
             
              <TopProduct />
            </Col>
            <Col md='8' >
            <div className="mt-16">
            <PieChart />
            </div>
            </Col>
          </Row>
          <Row>
            <Col md='12' className="mt-3">
            <MyTable />
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Dashboard