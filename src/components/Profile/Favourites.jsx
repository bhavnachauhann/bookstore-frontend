import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BookCard from '../BookCard/BookCard';

const Favourites = () => {
  const [FavouritesBooks, setFavouritesBooks] = useState([]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  };

  useEffect(() => {
    const fetchFavourites = async () => {
      const response = await axios.get("https://backend-bookstore-b7ef.onrender.com/api/v1/get-favourite-book", { headers });
      setFavouritesBooks(response.data.data);
    };
    fetchFavourites();
  }, []);

  const removeBookFromFavourites = (bookId) => {
    setFavouritesBooks(FavouritesBooks.filter(book => book._id !== bookId));
  };

  return (

    <>

{FavouritesBooks && FavouritesBooks.length ===0 && (<div className='text-5xl font-semibold text-zinc-500 flex items-center justify-center w-full flex-col'>
      No Favorite Book
      <img src="./star.png.png" alt="star" className='h-[20vh] my-8' />
      </div>)}

    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      

      {FavouritesBooks.map((item) => (
        <div key={item._id}>
          <BookCard
            data={item}
            favourites={true}
            removeBookFromFavourites={removeBookFromFavourites}
          />
        </div>
      ))}
    </div>
    </>

   
  );
};

export default Favourites;
