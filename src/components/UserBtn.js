import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
export default function UserBtn({name}) {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const user = JSON.parse(window.localStorage.getItem('user'));
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button 
        sx={{color:'white', py: '11px', border: '0px !important'}}
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {name}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        {user.is_admin === 1 && <MenuItem onClick={handleClose}><Link to='/admin'>Admin</Link></MenuItem>}
        <MenuItem onClick={()=>{
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            // return window.location.replace("/");
            navigate('/')
        }}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
