import { Container } from '@mui/material'
import React from 'react'
import Item from "./Item"
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { baseURLImg } from "../utills/config";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { useEffect } from 'react';
import { axiosAuth } from '../utills/axios';
import SortObj from "./SortObj"
import SpDialog from "./SimpleDialog"
const emails = [{
  id: null,
  name: "Chưa chọn bàn"
}];

function Menu({ eating = [], restaurantId = false, table = false, isHours }) {

  const dataOld = {}
  const [action, setAction] = useState(false)
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[0]);
  const [selectedHours, setSelectedHours] = React.useState(0);
  const hoursSelected = []
  for (let i = Number(isHours[0]); i <= Number(isHours[1]); i++) {
    if (i <= 12) {
      hoursSelected.push(String(i) + "h AM")
    } else {
      hoursSelected.push(String(i - 12) + "h PM")
    }
  }
  useEffect(() => {
    if (table) {
      table.forEach(e => {
        emails.push({
          id: e.id,
          name: e.type
        })
      })
      if (localStorage.getItem("tableres" + restaurantId)) {
        setSelectedValue(JSON.parse(localStorage.getItem("tableres" + restaurantId)))
      }
    }
  }, [table])
  useEffect(() => {
    localStorage.setItem("tableres" + restaurantId, JSON.stringify(selectedValue))
  }, [selectedValue])
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleGetData = () => {
    if (selectedValue.id === null) {
      alert("Vui lòng chọn bàn")
      return
    }
    if (!localStorage.getItem("timeS" + restaurantId)) {
      alert("Vui lòng chọn giờ đến")
      return
    }
    console.log('eating', selectedValue.id, restaurantId);
    let bodyFormData = new FormData();
    bodyFormData.set('table_id', selectedValue.id);
    bodyFormData.set('restaurant_id', restaurantId);
    bodyFormData.set('arrival_time', localStorage.getItem("timeS" + restaurantId));
    axiosAuth.post("api/order", bodyFormData)
      .then((response) => response)
      .then(function (data) {
        if (data) {
          let dataOrderDetail = new FormData();
          dataOrderDetail.set('eats', localStorage.getItem("restaurant" + restaurantId));
          dataOrderDetail.set('order_id', data.data.id);
          axiosAuth.post("api/order-detail", dataOrderDetail)
            .then((response) => response)
            .then(function (data) {
              if (data) {
                alert("đã đặt bàn, vui lòng chờ xác nhận");
                let btn = []
                btn.push((<Button key={0} variant="contained">Đợi xác nhận</Button>))
                btn.push((<Button sx={{ ml: "15px" }} key={1} onClick={() => { handleCancel(data.data.order_id) }} variant="contained" color="error">Hủy</Button>))
                setBtnOrder(btn)
              }
            });
        }
      });
  }
  const handleCancel = (e) => {
    axiosAuth.post("/api/order/cancel/" + e)
      .then((response) => response)
      .then(function (data) {
        if (data) {
          alert("Đã hủy đơn");
          setBtnOrder([])
        }
      });
  }
  const [btnOrder, setBtnOrder] = useState([])

  console.log('btnOrder', btnOrder)
  let orderDetail = []
  React.useLayoutEffect(() => {
    axiosAuth.get(`/api/order`)
      .then((response) => response)
      .then(function (data) {
        let datas = data.data
        datas.sort(SortObj("id"))
        datas.every((e) => {
          if (e.restaurant_id == restaurantId) {
            if (e.status == 0) {
              let btn = []
              btn.push((<Button key={0} variant="contained">Đợi xác nhận</Button>))
              btn.push((<Button sx={{ ml: "15px" }} key={1} onClick={() => { handleCancel(e.id) }} variant="contained" color="error">Hủy</Button>))
              setBtnOrder(btn)
              return false
            }
            if (e.status == 1) {
              let btn = []
              btn.push((<Button key={2} variant="contained">Đã xác nhận</Button>))
              btn.push((<Button sx={{ ml: "15px" }} key={3} onClick={() => { handleCancel(e.id) }} variant="contained" color="error">Hủy</Button>))
              setBtnOrder(btn)
              return false
            }
          }
        })
      });
  }, [restaurantId]);
  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };
  let menuStg = {
    count: 0,
    sumPrice: 0,
    sumPriceD: 0
  }
  if (localStorage.getItem("restaurant" + restaurantId)) {
    let data = localStorage.getItem("restaurant" + restaurantId)
    data = JSON.parse(data)

    data.forEach(e => {
      dataOld[e.id] = e.quanlity
      menuStg.count += Number(e.quanlity)
      eating.forEach(val => {
        if (e.id === val.id) {
          menuStg.sumPrice += val.price * e.quanlity
          menuStg.sumPriceD += Math.round((val.price - val.price * val.discount / 100) * e.quanlity)
        }
      })
    })
  }

  const savedata = (id, val) => {

    let obj = [{
      id: id,
      quanlity: val
    }]

    let oldData = localStorage.getItem("restaurant" + restaurantId)
    if (oldData) {
      oldData = JSON.parse(oldData)
      let check = false
      oldData.forEach((e, key) => {
        if (e.id === id) {
          oldData[key] = obj[0]
          check = true
        }
      });
      if (!check) {
        oldData.push(obj[0])
      }
      oldData = JSON.stringify(oldData)
      localStorage.setItem("restaurant" + restaurantId, oldData)
    } else {
      obj = JSON.stringify(obj)
      localStorage.setItem("restaurant" + restaurantId, obj)
    }
    setAction(!action)
  }
  const handleAdd = (id) => {
    let isId = "count" + id
    let dom = document.getElementById(isId)
    dom.value = Number(dom.value) + 1
    savedata(id, dom.value)
  }

  const handleRemove = (id) => {
    let isId = "count" + id
    let dom = document.getElementById(isId)
    dom.value = Number(dom.value) - 1
    if (Number(dom.value) - 1 <= 0) {
      dom.value = 0
    }

    savedata(id, dom.value)
  }
  return (
    <Container sx={{
      maxWidth: {
        lg: "1240px",
        md: '960px',
        sm: '100%',
        xs: '100%'
      },
      px: {
        lg: "0px !important",
        md: '0px !important',
        sm: '15px !important',
        xs: '15px !important'
      },
      mt: '15px',
      mb: "15px",

      position: "relative"
    }}>
      <h2 className='titleMenu'>Danh sách món ăn</h2>
      <Box sx={{
        mt: '15px',
        display: 'grid',
        gridTemplateColumns: {
          lg: '1fr 1fr',
          md: '1fr 1fr',
          sm: '1fr',
          xs: '1fr'
        },
        gap: 0,
        maxHeight: "85vh",
        overflow: "scroll",
      }}>

        {eating.map((e, index) => (
          <Item key={e.id} className="listEatingDetail">
            <Card>

              <Box sx={{
                mt: '15px',
                display: 'grid',
                gridTemplateColumns: {
                  lg: '1fr 2fr 1fr',
                  md: '1fr 2fr 1fr',
                  sm: '1fr 2fr 1fr',
                  xs: '1fr 2fr 1fr'
                },
                gap: 0,
              }}>
                <Item>
                  <CardMedia
                    component="img"
                    height="140"
                    image={baseURLImg + e.images[0].path}
                    alt="green iguana"
                  />
                </Item>
                <Item>
                  <CardContent sx={{ padding: "0px" }}>
                    <Typography gutterBottom variant="h5" component="div" sx={{ textTransform: "capitalize" }}>
                      {e.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" title={e.description} sx={{}}>
                      {e.description}
                    </Typography>
                  </CardContent>
                </Item>
                <Item>
                  <div className='price'>
                    <p className="old">{e.price}<sup>đ</sup></p>
                    <p className="new">{Math.round(e.price - e.price * e.discount / 100)}<sup>đ</sup></p>
                  </div>
                  <div>
                    <ButtonGroup size="small" variant="contained" aria-label="outlined primary button group">
                      <Button onClick={() => { handleRemove(e.id) }}><RemoveIcon /></Button>
                      <TextField
                        className='inputCount'
                        id={"count" + e.id}
                        type="number"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant="filled"
                        value={dataOld[e.id] ? dataOld[e.id] : 0}
                      />
                      <Button onClick={() => { handleAdd(e.id) }}><AddIcon /></Button>
                    </ButtonGroup>
                  </div>
                </Item>
              </Box>
            </Card>
          </Item>
        ))}
      </Box>
      <div className='menuSumBuy'>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableBody>
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Số lượng món ăn
                </TableCell>
                <TableCell align="right" sx={{ color: "#f51167", fontWeight: "bold" }}>{menuStg.count}</TableCell>
              </TableRow>
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Giá tiền
                </TableCell>
                <TableCell align="right"><del>{menuStg.sumPrice}</del> <span style={{ color: "#f51167", fontWeight: "bold" }}>{menuStg.sumPriceD}</span></TableCell>
              </TableRow>
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Chọn bàn
                </TableCell>
                <TableCell align="right" sx={{ cursor: 'pointer', display: 'flex' }}>
                  <div onClick={handleClickOpen}>
                    <Typography variant="subtitle1" component="div" sx={{ color: "#f51167" }}>
                      {selectedValue.name}
                    </Typography>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Chọn Giờ đến
                </TableCell>
                <TableCell align="right" sx={{ cursor: 'pointer', display: 'flex' }}>
                  <SpDialog restaurantId={restaurantId} datas={hoursSelected.length > 0 ? hoursSelected : [0]} />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{ width: "100%", textAlign: "center", marginTop: "15px" }}>
          {
            btnOrder.length > 0 ? btnOrder.map((e) => { return e }) : <Button onClick={handleGetData} variant="contained">Đặt bàn</Button>
          }

        </div>
      </div>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </Container>
  )
}

export default Menu


function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Chọn bàn</DialogTitle>
      <List sx={{ pt: 0 }}>
        {emails.map((email, index) => (
          <ListItem button onClick={() => handleListItemClick(email)} key={email.id}>
            <ListItemText primary={email.name} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}
SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.object.isRequired,
};