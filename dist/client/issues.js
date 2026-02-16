import { getHeaders, buildUrl, handleResponse } from './http-client.js';
export async function listIssues(startTime, endTime, cursor = null, limit = 100) {
    const url = buildUrl('/issues', {
        start_time: startTime,
        end_time: endTime,
        cursor,
        limit,
    });
    const response = await fetch(url, { method: 'GET', headers: getHeaders() });
    return handleResponse(response);
}
export async function getIssue(issueId) {
    const url = buildUrl(`/issues/${issueId}`);
    const response = await fetch(url, { method: 'GET', headers: getHeaders() });
    return handleResponse(response);
}
export async function createIssue(data) {
    const url = buildUrl('/issues');
    const response = await fetch(url, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data),
    });
    return handleResponse(response);
}
export async function updateIssue(issueId, data) {
    const url = buildUrl(`/issues/${issueId}`);
    const response = await fetch(url, {
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify(data),
    });
    return handleResponse(response);
}
export async function searchIssues(filter = null, cursor = null, limit = 100) {
    const url = buildUrl('/issues/search');
    const body = {};
    if (filter)
        body.filter = filter;
    if (cursor)
        body.cursor = cursor;
    if (limit)
        body.limit = limit;
    const response = await fetch(url, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(body),
    });
    return handleResponse(response);
}
//# sourceMappingURL=issues.js.map