import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { Button, Container, TextField, Typography } from '@mui/material';
import ProductService from '../services/ProductService';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './AddProduct.css';

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

function AddProduct() {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [total_quantity, setTotalQuantity] = useState(0);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const productService = new ProductService();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await productService.create(name, brand, price, parseInt(total_quantity, 10));
      console.log(response.name, response.brand, response.price, response.totalQuantity);
      setSuccess('Product added successfully!');
      setTimeout(() => {
        setSuccess(null);
        navigate('/viewProducts');
      }, 3000);
    } catch (error) {
      console.error('Failed to add product: ', error.message);
      setError('Failed to add product');
      setTimeout(() => setError(null), 3000);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container className="add-product-container">
        <Typography variant="h4" component="h2" className="add-product-header">Add New Product</Typography>
        <form onSubmit={handleSubmit} className="add-product-form">
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            label="Brand"
            variant="outlined"
            fullWidth
            margin="normal"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
          />
          <TextField
            label="Price"
            variant="outlined"
            fullWidth
            margin="normal"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <TextField
            label="Total Quantity"
            variant="outlined"
            fullWidth
            margin="normal"
            value={total_quantity}
            onChange={(e) => setTotalQuantity(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary" className="add-button">
            Add Product
          </Button>
        </form>
        {error && <Alert className="custom-alert" variant="filled" severity="error">{error}</Alert>}
        {success && <Alert className="custom-alert" variant="filled" severity="success">{success}</Alert>}
      </Container>
    </ThemeProvider>
  );
}

export default AddProduct;
