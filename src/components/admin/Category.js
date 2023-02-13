import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import NavAdmin from '../../parts/admin/NavAdmin';
import axios from 'axios';
function createData(code, name, action) {
  return { code, name, action };
}
const btn = ()=>(
<Stack spacing={2} direction="row" sx={{width: 'fit-content', margin: '0px auto'}}>
  <Button variant="contained" color='error'>Delete</Button>
</Stack>
)

export default function Category() {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const [action, setAction] = React.useState(false)
  const [open, setOpen] = React.useState(false);
  const [addCtgr, setAddCtgr] = React.useState('')
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [category, setCategory] = React.useState([]);
  React.useEffect(()=>{
    axios.get('http://localhost:8000/api/category')
    .catch(err=>console.log(err))
    .then(res=>setCategory(res['data']['category']))
  }, [action])
  const rows = [];
  const handleDeleteCtgr = (id)=>{
    axios.delete(`http://localhost:8000/api/category/${id}`)
    .catch(err=>console.log(err))
    .then(res=>{
      console.log(res)
      let data = res['data'];
      if(data['msg'] == 'product'){
        alert('Không thể thực hiện!!! Vui lòng xóa hết sản phẩm thuộc mục này');
      }
      if(data['msg'] == 'deleted'){
        alert('Xóa thành công!!!')
        axios.get('http://localhost:8000/api/category')
        .catch(err=>console.log(err))
        .then(res=>setCategory(res['data']['category']))
      }
    })
  }
  category.map(data=>{
    let ctgr = createData(data['slug'], data['name'], <Button variant="contained" onClick={()=>handleDeleteCtgr(data['id'])} color='error'>Delete</Button>)
    rows.push(ctgr)
  })
  const handleAddCtgr = ()=>{
    axios.post('http://localhost:8000/api/category', {name: addCtgr})
    .catch(err => console.log(err))
    .then(res=>{
      let data = res['data']['msg']
      // data ? alert("thêm thành công") : alert('Đã tồn tại')
      if(data){
        alert('Thêm thành công')
        setAction(!action)
      }else{
        alert('Đã tồn tại')
      }
    })
  }
  return (
    <React.Fragment>
      <NavAdmin title="Category" />
      <Button  onClick={handleOpen} sx={{position: 'absolute', right: '10px', bottom: '50px', zIndex: '2', width: '50px', height: '50px', borderRadius: '50%'}} variant='contained'>
        <AddIcon />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Category
          </Typography>
          <Box sx={{
            p: 0,
            display: 'grid',
            gridTemplateColumns: { 
                lg: '7fr 5fr ',
                md: '7fr 5fr ',
                sm: '1fr ',
                xs: '1fr',
            },
            gap: 0,
            width:'100%',
          }}>
            <TextField sx={{width: '100%'}} id="" label="Category" value={addCtgr} variant="standard" onChange={e=>setAddCtgr(e.target.value)} />
            <Button sx={{width: '100%'}} onClick={handleAddCtgr} variant='contained'>Add</Button>
          </Box>
        </Box>
      </Modal>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
          <TableRow>
              <TableCell align="center">Code</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Action</TableCell>
          </TableRow>
          </TableHead>
          <TableBody>
          {rows.map((row, index) => (
              <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
              <TableCell component="th" scope="row" align="center">
                  {row.code}
              </TableCell>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.action}</TableCell>
              </TableRow>
          ))}
          </TableBody>
      </Table>
      </TableContainer>
    </React.Fragment>
  );
}
