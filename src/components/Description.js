import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Description({data}) {
  return (
    <div style={{marginTop: '15px'}}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          active="true"
        >
          <Typography  sx={{fontWeight: '600'}}>Description</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {data}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography sx={{fontWeight: '600'}}>shipping {'&'} Returns</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <b>7 Days Returns</b><br /> <br />
            <span>Cash on Delivery Available</span> <br />
            <span>Home Delivery <span style={{color: 'red'}}>3 - 4 DAYS</span></span>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
