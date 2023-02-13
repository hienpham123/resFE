import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Admin from './Admin'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Resgister'
import Error from './components/404'
import ShowProduct from './components/admin/ShowPrd'
import AddProduct from './components/admin/AddProduct'
import Category from './components/admin/Category'
import Cart from './components/admin/Cart'
import AllProduct from './components/AllProduct'
import RestaurantDetail from './components/RestaurantDetail'
import ListProducts from './components/ListProducts';
import ListSearch from './components/ListSearch';
import EditProduct from './components/admin/EditProduct'
import BlogDetail from './components/BlogDetail'
import DashBoard from './components/admin/Dashboard'
import User from './components/admin/User'
import Profile from './components/Profile'
ReactDOM.render(
  <React.StrictMode>
    <Router>

      <Routes>
        <Route path="/" element={<App />}>
          <Route path="" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="regist" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="nha-hang" element={<AllProduct />}>
            <Route path="" element={<ListProducts />} />
            <Route path=":slug" element={<RestaurantDetail />} />
          </Route>
          <Route path="search" element={<Outlet />}>
            <Route path="" element={<ListProducts />} />
            <Route path=":key" element={<ListSearch />} />
          </Route>
          <Route path="blog" element={<Outlet />}>
            <Route path="" element={<ListProducts />} />
            <Route path=":id" element={<BlogDetail />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Route>

        <Route path="/admin" element={<Admin />}>
          <Route path="" element={<DashBoard />} />
          <Route path="nha-hang" element={<ShowProduct />} />
          <Route path="them-nha-hang" element={<AddProduct />} />
          <Route path="sua-nha-hang" element={<Outlet />}>
            <Route path="" element={<AddProduct />} />
            <Route path=":id" element={<EditProduct />} />
          </Route>
          <Route path="category" element={<Category />} />
          <Route path="cart" element={<Cart />} />
          <Route path="user" element={<User />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>

    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
