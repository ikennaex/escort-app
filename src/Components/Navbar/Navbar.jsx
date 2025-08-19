import React from 'react'
import { BellIcon, ChatBubbleOvalLeftEllipsisIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router'


const Navbar = () => {
  return (
    <div className='bg-customGray  px-4 py-2'>
        <h1 className='text-2xl text-white'>OS Villa</h1>

        <div className='flex justify-between items-center'>
        <div className='flex gap-3'>
            <MagnifyingGlassIcon className='text-white h-7 bg-customPink p-1 rounded-full' />
            <ChatBubbleOvalLeftEllipsisIcon className='text-white h-7 p-1 rounded-full bg-customPink' />
            <BellIcon className='text-white h-7 p-1 rounded-full bg-customPink' />
        </div>

        <div className='flex gap-3'>
          <Link to={"/register-card"}>
          <button className='border border-customPink text-white px-2 py-1 rounded-xl'>Sign Up</button>
          </Link>

          <Link to={"/login"}>
          <button className='bg-customPink text-white px-2 py-1 rounded-xl'>Login</button>
          </Link>
        </div>
        </div>
    </div>
  )
}

export default Navbar