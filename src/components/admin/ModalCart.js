// order info

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
import VisibilityIcon from '@mui/icons-material/Visibility';
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
export default function ModelCart({ data }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [action, setAction] = React.useState(false)
  React.useEffect(() => {
    setAction(!action)
  }, [localStorage.getItem('amountPrd')])
  function createData(name, quatity, price, sum) {
    return { name, quatity, price, sum };
  }
  const [cart, setCart] = React.useState(data)
  let sumPrice = 0;
  const rows = [];
  cart.map((data, index) => {
    let price = Number(data.eating.price) - Number(data.eating.price) * Number(data.eating.discount) / 100
    let sum = price * data.quanlity
    sumPrice = sumPrice + sum;
    rows.push(createData(data.eating.name, data.quanlity, price, sum))
  })

  return (
    <div>
      <Tooltip title="Xem thông tin">
        <Button variant='contained' onClick={handleOpen}><VisibilityIcon /></Button>
      </Tooltip>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogContent dividers sx={{ p: '0px !important' }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align='left'>Món ăn</StyledTableCell>
                  <StyledTableCell align="center">Số lượng</StyledTableCell>
                  <StyledTableCell align="center">Giá</StyledTableCell>
                  <StyledTableCell align="center">Tổng</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <StyledTableRow key={index} className="modalListCart">
                    <StyledTableCell align="left">{row.name}</StyledTableCell>
                    <StyledTableCell align="center">{row.quatity}</StyledTableCell>
                    <StyledTableCell align="center">{row.price}</StyledTableCell>
                    <StyledTableCell align="center">{row.sum}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>

            </Table>

          </TableContainer>
        </DialogContent>
        <DialogActions sx={{ p: '0px !important' }}>
          <Box sx={{
            width: '100%',
            background: 'red',
            textAlign: 'right',
            'h2': {
              padding: '15px 20px'
            }
          }}>
            <h2>Total $<span id="sumpriceCart">{sumPrice}</span></h2>
          </Box>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
