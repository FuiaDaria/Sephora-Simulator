import UrlMapping from '../../globals/UrlMapping';

class ReviewService {

  addReview(customerId, productId, description) {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}` // Assuming token is stored in localStorage
      },
      body: JSON.stringify({ customerId, productId, description })
    };

    return fetch(UrlMapping.REVIEW, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Cannot create review');
        }
        return response.json();
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation', error);
        throw error;
      });
  }
}

export default ReviewService;
