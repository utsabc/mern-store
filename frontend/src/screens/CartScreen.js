
import React, { useEffect } from 'react';
import { addToCart, removeFromCart,viewUserCart } from '../actions/cartActions';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {getcookie} from '../utils/util';
import ReactGa from 'react-ga';

function CartScreen(props){
    const userEmail = getcookie('email');
    const cart = useSelector(state=>state.cart);
    const {cartItems} = cart;
    const productId =  props.location.pathname.split("/")[2];
    const ar = props.location.search.split("&");
    const qty = ar[0]? Number(ar[0].split("=")[1]):1;
    const color = ar[1]? String(ar[1].split("=")[1]):"Red";
    const dispatch = useDispatch();
    const removeFromCartHandler = (productId) => {
        dispatch(removeFromCart(productId,userEmail));
    }
    useEffect(()=> {
        
        ReactGa.pageview(window.location.pathname + window.location.search)
        console.log(ReactGa.ga())

        if(typeof userEmail === 'undefined' || typeof userEmail === 'null'){
            alert("Please sign in, to save data in cart");
        }
        if(productId){
            dispatch(addToCart(productId,qty,color,userEmail));
        }else{
            dispatch(viewUserCart(userEmail));
        }
    },[]);

    const checkOutHandler = () => {
        ReactGa.event({
            category : 'Garment',
            label : 'Cart',
            action : 'Saving Cart',
            value : cartItems.reduce((a,c) => a+c.price*c.qty,0)
                       
        })
        props.history.push("/redirect-to-shipping");
    }
    return <div className="cart">
        <div className="cart-list">
            <ul className="cart-list-container">
                <li>
                    <h3>
                        Shopping Cart
                    </h3>
                    <h5>Price:</h5>
                </li>
                {
                    cartItems.length ===0?
                    <div>Cart Is Empty</div>:
                    cartItems.map(item=>
                        <li>
                            <div className="cart-image">
                                <img src={item.image} alt="product" />
                            </div>
                            
                            <div className="cart-name">
                                <div>
                                    <Link to={"/product/"+item.product}>
                                     {item.name}
                                    </Link>
                                </div>
                                <div>
                                    Qty:{item.qty} &nbsp; Color:{item.color} &nbsp; 
                                    <button className="button" type="button" onClick={() => removeFromCartHandler(item.product)}>
                                        Delete
                                    </button>
                                </div>
                                <div className="cart-price">
                                     ${item.price}
                                </div>
                            </div>
                        </li>
                    )
                }
            </ul>
        </div>
        <div className="cart-action">
            <h3>
                Subtotal ({cartItems.reduce((a,c)=> a + +c.qty,0)} items):
                ${cartItems.reduce((a,c) => a+c.price*c.qty,0)}
            </h3>
            <button onClick={checkOutHandler} className="button" disabled={cartItems.length === 0 }>
                CheckOut
            </button>
        </div>
    </div>
}

export default CartScreen; 