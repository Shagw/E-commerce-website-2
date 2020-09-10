import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { payOrder, listMyOrders } from '../actions/orderActions';
import {Link} from 'react-router-dom' 
import {Form,FormGroup,Label,Col,Input,Card,CardBody,CardTitle, Button,Table} from 'reactstrap';
import { logout, update } from '../actions/userActions';



function ProfileComponent(props){
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const dispatch = useDispatch();

    const userSignIn = useSelector(state=>state.userSignIn)
    const {userInfo} = userSignIn;
    
    useEffect(() => {
        if (userInfo) {
          console.log(userInfo.name)
          setEmail(userInfo.email);
          setName(userInfo.name);
          setPassword(userInfo.password);
        }   
        dispatch(listMyOrders());
        return () => {
    
        };
      }, [userInfo])
    
      const handleLogout = () => {
        dispatch(logout());
        props.history.push("/");
      }

    const updateHandler=(e)=>{
        e.preventDefault();
        dispatch(update({userId:userInfo._id,name,email,password}))
    }

    const myOrderList = useSelector(state => state.myOrderList);
    const { loading: loadingOrders, orders, error: errorOrders } = myOrderList;
    

    const userUpdate = useSelector(state => state.userUpdate);
    const { loading, success, error } = userUpdate;
    return(
        <div className="fluid-container ">
            <div className="row row-content">
                <div className="col-12 col-md-4">
                    <Card className="card-profile">
                        <CardTitle style={{margin:"10px"}}>
                            <h1>Profile</h1>
                        </CardTitle>
                        <CardBody>
                            <Form onSubmit={updateHandler}>
                                <FormGroup row>
                                    {loading && <div>Loading...</div>}
                                    {error && <div>{error}</div>}
                                    {success && <div>Profile Saved Successfully.</div>}
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor="name" md={4} xs={4}>Your Name</Label>
                                    <Col md={8} xs={8}>
                                        <Input type="text" id="firstname" name="firstname"
                                            placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)}
                                            />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor="email" md={4} xs={4}>Email</Label>
                                    <Col md={8} xs={8}>
                                        <Input type="text" id="email" name="email"
                                            placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                                    </Col>                        
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor="password" xs={4} md={4}>Password</Label>
                                    <Col md={8} xs={8}>
                                        <Input type="password" id="password" name="password"
                                            placeholder="Password"  onChange={(e)=>setPassword(e.target.value)}/>
                                    </Col>                        
                                </FormGroup>
                                <FormGroup row>
                                    <Col md={{size: 8, offset: 4}} xs={{size: 8, offset: 4}}>
                                        <Button type="submit" color="primary">
                                        Update Profile
                                        </Button>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md={{size: 8, offset: 4}} xs={{size: 8, offset: 4}}>
                                        <Button type="submit" color="primary" onClick={handleLogout}>
                                        Logout
                                        </Button>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-12 col-md-8">
                {
                    loadingOrders ? <div>Loading...</div> :
                    errorOrders ? <div>{errorOrders} </div> :
                    <Table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Paid</th>
                                <th>Delivered</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody> 
                            {orders.map(order => <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>{order.isPaid}</td>
                                    <td>{order.isDelivered}</td>
                                    <td>
                                    <Link to={"/order/" + order._id}>DETAILS</Link>
                                    </td>
                            </tr>)}
                        </tbody>
                    </Table>
                    }
                </div>
            </div>
        </div>
    )   
}

export default ProfileComponent;