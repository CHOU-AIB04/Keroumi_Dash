import React from 'react'
import { useState } from 'react'
import {toast } from "react-hot-toast"
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AllProduct } from '../../Contexts/GetData'
import Swal from 'sweetalert2'
import { MOdifyProduct } from '../../Contexts/Modify'

export const Modify = () => {
  let navigate = useNavigate()
  let {setgetdata} = useContext(AllProduct)
  let {getdata} = useContext(AllProduct)
  let {Modifyprod} = useContext(MOdifyProduct)
let [dataform,setdataform] = useState({
  name : Modifyprod.tittle,
  price : Modifyprod.price,
  Promotion : Modifyprod.fake_price,
  Stock : Modifyprod.available,
  protein : Modifyprod.protein,
  strong_point : Modifyprod.pointfort,
  description : Modifyprod.description,
  picture : Modifyprod.pic,
})
// this state it's for handle the change if the user want to change the pic or not
let [modifypic,setmodifypic] = useState();

// this function it's updating the state value onchange any field value
const Handlechange = (event)=>{
  let {tagName,name,value}  = event.target
  // handle the input type 
  if (tagName === "INPUT") {
      let {type} = event.target
      if (type === "text" || type === "number") {
        setdataform({...dataform,[name]:value}) 
      }else{
          let {files} = event.target
          setdataform({...dataform,[name]:files[0]})
      }
  }else{
    setdataform({...dataform,[name]:value})
  }
}
// this function it's handle the change it's if the user want to change the picture or not
const Handlepicchange = (event)=>{
  let {files} = event.target
  setmodifypic(files[0]);
}
// this function is't for handling the form submit throught it we can comfirm that all field are not empty and then we can send the data to the server
const Handlesubmit = (event) =>{
  event.preventDefault();
  let check = 0
  Object.keys(dataform).map((e,index)=>{
    let value = dataform[e]
    if (value === "") {
      toast.error(`the ${e} field is required`)
    }else{
      check++
    }
  })
  if (check === 8) {
    const formdata = new FormData()
    formdata.append('name',dataform.name);
    formdata.append('price',dataform.price);
    formdata.append('Promotion',dataform.Promotion);
    formdata.append('available',dataform.Stock);
    formdata.append('protein',dataform.protein);
    formdata.append('strong_point',dataform.strong_point);
    formdata.append('description',dataform.description);
    formdata.append('picture',dataform.picture);
    formdata.append('mod_pic',modifypic)
    axios.post(`http://localhost:80/MY_PROJECTS/KeroumiDash/?update=${Modifyprod.id}`,formdata).then((response)=>{
      setgetdata(getdata === 0 ? 1 : 0);
       navigate("/Products")
      Swal.fire({
        position:"center",
        icon:"success",
        title:"your product successfuly Modified",
        showConfirmButton: true,
        timer:1500,
      })
      window.scrollTo({
        top:0,
        behavior:"smooth"
      })
    })
   
  }
}

return (
    <form className='mt-10 flex flex-col gap-5 items-center pb-3 pl-6' onSubmit={Handlesubmit}>
      <h1 className='text-orange-500 font-bold text-[30px] text-center'>Modify Product</h1>
      <nav className='grid grid-cols-1 md:grid-cols-2 place-items-center w-[90%] gap-5 md:gap-0'>
        <div className='flex flex-col gap-2 text-white w-full'>
          <label htmlFor="">Product Name (*)</label>
          <input type="text" value={dataform.name} name='name'  className='w-[95%] md:w-[90%] h-8 rounded-md focus:outline-none text-white bg-zinc-700 border border-zinc-400 pl-3' onChange={Handlechange}/>  
        </div>
        <div className='flex flex-col gap-2 text-white w-full'>
          <label htmlFor="">Product Price (*)</label>
          <input type="number" value={dataform.price} name='price'  className='w-[95%] md:w-[90%] h-8 rounded-md focus:outline-none text-white bg-zinc-700 border border-zinc-400 pl-3' onChange={Handlechange}/>
          
        </div>
      </nav>
      <nav className='grid grid-cols-1 md:grid-cols-2 w-[90%] gap-5 md:gap-0'>
        <div className='flex flex-col gap-2 text-white w-full'>
          <label htmlFor="">Promotion Price (*)</label>
          <input type="nmuber" value={dataform.Promotion}   name='Promotion' className='w-[95%] md:w-[90%] h-8 rounded-md focus:outline-none text-white bg-zinc-700 border border-zinc-400 pl-3' onChange={Handlechange}/>
          <small className='text-gray-500'>if there is no Promotion write 0</small>
          
        </div>
        <div className='flex flex-col gap-2 text-white w-full'>
          <label htmlFor="">Stock </label>
          <input type="text" value={dataform.Stock} name="Stock" className='w-[95%] md:w-[90%] h-8 rounded-md focus:outline-none text-white bg-zinc-700 border border-zinc-400 pl-3' onChange={Handlechange}/>
          <small>if you product in not available More write 0 instead of 1</small>
        </div>
      </nav>
      <div className='flex flex-col gap-2 text-white w-[90%]'>
        <label htmlFor="">Product Type (*)</label>
        <select name="protein" value={dataform.protein} id="" className='w-[95%] h-8 rounded-md focus:outline-none text-white bg-zinc-700 border border-zinc-400 pl-3' onChange={Handlechange}>
          <option value={dataform.protein}>{dataform.protein === "1" ? "Protein" : "Debardaur"}</option>
        </select>
      </div>
      <div className='flex flex-col gap-2 text-white w-[90%]'>
        <label htmlFor="">Strong Point (*)</label>
        <textarea name="strong_point" value={dataform.strong_point}  className='w-[95%] min-h-32 max-h-52 rounded-md focus:outline-none text-white bg-zinc-700 border border-zinc-400 pl-5 pt-5' onChange={Handlechange}></textarea>
        
      </div>
      <div className='flex flex-col gap-2 text-white w-[90%]'>
        <label htmlFor="">Description (*)</label>
        <textarea name="description" value={dataform.description}  className='w-[95%] min-h-32 max-h-52 rounded-md focus:outline-none text-white bg-zinc-700 border border-zinc-400 pl-5 pt-5' onChange={Handlechange}></textarea>
        
      </div>
      <div className='flex flex-col gap-2 text-white w-[90%]'>
        <label htmlFor="">Product Picture</label>
        <input type="file"  className='w-[90%] h-8 rounded-md focus:outline-none text-white' onChange={Handlepicchange}/>    
      </div>
      <input type="hidden" value={dataform.picture} name='picture'/>
      <button className='bg-orange-600 w-36 h-8 rounded-md font-bold text-white sha transition-colors duration-300 hover:bg-white hover:text-orange-600' type='submit'>Modify</button>
    </form>
  )
}
