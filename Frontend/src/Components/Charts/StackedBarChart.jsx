import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';
import userInstance from '../../Axios';
// ... Previous imports and setup

const StackedBarChart = () => {
  const [datas, setDatas] = useState([]);
  const getCountry = async () => {
    try {
      const response = await userInstance.get('/regionAndTopic');
      setDatas(response.data);
    } catch (error) {
      // Handle error
    }
  };

  useEffect(() => {
    getCountry();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={datas}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="region" />
        <YAxis />
        <Tooltip />
        <Legend />
        {datas.map((data, index) => (
          <Bar
            key={index}
            dataKey={`topics.${Object.keys(data?.topics || {}).find(key => data.topics[key])}`}
            stackId="a"
            fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StackedBarChart;
