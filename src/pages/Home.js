import { Box } from "@mui/system";
import React, { useState } from "react";
import { Container } from "@mui/material";

// component
import Features from '../components/Features'
import Carousel from '../parts/Carousel_index'
import TopSelling from "../components/TopSelling";
import ListBlogHome from "../components/ListBLogHome";
function Home(){
    document.title = "restaurant"
    return (
        <React.Fragment>
            <Carousel />
            <Features />
            <TopSelling />
            <ListBlogHome />
        </React.Fragment>
    )
}

export default Home