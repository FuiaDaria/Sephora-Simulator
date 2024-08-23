import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, ThemeProvider, createTheme } from '@mui/material';
import './Manager.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ec407a', // Pinkish color
    },
    secondary: {
      main: '#f06292', // Another shade of pink
    },
  },
  typography: {
    button: {
      textTransform: 'none',
    },
  },
});

const Manager = () => {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <Container className="manager-container">
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/viewCustomers')}
          className="manager-button"
        >
          View Customers
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/viewProducts')}
          className="manager-button"
        >
          View Products
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/addProduct')}
          className="manager-button"
        >
          Add Product
        </Button>
      </Container>
    </ThemeProvider>
  );
};

export default Manager;
