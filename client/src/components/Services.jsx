import React from 'react'
import { images } from '../assets/assets';

const Services = () => {

  const menimages = [
    {
      name:'Facial',
      img: images.menfacial
    },
    {
      name:'Haircut',
      img: images.menhaircut
    },
    {
      name:'Massage',
      img: images.menmassage
    },
  ]

  const womenimage = [
    {
      name:'Facial',
      img: images.womenfacial
    },
    {
      name:'Haircut',
      img: images.womenhaircut
    },
    {
      name:'Massage',
      img: images.womenmassage
    },
    {
      name:'Massage',
      img: images.womenmassage
    },
  ]
  return (
    <>
    <div className='min-h-100 bg-transparent p-15 text-white border-t-2 border-b-2 mt-4 mb-8 flex flex-row justify-center items-center gap-5'>
        <h1 className='text-5xl'>Men's Zone</h1>
      <div className='flex flex-row justify-between items-center gap-10 overflow-auto'>
        {menimages.map((item,idx)=>{
          return <div key={idx} className='flex flex-col justify-between items-center gap-5'>
          <img className='border-2 rounded-2xl h-60' src={item.img} alt="" />
          <h1 className='text-xl'>{item.name}</h1>
          </div>
        })}
      </div>
    </div>
    <div className='min-h-100 bg-transparent p-15 text-white border-t-2 border-b-2 mt-4 mb-8 flex flex-row justify-center items-center gap-5'>
      <div className='w-full md:w-3/4 flex flex-row justify-between items-center gap-10 overflow-x-auto flex-nowrap'>
        {womenimage.map((item,idx)=>{
          return <div key={idx} className='flex-shrink-0 flex flex-col justify-between items-center gap-5'>
          <img className='border-2 rounded-2xl h-60' src={item.img} alt="" />
          <h1 className='text-xl'>{item.name}</h1>
          </div>
        })}
      
      </div>
      <h1 className='text-5xl text-right bg-black'>Women's Zone</h1>
    </div>
    </>
  )
}

export default Services;
