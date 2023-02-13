import * as React from 'react';
import { Box } from "@mui/system";
import Item from "../components/Item";
import PaymentIcon from '@mui/icons-material/Payment';
import { Container } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
function Features() {
    return (
        <Box sx={{background: 'rgb(238, 238, 238)'}}>
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
            }}>
                <Box className="listFeature"
                    sx={{
                        p: 0,
                        display: 'grid',
                        gridTemplateColumns: { 
                            md: '1fr 1fr 1fr',
                        },
                        gap: 0,
                        width:'100%'
                    }}
                > 
                <Item>
                    <div>
                        <PaymentIcon /> 
                        <span>Thanh toán an toàn nhanh chóng</span>
                    </div>
                </Item>
                <Item>
                    <div>
                        <StarBorderIcon /> 
                        <span>Sản phẩm cao cấp</span>
                    </div>
                </Item>
                <Item>
                    <div>
                        <LocalShippingIcon /> 
                        <span>Phục vụ tận tình</span>
                    </div>
                </Item>
                </Box>
            </Container>
        </Box>
        
        
    );
  }

export default Features