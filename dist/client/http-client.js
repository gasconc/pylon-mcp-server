import config, { getAuthHeader } from '../config.js';
export function getHeaders() {
    return {
        Authorization: getAuthHeader(),
        Accept: 'application/json',
        'Content-Type': 'application/json',
    };
}
export function buildUrl(endpoint, queryParams = {}) {
    const baseUrl = config.pylon.baseUrl.replace(/\/$/, '');
    const url = new URL(`${baseUrl}${endpoint}`);
    for (const [key, value] of Object.entries(queryParams)) {
        if (value !== undefined && value !== null) {
            url.searchParams.append(key, String(value));
        }
    }
    return url.toString();
}
export async function handleResponse(response) {
    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(`Pylon API error: ${response.status} - ${error.message || error.error || response.statusText}`);
    }
    return response.json();
}
//# sourceMappingURL=http-client.js.map