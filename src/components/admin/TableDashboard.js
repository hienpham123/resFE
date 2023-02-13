// manage doanh thu

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { axiosAuth } from "../../utills/axios";
import { useLayoutEffect } from 'react';
function createData(name, sum, done, doi, da, cancel, sumbuy) {
    return { name, sum, done, doi, da, cancel, sumbuy };
}




function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    return [year, month].join('-');
}

export default function TableDashboard() {
    const rows = [];
    const d = new Date();
    const [dateN, setDateN] = useState(formatDate(d))
    const [data, setData] = useState([])
    useLayoutEffect(() => {
        axiosAuth.get('/api/admin/order-by-date/' + dateN)
            .catch(err => console.log(err))
            .then(res => {
                setData(res["data"])
            })
    }, [dateN])
    data.map((e) => {
        rows.push(createData(e.ten_cua_hang, e.tong_order, e.order_thanh_cong, e.order_doi_xac_nhan, e.order_da_XN, e.order_huy, e.doanh_thu))
    })
    return (
        <>
            <Box>
                <TextField
                    type={"month"}
                    sx={{ width: '100%' }}
                    id="outlined-time-start"
                    label="Tháng"
                    value={dateN}
                    onChange={e => setDateN(e.target.value)}
                />
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Tên nhà hàng</TableCell>
                            <TableCell align="center">Tổng order</TableCell>
                            <TableCell align="center">Thành công</TableCell>
                            <TableCell align="center">Đợi xác nhận</TableCell>
                            <TableCell align="center">Đã xác nhận</TableCell>
                            <TableCell align="center">Đã hủy</TableCell>
                            <TableCell align="right">Tổng doanh thu</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="center">{row.sum}</TableCell>
                                <TableCell align="center">{row.done}</TableCell>
                                <TableCell align="center">{row.doi}</TableCell>
                                <TableCell align="center">{row.da}</TableCell>
                                <TableCell align="center">{row.cancel}</TableCell>
                                <TableCell align="right">{row.sumbuy}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
