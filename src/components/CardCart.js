import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Box, Button, CardActionArea } from '@mui/material';
import Item from '../components/Item'
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import {styled} from '@mui/material'
import { Link } from "react-router-dom";

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
export default function CardCart({image, name}) {

  return (
    <Card sx={{ boxShadow: 0, width: 'auto', maxWidth: '300px'}}>
      <CardActionArea sx={{position: 'relative', display: 'flex'}}>
          <CardMedia
            component="img"
            height="auto"
            sx={{
                maxWidth: '99px'
            }}
            image={image}
            alt="green iguana"
          />
          <CardContent sx={{px:0}}>
            <Box
              sx={{

                  p: 0,
                  pl: '15px',
                  display: 'grid',
                  gridTemplateColumns: {
                      md: '10fr 2fr',
                  },
                  gap: 0,
                  width:'100%'
              }}>
                  <Item sx={{textAlign: 'left', p:'0 !important', wordBreak: 'break-all'}}>{name}</Item>
            </Box>
          </CardContent>
      </CardActionArea>
    </Card>
  );
}
