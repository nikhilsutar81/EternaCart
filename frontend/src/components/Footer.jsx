import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='bg-gray-50'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm px-6 sm:px-12 py-12'>
        <div>
            <img src={assets.logo} className='mb-5 w-32 hover:opacity-80 transition-opacity' alt="EternaCart Logo" />
            <p className='w-full md:w-2/3 text-gray-700 leading-relaxed'>Discover a world of premium products at EternaCart. We bring you quality, convenience, and exceptional customer service. Shop with confidence and enjoy seamless delivery to your doorstep.</p>
        </div>
        <div>
            <p className='text-xl font-semibold mb-5 text-gray-800'>COMPANY</p>
            <ul className='flex flex-col gap-3 text-gray-600'>
                <li onClick={scrollToTop} className='cursor-pointer hover:text-black transition-colors hover:translate-x-1 duration-200'>Home</li>
                <li><a href="/about" className='hover:text-black transition-colors hover:translate-x-1 duration-200'>About us</a></li>
                <li><a href="/contact" className='hover:text-black transition-colors hover:translate-x-1 duration-200'>Contact</a></li>
            </ul>
        </div>
        <div>
            <p className='text-xl font-semibold mb-5 text-gray-800'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-3 text-gray-600'>
                <li className='hover:text-black transition-colors'>📞 +91 9130000000</li>
                <li className='hover:text-black transition-colors'>✉️ eternacart@gmail.com</li>
            </ul>
        </div>
      </div>
      <div className='border-t border-gray-200'>
        <p className='py-6 text-sm text-center text-gray-600'>Copyright 2024 @ EternaCart - All Rights Reserved.</p>
      </div>
    </div>
  )
}

export default Footer;
