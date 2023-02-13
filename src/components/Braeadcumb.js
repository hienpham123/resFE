import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import GrainIcon from '@mui/icons-material/Grain';
import { Link } from 'react-router-dom';

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function Breadcrumb({lists}) {

    const countList = lists.length - 1
  return (
    <React.Fragment>
      <h1 style={{fontSize: '1.75rem', textTransform: 'uppercase', fontWeight: '700'}}>{lists[countList].name}</h1>
      <div role="presentation">
        <Breadcrumbs aria-label="breadcrumb">
            {lists.map((data, index)=>
                index !== countList ? (<Link key={index}
              //   underline="hover"
                style={{ display: 'flex', alignItems: 'center' }}
                color="inherit"
                to={data.path}
              >
                {data.name}
              </Link>) : (<Typography key={index}
                  sx={{ display: 'flex', alignItems: 'center' }}
                  color="text.primary"
                  >
                  {data.name}
                  </Typography>)
            )}
        </Breadcrumbs>
      </div>
    </React.Fragment>
  );
}
