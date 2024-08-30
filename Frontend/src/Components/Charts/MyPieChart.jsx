import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const colors = ['#ff7f0e', '#2ca02c', '#1f77b4', '#d62728', '#9467bd']; // Color scheme

const dataForPieChart = [
  { name: 'Category A', value: 300 },
  { name: 'Category B', value: 150 },
  { name: 'Category C', value: 200 },
  { name: 'Category D', value: 120 },
  { name: 'Category E', value: 180 },
];

const MyPieChart = () => (
  <ResponsiveContainer width="100%" height={400}>

  <PieChart >
    <Pie
      dataKey="value"
      data={dataForPieChart}
      cx="50%"
      cy="50%"
      outerRadius={80}
      fill="#8884d8"
      label
    >
      {dataForPieChart.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
      ))}
    </Pie>
    <Tooltip />
    <Legend />
  </PieChart>
  </ResponsiveContainer>

);

export default MyPieChart;
