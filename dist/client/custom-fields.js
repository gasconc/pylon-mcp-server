import { getHeaders, buildUrl, handleResponse } from './http-client.js';
export async function listCustomFields(objectType, cursor = null) {
    const url = buildUrl('/custom-fields', { object_type: objectType, cursor });
    const response = await fetch(url, { method: 'GET', headers: getHeaders() });
    return handleResponse(response);
}
export async function getCustomField(customFieldId) {
    const url = buildUrl(`/custom-fields/${customFieldId}`);
    const response = await fetch(url, { method: 'GET', headers: getHeaders() });
    return handleResponse(response);
}
export async function createCustomField(data) {
    const url = buildUrl('/custom-fields');
    const response = await fetch(url, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data),
    });
    return handleResponse(response);
}
export async function updateCustomField(customFieldId, data) {
    const url = buildUrl(`/custom-fields/${customFieldId}`);
    const response = await fetch(url, {
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify(data),
    });
    return handleResponse(response);
}
//# sourceMappingURL=custom-fields.js.map