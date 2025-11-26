import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const NavBar = () => {
  const [visible, setVisible] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const {setShowSearch, getCartCount, navigate, token, setToken, setCartItems} = useContext(ShopContext);
    const logout = () => {
      navigate('/login')
      localStorage.removeItem('token')
      setToken('')
      setCartItems({})
    }
  return (
    <div className="flex items-center justify-between py-5 font-medium">
      {/* Logo */}
      <Link to='/'><img src={assets.logo} className="w-36" alt="Logo" /></Link>

      {/* Navigation Links */}
      <ul className="hidden sm:flex gap-7 text-sm text-gray-700">
        <li className="group">
          <NavLink to="/" className="flex flex-col items-center gap-1 transition-all duration-300 hover:text-black">
            <p>HOME</p>
            <hr className="w-2/4 border-none h-1 bg-black transition-all duration-300 scale-x-0 group-hover:scale-x-100" />
          </NavLink>
        </li>
        <li className="group">
          <NavLink to="/collection" className="flex flex-col items-center gap-1 transition-all duration-300 hover:text-black">
            <p>COLLECTION</p>
            <hr className="w-2/4 border-none h-1 bg-black transition-all duration-300 scale-x-0 group-hover:scale-x-100" />
          </NavLink>
        </li>
        <li className="group">
          <NavLink to="/about" className="flex flex-col items-center gap-1 transition-all duration-300 hover:text-black">
            <p>ABOUT</p>
            <hr className="w-2/4 border-none h-1 bg-black transition-all duration-300 scale-x-0 group-hover:scale-x-100" />
          </NavLink>
        </li>
        <li className="group">
          <NavLink to="/contact" className="flex flex-col items-center gap-1 transition-all duration-300 hover:text-black">
            <p>CONTACT</p>
            <hr className="w-2/4 border-none h-1 bg-black transition-all duration-300 scale-x-0 group-hover:scale-x-100" />
          </NavLink>
        </li>
      </ul>

      {/* Profile and Cart */}
      <div className="flex items-center gap-6">
  <img onClick={() => { setShowSearch(true); navigate('/collection'); }} src={assets.search_icon} className="w-5 cursor-pointer hover:opacity-70 transition-opacity" alt="Search" />

        <div className="relative">
          <img onClick={() => token ? setProfileOpen(p=>!p) : navigate('/login')} className="w-5 cursor-pointer hover:opacity-70 transition-opacity" src={assets.profile_icon} alt="Profile" />
          {token && profileOpen && (
            <div className="absolute right-0 pt-4 z-20 bg-white shadow-lg rounded-lg">
              <div className="flex flex-col gap-2 w-40 py-3 px-4 bg-white text-gray-700 rounded-lg">
                <p onClick={()=>{ setProfileOpen(false); navigate('/profile') }} className="cursor-pointer hover:text-black px-2 py-1.5 rounded transition-all hover:bg-gray-100">My Profile</p>
                <p onClick={()=>{ setProfileOpen(false); navigate('/orders') }} className="cursor-pointer hover:text-black px-2 py-1.5 rounded transition-all hover:bg-gray-100">Orders</p>
                <hr className="my-1" />
                <p onClick={()=>{ setProfileOpen(false); logout() }} className="cursor-pointer hover:text-red-600 px-2 py-1.5 rounded transition-all hover:bg-red-50">Logout</p>
              </div>
            </div>
          )}
        </div>

        <Link to="/cart" className="relative group">
          <img src={assets.cart_icon} className="w-5 min-w-5 hover:opacity-70 transition-opacity" alt="Cart" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px] font-semibold">
            {getCartCount()}
          </p>
        </Link>
        <img onClick={()=>setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden hover:opacity-70 transition-opacity' alt="Menu" />
      </div>
      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
        <div className="flex flex-col text-gray-600">
            <div onClick={() => setVisible(false)} className="flex items-center gap-4 p-3">
            <img src={assets.dropdown_icon} className="h-4 rotate-180" alt="" />
            <p>Back</p>
            </div>
            <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to="/">HOME</NavLink>
            <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to="/collection">COLLECTION</NavLink>
            <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to="/about">ABOUT</NavLink>
            <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to="/contact">CONTACT</NavLink>
        </div>
        </div>
    </div>
  );
};

export default NavBar;
