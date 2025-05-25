import React, { useState } from "react";
import { Facebook, Instagram, Twitter, SendHorizontal } from "lucide-react";
import { useAppContext } from "../context/AppContext.jsx";
import { images } from "../assets/assets";

const Footer = () => {

  const { toast } = useAppContext();
  const [newsletter,setNewsletter] = useState(''); 
  const [subscribe,setSubscribe] = useState('Subscribe');

  const handleChange = (e)=>{
    setNewsletter(e.target.value);
  }

  const handleSubcribe = ()=>{
    if(newsletter){
      setSubscribe(<div className="flex items-center justify-center w-full">
        <img className="h-8 w-8 items-center transition ease-in-out duration-1000" src={images.notification} alt="" />
        </div>
      );
      setTimeout(()=>{
        toast.success("Subscribed Successfully");
        setSubscribe("Subscribed");
      },2000)
      setTimeout(()=>{
        setSubscribe("Subscribe");
      },5000)
    }
    else{
      toast.error("Enter Valid Email");
    }

  }
  return (
    <div className="w-auto text-black bg-primary px-6 py-10 rounded-2xl -translate-y-4 mx-4 flex flex-col items-center gap-10">
      
      {/* Header Row */}
      <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <img src={images.logo} alt="logo" className="h-16 w-16" />
          <h1 className="font-bold text-2xl">TaskTribe</h1>
        </div>
        <h1 className="text-2xl md:text-4xl font-bold text-center md:text-right">
          Join the Tribe That Gets Things Done
        </h1>
      </div>

      {/* Middle Section */}
      <div className="w-full flex flex-col lg:flex-row gap-10 justify-between items-start">

        {/* Contact Us */}
        <div className="flex flex-col items-start border p-5 rounded-2xl text-white bg-black w-full lg:w-1/3">
          <h1 className="mb-3 text-xl font-semibold">Feel Free To Contact Us</h1>
          <div className="flex w-full gap-2">
            <input
              className="flex-grow p-2 border rounded-xl text-white"
              type="email"
              placeholder="Enter Your Email"
            />
            <button className="p-2 bg-white text-black rounded-xl cursor-pointer">
              <SendHorizontal />
            </button>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-col sm:flex-row gap-10 border-2 rounded-2xl p-5 flex-grow justify-around w-full lg:w-2/3">
          <ul>
            <h1 className="font-bold mb-2">Services</h1>
            <li className="cursor-pointer">Women</li>
            <li className="cursor-pointer">Men</li>
            <li className="cursor-pointer">AC</li>
            <li className="cursor-pointer">Cleaning</li>
            <li className="cursor-pointer">Electrical</li>
          </ul>
          <ul>
            <h1 className="font-bold mb-2">About Us</h1>
            <li className="cursor-pointer">Journey</li>
            <li className="cursor-pointer">Team</li>
            <li className="cursor-pointer">Careers</li>
          </ul>
          <ul>
            <h1 className="font-bold mb-2">Help</h1>
            <li className="cursor-pointer">FAQs</li>
            <li className="cursor-pointer">Contact Us</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col items-start border p-5 rounded-2xl text-white bg-black w-full lg:w-1/3">
          <h1 className="mb-3 text-xl font-semibold">Subscribe To Our Newsletter</h1>
          <div className="flex flex-col w-full gap-3">
            <input
              className="flex-grow p-2 border rounded-xl text-white"
              type="email"
              placeholder="Enter Your Email"
              value={newsletter}
              onChange={handleChange}
            />
            <button onClick={handleSubcribe} className="p-2 bg-white text-black rounded-xl">
              {subscribe}
            </button>
          </div>
        </div>
      </div>

      {/* Socials */}
      <div className="flex gap-4 mt-4">
        <Facebook className="cursor-pointer hover:text-blue-700" />
        <Instagram className="cursor-pointer hover:text-pink-600" />
        <Twitter className="cursor-pointer hover:text-blue-500" />
      </div>
    </div>
  );
};

export default Footer;
