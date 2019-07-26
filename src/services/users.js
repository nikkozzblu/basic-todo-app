import { apiUrl } from './config';
import { handleResponse, requestOptions } from '../helpers'

export const userService = {
    login,
    signup,
    logout
};

function login(username, password) {
    const options = requestOptions('POST',{ username, password });
    return fetch(apiUrl + `/login/`, options)
        .then(handleResponse)
        .then(user => sessionStorage.setItem('user', user.username));
}

function logout() {
    const options = requestOptions('POST');
    return fetch(apiUrl + `/logout/`, options)
        .then(handleResponse)
        .then(() => sessionStorage.removeItem('user'));
}


function signup(username, password) {
    const options = requestOptions('POST',{ username, password });        
    return fetch(apiUrl + `/signup/`, options)
        .then(handleResponse)
        .then(user => sessionStorage.setItem('user', user.username));
}
