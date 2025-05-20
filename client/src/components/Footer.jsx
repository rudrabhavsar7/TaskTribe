import React from "react";
import { Facebook, Instagram, Twitter, SendHorizontal } from "lucide-react";
import { images } from "../assets/assets";

const Footer = () => {
  return (
    <div className="min-h-10 w-100vh text-black bg-primary p-10 rounded-2xl -translate-y-4 mx-4 flex flex-col items-center gap-3">
      <div className="flex flex-row justify-between gap-100 items-center">
        <div className="flex flex-row items-center">
          <img src={images.logo} alt="" className="h-20 w-20" />
          <h1 className="font-bold text-2xl">TaskTribe</h1>
        </div>
        <h1 className=" md:text-4xl font-bold">
          Join the Tribe That Gets Things Done
        </h1>
      </div>
      <div className="flex flex-row gap-20">
        <div className="flex flex-col items-start justify-center border p-4 rounded-2xl text-white bg-black">
          <h1 className="mt-5 mb-2 text-2xl">Feel Free To Contact Us</h1>
          <div className="flex flex-row gap-4">
            <input
              className="p-2 border rounded-xl"
              type="text"
              name="FooterEmail"
              id=""
              placeholder="Enter Your Email"
            />
            <button className="border rounded-xl p-2 bg-white text-black">
              <SendHorizontal />
            </button>
          </div>
        </div>
        <div className="border-2 rounded-2xl p-5 flex flex-row items-start justify-center gap-20">
          <ul>
            <h1 className="font-bold gap-2">Services</h1>
            <li className="cursor-pointer">Women</li>
            <li className="cursor-pointer">Men</li>
            <li className="cursor-pointer">Ac</li>
            <li className="cursor-pointer">Cleaning</li>
            <li className="cursor-pointer">Electrical</li>
          </ul>
          <ul>
            <h1 className="font-bold gap-2">About Us</h1>
            <li className="cursor-pointer">Journey</li>
            <li className="cursor-pointer">Team</li>
            <li className="cursor-pointer">Careers</li>
          </ul>
          <ul>
            <h1 className="font-bold gap-2">Help</h1>
            <li className="cursor-pointer">FAQs</li>
            <li className="cursor-pointer">Contact Us</li>
          </ul>
        </div>
        <div className="flex flex-col items-start justify-center border p-4 rounded-2xl text-white bg-black">
          <h1 className="mt-5 mb-2 text-2xl">Subscribe To Our Newsletter</h1>
          <div className="flex flex-row gap-4">
            <input
              className="p-2 border rounded-xl"
              type="text"
              name="FooterEmail"
              id=""
              placeholder="Enter Your Email"
            />
            <button className="border rounded-xl p-2 bg-white text-black">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-3 items-center mt-5">
        <Facebook />
        <Instagram />
        <Twitter />
      </div>
    </div>
  );
};

export default Footer;
