import React from 'react'
import axios from 'axios';
import { useState, useEffect} from 'react';
import {  useParams, useNavigate} from 'react-router-dom';


const UpdateBook = () => {
    const [Data, setData] = useState({
        url: "",
        title: "",
        author: "",
        price: "",
        desc: "",
        language: "",
    });


    const {id} =useParams();
    const navigate = useNavigate();
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: id,
    };

    const change = (e) => {
        const { name, value } = e.target;
        setData({ ...Data, [name]: value });
    };

    const submit = async () => {
        try {
            if (
                Data.url === "" ||
                Data.title === "" ||
                Data.author === "" ||
                Data.price === "" ||
                Data.desc === "" ||
                Data.language === ""
            ) {
                alert("All Fields are required");
            } else {
                const response = await axios.put("https://backend-bookstore-b7ef.onrender.com/api/v1/update-book", Data, { headers });
              
                setData({
                    url: "",
                    title: "",
                    author: "",
                    price: "",
                    desc: "",
                    language: "",

                });
                // console.log(response);
                  alert(response.data.message);
                  navigate(`/view-book-details/${id}`)
            }
        } catch (error) {
            console.error("Error adding book:", error);
            alert("An error occurred while adding the book.");
           
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://backend-bookstore-b7ef.onrender.com/api/v1/get-book-by-id/${id}`);
               
                setData(response.data.data); // Ensure you're setting the correct data path
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };
  
        fetchData();
    }, []);

  return (
      <div className='bg-zinc-900 h-[100%] p-0 md:p-4'>
    <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'> Update Book</h1>
    <div className='p-4 bg-zinc-800 rounded'>
        <div>
            <label htmlFor="" className='text-zinc-400'>Image</label>
            <input type="text" className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' placeholder='url of image' name='url' required
                value={Data.url} onChange={change} />
        </div>
        <div className='mt-4'>
            <label htmlFor="" className='text-zinc-400'>Title of Book</label>
            <input type="text" className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' placeholder='title of book' name='title' required
                value={Data.title} onChange={change} />
        </div>

        <div className='mt-4'>
            <label htmlFor="" className='text-zinc-400'>Author of Book</label>
            <input type="text" className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' placeholder='author of book' name='author' required
                value={Data.author} onChange={change} />
        </div>
        <div className='mt-4'>
            <label htmlFor="" className='text-zinc-400'>Description</label>
            <textarea type="text" className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' placeholder='description of book' name='desc' required
                value={Data.desc} onChange={change} />
        </div>
        <div className='mt-4 flex gap-4'>
            <div className='w-3/6'>
                <label htmlFor="" className='text-zinc-400'>Language</label>
                <input type="text" className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' placeholder='language of book' name='language' required
                    value={Data.language} onChange={change} />
            </div>
            <div className='w-3/6'>
                <label htmlFor="" className='text-zinc-400'>Price</label>
                <input type="number" className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' placeholder='price of book' name='price' required
                    value={Data.price} onChange={change} />
            </div>
        </div>

        <button className='p-2 mt-4 bg-blue-500 text-white rounded' onClick={submit}>Update Book</button>
    </div>
</div>
  )
}

export default UpdateBook