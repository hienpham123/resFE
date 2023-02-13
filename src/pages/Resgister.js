import React, { useState } from "react";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import EmailIcon from '@mui/icons-material/Email';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import PersonIcon from '@mui/icons-material/Person';
import { Link, useNavigate } from "react-router-dom";
import { axiosAuth, axiosInstance } from '../utills/axios'
//component
import Item from '../components/Item'
import { Button } from "@mui/material";
import AlertSnackbars from "../components/AlertSnackBars";

function Register() {
    const navigate = useNavigate();
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    document.title = "Register"
    const [alert, setAlert] = useState(false)
    const register = () => {
        let name = document.getElementById('name-regist').value
        let email = document.getElementById('email-regist').value
        let pass = document.getElementById('pass-regist').value
        let cpass = document.getElementById('conFpass-regist').value
        axiosInstance.post('/api/register', {
            name: name,
            email: email,
            password: pass,
            cpassword: cpass,
        })
            .catch((error) => {
                console.log(error)
            })
            .then((response) => {
                if (response['data'].msg === "success") {
                    setAlert({ action: "success", isAlert: response['data'].msg })
                    setTimeout(() => navigate('/login'), 3000)
                } else {
                    setAlert({ action: "warning", isAlert: response['data'].msg })
                    setTimeout(() => setAlert(false), 6000)
                }

            })
    }
    return (
        <React.Fragment>
            {alert ? <AlertSnackbars action={alert.action} isAlert={alert.isAlert} /> : ""}
            <Container sx={{
                maxWidth: {
                    lg: "1240px",
                    md: '960px',
                    sm: '100%',
                    xs: '100%'
                },
                px: {
                    lg: "0px !important",
                    md: '0px !important',
                    sm: '15px !important',
                    xs: '15px !important'
                }
            }}>
                <Box
                    sx={{
                        p: 0,
                        display: 'grid',
                        gridTemplateColumns: {
                            lg: '1fr 1fr',
                            md: '1fr 1fr',
                            sm: '1fr',
                            xs: '1fr',
                        },
                        gap: 0,
                        width: '100%',
                        my: '15px',
                        border: '1px solid gray',
                        borderRadius: "5px"
                    }}>
                    <Item sx={{ p: '0 !important' }}>
                        <img style={{ width: '100%', maxHeight: '90vh' }} src="upload/images/background.jpeg" />
                    </Item>
                    <Item sx={{ p: '70px 50px !important' }}>
                        <h2 style={{ textAlign: "center", fontSize: '1.5rem', fontWeight: '700' }}>Login to your account</h2>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: "15px" }}>
                            <PersonIcon sx={{ color: '#f51167', mr: 1, my: 0.5 }} />
                            <TextField type="text" sx={{ width: "100%" }} id="name-regist" label="Name" variant="standard" />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: "15px" }}>
                            <EmailIcon sx={{ color: '#f51167', mr: 1, my: 0.5 }} />
                            <TextField type="email" sx={{ width: "100%" }} id="email-regist" label="Email Address" variant="standard" />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: "15px" }}>
                            <VpnKeyIcon sx={{ color: '#f51167', mr: 1, my: 0.5 }} />
                            <TextField type="password" sx={{ width: "100%" }} id="pass-regist" label="Password" variant="standard" />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: "15px" }}>
                            <VpnKeyIcon sx={{ color: '#f51167', mr: 1, my: 0.5 }} />
                            <TextField type="password" sx={{ width: "100%" }} id="conFpass-regist" label="Confirm Password" variant="standard" />
                        </Box>
                        <Button sx={{
                            width: '100%',
                            p: "11px",
                            fontWeight: '700',
                            bgcolor: '#f51167',
                            mb: '15px'
                        }} color="error"
                            onClick={register}
                            variant="contained">Sign-up</Button>
                        <Box sx={{ textAlign: 'right', mb: '15px' }}>
                            <a style={{ display: "inline-block", color: '#007bff', fontWeight: '700' }} href="/">Forgot Password?</a>
                        </Box>
                        <Box sx={{ textAlign: 'center', mb: '15px' }}>
                            <span>or register with</span>
                        </Box>
                        <Box sx={{
                            p: 0,
                            display: 'grid',
                            gridTemplateColumns: {
                                lg: '1fr 1fr',
                                md: '1fr 1fr',
                                sm: '1fr',
                                xs: '1fr',
                            },
                            gap: 0,
                            width: '100%',
                            mb: '20px'
                        }}>
                            <Button sx={{
                                width: '100%',
                                p: "7px",
                                fontWeight: '700',
                                mr: '15px'
                            }} color="primary" variant="contained" >Facebook</Button>
                            <Button sx={{
                                width: '100%',
                                p: "7px",
                                fontWeight: '700',
                                ml: '15px'
                            }} color="error" variant="contained" >Google</Button>
                        </Box>
                        <hr />
                        <Box sx={{ textAlign: 'center', mt: "25px" }}>

                            <p style={{ marginBottom: "15px" }}>Already have an account? <Link to="/login" style={{ color: '#007bff', fontWeight: 'bold' }}>Login Here</Link></p>
                        </Box>
                    </Item>
                </Box>
            </Container>
        </React.Fragment>
    )
}

export default Register