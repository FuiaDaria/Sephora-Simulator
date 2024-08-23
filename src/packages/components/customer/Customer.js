import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Button, Container, Typography, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CustomerService from '../services/CustomerService';
import './Customer.css';

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

const Customer = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('user_id');
  const [showProfile, setShowProfile] = useState(false);
  const [selectedCustomerProfile, setSelectedCustomerProfile] = useState(null);
  const [searchBrand, setSearchBrand] = useState('');

  useEffect(() => {
    console.log("User ID from localStorage:", userId);
  }, [userId]);

  const handleViewProfile = async (userId) => {
    try {
      console.log("Fetching profile for user ID:", userId);
      const customerService = new CustomerService();
      const profile = await customerService.findByUserId(userId);
      console.log("Customer profile fetched:", profile);
      
      if (profile) {
        console.log("Profile structure:", profile);
        setSelectedCustomerProfile(profile);
        setShowProfile(true);
      } else {
        console.error('Customer profile is null or undefined.');
      }
    } catch (error) {
      console.error('Error fetching customer profile:', error);
    }
  };

  const handleSearch = (brand) => {
    navigate(`/searched/${brand}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container className="customer-container">
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/products')}
          className="customer-button"
        >
          View All Products
        </Button>
      
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleViewProfile(parseInt(userId))}
          className="customer-button"
        >
          View Profile
        </Button>
        
        <TextField
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchBrand}
          onChange={(e) => setSearchBrand(e.target.value)}
          placeholder="Enter brand to search"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleSearch(searchBrand)}
        >
          Search
        </Button>
        
        {showProfile && selectedCustomerProfile && (
          <div className="customerProfile">
            <Typography variant="h6" component="h4">Customer Profile</Typography>
            <Typography variant="body1">Username: {selectedCustomerProfile.username}</Typography>
            <Typography variant="body1">Email: {selectedCustomerProfile.email}</Typography>
          </div>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default Customer;
