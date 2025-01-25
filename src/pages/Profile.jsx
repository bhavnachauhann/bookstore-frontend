import React, { useEffect, useState } from "react";
import Sidebar from "../components/Profile/Sidebar";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader/Loader";

const Profile = () => {
  const [profile, setProfile] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/get-user-information",
          { headers }
        );
        setProfile(response.data);
      } catch (error) {
        console.error("Failed to fetch profile data", error);
      }
    };

    fetch();
  }, []);

  return (
    <div className="bg-zinc-900 px-4 md:px-12 flex flex-col md:flex-row py-8 gap-6 text-white">
      {/* Loader for loading state */}
      {!profile && (
        <div className="w-full h-screen flex items-center justify-center">
          <Loader />
        </div>
      )}

      {/* Profile Content */}
      {profile && (
        <>
          {/* Sidebar */}
          <div className="w-full md:w-1/4 lg:w-1/6 h-auto md:h-screen">
            <Sidebar
              avatar={profile.avatar}
              username={profile.username}
              email={profile.email}
            />
          </div>

          {/* Main Content */}
          <div className="w-full md:w-3/4 lg:w-5/6">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
