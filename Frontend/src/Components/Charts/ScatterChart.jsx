import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import userInstance from '../../Axios';

const CustomScatterPlot = () => {
  const [dataForScatterPlot, setDataForScatterPlot] = useState([]);

  const getCountry = async () => {
    try {
      const response = await userInstance.get('/cyclic');
      const formattedData = response.data
        .filter(item => new Date(item.published).getMonth() === new Date().getMonth())
        .map((item, index) => ({
          x: index + 1,
          intensity: item.intensity,
          relevance: item.relevance,
          likelihood: item.likelihood,
          name: item.published,
        }));
      setDataForScatterPlot(formattedData);
    } catch (error) {
      // Handle error
    }
  };

  useEffect(() => {
    getCountry();
  }, []);

  return (
    <div className='p-10 border-2 rounded-md mb-20' style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
      <ResponsiveContainer width="100%" height={400}>
      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
  <XAxis
    dataKey="x"
    name="Data Index"
    label={{ value: 'Data Index', position: 'insideBottom', dy: 10 }}
    domain={[1, 5]} // Set the domain as needed (from 1 to 5 as an example)
  />
  <YAxis type="number" name="Value" label={{ value: 'Value', angle: -90, position: 'insideLeft' }} />
  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
  <Legend iconType="square" align="right" layout="vertical" verticalAlign="middle" />
  {/* Intensity */}
  <Scatter name="Intensity" data={dataForScatterPlot} fill="#8884d8" shape="circle" dataKey="intensity" />
  {/* Relevance */}
  <Scatter name="Relevance" data={dataForScatterPlot} fill="#82ca9d" shape="circle" dataKey="relevance" />
  {/* Likelihood */}
  <Scatter name="Likelihood" data={dataForScatterPlot} fill="#ffc658" shape="circle" dataKey="likelihood" />
</ScatterChart>

      </ResponsiveContainer>
    </div>
  );
};

export default CustomScatterPlot;
