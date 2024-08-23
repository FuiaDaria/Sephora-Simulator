import UrlMapping from '../../globals/UrlMapping';

class CartService {
  findByCustomerId(customerId) {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}` // Assuming token is stored in localStorage
      }
    };

    return fetch(`${UrlMapping.CART}${UrlMapping.FILTERED_PART}/${customerId}`, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Products cannot be shown');
        }
        return response.json();
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation', error);
        throw error;
      });
  }

  addToCart(customerId, productId, quantity) {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}` // Assuming token is stored in localStorage
      },
      body: JSON.stringify({ customerId, productId, quantity })
    };

    return fetch(UrlMapping.CART, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Cannot add product to cart');
        }
        return response.json();
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation', error);
        throw error;
      });
  }

  async deleteCart(cartId){
    try{
      const requestOptions = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}` // Assuming token is stored in localStorage
        }
      };
      const response = await fetch(`${UrlMapping.CART}/${cartId}`, requestOptions);
          if (!response.ok) {
            throw new Error('Cannot delete cart');
          }
    }catch(error) {
        console.error('There was a problem with the fetch operation', error);
        throw error;
      };
  }
}

export default CartService;
