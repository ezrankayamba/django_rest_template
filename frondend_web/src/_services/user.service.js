import config from 'config';
import {authHeader} from '../_helpers';

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete
};

function login(username, password) {
    let body = {
        username,
        password,
        'grant_type': 'password',
        'client_id': config.clientId,
        'client_secret': config.clientSecret
    };
    let formBody = [];
    for (let property in body) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(body[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    console.log(formBody)
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: formBody
    };

    return fetch(`${config.apiUrl}/oauth2/token/`, requestOptions)
        .then(handleResponse)
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/users/register`, requestOptions).then(handleResponse);
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: {...authHeader(), 'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);
    ;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.json().then(text => {
        const data = text;
        if (!response.ok) {
            if (response.status === 401) {
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        } else {
            let opts = {
                headers: {'Authorization': `Bearer ${data.access_token}`},
            }
            return fetch(`${config.apiUrl}/users/me/`, opts)
                .then(res => {
                    let user = res.json();
                    let newUser = {...user, token: data.access_token}
                    return newUser
                })
        }
        // return data;
    });
}