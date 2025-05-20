import React from "react";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Footer from "../components/Footer";
import Benifits from "../components/Benifits";



const Homepage = () => {
  return (
    <div className="bg-gradient-to-b from-black via-zinc-900 to-black h-auto">
    <Hero/>
    <Benifits/>
    <Services/>
    <Footer/>
    </div>
  );
};

export default Homepage;
