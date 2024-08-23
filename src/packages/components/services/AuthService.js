import UrlMapping from '../../globals/UrlMapping';

class AuthService{
  
login(username, password) {

    const requestBody = {
        username: username,
        password: password
      };

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      };
      console.log(UrlMapping.SIGN_IN)
      return fetch(UrlMapping.SIGN_IN, requestOptions)
      .then(response => {
        if(!response.ok){
            throw new Error('Login could not be done')
        }
        return response.json();
      })
      .then(
        data => {
            localStorage.setItem("access_token", data.token)
            localStorage.setItem("user_id", data.id)
            return data;
        }
      )
      .catch(error =>
        {
            console.error("There was a problem with the fetch operation", error);
            throw error;
        }
    )
    }

    register(username, email, password, role) {
      const requestBody = {
        username: username,
        email: email,
        password: password,
        role: role
      };
  
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      };

      return fetch(UrlMapping.SIGN_UP, requestOptions)
        .then(response => {
          if (!response.ok) {
            throw new Error('Registration could not be done');
          }
          return response.json();
        })
        .then(data => {
          console.log('Registration successful', data);
          return data;
        })
        .catch(error => {
          console.error("There was a problem with the fetch operation", error);
          throw error;
        });
    }
  
    getToken() {
      return localStorage.getItem('access_token');
    }
  }

export default AuthService