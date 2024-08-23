import UrlMapping from '../../globals/UrlMapping';

class CustomerService {
  findAll() {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}` // Assuming token is stored in localStorage
      }
    };

    return fetch(UrlMapping.CUSTOMER, requestOptions)
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

  findById(customerId) {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}` // Assuming token is stored in localStorage
      }
    };
    return fetch(`${UrlMapping.CUSTOMER}/${customerId}`, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Customer cannot be shown');
        }
        return response.json();
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation', error);
        throw error;
      });
  }
  async findByUserId(userId){
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}` // Assuming token is stored in localStorage
      }
    };
    try{
      const response = await fetch(`${UrlMapping.USER}/${userId}`, requestOptions);
      if (!response.ok) {
        throw new Error('Customer cannot be shown');
      }
      return await response.json();
    }catch(error){
        console.error('There was a problem with the fetch operation', error);
        throw error;
      };
  }

  findCustomer(userId){
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}` // Assuming token is stored in localStorage
      }
    };
    return fetch(`${UrlMapping.CUSTOMER}${UrlMapping.BY_USER}/${userId}`, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Customer cannot be shown');
        }
        return response.json();
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation', error);
        throw error;
      });
  }
}
export default CustomerService;
