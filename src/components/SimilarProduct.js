// import React from 'react';
// import { Slide } from 'react-slideshow-image';
// import ActionAreaCard from '../components/Card'
// import axios from 'axios'

// import 'react-slideshow-image/dist/styles.css'
// import { Container } from '@mui/material';

// const SimilarProduct = ({id}) => {
//     const [dataProducts, setDataProducts] = React.useState([])
//     React.useEffect(()=>{
//         axios.get(`http://localhost:8000/api/product-similar/${id}`)
//         .then((response) => response)
//         .then(function (data) {
//             setDataProducts(data.data)
//         });
//     }, [id]);
//     const fadeProperties = {
//         duration: 3000,
//         pauseOnHover: true,
//         slidesToShow: 4,
//         slidesToScroll: 1,
//         indicators: false
//       };
//       const style = {
//         textAlign: 'center',
//         fontSize: '30px',
//         margin: '0px 5px'
//       };
//     return (
        
//       <Container sx={{
//         maxWidth:{
//             lg:"1240px",
//             md:'960px',
//             sm:'100%',
//             xs:'100%'
//         },
//         px:{
//             lg:"0px !important",
//             md:'0px !important',
//             sm:'15px !important',
//             xs:'15px !important'
//         }
//     }}>
//         <h2 style={{
//             fontSize: '1.5rem',
//             margin: '20px 0px 15px 0px',
//             textAlign: 'center'
//         }}>LATEST PRODUCTS</h2>
//         <Slide className="LatestProduct" easing="ease" {...fadeProperties}>
//           {dataProducts.map((prd)=>
//             <div style={style} key={prd.code}>
//               <ActionAreaCard name={prd.name} image={'http://localhost:8000/' + prd.images} price={prd.price} news hots={prd.is_top} slug={prd.slug} id={prd.id} />
//             </div>
//           )}
//         </Slide>
//     </Container>
//     )
// };

// export default SimilarProduct;