import React from 'react';
import { Slide } from 'react-slideshow-image';
import ActionAreaCard from '../components/Card'
import axios from 'axios'

import 'react-slideshow-image/dist/styles.css'
import { Container } from '@mui/material';
const slideImages = [
  'upload/images/sp1.webp',
  'upload/images/sp2.webp',
  'upload/images/sp3.webp',
  'upload/images/sp4.webp',
  'upload/images/sp5.webp',
  'upload/images/sp6.webp',
];

const Slideshow = () => {
    const [dataProducts, setDataProducts] = React.useState([])
    React.useLayoutEffect(()=>{
        axios.get('http://localhost:8000/api/product/new')
        .then((response) => response)
        .then(function (data) {
            setDataProducts(data.data)
        });
    }, []);
    const fadeProperties = {
        duration: 3000,
        pauseOnHover: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        indicators: false
      };
      const style = {
        textAlign: 'center',
        fontSize: '30px',
        margin: '0px 5px'
      };
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
        }
    }}>
        <h2 style={{
            fontSize: '1.5rem',
            margin: '20px 0px 15px 0px',
            textAlign: 'center'
        }}>LATEST PRODUCTS</h2>
        <Slide className="LatestProduct" easing="ease" {...fadeProperties}>
          {dataProducts.map((prd)=>
            <div style={style} key={prd.code}>
              <ActionAreaCard name={prd.name} image={'http://localhost:8000/' + prd.images} price={prd.price} news hots={prd.is_top} slug={prd.slug} id={prd.id}/>
            </div>
          )}
        </Slide>
    </Container>
    )
};

export default Slideshow;