// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { FaGripLines } from "react-icons/fa";
// import { useSelector } from 'react-redux';

// const Navbar = () => {
   
//     const role = useSelector((state) => state.auth.role);

  

//     const links = [
//         {
//             title: "Home",
//             link: "/",
//         },
      

//         {
//             title: "All Books",
//             link: "/all-books",
//         },
//         {
//             title: "Cart",
//             link: "/cart",
//         },
//         {
//             title: "profile",
//             link: "/profile",
//         },
//         {
//             title: "Admin profile",
//             link: "/profile",
//         }


//         // ...(isLoggedIn ? [{ title: "All Books", link: "/all-books" }] : []),
//         // ...(isLoggedIn ? [{ title: "Cart", link: "/cart" }] : []),
//         // ...(isLoggedIn ? [{ title: "Profile", link: "/profile" }] : []),
//         // ...(isLoggedIn ? [{ title: "Admin-Profile", link: "/profile" }] : []),
//     ];
//     const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

//     if (isLoggedIn===false) {
//         links.splice(2,2);
        
//     }

//     if (isLoggedIn==true && role ==="user") {
//         links.splice(4,1);
        
//     }

//     if (isLoggedIn==true && role ==="admin") {
//         links.splice(3,1);
        
//     }

//     const [mobileNav, setMobileNav] = useState("hidden");

//     return (
//         <>
//          <nav className="relative flex bg-zinc-800 text-white px-8 py-4 items-center justify-between">
//     <Link to="/" className="flex items-center">
//         <img className="h-10 me-4" src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png" alt="logo" />
//         <h1 className="text-2xl font-semibold">BookHeaven</h1>
//     </Link>
//     <div className="nav-links-bookheaven block lg:flex items-center gap-4">
//         <div className="hidden lg:flex gap-4">
//             {links.map((items, i) => (
//                 <div className='flex items-center' key={i}>
//                     {items.title === "Profile" || items.title === "Admin Profile" ? (
//                         <Link
//                             to={items.link}
//                             className={`hover:text-blue-500 transition-all duration-300 text-white text-lg font-semibold ${items.title === "Profile" ? "border border-blue-500" : ""}`}
//                         >
//                             {items.title}
//                         </Link>
//                     ) : null}
//                 </div>
//             ))}
//         </div>
//         {!isLoggedIn && (
//         // {isLoggedIn=== false && (
//             <div className="hidden lg:flex gap-4">
//                 <Link to="/LogIn" className="px-2 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-100">Log In</Link>
//                 <Link to="/SignUp" className="px-4 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-100">Sign Up</Link>
//             </div>
//         )}
//         <button className="block lg:hidden text-white text-2xl hover:text-zinc-400" onClick={() => setMobileNav(mobileNav === "hidden" ? "block" : "hidden")}><FaGripLines /></button>
//     </div>
// </nav>


//             <div className={`${mobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}>
//                 {links.map((item, i) => (
//                     <Link
//                         to={item.link}
//                         key={i}
//                         className="hover:text-blue-500 transition-all duration-300 text-white text-2xl font-semibold mb-8"
//                         onClick={() => setMobileNav("hidden")}
//                     >
//                         {item.title}
//                     </Link>
//                 ))}
               
//                       {/* {isLoggedIn ===false && ( */}
//                       {!isLoggedIn && (
//                     <>
//                         <Link to="/LogIn" className="text-white text-2xl font-semibold mb-8 px-8 py-2 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-100" onClick={() => setMobileNav("hidden")}>Log In</Link>
//                         <Link to="/SignUp" className="text-white mb-8 px-8 py-2 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-100 text-2xl font-semibold" onClick={() => setMobileNav("hidden")}>Sign Up</Link>
//                     </>
//                 )}
//             </div>
//         </>
//     );
// };

// export default Navbar;


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGripLines } from "react-icons/fa";
import { useSelector } from 'react-redux';

const Navbar = () => {
    const role = useSelector((state) => state.auth.role);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    const baseLinks = [
        { title: "Home", link: "/" },
        { title: "All Books", link: "/all-books" },
        { title: "Cart", link: "/cart" },
        { title: "Profile", link: "/profile" },
        { title: "Admin Profile", link: "/profile" },
    ];

    // Dynamically adjust links based on `isLoggedIn` and `role`
    const links = baseLinks.filter((item) => {
        if (!isLoggedIn && (item.title === "Cart" || item.title === "Profile" || item.title === "Admin Profile")) {
            return false;
        }
        if (isLoggedIn && role === "user" && item.title === "Admin Profile") {
            return false;
        }
        if (isLoggedIn && role === "admin" && item.title === "Profile") {
            return false;
        }
        return true;
    });

    const [mobileNav, setMobileNav] = useState(false);

    return (
        <>
            <nav className="relative flex bg-zinc-800 text-white px-8 py-4 items-center justify-between">
                <Link to="/" className="flex items-center">
                    <img
                        className="h-10 me-4"
                        src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"
                        alt="logo"
                    />
                    <h1 className="text-2xl font-semibold">BookHeaven</h1>
                </Link>
                <div className="nav-links-bookheaven flex items-center gap-4">
                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex gap-4">
                        {links.map((item, i) => (
                            <Link
                                key={i}
                                to={item.link}
                                className={`hover:text-blue-500 transition-all duration-300 text-white text-lg font-semibold`}
                            >
                                {item.title}
                            </Link>
                        ))}
                    </div>
                    {/* Log In / Sign Up for Desktop */}
                    {!isLoggedIn && (
                        <div className="hidden lg:flex gap-4">
                            <Link
                                to="/LogIn"
                                className="px-2 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-100"
                            >
                                Log In
                            </Link>
                            <Link
                                to="/SignUp"
                                className="px-4 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-100"
                            >
                                Sign Up
                            </Link>
                        </div>
                    )}
                    {/* Mobile Menu Toggle */}
                    <button
                        className="block lg:hidden text-white text-2xl hover:text-zinc-400"
                        onClick={() => setMobileNav(!mobileNav)}
                    >
                        <FaGripLines />
                    </button>
                </div>
            </nav>

            {/* Mobile Navigation */}
            <div
                className={`${
                    mobileNav ? "block" : "hidden"
                } bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}
            >
                {links.map((item, i) => (
                    <Link
                        key={i}
                        to={item.link}
                        className="hover:text-blue-500 transition-all duration-300 text-white text-2xl font-semibold mb-8"
                        onClick={() => setMobileNav(false)}
                    >
                        {item.title}
                    </Link>
                ))}
                {/* Log In / Sign Up for Mobile */}
                {!isLoggedIn && (
                    <>
                        <Link
                            to="/LogIn"
                            className="text-white text-2xl font-semibold mb-8 px-8 py-2 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-100"
                            onClick={() => setMobileNav(false)}
                        >
                            Log In
                        </Link>
                        <Link
                            to="/SignUp"
                            className="text-white mb-8 px-8 py-2 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-100 text-2xl font-semibold"
                            onClick={() => setMobileNav(false)}
                        >
                            Sign Up
                        </Link>
                    </>
                )}
            </div>
        </>
    );
};

export default Navbar;
