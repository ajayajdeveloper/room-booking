// import React from 'react';
// import {useState , useEffect} from "react"
// import axios from "axios"
// import Loader from '../components/Loader'
// import Error from '../components/Error'

// function Loginscreen() {
    
//     const [email,setemail] = useState(" ")
//     const [password,setpassword] = useState(" ")
//     const [loading, setloading] = useState(false)
//     const [error, seterror] = useState()

//   async function Login(){

//         const user = {
             
//                 email,
//                 password,
               
//             }
//             try{
//                 setloading(true)
//                 const result = (await axios.post('https://happyrooms.herokuapp.com/api/users/login',user)).data
//                 // setloading(false)
//                 localStorage.setItem('currentUser',JSON.stringify(result))
//                 window.location.href='/home'
//             }
//             catch(error)
//             {
//                console.log(error)
//                setloading(false)
//                seterror(true)
//             }
            
     
//     }

//   return (
//       <div>
//               {loading && (<Loader/>)}
//           <div className='row justify-content-center mt-5'>
//               <div className='col-md-5 mt-5 '>
//                   {error && (<Error message=" invalid credentials"/>)}
//                   <div className='bs'>
//                       <h2>Login</h2>
                   

//                       <input type="text" placeholder='email'  className='form-control' 
//                       value={email} onChange={ (e) => {setemail(e.target.value)}} />

//                       <input type="text"  placeholder='password' className='form-control' 
//                       value={password} onChange={ (e) => {setpassword(e.target.value)}}/>

                   
//                       <button className='btn btn-primary mt-3' onClick={Login}>Login</button>
//                   </div>

//               </div>
//           </div>
//       </div>
//   )

// }

// export default Loginscreen;




import React, { useState, useEffect } from "react";
import {useDispatch , useSelector} from 'react-redux'
import axios from "axios";
import Error from "../components/Error";
import Loader from "../components/Loader";
import Success from "../components/Success";
import Swal from 'sweetalert2'
export default function Loginscreen() {
  

    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const[loading, setloading]=useState(false)
    const[error, seterror]=useState(false)
    const[success, setsuccess]=useState(false)    

    useEffect(() => {

          if(localStorage.getItem('currentUser'))
          {
              window.location.href='/'
          }
        
    }, [])

    async function login(){
      const user={
     
        email,
        password
    }
      try {
        setloading(true)
        const result = await (await axios.post('/api/users/login',user)).data
        localStorage.setItem('currentUser',JSON.stringify(result))
        window.location.href='/'
      } catch (error) {
        seterror(true)
        setloading(false)
        console.log(error);
        
      }
    }

    return (
        <div className='login'>
         <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5 text-left shadow-lg p-3 mb-5 bg-white rounded">
          <h2 className="text-center m-2" style={{ fontSize: "35px" }}>
            Login
          </h2>

          {loading && (<Loader/>)} 
          {error && (<Error error='Invalid Credentials'/>)}
          {success && (<Success success='User Login Successfull'/>)}
          <div>
            <input required type="text" placeholder="email" className="form-control mt-1" value={email} onChange={(e)=>{setemail(e.target.value)}} />
            <input
              type="text"
              placeholder="password"
              className="form-control mt-1"
              value={password}
              required
              onChange={(e)=>{setpassword(e.target.value)}}
            />
            
            <button onClick={login} className="btn btn-success mt-3 mb-3 rounded-pill">LOGIN</button>
            <br/>
            <a style={{color:'black'}} href="/register" className="mt-2">Click Here To Register</a>
          </div>
        </div>
      </div>
        </div>
    )
}

