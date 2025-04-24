import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Path from './Common/Path';
import HomeScreen from './Screen/Home/HomeScreen';
import ProductScreen from './Screen/Product/ProductScreen';
import LoginScreen from './Screen/User/LoginScreen';
import RegisterScreen from './Screen/User/RegisterScreen';
import CartScreen from './Screen/Cart/CartScreen';
import AddressScreen from './Screen/Address/AddressScreen';
import CheckoutScreen from './Screen/Checkout/CheckoutScreen';
import OrderScreen from './Screen/Order/OrderScreen';
import OrderListScreen from './Screen/Order/OrderListScreen';
import Header from './Components/Header';
import { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode"
import apiHelper from './Common/ApiHelper';
import ProductCategoryScreen from './Screen/Category/ProductCategoryScreen';
import Footer from './Components/Footer';
import ScrollToTop from './Components/ScrollToTop';
import ProfileScreen from './Screen/User/ProfileScreen';

function App() {
  const JWTDECODE = (arg) => {
    try {
      return jwtDecode(arg)
    } catch (error) {
      return null
    }
  }
  const [Auth, setAuth] = useState(localStorage.getItem("token"))
  const [UserInfo, setUserInfo] = useState(JWTDECODE(localStorage.getItem("token")))
  const [CartItems, setCartItems] = useState([])
  const [Orders, setOrders] = useState([])
  const [CartTotalDetails, setCartTotalDetails] = useState({
    totalPrice: "",
    productPrice: "",
    totalItem: "",
    totalDiscount: ""
  })

  useEffect(() => {
    if (Auth) {
      setUserInfo(JWTDECODE(Auth))
      fetchUserCart(UserInfo?._id)
      fetchUserOrders(UserInfo?._id)
    } else {
      if (localStorage.getItem("token")) {
        setAuth(localStorage.getItem("token"))
        setUserInfo(jwtDecode(localStorage.getItem("token")))
      }
      setUserInfo(null)
    }
    // eslint-disable-next-line
  }, [Auth])

  async function fetchUserCart(id) {
    try {
      const result = await apiHelper.listCart(id)
      setCartItems(result.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  async function fetchUserOrders(id) {
    try {
      const result = await apiHelper.listOrder(id)
      setOrders(result.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (CartItems) {
      let productPrice = 0
      let totalItem = 0
      let totalDiscount = 0

      for (let i = 0; i < CartItems.length; i++) {
        let subTotal = CartItems[i]?.productId?.price?.sale * CartItems[i]?.qty
        let subDiscount = (CartItems[i].productId?.price.sale * CartItems[i].productId?.discount?.percentage * CartItems[i]?.qty) / 100
        productPrice += subTotal
        totalItem += CartItems[i]?.qty
        totalDiscount += subDiscount
      }

      setCartTotalDetails({
        totalDiscount: totalDiscount,
        totalItem: totalItem,
        productPrice: productPrice,
        totalPrice: productPrice - totalDiscount
      })
    }
  }, [CartItems])

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header setAuth={setAuth} UserInfo={UserInfo} setCartItems={setCartItems} CartItems={CartItems} Orders={Orders} />
      <main style={{ paddingTop: "70px", paddingBottom: "50px" }}>
        <Routes>
          <Route path={Path.home} element={<HomeScreen />} />
          <Route path={Path.category} element={<ProductCategoryScreen />} />
          <Route path={Path.product} element={<ProductScreen UserInfo={UserInfo} fetchUserCart={fetchUserCart} CartItems={CartItems} />} />
          <Route path={Path.profile} element={<ProfileScreen setAuth={setAuth} UserInfo={UserInfo} Orders={Orders} setCartItems={setCartItems} />} />
          <Route path={Path.login} element={<LoginScreen setAuth={setAuth} />} />
          <Route path={Path.register} element={<RegisterScreen setAuth={setAuth} />} />
          <Route path={Path.cart} element={<CartScreen UserInfo={UserInfo} CartItems={CartItems} fetchUserCart={fetchUserCart} CartTotalDetails={CartTotalDetails} />} />
          <Route path={Path.address} element={<AddressScreen CartTotalDetails={CartTotalDetails} UserInfo={UserInfo} CartItems={CartItems} />} />
          <Route path={Path.checkout} element={<CheckoutScreen fetchUserOrders={fetchUserOrders} UserInfo={UserInfo} CartItems={CartItems} fetchUserCart={fetchUserCart} CartTotalDetails={CartTotalDetails} />} />
          <Route path={Path.order} element={<OrderScreen UserInfo={UserInfo} />} />
          <Route path={Path.orderlist} element={<OrderListScreen Orders={Orders} UserInfo={UserInfo} fetchUserOrders={fetchUserOrders} />} />
        </Routes>
      </main>
      <Footer CartItems={CartItems} UserInfo={UserInfo} />
    </BrowserRouter>
  );
}

export default App;
