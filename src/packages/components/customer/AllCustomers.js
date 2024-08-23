import React, { useState, useEffect } from 'react';
import CustomerService from '../services/CustomerService';
import './AllCustomers.css';
import { Button, Container, Typography, Paper, Alert } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

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

const AllCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomerProfile, setSelectedCustomerProfile] = useState(null);
  const [selectedUserProfile, setSelectedUserProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const customerService = new CustomerService();
    customerService.findAll()
      .then(data => {
        setCustomers(data);
        console.log("Customers fetched:", data);
      })
      .catch(error => {
        setError(error.message);
        console.error("Error fetching customers:", error.message);
      });
  }, []);

  const handleViewProfile = async (customerId) => {
    try {
      console.log("Fetching profile for customer ID:", customerId);
      const customerService = new CustomerService();
      const profile = await customerService.findById(customerId);
      console.log("Customer profile fetched:", profile);
      const user = profile.userDto;
      console.log("User profile fetched:", user);
      setSelectedCustomerProfile(profile);
      setSelectedUserProfile(user);
    } catch (error) {
      console.error('Error fetching customer profile:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container className="customers-container">
        <Typography variant="h4" component="h1" className="customers-header">All Customers</Typography>
        {error && <Alert severity="error" className="error">{error}</Alert>}
        <ul>
          {customers.map((customer) => (
            <li key={customer.id} className="customer-item">
              <Paper className="customer-paper" elevation={3}>
                <Typography variant="h6" component="p"><strong>Customer {customer.id}</strong></Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleViewProfile(customer.id)}
                >
                  View Profile
                </Button>
                {selectedCustomerProfile && selectedCustomerProfile.id === customer.id && selectedUserProfile && (
                  <div className="customerProfile">
                    <Typography variant="h6" component="h4">Customer Profile</Typography>
                    <Typography variant="body1">Username: {selectedUserProfile.username}</Typography>
                    <Typography variant="body1">Email: {selectedUserProfile.email}</Typography>
                    <Typography variant="body1">Points: {selectedCustomerProfile.points}</Typography>
                  </div>
                )}
              </Paper>
            </li>
          ))}
        </ul>
      </Container>
    </ThemeProvider>
  );
};

export default AllCustomers;
