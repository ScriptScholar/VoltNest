import React, { useEffect, useState } from 'react'
import { data, useLocation, useNavigate } from 'react-router-dom';
import apiHelper from '../../Common/ApiHelper';
import EditNoteIcon from '@mui/icons-material/EditNote';
import Path from '../../Common/Path';
import Loader from '../../Components/Loader';
import OrderSuccessLoader from '../../Components/OrderSuccessLoader';

export default function CheckoutScreen({ CartItems, UserInfo, CartTotalDetails, fetchUserCart, fetchUserOrders }) {
  const [loding, setloding] = useState(false)
  const [extraLoader, setExtraLoader] = useState(false);
  const navigate = useNavigate()
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const ProductId = searchParams.get("product");
  const AddressId = searchParams.get("address");
  const PaymentMethod = searchParams.get("payment");
  const [Product, setProduct] = useState([])

  async function getProduct() {
    try {
      setloding(true)
      const result = await apiHelper.getProductById(ProductId)
      setloding(false)
      setProduct(result.data.data)
    } catch (error) {
      setloding(false)
      console.log(error);
    }
  }

  useEffect(() => {
    if (ProductId) {
      getProduct()
    }
  }, [])


  const [Address, setAddress] = useState({})

  async function getAddress() {
    try {
      const result = await apiHelper.getAddressById(AddressId)
      setAddress(result.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (AddressId) {
      getAddress()
    }
    // eslint-disable-next-line
  }, [])

  async function handlePayment(orderDetails) {
    try {
      setloding(true)
      const option = {
        key: orderDetails.razorpayDetails.key_id,
        amount: orderDetails.razorpayDetails.amount,
        currency: orderDetails.razorpayDetails.currency,
        name: "VoltNest",
        description: "Buy Smarter",
        order_id: orderDetails.razorpayDetails.id,
        handler: async (response) => {
          try {
            setloding(true)
            await apiHelper.verifyPayment({ ...response, orderId: orderDetails._id })
            setloding(false)
            navigate("/order/" + orderDetails?._id)
          } catch (error) {
            setloding(false)
            console.log(error)
          }
        },
        prefill: {
          name: UserInfo.fullName,
          email: UserInfo.email,
          contact: UserInfo.phone
        },
        theme: {
          color: "#3e2723"
        }
      }
      const rzp = new window.Razorpay(option)
      rzp.open()
      fetchUserOrders(UserInfo?._id)
    } catch (error) {
      console.log(error)
    }
  }

  async function placeOrder() {
    try {
      setloding(true)
      const products = (CartItems?.length > 0)
        ? CartItems.map((item) => ({
          id: item?.productId?._id,
          qty: item.qty
        }))
        : [{
          id: ProductId,
          qty: 1
        }];

      const totalPrice = CartTotalDetails?.productPrice || Product?.price?.sale;

      const totalDiscount = Math.floor(CartTotalDetails?.totalDiscount || Math.floor((Product?.price?.sale * Product?.discount?.percentage) / 100))

      const data = {
        userId: UserInfo?._id,
        addressId: AddressId,
        paymentMethod: PaymentMethod,
        products,
        totalPrice,
        totalDiscount
      };
      const result = await apiHelper.createOrder(data)
      setloding(false)
      if (result.status === 200) {
        if (PaymentMethod === "COD") {
          setExtraLoader(true); // Show loader component

          setTimeout(() => {
            navigate("/order/" + result.data.data?._id);
            setExtraLoader(false);
          }, 4000);
          fetchUserOrders(UserInfo?._id)
        } else {
          handlePayment(result.data.data)
        }
        if (CartItems.length > 0) {
          await apiHelper.emptyUserCart(UserInfo?._id)
        }
        fetchUserCart(UserInfo?._id)
      }
    } catch (error) {
      setloding(false)
      console.log(error)
    }
  }

  return (
    < div className='CheckoutScreen'>
      <Loader loading={loding} />
      <div className="container my-3">
        <div className="h4 text_main">Confirm Your Details</div>
        <div className="row">
          <div className="col-12 col-md-7">
            {
              CartItems.length > 0 ? CartItems?.map((data) => {
                return <div className="card my-2 p-3">
                  <div className="row d-flex align-items-center">
                    <div className="col-5 col-md-3">
                      <div className="text-center">
                        <img className='img-fluid' src={data.url + data.productId?.image?.path} alt="" />
                      </div>
                    </div>
                    <div className="col-1">
                      <div className="line"></div>
                    </div>
                    <div className="col-5 col-md-7">
                      <div className="h5">{data?.productId?.title}</div>
                      <div className="h4 text-success my-2">₹ {data?.productId?.price?.sale}</div>
                      <div className="h5 text-primary my-2">Quantity : {data?.qty}</div>
                    </div>
                  </div>
                </div>
              }) :
                < div className="card my-2 p-3" >
                  <div className="row d-flex align-items-center">
                    <div className="col-5 col-md-3">
                      <div className="text-center">
                        <img className='img-fluid' src={Product?.url} alt="" />
                      </div>
                    </div>
                    <div className="col-1">
                      <div className="line"></div>
                    </div>
                    <div className="col-5 col-md-7">
                      <div className="h5">{Product?.title}</div>
                      <div className="h4 text-success my-2">₹ {Product?.price?.sale}</div>
                      <div className="h5 text-primary my-2">Quantity : {"1"}</div>
                    </div>
                  </div>
                </div>
            }
          </div>
          <div className="col-12 col-md-5 mt-2">
            <div className="card p-3 mb-2">
              <div className="h4 text_main">Product Details</div>
              <hr />
              <div>
                <div className="d-flex justify-content-between">
                  <div>Product Prices : </div>
                  <div>₹ {CartTotalDetails?.productPrice || Product?.price?.sale}</div>
                </div>
                <div className="d-flex justify-content-between">
                  <div>Total Item : </div>
                  <div>{CartTotalDetails?.totalItem || 1}</div>
                </div>
                <div className="d-flex justify-content-between">
                  <div>Total Discount : </div>
                  <div>₹ {Math.floor(CartTotalDetails?.totalDiscount || (Product?.price?.sale * Product?.discount?.percentage) / 100)}</div>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <div>Total Price : </div>
                  <div>₹ {Math.floor(CartTotalDetails?.totalPrice || (Product?.price?.sale - (Product?.price?.sale * Product?.discount?.percentage) / 100))}</div>
                </div>

              </div>
            </div>
            <div className="card p-3 my-2">
              <div className="h4 text_main">Address Details</div>
              <hr />
              <div>
                <div> {Address?.address}{Address?.area},</div>
                <div>{Address?.city},</div>
                <div> {Address?.state} - {Address?.pincode}</div>
              </div>
            </div>

            <div className="card p-3 my-2">
              Payment Method : {PaymentMethod === "Online" ? " Net & Mobile Banking / UPI / Credit Card" : "Cash On Delivery"}
            </div>
            <>
              {extraLoader && <OrderSuccessLoader />}

              <div className="my-3">
                <div onClick={placeOrder} className="btn btn_main w-100">
                  Place Order
                </div>
              </div>
            </>

            <div className="my-3">
              <div onClick={() => {
                if (ProductId) {
                  navigate("/product/" + ProductId)
                } else {
                  navigate(Path.cart)
                }
              }} style={{ cursor: "pointer" }}>
                <EditNoteIcon /> Add / Remove / Edit any details
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}
