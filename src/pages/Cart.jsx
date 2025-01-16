import React, { useState, useEffect } from 'react';
import Loader from '../components/Loader/Loader';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AiFillDelete } from 'react-icons/ai';

const Cart = () => {
  const navigate = useNavigate();
  const [Cart, setCart] = useState([]);
  const [Total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false); // Loading state for PlaceOrder

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/v1/get-user-cart", { headers });
        // console.log(res.data.data);
        setCart(res.data.data);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, []);

  const deleteItem = async (bookId) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/v1/remove-from-cart/${bookId}`, {}, { headers });
      // alert(response.data.message);
      console.log(response.data);
      // Refresh cart after deletion
      setCart(Cart.filter(item => item._id !== bookId));
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  // useEffect(() => {
  //   if (Cart.length > 0) {
  //     const total = Cart.reduce((acc, item) => acc + item.price, 0);
  //     setTotal(total);
  //   } else {
  //     setTotal(0); // Set total to 0 if cart is empty
  //   }
  // }, [Cart]);

  useEffect(()=>{
    if(Cart && Cart.length>0){
      let total=0;
      Cart.map((items)=>{
        total+= items.price;
      });
      setTotal(total);
      // total=0;
    }
  },[Cart]);

  // const PlaceOrder = async () => {
  //   try {
  //     console.log("Placing order with data:", Cart);  // Debugging log
  //     const response = await axios.post(
  //       "http://localhost:5000/api/v1/place-order",
  //       { order: Cart },
  //       { headers }
  //     );
  
  //     // Check if the response indicates success
  //     if (response && response.data && response.data.success) {
  //       alert(response.data.message);
  //       navigate("/profile/orderHistory");  // Navigate to the next page
  //     } else {
  //       alert("Failed to place order. Please try again.");
  //     }
  //   } catch (error) {
  //     console.error("Error placing order:", error);
  
  //     // Check specific error types
  //     if (error.response) {
  //       // Server responded with a status other than 200
  //       alert(`Failed to place order: ${error.response.data.message || "Unknown error."}`);
  //     } else if (error.request) {
  //       // No response from server
  //       alert("No response from server. Please ensure the backend is running and try again.");
  //     } else {
  //       // Other errors
  //       alert("An error occurred while placing the order. Please try again.");
  //     }
  //   }
  // };
  

  const PlaceOrder= async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/v1/place-order`,{order:Cart},
        {headers:{
          authorization:`Bearer ${localStorage.getItem("token")}`,
        }}
      );
      console.log(response);
      console.log(response.data.message);
      // alert(response.data.message);
      navigate("/profile/orderHistory");
      
    } catch (error) {
      console.log(error);
      
    }
    
  };
  

  return (
    <div className='bg-zinc-900 px-12 g-screen py-8'>
      {!Cart && (<div className='w-full h-[100%] flex items-center justify-center'> <Loader /></div>)}
      {Cart.length === 0 && (
        <div className='h-screen'>
          <div className='h-[100%] flex items-center justify-center flex-col'>
            <h1 className='text-5xl lg:text-6xl font-semibold text-zinc-400'>
              Empty Cart
            </h1>
            <img src="./empty-cart-yellow.png" alt="empty cart" className='lg:h-[50vh]' />
          </div>
        </div>
      )}
      {Cart.length > 0 && (
        <>
          <h1 className='text-5xl font-semi-bold text-zinc-500 mb-8'>Your Cart</h1>
          {Cart.map((item, i) => (
            <div className='w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center' key={i}>
              <img src={item.url} alt="" className='h-[20] md:h[10vh] object-cover' />
              <div className='w-full md:w-auto'>
                <h1 className='text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0'>
                  {item.title}
                </h1>
                <p className='text-normal text-zinc-300 mt-2 hidden lg:block'>
                  {item.desc.slice(0, 100)}...
                </p>
                <p className='text-normal text-zinc-300 mt-2 hidden md:block lg:hidden'>
                  {item.desc.slice(0, 65)}...
                </p>
                <p className='text-normal text-zinc-300 mt-2 block md:hidden'>
                  {item.desc.slice(0, 100)}...
                </p>
              </div>
              <div className='flex mt-4 w-full md:w-auto items-center justify-between'>
                <h2 className='text-zinc-100 text-3xl font-semibold flex'>
                  ₹{item.price}
                </h2>
                <button className='bg-red text-red-700 border-red-700 rounded p-2 ms-12' onClick={() => deleteItem(item._id)}>
                  <AiFillDelete />
                </button>
              </div>
            </div>
          ))}
        </>
      )}
      {Cart.length > 0 && (
        <div className='mt-4 w-full flex items-center justify-end'>
          <div className='p-4 bg-zinc-800 rounded'>
            <h1 className='text-3xl text-zinc-200 font-semibold'>Total Amount</h1>
            <div className='mt-3 flex items-center justify-between text-xl text-zinc-200'>
              <h2>{Cart.length} books</h2>
              <h2>₹ {Total}</h2>
            </div>
            <div className='w-[100%] mt-3'>
              <button 
                className='bg-zinc-100 rounded px-4 py-2 flex justify-center w-full font-semibold hover:bg-zinc-500' 
                onClick={PlaceOrder} 
                disabled={loading}
              >
                {loading ? "Placing Order..." : "Place Your Order"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
