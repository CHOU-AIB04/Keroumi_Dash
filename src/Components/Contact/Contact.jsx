import React from 'react'
import { useContext } from 'react'
import { AllMessages, AllProduct } from '../../Contexts/GetData'
import { confirmAlert } from 'react-confirm-alert';
import toast from 'react-hot-toast';
import axios from 'axios';

const Contact = () => {
  let {Messages,getmessages,setgetmessages} = useContext(AllMessages)
  const handledelete = (id)=>{
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure you want to delete the Messages?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            axios.delete(`http://localhost:80/MY_PROJECTS/KeroumiDash/?type=mesages&item=${id}`).then((response)=>{
              setgetmessages(getmessages === 0 ? 1 : 0)
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
  return (
    <>
      {
        Messages.length !== 0 ?
        <table className='mt-10 w-[90%] relative left-1/2 -translate-x-1/2'>
          <tr>
            <th className='border border-zinc-500 text-white font-bold text-center h-10'>Message</th>
            <th className='border border-zinc-500 text-white font-bold text-center h-10'>User Name</th>
            <th className='border border-zinc-500 text-white font-bold text-center h-10'>email</th>
            <th className='border border-zinc-500 text-white font-bold text-center h-10'>Message</th>
            <th className='border border-zinc-500 text-white font-bold text-center h-10'>Delete Message</th>
          </tr>
          { Messages.map(message=>{
            return(
              <tr>
                <td className='border border-zinc-500 text-white font-bold text-center h-12'>{message.Id}</td>
                <td className='border border-zinc-500 text-white font-bold text-center h-12'>{message.user_name}</td>
                <td className='border border-zinc-500 text-white font-bold text-center h-12'>{message.user_email}</td>
                <td className='border border-zinc-500 text-white font-bold text-center h-12'>{message.msg}</td>
                <td className='border border-zinc-500 text-white font-bold text-center h-12'><button className='w-36 h-7 rounded-md bg-orange-500 font-bold text-white' onClick={()=>handledelete(message.Id)}>Delete</button></td>
              </tr>
            )
          })}
        </table>
        : <h1 className=' text-orange-500 uppercase text-[18px] text-center mt-10'>no Messages yet</h1>
      }
    </>
  )
}

export default Contact