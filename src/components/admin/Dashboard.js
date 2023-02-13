import React from 'react'
import { useLayoutEffect } from 'react';
import BarChart from './BarChart'
import { axiosAuth } from "../../utills/axios";
import { useState } from 'react';
import TableDashboard from './TableDashboard';
export default function DashBoard() {
    const [sumBuy, setSumBuy] = useState([])
    const [sumOrder, setSumOrder] = useState([])
    const [user, setUser] = useState(false)

    useLayoutEffect(() => {
        axiosAuth.get("/api/order-ofres")
            .catch(error => console.log(error))
            .then(res => {
                console.log(res["data"])
                let datas = res["data"]
                let sumOld = 0
                let sumNow = 0
                datas["old"].map((e) => {
                    sumOld += e.sum
                })
                datas["now"].map((e) => {
                    sumNow += e.sum
                })
                setSumBuy([sumOld, sumNow])
                setSumOrder([datas["old"].length, datas["now"].length])
            })
        axiosAuth.get("/api/user")
            .catch(error => console.log(error))
            .then(res => {
                setUser(res["data"])
            })
    }, [])
    return (
        <>
            {user?.role == 1 ? <TableDashboard /> : <BarChart sumBuy={sumBuy} sumOrder={sumOrder} />}
        </>
    )
}