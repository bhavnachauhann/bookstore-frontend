import React from 'react'
import  { useEffect, useState } from 'react';
import Loader from '../components/Loader/Loader';
import BookCard from '../components/BookCard/BookCard';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css'; 

const AllBooks = () => {

  const [data, setData] = useState([]); // Initialize state with an empty array
  
  useEffect(() => {

    AOS.init({
        duration: 800, // Animation duration in ms
        easing: 'ease-in-out', // Animation easing
        once: true, // Trigger animation only once
    });

      const fetchData = async () => {
          try {
              const response = await axios.get("https://backend-bookstore-b7ef.onrender.com/api/v1/get-all-book");
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
            <div key={i}  data-aos="fade-up">
                <BookCard data={item} />
            </div>
        ))}
    </div>
</div>
</div>
  )
}

export default AllBooks;