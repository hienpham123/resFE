import React from "react";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
export default function Alerts({alert, title}){
    setTimeout(()=>{
        document.getElementById('alerts').style.display = 'none'
    }, 3000)
    return (
        <Stack id="alerts" sx={{ 
            width: 'fit-content',
            position: 'absolute',
            zIndex: '9',
            right: '0px',
            top: '60px'
            }} spacing={2}>
            <Alert severity={alert}>
                <AlertTitle>{alert}</AlertTitle>
                {title}
            </Alert>
        </Stack>
    )
}