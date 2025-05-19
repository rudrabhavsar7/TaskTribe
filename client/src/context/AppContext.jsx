import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from 'axios';

// Create context
const AppContext = createContext();
axios.defaults.withCredentials = true;
// Provider component
export const AppContextProvider = ({ children }) => {

  const [user, setUser] = useState(false);
  const [isSeller,setIsSeller] = useState(false);
  const [state,setState] = useState('login');
  const [showUserLogin,setShowUserLogin] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate();

    //add product to cart
  const addToCart = (itemId) => {
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }
    setCartItems(cartData);
    toast.success("Added To Cart");
  };

  //update cart item

  const updateCartItem = (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success("Cart Updated");
  };

  //remove product from cart

  const removeFromCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
    }
    toast.success("Removed From Cart");
    setCartItems(cartData);
  };

  //get cart items count
  const getCartCount = () => {
    let count = 0;
    for (const items in cartItems) {
      count += cartItems[items];
    }
    return count;
  };

  //get cart total price
  const getCartAmount = () => {
    let totalPrice = 0;
    for (const items in cartItems) {
      let product = products.find((item) => item._id === items);
      if (cartItems[items] > 0 && product) {
        totalPrice += product.offerPrice * cartItems[items];
      }
    }
    return Math.floor(totalPrice * 100) / 100;
  };

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/api/user/is-auth",{
        withCredentials:true
      });

      if (data.success) {
        setUser(data.user);
        setCartItems(data.user.cartItems);
      } else {
        setUser(false);
        setCartItems({});
      }
    } catch (error) {
      setUser(null);
      setCartItems({});
    }
  };

  const fetchSellerStatus = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/api/seller/is-auth");
      if (data.success) {
        setIsSeller(true);
      } else {
        setIsSeller(false);
      }
    } catch (error) {
      setIsSeller(false);
    }
  };

  useEffect(()=>{
    fetchUser()
    fetchSellerStatus()
  },[])
  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        isSeller,
        setIsSeller,
        navigate,
        showUserLogin,
        setShowUserLogin,
        setState,
        state,
        addToCart,
        removeFromCart,
        updateCartItem,
        axios,toast,fetchUser,fetchSellerStatus
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook
export const useAppContext = () => useContext(AppContext);
