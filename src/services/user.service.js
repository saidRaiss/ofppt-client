import axios from 'axios';
// import authHeader from './auth-header';

// const API_URL = 'http://localhost:8080/api/';

class UserService {
  getUserDemande(email){
    const data = JSON.stringify({"email":email});
    console.log("UserService > getUserDemande", data)
    const config = {
        method: 'get',
        url: 'http://localhost:8080/api/demande/user',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
    };
    return axios(config).then(response => {
        console.log("response", response)
        localStorage.setItem("demande_user", JSON.stringify(response.data));
        return response.data;
    }).catch(err => {console.log(err)})
  }
  createDemande(demande){
    const data = JSON.stringify(demande);
    const config = {
        method: 'post',
        url: 'http://localhost:8080/api/demande/create',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
    };
    return axios(config).then(response => {
        return response.data;
    })
  }
  getall(){
    return axios.get('http://localhost:8080/api/demande/all').then(response => {
      console.log(response.data)
        return response.data;
    })
  }
  chengerDemandeEtat(email, etat){
    const data = JSON.stringify({"email":email, "etat":etat});
    const config = {
      method: 'post',
      url: 'http://localhost:8080/api/demande/etat',
      headers: { 
          'Content-Type': 'application/json'
      },
      data : data
  };
  return axios(config).then(response => {
    return response.data;
})
  }
  uploadFile(file){
    let formData = new FormData()
    FormData.append("img", file)
  }
}

export default new UserService();