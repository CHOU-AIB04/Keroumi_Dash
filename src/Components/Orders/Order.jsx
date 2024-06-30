import axios from 'axios'
import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react'
import { AllOrders, AllProduct } from '../../Contexts/GetData';
import { confirmAlert } from 'react-confirm-alert';
import toast from 'react-hot-toast';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { format } from 'date-fns';


const Order = () => {
  let {Orders,getorders,setgetorders,setGetOrderDetail} = useContext(AllOrders)
  const [search,setsearch] = useSearchParams();
  const get_filter = search.get("order");
  let navigate = useNavigate()
  const Getdetails = (id)=>{
    axios.get(`http://localhost:80/MY_PROJECTS/KeroumiDash/OrderDetails?item=${id}`).then((res)=>{
      setGetOrderDetail(res.data)
      navigate("/OrderDetails");
    })
  }
  const commande_date = new Date();
  const format_day = format(commande_date,"yyyy-MM-dd");
  const handlechange = ()=>{
    let input = document.getElementById("search").value
    setsearch({"order" : input.toUpperCase()})
  }
  // need to fix that 
  const filtered_orders = Orders.filter((order)=> order.Carte_Nat.includes(get_filter))
  const displayed_order = get_filter === "" || search.has("order") === false  ? Orders : filtered_orders
  return (
    <>
    {
     Orders.length !== 0 ? 
     <>
     <input type="text" id='search' className='w-[300px] h-10 pl-3 rounded-md left-[80%] relative -translate-x-[80%] mt-10' placeholder='recherche sur commande' onChange={handlechange}/>
      <table className='mt-10 w-[90%] relative left-1/2 -translate-x-1/2'>
          <tr>
            <th className='border border-zinc-500 text-white font-bold text-center h-10'>Order</th>
            <th className='border border-zinc-500 text-white font-bold text-center h-10'>Client Name</th>
            <th className='border border-zinc-500 text-white font-bold text-center h-10'>Client Tel</th>
            <th className='border border-zinc-500 text-white font-bold text-center h-10'>Carte Nat</th>
            <th className='border border-zinc-500 text-white font-bold text-center h-10'>Date commande</th>
            <th className='border border-zinc-500 text-white font-bold text-center h-10'>Total</th>
            <th className='border border-zinc-500 text-white font-bold text-center h-10'>Status</th>
            <th className='border border-zinc-500 text-white font-bold text-center h-10'>Order Details</th>
          </tr>
          { displayed_order.map(order=>{
          return(
            <tr>
              <td className='border border-zinc-500 text-white font-bold text-center h-12'>{order.Id}</td>
              <td className='border border-zinc-500 text-white font-bold text-center h-12'>{order.name}</td>
              <td className='border border-zinc-500 text-white font-bold text-center h-12'>{order.tel}</td>
              <td className='border border-zinc-500 text-white font-bold text-center h-12'>{order.Carte_Nat}</td>
              <td className='border border-zinc-500 text-white font-bold text-center h-12'>{order.date_commande}</td>
              <td className='border border-zinc-500 text-white font-bold text-center h-12'>{order.total}</td>
              <td className={`border border-zinc-500 font-bold text-center h-12 ${order.Accepted == null ? "text-orange-500" : order.Accepted == 0 ? "text-red-500" : "text-green-500"}`}>{order.Accepted ==null ? "In Progress" : order.Accepted == 0 ? "Refused" : "Accepted"}</td>
              <td className='border border-zinc-500 text-white font-bold text-center h-12 flex flex-col gap-1 items-center justify-center'>
                <button className='w-24 md:w-28 h-5 text-sm rounded-md bg-orange-500 font-bold text-white' onClick={()=>Getdetails(order.Id)}>Details</button>
                {
                format_day === order.date_commande ? <button className='bg-green-500 w-[50px] rounded-md text-[12px] text-white'>Today</button> : ""
                }
              </td>
            
             
              
          </tr>
          )
          })}
        </table> 
      </>
      : <h1 className='text-orange-500 uppercase text-[18px] text-center mt-10'>No Orders yet</h1> 
    }
    </>
    
  )
}

export default Order