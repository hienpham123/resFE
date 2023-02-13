import React from "react";
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
export default function NavAdmin({title}){
    return (
        <Box sx={{ flexGrow: 1, position: 'absolute', top: '0px', right: '0px', width: '100%', zIndex: '2'}}>
            <AppBar position="static">
                <Toolbar variant="dense">
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                    <MenuIcon />
                </IconButton>
                <Typography id="titleAdmin" variant="h6" color="inherit" component="div">
                    {title}
                </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    )
}