import React, { useState } from 'react';
import { Button } from '@mui/material';
import './CheckoutForm.css'; // Add styles as needed

function CheckoutForm({ onClose, onSubmit }) {
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [paymentResult, setPaymentResult] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const cardData = {cardName, cardNumber,expiry, cvv };
    try {
      await onSubmit(cardData);
      setPaymentResult('Payment successful');
      setTimeout(() => {
        setPaymentResult('');
        onClose();
      }, 3000);
    } catch (error) {
      setPaymentResult('Payment failed');
    }
  };

  return (
    <div className="checkout-form">
      <h1>Enter Payment Details</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="cardName">Card Holder Name:</label>
        <input type="text" id="cardName" value={cardName} onChange={(e) => setName(e.target.value)} required /><br />
        <label htmlFor="cardNumber">Card Number:</label>
        <input type="text" id="cardNumber" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required /><br />
        <label htmlFor="expiry">Expiry Date:</label>
        <input type="text" id="expiry" value={expiry} onChange={(e) => setExpiry(e.target.value)} placeholder="MM/YY" required /><br />
        <label htmlFor="cvv">CVV:</label>
        <input type="text" id="cvv" value={cvv} onChange={(e) => setCvv(e.target.value)} required /><br />
        <div className="form-buttons">
          <Button type="button" onClick={onClose} variant="contained" color="primary">Cancel</Button>
          <Button type="submit" variant="contained" color="primary">Pay Now</Button>
        </div>
      </form>
      <div>{paymentResult}</div>
    </div>
  );
}

export default CheckoutForm;
