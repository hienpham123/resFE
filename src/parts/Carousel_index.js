import { Button, Container } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Item from "../components/Item";
import { dataSlide } from "./model";

function Carousel() {
  const [indexSlide, setIndexSlide] = React.useState(0);

  React.useEffect(() => {
    const handleTime = () => {
      setIndexSlide((prev) => {
        if (prev >= dataSlide.length - 1) return 0;
        else return prev + 1;
      });
    };
    const timeOut = setInterval(handleTime, 10000);
    return () => {
      clearInterval(timeOut);
    };
  }, []);
  return (
    <Box
      className="slideShow"
      sx={{
        height: "750px",
        overflow: "Hidden",
      }}
    >
      {dataSlide.map((data, index) => (
        <Box className={["item", index === indexSlide && "show"]} key={index}>
          <img style={{ width: "100%" }} src={data.path} alt="" />
          <Box className={["disc"]}>
            <Container
              sx={{
                maxWidth: {
                  lg: "1240px",
                  md: "960px",
                  sm: "100%",
                  xs: "100%",
                },
                px: {
                  lg: "0px !important",
                  md: "0px !important",
                  sm: "15px !important",
                  xs: "15px !important",
                },
              }}
            >
              <Box
                sx={{
                  p: 0,
                  display: "grid",
                  gridTemplateColumns: {
                    md: "1fr 1fr",
                  },
                  gap: 0,
                  width: "100%",
                  marginTop: "180px",
                }}
              >
                <Item>
                  <h2 className={index === indexSlide ? "show" : "hiddent"}>
                    {data.title}
                  </h2>
                  <p
                    className={
                      index === indexSlide
                        ? "discription show"
                        : "discription hiddent"
                    }
                  >
                    {data.discription}
                  </p>
                  {/* <p className={index === indexSlide ? 'show' : 'hiddent'}>{data.address}</p> */}
                  <Button
                    className={index === indexSlide ? "show" : "hiddent"}
                    sx={{ mr: "15px" }}
                    variant="outlined"
                    color="inherit"
                    size="large"
                  >
                    Đặt ngay
                  </Button>
                  <Button
                    sx={{ background: "#f51167" }}
                    className={index === indexSlide ? "show" : "hiddent"}
                    variant="contained"
                    color="secondary"
                    size="large"
                  >
                    Chi tiết
                  </Button>
                </Item>
                <Item>
                  <Box
                    className={[
                      "circleRightS",
                      index === indexSlide ? "show" : "hiddent",
                    ]}
                  >
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
      ))}
    </Box>
  );
}

export default Carousel;
