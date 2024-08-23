import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { Button, Container, TextField, Typography } from '@mui/material';
import AuthService from '../components/services/AuthService';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './login.css';

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

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const authService = new AuthService();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await authService.login(username, password);
      console.log('Authentication successful! Token:', data.token);
      if (data.role === 'ADMIN') {
        navigate("/admin");
      }
      if (data.role === 'MANAGER') {
        navigate("/manager");
      }
      if (data.role === 'CUSTOMER') {
        navigate("/customer");
      }
    } catch (error) {
      console.error('Authentication failed: ', error.message);
      setError('Invalid login data');
      setTimeout(() => setError(null), 3000);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container className="login-container">
        <Typography variant="h4" component="h2" className="login-header">Login Page</Typography>
        <form onSubmit={handleSubmit} className="login-form">
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
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary" className="login-button">
            Login
          </Button>
        </form>
        {error && <Alert className="custom-alert" variant="filled" severity="error">{error}</Alert>}
      </Container>
    </ThemeProvider>
  );
}

export default Login;
