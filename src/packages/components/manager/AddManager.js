import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, TextField, Typography, Alert } from '@mui/material';
import AuthService from '../services/AuthService';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './AddManager.css';

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

function AddManager() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const authService = new AuthService();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await authService.register(username, email, password, 'MANAGER');
      console.log('Authentication successful! Token:', data.token);
      navigate('/viewManagers');
    } catch (error) {
      console.error('Authentication failed: ', error.message);
      setError('Invalid register data');
      setTimeout(() => setError(null), 3000);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container className="register-container">
        <Typography variant="h4" component="h2" className="register-header">Register a Manager</Typography>
        <form onSubmit={handleSubmit} className="register-form">
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary" className="register-button">
            Register
          </Button>
        </form>
        {error && <Alert className="custom-alert" variant="filled" severity="error">Invalid Register Data</Alert>}
      </Container>
    </ThemeProvider>
  );
}

export default AddManager;
