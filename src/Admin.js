import React from 'react'
import SideBar from './parts/admin/SideBar'
import Box from '@mui/material/Box';
import Item from './components/Item'
import { Outlet, useParams } from "react-router-dom";
import NavAdmin from './parts/admin/NavAdmin'
import { axiosAuth } from "./utills/axios";
import { useNavigate } from 'react-router-dom';
import './assets/scss/admin.scss';
function Admin(){
    const params = useParams();
    const navigate = useNavigate()
    React.useLayoutEffect(() => {
        axiosAuth.get('/api/user')
            .catch(err => console.log(err))
            .then(res => {
                if(Number(res["data"].role) != 1 && Number(res["data"].role) != 2){
                    navigate(`/`)
                }
            })
    }, [])
    return (
        <React.Fragment>
            <Box sx={{
                p: 0,
                display: 'grid',
                gridTemplateColumns: { 
                    lg: '2fr 8fr',
                    md: '2fr 8fr',
                    sm: '1fr',
                    xs: '1fr',
                },
                gap: 0,
                width:'100%',
                m: '0px',
                border: '0px',
                borderRadius: "5px"
            }}>
                <Item sx={{padding: '0px !important', height: '100vh', border: '0px !important'}}>
                    <SideBar />
                </Item>
                <Item sx={{p: '0px !important', height: '100vh', position: 'relative'}}>
                    {/* <NavAdmin title="Admin" /> */}
                    <Box sx={{height: '100%', overflow: 'scroll'}}>
                        <Box sx={{mt: '60px', px: '15px'}}>
                            <Outlet />
                        </Box>
                    </Box>
                    {/* <Box sx={{ flexGrow: 1, position: 'absolute', bottom: '0px', right: '0px', width: '100%', zIndex: '99999'}}>
                        <AppBar position="static">
                            <Toolbar sx={{minHeight: 'auto', background: 'black'}} variant="dense">
                                <p style={{textAlign: 'center', width: '100%'}}>Code by Ngọc kenny</p>
                            </Toolbar>
                        </AppBar>
                    </Box> */}
                </Item>
            </Box>
        </React.Fragment>
    )
}

export default Admin