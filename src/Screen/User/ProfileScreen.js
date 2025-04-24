import React, { useEffect, useState } from 'react'
import apiHelper from '../../Common/ApiHelper'
import { useNavigate } from 'react-router-dom'
import Path from '../../Common/Path'
import Loader from '../../Components/Loader'

export default function ProfileScreen({ UserInfo, setAuth, setCartItems }) {
    const [loding, setloding] = useState(false)
    const navigate = useNavigate()
    const [PendingOrder, setPendingOrder] = useState([])
    const [CompletedOrder, setCompletedOrder] = useState([])
    const [Score, setScore] = useState(null)

    async function getScore() {
        try {
            setloding(true)
            const result = await apiHelper.calculateUserScore(UserInfo?._id)
            setloding(false)
            setScore(result.data.data)
        } catch (error) {
            setloding(false)
            console.log(error)
        }
    }

    async function getPendingOrder() {
        try {
            setloding(true)
            const data = {
                userId: UserInfo?._id,
                orderStatus: "Pending"
            }
            const result = await apiHelper.listOrderByStatus(data)
            setloding(false)
            setPendingOrder(result.data.data)
        } catch (error) {
            setloding(false)
            console.log(error)
        }
    }
    async function getCopletedOrder() {
        try {
            setloding(true)
            const data = {
                userId: UserInfo?._id,
                orderStatus: "Completed"
            }
            const result = await apiHelper.listOrderByStatus(data)
            setloding(false)
            setCompletedOrder(result.data.data)
        } catch (error) {
            setloding(false)
            console.log(error)
        }
    }

    useEffect(() => {
        getPendingOrder()
        getCopletedOrder()
    }, [])

    useEffect(() => {
        if (UserInfo?._id) {
            getScore()
        }
    }, [])


    const getScoreCategory = (score) => {
        if (score <= 30) return { label: 'Weak', color: 'bg-danger' };
        if (score <= 40) return { label: 'Poor', color: 'bg-warning' };
        if (score <= 50) return { label: 'Fair', color: 'bg-info' };
        if (score <= 70) return { label: 'Good', color: 'bg-primary' };
        if (score <= 80) return { label: 'Super', color: 'bg-success' };
        if (score <= 90) return { label: 'Excellent', color: 'bg-success text-dark' };
        return { label: 'Outstanding', color: 'bg-success text-white' };
    };

    const { label, color } = getScoreCategory(Score?.score);
    return (
        <div className='ProfileScreen d-block d-md-none' style={{ height: "100vh", backgroundColor: "whitesmoke" }}>
            < Loader loading={loding} />
            <div className="container p-3 p-md-5">
                <div className="shadow card p-3 my-2">
                    {
                        UserInfo?._id ? <>
                            <div className="h4">{UserInfo.fullName}</div>
                            <div className="h5">{UserInfo.phone}</div>
                            <div className="h5">{UserInfo.email}</div>

                            <div className="my-3 text-center">
                                <div onClick={() => {
                                    if (UserInfo?._id) {
                                        localStorage.removeItem("token")
                                        setAuth(null)
                                        setCartItems([])
                                        navigate(Path.home)
                                    }
                                }} className="btn btn_main">Log out</div>
                            </div>
                        </> : <>
                            <div className="h4">Guest User</div>
                            <div className="h5">+XX XXXXX XXXXX</div>
                            <div className="h5">exampleXXX@gamil.com</div>

                            <div className="my-3 text-center">
                                <div onClick={() => navigate(Path.login)} className="btn btn_main">Sing In</div>
                            </div>
                        </>
                    }
                </div>
                <div className="shadow card p-3 my-2">
                    <div className="d-flex justify-content-between">
                        <div>Your Current Order : </div><div>{PendingOrder.length}</div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div>Your Completed Order : </div><div>{CompletedOrder.length}</div>
                    </div>
                </div>
                <div className="shadow card p-3 my-2">
                    <div className="text_main h4">
                        Your Shopping Score
                    </div>
                    <div className="h4">
                        <div className="container my-4">
                            {
                                UserInfo?._id ? <>
                                    <div className="card shadow p-4">
                                        <h4 className="text-center mb-3">Monthly Performance Score</h4>
                                        <div className="mb-2">
                                            <strong>Score:</strong> {Score?.score} / 100 — <span className="badge bg-secondary">{label}</span>
                                        </div>
                                        <div className="progress" style={{ height: '30px' }}>
                                            <div
                                                className={`progress-bar ${color}`}
                                                role="progressbar"
                                                style={{ width: `${Score?.score}%` }}
                                                aria-valuenow={Score?.score}
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                            >
                                                {Score?.score}%
                                            </div>
                                        </div>
                                    </div>
                                </> : <div onClick={() => navigate(Path.home)} className="btn btn_main">
                                    Sing In & Shopping Now
                                </div>
                            }
                        </div>
                    </div>
                    {/* <div className="h5">₹ {Score.totalAmount} <div className="text-muted">this month total Order Amount</div></div> */}
                    {/* <div className='h5'>{Score.month} / {Score.year}</div> */}
                </div>
            </div>
        </div>
    )
}
