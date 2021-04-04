import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  login(email, password) {
    const data = JSON.stringify({"email":email,"password":password});
    const config = {
        method: 'post',
        url: 'http://localhost:8080/api/auth/signin',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
    };
    return axios(config).then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      })
  }
  loginadmin(username, password) {
    const data = JSON.stringify({"username":username,"password":password});
    const config = {
        method: 'post',
        url: 'http://localhost:8080/api/auth/signinadmin',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
    };
    return axios(config).then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      })
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(firstname, lastname, username, email, password) {
    const data = JSON.stringify({"firstname":firstname, "lastname":lastname, "username":username,"email":email, "password":password});
    const config = {
      method: 'post',
      url: 'http://localhost:8080/api/auth/signup',
      headers: { 
          'Content-Type': 'application/json'
      },
      data : data
    };
    return axios(config).then(response => {
      return response.data;
    });
    // return axios.post(API_URL + "signup", {
    //   username,
    //   email,
    //   password
    // });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();