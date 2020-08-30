import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../actions/userActions';
import ReactGa from 'react-ga';




function RegisterScreen (props) {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRePassword] = useState('');
    const userRegister =  useSelector(state => state.userRegister);
    const {loading , userInfo, error} = userRegister;
    const dispatch = useDispatch();
    const redirect = props.location.search ? props.location.search.split("=")[1] : '/';

    useEffect(()=>{
        
        ReactGa.pageview(window.location.pathname + window.location.search)
        console.log(ReactGa.ga()) 
        if(userInfo){
           props.history.push("/");
        }
        return ()=>{
    
        }
        
      },[userInfo])
    
    const submitHandler = (e) => {
        (repassword !== password)?alert("Paswords Doesn't Match"):
        e.preventDefault();
        dispatch(register(name,email, password));
    }      

 

    return   loading?<div>..Loading</div>:
            error?<div>User Not Present</div>:
        <div className="form">
         <form onSubmit={submitHandler}>
             <ul className="form-container">
             <li>
                 <h2>Register</h2>
             </li>
            <li>
            <label htmlFor="name">
             Name
            </label>
            <input type="name" name="name" id="name" onChange={(e) => setName(e.target.value)}>
            </input>
            </li>
            <li>
              <label htmlFor="email">
             Email
            </label>
              <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}>
             </input>
            </li>
             <li>
              <label htmlFor="password">Password</label>
             <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}>
             </input>
            </li>
            <li>
            <label htmlFor="rePassword">Re-Enter Password</label>
            <input type="password" id="rePassword" name="rePassword" onChange={(e) => setRePassword(e.target.value)}>
            </input>
            </li>
            <li>
             <button type="submit" className="button primary">Register</button>
            </li>
            <li>
                Already have an account?
                 <Link to={Redirect === "/" ? "signin" : "signin?redirect=" + redirect} className="button" >Sign in</Link>

            </li>
             </ul>
         </form>
    </div>
}

export default RegisterScreen;