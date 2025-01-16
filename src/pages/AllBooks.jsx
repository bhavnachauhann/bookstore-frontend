import React from 'react'
import  { useEffect, useState } from 'react';
import Loader from '../components/Loader/Loader';
import BookCard from '../components/BookCard/BookCard';
import axios from 'axios';

const AllBooks = () => {

  const [data, setData] = useState([]); // Initialize state with an empty array

  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await axios.get("http://localhost:5000/api/v1/get-all-book");
            //   console.log(response.data.data);
              setData(response.data.data); // Ensure you're setting the correct data path
          } catch (error) {
              console.error("Error fetching data: ", error);
          }
      };

      fetchData();
  }, []);
  return (

    <div className='bg-zinc-900 h-auto px-12 py-8'>
    <div className='mt-8 px-4'>
    <h4 className='text-3xl text-yellow-100'>All Books</h4>
    {!data && (
        <div className='w-full h-[100%] flex items-center justify-center'> <Loader/></div>

    )}
    <div className='my-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
        {data && data.map((item, i) => (
            <div key={i}>
                <BookCard data={item} />
            </div>
        ))}
    </div>
</div>
</div>
  )
}

export default AllBooks