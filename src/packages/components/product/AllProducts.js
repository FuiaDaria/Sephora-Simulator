import React, { useEffect, useState } from 'react';
import ProductService from '../services/ProductService';
import { Button, Container, TextField, Typography, Alert, Paper } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './AllProducts.css';

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

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [newNames, setNewNames] = useState({});
  const [cartMessage, setCartMessage] = useState(null);

  useEffect(() => {
    const productService = new ProductService();
    productService.findAll()
      .then(data => setProducts(data))
      .catch(error => setError(error.message));
  }, []);

  const handleNameChange = async (productId, brand, price, totalQuantity) => {
    const newName = newNames[productId] || '';
    if (!newName) {
      setError('Name cannot be empty');
      setTimeout(() => setError(null), 3000);
      return;
    }

    try {
      const productService = new ProductService();
      await productService.changeName(productId, newName, brand, price, totalQuantity);
      setProducts(prevProducts =>
        prevProducts.map(product =>
          product.id === productId ? { ...product, name: newName } : product
        )
      );
      setCartMessage('Name changed successfully');
      setTimeout(() => setCartMessage(null), 3000);
    } catch (error) {
      setError('Failed to change name');
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleInputChange = (productId, value) => {
    setNewNames(prevNewNames => ({ ...prevNewNames, [productId]: value }));
  };

  const handleDelete = async (productId) => {
    try {
      const productService = new ProductService();
      await productService.deleteById(productId);
      setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
      setCartMessage('Product deleted successfully');
      setTimeout(() => setCartMessage(null), 3000);
    } catch (error) {
      setError('Failed to delete product');
      setTimeout(() => setError(null), 3000);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container className="manage-quantities">
        <Typography variant="h4" component="h2">Product List</Typography>
        {error && <Alert severity="error" className="error">{error}</Alert>}
        {cartMessage && <Alert severity="success" className="success">{cartMessage}</Alert>}
        <ul className="product-list">
          {products.map(product => (
            <li key={product.id} className="product-item">
              <Paper className="product-details" elevation={3}>
                <Typography variant="h6" component="p"><strong>{product.brand} </strong> <i>{product.name}</i></Typography>
                {product.totalQuantity === 0 ? (
                  <Typography variant="body1" className="out-of-stock"><b>Out of Stock :/</b></Typography>
                ) : (
                  <>
                    <Typography variant="body2">- {product.totalQuantity} pieces</Typography>
                    <TextField
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={newNames[product.id] || ''}
                      onChange={(e) => handleInputChange(product.id, e.target.value)}
                      placeholder="Enter new name"
                      className="name-input"
                    />
                    <div className="button-container">
                      <Button
                        variant="contained"
                        color="primary"
                        className="edit-button"
                        onClick={() => handleNameChange(product.id, product.brand, product.price, product.totalQuantity)}
                      >
                        Edit Name
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        className="delete-button"
                        onClick={() => handleDelete(product.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </>
                )}
              </Paper>
            </li>
          ))}
        </ul>
      </Container>
    </ThemeProvider>
  );
};

export default AllProducts;
