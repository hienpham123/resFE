import React from "react";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import EmailIcon from '@mui/icons-material/Email';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import { pink } from '@mui/material/colors';
import { Link,Redirect, useNavigate } from "react-router-dom";
//component
import Item from '../components/Item'
import { Button } from "@mui/material";
import { axiosAuth, axiosInstance } from "../utills/axios";
function Login(){
    const navigate = useNavigate()
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [token, setToken] = React.useState(false)
    const [action, setAction] = React.useState(true);
    const [user, setUser] = React.useState(false)
    document.title = "Login"
    const handleLogin =()=>{
        let email = document.getElementById('email-login').value;
        let pass = document.getElementById('pass-login').value;
        console.log(email, pass)
        axiosInstance.post('/api/login', {
            email: email,
            password : pass
        })
        .catch((error)=>{
            setAction(error)
        })
        .then((response) => {
            setToken(response['data'].token)
            token ? setUser(true) : setUser(false)
            if(response['data'].token){
                window.localStorage.setItem('token', response['data'].token)
                navigate('/', {state: {data: response['data'].token}})
            }else{
                alert('Sai');
            }
            
        })
    }
    return (
        <Container sx={{
            maxWidth:{
                lg:"1240px",
                md:'960px',
                sm:'100%',
                xs:'100%'
            },
            px:{
                lg:"0px !important",
                md:'0px !important',
                sm:'15px !important',
                xs:'15px !important'
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
                width:'100%',
                my: '15px',
                border: '1px solid gray',
                borderRadius: "5px"
            }}>
                <Item sx={{p:'0 !important'}}>
                    <img style={{width: '100%', maxHeight: '90vh'}} src="upload/images/background.jpeg" />
                </Item>
                <Item sx={{p:'70px 50px !important'}}>
                    <h2 style={{textAlign:"center", fontSize: '1.5rem', fontWeight: '700'}}>Login to your account</h2>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end', mb:"15px"}}>
                        <EmailIcon sx={{ color: '#f51167', mr: 1, my: 0.5 }} />
                        {action ? (<TextField type="email" sx={{width: "100%"}} id="email-login" label="Email Address" variant="standard" />) 
                        : (<TextField error type="email" sx={{width: "100%"}} id="email-login" label="Email Address" variant="standard" />)}
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end', mb:"15px"}}>
                        <VpnKeyIcon sx={{ color: '#f51167', mr: 1, my: 0.5 }} />
                        {action ? (<TextField type="password" sx={{width: "100%"}} id="pass-login" label="Password" variant="standard" />) 
                        : (<TextField error type="password" sx={{width: "100%"}} id="pass-login" label="Password" variant="standard" />)}
                    </Box>
                    <FormGroup sx={{mb:"15px"}}>
                        <FormControlLabel control={<Checkbox sx={{
                            color: pink[800],
                            '&.Mui-checked': {
                                color: pink[600],
                            },
                            }} />} label="Remember me" />
                    </FormGroup>
                    <Button sx={{
                        width: '100%',
                        p: "11px",
                        fontWeight: '700',
                        bgcolor: '#f51167',
                        mb: '15px'
                    }} color="error" variant="contained" onClick={handleLogin}>Login</Button>
                    <Box sx={{textAlign: 'right', mb: '15px'}}>
                        <a style={{display: "inline-block", color: '#007bff', fontWeight: '700'}} href="/">Forgot Password?</a>
                    </Box>
                    <Box sx={{textAlign: 'center', mb: '15px'}}>
                        <span>or login with</span>
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
                        width:'100%',
                        mb: '20px'
                    }}>
                        <Button sx={{
                        width: '100%',
                        p: "7px",
                        fontWeight: '700',
                        mr: '15px'
                        }} color="primary" 
                        variant="contained"
                        >Facebook</Button>
                        <Button sx={{
                            width: '100%',
                            p: "7px",
                            fontWeight: '700',
                            ml: '15px'
                        }} color="error" variant="contained" >Google</Button>
                    </Box>
                    <hr />
                    <Box sx={{textAlign: 'center', mt: "25px"}}>
                        <p style={{marginBottom:"15px"}}>Check out as a guest? <a href="/" style={{color: '#007bff', fontWeight: 'bold'}}>Click Here</a></p>
                        <p>Don't have an account? <Link to="/regist" style={{color: '#007bff', fontWeight: 'bold'}}>Register Here</Link></p>
                    </Box>
                </Item>
            </Box>
        </Container>
    )
}

export default Login

// react/product/id
// laravel react => domain, product => action, id=> param 