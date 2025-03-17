import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import { color, styled } from '@mui/system';


// Use fixed values instead of theme
const StyledButton = styled(Button)(({ selected }) => ({
  // width: '66px',
  height: '22px',
  borderRadius: '34px',
  border: selected ? '1px solid #0066FF' : '1px solid transparent',
  backgroundColor: selected ? '#000000' : '#535353',
  marginRight:"10px",
  padding: '10px',
  boxSizing: 'border-box',
  fontSize:"10px",
  textTransform: 'none',
  fontWeight: 'bold',
  color:selected ? '#0094FF' : '#ffffff', 
  '&:hover': {
    backgroundColor: selected ? '#333333' : '#6A6A6A', 
    color:selected ? '#0094FF' : '#0094FF', 
    // border: selected ? '1px solid black' : '1px solid black',
  },
  fontWeight:500
}));

// AccentButton component
const AccentButton = ({ label, selected,onClick }) => {
  return (
    <StyledButton selected={selected} variant="outlined" onClick={onClick}>
      {label}
    </StyledButton>
  );
};

export default AccentButton;
