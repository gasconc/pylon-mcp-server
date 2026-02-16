import { getHeaders, buildUrl, handleResponse } from './http-client.js';
export async function createProject(data) {
    const url = buildUrl('/projects');
    const response = await fetch(url, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data),
    });
    return handleResponse(response);
}
export async function updateProject(projectId, data) {
    const url = buildUrl(`/projects/${projectId}`);
    const response = await fetch(url, {
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify(data),
    });
    return handleResponse(response);
}
export async function deleteProject(projectId) {
    const url = buildUrl(`/projects/${projectId}`);
    const response = await fetch(url, {
        method: 'DELETE',
        headers: getHeaders(),
    });
    return handleResponse(response);
}
//# sourceMappingURL=projects.js.map