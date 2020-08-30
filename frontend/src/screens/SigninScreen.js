import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../actions/userActions';
import ReactGa from 'react-ga';




function SigninScreen (props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userSignin =  useSelector(state => state.userSignin);
    const {loading , userInfo, error} = userSignin;
    const dispatch = useDispatch();

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
        e.preventDefault();
        dispatch(signin(email, password));
        

    }      

    return   loading?<div>..Loading</div>:
        <div className="form">
         <form onSubmit={submitHandler}>
             <ul className="form-container">
                 <li>
                     {error?<div>Not Validated</div>:console.log("User Present")
                     }
                 </li>
                 <li>
                     <h2>Sign-In</h2>
                 </li>
                 <li>
                    <label htmlFor="email">
                        Email:
                    </label>
                    <input type="email" name="email" id="email" onChange={(e)=>setEmail(e.target.value)}>
                    </input>              
                </li>
                <li>
                    <label htmlFor="password">
                        Password:
                    </label>
                    <input type="password" id="password" name="password" onChange={(e)=>setPassword(e.target.value)}>
                    </input>
                </li>
                <li>
                    <button type="submit" className="button">Signin</button>
                </li>
                <li>
                    New here?
                </li>
                <li>
                    <Link to="/register" className="button">Register as new user</Link>
                </li>
             </ul>
         </form>
    </div>
}

export default SigninScreen;