import React, { useEffect, useState } from 'react';
import userInstance from '../Axios';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Table = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userInstance.get(`/table?page=${currentPage}`);
        setData(response.data.data);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredData = data.filter((item) => {
    const locationMatch = item.country.toLowerCase().includes(searchInput.toLowerCase());
    const topic = item.topic.toLowerCase().includes(searchInput.toLowerCase());
    const sector = item.sector.toLowerCase().includes(searchInput.toLowerCase());
    return locationMatch || topic || sector;
  });

  return (
    <>
    <div className='min-h-screen'>

   
      <div className="flex justify-end">
        <div className="w-1/4 bg-white">
          <form>
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  ></path>
                </svg>
              </div>
              <input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-200 mb-6 dark:border-gray-600 dark:placeholder-black dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search - country, sector, topic"
              />
            </div>
          </form>
        </div>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-700 dark:text-gray-700">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-white dark:text-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 border dark:border-gray-700">
                Country
              </th>
              <th scope="col" className="px-6 py-3 border dark:border-gray-700">
                Published
              </th>
              <th scope="col" className="px-6 py-3 border dark:border-gray-700">
                Topic
              </th>
              <th scope="col" className="px-6 py-3 border dark:border-gray-700">
                Sector
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? 'bg-white dark:bg-gray-white' : 'bg-white dark:bg-gray-100 dark:border-gray-700'}
              >
                <td className="px-6 py-4 border dark:border-gray-700">{item.country}</td>
                <td className="px-6 py-4 border dark:border-gray-700">{item.published}</td>
                <td className="px-6 py-4 border dark:border-gray-700">{item.topic}</td>
                <td className="px-6 py-4 border dark:border-gray-700">{item.sector}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination-container flex justify-center mt-5">
        <div className='h-8 w-36  flex justify-evenly'>
  <button
    disabled={currentPage === 1}
    onClick={() => handlePageChange(currentPage - 1)}
    className={`pagination-button ${currentPage === 1 ? 'disabled' : ''}`}
  >
    <FaChevronLeft className="pagination-icon" />
  </button>
  <span className="pagination-number">Page {currentPage}</span>
  <button
    disabled={currentPage === totalPages}
    onClick={() => handlePageChange(currentPage + 1)}
    className={`pagination-button ${currentPage === totalPages ? 'disabled' : ''}`}
  >
    <FaChevronRight className="pagination-icon" />
  </button>
  </div>
</div>
</div>

    </>
  );
};

export default Table;
