import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductService from '../services/ProductService';
import { Button, Container, TextField, Typography, Alert, Paper } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './ProductList.css';

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

const SearchedProducts = () => {
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState({});
  const [error, setError] = useState(null);
  const [cartMessage, setCartMessage] = useState(null);
  const [quantities, setQuantities] = useState({});
  const userId = localStorage.getItem('user_id');
  const navigate = useNavigate();
  const { brand } = useParams();

  useEffect(() => {
    const productService = new ProductService();
    productService.findProductsByBrand(brand)
      .then(data => setProducts(data))
      .catch(error => setError(error.message));
  }, []);

  const handleShowReviews = async (productId) => {
    const productService = new ProductService();
    try {
      const productReviews = await productService.findReviews(productId);
      setReviews(prevReviews => ({ ...prevReviews, [productId]: productReviews }));
    } catch (error) {
      setError('Failed to fetch reviews');
    }
  };

  const handleAddToCart = async (productId, name, brand, price, totalQuantity) => {
    const quantity = quantities[productId] || 1;
    const newQuantity = totalQuantity - quantity;
    console.log(newQuantity);
    if (quantity > totalQuantity) {
      setError('Not enough products available');
      setTimeout(() => setError(null), 3000);
      return;
    }

    const productService = new ProductService();
    try {
      // Add to cart
      await productService.addToCart(userId, productId, quantity);
      setCartMessage('Product added to cart successfully');
      setTimeout(() => setCartMessage(null), 3000);

      // Update product quantity
      await productService.changeQuantity(productId, name, brand, price, parseInt(newQuantity, 10));

      // Update the product state
      setProducts(prevProducts =>
        prevProducts.map(product =>
          product.id === productId ? { ...product, totalQuantity: newQuantity } : product
        )
      );
    } catch (error) {
      setError('Failed to add product to cart');
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleQuantityChange = (productId, value) => {
    setQuantities(prevQuantities => ({ ...prevQuantities, [productId]: value }));
  };

  const navigateToAddReview = (productId) => {
    navigate(`/addReview/${productId}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container className="ProductList">
        <Typography variant="h4" component="h2">Product List</Typography>
        {error && <Alert severity="error" className="error">{error}</Alert>}
        {cartMessage && <Alert severity="success" className="success">{cartMessage}</Alert>}
        <ul className="product-list">
        {products.length > 0 ? (
          <ul>
          {products.map(product => (
            <li key={product.id} className="product-item">
              <Paper className="product-details" elevation={3}>
                <Typography variant="h6" component="p"><strong>{product.brand} </strong> <i>{product.name}</i> - {product.price} RON</Typography>
                {product.totalQuantity === 0 ? (
                  <Typography variant="body1" className="out-of-stock">Out of Stock</Typography>
                ) : (
                  <>
                    <TextField
                      type="number"
                      label="Quantity"
                      variant="outlined"
                      size="small"
                      inputProps={{ min: 1, max: product.totalQuantity }}
                      value={quantities[product.id] || 1}
                      onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                      className="quantity-input"
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleAddToCart(product.id, product.name, product.brand, product.price, product.totalQuantity)}
                      className="product-button"
                    >
                      Add to Cart
                    </Button>
                  </>
                )}
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleShowReviews(product.id)}
                  className="product-button"
                >
                  Show Reviews
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => navigateToAddReview(product.id)}
                  className="product-button"
                >
                  Add Review
                </Button>
              </Paper>
              {reviews[product.id] && (
                <div className="reviews">
                  <Typography variant="h6" component="h4">Reviews</Typography>
                  {reviews[product.id].length > 0 ? (
                    <ul>
                      {reviews[product.id].map(review => (
                        <li key={review.id}>
                          <Typography variant="body2"><strong>{review.description}</strong></Typography>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <Typography variant="body2">No reviews available</Typography>
                  )}
                </div>
              )}
            </li>
          ))}
          </ul>
        ) : (
          <Typography variant="body1">No such brand on our site</Typography>
        )}
        </ul>
      </Container>
    </ThemeProvider>
  );
};

export default SearchedProducts;
