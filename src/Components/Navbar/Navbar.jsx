import React from 'react'
import { BellIcon, ChatBubbleOvalLeftEllipsisIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'


const Navbar = () => {
  return (
    <div className='bg-customGray h-28 p-4'>
        <h1 className='text-2xl text-white'>OS Villa</h1>

        <div className='flex justify-between items-center'>
        <div className='flex gap-3'>
            <MagnifyingGlassIcon className='text-white h-7 bg-customPink p-1 rounded-full' />
            <ChatBubbleOvalLeftEllipsisIcon className='text-white h-7 p-1 rounded-full bg-customPink' />
            <BellIcon className='text-white h-7 p-1 rounded-full bg-customPink' />
        </div>

        <div className='flex gap-3'>
          <button className='border border-customPink text-white p-2 rounded-2xl'>Sign Up</button>
          <button className='bg-customPink text-white p-2 rounded-2xl'>Login</button>
        </div>
        </div>
    </div>
  )
}

export default Navbar