import React,{useState} from 'react'
import {Link,useHistory} from 'react-router-dom'
import './Login.css'
import {auth} from './firebase';
import { useStateValue } from './StateProvider'
function Login() {
   const histroy=useHistory();
    const [email,setEmail]=useState('');
   const [password,setPassword]=useState('');
   const signIn=e=>{
   e.preventDefault();
       auth.signInWithEmailAndPassword(email,password)
       .then(auth=>{
           histroy.push('/');
       }) .catch(error=>alert(error.message));
   }
   const register =()=>{
    histroy.push('/register')
        
   }
    return (
      
        <div className="login">
              <Link to="/">
              <h1 className="login_logo">
                    B&R
                </h1>
            </Link>
          <div className="login_container">
               <h1>Sign-in</h1>
               <form>
                   <h5>E-mail</h5>
                   <input type='text' value={email} onChange
                   ={e=>setEmail(e.target.value)}
                   />
                   <h5>Password</h5>
                   <input type='password' value={password} onChange=
                   {e=>setPassword(e.target.value)}/>
                   <button className='loginsignin' type ="submit" onClick={signIn}>Sign In</button>
               </form>
               <p>
               By continuing, you agree to  B&R's Conditions of Use and Privacy Notice. 
               </p>
               <button className='loginregister' type="submit" onClick={register}>Create your B&R's accout</button>
          </div>
        </div>
    )
}

export default Login
