import UrlMapping from '../../globals/UrlMapping';
import axios from 'axios';

class OrderService {
    async addOrder(customerId) {
        try {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}` // Assuming token is stored in localStorage
                },
                body: JSON.stringify(customerId)
            };

            const response = await fetch(UrlMapping.ORDER, requestOptions)
            if (!response.ok) {
                throw new Error('Cannot add order');
            }
            return response.json();
        } catch (error) {
            console.error('There was a problem with the fetch operation', error);
            throw error;
        };
    }

    async charge(amount, currency, stripeEmail, stripeToken) {
        try {
            const payload = {
                amount: amount,
                currency: currency,
                stripeEmail: stripeEmail,
                stripeToken: stripeToken
            };

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                },
                body: JSON.stringify(payload)
            };

            const response = await fetch(UrlMapping.CHECKOUT, requestOptions);
            if (!response.ok) {
                throw new Error('Cannot charge the order');
            }

            return response.json();
        } catch (error) {
            console.error('There was a problem with the operation', error);
            throw error;
        }

    }
    async checkout(customerId, cardData) {
        try {
            console.log(JSON.stringify(cardData));
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}` 
                },
                body: JSON.stringify(cardData)
            };

            const response = fetch(`${UrlMapping.CHECKOUT}/${customerId}`, requestOptions);
            if (!response.ok) {
                throw new Error('Cannot checkout');
            }

        } catch (error) {
            console.error('There was a problem with the operation', error);
            throw error;
        }
    }

}
export default OrderService;