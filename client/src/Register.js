import React,{useState} from 'react'
import {Link,useHistory} from 'react-router-dom'
import './Login.css'
import {auth,db} from './firebase';
import { useStateValue } from './StateProvider'
function Register() {
   const histroy=useHistory();
    const [email,setEmail]=useState('');
   const [password,setPassword]=useState('');
   const [name,setName]=useState('');
   const signIn=e=>{
   e.preventDefault();
       auth.signInWithEmailAndPassword(email,password)
       .then(auth=>{
           histroy.push('/');
       }) .catch(error=>alert(error.message));
   }
   const register =e=>{
    e.preventDefault();
        auth.createUserWithEmailAndPassword(email,password)
        .then(auth=>{
            console.log(auth.user);
              db.collection('users')
              .doc(auth.user?.uid)
              .collection('details')
              .doc('Basic')
              .set({
                  Fullname: name
              })
            histroy.push('/')
        })
        .catch(error=>alert(error.message));
   }
    return (
      
        <div className="login">
              <Link to="/">
              <h1 className="login_logo">
                    B&R
                </h1>
            </Link>
          <div className="login_container">
               <h1>Sign-up</h1>
               <form>
               <h5>Full Name</h5>
                   <input type='text' value={name} onChange
                   ={e=>setName(e.target.value)}
                   />
                   <h5>E-mail</h5>
                   <input type='text' value={email} onChange
                   ={e=>setEmail(e.target.value)}
                   />
                   <h5>Password</h5>
                   <input type='password' value={password} onChange=
                   {e=>setPassword(e.target.value)}/>
                   <h5>Confirm Password</h5>
                   <input type='password' />
                   <button className='loginsignin' type ="submit" onClick={register}>Create Your Account</button>
               </form>
               <p>
               By continuing, you agree to B&R's Conditions of Use and Privacy Notice. 
               </p>
              
          </div>
        </div>
    )
}

export default Register
