import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import { productListReducer, productDetailsReducer } from "./reducers/productReducers";
import {cartReducer} from "./reducers/cartReducers"
import thunk from 'redux-thunk';
import { userSigninReducer, userRegisterReducer } from "./reducers/userReducers";
import Cookie from 'js-cookie';

const userinfo = Cookie.getJSON("userInfo") || null;
const initialState = {userSignin: {userinfo}};
const reducer =  combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;