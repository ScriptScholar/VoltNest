import { TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import apiHelper from '../../Common/ApiHelper'
import Loader from '../../Components/Loader'

export default function AddressScreen({ CartTotalDetails, UserInfo, CartItems }) {
  const [loding, setloding] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const productId = location.search?.split("?productId=")[1]
  const [Product, setProduct] = useState([])

  async function getProduct() {
    try {
      setloding(true)
      const result = await apiHelper.getProductById(productId)
      setloding(false)
      setProduct(result.data.data)
    } catch (error) {
      setloding(false)
      console.log(error);
    }
  }

  useEffect(() => {
    if (productId) {
      getProduct()
    }
  }, [])



  const [Address, setAddress] = useState([])
  const [open, setopen] = useState(false)
  const [addressDetails, setaddressDetails] = useState({
    block: "",
    landmark: "",
    area: "",
    city: "",
    state: "",
    pincode: ""
  })

  async function getAddress() {
    try {
      setloding(true)
      const result = await apiHelper.listAddress(UserInfo?._id)
      setloding(false)
      setAddress(result.data.data)
    } catch (error) {
      setloding(false)
      console.log(error);
    }
  }


  async function addAddress() {
    try {
      setloding(true)
      const data = {
        userId: UserInfo?._id,
        // eslint-disable-next-line
        address: addressDetails?.block + "," + " " + addressDetails.landmark + ",",
        area: addressDetails.area,
        city: addressDetails.city,
        state: addressDetails.state,
        pincode: addressDetails.pincode,
      }
      const result = await apiHelper.createAddress(data)
      setloding(false)
      if (result.status === 200) {
        getAddress()
        setopen(false)
      }
    } catch (error) {
      setloding(false)
      console.log(error)
    }
  }


  useEffect(() => {
    getAddress()
    // eslint-disable-next-line
  }, [])

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  function clickToContinue() {
    if (selectedAddress && selectedPaymentMethod) {
      const url = productId
        ? `/checkout?address=${selectedAddress}&payment=${selectedPaymentMethod}&product=${productId}`
        : `/checkout?address=${selectedAddress}&payment=${selectedPaymentMethod}`;
      navigate(url);
    }
  }


  return (
    <div className='AddressScreen'>
      <Loader loading={loding} />
      <div className="container my-3">
        <div className="row">
          <div className="col-12 col-md-7 my-2">
            {
              Address && !open && Address.length > 0 ? <div>
                <div className="h4 text_main">Select Your Address</div>
                {
                  Address?.map((data) => {
                    return <label key={data?._id} style={selectedAddress === data._id ? { border: "2px solid #3e2723", boxShadow: "2px 2px 8px rgba(62, 39, 35, 0.4)" } : {}} className="card p-3 my-3">
                      <div className="d-flex gap-2">
                        <input onChange={() => setSelectedAddress(data._id)} type="radio" name="address" id="" />
                        <div>
                          <div>{data.address}{data.area},</div>
                          <div>{data.city},</div>
                          <div> {data.state} - {data.pincode}</div>
                        </div>
                      </div>
                    </label>
                  })
                }
                <div onClick={() => setopen(true)} className="text-center btn w-100">+ Add new Address</div>
              </div>
                : <div className="card p-2">
                  <div className="h4 text_main">Add Your Address</div>
                  <div className="row">
                    <div className="col-12">
                      < TextField
                        fullWidth
                        margin='dense'
                        id='block'
                        name='block'
                        type='text'
                        label="Enter Block / House No. / Home Title"
                        onChange={(e) => setaddressDetails({ ...addressDetails, block: e.target.value })}
                        value={addressDetails.block}
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      < TextField
                        fullWidth
                        margin='dense'
                        id='landmark'
                        name='landmark'
                        type='text'
                        label="Building Name / Landmark"
                        onChange={(e) => setaddressDetails({ ...addressDetails, landmark: e.target.value })}
                        value={addressDetails.landmark}
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      < TextField
                        fullWidth
                        margin='dense'
                        id='area'
                        name='area'
                        type='text'
                        label="Area"
                        onChange={(e) => setaddressDetails({ ...addressDetails, area: e.target.value })}
                        value={addressDetails.area}
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      < TextField
                        fullWidth
                        margin='dense'
                        id='city'
                        name='city'
                        type='text'
                        label="City"
                        onChange={(e) => setaddressDetails({ ...addressDetails, city: e.target.value })}
                        value={addressDetails.city}
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      < TextField
                        fullWidth
                        margin='dense'
                        id='state'
                        name='state'
                        type='text'
                        label="State"
                        onChange={(e) => setaddressDetails({ ...addressDetails, state: e.target.value })}
                        value={addressDetails.state}
                      />
                    </div>
                    <div className="col-12">
                      < TextField
                        fullWidth
                        margin='dense'
                        id='pincode'
                        name='pincode'
                        type='text'
                        label="Pincode"
                        onChange={(e) => setaddressDetails({ ...addressDetails, pincode: e.target.value })}
                        value={addressDetails.pincode}
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <div onClick={() => setopen(false)} className="btn btn_outline my-1">Preview</div>
                    <div onClick={addAddress} className="btn btn_main my-1">Publish</div>

                  </div>
                </div>
            }
          </div>
          <div className="col-12 col-md-5 my-2">
            <div className="card p-3 mb-3">
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
            <div className="card p-3 my-3">
              <div className="h4 text_main">Select Payment Method</div>
              <hr />
              <div className="row">
                <div className="col-12 d-flex gap-2 btn">
                  <input type="radio" id='cod' name='payment' onChange={() => setSelectedPaymentMethod("COD")} />
                  <label htmlFor="cod">
                    Cash On Delivery
                  </label>
                </div>
                <div className="col-12 col-md-6 w-100 d-flex gap-2 btn">
                  <input type="radio" id='online' name='payment' onChange={() => setSelectedPaymentMethod("Online")} />
                  <label className='' htmlFor="online">
                    Net & Mobile Banking / UPI / Credit Card
                  </label>
                </div>
                <hr className='m-3' />
                <div className="text-center">
                  <div onClick={clickToContinue} className="btn btn_main w-50">Continue</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
