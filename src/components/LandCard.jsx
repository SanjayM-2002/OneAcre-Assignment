import React, { useState } from 'react';

import { PiShareFatBold } from 'react-icons/pi';
import { MdFavoriteBorder } from 'react-icons/md';
import { MdFavorite } from 'react-icons/md';
import { GrNext } from 'react-icons/gr';
import { GrPrevious } from 'react-icons/gr';
import { MdVerified } from 'react-icons/md';

const LandCard = ({ data }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const images = data.land_media.map((x) => x.image);

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  const handleLike = () => {
    setIsLiked(!isLiked);
  };
  return (
    <>
      <div className='max-w-lg mx-auto bg-white rounded-lg overflow-hidden shadow-lg'>
        <div className='relative'>
          <img
            className='w-full h-64'
            src={images[currentImageIndex]}
            alt='carousel'
          />
          <button
            className='absolute top-1/2 left-1 transform -translate-y-1/2 bg-white bg-opacity-50 text-white rounded-full p-2'
            onClick={handlePrevious}
          >
            <GrPrevious color='black' />
          </button>
          <button
            className='absolute top-1/2 right-1 transform -translate-y-1/2 bg-white bg-opacity-50 text-white rounded-full p-2'
            onClick={handleNext}
          >
            <GrNext color='black' />
          </button>

          <div className='absolute top-0 right-0 m-2 space-y-2'>
            <div className='flex flex-row gap-2'>
              <button className='bg-white rounded-full p-2'>
                <PiShareFatBold />
              </button>
              <button
                className='bg-white rounded-full p-2'
                onClick={handleLike}
              >
                {isLiked ? <MdFavorite /> : <MdFavoriteBorder />}
              </button>
            </div>
          </div>
        </div>
        {/* Sample Text */}
        <div className='flex flex-col'>
          <div className=' flex flex-row justify-start gap-4 p-2'>
            <p className='text-black font-bold font-sans'>
              {data.village_name}, {data.mandal_name}, {data.district_name},{' '}
              {data.id}
            </p>
            {data.is_basic_verified && (
              <div>
                <MdVerified color='blue' size={16} />
              </div>
            )}
          </div>
          <div className='flex flex-row justify-start gap-4 p-2'>
            <p className='text-black font-semibold font-sans'>
              {data.total_land_size_in_acres.acres} Acres{' . '}
              {data.total_land_size_in_acres.guntas} Guntas
            </p>
            <p className='text-black font-medium font-sans'>
              {data.price_per_acre} Lakhs per Acre
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandCard;
