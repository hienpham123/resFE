import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Box, CardActionArea } from '@mui/material';
import { Button } from "@mui/material";
import { styled } from '@mui/material'
import { Link } from "react-router-dom";

const StyleLink = styled(Link)(({ theme }) => ({
  color: "black",
  display: 'block'
}))
export default function CardBlog({ image, desc, name, id }) {

  return (
    <Card sx={{ boxShadow: 0, bgcolor: "#fff0", color: "white", mb: '5px' }}>
      <CardActionArea>
        <StyleLink to={'/blog/' + id}>
          <Box
            sx={{
              p: 0,
              display: 'grid',
              gridTemplateColumns: {
                lg: '5fr 7fr',
                md: '3fr 9fr',
                sm: '1fr',
                xs: '1fr'
              },
              gap: 0,
              width: '100%'
            }}>
            <CardMedia
              component="img"
              image={image}
              alt="green iguana"
            />
            <CardContent sx={{ py: 0, position: "relative" }}>
              <span className='text-truncate' style={{ color: "#f51167", textTransform: "uppercase", maxWidth: "91%" }}>{name}</span>
              <span style={{
                display: 'block',
                fontSize: '12px',
                color: '#8f8f8f',
                marginBottom: '4px',
                marginTop: '24px',
                maxWidth: "100%",
                maxHeight: "72px",
                overflow: "hidden"
              }}>{desc}</span>
            </CardContent>
          </Box>
        </StyleLink>
      </CardActionArea>
    </Card>
  );
}
