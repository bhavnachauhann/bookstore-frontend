import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className='min-h-screen flex flex-col md:flex-row items-center justify-center p-4 md:p-8'>
        <div className='w-full mb-12 lg:w-3/6 flex flex-col items-center lg:items-start justify-center'>
            <h1 className='text-4xl lg:text-6xl font-semibold text-yellow-100 text-center lg:text-left'>
                Discover Your Next Great Read
            </h1>
            <p className='mt-4 text-xl text-zinc-300 text-center lg:text-left'>
                Uncover captivating stories, enriching knowledge, and endless inspiration in our curated collection of books.
            </p>
            <div className='mt-8'>
                <Link to="/all-books" className='text-yellow-100 text-xl font-semibold border border-yellow-100 p-2 rounded'>
                    Discover Books
                </Link>
            </div>
        </div>
        <div className='w-full lg:w-3/6 h-auto flex items-center justify-center'>
            <img src="./hero.jpg" alt="hero" className='w-full h-auto max-h-[75vh] object-cover' />
        </div>
    </div>
  );
}

export default Hero;
