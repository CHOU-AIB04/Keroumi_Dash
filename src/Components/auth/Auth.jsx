import React, { useContext, useState } from 'react'
import logo from "../../Asset/logo_keroumi.png"
import TextField from "@mui/material/TextField"
import { color } from '@mui/system'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { MOdifyProduct } from '../../Contexts/Modify'
import axios from 'axios'
const Auth = () => {
    let {secretKey,encryptId,decryptId} = useContext(MOdifyProduct)
    let navigate = useNavigate()
    const [dataform,setdataform] = useState({
        email : "",
        password : "",
    })
    // this function it's updating the state value onchange any field value
const Handlechange = (event)=>{
    let {tagName,name,value}  = event.target
    // handle the input type 
    if (tagName === "INPUT") {
        let {type} = event.target
        if (type !== "file") {
          setdataform({...dataform,[name]:value}) 
        }else{
            let {files} = event.target
            setdataform({...dataform,[name]:files[0]})
        }
    }else{
      setdataform({...dataform,[name]:value})
    }

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
    if (check === 2) {
      const formdata = new FormData()
      formdata.append('email',dataform.email);
      formdata.append('pass',dataform.password);
      axios.post("http://localhost:80/MY_PROJECTS/KeroumiDash/Auth",formdata).then((res)=>{
        if (res.data) {
              navigate("/")
             toast.success('Welcome to your Dashboard !!')
             const encryptid = encryptId(res.data.Id,secretKey)
             window.sessionStorage.setItem("TOKEN",encryptid)
        }else{
            toast.error("your email or Password are incorrect")
        }
      })
     
    }
  }
  return (
    <section className=' absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[400px] flex flex-col items-center justify-between gap-10'>
        <div className='w-[230px] overflow-hidden'>
            <img src={logo} alt="logo" className='w-full h-full object-cover'/>
        </div>
        <form className='flex flex-col justify-evenly items-center  h-[80%] w-full sha rounded-md' onSubmit={Handlesubmit}>
            <TextField variant='standard' sx={{'& .MuiInputLabel-root' : {color : "white"}}}  InputProps={{style : {color : "white"}}} className='w-[90%] text-white focus:text-white border border-white' label="Email" type={"email"} name="email" onChange={Handlechange}/> 
            <TextField variant='standard' sx={{'& .MuiInputLabel-root' : {color : "white"}}}  InputProps={{style : {color : "white"}}} className='w-[90%] text-white border focus:text-white border-white' label="PassWord" type={"password"} name="password" onChange={Handlechange}/> 
            <button type='submit' className='bg-orange-600 w-36 h-8 rounded-md font-bold text-white sha transition-colors duration-300 hover:bg-white hover:text-orange-600'>Log In</button>
        </form>
    </section>
  )
}

export default Auth