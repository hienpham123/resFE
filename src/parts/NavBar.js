// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import {  Container } from '@mui/material';
// import ButtonGroup from '@mui/material/ButtonGroup';
// import { Link, useLocation } from "react-router-dom";
// import Chip from '@mui/material/Chip';
// import { axiosAuth, axiosInstance } from "../utills/axios";

// import UserBtn from '../components/UserBtn'
// export default function ButtonAppBar() {
//     const [actionBtn, setActionBtn] = React.useState(window.innerWidth > 960 ? true : false);
//     // const [user, setUser] = React.useState(false);
//     const user = JSON.parse(localStorage.getItem('user'))
//     const location = useLocation()
//     console.log(location)
//     React.useEffect(()=>{
//         const handleWidth = ()=>window.innerWidth > 900 ? setActionBtn(true) : setActionBtn(false)
//         window.addEventListener('resize', handleWidth)
//         return ()=>{
//             window.removeEventListener('resize', handleWidth)
//         }
//     }, [actionBtn])
//     const [token, setToken] = React.useState(window.localStorage.getItem('token'));
//     // React.useEffect(()=>{
//     //     if(token !== 'false'){
//     //         axiosAuth.get('http://localhost:8000/api/this-user')
//     //         .catch((error)=>console.log(error))
//     //         .then((response) => setUser(response))
//     //     }
//     // }, [token])
//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar position="static">
//         <Container sx={{
//                     maxWidth:{
//                         lg:"1240px",
//                         md:'960px',
//                         sm:'100%',
//                         xs:'100%'
//                     },
//                     px:{
//                         lg:"0px !important",
//                         md:'0px !important',
//                         sm:'15px !important',
//                         xs:'15px !important'
//                     }
//                 }}>
//             <Toolbar sx={{
//                 p:"0 !important",
//                 minHeight: 'auto !important',
//                 display: 'block'
//             }}>
//                 <IconButton
//                     className=""
//                     size="large"
//                     edge="start"
//                     color="inherit"
//                     aria-label="menu"
//                     style={{'display': window.innerWidth <= 900 ? 'block' : 'none'}}
//                     sx={{ 
//                         mr: 2,
//                         ml: 'auto'
//                     }}
//                     onClick={()=>setActionBtn(!actionBtn)}
//                 >
//                     <MenuIcon />
//                 </IconButton>
//                 <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//                 <Box
//                     sx={{
//                         display: 'flex',
//                         flexDirection: 'column',
//                         '& > *': {
//                         m: 1,
//                         alignSelf: 'left',
//                         },
//                     }}
//                     >
//                     <ButtonGroup id="listMenuHeader" style={{'display': window.innerWidth <= 900 ?( actionBtn ? 'contents' : 'none') : 'flex'}} variant="outlined" aria-label="outlined button group" sx={{
//                         m:0,
//                         alignSelf: 'left'
//                     }}>
//                         <Button sx={{color:'white', py: '11px', border: '0px !important', pl:{lg:0, md: 0, sm:'auto'}}}>
//                             <Link to="/">Home</Link>
                            
//                         </Button>
//                         <Button className='MultiMenu' sx={{color:'white', py: '11px', border: '0px !important'}}>
//                             <span>Our Shop</span>
//                             <ul className='subMenu'>
//                                 <li>Beads</li>
//                                 <li>Beading Tools</li>
//                                 <li>Beading Wires And Threads</li>
//                                 <li>Findings</li>
//                                 <li>Chains</li>
//                                 <li>Packaging</li>
//                                 <li>Charms and Pendants</li>
//                                 <li>Bridal Accesories</li>
//                                 <li>Wedding &amp; Party Accessories</li>
//                                 <li>Equipment Hire</li>
//                                 <li>Handmade Accessories</li>
//                                 <li>Keyholder</li>
//                                 <li>Bags</li>
//                                 <li>Hair Beads &amp;Accesories</li>
//                                 <li>Event Planning &amp; Management</li>
//                             </ul>
//                         </Button>
//                         <Button className='btnCardMenu' sx={{color:'white', py: '11px', border: '0px !important'}}>
//                             On Sale
//                             <Chip className='cardTop' label="sale" color="error" />
//                         </Button>
//                         <Button sx={{color:'white', py: '11px', border: '0px !important'}}>Our Services</Button>   
//                         <Button sx={{color:'white', py: '11px', border: '0px !important'}}>Blog</Button>   
//                         <Button sx={{color:'white', py: '11px', border: '0px !important'}}>Contact</Button>   
//                         {user ?  (<UserBtn name={user.name} />) : <React.Fragment>
//                             <Button sx={{color:'white', py: '11px', border: '0px !important'}}><Link to="/login">Signin</Link></Button>   
//                             <Button sx={{color:'white', py: '11px', border: '0px !important'}}><Link to="/regist">Signup</Link></Button>  
//                         </React.Fragment> }
                        
//                     </ButtonGroup>
//                 </Box>
//                 </Typography>
//             </Toolbar>
//         </Container>
//       </AppBar>
//     </Box>
//   );
// }