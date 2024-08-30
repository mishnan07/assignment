import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import userInstance from '../../Axios';
import './style.css'
import { Col, Row } from 'reactstrap';


const MyTable = () => {

    const [tableData, setTableData] = useState([])
    const [filterData, setFilterData] = useState({
        pestle: "",
        country: "",
        source: ""
    })

    const [total, setTotal] = useState(0)
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [sourceOptions, setSourceOPtions] = useState([])
    const [pestOptions, setPestOptions] = useState([])
    const [countryOptions, setCountryOptions] = useState([])

    useEffect(() => {
        getData()
    }, [filterData, current])

//Fetch Table Data
    const getData = async () => {
        try {
            const response = await userInstance.get(`/list?page=${current}&limit=${pageSize}&pestle=${filterData?.pestle}&source=${filterData?.source}&country=${filterData?.country}`);
            const data = response?.data?.data?.map((item, index) => ({
                key: index + 1 + (current - 1) * pageSize,
                PEST: item?.pestle || '',
                Source: item?.source || '',
                Country: item?.country || '',
                City: item?.city || '',
            }));
            setTableData(data);
            setTotal(response?.data?.count || 0); 
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    //Fetch Source Options
    useEffect(() => {
        const fetchource = async () => {
            try {
                const res = await userInstance.get(`/source`);
                setSourceOPtions(res?.data?.data)
            } catch (error) {

            }
        }
        fetchource()
    }, [])

    //Fetch Pestle Options
    useEffect(() => {
        const fetchPest = async () => {
            try {
                const res = await userInstance.get(`/pest`);
                setPestOptions(res?.data?.data)
            } catch (error) {

            }
        }
        fetchPest()
    }, [])

    //Fetch Country Options
    useEffect(() => {
        const fetchCountry = async () => {
            try {
                const res = await userInstance.get(`/country`);
                setCountryOptions(res?.data?.data)
            } catch (error) {

            }
        }
        fetchCountry()
    }, [])


    // Define static columns
    const columns = [
        {
            title: '#',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'PEST',
            dataIndex: 'PEST',
            key: 'PEST',
        },
        {
            title: 'Source',
            dataIndex: 'Source',
            key: 'Source',
        },
        {
            title: 'Country',
            dataIndex: 'Country',
            key: 'Country',
        },

    ];

    const handleTableChange = (pagination) => {
        setCurrent(pagination.current)
        setPageSize(pagination.pageSize)
        console.log('Page:', pagination.current);
        console.log('Page Size:', pagination.pageSize);
    };
    return (
        <>
            <div className="float-end d-flex justify-content-end w-full mb-3">
                <Row>
                    <Col md='2'>
                        <div className="select-input">
                            <label htmlFor="filterOption">PEST:</label>
                            <select
                                id="filterOption"
                                className="form-control me-2"
                                value={filterData?.pestle || ""}
                                onChange={(e) => setFilterData({ ...filterData, pestle: e.target.value })}
                            >
                                <option value="">Select an option</option>
                                {pestOptions?.map((item, index) => (
                                    <option key={index} value={item._id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </Col>
                    <Col md='2'>
                        <div className="select-input">
                            <label htmlFor="filterOption">Source:</label>
                            <select
                                id="filterOption"
                                className="form-control me-2"
                                value={filterData?.source || ""}
                                onChange={(e) => setFilterData({ ...filterData, source: e.target.value })}
                            >
                                <option value="">Select an option</option>
                                {sourceOptions?.map((item, index) => (
                                    <option key={index} value={item._id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </Col>

                    <Col md='2'>
                        <div className="select-input">
                            <label htmlFor="filterOption">Country:</label>
                            <select
                                id="filterOption"
                                className="form-control me-2"
                                value={filterData?.country || ""}
                                onChange={(e) => setFilterData({ ...filterData, country: e.target.value })}
                            >
                                <option value="">Select an option</option>
                                {countryOptions?.map((item, index) => (
                                    <option key={index} value={item._id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </Col>

                    <Col md='2'>
                    <div className="mt-4">
                            <button
                                className="btn btn-secondary"
                                onClick={() => setFilterData({
                                    pestle: "",
                                    country: "",
                                    source: ""
                                })}
                            >
                                Reset
                            </button>
                        </div>
                    </Col>




                </Row>





            </div>
            <Table
                columns={columns}
                dataSource={tableData}
                pagination={{
                    total: total,
                    current: current,
                    pageSize: pageSize,
                    onChange: (page, pageSize) => handleTableChange({ current: page, pageSize }),
                }}
                onChange={handleTableChange}
            />
        </>
    );
};

export default MyTable;
