import React, { useState } from 'react';
import axios from 'axios';
import { FaLanguage } from 'react-icons/fa';

const AddBooks = () => {
    // const { role } = req.user; // Decoded from the JWT token

    // if (role !== "admin") {
    //     return res.status(403).json({ message: "You don't have access to perform admin work" });
    // }
    const [Data, setData] = useState({
        url: "",
        title: "",
        author: "",
        price: "",
        desc: "",
        language: "",
    });

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
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
                // POST request to add the book
                const response = await axios.post(
                    "http://localhost:5000/api/v1/add-book",
                    Data, // Book data from the state
                    { headers } // Authorization headers
                );
                alert(response.data.message);
            }
        } catch (error) {
            // console.error("Error adding book:", error);
            alert("An error occurred while adding the book.");
        }
    };
    
    


    

    return (
        <div className='h-[100%] p-0 md:p-4'>
            <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'> Add Book</h1>
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

                <button className='p-2 mt-4 bg-blue-500 text-white rounded' onClick={submit}>ADD</button>
            </div>
        </div>
    )
}

export default AddBooks;
