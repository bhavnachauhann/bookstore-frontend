import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa'; // Updated import
import { useDispatch, useSelector } from 'react-redux';
import {authActions} from "../../Store/auth";

const Sidebar = ({ avatar, username, email }) => {

  const dispatch =useDispatch();
  const history = useNavigate();
  const role =useSelector((state)=> state.auth.role)
  return (
    <div className='bg-zinc-800 p-4 rounded flex flex-col items-center justify-between h-auto lg:h-[100%]'>
        <div className='flex flex-col items-center justify-center '>
            {" "}
        <img src={avatar} alt="User Avatar" className='h-[12vh]'/>
        <p className='mt-3 text-xl text-zinc-100 font-semibold'>{username}</p>
        <p className='mt-1 text-normal text-zinc-300'>{email}</p>

        <div className='w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block'>
        </div>

       
       {role == "user" && (
         <div className='w-full flex-col items-center justify-center lg:flex'>
         <Link to="/profile" className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all"> Favourites</Link>

         <Link to="/profile/orderHistory" className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all mt-4"> Order History</Link>

         <Link to="/profile/setting" className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all mt-4"> Settings</Link>
     </div>
       )}
       

       {role ==="admin" && (
          <div className='w-full flex-col items-center justify-center lg:flex'>
          <Link to="/profile" className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all"> All Order</Link>
 
          <Link to="/profile/add-book" className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all mt-4"> Add Book</Link>
 
      </div>

       )}


        <button className='bg-zinc-900 w-3/6 lg:w-full mt-4 lg:mt-0 text-white font-semibold flex items-center justify-center' onClick={()=>{
          dispatch(authActions.logout());
          dispatch(authActions.changeRole("user"));
          localStorage.clear("id");
          localStorage.clear("token");
          localStorage.clear("role");
          history("/")
        }}>
            Log Out <FaSignOutAlt className="ml-4"/>
        </button>
        </div>
    </div>
  );
}

export default Sidebar;
