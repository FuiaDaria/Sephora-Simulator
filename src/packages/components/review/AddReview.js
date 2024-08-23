import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import ReviewService from '../services/ReviewService.js';
import CustomerService from '../services/CustomerService';

function AddReview() {
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { productId } = useParams(); // Get productId from route parameters
  const userId = localStorage.getItem('user_id');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const customerService = new CustomerService();
      const customer = await customerService.findCustomer(userId);
      const reviewService = new ReviewService();
      await reviewService.addReview(customer.id, productId, description);
      setSuccess('Review added successfully');
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (error) {
      console.error('Failed to add review: ', error.message);
      setError('Failed to add review');
    }
  };

  return (
    <div className="AddReview">
      <h2>Add New Review</h2>
      <form onSubmit={handleSubmit} className="add-review-form">
        <div className="form-input">
          <label htmlFor="description" className="form-label">Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="add-button">Add Review</button>
      </form>
      {error && <Alert className='custom-alert' variant="filled" severity="error">{error}</Alert>}
      {success && <Alert className='custom-alert' variant="filled" severity="success">{success}</Alert>}
    </div>
  );
}

export default AddReview;
