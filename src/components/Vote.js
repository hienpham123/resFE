import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import { axiosAuth } from "../utills/axios";
import SortObj from "./SortObj"
function showvoteS(maxStar = 0) {
    const listStar = [];
    for (let i = 0; i < 5; i++) {
        maxStar <= i ?
            listStar.push(<StarOutlineRoundedIcon key={i} className='star' style={{ color: "black" }} />) :
            listStar.push(<StarRoundedIcon key={i} className='star' />)
    }
    return listStar
}
export default function Vote({ votes = [], restaurant_id = false, load = () => { } }) {
    const [value, setValue] = React.useState(5);
    const [description, setDescription] = React.useState("");

    const handleChange = (e) => {
        setDescription(e.value)
    }
    votes.sort(SortObj("id"))
    const handleClick = () => {
        let bodyFormData = new FormData();
        bodyFormData.set('vote', value);
        bodyFormData.set('discription', description);
        bodyFormData.set('restaurant_id', restaurant_id);
        axiosAuth.post("api/vote", bodyFormData)
            .then((response) => response)
            .then(function (data) {
                load()
            });
    }
    return (
        <>
            <Box
                id="danhgia"
                sx={{
                    '& > legend': { mt: 2 }
                }}
                className="voteres"
            >
                <Typography component="legend">Đánh Giá Nhà hàng</Typography>
                <Rating
                    sx={{ fontSize: "3rem" }}
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                />
                <div style={{ width: "100%" }}>
                    <TextareaAutosize
                        aria-label="minimum height"
                        minRows={3}
                        placeholder="Nhận xét về nhà hàng"
                        value={description}
                        style={{ width: "100%" }}
                        onChange={e => { handleChange(e.target) }}
                    />

                </div>
                <Button variant="contained" onClick={() => { handleClick() }}>Đánh giá</Button>
            </Box>

            <Box>
                <h3>Những đánh giá</h3>
                <div>
                    {votes.map((e, index) => {
                        return <Card key={index} sx={{ minWidth: 275, mb: "7px" }}>
                            <CardContent>

                                <Typography variant="h5" component="div">
                                    {e.is_user.name}
                                </Typography>
                                <Typography sx={{ fontSize: 14, color: "#faaf00" }} gutterBottom>
                                    {showvoteS(Number(e.vote)).map(e => e)}
                                </Typography>
                                <Typography variant="body2">
                                    {e.discription}
                                </Typography>
                            </CardContent>
                        </Card>
                    })}

                </div>
            </Box>
        </>
    );
}
