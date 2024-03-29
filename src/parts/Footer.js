import { Box } from "@mui/system";
import React from "react";
import { Button, Container } from "@mui/material";
import InputUnstyled, { InputUnstyledProps } from "@mui/base/InputUnstyled";
import { styled } from "@mui/system";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
// component
import Item from "../components/Item";
import CardBlog from "../components/CardBlog";
// scss
import "../assets/scss/app.scss";
import { grey } from "./model";

function Footer() {
  const slideImages = [
    "upload/images/sp1.webp",
    "upload/images/sp2.webp",
    "upload/images/sp3.webp",
    "upload/images/sp4.webp",
    "upload/images/sp5.webp",
    "upload/images/sp6.webp",
  ];
  const CustomInput = React.forwardRef(function CustomInput(
    props: InputUnstyledProps,
    ref: React.ForwardedRef<HTMLDivElement>
  ) {
    return (
      <InputUnstyled
        components={{ Input: StyledInputElement }}
        {...props}
        ref={ref}
      />
    );
  });
  const StyledInputElement = styled("input")(
    ({ theme }) => `
        width: -webkit-fill-available;
        font-size: 0.875rem;
        font-family: IBM Plex Sans, sans-serif;
        font-weight: 400;
        line-height: 1.5;
        color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
        background: #fff;
        border: 1px solid ${
          theme.palette.mode === "dark" ? grey[800] : grey[300]
        };
        border-radius: 5px;
        padding: 5px 9px;
      
        &:focus {
          outline: 3px solid #fff0;
        }
      `
  );
  return (
    <React.Fragment>
      <footer className="footer">
        <Box sx={{ borderBottom: "1px solid gray" }}>
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
                  lg: "1fr 1fr 1fr 1fr",
                  md: "1fr 1fr 1fr 1fr",
                  sm: "1fr 1fr",
                  xs: "1fr",
                },
                marginLeft: "350px",
                gap: 0,
                width: "100%",
              }}
            >
              <Item sx={{ pl: "0 !important" }}>
                <h3 className="titleFooter">ABOUT</h3>
                <p style={{ marginBottom: "15px" }}>
                  Chúng tôi giúp các bạn tìm nhà hàng 1 cách thuận tiện nhanh
                  chóng và an toàn về thanh toán, và sản phẩm.
                </p>
                <img
                  style={{ marginBottom: "15px" }}
                  src="upload/images/cardpay.png"
                />
                <div style={{ marginBottom: "15px" }} className="FtSubs">
                  <CustomInput
                    type="email"
                    aria-label="Demo input"
                    placeholder="Nhập email nhận thông báo"
                  />
                  <Button
                    variant="text"
                    sx={{ color: "red", fontSize: "14px" }}
                  >
                    Xác nhận
                  </Button>
                </div>
              </Item>
              <Item sx={{ pl: "0 !important" }}>
                <h3 className="titleFooter">CONTACT</h3>
                <div style={{ marginBottom: "15px", display: "flex" }}>
                  <span style={{ color: "red", marginRight: "15px" }}>
                    Admin:
                  </span>
                  <span style={{ color: "#8f8f8f" }}>Hiển Hồ</span>
                </div>
                <div style={{ marginBottom: "15px", display: "flex" }}>
                  <span style={{ color: "red", marginRight: "15px" }}>
                    Address:
                  </span>
                  <span style={{ color: "#8f8f8f" }}>
                    521 Cổ Nhuế, Bắc Từ Liêm, HN
                  </span>
                </div>
                <div style={{ marginBottom: "15px", display: "flex" }}>
                  <span style={{ color: "red", marginRight: "15px" }}>
                    Tel:
                  </span>
                  <span style={{ color: "#8f8f8f" }}>+84965032472</span>
                </div>
                <div style={{ marginBottom: "15px", display: "flex" }}>
                  <span style={{ color: "red", marginRight: "15px" }}>
                    Email:
                  </span>
                  <span style={{ color: "#8f8f8f" }}>
                    phamthehien2303@gmail.com
                  </span>
                </div>
              </Item>
            </Box>
          </Container>
        </Box>
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
          <Box sx={{ py: "10px", display: "flex", marginLeft: "12%" }}>
            <div
              style={{ display: "flex", marginRight: "10px" }}
              className="listMxh"
            >
              <InstagramIcon
                sx={{ mr: "7px", fontSize: "30px" }}
                className="icon"
              />
              <span
                style={{
                  alignSelf: "center",
                  fontSize: "1.25rem",
                  textTransform: "uppercase",
                }}
              >
                Instagram
              </span>
            </div>
            <div
              style={{ display: "flex", marginRight: "10px" }}
              className="listMxh"
            >
              <PinterestIcon
                sx={{ mr: "7px", fontSize: "30px" }}
                className="icon"
              />
              <span
                style={{
                  alignSelf: "center",
                  fontSize: "1.25rem",
                  textTransform: "uppercase",
                }}
              >
                PINTEREST
              </span>
            </div>
            <div
              style={{ display: "flex", marginRight: "10px" }}
              className="listMxh"
            >
              <FacebookIcon
                sx={{ mr: "7px", fontSize: "30px" }}
                className="icon"
              />
              <span
                style={{
                  alignSelf: "center",
                  fontSize: "1.25rem",
                  textTransform: "uppercase",
                }}
              >
                Facebook
              </span>
            </div>
            <div
              style={{ display: "flex", marginRight: "10px" }}
              className="listMxh"
            >
              <TwitterIcon
                sx={{ mr: "7px", fontSize: "30px" }}
                className="icon"
              />
              <span
                style={{
                  alignSelf: "center",
                  fontSize: "1.25rem",
                  textTransform: "uppercase",
                }}
              >
                Twitter
              </span>
            </div>
            <div
              style={{ display: "flex", marginRight: "10px" }}
              className="listMxh"
            >
              <YouTubeIcon
                sx={{ mr: "7px", fontSize: "30px" }}
                className="icon"
              />
              <span
                style={{
                  alignSelf: "center",
                  fontSize: "1.25rem",
                  textTransform: "uppercase",
                }}
              >
                YOUTUBE
              </span>
            </div>
            <div
              style={{ display: "flex", marginRight: "10px" }}
              className="listMxh"
            >
              <LinkedInIcon
                sx={{ mr: "7px", fontSize: "30px" }}
                className="icon"
              />
              <span
                style={{
                  alignSelf: "center",
                  fontSize: "1.25rem",
                  textTransform: "uppercase",
                }}
              >
                LinkedIn
              </span>
            </div>
          </Box>
        </Container>
        <h2 style={{ margin: "15px 0px", textAlign: "center" }}>
          Copyright ©2023 All rights reserved | Developed By &nbsp;
          <a
            style={{ color: "red" }}
            href="https://www.facebook.com/hiendzvlone2303/"
            target="blank"
          >
            Hiển Hồ
          </a>
        </h2>
      </footer>
    </React.Fragment>
  );
}
export default Footer;
