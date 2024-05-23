import React from 'react'
import { useContext } from 'react'
import { AllOrders } from '../../Contexts/GetData'
import { confirmAlert } from 'react-confirm-alert'; // Import react-confirm-alert
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MdCancel } from "react-icons/md";

const OrderDetail = () => {
    const navigate = useNavigate()
    let {GetOrderDetail,setGetOrderDetail,getorders,setgetorders} = useContext(AllOrders)
    // the getdata,setgetdata it's for updating the state for execute the code inside the useeffect
    // this onclick function it's for deleting all the order from the dashboard
    const handledelete = (id)=>{
        confirmAlert({
          title: 'Confirm to submit',
          message: 'Are you sure you want to delete the order ?',
          buttons: [
            {
              label: 'Yes',
              onClick: () => {
                axios.delete(`http://localhost:80/MY_PROJECTS/KeroumiDash/?type=orders&item=${id}`).then((response)=>{
                  setgetorders(getorders === 0 ? 1 : 0)
                  navigate("/Orders")
                  toast.success("Order is succesfuly deleted")
                })
              }
            },
            {
              label: 'No',
              onClick: () => {
                
              }
            }
          ]
        });
    }

    // this onclick function it's for deleting one product from a specific order if the client want to 

    const Delete_prod = (order_id,prod_id,prod_price,total,qte)=>{
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure you want to delete the product? ',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                  axios.delete(`http://localhost:80/MY_PROJECTS/KeroumiDash/OrderDetails?order_id=${parseInt(order_id)}&prod_id=${parseInt(prod_id)}&prod_price=${parseInt(prod_price)}&tot=${parseFloat(total)}&qte=${qte}`).then((response)=>{
                    setgetorders(getorders === 0 ? 1 : 0)
                    toast.success("product is succesfuly deleted")
                    axios.get(`http://localhost:80/MY_PROJECTS/KeroumiDash/OrderDetails?item=${order_id}`).then((res)=>{
                        setGetOrderDetail(res.data)
                    
                    })
                  })
                }
              },
              {
                label: 'No',
                onClick: () => {
                  
                }
              }
            ]
          });
    }
  return (
    <section className='w-[80%] mt-10 relative left-1/2 -translate-x-1/2 flex flex-col items-center pb-32'>
        <nav className='grid grid-cols-1 md:grid-cols-2 w-[90%] place-items-center'>
            <div className='flex items-center justify-center md:justify-start gap-4 w-full h-16 text-white'>
                <p>- Nom de client : </p>
                <h2 className='text-orange-500'>{GetOrderDetail[0].name}</h2>
            </div>
            <div className='flex items-center justify-center md:justify-start gap-4 w-full h-16 text-white'>
                <p>- Téléphone de client : </p>
                <h2 className='text-orange-500'>{GetOrderDetail[0].tel}</h2>
            </div>
            <div className='flex items-center justify-center md:justify-start gap-4 w-full h-16 text-white'>
                <p>- Carte National de client : </p>
                <h2 className='text-orange-500'>{GetOrderDetail[0].Carte_Nat}</h2>
            </div>
            <div className='flex items-center justify-center md:justify-start gap-4 w-full h-16 text-white'>
                <p>- Adresse de client : </p>
                <h2 className='text-orange-500'>{GetOrderDetail[0].ville}</h2>
            </div>
            <div className='flex items-center justify-center md:justify-start gap-4 w-full h-16 text-white'>
                <p>- La Date de commande : </p>
                <h2 className='text-orange-500'>{GetOrderDetail[0].date_commande}</h2>
            </div>
            <div className='flex items-center justify-center md:justify-start gap-4 w-full h-16 text-white'>
                <p>- N° Commande : </p>
                <h2 className='text-orange-500'>{GetOrderDetail[0].order_id}</h2>
            </div>
        </nav>
        <nav className='w-[90%] mt-10 space-y-3'>
            <h1 className='text-orange-500 text-[30px] font-bold'>Products </h1>
            <div className='grid grid-cols-1 lg:grid-cols-2 place-items-start lg:place-items-center gap-6'>
                {
                    GetOrderDetail.map((prod)=>{
                        return(
                            <div className='w-[400px] h-24  flex gap-5'>
                                <div className='w-[100px] h-full relative rounded-md overflow-hidden'>
                                    <img src={`http://localhost/MY_PROJECTS/KeroumiDash/products/${prod.pic}`} alt="pic" className='w-full h-full object-cover'/>
                                </div>
                                <div className='w-[280px]'>
                                    <p className='text-white text-[15<px]'>{prod.tittle}</p>
                                    <div className='flex items-center gap-1'>
                                        <p className='text-zinc-300'>{prod.price} Mad</p>
                                        <p className='text-orange-500'>*</p>
                                        <p className='text-zinc-300'>{prod.qte}</p>
                                    </div>
                                    <MdCancel size={30} className="text-orange-500 cursor-pointer" onClick={()=>Delete_prod(GetOrderDetail[0].order_id,prod.id,prod.price,GetOrderDetail[0].total,prod.qte)}/>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </nav>
        <nav className='w-[90%] mt-10 space-y-5'>
           <div className='flex items-center gap-5'>
                <h1 className='text-orange-500 text-[16px]'>Total : </h1>
                <h2 className='text-white'>{GetOrderDetail[0].total} Mad</h2>
           </div>
            <div className='space-x-4'>
                <button className='w-28 md:w-36 h-7 rounded-md bg-orange-500 font-bold text-white' onClick={()=>handledelete(GetOrderDetail[0].order_id)}>Suprimé</button>
                <button className='w-28 md:w-36 h-7 rounded-md bg-orange-500 font-bold text-white'>Print</button>
            </div>
        </nav>
    </section>
  )
}

export default OrderDetail