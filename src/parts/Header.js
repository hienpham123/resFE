import React from "react"
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Link, useLocation, useNavigate } from "react-router-dom";

import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PersonIcon from '@mui/icons-material/Person';

//components
import Item from '../components/Item'
import CustomizedSnackbars from "../components/Snackbars"
// scss
import '../assets/scss/app.scss'
import { axiosAuth, axiosInstance } from "../utills/axios";
import BoxSearch from "../components/BoxSearch";
function Header() {
    const navigate = useNavigate();
    const [countcart, setCountcart] = React.useState(0)
    const [action, setAction] = React.useState(false)
    const [user, setUser] = React.useState(false)
    const token = window.localStorage.getItem('token');
    const localhost = useLocation()
    React.useLayoutEffect(() => {
        if (token)
            axiosAuth.get("api/user")
                .catch((error) => {
                    setAction(error)
                })
                .then((response) => {
                    setUser(response.data)
                })
    }, [localhost])

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            <Grid className="TopHeader" container spacing={2} sx={{
                m: 0,
                pt: '15px',
                pb: '15px',
                textAlign: {
                    lg: "left",
                    md: 'left',
                    sm: 'center',
                    xs: 'center'
                },
                width: '100% !important'
            }}>
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
                                md: '2fr 6fr 4fr',
                            },
                            gap: 0,
                            width: '100%'
                        }}>
                        <Item sx={{ pl: '0 !important', alignSelf: 'center' }}>
                            <Link to="/" className="logo">Restaurant</Link>
                        </Item>
                        <Item sx={{ position: 'relative' }}>
                            <BoxSearch />
                        </Item>
                        <Item sx={{ display: 'flex', alignSelf: 'center', marginLeft: 'auto', pr: '0 !important' }}>
                            {/* <Box sx={{ px: '15px', m: 'auto 0px' }}>
                                <Link to='/wl' style={{ display: 'flex', color: "#f51167" }}>
                                    <FavoriteIcon sx={{ fontSize: '26px' }} />
                                    <span>Yêu thích</span>
                                </Link>
                            </Box>
                            <Box sx={{ pl: '15px', pr: '0!important', m: 'auto 0px' }}>
                                <Link to='/cart-user' style={{ display: 'flex' }}>
                                    <Stack spacing={2} direction="row">
                                        <Badge id="badge_header" badgeContent={countcart} color="error">
                                            <LocalMallOutlinedIcon sx={{ fontSize: '26px' }} color="action" />
                                        </Badge>
                                    </Stack>
                                    <span>Đã đặt</span>
                                </Link>
                            </Box> */}
                            <Box sx={{ pl: '15px', pr: '0!important', m: 'auto 0px' }}>
                                <Button
                                    id="basic-button"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                    sx={{ color: "black", textTransform: "capitalize" }}
                                >
                                    <PersonIcon />
                                    {user ? user["name"] : "tài khoản"}
                                </Button>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    {!user ? <div>
                                        <MenuItem onClick={handleClose}>
                                            <Link to="login">Login</Link>
                                        </MenuItem>
                                        <MenuItem onClick={handleClose}>
                                            <Link to="regist">Register</Link>
                                        </MenuItem>
                                    </div> : <div>
                                        {user.role == 1 || user.role == 2 ? (
                                            <MenuItem onClick={handleClose}>
                                                <Link to="admin">Admin</Link>
                                            </MenuItem>
                                        ) : ""}
                                        <MenuItem onClick={handleClose}>
                                            <Link to="profile">Profile</Link>
                                        </MenuItem>
                                        <MenuItem onClick={() => {
                                            axiosAuth.get("api/logout")
                                                .catch((error) => {
                                                    console(error)
                                                })
                                                .then((response) => {
                                                    if (response["data"].msg === "logout") {
                                                        localStorage.removeItem('token')
                                                        setAnchorEl(null)
                                                        setUser(false)
                                                    }
                                                })
                                            navigate('/')

                                        }}>Logout</MenuItem>
                                    </div>}

                                </Menu>
                            </Box>
                        </Item>
                    </Box>
                </Container>
            </Grid>
        </React.Fragment>
    );
}
export default Header