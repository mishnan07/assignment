import React, { useEffect, useState } from "react"
import { Card, CardBody, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Row, Col, Progress } from "reactstrap"
import userInstance from "../../Axios"

const TopProduct = () => {
    const [TopCountry, setTopCountry] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    const colorMapping = [
        'primary',    // Blue
        'secondary',  // Gray
        'success',    // Green
        'danger',     // Red
        'warning',    // Yellow
        'info',       // Teal
        'lightblue',      // Light Gray
        'dark',       // Dark Gray
        'purple',     // Purple
        'pink'        // Pink
    ];
    

    const fetchData = async () => {
        try {
            const res = await userInstance.get(`top-country`)
            const dataWithColors = res?.data?.data?.map((item, index) => ({
                ...item,
                color: colorMapping[index] // Use modulo to handle more items than colors
            }))
            setTopCountry(dataWithColors)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    return (
        <React.Fragment>
            <Card>
                <CardBody>
                    <div className="float-end">
                       
                    </div>
                    <h4 className="card-title mb-4">Top Countries</h4>

                    {TopCountry.map((progressbar, key) => (
                        <Row className="align-items-center g-0 mt-3" key={key}>
                            <Col sm={6}>
                                <p className="text-truncate mt-1 mb-0">
                                    <i className="mdi mdi-circle-medium" style={{ color: progressbar.color }}></i> 
                                    {progressbar.name}
                                </p>
                            </Col>
                            <Col sm={6}>
                                <div className="mt-1" style={{ height: "6px" }}>
                                    <Progress
                                        value={progressbar.value}
                                        color={progressbar.color}
                                        size="sm"
                                        className="progress-sm"
                                    />
                                </div>
                            </Col>
                        </Row>
                    ))}
                </CardBody>
            </Card>
        </React.Fragment>
    )
}

export default TopProduct
