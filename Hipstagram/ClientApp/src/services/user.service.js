import { authHeader } from '../helpers/auth-header.js';
export const userService = {
    login,
    logout,
    getAll,
    deleteUser
};

function login(Login, Password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Login, Password })
    };
    console.log(JSON.stringify({ Login, Password }))
    console.log(`/api/users/authenticate`)
    return fetch(`/api/users/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // Login successful if there's a user in the response
            if (user) {
                console.log(user)
                // store user details and basic auth credentials in local storage
                // to keep user logged in between page refreshes
                user.authdata = window.btoa(Login + ':' + Password);
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function deleteUser(id){
    const requestOptions = {
        method: 'DELETE',
        headers: {
            ...{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            ...authHeader()
        }
    };
    return fetch(`/api/users/${id}`, requestOptions)
        .then(handleResponse)
        .then(user => {
            if (user.id == localStorage.user.id) {
                logout();
            }
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

    return fetch(`/api/users`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        console.log(text)
        const data = text && JSON.parse(text);
        console.log(data)
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}