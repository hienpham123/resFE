import React from "react";
import { useParams, Link } from 'react-router-dom'
import { axiosAuth, axiosInstance } from "../utills/axios";
import ActionAreaCard from '../components/Card'
import Box from '@mui/material/Box';
import Item from '../components/Item'
import { Container } from "@mui/material";
import { baseURLImg } from "../utills/config";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
function ListSearch() {
    const params = useParams()
    const [eating, setEating] = React.useState(false)
    const [address, setAddress] = React.useState([]);
    const [city, setCity] = React.useState('');
    const [districts, setDistricts] = React.useState('');
    const [wards, setWards] = React.useState('');
    React.useLayoutEffect(() => {
        axiosInstance.get(`/api/search/${params.key}`)
            .then((response) => response)
            .then(function (data) {
                setEating(data["data"])
            });
    }, [city, districts, wards]);
    console.log(city, districts, wards)
    if (eating) {
        for (let i = 0; i < eating.length; i++) {
            console.log(eating[i])

            if (eating[i]?.city != city && city != '') {
                eating.splice(i, 1)
                i--
            } else {
                if (eating[i]?.wards != wards && wards != '') {
                    eating.splice(i, 1)
                    i--
                } else {
                    if (eating[i]?.dist != districts && districts != '') {
                        eating.splice(i, 1)
                        i--
                    }
                }
            }


        }
    }

    const handleChangeCity = (event) => {
        setCity(event.target.value);
        setDistricts('')
        setWards('')
    };


    const handleChangeDistricts = (event) => {
        setDistricts(event.target.value);
        setWards('')
    };


    const handleChangeWards = (event) => {
        setWards(event.target.value);
    };
    React.useEffect(() => {
        axiosAuth.get('/api/province')
            .catch(error => console.log(error))
            .then(res => {
                setAddress(res['data'])
            })
    }, [])

    console.log(eating)
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
            <h2 className="titleIndex">Tìm kiếm "{params.key}"</h2>
            <Box
                component="form"
                sx={{
                    my: '15px',
                    p: 0,
                    display: 'grid',
                    gridTemplateColumns: {
                        lg: '1fr 1fr 1fr',
                        md: '1fr 1fr 1fr',
                        sm: '1fr 1fr 1fr',
                        xs: '1fr',
                    },
                    gap: 0,
                    width: '100%',
                }}
                noValidate
                autoComplete="off"
            >

                <Item sx={{ pl: '0px !important' }}>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="restaurant-city-label">Tỉnh/Thành phố</InputLabel>
                            <Select
                                labelId="restaurant-city-label"
                                id="restaurant-city"
                                value={city}
                                label="Tỉnh/Thành phố"
                                onChange={handleChangeCity}
                            >
                                {address.map((city) => {
                                    return <MenuItem key={city.id} value={city.id}>{city.name}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </Box>
                </Item>

                <Item>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="restaurant-district-label">Quận/Huyện</InputLabel>
                            <Select
                                labelId="restaurant-district-label"
                                id="restaurant-district"
                                value={districts}
                                label="Quận/Huyện"
                                onChange={handleChangeDistricts}
                            >
                                {address.map((isCity) => {
                                    if (isCity.id == city) {
                                        return isCity.district.map((dist) => {
                                            return <MenuItem key={dist.id} value={dist.id}>{dist.name}</MenuItem>
                                        })
                                    }
                                })}
                            </Select>
                        </FormControl>
                    </Box>
                </Item>

                <Item>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="restaurant-wards-label">Phường/Xã</InputLabel>
                            <Select
                                labelId="restaurant-wards-label"
                                id="restaurant-wards"
                                value={wards}
                                label="Phường/Xã"
                                onChange={handleChangeWards}
                            >
                                {address.map((isCity) => {
                                    if (isCity.id == city) {
                                        return isCity.district.map((dist) => {
                                            if (dist.id == districts) {
                                                return dist.ward.map((ward) => {
                                                    return <MenuItem key={ward.id} value={ward.id}>{ward.name}</MenuItem>
                                                })
                                            }
                                        })
                                    }
                                })}
                            </Select>
                        </FormControl>
                    </Box>
                </Item>

            </Box>
            <Box
                sx={{
                    p: 0,
                    display: 'grid',
                    gridTemplateColumns: {
                        lg: '1fr 1fr 1fr 1fr',
                        md: '1fr 1fr 1fr',
                        sm: '1fr 1fr',
                        xs: '1fr'
                    },
                    gap: 0,
                    width: '100%'
                }}
            >
                {eating && eating.map((prd) => {
                    return <Item sx={{ px: "3px" }} key={prd.id}>
                        <ActionAreaCard
                            name={prd.name}
                            image={baseURLImg + prd.path}
                            price={prd.price}
                            news={prd.new}
                            hots={prd.discount}
                            slug={prd.slug}
                            id={prd.id}
                        />
                    </Item>
                }
                )}
            </Box>
        </Container>
    )
}

export default ListSearch