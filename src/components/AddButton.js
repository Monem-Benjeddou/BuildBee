import React from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const AddButton = ({ onClick, children }) => {
  return (
    <Button
      variant="contained"
      startIcon={<AddIcon />}
      onClick={onClick}
      sx={{
        backgroundColor: '#0083cb',
        '&:hover': {
          backgroundColor: '#006ba3',
        },
        borderRadius: '8px',
        textTransform: 'none',
        fontFamily: 'Signika',
        height: '40px',
        paddingLeft: '16px',
        paddingRight: '16px',
      }}
    >
      {children}
    </Button>
  );
};

export default AddButton;
