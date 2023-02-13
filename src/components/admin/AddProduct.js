// Add Restaurant

import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Item from '../../components/Item'
import { Button } from '@mui/material';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import NavAdmin from '../../parts/admin/NavAdmin';
import { axiosAuth, axiosInstance } from "../../utills/axios";
import { useNavigate } from 'react-router-dom';
export default function AddProduct() {
    const navigate = useNavigate()
    const [name, setName] = React.useState('');
    const [desc, setDesc] = React.useState('');
    const [addressD, setAddressD] = React.useState('');
    const [file, setFile] = React.useState('');
    const [address, setAddress] = React.useState([]);
    const [city, setCity] = React.useState('');
    const [timeS, setTimeS] = React.useState('00:00:00');
    const [timeE, setTimeE] = React.useState('00:00:00');
    const handleChangeCity = (event) => {
        setCity(event.target.value);
    };

    const [districts, setDistricts] = React.useState('');
    const handleChangeDistricts = (event) => {
        setDistricts(event.target.value);
    };

    const [wards, setWards] = React.useState('');
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

    const upLoad = () => {
        axiosAuth.get("/api/my-restaurant")
            .catch(error => console.log(error))
            .then(res => {
                if (res["data"].length >= 1) {
                    alert("Mỗi tài khoản chỉ có thể tạo 1 nhà hàng");
                } else {
                    let formDataAddress = new FormData();
                    formDataAddress.append('city', city)
                    formDataAddress.append('district', districts)
                    formDataAddress.append('wards', wards)
                    formDataAddress.append('detail', addressD)
                    axiosAuth.post("api/address", formDataAddress)
                        .catch(error => console.log(error))
                        .then(res => {
                            console.log('res', res)
                            let id = res['data'].id
                            let formDataRes = new FormData();
                            for (const val of file) {
                                formDataRes.append('image[]', val)
                            }
                            formDataRes.append('name', name)
                            formDataRes.append('address', id)
                            formDataRes.append('time_start', timeS)
                            formDataRes.append('time_end', timeE)
                            formDataRes.append('description', desc)
                            axiosAuth.post("api/restaurant", formDataRes)
                                .catch(error => console.log(error))
                                .then(res1 => {
                                    navigate(`/admin/nha-hang`)
                                })
                        })
                }
            })

    }

    return (
        <React.Fragment>
            <NavAdmin title="Tạo mới nhà hàng" />
            <h5 style={{ marginBottom: '9px', fontSize: '1.25rem' }}>Tạo mới nhà hàng</h5>
            <Box
                component="form"
                noValidate
                autoComplete="off"
            >
                <TextField
                    sx={{ width: '100%' }}
                    id="outlined-name"
                    label="Tên nhà hàng"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </Box>
            <h5 style={{ marginTop: '20px', fontSize: '1.25rem' }}>Địa chỉ</h5>
            <Box
                component="form"
                sx={{
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
                component="form"
                noValidate
                autoComplete="off"
                sx={{ mt: "15px" }}
            >
                <TextField
                    sx={{ width: '100%' }}
                    id="outlined-addressD"
                    label="Địa chỉ chi tiết (tầng, số nhà, ngõ/ngách/hẻm)"
                    value={addressD}
                    onChange={e => setAddressD(e.target.value)}
                />
            </Box>
            <h5 style={{ marginTop: '20px', fontSize: '1.25rem' }}>Thời gian hoạt động</h5>
            <Box
                component="form"
                sx={{
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
                    <Box>
                        <TextField
                            type={"time"}
                            sx={{ width: '100%' }}
                            id="outlined-time-start"
                            label="Mở cửa"
                            value={timeS}
                            onChange={e => setTimeS(e.target.value)}
                        />
                    </Box>
                </Item>

                <Item>
                    <Box>
                        <TextField
                            type={"time"}
                            sx={{ width: '100%' }}
                            id="outlined-time-start"
                            label="Đóng cửa"
                            value={timeE}
                            onChange={e => setTimeE(e.target.value)}
                        />
                    </Box>
                </Item>
            </Box>
            <Box sx={{ '& > :not(style)': { m: 1, width: '100%', }, textAlign: 'center' }}>
                <Button
                    style={{ width: '50%', margin: '15px auto' }}
                    variant="contained"
                    component="label"
                >
                    Ảnh mô tả nhà hàng
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        hidden
                        id='uploadFIle'
                        onChange={e => setFile(e.target.files)}
                    />
                </Button>

            </Box>
            <h5 style={{ marginBottom: '9px', fontSize: '1.25rem' }}>Mô tả nhà hàng</h5>
            <Box sx={{ '& > :not(style)': {}, textAlign: 'center' }}>

                <TextareaAutosize
                    aria-label="Example textarea"
                    minRows={5}
                    placeholder="Mô tả nhà hàng"
                    value={desc}
                    onChange={e => setDesc(e.target.value)}
                    style={{ width: '100%', borderRadius: '5px' }} />
            </Box>
            <Box sx={{ width: '100%', textAlign: 'center', my: '20px' }}>
                <Button onClick={upLoad} variant='contained' sx={{ p: '15px 50px', fontSize: '1.25rem' }}>Tạo nhà hàng</Button>
            </Box>
        </React.Fragment>
    );
}
