import React, { useEffect } from 'react'


import SideBars from '../SideBar/SideBars'
import Dashboard from '../../Pages/Dashboard'
// import Dashbord from '../Dashboard/Dashbord'

const Home = () => {


  return (
    <div>   
   
    <SideBars />

    <div className="p-4 sm:ml-64">
   <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">

    {/* <Dashbord /> */}
    <Dashboard />

    
</div>
</div>
  
    </div>
  )
}

export default Home
