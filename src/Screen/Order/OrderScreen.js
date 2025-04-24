import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import apiHelper from '../../Common/ApiHelper'
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Path from '../../Common/Path';
import Loader from '../../Components/Loader';


export default function OrderScreen({ UserInfo }) {
  const [loding, setloding] = useState(false)
  const { id } = useParams()
  const navigate = useNavigate();
  const [Order, setOrder] = useState({})

  async function getOreder() {
    try {
      setloding(true)
      const result = await apiHelper.getOrderById(id)
      setloding(false)
      setOrder(result.data.data)
    } catch (error) {
      setloding(false)
      console.log(error)
    }
  }

  useEffect(() => {
    getOreder()
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(Path.home);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  let totalItem = 0
  for (let i = 0; i < Order?.products?.length; i++) {
    totalItem += Order.products[i].qty
  }

  function generateInvoicePDF() {
    const doc = new jsPDF();


    // Header
    doc.setFontSize(18);
    doc.setTextColor("#3e2723");
    doc.text("VolNest - Invoice", 14, 20);

    // User Info
    doc.setFontSize(12);
    doc.setTextColor("#000");
    doc.text(`Name: ${UserInfo.fullName}`, 14, 30);
    doc.text(`Email: ${UserInfo.email}`, 14, 36);
    doc.text(`Phone: ${UserInfo.phone}`, 14, 42);

    // Address
    doc.text("Delivery Address:", 14, 52);
    doc.text(`${Order?.addressId?.address}, ${Order?.addressId?.area}`, 14, 58);
    doc.text(`${Order?.addressId?.city}, ${Order?.addressId?.state} - ${Order?.addressId?.pincode}`, 14, 64);

    // Payment Info
    doc.text(`Payment Method: ${Order.paymentMethod}`, 14, 74);
    doc.text(`Payment Status: ${Order.paymentStatus}`, 14, 80);
    doc.text(`Delivery Date: ${Order.deliveryDate?.split("T")[0]}`, 14, 86);

    // Table
    const tableData = Order.products.map((p, i) => [
      i + 1,
      p.title,
      `₹ ${p.price.sale}`,
      `${p.discount.percentage}%`,
      `₹ ${p.price.sale - Math.floor((p.price.sale * p.discount.percentage) / 100)}`
    ]);

    const result = autoTable(doc, {
      head: [["No.", "Title", "Price", "Discount", "Total"]],
      body: tableData,
      startY: 90,
    });

    // Totals
    const finalY = result?.finalY || 100;
    doc.text(`Product Price: rupees ${Order.totalPrice}`, 16, finalY + 10);
    doc.text(`Discount: rupees ${Order.totalDiscount}`, 16, finalY + 20);
    doc.setFont("helvetica", "bold");
    doc.text(`Total: rupees ${Order.totalPrice - Order.totalDiscount}`, 16, finalY + 30);

    // Save PDF
    doc.save(`VolNest_Invoice_${Order._id}.pdf`);
  }

  return (
    <div className='OrderScreen'>
      <Loader loading={loding} />
      <div className="container my-3">
        <div className="h4 text_main">Your Order Details</div>
        <div className="row">
          <div className="col-12">
            <div className="order_border p-3">
              <div className="d-flex align-items-center  justify-content-between">
                <div className="h6"><span className='fw-bold'>Tracking Id :</span> <span className='text-success'>{Order?._id}</span></div>
                <div className='d-none d-md-inline'>
                  <button
                    className="btn btn_main"
                    onClick={generateInvoicePDF}
                  >
                    Download Invoice
                  </button>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-12 col-md-4 mb-3">
                  <div className="card p-3">
                    <div className="h6 text-primary">Delivery By : </div>
                    <div>{UserInfo.fullName}</div>
                    <div>{UserInfo.email}</div>
                    <div>{UserInfo.phone}</div>
                  </div>
                </div>
                <div className="col-12 col-md-4 mb-3">
                  <div className="card p-3">
                    <div className="h6 text-primary">Delivery Address : </div>
                    <div>{Order?.addressId?.address}</div>
                    <div>{Order?.addressId?.area}, {Order?.addressId?.city}</div>
                    <div>{Order?.addressId?.state} - {Order?.addressId?.pincode}</div>
                  </div>
                </div>
                <div className="col-12 col-md-4 mb-3">
                  <div className="card p-3">
                    <div className="h6 text-primary">Order / Delivery Info : </div>
                    <div className="d-flex gap-2 justify-content-between">
                      <span>Payment Method : </span><span className={Order?.paymentMethod === "COD" ? 'text-primary' : Order?.paymentMethod === "Online" ? "text-success" : "text-danger"}>{Order.paymentMethod === "COD" ? "Cash On Delivery" : "UPI / Online / Card"}</span>
                    </div>
                    <div className="d-flex gap-2 justify-content-between">
                      <span>Payment Status : </span><span className={Order?.paymentStatus === "Pending" ? 'text-warning' : Order?.paymentStatus === "Success" ? "text-success" : "text-danger"}>{Order.paymentStatus}</span>
                    </div>
                    <div className="d-flex gap-2 justify-content-between">
                      <span>Delivery Date : </span><span className='text-dark'>{Order.deliveryDate?.split("T")[0]}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="card p-3">
                    <div className="h6 text-primary">Product Details : </div>
                    <div className="table-responsive-wrapper" style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
                      <table className="table table-bordered" style={{ minWidth: "600px" }}>
                        <thead>
                          <tr>
                            <th>No.</th>
                            <th>Product Title</th>
                            <th>Product Price</th>
                            <th>Product Discount</th>
                            <th>Total Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            Order?.products?.map((data, index) => {
                              return <tr key={index}>
                                <td>{index + 1} .</td>
                                <td>{data?.title}</td>
                                <td>₹ {data?.price?.sale}</td>
                                <td>₹ {Math.floor((data?.price?.sale * data?.discount?.percentage) / 100)} ( {data?.discount?.percentage}% )</td>
                                <td>₹ {data?.price?.sale - Math.floor((data?.price?.sale * data?.discount?.percentage) / 100)}</td>
                              </tr>
                            })
                          }
                        </tbody>
                      </table>
                    </div>
                    <div className="d-flex justify-content-end my-2">
                      <div className="order_bill">
                        <div className="d-flex gap-2 justify-content-between">
                          <span>Product Price : </span><span className='text-primary'>₹ {Order.totalPrice}</span>
                        </div>
                        <div className="d-flex gap-2 justify-content-between">
                          <span> Product Discount : </span><span className='text-dark'> ₹ {Order.totalDiscount}</span>
                        </div>
                        <hr className='m-1' />
                        <div className="d-flex gap-2 justify-content-between">
                          <span> Total Price :</span> <span className='text-success'> ₹ {Order.totalPrice - Order.totalDiscount}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='d-block text-center d-md-none mt-3'>
                    <button
                      className="btn btn_main"
                      onClick={generateInvoicePDF}
                    >
                      Download Invoice
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
