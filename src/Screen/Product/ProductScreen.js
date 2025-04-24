import React, { useEffect, useState } from 'react'
import apiHelper from '../../Common/ApiHelper'
import { Link, useNavigate, useParams } from 'react-router-dom'
import StarIcon from '@mui/icons-material/Star';
import Path from '../../Common/Path';
import Slider from 'react-slick';
import Loader from '../../Components/Loader';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
        {
            breakpoint: 992, // md
            settings: {
                slidesToShow: 3,
            },
        },
        {
            breakpoint: 768, // sm
            settings: {
                slidesToShow: 3,
            },
        },
        {
            breakpoint: 576, // xs
            settings: {
                slidesToShow: 2,
            },
        },
    ],
};

export default function ProductScreen({ UserInfo, fetchUserCart, CartItems }) {
    const [loding, setloding] = useState(false)
    const navigate = useNavigate()
    const { id } = useParams()
    const [Products, setProducts] = useState([])
    const [RelatedProduct, setRelatedProduct] = useState([])

    async function getProducts() {
        try {
            setloding(true)
            const result = await apiHelper.getProductById(id)
            setProducts(result.data.data)
            const data = {
                category: result.data.data?.category?.alias?.split("_")[0],
                subcategory: result.data.data?.category?.alias?.split("_")[2],
            }
            const products = await apiHelper.filteredProduct(data)
            setloding(false)
            setRelatedProduct(products.data.data)
        } catch (error) {
            setloding(false)
            console.log(error)
        }
    }

    useEffect(() => {
        getProducts()
        // eslint-disable-next-line
    }, [id])

    async function addToCart() {
        try {
            setloding(true)
            if (!UserInfo?._id) return navigate(Path.login)
            const data = {
                userId: UserInfo?._id,
                productId: id,
                qty: 1
            }
            const result = await apiHelper.addToCart(data)
            setloding(false)
            if (result.status === 200) {
                fetchUserCart(UserInfo?._id)
            }
        } catch (error) {
            setloding(false)
            console.log(error)
        }
    }

    const index = CartItems.findIndex((item) => item?.productId?._id === Products._id)

    function buyNowHandler() {
        return navigate(Path.address + "?productId=" + id)
    }

    return (
        <div className='ProductScreen'>
            <Loader loading={loding} />
            <div className="container my-0 my-md-3 pb-5">
                <div className="row d-flex align-items-start pb-4">
                    <div className="col-12 col-md-5">'
                        <div className="card">
                            <img src={Products.url} alt="" width={"100%"} />
                        </div>
                    </div>
                    <div className="col-12 col-md-7 mt-0 mt-md-3">
                        <div className="card p-3 my-2">
                            <div className="h2">{Products.title}</div>
                            <div className="d-flex gap-3 align-items-end">
                                <div className="text-success h4">₹ {Products.price?.sale}</div>
                                <div className="text-danger h6"> <del>₹ {Products.price?.mrp}</del></div>
                            </div>
                            <div className="text-primary h6"><span className='h5'>{Products.discount?.percentage}</span>% OFF</div>
                            <div className="text-muted">{Products.discount?.label}</div>
                        </div>
                        <div className="card p-3 my-2">
                            <div style={{ backgroundColor: 'transparent', color: '#198754', borderColor: '#198754', width: "80px" }} className="btn"><StarIcon /> {Products?.rating}</div>
                            <div className="d-flex gap-1 align-items-center">
                                <div className="">{Products?.numReview} </div>
                                <div className="text-muted my-1">Trusted users Reviews</div>
                            </div>
                        </div>
                        <div className="card my-2 p-3">
                            <div className="fs-4">{Products.content}</div>
                            {
                                Products && Products.Highlight?.map((item, index) => {
                                    return <div key={index} className="fs-5">
                                        {item}
                                    </div>
                                })
                            }
                        </div>
                        <div className="d-none d-md-flex gap-3 mt-3">
                            <button onClick={() => {
                                if (index >= 0) {
                                    navigate(Path.cart)
                                } else {
                                    addToCart()
                                }
                            }} className="btn btn_outline w-50">{index >= 0 ? " Go To Cart" : "Add To Cart"}</button>
                            <button onClick={buyNowHandler} className="btn btn_main w-50">Buy Now</button>
                        </div>
                        <div className="d-md-none fixed-bottom bg-white p-3 border-top d-flex gap-3">
                            <button onClick={() => {
                                if (index >= 0) {
                                    navigate(Path.cart)
                                } else {
                                    addToCart()
                                }
                            }} className="btn btn_outline w-50">{index >= 0 ? " Go To Cart" : "Add To Cart"}</button>
                            <button onClick={buyNowHandler} className="btn btn_main w-50">Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container my-4">
                <div className="text_main h4">Related Products</div>
                <div style={{ overflow: "hidden" }} className="custom-slider">
                    <Slider {...settings} >
                        {RelatedProduct.map((data, index) => (
                            <div key={data._id} onClick={() => navigate("/product/" + data._id)}
                                style={{ cursor: 'pointer' }} className='px-2'>
                                <Link to={"/product/" + data._id} className="card p-2 h-100 shadow">
                                    <div className="card_img d-flex align-items-center justify-content-center">
                                        <img className='img-fluid' src={data.url + data.image.path} alt="" width={"70%"} />
                                    </div>
                                    <div className="card_content p-3">
                                        <div className="h5" style={{ textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>{data.title}</div>
                                        <div className="h4">₹ {data.price.sale}</div>
                                        <div className="d-flex flex-column flex-md-row align-items-center gap-3">
                                            <div className="btn btn-success"><StarIcon /> {data.rating}</div>
                                            <div className="text-muted">{data.numReview}</div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    )
}
