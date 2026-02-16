import { getHeaders, buildUrl, handleResponse } from './http-client.js';
export async function createTask(data) {
    const url = buildUrl('/tasks');
    const response = await fetch(url, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data),
    });
    return handleResponse(response);
}
export async function updateTask(taskId, data) {
    const url = buildUrl(`/tasks/${taskId}`);
    const response = await fetch(url, {
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify(data),
    });
    return handleResponse(response);
}
export async function deleteTask(taskId) {
    const url = buildUrl(`/tasks/${taskId}`);
    const response = await fetch(url, {
        method: 'DELETE',
        headers: getHeaders(),
    });
    return handleResponse(response);
}
//# sourceMappingURL=tasks.js.map