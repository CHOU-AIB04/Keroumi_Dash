import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../../Asset/logo_keroumi.png'
import { MdMessage } from 'react-icons/md';
import { MdOutlineKeyboardCommandKey } from "react-icons/md";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { MdFitnessCenter } from "react-icons/md";
const Header = () => {
  let styles = {
    color : "orangered",
    backgroundColor : "white"
  }
  return (
    <header className='h-36 head sha '>
      <div className='h-2/3 bg-transparent flex justify-center items-center'>
          <img src={logo} alt="logo" className='w-52 md:w-64' />
      </div>
      <nav className='h-1/3 w-full grid grid-cols-5'>
        <NavLink to="" className='bg-orange-600 border border-zinc-600 rounded-md sha text-white font-bold text-[12px] md:text-[17px] transition-colors duration-300 hover:bg-white hover:text-orange-600 flex flex-col items-center gap-1 pt-1' style={({isActive})=> isActive ? styles : null}><IoMdAdd size={20} /> <span>Add-Product</span></NavLink>
        <NavLink to="/Products" className='bg-orange-600 border border-zinc-600 rounded-md sha text-white font-bold text-[10px] md:text-[17px] transition-colors duration-300 hover:bg-white hover:text-orange-600 flex flex-col items-center gap-1 pt-1' style={({isActive})=> isActive ? styles : null}><MdOutlineProductionQuantityLimits size={20}/> <span>ALL-Products</span></NavLink>
        <NavLink to="/Orders" className='bg-orange-600 border border-zinc-600 rounded-md sha text-white font-bold text-[10px] md:text-[17px] transition-colors duration-300 hover:bg-white hover:text-orange-600 flex flex-col items-center gap-1 pt-1' style={({isActive})=> isActive ? styles : null}><MdOutlineKeyboardCommandKey size={20} /> <span>Orders</span></NavLink>
        <NavLink to="/Messages" className='bg-orange-600 border border-zinc-600 rounded-md sha text-white font-bold text-[10px] md:text-[17px] transition-colors duration-300 hover:bg-white hover:text-orange-600 flex flex-col items-center gap-1 pt-1' style={({isActive})=> isActive ? styles : null}><MdMessage size={20} /> <span>Messages</span></NavLink>
        <NavLink to="/Coaching" className='bg-orange-600 border border-zinc-600 rounded-md sha text-white font-bold text-[10px] md:text-[17px] transition-colors duration-300 hover:bg-white hover:text-orange-600 flex flex-col items-center gap-1 pt-1' style={({isActive})=> isActive ? styles : null}><MdFitnessCenter size={20} /> <span>Coaching</span></NavLink>
      </nav>
    </header>
  )
}

export default Header