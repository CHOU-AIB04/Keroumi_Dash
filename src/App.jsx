import { useState ,useEffect} from 'react'
import { BrowserRouter as Router,Routes,Route, useLocation, useNavigate } from 'react-router-dom'
import Add from './Components/AddProduct/Add'
import Contact from './Components/Contact/Contact'
import Display from './Components/DisplayProduct/Display'
import Footer from './Components/Footer/Footer'
import Header from './Components/Header/Header'
import { Modify } from './Components/ModifyProduct/Modify'
import Order from './Components/Orders/Order'
import toast, {Toaster} from "react-hot-toast"
import axios from 'axios'
import { AllOrders, AllProduct,AllMessages } from './Contexts/GetData'
import { MOdifyProduct } from './Contexts/Modify'
import Coaching from './Components/Coaching/Coaching'
import OrderDetail from './Components/OrderDetails/OrderDetail'
import Auth from './Components/auth/Auth'
import CryptoJS from 'crypto-js'

function App() {
  let location = useLocation() 
  let navigate = useNavigate()
   // this secrekey for doing authentification
   const secretKey = "12AZ34ER56TY"
   // for encrypt the id comming from database
   const encryptId = (id, secretKey) => {
   const encrypted = CryptoJS.AES.encrypt(id, secretKey).toString();
   return encrypted;
   };
 
   // function for decypte the id from session storage
 
   const decryptId = (encrypted, secretKey) => {
     const decrypted = CryptoJS.AES.decrypt(encrypted, secretKey).toString(CryptoJS.enc.Utf8);
     return decrypted;
   };
  //  this useeffect to check if the user id Already exist in the session localstorage and then check if decrypted id is correct or not 
   useEffect(()=>{
    if (window.sessionStorage.getItem("TOKEN")) {
      const Id = window.sessionStorage.getItem("TOKEN");
      const decypte = decryptId(Id,secretKey)
      try{
        axios.get(`http://localhost/MY_PROJECTS/KeroumiDash/Auth?id=${decypte}`).then((res)=>{
          if (res.data === 0) {
            navigate("/Auth");
            toast.error("password or email are incorrect !! try again")
          }
        })
      }catch{
        toast.error("a server problem please try again !!")
        navigate('/Auth')
      }
    } else {
      navigate("/Auth")
    }
  },[location.pathname])
  // this usestate to reexecute the useeffect that contain request for all messages  if the value of this usestate is update it
  let [getmessages,setgetmessages] = useState(0);
  // this usestate to reexecute the useeffect that contain request for all orders  if the value of this usestate is update it
  let [getorders,setgetorders] = useState(0);
  // this usestate to reexecute the useeffect that contain request for all product  if the value of this usestate is update it
  let [getdata,setgetdata] = useState(0)
  let [allproducts,setALLproducts] = useState(()=>{
    const data = JSON.parse(window.sessionStorage.getItem("DATA"))
    return data ? data : []
  })
  let [Modifyprod,setModifyprod] = useState([])
  let [Orders,setOrders] = useState([]);
  let [Messages,setMessages] = useState([])
  let [Coach,setCoach] = useState([])
  let [getcoach,setgetcoach] = useState(0)
  let [GetOrderDetail,setGetOrderDetail] = useState([]);
  // useeffect for selecting all product from database  
  
useEffect(() => {
  const fetchData = async () => {
      try {
          const [productsRes, ordersRes, messagesRes, coachRes] = await Promise.all([
              axios.get("http://localhost:80/MY_PROJECTS/KeroumiDash/"),
              axios.get("http://localhost:80/MY_PROJECTS/KeroumiDash/Order"),
              axios.get("http://localhost:80/MY_PROJECTS/KeroumiDash/Contact"),
              axios.get("http://localhost:80/MY_PROJECTS/KeroumiDash/coaching")
          ]);
          window.sessionStorage.setItem("DATA",JSON.stringify(productsRes.data))
          setALLproducts(productsRes.data);
          setOrders(ordersRes.data);
          setMessages(messagesRes.data);
          setCoach(coachRes.data);
      } catch (error) {
          console.error('Error fetching data:', error);
      }
  };

  const intervalId = setInterval(fetchData, 3000);

  return () => clearInterval(intervalId);
}, []);
  return (
    <AllMessages.Provider value={{Messages,setMessages,getmessages,setgetmessages}} >
      <AllOrders.Provider value={{Orders,setOrders,getorders,setgetorders,getcoach,setgetcoach,setCoach,Coach,GetOrderDetail,setGetOrderDetail}}>
        <MOdifyProduct.Provider value={{Modifyprod,setModifyprod,secretKey,encryptId,decryptId}}>
          <AllProduct.Provider value={{allproducts,setgetdata,getdata}}>
              <Toaster position="top-right" reverseOrder={false}/>
              
              {
                location.pathname !== "/Auth" ? <Header /> : <></> 
              }
              <Routes>
                <Route index element={<Add />} />
                <Route path='/Products' element={<Display />} />
                <Route path='/ModifyProduct' element={<Modify />} />
                <Route path='/Orders' element={<Order />} />
                <Route path='/Messages' element={<Contact />} />
                <Route path='/Coaching' element={<Coaching />} />
                <Route path='/OrderDetails' element={<OrderDetail />} />
                <Route path='/Auth' element={<Auth />} />
              </Routes>
          </AllProduct.Provider>
        </MOdifyProduct.Provider>
      </AllOrders.Provider>
    </AllMessages.Provider>
   
  )
}

export default App
