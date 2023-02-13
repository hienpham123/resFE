import * as React from 'react';
import { useState } from 'react';
import { useLayoutEffect } from 'react';
import { useParams, Link } from 'react-router-dom'
import { axiosInstance } from "../utills/axios";
import { baseURLImg } from "../utills/config";
import { Container } from "@mui/material";
import Box from '@mui/material/Box';
import Item from '../components/Item'
export default function BlogDetail() {
    const params = useParams()
    const [blog, setBlog] = useState(false)
    useLayoutEffect(() => {
        axiosInstance.get('/api/blog/' + params.id)
            .then((response) => response)
            .then(function (data) {
                setBlog(data.data)
            });
    }, []);
    return (
        <Container sx={{
            maxWidth: {
                lg: "1240px",
                md: '960px',
                sm: '100%',
                xs: '100%'
            },
            px: {
                lg: "0px !important",
                md: '0px !important',
                sm: '15px !important',
                xs: '15px !important'
            },
            mt: '15px'
        }}>
            <h1 style={{ fontSize: "2.5em", textAlign: "center", marginBottom: '15px' }}>{blog.title}</h1>
            <Box
              component="form"
              sx={{
                mt: '15px',
                p: 0,
                display: 'grid',
                gridTemplateColumns: {
                  lg: '5fr 7fr',
                  md: '5fr 7frr',
                  sm: '6fr 6fr',
                  xs: '1fr',
                },
                gap: 0,
                width: '100%',
              }}
            >
                <Item>
                <img src={blog ? baseURLImg + blog.images[0].path : ""} style={{ width: "100%" }} />
                </Item>
                <Item>
                {blog.content}
                </Item>
            </Box>
            {/* <aside style={{
                color: "gray",
                fontStyle: "italic",
                textAlign: "end"
            }}>
                <h3>Thông tin bài viết</h3>
                <ul>
                    <li>Người Đăng: {blog ? blog.user.name : ""}</li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </aside> */}
        </Container>
    )
}