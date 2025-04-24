import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import apiHelper from '../../Common/ApiHelper'
import StarIcon from '@mui/icons-material/Star';
import Path from '../../Common/Path';
import ClearIcon from '@mui/icons-material/Clear';
import TuneIcon from '@mui/icons-material/Tune';
import Loader from '../../Components/Loader';

export default function ProductCategoryScreen() {
    const [loding, setloding] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const [Products, setProducts] = useState([])
    const [category, setcategory] = useState(location.pathname?.split("/")[2])
    const [subCategory, setsubCategory] = useState(location.pathname?.split("/")[3])
    const [open, setopen] = useState(true)
    const [width, setwidth] = useState(window.innerWidth)

    useEffect(() => {
        const handleResize = () => {
            setwidth(window.innerWidth);
            if (window.innerWidth > 768) {
                setopen(true);  // always open on desktop
            } else {
                setopen(false); // initially closed on mobile
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // set initial value

        return () => window.removeEventListener("resize", handleResize);
    }, []);



    async function getProducts(category, subCategory) {
        try {
            setloding(true)
            const data = {
                category: category,
                subcategory: subCategory
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
        let category = location.pathname?.split("/")[2]
        let subCategory = location.pathname?.split("/")[3]
        setcategory(category)
        setsubCategory(subCategory)
        getProducts(category, subCategory)
    }, [location.pathname])

    function removeSubCategory() {
        setsubCategory("")
        navigate("/category/" + category)
    }

    function removeCategory() {
        setcategory("")
        setsubCategory("")
        navigate("/category")
    }

    useEffect(() => {
        if (width < 768) {
            setopen(false)
        }
        // eslint-disable-next-line
    }, [location.pathname])

    return (
        <div className='ProductCategoryScreen'>
            <Loader loading={loding} />
            <div className="d-flex">
                {
                    open && <div className="col-md-2 col-4">
                        <div className="shadow category_slider p-3" style={{ overflowY: "scroll", scrollbarWidth: "none", msOverflowStyle: "none", }}>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="btn btn-lg"><TuneIcon /> Filter</div>
                                <div onClick={() => setopen(false)} className="close d-inline d-md-none"><ClearIcon /></div>
                            </div>
                            <hr className='m-1' />
                            <div onClick={() => navigate(Path.mobile)} className="h5 mt-3">Mobile</div>
                            <div className="ul">
                                <li onClick={() => navigate(Path.iphone)} className='btn w-100 text-start'>iPhone</li>
                                <li onClick={() => navigate(Path.samsung)} className='btn w-100 text-start'>Samsung</li>
                                <li onClick={() => navigate(Path.vivo)} className='btn w-100 text-start'>Vivo</li>
                                <li onClick={() => navigate(Path.realme)} className='btn w-100 text-start'>Realme</li>
                                <li onClick={() => navigate(Path.mi)} className='btn w-100 text-start'>Redmi</li>
                            </div>
                            <hr className='m-1' />
                            <div onClick={() => navigate(Path.laptop)} className="h5 mt-3">Laptop</div>
                            <div className="ul">
                                <li onClick={() => navigate(Path.dell)} className='btn w-100 text-start'>Dell</li>
                                <li onClick={() => navigate(Path.hp)} className='btn w-100 text-start'>Hp</li>
                                <li onClick={() => navigate(Path.asus)} className='btn w-100 text-start'>Asus</li>
                            </div>
                            <hr className='m-1' />
                            <div onClick={() => navigate(Path.audio)} className="h5 mt-3">Audio</div>
                            <div className="ul">
                                <li onClick={() => navigate(Path.headphone)} className='btn w-100 text-start'>Head Phone</li>
                                <li onClick={() => navigate(Path.airbuds)} className='btn w-100 text-start'>Airbuds</li>
                                <li onClick={() => navigate(Path.wired)} className='btn w-100 text-start'>Wired EarPhone</li>
                            </div>
                            <hr className='m-1' />
                            <div onClick={() => navigate(Path.teblet)} className="h5 mt-3">Tablet</div>
                            <div onClick={() => navigate(Path.tv)} className="h5 mt-3">Television</div>
                            <div onClick={() => navigate(Path.speaker)} className="h5 mt-3">Speaker</div>
                            <div onClick={() => navigate(Path.smartwatch)} className="h5 mt-3">Smart Watches</div>
                        </div>
                    </div>
                }
                <div className="col-12 col-md-10">
                    <div className="container my-3">
                        {
                            category === "mobile"
                                ? <div>
                                    <div className="row d-flex justify-content-center">
                                        <div className="col-4 col-md-1 my-2">
                                            <div onClick={() => navigate(Path.realme)} className="d-flex h-100 btn px-2" style={{ overflow: "hidden", borderRadius: "50%" }}>
                                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3qA2q06CGBiyE0j7cCg5lWlIRmENV_p6P7Q&s" alt="" width={"100%"} height={"100%"} />
                                            </div>
                                        </div>
                                        <div className="col-4 col-md-1 my-2">
                                            <div onClick={() => navigate(Path.mi)} className="d-flex h-100 btn px-2" style={{ overflow: "hidden", borderRadius: "50%" }}>
                                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Xiaomi_logo.svg/768px-Xiaomi_logo.svg.png" alt="" width={"100%"} height={"100%"} />
                                            </div>
                                        </div>
                                        <div className="col-4 col-md-1 my-2">
                                            <div onClick={() => navigate(Path.iphone)} className="d-flex h-100 btn px-2" style={{ overflow: "hidden", borderRadius: "50%" }}>
                                                <img src="https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8ed3d547-94ff-48e1-9f20-8c14a7030a02_2000x2000.jpeg" alt="" width={"100%"} height={"100%"} />
                                            </div>
                                        </div>
                                        <div className="col-4 col-md-1 my-2">
                                            <div onClick={() => navigate(Path.samsung)} className="d-flex h-100 btn px-2" style={{ overflow: "hidden", borderRadius: "50%" }}>
                                                <img src="https://static.vecteezy.com/system/resources/previews/020/927/451/non_2x/samsung-brand-logo-phone-symbol-name-white-design-south-korean-mobile-illustration-with-blue-background-free-vector.jpg" alt="" width={"100%"} height={"100%"} />
                                            </div>
                                        </div>
                                        <div className="col-4 col-md-1 my-2">
                                            <div onClick={() => navigate(Path.vivo)} className="d-flex h-100 btn px-2" style={{ overflow: "hidden", borderRadius: "50%" }}>
                                                <img src="https://cdn.iconscout.com/icon/free/png-256/free-vivo-icon-download-in-svg-png-gif-file-formats--brand-logo-world-logos-vol-2-pack-icons-282151.png" alt="" width={"100%"} height={"100%"} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                : category === "laptop"
                                    ? <div className='card shadow'>
                                        <div className="row d-flex justify-content-center">
                                            <div className="col-4 col-md-1 my-2">
                                                <div onClick={() => navigate(Path.dell)} className="d-flex h-100 btn px-2" style={{ overflow: "hidden", borderRadius: "50%" }}>
                                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqOngxYlx_QGy9SFByHTREtyiZVJrzeQUFrwHL_eGecOP0d3gTGB5iKBi3HeqF2F6u2jg&usqp=CAU" alt="" width={"100%"} height={"100%"} />
                                                </div>
                                            </div>
                                            <div className="col-4 col-md-1 my-2">
                                                <div onClick={() => navigate(Path.hp)} className="d-flex h-100 btn px-2" style={{ overflow: "hidden", borderRadius: "50%" }}>
                                                    <img src="https://static.vecteezy.com/system/resources/previews/020/190/678/non_2x/hp-logo-hp-icon-free-free-vector.jpg" alt="" width={"100%"} height={"100%"} />
                                                </div>
                                            </div>
                                            <div className="col-4 col-md-1 my-2">
                                                <div onClick={() => navigate(Path.asus)} className="d-flex h-100 btn px-2" style={{ overflow: "hidden", borderRadius: "50%" }}>
                                                    <img src="https://cdn-icons-png.freepik.com/512/5969/5969050.png" alt="" width={"100%"} height={"100%"} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    : ""
                        }
                        <div className="d-flex justify-content-between flex-column flex-md-row">
                            <div className="h4 text_main d-flex flex-column flex-md-row">{width <= 768 && (
                                <div className="btn btn-outline-secondary m-2 d-md-none" onClick={() => setopen(true)}>
                                    <TuneIcon /> Filter
                                </div>
                            )} <div className='my-3'>Feture Products of <span className='fw-bold text-success'>{subCategory ? subCategory : category}</span></div></div>
                            <div className="d-flex gap-2">
                                {
                                    category && <div onClick={removeCategory} className="btn btn-warning h-50"><ClearIcon /> {category}</div>
                                } {
                                    subCategory && <div onClick={removeSubCategory} className="btn btn-success h-50"><ClearIcon /> {subCategory}</div>
                                }
                            </div>
                        </div>
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
            </div>
        </div>
    )
}
