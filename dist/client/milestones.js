import { getHeaders, buildUrl, handleResponse } from './http-client.js';
export async function createMilestone(data) {
    const url = buildUrl('/milestones');
    const response = await fetch(url, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data),
    });
    return handleResponse(response);
}
export async function updateMilestone(milestoneId, data) {
    const url = buildUrl(`/milestones/${milestoneId}`);
    const response = await fetch(url, {
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify(data),
    });
    return handleResponse(response);
}
export async function deleteMilestone(milestoneId) {
    const url = buildUrl(`/milestones/${milestoneId}`);
    const response = await fetch(url, {
        method: 'DELETE',
        headers: getHeaders(),
    });
    return handleResponse(response);
}
//# sourceMappingURL=milestones.js.map