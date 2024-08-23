import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './Admin.css';

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

const Admin = () => {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <Container className="admin">
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/viewManagers')}
          className="admin-button"
        >
          View Managers
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/viewProducts')}
          className="admin-button"
        >
          View Products
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/addManager')}
          className="admin-button"
        >
          Add Manager
        </Button>
      </Container>
    </ThemeProvider>
  );
};

export default Admin;
