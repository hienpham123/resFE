// manage user

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
import ListBtnUser from './ListBtnUser';
function createData(name, email, role, action) {
    return { name, email, role, action };
}

export default function User() {
    const [cart, setCart] = React.useState(false);
    const [action, setAction] = React.useState(false);
    const isSetAction = ()=>{
        setAction(!action)
    }
    React.useEffect(() => {
        axiosAuth.get('/api/admin/user')
            .catch(err => console.log(err))
            .then(res => {
                setCart(res["data"])
            })
    }, [action])
    const rows = [];
    if(cart){
        cart.map((value) => {
            console.log('value', value)
            let role = ""
            console.log("role", value.role)
            if(Number(value.role) == 0){
                role = "user"
            }
            if(Number(value.role) == 1){
                role = "admin"
            }
            if(Number(value.role) == 2){
                role = "Nhà hàng"
            }
            let data = createData(value.name, value.email, role,  <ListBtnUser id={value.id} action={isSetAction} role={Number(value.role)} />)
            rows.push(data)
        })
    }
    // console.log(cart)
    return (
        <React.Fragment>
            <NavAdmin title="Quản lý người dùng" />
            <TableContainer sx={{ mt: '60px' }} component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Loại</TableCell>
                            <TableCell align="center">Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows ? rows.map((row, index) => {
                            console.log(row)
                            return (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" align="center">
                                        {row.email}
                                    </TableCell>
                                    <TableCell align="center">{row.name}</TableCell>
                                    <TableCell align="center">
                                        {row.role}
                                    </TableCell>
                                    <TableCell align="center">{row.action}</TableCell>
                                </TableRow>
                            )
                        }): ""}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    );
}
