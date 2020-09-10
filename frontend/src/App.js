import React from 'react';
import './App.css';
import {BrowserRouter,  Route, Link } from 'react-router-dom';
import HomeComponent from './components/HomeComponent';
import ProductComponent from './components/ProductComponent';
import CartComponent from './components/CartComponent';
import SignInComponent from './components/SignInComponent';
import { useSelector } from 'react-redux';
import RegisterComponent from './components/RegisterComponent';
import ProductsComponent from './components/ProductsComponent';
import ShippingComponent from './components/ShippingComponent';
import PaymentComponent from './components/PaymentComponent';
import PlaceOrderComponent from './components/PlaceOrderComponent';
import OrderComponent from './components/OrderComponent';
import ProfileComponent from './components/ProfileComponent';
import OrdersComponent from './components/OrdersComponent';

function App() {

    const userSignin = useSelector(state => state.userSignIn);
    const { userInfo } = userSignin;
    const openMenu=()=>{
      document.querySelector('.sidebar').classList.add('open');
    }
    const closeMenu=()=>{
      document.querySelector('.sidebar').classList.remove('open');
    }
  return (
    <BrowserRouter>
    <div className='grid-container'>
      <header className="header">
        <div className="brand">
          <button onClick={openMenu}>
              &#9776;
          </button>
          <Link to='/'>Amazona</Link>
        </div>
        <div className="header-links">
          <a href="/cart">Cart  </a>
          {
            userInfo ? <Link to='/profile'>{userInfo.name}</Link>:
            <Link to='/signin'>Sign In</Link>
          }
          {
            userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <a href='#'>Admin</a>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/orders">Orders</Link>
                    <Link to ="/products">Products</Link>
                  </li>
                </ul>
              </div>
            )
          }
        </div>
      </header>
      <aside className="sidebar">
        <h3>Shopping Categories</h3>
        <button className='sidebar-close-button' onClick={closeMenu}>x</button>
        <ul className="categories">
          <li className="sidebar-links"> 
            <Link to="/">Home</Link>
          </li>
          <li className="sidebar-links">
          <Link to="/category/Jeans">Pants</Link>
          </li>
          <li className="sidebar-links">
          <Link to="/category/Shirt">Shirts</Link>
          </li>
          <li className="sidebar-links">
          <Link to="/category/Shoes">Shoes</Link>
          </li>
        </ul>
      </aside>
      <main className="main">
        <div className="content">
          <Route path="/" exact={true} component={HomeComponent}/>
          <Route path="/category/:id" component={HomeComponent} />
          <Route path="/product/:id" component={ProductComponent}/>
          <Route path="/profile" component={ProfileComponent}/>
          <Route path="/cart/:id" component={CartComponent} />
          <Route path="/orders" component={OrdersComponent} />
          <Route exact path="/cart" component={CartComponent} />
          <Route path="/signin" component={SignInComponent}/>
          <Route path="/register" component={RegisterComponent}/>
          <Route path="/shipping" component={ShippingComponent}/>
          <Route path="/products" component={ProductsComponent}/>
          <Route path="/payment" component={PaymentComponent}/>
          <Route path="/order/:id" component={OrderComponent}/>
          <Route path="/placeorder" component={PlaceOrderComponent}/>
        </div>
      </main>
      <footer className="footer">
        All rights Reserved.
      </footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
