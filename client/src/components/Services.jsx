import React from 'react'
import { images } from '../assets/assets';

const Services = () => {
  const menimages = [
    { name: 'Facial', img: images.menfacial },
    { name: 'Haircut', img: images.menhaircut },
    { name: 'Massage', img: images.menmassage },
  ];

  const womenimage = [
    { name: 'Facial', img: images.womenfacial },
    { name: 'Haircut', img: images.womenhaircut },
    { name: 'Massage', img: images.womenmassage },
    { name: 'Massage', img: images.womenmassage },
  ];

  return (
    <>
      {/* Men's Zone */}
      <div className='min-h-100 bg-transparent p-4 md:p-10 text-white border-t-2 border-b-2 mt-4 mb-8 flex flex-col md:flex-row justify-center gap-5 items-center'>
        <h1 className='text-3xl md:text-5xl text-center md:text-right bg-white w-full md:w-auto text-black px-4 py-2 rounded-xl whitespace-nowrap'>Men's Zone</h1>

        <div className='w-full overflow-x-auto'>
          <div className='flex flex-nowrap items-center gap-6'>
            {menimages.map((item, idx) => (
              <div key={idx} className='flex-shrink-0 flex flex-col justify-between items-center gap-3 min-w-[150px]'>
                <img className='border-2 rounded-2xl h-48 md:h-60 object-cover' src={item.img} alt={item.name} />
                <h1 className='text-lg md:text-xl'>{item.name}</h1>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Women's Zone */}
      <div className='min-h-100 bg-transparent p-4 md:p-10 text-white border-t-2 border-b-2 mt-4 mb-8 flex flex-col-reverse md:flex-row justify-center items-center gap-5'>
        <div className='w-full overflow-x-auto'>
          <div className='flex flex-nowrap items-center gap-6'>
            {womenimage.map((item, idx) => (
              <div key={idx} className='flex-shrink-0 flex flex-col justify-between items-center gap-3 min-w-[150px]'>
                <img className='border-2 rounded-2xl h-48 md:h-60 object-cover' src={item.img} alt={item.name} />
                <h1 className='text-lg md:text-xl'>{item.name}</h1>
              </div>
            ))}
          </div>
        </div>
        <h1 className='text-3xl md:text-5xl text-center md:text-right bg-white w-full md:w-auto text-black px-4 py-2 rounded-xl whitespace-nowrap'>Women's Zone</h1>
      </div>
    </>
  );
};

export default Services;
