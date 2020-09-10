import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom' 
import {Form,FormGroup,Label,Col,Input,Card,CardBody,CardTitle, Button,Table} from 'reactstrap';
import { listOrders, deleteOrder } from '../actions/orderActions';



function OrdersComponent(props){
    
    const dispatch = useDispatch();

    const userSignIn = useSelector(state=>state.userSignIn)
    const {userInfo} = userSignIn;

    const orderDelete = useSelector(state=>state.orderDelete);
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = orderDelete;
    
    const orderList = useSelector(state=>state.orderList);
    const {loading,orders,error} = orderList;

    useEffect(()=>{
        dispatch(listOrders());
        return ()=>{

        };  
    },[successDelete]);

    const deleteHandler = (order) => {
        dispatch(deleteOrder(order._id));
      }

    return(
        loading ? <div>Loading...</div> :
        <div className="fluid-container ">
            <div className="row row-content">
                <div className="col-12">
                   
                </div>
                <div className="col-12 ">
                    <h3>Orders</h3>
                {
                    <Table>
                        <thead>
                            <tr>
                                <th>ORDER ID</th>
                                <th>User ID</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Paid</th>
                                <th>Delivered</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody> 
                            {orders.map(order=>(<tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.user._id}</td>
                                <td>{order.createdAt}</td>
                                <td>{order.totalPrice}</td>
                                <td>{order.isPaid.toString()}</td>
                                <td>{order.isDelivered.toString()}</td>
                                <td>
                                <Link to={"/order/" + order._id} className="detailbutton">Details</Link>
                                    {' '}
                                <Button type="button"  onClick={()=>{deleteHandler(order)}} className="btn-secondary btn-lg">Delete</Button>
                                </td>
                            </tr>))}
                        </tbody>
                    </Table>
                    }
                </div>
            </div>
        </div>
    )   
}

export default OrdersComponent;