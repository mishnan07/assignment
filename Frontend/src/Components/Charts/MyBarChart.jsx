import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import userInstance from '../../Axios';

const MyBarChart = () => {
     const [datas,setDatas] = useState('')
    const getCountry = async ()=>{
        try {
           const response = await userInstance.get('/countryData')
           setDatas(response.data)
        } catch (error) {
            
        }
    }

    useEffect(()=>{
     getCountry()
    },[])
 

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={datas}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="country" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MyBarChart;
