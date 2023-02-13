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
import axios from 'axios';
import { useParams } from 'react-router-dom';
export default function AddProduct() {
    const params = useParams().id
    const [product, setPrd] = React.useState();
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [amount, setAmount] = React.useState('');
    const [desc, setDesc] = React.useState('');
    const [ctgr, setCtgr] = React.useState('');
    const [category, setCategory] = React.useState([])
    const [file, setFile] = React.useState('');
    const handleChange = (event) => {
        setCtgr(event.target.value);
    };
    React.useEffect(()=>{
        axios.get('http://localhost:8000/api/category')
        .catch(error => console.log(error))
        .then(res=>{
            setCategory(res['data'].category)
        })
    }, [])
    React.useEffect(()=>{
        params&&axios.get(`http://localhost:8000/api/this-product/${params}`)
        .catch(error => console.log(error))
        .then(res=>{
            setPrd(res['data'])
            let data = res['data']
            setName(data['name'])
            setPrice(data['price'])
            setAmount(data['count'])
            setCtgr(Number(data['category_id']))
            setDesc(data['description'])
        })
    }, [])

    const handleDeleteImg = (index, e)=>{
        axios.delete(`http://localhost:8000/api/images/${e}`)
        .catch(err => console.log(err))
        .then(res=>{
            alert('Deleted')
            let dom = document.getElementsByClassName('listImg')
            dom[index].style.display = 'none'
        })
    }
    let formData = new FormData();
    const update = ()=>{
        for(const val of file){
            formData.append('file[]', val)
        }
        formData.append('id', params)
        formData.append('productName', name)
        formData.append('productDesc', desc)
        formData.append('listCtgr', ctgr)
        formData.append('productPrice', price)
        formData.append('productCount', amount)
        axios({
            url: `http://localhost:8000/api/update-product`,
            method: 'POST',
            headers: {
                'Content-Type': 'multi/form-data'
            },
            data: formData
        })
        .catch(error => console.log(error))
        .then(res=>{
            console.log(res)
        })
    }
    return (
        <React.Fragment>
            <NavAdmin title="Add Product" />
            <h5 style={{marginBottom: '9px', fontSize: '1.25rem'}}>Product information</h5>
            <Box
                component="form"
                noValidate
                autoComplete="off"
                >
                <TextField
                    sx={{width: '100%'}}
                    id="outlined-name"
                    label="Product's name"
                    value={name}
                    onChange={e=>{
                        setName(e.target.value)
                    }}
                />
            </Box>
                
                <Box
                    component="form"
                    sx={{
                    mt: '15px',
                    p: 0,
                        display: 'grid',
                        gridTemplateColumns: { 
                            lg: '1fr 1fr 1fr',
                            md: '1fr 1fr 1fr',
                            sm: '1fr 1fr 1fr',
                            xs: '1fr',
                        },
                        gap: 0,
                        width:'100%',
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Item sx={{pl: '0px !important'}}>
                        <TextField 
                        sx={{width: '90%'}}
                        id="outlined-name"
                        label="Price"
                        value={price}
                        onChange={e=>setPrice(e.target.value)}
                        />
                    </Item>
                    
                    <Item>
                        <TextField
                        sx={{width: '90%'}}
                        id="outlined-name"
                        label="Amount"
                        value={amount}
                        onChange={e=>setAmount(e.target.value)}
                        />
                    </Item>
                    <Item sx={{textAlign: 'right', pr: '0px !important'}}>
                        <FormControl sx={{width: '90%'}}>
                            <InputLabel id="demo-simple-select-label">Category</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={ctgr}
                            label="Category"
                            onChange={handleChange}
                            >
                                {category.map((data, index)=>{
                                    return <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>    
                                })}
                            </Select>
                        </FormControl>
                    </Item>
                </Box>
                <Box sx={{'& > :not(style)': { m: 1, width: '100%',},  textAlign: 'center' }}>
                    <Button
                    style={{width: '50%', margin: '15px auto'}}
                    variant="contained"
                    component="label"
                    >
                    Upload File
                    <input
                        type="file"
                        multiple
                        hidden
                        id='uploadFIle'
                        onChange={e => setFile(e.target.files)}
                    />
                    </Button>
                </Box>
                <Box 
                sx={{
                    '& > :not(style)': { mb: '15px', width: '100%',},  
                    textAlign: 'center',
                    display: 'grid',
                    gridTemplateColumns: { 
                        lg: '1fr 1fr 1fr 1fr 1fr',
                        md: '1fr 1fr 1fr 1fr 1fr',
                        sm: '1fr 1fr 1fr 1fr',
                        xs: '1fr',
                    },
                    gap: 0,
                    }}>
                    {product&&
                        product['images'].map((value, key)=>{
                            return (
                                <Box className="listImg" data-id={value['id']} sx={{positon: 'relative'}} key={key}>
                                    <img style={{width: '95%'}} src={'http://localhost:8000/' + value['path']} />
                                    <Button variant="contained" onClick={(e)=>{handleDeleteImg(key, value['id'])}}>Delete</Button>
                                </Box>
                            )
                        })
                    }
                </Box>
                <h5 style={{marginBottom: '9px', fontSize: '1.25rem'}}>Example textarea</h5>
                <Box sx={{'& > :not(style)': { },  textAlign: 'center' }}>
                    <TextareaAutosize
                    aria-label="Example textarea"
                    minRows={5}
                    placeholder="Example textarea"
                    value={desc}
                    onChange={e=>setDesc(e.target.value)}
                    style={{ width: '100%', borderRadius: '5px'}}/>
                </Box>
                <Box sx={{width: '100%', textAlign: 'center', my: '20px'}}>
                    <Button onClick={update} variant='contained' sx={{p: '15px 50px', fontSize: '1.25rem'}}>Upload</Button>
                </Box>
        </React.Fragment>
    );
}
