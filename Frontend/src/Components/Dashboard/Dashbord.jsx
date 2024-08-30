import React, { useEffect, useState } from 'react'
import CustomAreaChart from '../Charts/AreaChart'
import StackedBarChart from '../Charts/StackedBarChart'
import DoughnutChart from '../Charts/DuaghnutChart'
import MyPieChart from '../Charts/MyPieChart'
import MyBarChart from '../Charts/MyBarChart'
import CustomScatterPlot from '../Charts/ScatterChart'
import BoxPlotChart from '../Charts/BoxPloat'
import CyclicChart from '../Charts/CyclicChart'
import Table from '../Table'
import userInstance from '../../Axios'

import {  useDispatch, useSelector } from 'react-redux'
import { datas } from '../../Redux/Reducer'
import Count from '../Count/Count'

const Dashbord = () => {
  const [data,setData]=useState()
  const dispatch = useDispatch()

  const Data = useSelector(store => store.dataSlice.value)
  console.log(Data,'kkkkkkkkkkkkkkkkk');
  const getData = async()=>{
    try {
        const response =await userInstance.get('/getData')
        dispatch(datas({data:response.data}))
    } catch (error) {
        
    }
}

useEffect(()=>{
    getData()
},[])

  return (
    <div>

<Count />


<CustomAreaChart />

<div data-aos="fade-right">
<CyclicChart />

</div>

     

      <CustomScatterPlot />
      
      <MyBarChart />


      <div class="grid sm:grid-col-1 md:grid-cols-2 gap-4 mb-4">
      <StackedBarChart />
      <DoughnutChart />
      </div>

     


     



       <div class="grid sm:grid-col-1 md:grid-cols-2 gap-4 mb-4">
      </div>
     
        <Table />
    
     
      <div>

      </div>
    </div>
  )
}

export default Dashbord
