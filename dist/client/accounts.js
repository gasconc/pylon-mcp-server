import { getHeaders, buildUrl, handleResponse } from './http-client.js';
export async function listAccounts(limit = 100, cursor = null) {
    const url = buildUrl('/accounts', { limit, cursor });
    const response = await fetch(url, { method: 'GET', headers: getHeaders() });
    return handleResponse(response);
}
export async function getAccount(accountId) {
    const url = buildUrl(`/accounts/${accountId}`);
    const response = await fetch(url, { method: 'GET', headers: getHeaders() });
    return handleResponse(response);
}
export async function createAccount(data) {
    const url = buildUrl('/accounts');
    const response = await fetch(url, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data),
    });
    return handleResponse(response);
}
export async function updateAccount(accountId, data) {
    const url = buildUrl(`/accounts/${accountId}`);
    const response = await fetch(url, {
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify(data),
    });
    return handleResponse(response);
}
//# sourceMappingURL=accounts.js.map