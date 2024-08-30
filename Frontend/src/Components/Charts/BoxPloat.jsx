import React from 'react';
import { Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const dataForBoxPlot = [
  { name: 'Category A', min: 10, q1: 20, median: 30, q3: 40, max: 50 },
  { name: 'Category B', min: 15, q1: 25, median: 35, q3: 45, max: 55 },
  // Add more data for your box plot
];

const BoxPlotChart = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
    <BarChart  data={dataForBoxPlot}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="max" fill="#8884d8" />
      <Bar dataKey="q3" fill="#8884d8" />
      <Bar dataKey="median" fill="#000" />
      <Bar dataKey="q1" fill="#8884d8" />
      <Bar dataKey="min" fill="#8884d8" />
    </BarChart>
    </ResponsiveContainer>

  );
};

export default BoxPlotChart;
