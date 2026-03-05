import { getHeaders, buildUrl, handleResponse } from './http-client.js';
// ─── Knowledge Bases ─────────────────────────────────────────────────────────
export async function listKnowledgeBases() {
    const url = buildUrl('/knowledge-bases');
    const response = await fetch(url, { method: 'GET', headers: getHeaders() });
    return handleResponse(response);
}
export async function getKnowledgeBase(id) {
    const url = buildUrl(`/knowledge-bases/${id}`);
    const response = await fetch(url, { method: 'GET', headers: getHeaders() });
    return handleResponse(response);
}
// ─── Articles ────────────────────────────────────────────────────────────────
export async function listArticles(kbId, limit = 100, cursor = null) {
    const url = buildUrl(`/knowledge-bases/${kbId}/articles`, { limit, cursor });
    const response = await fetch(url, { method: 'GET', headers: getHeaders() });
    return handleResponse(response);
}
export async function getArticle(kbId, articleId) {
    const url = buildUrl(`/knowledge-bases/${kbId}/articles/${articleId}`);
    const response = await fetch(url, { method: 'GET', headers: getHeaders() });
    return handleResponse(response);
}
export async function createArticle(kbId, data) {
    const url = buildUrl(`/knowledge-bases/${kbId}/articles`);
    const response = await fetch(url, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data),
    });
    return handleResponse(response);
}
export async function updateArticle(kbId, articleId, data) {
    const url = buildUrl(`/knowledge-bases/${kbId}/articles/${articleId}`);
    const response = await fetch(url, {
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify(data),
    });
    return handleResponse(response);
}
export async function deleteArticle(kbId, articleId) {
    const url = buildUrl(`/knowledge-bases/${kbId}/articles/${articleId}`);
    const response = await fetch(url, { method: 'DELETE', headers: getHeaders() });
    return handleResponse(response);
}
// ─── Collections ─────────────────────────────────────────────────────────────
export async function listCollections(kbId) {
    const url = buildUrl(`/knowledge-bases/${kbId}/collections`);
    const response = await fetch(url, { method: 'GET', headers: getHeaders() });
    return handleResponse(response);
}
export async function getCollection(kbId, collectionId) {
    const url = buildUrl(`/knowledge-bases/${kbId}/collections/${collectionId}`);
    const response = await fetch(url, { method: 'GET', headers: getHeaders() });
    return handleResponse(response);
}
export async function createCollection(kbId, data) {
    const url = buildUrl(`/knowledge-bases/${kbId}/collections`);
    const response = await fetch(url, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data),
    });
    return handleResponse(response);
}
// ─── Route Redirects ─────────────────────────────────────────────────────────
export async function createRouteRedirect(kbId, data) {
    const url = buildUrl(`/knowledge-bases/${kbId}/route-redirects`);
    const response = await fetch(url, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data),
    });
    return handleResponse(response);
}
//# sourceMappingURL=knowledge-bases.js.map