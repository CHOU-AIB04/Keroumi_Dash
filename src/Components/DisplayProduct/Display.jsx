import React from 'react'
import { GrUpdate } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { useContext } from 'react';
import { AllProduct } from '../../Contexts/GetData';
import { confirmAlert } from 'react-confirm-alert'; // Import react-confirm-alert
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MOdifyProduct } from '../../Contexts/Modify';

const Display = () => {

  // the getdata,setgetdata it's for updating the state for execute the code inside the useeffect

  let {setgetdata,getdata,allproducts} = useContext(AllProduct)
  // this for display all products comming from the backend
  let {setModifyprod} = useContext(MOdifyProduct)
  let navigate = useNavigate()
  // this function it's for delete a product after confirmation 
  const handledelete = (id)=>{
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure you want to delete the product?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            axios.delete(`http://localhost:80/MY_PROJECTS/KeroumiDash/?type=product&item=${id}`).then((response)=>{
              setgetdata(getdata === 0 ? 1 : 0)
              toast.success("product is succesfuly deleted")
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
  // this function it's for taking specific item data from database and then display it to the product details"
  const HandleModify = (id)=>{
    let product = allproducts.filter((e)=>e.id === id);
    setModifyprod(product[0])
    navigate('/ModifyProduct')

  }
  return (
    <>
     {
      allproducts.length !== 0 ?
      <section className='w-[95%] relative left-1/2 -translate-x-1/2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10 place-items-center'>
      {
        allproducts.map((product)=>{
          return(
            <nav key={product.id} className='bg-zinc-900 sha rounded-lg w-[85%] md:w-full h-[550px] space-y-4 pb-4 relative'> 
              <div className='h-1/2 flex justify-center pt-2'>
                <img src={`http://localhost:80/MY_PROJECTS/KeroumiDash/products/${product.pic}`} alt="product" className='h-full w-[50%] md:w-[70%] object-cover rounded-md sha'/>
              </div>
              <div className='text-white font-bold space-y-2 text-center flex flex-col items-center'>
                <h1 className='text-[18px]'>{product.tittle}</h1>
                <h2>{product.price} Mad / <small className='text-gray-500'>150 Mad</small></h2>
                <div className='h-[70px] overflow-hidden text-center'>
                  <p className='w-[95%]'>{product.description}</p>
                </div>
                <div className='flex gap-7 justify-center absolute bottom-2 w-full'>
                  <button className='w-24 md:w-32 h-10 font-bold text-white bg-green-500 flex justify-center gap-2 items-center rounded-md transition-colors duration-500 hover:bg-white hover:text-green-500' onClick={()=>HandleModify(product.id)}><GrUpdate size={20}/> <span>Modify</span></button>
                  <button className='w-24 md:w-32 h-10 font-bold text-white bg-red-500 flex justify-center gap-2 items-center rounded-md transition-colors duration-500 hover:bg-white hover:text-red-500' onClick={()=>handledelete(product.id)}><MdDelete size={20}/> <span>Delete</span></button>
                </div>
                <div className='flex items-center gap-4'>
                  <p> Stock : <span className='text-orange-500'>{product.available}</span> unité</p>
                    {
                      parseInt(product.available) <=30 ? <p className='w-[100px] h-7 bg-red-600 text-white text-sm grid place-content-center rounded-sm'>Feu Rouge</p>: ""
                    }
                </div>
              </div>
              
            </nav>    
          )
        })
      }
    </section>
    : <h1 className=' text-orange-500 uppercase text-[18px] text-center mt-10'>no Products yet</h1>
     }
    </>
  )
}

export default Display