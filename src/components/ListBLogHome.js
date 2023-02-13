import { Container } from "@mui/material";
import React from "react";
import Box from '@mui/material/Box';
import { axiosInstance } from "../utills/axios";
import { baseURLImg } from "../utills/config";
import CardBlog from "./CardBlog";
import Item from '../components/Item'
import SortObj from "./SortObj"
export default function ListBlogHome() {
    const [blogs, setBlogs] = React.useState(false)
    React.useLayoutEffect(() => {
        axiosInstance.get('/api/blog')
            .then((response) => response)
            .then(function (data) {
                setBlogs(data.data)
            });
    }, []);
    if (blogs) {
        blogs.sort(SortObj("id"))
    }
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
            <h2 className="titleIndex">Các bài viết nổi bật</h2>
            <Box
                sx={{
                    p: 0,
                    display: 'grid',
                    gridTemplateColumns: {
                        lg: '1fr 1fr 1fr',
                        md: '1fr 1fr 1fr',
                        sm: '1fr 1fr',
                        xs: '1fr'
                    },
                    gap: 0,
                    width: '100%'
                }}
            >
                {blogs && blogs.map((blog) => {
                    return <Item sx={{ px: "3px" }} key={blog.id}>
                        <CardBlog
                            name={blog.title}
                            image={baseURLImg + blog.images[0].path}
                            desc={blog.description}
                            id={blog.id}
                        />
                    </Item>
                }
                )}
            </Box>
        </Container>
    )

}