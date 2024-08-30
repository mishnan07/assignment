import PropTypes from 'prop-types'
import React from "react"
import { Col, Card, CardBody } from "reactstrap"
import CountUp from 'react-countup';
import ReactApexChart from "react-apexcharts"
import { FaChartBar } from 'react-icons/fa'; // Import the icon
const MiniWidget = props => {
  return (
    <React.Fragment>
      {props.reports.map((report, key) => (
        <Col md={6} xl={3} key={key}>
          <Card>
            <CardBody>
              <div className="float-end mt-2">
               
                  {report.icon}              

              </div>
              <div>
                <h4 className="mb-1 mt-1"><span><CountUp end={report.value} separator="," prefix={report.prefix} suffix={report.suffix} decimals={report.decimal} /></span></h4>
                <p className="text-muted mb-0">{report.title}</p>
              </div>
             
            </CardBody>
          </Card>
        </Col>
      ))}
    </React.Fragment>
  )
}

export default MiniWidget

MiniWidget.propTypes = {
  reports: PropTypes.array
}