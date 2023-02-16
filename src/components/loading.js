import { Container } from "@mui/material";
import React from "react";
import ReactLoading from "react-loading";

const Loader = ({ type, color }) => (
  <Container
    style={{
      display: "flex",
      justifyContent: "center",
      marginTop: "10%",
      marginBottom: "10%",
    }}
  >
    <ReactLoading type={"bubbles"} color={"black"} height={"5%"} width={"5%"} />
  </Container>
);

export default Loader;
