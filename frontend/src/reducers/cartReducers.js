import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_VIEW_ITEM } from "../constants/cartConstants";

function cartReducer(state={cartItems:[]},action){
    switch(action.type){
        case CART_ADD_ITEM:
            const item = action.payload;
            const product = state.cartItems.find(x=>x.product===item.product);
            if(product){
                
                return {cartItems: state.cartItems.map(x=>x.product===product.product?item:x)}
            }
            else{
               
                return{cartItems:[...state.cartItems,item]}
            }
        case CART_VIEW_ITEM:
            const data = action.payload;
            const result = state.cartItems.find(x=>x.product===data.product);
            if(result){
                return {cartItems: state.cartItems.map(x=>x.product===result.product?data:x)}
            }
            else{
                return{cartItems:[...state.cartItems,data]}
            }
        case CART_REMOVE_ITEM:
            return{cartItems: state.cartItems.filter(x=>x.product!== action.payload )}
        default:
            return state;
    }
}

export {cartReducer}