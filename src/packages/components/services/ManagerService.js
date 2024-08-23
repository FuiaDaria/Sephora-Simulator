import UrlMapping from '../../globals/UrlMapping';

class ManagerService {
  findAll() {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}` // Assuming token is stored in localStorage
      }
    };

    return fetch(UrlMapping.MANAGER, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Managers cannot be shown');
        }
        return response.json();
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation', error);
        throw error;
      });
  }

  findById(managerId) {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}` // Assuming token is stored in localStorage
      }
    };
    return fetch(`${UrlMapping.MANAGER}/${managerId}`, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Manager cannot be shown');
        }
        return response.json();
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation', error);
        throw error;
      });
  }
  findByUserId(userId){
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}` // Assuming token is stored in localStorage
      }
    };
    return fetch(`${UrlMapping.MANAGER}/${userId}`, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Manager cannot be shown');
        }
        return response.json();
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation', error);
        throw error;
      });
  }

  findManager(userId){
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}` // Assuming token is stored in localStorage
      }
    };
    return fetch(`${UrlMapping.MANAGER}${UrlMapping.BY_USER}/${userId}`, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Manager cannot be shown');
        }
        return response.json();
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation', error);
        throw error;
      });
  }

  async changeSalary(id,newSalary, userDto) {
    try{
    const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({ salary: newSalary, userDto })
    };
    const response = await fetch(`${UrlMapping.MANAGER}/${id}`, requestOptions);
        if (!response.ok) {
          throw new Error(`Cannot change the salary of the manager: ${response.status} ${response.statusText}`);
        }
        return response.json();
      }catch(error){
        console.error('There was a problem with the fetch operation', error);
        throw error;
      };
    }
}
export default ManagerService;
