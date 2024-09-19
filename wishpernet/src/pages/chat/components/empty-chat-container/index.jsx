import { animationDefaultOptions } from '@/lib/utils'
import React from 'react'
import Lottie from 'react-lottie'

function EmptyChatContainer() {
  return (
    <div className='flex-1 md:bg-[#1c1d25] md:flex flex-col justify-center items-center hidden duration-1000 transition-all'>
      <Lottie isClickToPauseDisabled={true} height={200} width={200} options={animationDefaultOptions}/>
      <div className='text-opacity-80 text-white flex flex-col gap-5 items-center mt-10 lg:text-4xl text-3xl duration-300 transition-all text-center'>
        <h3 className='poppins-medium'>  
          HI<span className='text-purple-500'>! </span>
          Welcome to
          <span className='text-purple-500'> WishperNet </span>Chat App
          <span className='text-purple-500'>.</span>

        </h3>
      </div>
    </div>
  )
}

export default EmptyChatContainer