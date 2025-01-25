import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BookCard = ({ data, favourites, removeBookFromFavourites }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id,
  };

  const handleRemoveBook = async () => {
    try {
      await axios.delete("http://localhost:5000/api/v1/remove-book-from-favourite", { headers });
      removeBookFromFavourites(data._id);  // Update the list after a successful delete request
    } catch (error) {
      console.error("Error removing book:", error);
    }
  };

  // const handleRemoveBook = async () => {
  //   try {
  //     await axios.delete("http://localhost:5000/api/v1/remove-book-from-favourite", { headers:{
  //       authorization:`Bearer ${localStorage.getItem("token")}`,
  //     } });
  //     removeBookFromFavourites(data._id);  // Update the list after a successful delete request
  //   } catch (error) {
  //     console.error("Error removing book:", error);
  //   }
  // };

  return (
    <div className='bg-zinc-800 rounded p-4 flex flex-col'>
      <Link to={`/view-book-details/${data._id}`}>
        <div className='bg-zinc-800 rounded p-4 flex flex-col'>
          <div className='bg-zinc-900 rounded flex items-center justify-center'>
            <img src={data.url} alt="/" className='h-[25vh]' />
          </div>
          <h2 className='mt-4 text-xl font-semibold  text-white'>{data.title}</h2>
          <p className='mt-2 text-zinc-400 font-semibold'>by {data.author}</p>
          <p className='mt-2 text-zinc-200 font-semibold text-xl'>₹ {data.price}</p>
        </div>
      </Link>
      {favourites && (
        <button
          className='bg-yellow-50 px-4 py-2 rounded border border-yellow-500 text-yellow-500 mt-4'
          onClick={handleRemoveBook}
        >
          Remove from favourites
        </button>
      )}
    </div>
  );
};

export default BookCard;
