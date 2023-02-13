import { Container } from "@mui/material";
import React from "react";
import Box from '@mui/material/Box';
import { axiosInstance } from "../utills/axios";
import { baseURLImg } from "../utills/config";

import Item from '../components/Item'
import ActionAreaCard from '../components/Card'
function TopSelling(){
    const [eating, setEating] = React.useState(false)
    React.useLayoutEffect(()=>{
        axiosInstance.get('/api/eating/top-discount')
        .then((response) => response)
        .then(function (data) {
            setEating(data.data)
        });
    }, []);
    return (
        <Container sx={{
            maxWidth:{
                lg:"1240px",
                md:'960px',
                sm:'100%',
                xs:'100%'
            },
            px:{
                lg:"0px !important",
                md:'0px !important',
                sm:'15px !important',
                xs:'15px !important'
            },
            mt: '15px'
        }}>
            <h2 className="titleIndex">Giảm giá nhiều nhất</h2>
            <Box
            sx={{
                p: 0,
                display: 'grid',
                gridTemplateColumns: { 
                    lg: '1fr 1fr 1fr 1fr',
                    md: '1fr 1fr 1fr',
                    sm: '1fr 1fr',
                    xs: '1fr'
                },
                gap: 0,
                width:'100%'
            }}
            >
                {eating && eating.map((prd)=>{
                    return <Item sx={{px:"3px"}} key={prd.id}>
                        <ActionAreaCard 
                        name={prd.name} 
                        image={baseURLImg + prd.images[0].path} 
                        price={prd.price} 
                        news={prd.new} 
                        hots={prd.discount}
                        slug={prd.restaurant.slug}
                        id={prd.id}
                        />
                    </Item>
                }
                )}
            </Box>
        </Container>
    )

}

export default TopSelling