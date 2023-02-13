import React from 'react'
import { useParams } from 'react-router-dom'
import { Container } from '@mui/material'
import { Box } from '@mui/system'
import Item from './Item'
import { baseURLImg } from "../utills/config";
import { axiosInstance } from "../utills/axios";
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import MapBox from "./MapBox"
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import MonetizationOnRoundedIcon from '@mui/icons-material/MonetizationOnRounded';
import SortObj from "./SortObj"
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import Menu from "./Menu"
import Vote from "./Vote"
function RestaurantDetail() {
    const [action, setAction] = React.useState(false)
    const params = useParams()
    const [dataProducts, setDataProducts] = React.useState(false)
    const [tbVote, setTBVote] = React.useState(0)
    React.useLayoutEffect(() => {
        axiosInstance.get(`/api/restaurant/${params.slug}`)
            .then((response) => response)
            .then(function (data) {
                setDataProducts(data.data.restaurant)
            });
    }, [action, params]);
    React.useLayoutEffect(()=>{
        if (dataProducts) {
            let vote = dataProducts.vote
            let sum = 0
            vote.map((e) => {
                sum += Number(e.vote)
            })
            setTBVote(Math.round(sum / vote.length) + 1)
        }
    }, [dataProducts])
    const handleClick = () => {
        setAction(!action)
    }
    dataProducts ? document.title = "Restaurant | " + dataProducts.name : document.title = "Restaurant | "
    const listStar = [];
    const maxStar = tbVote
    for (let i = 0; i < 5; i++) {
        maxStar - 1 <= i ?
            listStar.push(<StarOutlineRoundedIcon key={i} className='star' style={{ color: "black" }} />) :
            listStar.push(<StarRoundedIcon key={i} className='star' />)
    }
    var textTime = "Đóng cửa"
    let listTimeS = 0
    let listTimeE = 0
    if (dataProducts) {
        dataProducts.menu.sort(SortObj("price", "desc"))
        const d = new Date()
        const Hnow = d.getHours();
        const Mnow = d.getMinutes();
        const Snow = d.getSeconds();
        listTimeS = dataProducts.time_start.split(":")
        listTimeE = dataProducts.time_end.split(":")
        if (Hnow >= listTimeS[0] && Hnow <= listTimeE[0]) {
            if (Mnow >= listTimeS[1] && Mnow < listTimeE[1]) {
                if (Snow >= listTimeS[2] && Snow < listTimeE[2]) {
                    textTime = "Mở cửa"
                }
            }
        }

    }
    let isHours = [listTimeS[0], listTimeE[0]]
    console.log(isHours)
    console.log(dataProducts)

    return (
        <React.Fragment>
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
                <Box sx={{
                    mt: '15px',
                    display: 'grid',
                    gridTemplateColumns: {
                        lg: '4fr 6fr',
                        md: '6fr 7fr',
                        sm: '5fr 5fr',
                        xs: '1fr'
                    },
                    gap: 0,
                }}>
                    <Item sx={{ px: 0 }}>
                        <Box>
                            {dataProducts.images
                                &&
                                (<img alt="ảnh nhà hàng" id='ImgMainPrdDt' style={{ width: '100%', maxHeight: "340px" }} src={baseURLImg + dataProducts.images[0].path} />)}
                        </Box>
                    </Item>
                    <Item>
                        <h2 style={{ fontSize: '1.5rem', textTransform: 'uppercase', fontWeight: '600', marginBottom: '10px', color: "#f51167" }}>{dataProducts.name}</h2>
                        <p style={{ fontSize: ".75rem" }}>{dataProducts ? dataProducts.is_address.detail + ", "
                            + dataProducts.is_address.is_wards.name + ", "
                            + dataProducts.is_address.is_district.name + ", "
                            + dataProducts.is_address.is_city.name + "."
                            : "Null"} <a href='#map' style={{ color: "blue" }}>&nbsp;Xem Trên bản đồ</a></p>
                        <p className='vote'>
                            {listStar.map(val => val)}
                            <span style={{ color: "red", fontWeight: "bold" }}>({dataProducts ? dataProducts.vote.length : "0"})</span>
                            <a href='#danhgia' style={{ color: "blue" }}>&nbsp;xem đánh giá</a>
                        </p>
                        <p style={{ display: "flex" }}>
                            <span style={{ color: "#329900" }}>{textTime}&nbsp;</span>
                            <AccessTimeRoundedIcon /> &nbsp;
                            {dataProducts ? dataProducts.time_start + " - " + dataProducts.time_end : "00:00:00 - 11:59:59"}
                        </p>
                        <p style={{ display: "flex", color: "gray" }}>
                            <MonetizationOnRoundedIcon />
                            {
                                dataProducts ? dataProducts.menu[0].price + " - " + dataProducts.menu[dataProducts.menu.length - 1].price : "0"
                            }

                        </p>
                        <p style={{ display: "flex", color: "red" }}><LocalPhoneRoundedIcon /> {dataProducts ? dataProducts.user.info ? dataProducts.user.info.phone : "" : ""}</p>
                    </Item>
                </Box>
                <Menu eating={dataProducts.menu} restaurantId={dataProducts.id} table={dataProducts.tables} isHours={isHours}/>
                <Vote votes={dataProducts.vote} restaurant_id={dataProducts.id} load={handleClick} />
                <div id="map">
                    <MapBox />
                </div>
            </Container>


        </React.Fragment>
    )
}

export default RestaurantDetail