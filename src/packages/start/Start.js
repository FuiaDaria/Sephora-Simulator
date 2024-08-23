import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Typography, Paper } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './Start.css';

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

const Start = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container className="start-container">
        <Paper className="start-paper" elevation={3}>
          <Typography variant="h4" component="h2" className="start-header">
            Welcome to Our Site
          </Typography>
          <div className="buttons">
            <Button
              component={Link}
              to="/login"
              variant="contained"
              color="primary"
              className="button"
            >
              Login
            </Button>
            <Button
              component={Link}
              to="/register"
              variant="contained"
              color="primary"
              className="button"
            >
              Register
            </Button>
          </div>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default Start;
