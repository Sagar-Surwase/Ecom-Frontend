import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./Components/Layout";
import Home from "./Components/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Product from "./Components/Product";
import SingleProducts from "./Components/SingleProducts";
import Order from "./Components/Order";
import Navbar from "./Components/Navbar";
import Checkout from "./Components/Checkout";
import OrderSuccess from "./Components/OrderSuccess";


function App() {
  return (
    <BrowserRouter>
      <Navbar/>

      <Routes>

        {/* Layout Wrapper */}
        <Route path="/" element={<Layout />}/>
          
          {/* Pages inside Layout */}
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="products/category/:category" element={<Product />} />
          <Route path="product/getSingleLaptop/:id" element={<SingleProducts />}/>
          <Route path="/orders" element={<Order />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />}
/>
          
      </Routes>
    </BrowserRouter> 
  );
}

export default App;