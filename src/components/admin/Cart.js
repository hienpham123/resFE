//order admin manage

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ModelCart from './ModalCart';
import NavAdmin from '../../parts/admin/NavAdmin';
import { axiosAuth } from "../../utills/axios";
import SortObj from "../SortObj"
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import { Tooltip } from '@mui/material';
function createData(name, email, table, time, status, action) {
  return { name, email, action, status, table, time };
}

export default function Category() {
  const [cart, setCart] = React.useState([]);
  const [action, setAction] = React.useState(false);
  React.useEffect(() => {
    axiosAuth.get('/api/user')
      .catch(err => console.log(err))
      .then(res => {
        // setCart(res['data'])
        if (res['data'].role == 1) {
          axiosAuth.get('/api/order')
            .catch(err => console.log(err))
            .then(res => {
              setCart(res['data'])
            })
        } else {
          axiosAuth.get('/api/my-restaurant')
            .catch(err => console.log(err))
            .then(res => {
              setCart(res['data'][0].order)
            })
        }
      })
  }, [action])
  const handleCancel = (e) => {
    axiosAuth.post("/api/order/cancel/" + e)
      .then((response) => response)
      .then(function (data) {
        if (data) {
          alert("Đã hủy đơn");
          setAction(!action)
        }
      });
  }

  const handleActive = (e) => {
    axiosAuth.post("/api/order/active/" + e)
      .then((response) => response)
      .then(function (data) {
        if (data) {
          alert("Đã xác nhận đơn");
          setAction(!action)
        }
      });
  }

  const handleDone = (e) => {
    axiosAuth.post("/api/order/done/" + e)
      .then((response) => response)
      .then(function (data) {
        if (data) {
          alert("Đã thanh toán");
          setAction(!action)
        }
      });
  }
  const rows = [];
  cart.sort(SortObj("id"))
  cart.map((value) => {
    let status = ""
    let action = (
      <ModelCart data={value.order_detail} />
    )
    if (value.status === "0") {
      status = "Chờ xác nhận"
      action = (
        <div style={{ display: "inline-flex", textAlign: "center" }}>
          <Tooltip title="Xác nhận đơn đặt bàn">
            <Button sx={{ ml: "7px" }} variant='contained' onClick={() => { handleActive(value.id) }} color="success"><CheckIcon /></Button>
          </Tooltip>
          <Tooltip title="Hủy đơn đặt bàn">
            <Button sx={{ ml: "7px", mr: "7px" }} onClick={() => { handleCancel(value.id) }} variant='contained' color="error"><HighlightOffIcon /></Button>
          </Tooltip>
          <ModelCart data={value.order_detail} />
        </div>
      )
    }
    if (value.status === "1") {
      status = "Đã xác nhận"
      action = (
        <div style={{ display: "inline-flex", textAlign: "center" }}>
          <Tooltip title="Xác nhận thanh toán">
            <Button sx={{ ml: "7px" }} variant='contained' onClick={() => { handleDone(value.id) }} color="success"><PriceCheckIcon /></Button>
          </Tooltip>
          <Tooltip title="Hủy đơn đặt bàn">
            <Button sx={{ ml: "7px", mr: "7px" }} onClick={() => { handleCancel(value.id) }} variant='contained' color="error"><HighlightOffIcon /></Button>
          </Tooltip>
          <ModelCart data={value.order_detail} />
        </div>
      )
    }

    if (value.status === "2") {
      status = "Thành công"
    }

    if (value.status === "false") {
      status = "Hủy bỏ"
    }

    let data = createData(value.user.name, value.user.email, value.table.type, value.arrival_time, status, action)
    rows.push(data)
  })
  return (
    <React.Fragment>
      <NavAdmin title="Quản lý đơn hàng" />
      <TableContainer sx={{ mt: '60px' }} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Bàn</TableCell>
              <TableCell align="center">Thời gian đến</TableCell>
              <TableCell align="center">Trạng thái</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => {
              return (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="center">
                    {row.email}
                  </TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.table}</TableCell>
                  <TableCell align="center">{row.time}</TableCell>
                  <TableCell align="center">{row.status}</TableCell>
                  <TableCell align="center">{row.action}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}
