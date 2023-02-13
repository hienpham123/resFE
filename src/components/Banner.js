import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
function Banner({title, disc, color, path}){


    return (
        <Box className="Banner">
            <img style={{width: '100%'}} src={path} />
            <div className="BannerBody">
                <h3>{title}</h3>
                <h5>{disc}</h5>
                <Button variant="contained" sx={{bgcolor:'#f51167', mt:'9px'}}>
                SHOW NOW
                </Button>
            </div>
            <Stack className="bannerChip" direction="row" spacing={1}>
                <Chip label="New" color={color} />
            </Stack>
        </Box>
    )
}

export default Banner