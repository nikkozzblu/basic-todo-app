import { apiUrl } from './config';
import { handleResponse, requestOptions } from '../helpers';

export const taskService = {
    list,
    add,
    edit,
    remove
};

function list() {
    const options = requestOptions('GET');
    return fetch(apiUrl + '/tasks/', options).then(handleResponse);
}

function add(task) {
    return postAndRecieve(task, 'create');
}

function edit(task) {
    return postAndRecieve(task, 'edit/' + task._id);
}

function remove(task) {
    return postAndRecieve(task, 'delete/' + task._id);
}

function postAndRecieve(task, url) {
    const options = requestOptions('POST',task);
    return fetch(apiUrl + '/tasks/' + url, options).then(handleResponse);
}