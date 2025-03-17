import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';

const StatCard = ({ value, label ,bgColor}) => {
  return (
    <Card
      sx={{
        backgroundColor: bgColor,
        color: '#fff',
        // minWidth: 120,
        borderRadius: 2,
        textAlign: 'center',
        // border: '1px solid #004c8c'
      }}
    >
      <Box sx={{p:2}}>
        <Typography  sx={{ fontWeight: 'bold' ,fontSize:"20px"}}>
          {value}
        </Typography>
        <Box  sx={{ color: '#c0c0c0' }}>
          {label}
        </Box>
      </Box>
    </Card>
  );
}
export default StatCard;
