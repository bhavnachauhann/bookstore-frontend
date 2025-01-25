import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from "../../Store/auth";

const Sidebar = ({ avatar, username, email }) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const role = useSelector((state) => state.auth.role);

  return (
    <div className="bg-zinc-800 p-4 rounded flex flex-col items-center lg:justify-between h-auto lg:h-full w-full lg:w-60">
      {/* User Avatar and Details */}
      <div className="flex flex-col items-center justify-center">
        <img
          // src={avatar}
          src='https://cdn-icons-png.flaticon.com/512/9187/9187604.png'
          alt="User Avatar"
          className="h-24 w-24 rounded-full object-cover lg:h-[12vh] lg:w-[12vh]"
        />
        <p className="mt-3 text-lg lg:text-xl text-zinc-100 font-semibold text-center">
          {username}
        </p>
        <p className="mt-1 text-sm lg:text-base text-zinc-300 text-center">
          {email}
        </p>

        {/* Divider */}
        <div className="w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block"></div>

        {/* Links for Users */}
        {role === "user" && (
          <div className="w-full flex flex-col items-center justify-center lg:flex">
            <Link
              to="/profile"
              className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all"
            >
              Favourites
            </Link>

            <Link
              to="/profile/orderHistory"
              className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all mt-4"
            >
              Order History
            </Link>

            <Link
              to="/profile/setting"
              className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all mt-4"
            >
              Settings
            </Link>
          </div>
        )}

        {/* Links for Admin */}
        {role === "admin" && (
          <div className="w-full flex flex-col items-center justify-center lg:flex">
            <Link
              to="/profile"
              className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all"
            >
              All Orders
            </Link>

            <Link
              to="/profile/add-book"
              className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all mt-4"
            >
              Add Book
            </Link>
          </div>
        )}

        {/* Logout Button */}
        <button
          className="bg-zinc-900 w-4/5 lg:w-full mt-6 lg:mt-4 text-white font-semibold flex items-center justify-center py-2 rounded hover:bg-zinc-700 transition-all"
          onClick={() => {
            dispatch(authActions.logout());
            dispatch(authActions.changeRole("user"));
            localStorage.clear("id");
            localStorage.clear("token");
            localStorage.clear("role");
            history("/");
          }}
        >
          Log Out <FaSignOutAlt className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
