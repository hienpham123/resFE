import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Button } from '@mui/material';
import { axiosAuth, axiosInstance } from "../utills/axios";
export default function Quanlty({btn, value, price, func, idCart, prdId}) {
    const [qltCount, setQltCount] = React.useState(value ? value : 0)
    const updateCart = (quanlitys)=>{
      axiosInstance.put('http://localhost:8000/api/cart/' + idCart, {quanlity: quanlitys})
      .catch((error)=> console.log(error))
      .then((response)=>{
          console.log(response)
      })
    }
    const handleAddCart = ()=>{
      let token = localStorage.getItem('token')
      if(token != 'false' && token && qltCount > 0){
        let user_id = JSON.parse(localStorage.getItem('user')).id
        axiosInstance.post('http://localhost:8000/api/cart', {user_id: user_id, product_id: prdId, quanlity: qltCount})
        .catch((error)=> console.log(error))
        .then((response)=>{
          let dom = document.getElementById('badge_header').children[1].innerText = response['data'] - 1;
          console.log({dom})
        })
      }

    }
  return (
    <React.Fragment>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <RemoveIcon onClick={()=>setQltCount((prev) => {
                price&&func(Number(-price))
                idCart&&updateCart(prev - 1)
                return Number(prev - 1) >= 0 ? Number(prev - 1) : 0
              })} sx={{ color: 'action.active', mr: 1, my: 0.5, cursor: 'pointer' }} />
            <TextField type="number" onChange={(e)=> setQltCount(prev=>{
              let count = Number(e.target.value) - prev
              price&&func(price*count)
              return Number(e.target.value)
            })} sx={{'input':{textAlign: 'center', maxWidth: '100px'}}} id="quanlityPrdDt" label="Quanlity" value={qltCount} variant="standard" />
            <AddIcon onClick={()=> {

              setQltCount((prev) => {
                price&&func(price)
                idCart&&updateCart(prev + 1)
                return prev + 1
              })
            }} sx={{ color: 'action.active', mr: 1, my: 0.5, cursor: 'pointer' }} />
        </Box>
        {!btn && <Button sx={{mt: '40px', p: '15px 30px', background: '#f51167'}} color="error" onClick={handleAddCart} variant='contained'>ADD TO CART</Button>}
    </React.Fragment>
  );
}
