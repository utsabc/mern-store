import axios from 'axios';
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_VIEW_ITEM } from '../constants/cartConstants';



const addToCart = (productId, qty,color,email) => async (dispatch) => {
    try{
        /* if exists the update else save */
        const cart = await axios.post("/api/saveCart/get",{ 
            email,productId});
        
        if(cart.data) {
          
            await axios.post("/api/saveCart/update",{ 
                email,productId,qty,color});
        } else {
            /* save the product qty,with id and email */
           
            await axios.post("/api/saveCart/save",{ 
                email,productId,qty,color});
        }
        

        /*get the data from mongo product id and qty*/
        const cartData = await axios.get("/api/saveCart/"+email);
        alert("Product added to cart Successfully");
        cartData.data.forEach(async element => {
            const {data} = await axios.get("/api/products/"+element.productid);
            const qty = element.count;
            const color = element.color;
                dispatch({type: CART_ADD_ITEM,payload:{
                product: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                qty,
                color
    
            }})  
        });
       
    }catch(error){

    }
}

const removeFromCart = (productId,email) => async (dispatch) => {
    await axios.post("/api/saveCart/delete",{ 
        email,productId});
    alert("Product removed from cart Successfully");
    dispatch({type: CART_REMOVE_ITEM, payload:productId});
}

const viewUserCart = (email) =>async (dispatch) => {
    const cartData = await axios.get("/api/saveCart/"+email);
    cartData.data.forEach(async element => {
        const {data} = await axios.get("/api/products/"+element.productid);
        const qty = element.count;
        const color = element.color;
            dispatch({type: CART_VIEW_ITEM,payload:{
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty,
            color

        }})  
    });
}
export {addToCart, removeFromCart,viewUserCart}