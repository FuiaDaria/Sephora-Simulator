// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './packages/login/login';
import Customer from './packages/components/customer/Customer';
import ProductList from './packages/components/product/ProductList';
import Cart from './packages/components/cart/Cart';
import Register from './packages/register/Register';
import Start from './packages/start/Start';
import './App.css';
import Manager from './packages/components/manager/Manager';
import AllCustomers from './packages/components/customer/AllCustomers';
import AllProducts from './packages/components/product/AllProducts';
import AddProduct from './packages/components/product/AddProduct';
import AddReview from './packages/components/review/AddReview';
import Admin from './packages/components/admin/Admin';
import AllManagers from './packages/components/manager/AllManagers';
import AddManager from './packages/components/manager/AddManager';
import SearchedProducts from './packages/components/product/SearchedProducts';
//import Order from './packages/components/order/Order';
import CheckoutForm from './packages/components/order/CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

function App() {

  const stripePromise = loadStripe('pk_test_51PM7IURt9qH63hXyPfvg4fJH8GRCnncjV46bxAObM8JFlQQTd40BWm6d2bpcM6ryOQYOXURkssOorYUGjUX5lcf7008OrOeAYe');
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/start" element={<Start />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/searched/:brand" element={<SearchedProducts />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/manager" element={<Manager />} />
        <Route path="/viewCustomers" element={<AllCustomers />} />
        <Route path="/viewProducts" element={<AllProducts />} />
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path="/addReview/:productId" element={<AddReview />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/viewManagers" element={<AllManagers />} />
        <Route path="/addManager" element={<AddManager />} />
        <Route path="/order" element={
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        } />
      </Routes>
    </Router>
  );
}

export default App;
