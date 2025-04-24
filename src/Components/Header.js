import React, { useEffect, useRef, useState } from 'react'
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useLocation, useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/material';
import Path from '../Common/Path';

export default function Header({ UserInfo, setAuth, setCartItems, CartItems, Orders }) {
    const navigate = useNavigate();
    const location = useLocation();
    const profileRef = useRef(null);
    const [profileOpen, setprofileOpen] = useState(false)
    function profileToggle() {
        setprofileOpen(!profileOpen)
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setprofileOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setprofileOpen(false);
    }, [location.pathname]);


    return (
        <div className='Header shadow p-2 p-md-0'>
            <div className="mx-md-3 mx-1 d-flex align-items-center p-1 justify-content-between">
                <div className="head_logo">
                    <div style={{ cursor: "pointer" }} onClick={() => navigate(Path.home)} className="h2 text_main">VoltNest</div>
                </div>
                <div className="head_icons d-none d-md-block">
                    <div className="d-flex">
                        <div onClick={() => {
                            if (UserInfo?._id) {
                                navigate(Path.cart)
                            } else {
                                navigate(Path.login)
                            }
                        }} className='btn'>
                            <Badge badgeContent={CartItems?.length} className='badge_bg'>
                                <ShoppingCartIcon className='text_main' />
                            </Badge>
                            <div className="text-center text_main">Cart</div>
                        </div>
                        <div onClick={() => {
                            if (UserInfo?._id) {
                                navigate(Path.orderlist)
                            } else {
                                navigate(Path.login)
                            }
                        }} className='btn'>
                            <Badge badgeContent={Orders?.length} className='badge_bg'>
                                <ShoppingBagIcon className='text_main' />
                            </Badge>
                            <div className="text-center text_main">Order</div>
                        </div>
                        <div className="btn profile" ref={profileRef}>
                            <div onClick={profileToggle}>
                                <Avatar sx={{ bgcolor: '#3e2723', color: '#fff' }} alt={UserInfo?.fullName} src="/static/images/avatar/1.jpg" />
                            </div>
                            {
                                profileOpen && <div className="profile_modal shadow">
                                    <div className="p-2">
                                        <div className="text_main">Hello, Welcome</div>
                                        <div className="text_main">{UserInfo?._id ? UserInfo?.fullName : "Guest User"}</div>
                                        <hr className='m-0' />
                                        <div onClick={() => {
                                            if (UserInfo?._id) {
                                                localStorage.removeItem("token")
                                                setAuth(null)
                                                setCartItems([])
                                                navigate(Path.home)
                                            } else {
                                                navigate(Path.login)
                                            }
                                        }} className="btn btn_outline mt-2">{UserInfo?._id ? "Log out" : "Sing In"}</div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <hr className='m-0 p-0 d-none d-md-block' />
        </div>
    )
}
