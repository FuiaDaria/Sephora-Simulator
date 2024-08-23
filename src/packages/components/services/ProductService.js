import UrlMapping from '../../globals/UrlMapping';

class ProductService {
  findAll() {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    };

    return fetch(UrlMapping.PRODUCT, requestOptions)
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

  findReviews(productId) {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    };

    return fetch(`${UrlMapping.REVIEW}${UrlMapping.FILTERED_PART}/${productId}`, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Reviews cannot be shown');
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
        'Authorization': `Bearer ${localStorage.getItem('access_token')}` 
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

  async updateProductName(id, name, brand, price, totalQuantity) {
    const requestBody = { 
      name : name,
      brand : brand,
      price : price,
      totalQuantity : totalQuantity
     };

    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      },
      body: JSON.stringify(requestBody)
    };

    const response = await fetch(`${UrlMapping.PRODUCT}/${id}`, requestOptions);
    if (!response.ok) {
      throw new Error(`Cannot update the product: ${response.status} ${response.statusText}`);
    }
    return response.json();
  }

  async changeQuantity(id, name, brand, price, newQuantity) {
    try {
      const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({ name, brand, price, totalQuantity: newQuantity })
      };
  
      const response = await fetch(`${UrlMapping.PRODUCT}/${id}`, requestOptions);
      if (!response.ok) {
        throw new Error(`Cannot change the quantity of the product: ${response.status} ${response.statusText}`);
      }
      return response.json();
    } catch (error) {
      console.error('There was a problem with the fetch operation', error);
      throw error;
    }
  }
  
  
  async changeName(id,newName, brand, price, totalQuantity) {
    try{
    const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({ name: newName, brand, price, totalQuantity })
    };
    const response = await fetch(`${UrlMapping.PRODUCT}/${id}`, requestOptions);
        if (!response.ok) {
          throw new Error(`Cannot change the name of the product: ${response.status} ${response.statusText}`);
        }
        return response.json();
      }catch(error){
        console.error('There was a problem with the fetch operation', error);
        throw error;
      };
    }

  create(name, brand, price, totalQuantity) {
    const requestBody = {
      name: name,
      brand: brand,
      price: price,
      totalQuantity: totalQuantity,
    };
    console.log(JSON.stringify(requestBody))
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      },
      body: JSON.stringify(requestBody)
    };

    return fetch(UrlMapping.PRODUCT, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Cannot create product');
        }
        return response.json();
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation', error);
        throw error;
      });
  }

  async deleteById(productId){
    try{
      const requestOptions = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      };
      const response = await fetch(`${UrlMapping.PRODUCT}/${productId}`, requestOptions);
          if (!response.ok) {
            throw new Error('Cannot delete product');
          }
    }catch(error) {
        console.error('There was a problem with the fetch operation', error);
        throw error;
      };
  }

  async findProductById(productId){
    try{
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    };

    const response = await fetch(`${UrlMapping.PRODUCT}${UrlMapping.FILTERED_PART}/${productId}`, requestOptions)
        if (!response.ok) {
          throw new Error('Cannot get product');
        }
        return response.json();
      }catch(error){
        console.error('There was a problem with the fetch operation', error);
        throw error;
      };
  }

  async findProductsByBrand(brand){
    try{
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    };

    const response = await fetch(`${UrlMapping.PRODUCT}${UrlMapping.FILTERED_PART}/${brand}`, requestOptions)
        if (!response.ok) {
          throw new Error('Cannot get products');
        }
        return response.json();
      }catch(error){
        console.error('There was a problem with the fetch operation', error);
        throw error;
      };
  }
}

export default ProductService;
