import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import LatestPrd from '../components/LatestProduct'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button } from '@mui/material';
import { axiosAuth, axiosInstance } from "../utills/axios";

import CardCart from '../components/CardCart'
import Quanlty from '../components/Quanlity';
import Item from '../components/Item'
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));




export default function CustomizedTables() {

    const [action, setAction] = React.useState(false)
    React.useEffect(()=>{
        setAction(!action)
    }, [localStorage.getItem('amountPrd')])
    const deleteCart = (id)=>{
        axiosInstance.delete('http://localhost:8000/api/cart/' + id)
        .catch((error)=> console.log(error))
        .then((response)=>{
            setAction(!action)
            if(response.data == 1){
                let count = document.getElementById('badge_header').children[1].innerText;
                let dom = document.getElementById('badge_header').children[1].innerText = count - 1;
                alert("Xóa thành công");
            }else{
                alert("Vui lòng thực hiện lại");
            }
        })
    }
    const btn = (id)=>{
        return <Button variant="contained" onClick={()=>deleteCart(id)} color='error'>Delete</Button>;
    }
    function createData(product, Quatity, Size, Price, action) {
      return { product, Quatity, Size, Price, action };
    }
    const [cart, setCart] = React.useState([])
    const user = JSON.parse(window.localStorage.getItem('user'))
    const user_id = user.id
    let sumPrice = 0;
    React.useEffect(()=>{
        if(user_id){
            axiosAuth.get(`http://localhost:8000/api/cart-user/${user_id}`)
            .catch((error)=>console.log(error))
            .then((response) => setCart(response['data']))
        }
    }, [])
    const actionPrice = (e)=>{
        setAction(!action)
        console.log('price', e)
        sumPrice += e
        document.getElementById('sumpriceCart').innerText = sumPrice;
    }
    const rows = [];
      cart.map((data, index)=>{
        sumPrice = sumPrice + data.price*data.quality;
        rows.push(createData( <CardCart key={index} image={"http://localhost:8000/" + data.images} name={data.name} />, <Quanlty value={data.quality} func={actionPrice} price={data.price} btn idCart={data.carts_id} />, 0, data.price, btn(data.carts_id)))
      })
      console.log("loadding ...... ")
  return (
    <React.Fragment>
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
                    md: '7fr 3fr',
                    sm: '1fr',
                },
                gap: 0,
                width:'100%'
            }}>
                <Item>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                            <TableRow>
                                <StyledTableCell align='left'>Product</StyledTableCell>
                                <StyledTableCell align="center">Quatity</StyledTableCell>
                                <StyledTableCell align="center">Size</StyledTableCell>
                                <StyledTableCell align="center">Price</StyledTableCell>
                                <StyledTableCell align="center">#</StyledTableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {rows.map((row, index) => (
                                <StyledTableRow key={index}>
                                    <StyledTableCell align="left">{row.product}</StyledTableCell>
                                    <StyledTableCell align="center">{row.Quatity}</StyledTableCell>
                                    <StyledTableCell align="center">{row.Size}</StyledTableCell>
                                    <StyledTableCell align="center">{row.Price}</StyledTableCell>
                                    <StyledTableCell align="center">{row.action}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                            </TableBody>

                        </Table>
                        <Box sx={{
                                width: '100%',
                                background: 'red',
                                textAlign: 'right',
                                'h2' : {
                                    padding: '15px 20px'
                                }
                            }}>
                                <h2>Total $<span id="sumpriceCart">{sumPrice}</span></h2>
                            </Box>
                    </TableContainer>
                </Item>
                <Item>

                </Item>
            </Box>
        </Container>



        <LatestPrd />
    </React.Fragment>

  );
}
