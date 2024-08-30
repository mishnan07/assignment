import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';
import userInstance from '../../Axios';

const CyclicChart = () => {

  const [datas, setDatas] = useState([]);

  const getCountry = async () => {
    try {
      const response = await userInstance.get('/cyclic');
      setDatas(response.data);
    } catch (error) {
      // Handle error
    }
  };

  useEffect(() => {
    getCountry();
  }, []);


  const transformedData = datas.filter(item => new Date(item.published).getMonth() === new Date().getMonth()).map((item, index) => ({
    time: index, // Just an example, you may need to define 'time' more meaningfully
    intensity: Math.sin(index) * item.intensity,
    relevance: Math.sin(index) * item.relevance,
    likelihood: Math.sin(index) * item.likelihood,
    published: item.published
  }));

  return (
    <div className='p-10 border-2 rounded-md mb-20' style={{ boxShadow: '0 4px 10px 0 rgba(0,0,0,0.1)', background: '#f8f8f8' }}>
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={transformedData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
        <XAxis dataKey="published" />
        <YAxis />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Legend verticalAlign="top" height={36} />
        <Line type="monotone" dataKey="intensity" stroke="#8884d8" strokeWidth={2} dot={{ fill: '#8884d8' }} name="Intensity" />
        <Line type="monotone" dataKey="relevance" stroke="#82ca9d" strokeWidth={2} dot={{ fill: '#82ca9d' }} name="Relevance" />
        <Line type="monotone" dataKey="likelihood" stroke="#ffc658" strokeWidth={2} dot={{ fill: '#ffc658' }} name="Likelihood" />
      </LineChart>
    </ResponsiveContainer>
  </div>
  
  );
};

export default CyclicChart;
