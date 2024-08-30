import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import MyDatePicker from '../DatePiCker';
import { useSelector } from 'react-redux';



const CustomAreaChart = () => {
 
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [dataShow, setDataShow] = useState([]);
  const Datas = useSelector((state) => state.dataSlice.value);
  const [first, setfirst] = useState(0)
  const [intensityEnabled, setIntensityEnabled] = useState(true);
  const [likelihoodEnabled, setLikelihoodEnabled] = useState(true);
  const [relevanceEnabled, setRelevanceEnabled] = useState(true);
  const [int,setInt]=useState('intensity')
  const [like,setLike]=useState('likelihood')
  const [relevance,setRelevance]=useState('relevance')
  


  useEffect(() => {
    if(start===''&&end===''){
      const s = Datas.filter((item) => new Date(item.added).getMonth() === new Date().getMonth());
      setDataShow(s);
    }else{
      
      const h = Datas.filter((item)=>{
        return new Date(item.added) >= new Date(start) && new Date(item.added) <= new Date(end)
      })
      setDataShow(h)
    }
  }, [end]);

  

    return(
    <div className='p-10 border-2 rounded-md mb-20'>
<div date-rangepicker className="flex items-center">
  <div className="relative">
    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
         <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
        </svg>
    </div>
    <input value={start}   onChange={(e) => setStart(e.target.value,1)}  name="start" type="date" className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date start"/>
  </div>
  <span className="mx-4 text-gray-500">to</span>
  <div className="relative">
    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
         <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
        </svg>
    </div>
   
    <input value={end}  onChange={(e) => setEnd(e.target.value,0)}  name="end" type="date" defaultValue={'select the date'} className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date end"/>
</div>
</div>


<MyDatePicker />

<ResponsiveContainer width="100%" height={400}>
        <AreaChart data={dataShow}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
            <Legend
              onClick={(e) => {
                const { dataKey } = e.payload;
                if (dataKey === 'intensity' && int === 'intensity'){
                  setInt('1')
                  return
                }else if( dataKey === '1' && int === '1'){
                  setInt('intensity')
                  return
                }
                if (dataKey === 'likelihood' && like == 'likelihood'){
                  setLike('2')
                  return
                }else if(dataKey === '2' && like == '2'){
                  setLike('likelihood')
                  return
                }
                if (dataKey === 'relevance' && relevance == 'relevance'){
                  setRelevance('3')
                  return
                }else if(dataKey === '3' && relevance == '3'){
                  setRelevance('relevance')
                  return
                }
              }}
            />


          
          {intensityEnabled && (
            <Area
              type="monotone"
              dataKey={int}
              stroke="#c0beea"
              fill="#c0beea"
              name="Intensity"
              
            />
          )}
          {likelihoodEnabled && (
            <Area
              type="monotone"
              dataKey={like}
              stroke="#504ac6"
              fill="#504ac6"
              name="Likelihood"
            />
          )}
          {relevanceEnabled && (
            <Area
              type="monotone"
              dataKey={relevance}
              stroke="#8884d8"
              fill="#8884d8"
              name="Relevance"
            />
          )}


          

          
        </AreaChart>
      </ResponsiveContainer>

    </div>

);
}

export default CustomAreaChart;
