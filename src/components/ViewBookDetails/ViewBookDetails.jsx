import React from 'react'
import  { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { GrLanguage } from 'react-icons/gr';
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { authActions } from '../../Store/auth';





const ViewBookDetails = () => {
    const {id} =useParams();
    // console.log(id);
    const navigate = useNavigate();
    const [data, setData] = useState([]); 
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    const role = useSelector((state)=>
        state.auth.role);

    console.log(role);
    console.log(isLoggedIn);
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/v1/get-book-by-id/${id}`);
               
                setData(response.data.data); // Ensure you're setting the correct data path
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };
  
        fetchData();
    }, []);
    const headers= {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: id,
      
       };

    const handlefav = async () => {
        const response= await axios.put("http://localhost:5000/api/v1/add-book-to-favourite",{},{headers});
        alert(response.data.message);
        
        
    };
    // const handleUdpdt=()=>{
    //     navigate("")
    // }
 const handleCart= async () => {
    const response= await axios.put("http://localhost:5000/api/v1/add-to-cart",{},{headers});
    alert(response.data.message);
    navigate("/cart");
    
 };

 const deleteBook = async () => {
    const response = await axios.delete("http://localhost:5000/api/v1/delete-book", {headers});

  alert(response.data.message);
  navigate("/all-books")
    
 }

  return (
   <>
    {data && (
        <div className='px-4 lg:px-12 py-8 bg-zinc-900 flex flex-col lg:flex-row gap-8'>
        <div className='w-full lg:w-3/6  '>
        {" "}
        <div className='flex flex-col lg:flex-row  justify-around bg-zinc-800 p-12 rounded'>
        <img src={data.url} alt="/"  className='h-[50vh] md:h-[30vh] lg:h-[70vh] rounded'/>

        {isLoggedIn===true && role==="user" &&(
        <div className='flex flex-col md:flex-row lg:flex-col mt-4 lg:mt-0 items-center justify-between lg:justify-start'>
    <button
        className='bg-white rounded lg:rounded-full text-3xl p-3 text-red-500 flex items-center justify-center m-4'
        onClick={handlefav}  // Attach the onClick handler here
    >
        <FaHeart /> <span className='ms-4 block lg:hidden '>Favorites</span>
    </button>
    <button
        className='text-white rounded md:mt-0 lg:rounded-full text-3xl p-3 mt-8 bg-blue-500 flex items-center justify-center '
        onClick={handleCart}  // Already attached here
    >
        <FaShoppingCart />
        <span className='ms-4 block lg:hidden '>Add to cart</span>
    </button>
</div>

        )} 


{isLoggedIn===true && role==="admin" &&(
            <div className='flex flex-col md:flex-row lg:flex-col mt-4 lg:mt-0 items-center justify-between lg:justify-start'>
            <Link to={`/updateBook/${id}`} className='bg-white  rounded lg:rounded-full text-3xl p-3 text-red-500 flex items-center justify-center m-2' ><FaEdit /> {" "}
            <span className='ms-4 block lg:hidden '>Edit</span>
            </Link>
            <button className='text-white  rounded md:mt-0 lg:rounded-full text-3xl p-3  mt-8 bg-blue-500 flex items-center justify-center' onClick={deleteBook}><MdDeleteOutline />
            <span className='ms-4 block lg:hidden '>Delete Book</span></button>
        </div>
        )}
        </div>


        </div>

        <div className='p-4 w-full lg:w-3/6' >
        <h1 className='text-4xl text-zinc-300 font-semibold'>{data.title}</h1>
        <p className='text-zinc-400 mt-1'>by {data.author}</p>
        <p className='text-zinc-500 mt-4 text-xl '> {data.desc}</p>
        <p className='flex mt-4 items-center justify-start text-zinc-400'>
            <GrLanguage className='me-3'/>{data.language}
        </p>

        <p className='mt-4 text-zinc-100  text-3xl font-semibold '>price: ₹ {data.price} {" "}</p>
        <a href="/cart">

        <button className='bg-yellow-300 text-white  rounded-lg p-2 mt-4 text-2xl hover:bg-yellow-500 hover:text-black' onClick={handleCart}> Buy now</button>
        </a>
        </div>


    </div>

    )}
    {!data && <div className='h-screen bg-zinc-900 flex items-center justify-center'> <Loader/></div>}
   </>
  )
}

export default ViewBookDetails