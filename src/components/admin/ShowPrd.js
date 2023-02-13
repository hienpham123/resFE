// manage restaurant

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { axiosAuth, axiosInstance } from "../../utills/axios";
import ListBtn from './ListBtnSPrd'
import NavAdmin from '../../parts/admin/NavAdmin';
import Alerts from '../../parts/admin/Alert';
import ModalRestaurant from './ModalRestaurant';
import ModalRestaurantTable from './ModalRestaurantTable';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { Tooltip } from '@mui/material';
function createData(name, email, phone, time, action) {
  return { name, time, phone, email, action };
}



export default function BasicTable() {
  const [product, setProduct] = React.useState([])
  const prdAciton = JSON.parse(localStorage.getItem('actionPrd'))
  const [action, setAction] = React.useState(false)

  const isAction = () => {
    setAction(!action)
  }
  React.useEffect(() => {
    axiosAuth.get('/api/user')
      .catch(err => console.log(err))
      .then(res => {
        // setCart(res['data'])
        if (res['data'].role == 1) {
          axiosAuth.get("/api/restaurant")
            .catch(error => console.log(error))
            .then(res => {
              setProduct(res['data'].restaurant)
            })
        } else {
          axiosAuth.get("/api/my-restaurant")
            .catch(error => console.log(error))
            .then(res => {
              console.log(res['data'])
              setProduct(res['data'])
            })
        }
      })

  }, [action])

  const handleDelete = (id) => {
    let check = window.confirm("Bạn thức sự muốn xóa nhà hàng")
    if (check) {
      axiosAuth.delete("/api/restaurant/" + id)
        .catch(error => console.log(error))
        .then(res => {
          alert(res['data'])
          setAction(!action)
        })
    }
  }

  const rows = [];
  if (product) {
    product.map((data) => {
      let time = data.time_start + " - " + data.time_end
      const actionBtn = (
        <div style={{ display: "inline-flex", textAlign: "center" }}>
          <Tooltip title="Xóa nhà hàng">
            <Button sx={{ ml: "7px", mr: "7px" }} onClick={() => { handleDelete(data.id) }} variant='contained' color="error"><DeleteIcon /></Button>
          </Tooltip>
          <ModalRestaurant id={data.id} isAction={isAction} />
          <ModalRestaurantTable id={data.id} />
        </div>
      )
      let phone = ""
      if (data.user.infor) {
        phone = data.user.infor.phone
      }
      rows.push(createData(data.name, data.user.email, phone, time, actionBtn))
    })
  }
  return (

    <React.Fragment>
      {/* {prdAciton.status == 1 && <Alerts alert={prdAciton.action} title="deleted" />} */}
      <NavAdmin title="Quản lý nhà hàng" />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">email</TableCell>
              <TableCell align="center">Số điện thoại</TableCell>
              <TableCell align="center">Thời gian mở cửa</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{row.phone}</TableCell>
                <TableCell align="center">{row.time}</TableCell>
                <TableCell align="center">{row.action}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}
