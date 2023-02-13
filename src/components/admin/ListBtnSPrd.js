import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { axiosAuth, axiosInstance } from "../../utills/axios";
import { useNavigate } from 'react-router-dom';
import Alert from '../../parts/admin/Alert';
export default function ListBtnSPrd({del, edit, top, deletePrd, topDownPrd, topUpPrd}) {
  const navigate = useNavigate()
  
  return (
    <Stack spacing={2} direction="row" sx={{width: 'fit-content', margin: '0px auto'}}>
      {del && (<Button variant="contained" onClick={()=>deletePrd(del)} color='error'>Delete</Button>)}
      {edit && (<Button variant="contained" onClick={()=>{
        navigate(`/admin/edit-product/${del}`)
      }} color='warning'>Edit</Button>)}
      {top!==1 ? 
      (<Button variant="contained" onClick={()=>topUpPrd(del)}>Top up</Button>) : 
      (<Button variant='contained' onClick={()=>topDownPrd(del)}>Top down</Button>)}
    </Stack>
  );
}