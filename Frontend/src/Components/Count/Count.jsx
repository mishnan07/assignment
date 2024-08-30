import React, { useEffect, useState } from 'react';
import { FaGlobe, FaChartBar, FaLaptop, FaUser } from 'react-icons/fa'; // Import icons
import userInstance from '../../Axios';

const Count = () => {
  const [datas, setDatas] = useState({ countryCount: 0, regionCount: 0, topicCount: 0, sectorCount: 0 });

  const getRegion = async () => {
    try {
      const response = await userInstance.get('/count');
      setDatas(response.data);
    } catch (error) {
      // Handle error
    }
  };

  useEffect(() => {
    getRegion();
  }, []);

  return (
    <div>
      <div className="flex items-center bg-gray-200 text-gray-800 mb-20">
        <div className="p-4 w-full">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 sm:col-span-6 md:col-span-3">
              <div className="flex flex-row bg-white shadow-sm rounded p-4">
                <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-blue-100 text-blue-500">
                  <FaGlobe size={24}  className='globe' /> {/* Country icon */}
                </div>
                <div className="flex flex-col flex-grow ml-4">
                  <div className="text-sm text-gray-500">Total Country</div>
                  <div className="font-bold text-lg">{datas.countryCount}</div>
                </div>
              </div>
            </div>
            <div className="col-span-12 sm:col-span-6 md:col-span-3">
              <div className="flex flex-row bg-white shadow-sm rounded p-4">
                <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-green-100 text-green-500">
                  <FaGlobe size={24} className='globe'/> {/* Region icon */}
                </div>
                <div className="flex flex-col flex-grow ml-4">
                  <div className="text-sm text-gray-500">Total Region</div>
                  <div className="font-bold text-lg">{datas.regionCount}</div>
                </div>
              </div>
            </div>
            <div className="col-span-12 sm:col-span-6 md:col-span-3">
              <div className="flex flex-row bg-white shadow-sm rounded p-4">
                <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-orange-100 text-orange-500">
                  <FaChartBar size={24} className='globe'/> {/* Topic icon */}
                </div>
                <div className="flex flex-col flex-grow ml-4">
                  <div className="text-sm text-gray-500">Total Topic</div>
                  <div className="font-bold text-lg">{datas.topicCount}</div>
                </div>
              </div>
            </div>
            <div className="col-span-12 sm:col-span-6 md:col-span-3">
              <div className="flex flex-row bg-white shadow-sm rounded p-4">
                <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-red-100 text-red-500">
                  <FaLaptop size={24} className='globe'/> {/* Sector icon */}
                </div>
                <div className="flex flex-col flex-grow ml-4">
                  <div className="text-sm text-gray-500">Total Sector</div>
                  <div className="font-bold text-lg">{datas.sectorCount}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Count;
