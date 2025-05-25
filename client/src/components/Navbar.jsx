import React, { useState, useEffect } from "react";
import { images } from "../assets/assets.js";
import { CircleUserRound, ShoppingCart, ClipboardList } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext.jsx";

const Navbar = () => {
  //   const [ipAddress, setIpAddress] = useState("");
  //   const [geoInfo, setGeoInfo] = useState({});

  //   useEffect(() => {
  //     getVisitorIP();
  //   }, []);

  //   const getVisitorIP = async () => {
  //     try {
  //       const response = await fetch("https://api.ipify.org");
  //       const data = await response.text();

  //       setIpAddress(data);
  //     } catch (error) {
  //       console.log("Failed To Fetch IP");
  //     }
  //   };

  //   const fetchIPInfo = async ()=>{
  //     try {
  //         const response  =await fetch(`http://ip-api.com/json/${ipAddress}`);
  //         const data  = await response.json();
  //         setGeoInfo(data);
  //         console.log(geoInfo);
  //     } catch (error) {
  //         console.log("Failed To Fetch Location");
  //     }
  //   }

  const { user,setUser, navigate, setShowUserLogin ,axios,toast} = useAppContext();
  const navLinks = [
    { name: "Order", icon: <ClipboardList />, path: "/order" },
    { name: "Cart", icon: <ShoppingCart />, path: "/cart" },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logout = async () => {
    try {
      const {data} = await axios.post('http://localhost:4000/api/user/logout');

      if(data.success){
        setUser(null);
        navigate('/');
        toast.success("Logged Out");
      }
      else{
        toast.error(data.message);
      }
      setUser(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <nav
      className="fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 bg-primary py-4 md:py-6"
    >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <img
          src={images.logo}
          alt="logo"
          className={"h-12"}
        />
        <h1 className="text-2xl font-bold">TaskTribe</h1>
      </Link>
      {/* 
      <input type="text" value={ipAddress}/>
      <button onClick={fetchIPInfo}>Click</button> */}

      {/* Desktop Nav */}
      {user ? (
        <div className="hidden md:flex items-center gap-4 lg:gap-8">
          {navLinks.map((link, i) => (
            <Link
              key={i}
              to={link.path}
              className="group flex flex-col justify-center items-center gap-0.5 text-black"
            >
              {link.icon}
              {link.name}
              <div
                className={"bg-black h-0.5 w-0 group-hover:w-full transition-all duration-300"}
              />
            </Link>
          ))}

          <div className="relative group flex justify-center flex-col items-center">
            {/* Trigger Icon */}
            <div className="cursor-pointer">
              <CircleUserRound />
            </div>
            Profile
            {/* Dropdown */}
            <ul className="absolute top-full right-0 mt-2 bg-white shadow-lg border border-gray-200 py-2 w-40 rounded-md text-sm z-40 opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 invisible group-hover:visible">
              <li
                onClick={logout}
                className="px-4 py-2 hover:bg-secondary/10 cursor-pointer"
              >
                Logout
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => {
              setShowUserLogin(true);
            }}
            className="cursor-pointer bg-black text-white px-8 py-2.5 rounded-full ml-4 transition-all duration-500"
          >
            Login
          </button>
        </div>
      )}

      {/* Mobile Menu Button */}
      <div className="flex items-center gap-3 md:hidden">
        <svg
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`h-6 w-6 cursor-pointer`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="18" x2="20" y2="18" />
        </svg>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="absolute top-4 right-4"
          onClick={() => setIsMenuOpen(false)}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {user ? (
          <div className="flex flex-col items-center space-y-4">
            {/* Navigation Links */}
            {navLinks.map((link, i) => (
              <Link
                key={i}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center space-x-2 text-gray-800"
              >
                {link.icon}
                <span className="text-base">{link.name}</span>
              </Link>
            ))}
            <div className="flex items-center space-x-2 cursor-pointer">
              <CircleUserRound className="w-6 h-6" />
              <span>Profile</span>
            </div>
            <button
              onClick={logout}
              className="bg-black text-white px-6 py-2 rounded-full mx-4"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              setShowUserLogin(true);
              setIsMenuOpen(false);
            }}
            className="bg-black text-white px-6 py-2 rounded-full mx-4 mt-4"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
