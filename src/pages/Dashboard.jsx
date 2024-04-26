import React, { useEffect, useState } from 'react';
import LandCard from '../components/LandCard';

import { ClipLoader } from 'react-spinners';

const Dashboard = () => {
  const [landData, setLandData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://prod-be.1acre.in/lands/?ordering=-updated_at&page=${page}&page_size=10`
      );
      const data = await response.json();

      setLandData((prevData) => [...prevData, ...data.results]);
      setPage(page + 1);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
    console.log('page fetching is: ', page);
  }, []);
  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
        document.documentElement.offsetHeight ||
      isLoading
    ) {
      fetchData();
      console.log('loading is : ', isLoading);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [page]);
  // console.log('1st result is: ', landData[1]);

  return (
    <>
      <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 py-2 m-2 px-6'>
        {landData.map((land) => (
          <div className='w-full h-96'>
            <LandCard data={land} />
          </div>
        ))}
      </div>
      {isLoading && (
        <>
          <div className='flex justify-center align-middle p-2'>
            <ClipLoader size={55} color='orange' />
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
