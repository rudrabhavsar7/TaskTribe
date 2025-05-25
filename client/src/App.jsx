import { useEffect, useState ,} from "react";
import Navbar from "./components/Navbar";
import { Route, Routes,useLocation } from "react-router-dom";
import Homepage from "./pages/Homepage";
import CategoryPage from "./pages/CategoryPage";
import "./App.css";
import Login from "./components/Login";
import { useAppContext } from "./context/AppContext";
import { Toaster } from "react-hot-toast";
import SellerLogin from "./components/seller/SellerLogin";
import AddCategory from "./pages/seller/AddCategory";
import SellerLayout from "./pages/seller/SellerLayout";
import AddSubCategory from "./pages/seller/AddSubCategory";
import AddServices from "./pages/seller/AddServices";
import Cart from "./pages/Cart";
import ServiceSlot from "./components/ServiceSlot";
import AddAddress from "./components/AddAddress";
import Order from "./pages/order";

function App() {

  const isSellerPath = useLocation().pathname.includes('seller');
  const {showUserLogin,isSeller,setShowSelectSlot,showSelectSlot,ShowAddress,setShowAddress,address,setAddress} = useAppContext();

  return (
    <>
    <Toaster/>
      {!isSellerPath && <Navbar />}
      {showUserLogin ? <Login/>:null}
      {showSelectSlot ? <ServiceSlot /> : null}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/address" element={<AddAddress />} />
        <Route path="/order" element={<Order />} />
        <Route path="/:categoryName" element={<CategoryPage />} />
        <Route path="/seller" element={isSeller ? <SellerLayout/> : <SellerLogin/>}>
          <Route index element={isSeller ? <AddCategory/>:null}/>
          <Route path='subcategories' element= {<AddSubCategory/>} />
          <Route path='services' element={<AddServices/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
