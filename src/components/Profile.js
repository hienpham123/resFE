import React, { useState } from "react";
import { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosAuth, axiosInstance } from "../utills/axios"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Item from '../components/Item'
import { Container } from "@mui/material";
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
function Profile() {
    const [name, setName] = useState('');
    const [user, setUser] = useState(false);
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState('');
    const [birday, setBirday] = useState("");
    const [email, setEmail] = useState("email@gmail.com");
    const [address, setAddress] = React.useState([]);
    const [city, setCity] = React.useState('');
    const [districts, setDistricts] = React.useState('');
    const [wards, setWards] = React.useState('');
    const [addressD, setAddressD] = React.useState('');
    const handleGender = (event) => {
        setGender(event.target.value);
    };
    const navigate = useNavigate()
    useLayoutEffect(() => {
        axiosAuth.get("api/user")
            .catch(e => { navigate('/') })
            .then(res => {
                setUser(res["data"])
                setName(res['data'].name)
                console.log(res["data"])
                if (res['data'].info != null) {
                    setPhone(res['data']?.info?.phone)
                    if (res['data']?.info?.gender == "Nam") {
                        setGender(1)
                    }
                    if (res['data']?.info?.gender == "Nữ") {
                        setGender(2)
                    }
                    if (res['data']?.info?.gender == "khác") {
                        setGender(0)
                    }
                    setCity(res['data']?.info?.is_address.city)
                    setDistricts(res['data']?.info?.is_address.district)
                    setWards(res['data']?.info?.is_address.wards)
                    setAddressD(res['data']?.info?.is_address.detail)
                }

                setBirday(res['data']?.info?.birday)
                let em = res['data'].email
                let nameEm = em.split("@")[0].split("")
                let s = ''
                for (let i = 1; i < nameEm.length - 1; i++) {
                    nameEm[i] = "*"
                }
                for (let i = 0; i < nameEm.length; i++) {
                    s += nameEm[i]
                }
                s += "@" + em.split("@")[1]
                setEmail(s)
            })
    }, [])

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
    console.log(city, districts, wards, addressD)
    const handleSave = () => {

        if (city == "" || districts == "" || wards == "" || addressD == "") {
            alert("Địa chỉ không được để trống")
            return
        }
        if (name == "") {
            alert("Tên không được để trống")
            return
        } else {
            let formData = new FormData();
            formData.append('name', name)
            axiosAuth.post("api/user", formData)
                .catch(error => console.log(error))
                .then(res => {
                    console.log(res["data"])
                })
        }
        let formDataAddress = new FormData();
        formDataAddress.append('city', city)
        formDataAddress.append('district', districts)
        formDataAddress.append('wards', wards)
        formDataAddress.append('detail', addressD)
        axiosAuth.post("api/address", formDataAddress)
            .catch(error => console.log(error))
            .then(res => {
                let id = res['data'].id
                let formDataInfo = new FormData();
                formDataInfo.append('phone', phone)
                formDataInfo.append('address', id)
                if (gender == 1)
                    formDataInfo.append('gender', "Nam")
                if (gender == 2)
                    formDataInfo.append('gender', "Nữ")
                if (gender == 0)
                    formDataInfo.append('gender', "Khác")
                formDataInfo.append('birday', birday)
                axiosAuth.post("api/user-info", formDataInfo)
                    .catch(error => console.log(error))
                    .then(res1 => {
                        console.log(res1['data'])
                        alert("Saved")
                    })
            })

    }

    const handleVendor = () => {
        axiosAuth.post("api/user-vendor")
            .catch(error => console.log(error))
            .then(res => {
                if(res["data"] == 1){
                    alert("Chờ xác nhận!!!")
                }
            })
    }
    return (
        <>
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
                <h1>Xin chào {user?.name} </h1>
                <Box
                    component="form"
                    sx={{
                        mt: '15px',
                        p: 0,
                        display: 'grid',
                        gridTemplateColumns: {
                            lg: '1fr 1fr',
                            md: '1fr 1fr',
                            sm: '1fr 1fr',
                            xs: '1fr',
                        },
                        gap: 0,
                        width: '100%',
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Item>
                        <TextField
                            sx={{ width: '100%' }}
                            id="outlined-name"
                            label="Họ & tên"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </Item>

                    <Item>
                        <TextField
                            sx={{ width: '100%' }}
                            id="outlined-name"
                            label="Email"
                            value={email}
                            disabled
                        />
                    </Item>

                    <Item>
                        <TextField
                            sx={{ width: '100%' }}
                            id="outlined-name"
                            label="Loại tài khoản"
                            value={user?.role == 2 ? "vendor" : "user"}
                            disabled
                        />
                    </Item>

                    <Item>
                        <TextField
                            sx={{ width: '100%' }}
                            id="outlined-name"
                            label="Số điện thoại"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                        />
                    </Item>
                    <Item>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Giới tính</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={gender}
                                    label="Age"
                                    onChange={handleGender}
                                >
                                    <MenuItem value={1}>Nam</MenuItem>
                                    <MenuItem value={2}>Nữ</MenuItem>
                                    <MenuItem value={0}>Khác</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Item>
                    <Item>
                        <TextField
                            sx={{ width: '100%' }}
                            id="outlined-name"
                            label={birday != "" ? "Ngày sinh" : " "}
                            value={birday}
                            onChange={e => setBirday(e.target.value)}
                            type="date"
                        />
                    </Item>

                </Box>
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

                    <Item>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="restaurant-city-label">Tỉnh/Thành phố</InputLabel>
                                <Select
                                    labelId="restaurant-city-label"
                                    id="restaurant-city"
                                    value={city}
                                    label="Tỉnh/Thành phố"
                                    onChange={handleChangeCity}
                                    required
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
                                    required
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
                                    required
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
                <Box component="form"
                    sx={{
                        my: '15px',
                        p: 0,
                        width: '100%',
                    }}
                    noValidate
                    autoComplete="off">
                    <Item>
                        <TextField
                            sx={{ width: '100%' }}
                            id="outlined-name"
                            label="Số nhà, ngõ, đường"
                            value={addressD}
                            onChange={e => setAddressD(e.target.value)}
                        />
                    </Item>
                </Box>
                <div style={{
                    textAlign: "center",
                    margin: "15px 0px"
                }}>
                    {user?.role == 0 ? <Button variant="contained" color="success" onClick={handleVendor}>Yêu cầu đối tác</Button> : ""}
                    <Button sx={{ ml: "15px" }} variant="contained" color="primary" onClick={handleSave}>Lưu</Button>
                </div>
            </Container>

        </>

    )
}

export default Profile

