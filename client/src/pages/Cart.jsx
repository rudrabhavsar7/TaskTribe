import React from 'react'
import { useAppContext } from '../context/AppContext'

const Cart = () => {

    const { cartItems, services } = useAppContext();

    console.log(typeof cartItems)

  return (
    <div className='flex flex-col md:flex-row h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white'>
      <div className="md:w-1/3 w-full p-6 flex items-center justify-center sticky top-0 md:h-screen z-10 md:mt-0 mt-20">
        <h1 className="text-3xl md:text-5xl font-bold capitalize text-center md:text-left">
          Your Tribe Picks
        </h1>
      </div>
      <div>
        <div className='md:w-2/3 w-full p-5 space-y-6 md:mt-25'>
          <div className='space-y-8'>
            { !cartItems ? (
              <p>Your cart is empty</p>
            ) : (
                Object.entries(cartItems).map(([serviceId, { quantity }]) => {
                  const service = services.find(item => item.serviceId === serviceId);
                  return quantity != 0 && (
                    <div key={serviceId} className='flex items-center justify-between bg-gray-800 p-4 rounded-lg'>
                      <div>
                        <h2 className='text-xl font-semibold'>{service?.title}</h2>
                        <p>Quantity: {quantity}</p>
                      </div>
                      <button className='bg-red-500 text-white px-4 py-2 rounded-lg'>Remove</button>
                    </div>
                  )
                })
              )
            }
          </div>
        </div>
      </div>
      <div>

      </div>
    </div>
  )
}

export default Cart
