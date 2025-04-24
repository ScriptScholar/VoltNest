import React, { useEffect, useState } from 'react'
import apiHelper from '../../Common/ApiHelper'
import { Link, useNavigate } from 'react-router-dom'
import StarIcon from '@mui/icons-material/Star';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Path from '../../Common/Path';
import Loader from '../../Components/Loader';


const images = [
    "https://images.unsplash.com/photo-1567581935884-3349723552ca?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3BlYWtlcnxlbnwwfDB8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aGVhZHBob25lfGVufDB8MHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1696688713460-de12ac76ebc6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c21hcnR3YXRjaGVzfGVufDB8MHwwfHx8MA%3D%3D",
];

const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
        {
            breakpoint: 768, // below 768px
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 1024, // below 1024px
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
    ],
};

export default function HomeScreen() {
    const navigate = useNavigate()
    const [loding, setloding] = useState(false)
    const [Products, setProducts] = useState([])

    async function getProducts() {
        try {
            setloding(true)
            const data = {
                itemType: "main"
            }
            const result = await apiHelper.filteredProduct(data)
            setloding(false)
            setProducts(result.data.data)
        } catch (error) {
            setloding(false)
            console.log(error)
        }
    }

    useEffect(() => {
        getProducts()
    }, [])


    return (
        <div className='HomeScreen'>
            <Loader loading={loding} />
            <div style={{ overflow: "hidden" }} className="custom-slider">
                <Slider {...settings}>
                    {images.map((img, index) => (
                        <div key={index}>
                            <img
                                src={img}
                                alt={`slide-${index}`}
                                className="img-fluid slider-image"
                                style={{ width: "100%" }}
                            />
                        </div>
                    ))}
                </Slider>
            </div>
            <div className="container my-3">
                <div className="h4 text_main">Top Category</div>
                <div className="row">
                    <div className="col-6 col-md-3 my-2">
                        <div onClick={() => navigate(Path.mobile)} className="category_wrapper">
                            <div className="flex category_img">
                                <img src="https://images.unsplash.com/photo-1509395062183-67c5ad6faff9?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" width={"100%"} />
                            </div>
                            <div className="category_back"></div>
                            <div className="category_content">
                                <div className="h5">Mobile</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 col-md-3 my-2">
                        <div onClick={() => navigate(Path.laptop)} className="category_wrapper">
                            <div className="flex category_img">
                                <img src="https://images.unsplash.com/photo-1493020258366-be3ead1b3027?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" width={"100%"} />
                            </div>
                            <div className="category_back"></div>
                            <div className="category_content">
                                <div className="h5">Laptop</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 col-md-3 my-2">
                        <div onClick={() => navigate(Path.headphone)} className="category_wrapper">
                            <div className="flex category_img">
                                <img src="https://images.unsplash.com/photo-1648578964839-0a07fc2774aa?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" width={"100%"} />
                            </div>
                            <div className="category_back"></div>
                            <div className="category_content">
                                <div className="h5">Head Phone</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 col-md-3 my-2">
                        <div onClick={() => navigate(Path.speaker)} className="category_wrapper">
                            <div className="flex category_img">
                                <img src="https://images.unsplash.com/photo-1692351014024-97edd83a7b5a?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" width={"100%"} />
                            </div>
                            <div className="category_back"></div>
                            <div className="category_content">
                                <div className="h5">Speaker</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container my-3">
                <div className="h4 text_main">Feture Products</div>
                <div className="row">
                    {
                        Products && Products.map((data) => {
                            return <div key={data._id} className='col-6 col-md-6 col-lg-3 my-2'>
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

                        })
                    }
                </div>
            </div>
        </div>
    )
}
