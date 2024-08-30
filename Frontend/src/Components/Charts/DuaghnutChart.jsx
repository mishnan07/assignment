import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Tooltip, Cell, Legend, ResponsiveContainer } from 'recharts';
import userInstance from '../../Axios';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const DoughnutChart = () => {
  const [datas, setDatas] = useState([]);

  const getRegion = async () => {
    try {
      const response = await userInstance.get('/region');
      setDatas(response.data);
    } catch (error) {
      // Handle error
    }
  };

  useEffect(() => {
    getRegion();
  }, []);

  // Extract the regions to use as legends
  const regions = datas.map((entry) => entry.region);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={datas}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="count"
        >
          {datas.map((entry, index) => (
            <Cell key={`cell-${entry.count}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value, region, entry) => [value, entry.payload.region]} />
        {/* Use the extracted regions as legends */}
        <Legend payload={regions.map((region, index) => ({ value: region, type: 'square', id: region, color: COLORS[index % COLORS.length] }))} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DoughnutChart;
