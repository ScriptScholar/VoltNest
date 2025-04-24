import { Alert, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Snackbar, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import Path from '../../Common/Path';
import apiHelper from '../../Common/ApiHelper';
import Loader from '../../Components/Loader';

export default function RegisterScreen({ setAuth }) {
    const [loding, setloding] = useState(false)
    const [open, setOpen] = React.useState(false);
    const [Error, setError] = React.useState("");

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const navigate = useNavigate()
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    const [userDetails, setuserDetails] = useState({
        fullName: "",
        email: "",
        phone: "",
        password: ""
    })

    async function userHandler() {
        try {
            setloding(true)
            const data = {
                ...userDetails
            }
            if (!data.fullName || !data.phone || !data.email || !data.password) {
                setError("Required Filed Empty")
                setOpen(true)
                return
            }
            const result = await apiHelper.registerUser(data)
            setloding(false)
            if (result.status === 200) {
                localStorage.setItem("token", result.data.token)
                setAuth(result.data.token)
                navigate(Path.home)
            } else {
                setError(result.data.message)
                setOpen(false)
                return
            }
        } catch (error) {
            setloding(true)
            console.log(error)
        }
    }

    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate(Path.home)
        }
        // eslint-disable-next-line
    }, [])

    return (
        <div className='RegisterScreen' style={{ backgroundColor: "whitesmoke", minHeight: "88vh" }}>
            < Loader loading={loding} />
            <div className="container pt-4">
                <div className="d-flex row justify-content-center">
                    <div className="col-12 col-md-7">
                        <div className="card  shadow p-2">
                            <div className="h4">Register Your Details</div>
                            <div className="row">
                                <div className="col-12 my-2">
                                    <TextField value={userDetails.fullName} onChange={(e) => setuserDetails({ ...userDetails, fullName: e.target.value })} fullWidth id="fullName" label="Enter Your Full Name" variant="outlined" />
                                </div>
                                <div className="col-12 my-2">
                                    <TextField value={userDetails.email} onChange={(e) => setuserDetails({ ...userDetails, email: e.target.value })} fullWidth id="email" label="Enter Your Email Address" variant="outlined" />
                                </div>
                                <div className="col-12 my-2">
                                    <TextField value={userDetails.phone} onChange={(e) => setuserDetails({ ...userDetails, phone: e.target.value })} fullWidth id="phone" label="Enter Your Phone Number" variant="outlined" />
                                </div>
                                <div className="col-12 my-2">
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-password"
                                            type={showPassword ? 'text' : 'password'}
                                            value={userDetails.password}
                                            onChange={(e) => setuserDetails({ ...userDetails, password: e.target.value })}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label={
                                                            showPassword ? 'hide the password' : 'display the password'
                                                        }
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        onMouseUp={handleMouseUpPassword}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label="Password"
                                        />
                                    </FormControl>
                                </div>
                                <div className="col-12 my-2 text-center">
                                    <div onClick={userHandler} className="btn btn_main w-50">Register</div>
                                </div>
                                <div className="col-12 my-2 text-center">
                                    <div onClick={() => navigate(Path.login)} className="text_main">
                                        Have an Account? <span className="sign_in_hover">Sign in</span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {Error}
                </Alert>
            </Snackbar>
        </div>
    )
}
