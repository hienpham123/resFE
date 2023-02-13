import React from "react";
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import Box from '@mui/material/Box';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import Item from '../../components/Item'
import { styled } from '@mui/material'
import { Link } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CategoryIcon from '@mui/icons-material/Category';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { axiosAuth } from "../../utills/axios";
function SideBar() {
    const [open, setOpen] = React.useState(false);
    const [user, setUser] = React.useState({})
    React.useLayoutEffect(() => {
        axiosAuth.get("api/user")
            .then((response) => response)
            .then(function (data) {
                setUser(data.data)
            });
    }, [])

    const StyleIcon = styled(ListItemIcon)(({ theme }) => ({
        '& svg': {
            color: "white"
        }
    }))

    const StyleLink = styled(Link)(({ theme }) => ({
        color: "white",
        display: 'block'
    }))
    return (
        <List
            sx={{ width: '100%', bgcolor: '#343a40', color: 'white', height: '100%', paddingBottom: '0px !important' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader" sx={{
                    borderBottom: '1px solid gray', backgroundColor: "#343a40 !important", py: '9px'
                }}>
                    <StyleLink style={{ display: 'block' }} to="/admin">
                        <Box sx={{
                            p: 0,
                            display: 'grid',
                            gridTemplateColumns: {
                                lg: '2fr 8fr',
                                md: '2fr 8fr',
                                sm: '2fr 8fr',
                                xs: '1fr',
                            },
                            gap: 0,
                            width: '100%',
                        }}>
                            <Item sx={{
                                display: {
                                    sm: 'block',
                                    xs: 'none'
                                },
                                fontSize: '1.5rem'
                            }}>Restaurant</Item>
                        </Box>
                    </StyleLink>

                </ListSubheader>
            }
        >
            <Box>
                <Box sx={{ borderBottom: "1px solid gray" }}>
                    <ListItemButton onClick={() => open === 1 ? setOpen(false) : setOpen(1)}>
                        <StyleIcon>
                            <AccountCircleIcon />
                        </StyleIcon>
                        <ListItemText primary={user.name} />
                        {open === 1 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open === 1} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <StyleLink to="/">
                                <ListItemButton sx={{ pl: 4 }}>

                                    <StyleIcon>
                                        <HomeIcon />
                                    </StyleIcon>
                                    <ListItemText primary="Home" />

                                </ListItemButton>
                            </StyleLink>
                            <ListItemButton sx={{ pl: 4 }}>
                                <StyleIcon>
                                    <LogoutIcon />
                                </StyleIcon>
                                <ListItemText primary="Logout" onClick={() => {
                                    window.localStorage.setItem('token', false)
                                    return window.location.replace("/");
                                }} />
                            </ListItemButton>
                        </List>
                    </Collapse>
                </Box>
                {/*  */}
                <ListItemButton onClick={() => open === 2 ? setOpen(false) : setOpen(2)}>
                    <StyleIcon>
                        <ProductionQuantityLimitsIcon />
                    </StyleIcon>
                    <ListItemText primary="Restaurant" />
                    {open === 2 ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open === 2} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <StyleLink to="nha-hang">
                            <ListItemButton sx={{ pl: 4 }}>
                                <StyleIcon>
                                    <StarBorder />
                                </StyleIcon>
                                <ListItemText primary="All Restaurant" />
                            </ListItemButton>
                        </StyleLink>
                        <StyleLink to="them-nha-hang">
                            <ListItemButton sx={{ pl: 4 }}>
                                <StyleIcon>
                                    <AddShoppingCartIcon />
                                </StyleIcon>
                                <ListItemText primary="Add Restaurant" />
                            </ListItemButton>
                        </StyleLink>
                    </List>
                </Collapse>
                {/*  */}
                {/* <StyleLink to='category'>
                    <ListItemButton>
                        <StyleIcon>
                            <CategoryIcon />
                        </StyleIcon>
                        <ListItemText primary="Category" />
                    </ListItemButton>
                </StyleLink> */}
                {/*  */}
                <StyleLink to='user'>
                    <ListItemButton>
                        <StyleIcon>
                            <SupervisedUserCircleIcon />
                        </StyleIcon>
                        <ListItemText primary="User" />
                    </ListItemButton>
                </StyleLink>

                {/*  */}
                <StyleLink to='cart'>
                    <ListItemButton>
                        <StyleIcon>
                            <ShoppingCartIcon />
                        </StyleIcon>
                        <ListItemText primary="Order" />
                    </ListItemButton>
                </StyleLink>

            </Box>
        </List>
    )
}

export default SideBar