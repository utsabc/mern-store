import React, { useEffect } from 'react';
import './App.css';
import {BrowserRouter,Route, Link} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import CheckOutScreen from './screens/CheckOutScreen';
import { useSelector } from 'react-redux';
import {getcookie,clean} from '../src/utils/util';
import ReactGa from 'react-ga';
import RegisterScreen from './screens/RegisterScreen';
import LogOutScreen from './screens/LogOutScreen';

function App() {

  const username = getcookie('name');
  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin;
  useEffect(()=>{
    
    ReactGa.initialize('UA-176700529-1', {
        gaOptions: {
          userId: (username)?username:'Not-Logged'
        },
      'cookieDomain': 'auto',
      'debug': true
    });
    ReactGa.pageview(window.location.pathname + window.location.search)
    console.log(ReactGa.ga())
       
  },[])

  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  }

  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  }

  return (
    <BrowserRouter>
    <div className="grid-container">
    <header className="header">
        <div className="brand">
            <button onClick={openMenu}>
                &#9776;
            </button>
            <Link to="/">Clothing Mall</Link>
           
         </div>
        <div className="header-links">
            <a href="/cartView" ><b>Cart</b></a>
            {
              username?<Link to="/signin"><b>{clean(username)}</b></Link>:
              <Link to="/signin"><b>Sign In</b></Link>
            }
            <Link to="/logout" ><b>Log out</b></Link>
           
        </div>
    </header>
    <aside className="sidebar">
        <h3>Shopping Categories</h3>
        <button className="sidebar-close-button"onClick={closeMenu}>x</button>
        <ul>
            <li>
                <a href="index.html">Shirts</a>
            </li>
            <li>
                <a href="index.html">Pants</a>
            </li>
        </ul>
    </aside>
    <main className="main">
        <div className="content">
          <Route path="/signin" component={SigninScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart/:id?/:qty?/:color" component={CartScreen} />
          <Route path="/cartView" component={CartScreen} />
          <Route path="/" exact={true} component={HomeScreen} />
          <Route path="/redirect-to-shipping" component={CheckOutScreen} />
          <Route path="/logout" component={LogOutScreen} />
        </div>
      
    </main>
    <footer className="footer">
        All rights reserved
    </footer>
    
</div>
</BrowserRouter>
  );
}

export default App;
