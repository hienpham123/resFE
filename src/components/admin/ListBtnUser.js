// manage user

import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { axiosAuth, axiosInstance } from "../../utills/axios";
import { useNavigate } from 'react-router-dom';
import Alert from '../../parts/admin/Alert';
export default function ListBtnUser({ role, action = ()=>{}, id }) {
    const navigate = useNavigate()
    console.log(role)
    const setVendor = () => {
        axiosAuth.post("/api/admin/user/set-vendor/" + id)
            .catch(err => console.log(err))
            .then(res => {
                if (res['data'].msg === "true")
                    action()
            })

    }

    const setUser = () => {
        axiosAuth.post("/api/admin/user/set-user/" + id)
            .catch(err => console.log(err))
            .then(res => {
                if (res['data'].msg === "true")
                    action()
            })

    }
    return (
        <Stack spacing={2} direction="row" sx={{ width: 'fit-content', margin: '0px auto' }}>
            {role === 0 && (<Button onClick={setVendor} variant="contained" color='error'>Set Vendor</Button>)}
            {role === 2 && (<Button onClick={setUser} variant="contained" color='error'>Set User</Button>)}
        </Stack>
    );
}