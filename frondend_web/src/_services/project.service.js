import config from 'config';
import {authHeader} from '../_helpers';

export const projectService = {
    getAll,
};

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/projects/`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.json().then(text => {
        const data = text;
        if (!response.ok) {
            if (response.status === 401) {
                // logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}