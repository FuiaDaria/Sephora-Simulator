import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { Button, Container, TextField, Typography } from '@mui/material';
import AuthService from '../components/services/AuthService';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './Register.css';

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

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const authService = new AuthService();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await authService.register(username, email, password, 'CUSTOMER');
      console.log('Authentication successful! Token:', data.token);
      navigate('/login');
    } catch (error) {
      console.error('Authentication failed: ', error.message);
      setError('Invalid register data');
      setTimeout(() => setError(null), 3000);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container className="register-container">
        <Typography variant="h4" component="h2" className="register-header">Register Page</Typography>
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
        {error && <Alert className="custom-alert" variant="filled" severity="error">{error}</Alert>}
      </Container>
    </ThemeProvider>
  );
}

export default Register;
