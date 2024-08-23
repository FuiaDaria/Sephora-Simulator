import React, { useEffect, useState } from 'react';
import './Cart.css';
import CartService from '../services/CartService';
import CustomerService from '../services/CustomerService';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Typography, Alert, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import OrderService from '../services/OrderService';
import CheckoutForm from '../order/CheckoutForm';
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

const Cart = () => {
  const [carts, setCarts] = useState([]);
  const [customer, setCustomer] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState(null);
  const [cartMessage, setCartMessage] = useState(null);
  const [openDialog, setOpenDialog] = useState(false); // State to manage dialog open/close
  const [openCheckout, setOpenCheckout] = useState(false); // State to manage checkout form open/close
  const userId = localStorage.getItem('user_id');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customerService = new CustomerService();
        const client = await customerService.findCustomer(userId);
        setCustomer(client);

        const cartService = new CartService();
        const cartItems = await cartService.findByCustomerId(client.id);

        setCarts(cartItems);

        const total = cartItems.reduce((sum, cart) => sum + cart.productDto.price * cart.quantity, 0);
        setTotalPrice(total);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [userId]);

  const handleDeleteCart = async (cartId) => {
    try {
      const cartService = new CartService();
      await cartService.deleteCart(cartId);
      const updatedCarts = carts.filter(cart => cart.id !== cartId);
      setCarts(updatedCarts);
      setCartMessage('Item removed from cart');

      const total = updatedCarts.reduce((sum, cart) => sum + cart.productDto.price * cart.quantity, 0);
      setTotalPrice(total);

      setTimeout(() => setCartMessage(null), 3000);
    } catch (error) {
      console.error('Failed to delete cart:', error);
      setError('Failed to remove item from cart');
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleCheckout = async (customerId, cardData) => {
    try {
      const orderService = new OrderService();
      await orderService.checkout(customerId, cardData); 
      
    } catch (error) {
    }finally{
      setCartMessage('Order placed successfully');
      setTimeout(() => {
        setCartMessage(null);
        navigate('/products');
      }, 4000);
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = (confirm) => {
    setOpenDialog(false);
    if (confirm) {
      setOpenCheckout(true);
    }
  };

  const handleCloseCheckout = () => {
    setOpenCheckout(false);
  };

  const handlePaymentSubmit = async (cardData) => {
    await handleCheckout(customer.id, cardData);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container className="cart-container">
        <Typography variant="h4" component="h2">Shopping Cart</Typography>
        {error && <Alert severity="error" className="error">{error}</Alert>}
        {cartMessage && <Alert severity="success" className="success">{cartMessage}</Alert>}
        {carts.length > 0 ? (
          <ul>
            {carts.map(cart => (
              <li key={cart.id} className="cart-item">
                <div className="cart-details">
                  <span className="product-name">{cart.productDto.name || 'Product not found'} - {cart.quantity} pieces</span>
                  <span className="product-price">${cart.productDto.price}</span>
                </div>
                <IconButton
                  color="primary"
                  className="delete-button"
                  onClick={() => handleDeleteCart(cart.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </li>
            ))}
          </ul>
        ) : (
          <Typography variant="body1">No items in the shopping cart</Typography>
        )}
        <Typography variant="h6" component="p">Total Price: ${totalPrice.toFixed(2)}</Typography>
        <Button
          variant="contained"
          color="primary"
          className="edit-button"
          onClick={handleOpenDialog}
        >
          Checkout
        </Button>
        <Dialog
          open={openDialog}
          onClose={() => handleCloseDialog(false)}
        >
          <DialogTitle>Confirm Checkout</DialogTitle>
          <DialogContent>
            <DialogContentText>Are you sure you want to continue the checkout?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleCloseDialog(false)} color="primary">Cancel</Button>
            <Button onClick={() => handleCloseDialog(true)} color="primary">Confirm</Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openCheckout}
          onClose={handleCloseCheckout}
        >
          <DialogTitle>Payment Details</DialogTitle>
          <DialogContent>
            <CheckoutForm onClose={handleCloseCheckout} onSubmit={handlePaymentSubmit} />
          </DialogContent>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
};

export default Cart;
