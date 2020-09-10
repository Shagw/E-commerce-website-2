import { createStore, combineReducers, compose, applyMiddleware} from 'redux';
import { productListReducer, productSaveReducer, productDeleteReducer } from './reducers/productReducers';
import thunk from 'redux-thunk'; 
import { productDetailsReducer } from './reducers/productReducers';
import {cartReducer} from './reducers/cartReducer';
import Cookie from 'js-cookie';
import { userSigninReducer, userRegisterReducer, userUpdateReducer } from './reducers/userReducer';
import { orderCreateReducer, orderDetailsReducer, orderPayReducer, myOrderListReducer, orderListReducer, orderDeleteReducer } from './reducers/orderReducer';


const cartItems = Cookie.getJSON("cartItems") || [];
const userInfo = Cookie.getJSON("userInfo") || null;
const initialState = { cart: { cartItems ,shipping:{},payment:{}},userSignIn:{userInfo} };
const reducer = combineReducers({
    productList:productListReducer,
    productDetails:productDetailsReducer,
    cart:cartReducer,
    userSignIn:userSigninReducer,
    userRegister:userRegisterReducer,
    productSave:productSaveReducer,
    productDelete:productDeleteReducer,
    orderCreate:orderCreateReducer,
    orderDetails:orderDetailsReducer,
    orderPay:orderPayReducer,
    myOrderList:myOrderListReducer,
    userUpdate:userUpdateReducer,
    orderList:orderListReducer,
    orderDelete:orderDeleteReducer
})
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store =createStore(reducer,initialState,composeEnhancers(applyMiddleware(thunk)));
export default store;