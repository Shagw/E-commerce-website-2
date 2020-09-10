import {
    ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAILED, 
    ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAILED, 
    ORDER_PAY_REQUEST, ORDER_PAY_FAILED, ORDER_PAY_SUCCESS, 
    MY_ORDER_LIST_REQUEST, MY_ORDER_LIST_SUCCESS, MY_ORDER_LIST_FAILED, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_FAILED, ORDER_DELETE_REQUEST, ORDER_DELETE_SUCCESS, ORDER_DELETE_FAILED
  } from "../constants/orderConstants";
  
  
  function orderCreateReducer(state = {}, action) {
    switch (action.type) {
      case ORDER_CREATE_REQUEST:
        return { loading: true };
      case ORDER_CREATE_SUCCESS:
        return { loading: false, order: action.payload, success: true };
      case ORDER_CREATE_FAILED:
        return { loading: false, error: action.payload };
      default: return state;
    }
  }
  

  function orderDetailsReducer(state = {
    order: {
      orderItems: [],
      shipping: {},
      payment: {}
    }
  }, action) {
    switch (action.type) {
      case ORDER_DETAILS_REQUEST:
        return { loading: true };
      case ORDER_DETAILS_SUCCESS:
        return { loading: false, order: action.payload };
      case ORDER_DETAILS_FAILED:
        return { loading: false, error: action.payload };
      default: return state;
    }
  }

  function myOrderListReducer(state = {
    orders: []
  }, action) {
    switch (action.type) {
      case MY_ORDER_LIST_REQUEST:
        return { loading: true };
      case MY_ORDER_LIST_SUCCESS:
        return { loading: false, orders: action.payload };
      case MY_ORDER_LIST_FAILED:
        return { loading: false, error: action.payload };
      default: return state;
    }
  }
  

    function orderPayReducer(state = {
    order: {
      orderItems: [],
      shipping: {},
      payment: {}
    }
  }, action) {
    switch (action.type) {
      case ORDER_PAY_REQUEST:
        return { loading: true };
      case ORDER_PAY_SUCCESS:
        return { loading: false, success: true };
      case ORDER_PAY_FAILED:
        return { loading: false, error: action.payload };
      default: return state;
    }
  }

  function orderListReducer(state = {
    orders: []
  }, action) {
    switch (action.type) {
      case ORDER_LIST_REQUEST:
        return { loading: true };
      case ORDER_LIST_SUCCESS:
        return { loading: false, orders: action.payload };
      case ORDER_LIST_FAILED:
        return { loading: false, error: action.payload };
      default: return state;
    }
  }
  
  function orderDeleteReducer(state = {
    order: {
      orderItems: [],
      shipping: {},
      payment: {}
    }
  }, action) {
    switch (action.type) {
      case ORDER_DELETE_REQUEST:
        return { loading: true };
      case ORDER_DELETE_SUCCESS:
        return { loading: false, success: true };
      case ORDER_DELETE_FAILED:
        return { loading: false, error: action.payload };
      default: return state;
    }
  }

  export { orderCreateReducer,orderDetailsReducer,orderPayReducer,myOrderListReducer,orderListReducer,orderDeleteReducer} 