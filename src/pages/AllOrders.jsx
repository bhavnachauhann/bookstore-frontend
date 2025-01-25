import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader/Loader';
import { FaCheck, FaUser } from "react-icons/fa";
import { IoOpenOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import SeeUserData from './SeeUserData';

const AllOrders = () => {
  const [AllOrders, setAllOrders] = useState(); // Stores all orders
  const [options, setOptions] = useState(-1); // Tracks which dropdown is open
  const [Values, setValues] = useState({ status: "" }); // Stores the status to update
  const [userDiv, setuserDiv] = useState("hidden"); // Handles user details modal visibility
  const [userDivData, setuserDivData] = useState(); // Stores user details for the modal

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // Fetch all orders when the component mounts
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("https://backend-bookstore-b7ef.onrender.com/api/v1/get-all-orders", { headers });
        setAllOrders(response.data.data); // Set orders in state
        console.log("Fetched orders:", response.data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetch();
  }, []);

  // Handle status dropdown changes
  const change = (e) => {
    const { value } = e.target;
    setValues({ status: value }); // Update the status value
  };

  // Submit the status change to the server
  const submitChanges = async (orderId) => {
    try {
        const response = await axios.put(
            `http://localhost:5000/api/v1/update-status/${orderId}`,
            Values,
            { headers }
        );

        // Update the state locally after a successful update
        const updatedOrders = AllOrders.map((order) =>
            order._id === orderId ? { ...order, status: Values.status } : order
        );
        setAllOrders(updatedOrders);

        // Close the dropdown
        setOptions(-1);
        alert(response.data.message);
    } catch (error) {
        console.error("Error updating status:", error);
        alert("Failed to update status. Please try again.");
    }
};

const changess = (e) => {
    setValues({ ...Values, status: e.target.value });
};


return (
  <>
      {/* Show loader if orders are not loaded */}
      {!AllOrders && (
          <div className='h-[100%] flex items-center justify-center '>
              <Loader />
          </div>
      )}

      {/* Display orders if they exist */}
      {AllOrders && AllOrders.length > 0 && (
          <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
              <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>All Orders</h1>

              {/* Table Headers */}
              <div className='mt-4 bg-zinc w-full rounded py-2 px-2 px-4 flex gap-2'>
                  <div className='w-[3%]'>
                      <h1 className='text-center'>Sr.</h1>
                  </div>
                  <div className='w-[40%] md:w-[22%]'>
                      <h1>Books</h1>
                  </div>
                  <div className='w-0 md:w-[45%] hidden md:block'>
                      <h1>Description</h1>
                  </div>
                  <div className='w-[17%] md:w-[9%]'>
                      <h1>Price</h1>
                  </div>
                  <div className='w-[30%] md:w-[16%]'>
                      <h1>Status</h1>
                  </div>
                  <div className='w-[10%] md:w-[5%]'>
                      <h1><FaUser /></h1>
                  </div>
              </div>

              {/* Table Rows */}
              {AllOrders.map((items, i) => (
                  <div
                      key={items._id}
                      className='bg-zinc-800 w-full rounded py-2 px-4 flex gap-2 hover:bg-zinc-900 hover:cursor-pointer transition-all duration-1s'
                  >
                      <div className='w-[3%]'>
                          <h1 className='text-center'>{i + 1}</h1>
                      </div>
                      <div className='w-[40%] md:w-[22%]'>
                          <Link to={`/view-book-details/${items.book._id}`} className='hover:text-blue-300'>
                              {items.book.title}
                          </Link>
                      </div>
                      <div className='w-0 md:w-[45%] hidden md:block'>
                          <h1>{items.book.desc.slice(0, 50)}...</h1>
                      </div>
                      <div className='w-[17%] md:w-[9%]'>
                          <h1>₹ {items.book.price}</h1>
                      </div>
                      <div className='w-[30%] md:w-[16%]'>
                          <h1 className='font-semibold'>
                              {/* Status Button */}
                              <button
                                  className='hover:scale-105 transition-all duration-300'
                                  onClick={() => {
                                      setOptions(options === i ? -1 : i);
                                      setValues({ ...Values, status: items.status });
                                  }}
                              >
                                  {items.status === "Order placed" ? (
                                      <div className='text-yellow-500'>{items.status}</div>
                                  ) : items.status === "Canceled" ? (
                                      <div className='text-red-500'>{items.status}</div>
                                  ) : (
                                      <div className='text-green-500'>{items.status}</div>
                                  )}
                              </button>

                              {/* Status Dropdown */}
                              <div className={`${options === i ? "flex" : "hidden"}`}>
                                  <select
                                      name='status'
                                      className='bg-gray-800'
                                      onChange={changess}
                                      value={Values.status || items.status}
                                  >
                                      {[
                                          "Order placed", 
                                          "Out For Delivery", 
                                          "Delivered", 
                                          "Canceled"
                                      ].map((statusOption, idx) => (
                                          <option value={statusOption} key={idx}>
                                              {statusOption}
                                          </option>
                                      ))}
                                  </select>
                                  <button
                                      className='text-green-500 hover:text-pink-600 mx-2 p-6 bg-yellow z-index:10'
                                      style={{ zIndex: 10 }} onClick={() => submitChanges(items._id)}
                                  > 
                                      <FaCheck />
                                  </button>
                              </div>
                          </h1>
                      </div>
                      <div className='w-[10%] md:w-[5%]'>
                          {/* Open User Details */}
                          <button
                              className='text-xl hover:text-orange-500'
                              onClick={() => {
                                  setuserDiv("fixed");
                                  setuserDivData(items.user);
                              }}
                          >
                              <IoOpenOutline />
                          </button>
                      </div>
                  </div>
              ))}
          </div>
      )}

      {/* User Details Modal */}
      {userDivData && (
          <SeeUserData userDivData={userDivData} userDiv={userDiv} setuserDiv={setuserDiv} />
      )}
  </>
);

};

export default AllOrders;
