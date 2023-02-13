// add món ăn

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import DiningIcon from '@mui/icons-material/Dining';
import AddIcon from '@mui/icons-material/Add';
import { baseURLImg } from '../../utills/config';
import DeleteIcon from '@mui/icons-material/Delete';
import { axiosAuth, axiosInstance } from "../../utills/axios";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Item from '../../components/Item'
import TextField from '@mui/material/TextField';
import { Tooltip } from '@mui/material';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  '& .MuiDialog-paper': {
    maxWidth: '100% !important',
    margin: 0,
    marginTop: '50px'
  }
}));
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#f51167",
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
export default function ModalRestaurant({ id }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [datas, setData] = React.useState([])
  const [action, setAction] = React.useState(false)

  const [file, setFile] = React.useState('');
  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [sale, setSale] = React.useState('');
  const [desc, setDesc] = React.useState('');
  React.useLayoutEffect(() => {
    if (id) {
      axiosAuth.get("api/eating/ofres/" + id)
        .catch(error => console.log(error))
        .then(res => {
          console.log('resCart', res)
          setData(res["data"])
        })
    }
  }, [action, id])

  function createData(name, price, discount, description, img, action) {
    return { name, price, discount, description, img, action };
  }
  let sumPrice = 0;
  const rows = [];
  const handleDelete = (id) => {
    let check = window.confirm("Bạn thức sự muốn xóa món ăn")
    if (check) {
      axiosAuth.delete("/api/eating/" + id)
        .catch(error => console.log(error))
        .then(res => {
          alert("deleted")
          setAction(!action)
        })
    }
  }
  datas.map((data, index) => {
    // let price = Number(data.eating.price) * Number(data.eating.discount) / 100
    // let sum = price * data.quanlity
    // sumPrice = sumPrice + sum;

    rows.push(createData(
      data.name,
      data.price,
      data.discount,
      data.description,
      <img width={"150px"} src={baseURLImg + data.images[0].path} />,
      <Button
        sx={{ ml: "7px", mr: "7px" }}
        onClick={() => handleDelete(data.id)}
        variant='contained' color="error">
        <DeleteIcon />
      </Button>)
    )
  })
  const handlePost = () => {
    let formDataRes = new FormData();
    for (const val of file) {
      formDataRes.append('image[]', val)
    }
    formDataRes.append('name', name)
    formDataRes.append('price', price)
    formDataRes.append('discount', sale)
    formDataRes.append('restaurant_id', id)
    formDataRes.append('description', desc)
    axiosAuth.post("api/eating", formDataRes)
      .catch(error => console.log(error))
      .then(res => {
        console.log(res["data"])
        setAction(!action)
      })
  }
  return (
    <div>
      <Tooltip title="Thêm món ăn">
        <Button variant='contained' onClick={handleOpen}><DiningIcon /></Button>
      </Tooltip>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogContent dividers sx={{ p: '0px !important' }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: "80vw" }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align='left'>Ảnh mô tả</StyledTableCell>
                  <StyledTableCell align='left'>Tên</StyledTableCell>
                  <StyledTableCell align="center">Giá</StyledTableCell>
                  <StyledTableCell align="center">Discount</StyledTableCell>
                  <StyledTableCell align="center">Mô tả</StyledTableCell>
                  <StyledTableCell align="center">#</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <StyledTableRow key={index} className="modalListCart">
                    <StyledTableCell align="left">{row.img}</StyledTableCell>
                    <StyledTableCell align="left">{row.name}</StyledTableCell>
                    <StyledTableCell align="center">{row.price}</StyledTableCell>
                    <StyledTableCell align="center">{row.discount}</StyledTableCell>
                    <StyledTableCell align="center">{row.description}</StyledTableCell>
                    <StyledTableCell align="center">{row.action}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>

            </Table>

          </TableContainer>
        </DialogContent>
        <DialogActions sx={{ p: '0px !important' }}>
          <Box sx={{
            width: '100%',
            background: 'white',
            textAlign: 'center',
            'h2': {
              padding: '15px 20px'
            }
          }}>
            <h5>Thêm món ăn</h5>
            <Box
              component="form"
              sx={{
                mt: '15px',
                p: 0,
                display: 'grid',
                gridTemplateColumns: {
                  lg: '1fr 2fr 1fr 1fr 3fr',
                  md: '1fr 2fr 1fr 1fr 3fr',
                  sm: '1fr 1fr 1fr',
                  xs: '1fr',
                },
                gap: 0,
                width: '100%',
              }}
              noValidate
              autoComplete="off"
            >
              <Item>
                <Box sx={{ '& > :not(style)': { m: 1, width: '100%', }, textAlign: 'center' }}>
                  <Button
                    style={{ margin: '15px auto' }}
                    variant="contained"
                    component="label"
                  >
                    <AddPhotoAlternateIcon />
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      hidden
                      id='uploadFIle'
                      onChange={e => setFile(e.target.files)}
                    />
                  </Button>

                </Box>
              </Item>
              <Item>
                <Box
                  sx={{ mt: "15px" }}
                >
                  <TextField
                    sx={{ width: '100%' }}
                    id="outlined-addressD"
                    label="Tên món ăn"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </Box>
              </Item>
              <Item>
                <Box
                  sx={{ mt: "15px" }}
                >
                  <TextField
                    sx={{ width: '100%' }}
                    id="outlined-addressD"
                    label="Giá"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                  />
                </Box>
              </Item>
              <Item>
                <Box
                  sx={{ mt: "15px" }}
                >
                  <TextField
                    sx={{ width: '100%' }}
                    id="outlined-addressD"
                    label="Giảm giá"
                    value={sale}
                    onChange={e => setSale(e.target.value)}
                  />
                </Box>
              </Item>
              <Item>
                <Box
                  sx={{ mt: "15px" }}
                >
                  <TextField
                    sx={{ width: '100%' }}
                    id="outlined-addressD"
                    label="Mô tả"
                    value={desc}
                    onChange={e => setDesc(e.target.value)}
                  />
                </Box>
              </Item>
            </Box>

            <Button onClick={() => handlePost()} sx={{ my: "7px" }} variant="contained">
              <AddIcon />
            </Button>
          </Box>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
