import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../../Asset/logo_keroumi.png'

const Footer = () => {
  let style = {
    color : "orangered"
  }
  return (
    <footer className='bg-transparent  w-full sha flex flex-col items-center gap-5 mt-10'>
      <div>
        <img src={logo} alt="pic" className='w-52 md:w-64'/>
      </div>
      <nav className='space-x-3'>
        <NavLink to="/" className="text-white font-bold text-[12px] md:text-[17px]" style={({isActive})=> isActive ? style : null}>Add Products</NavLink>
        <NavLink to="/Products" className="text-white font-bold text-[12px] md:text-[17px]" style={({isActive})=> isActive ? style : null}>Products</NavLink>
        <NavLink to="/Orders" className="text-white font-bold text-[12px] md:text-[17px]" style={({isActive})=> isActive ? style : null}>Orders</NavLink>
        <NavLink to="/Messages" className="text-white font-bold text-[12px] md:text-[17px]" style={({isActive})=> isActive ? style : null}>Messages</NavLink>
      </nav>
    </footer>
  )
}

export default Footer