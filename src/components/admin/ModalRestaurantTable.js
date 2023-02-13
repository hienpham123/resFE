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
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
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
export default function ModalRestaurantTable({ id }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [datas, setData] = React.useState([])
  const [action, setAction] = React.useState(false)

  const [file, setFile] = React.useState('');
  const [type, setName] = React.useState('');
  const [chair, setPrice] = React.useState('');
  const [count, setSale] = React.useState('');
  const [desc, setDesc] = React.useState('');
  React.useLayoutEffect(() => {
    if (id) {
      axiosAuth.get("api/tableinfo/ofres/" + id)
        .catch(error => console.log(error))
        .then(res => {
          setData(res["data"])
        })
    }
  }, [action, id])

  function createData(name, price, discount, description, action) {
    return { name, price, discount, description, action };
  }
  let sumPrice = 0;
  const rows = [];
  const handleDelete = (id) => {
    let check = window.confirm("Bạn thức sự muốn xóa bàn")
    if (check) {
      axiosAuth.delete("/api/tableinfo/" + id)
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
      data.type,
      data.chair,
      data.count,
      data.description,
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
    formDataRes.append('type', type)
    formDataRes.append('chair', chair)
    formDataRes.append('count', count)
    formDataRes.append('restaurant_id', id)
    formDataRes.append('description', desc)
    axiosAuth.post("api/tableinfo", formDataRes)
      .catch(error => console.log(error))
      .then(res => {
        console.log(res["data"])
        setAction(!action)
      })
  }
  return (
    <div>
      <Tooltip title="Thêm bàn ăn">
        <Button variant='contained' sx={{ ml: "7px" }} onClick={handleOpen}><TableRestaurantIcon /></Button>
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
                  <StyledTableCell align='left'>Loại bàn</StyledTableCell>
                  <StyledTableCell align="center">Số ghế</StyledTableCell>
                  <StyledTableCell align="center">Số bàn</StyledTableCell>
                  <StyledTableCell align="center">Mô tả</StyledTableCell>
                  <StyledTableCell align="center">#</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <StyledTableRow key={index} className="modalListCart">
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
            <h5>Thêm bàn ăn</h5>
            <Box
              component="form"
              sx={{
                mt: '15px',
                p: 0,
                display: 'grid',
                gridTemplateColumns: {
                  lg: '2fr 1fr 1fr 3fr',
                  md: '2fr 1fr 1fr 3fr',
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
                <Box
                  sx={{ mt: "15px" }}
                >
                  <TextField
                    sx={{ width: '100%' }}
                    id="outlined-addressD"
                    label="Loại bàn"
                    value={type}
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
                    label="Số ghế"
                    value={chair}
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
                    label="Số bàn"
                    value={count}
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
