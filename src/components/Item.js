import * as React from 'react';
import Box, { BoxProps } from '@mui/material/Box';

function Item(props: BoxProps) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        px: {
          lg: "15px",
          md: '15px',
          sm: '0',
          xs: '0'
        },
        mt: "15px",
        ...sx,
      }}
      {...other}
    />
  );
}

export default Item