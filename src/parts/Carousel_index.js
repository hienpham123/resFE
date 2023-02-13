import { Button, Container } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Item from "../components/Item";

function Carousel(){
  const dataSlide = [
    {
      title: "Nhà Hàng Nhật Bản Hatoyama",
      path: '/upload/images/slideshow1.webp',
      'discription': "Các nguyên liệu tại Hatoyama tươi ngon được cam kết là hải sản từ biển Nhật vận chuyển về Việt Nam chỉ trong vòng 24h, làm nên chất lượng của nhà hàng Nhật ngon nhất Hà Nội. Ngoài nguồn nguyên liệu nhập khẩu từ biển Hokkaido thì yếu tố tạo nên sự mới mẻ và những món ăn ngon tại Hatoyama còn xuất phát từ nguồn hải sản hoàn toàn khắp 28 vùng biển Việt Nam cùng các loại hải sản đẳng cấp hàng đầu thế giới tại Nhà hàng siêu thị Thế Giới Hải Sản.",
      money: '399.000 vnd/ người',
      // address: '300 Hoàng Mai, Hà Nội'
    },
    {
      title: "Hệ thống Nhà hàng Phố 79",
      path: '/upload/images/slideshow2.webp',
      'discription': "Với lối kiến trúc Đông Dương độc đáo, sang trọng giao thoa giữa lối kiến trúc Châu Âu và đường nét truyền thống Việt Nam góp phần tôn lên nét tinh tế trong không gian ẩm thực giữa lòng Sài Gòn nhộn nhịp. Từng mảng vị trí trong nhà hàng đều được chăm chút cẩn thận, được chạm nét, sơn phủ bằng những chất liệu mang âm hưởng hoàng gia ấn tượng.",
      money: '399.000 vnd/ người',
      // address: '12 Mễ Trì Thượng, Nam Từ Liêm, Hà Nội'
    }
  ]
  
  const [indexSlide, setIndexSlide] = React.useState(0)

  React.useEffect(()=>{
    const handleTime = ()=>{
      setIndexSlide(prev => {
        if(prev >= dataSlide.length - 1)
        return 0;
        else return prev + 1;
      })
    }
    const timeOut = setInterval(handleTime, 10000)
    return ()=>{
      clearInterval(timeOut)
    }
  }, [])
  return (
    <Box className="slideShow" sx={{
      height: '370px',
      overflow: 'Hidden'
    }}>
      {
        dataSlide.map((data, index)=>
          <Box className={['item', index === indexSlide && 'show']} key={index}>
            <img style={{width: '100%'}} src={data.path} alt="" />
            <Box className={["disc"]}>
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
                <Box
                  sx={{
                      p: 0,
                      display: 'grid',
                      gridTemplateColumns: {
                          md: '1fr 1fr',
                      },
                      gap: 0,
                      width:'100%'
                  }}
                >
                  <Item>
                    <h2 className={index === indexSlide ? 'show' : 'hiddent'}>{data.title}</h2>
                    <p className={index === indexSlide ? 'discription show' : 'discription hiddent'}>{data.discription}</p>
                    {/* <p className={index === indexSlide ? 'show' : 'hiddent'}>{data.address}</p> */}
                    <Button className={index === indexSlide ? 'show' : 'hiddent'} sx={{mr:'15px'}} variant="outlined" color="inherit" size="large">
                    Đặt ngay
                    </Button>
                    <Button sx={{ background: "#f51167"}} className={index === indexSlide ? 'show' : 'hiddent'} variant="contained" color="secondary" size="large">
                    Chi tiết
                    </Button>
                    
                  </Item>
                  <Item>
                    <Box className={["circleRightS", index === indexSlide ? 'show' : 'hiddent']}>
                      <div>
                        <div>
                          <p>Từ</p>
                          <p>{data.money}</p>
                        </div>
                      </div>
                    </Box>
                  </Item>
                </Box>
               
              </Container>
            </Box>
          </Box>
        )
      }
      
    </Box>
  )

}

export default Carousel