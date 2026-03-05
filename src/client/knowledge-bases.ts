import { getHeaders, buildUrl, handleResponse } from './http-client.js';
import type {
  CreateArticlePayload,
  UpdateArticlePayload,
  CreateCollectionPayload,
  CreateRouteRedirectPayload,
} from '../types/pylon.js';

// ─── Knowledge Bases ─────────────────────────────────────────────────────────

export async function listKnowledgeBases() {
  const url = buildUrl('/knowledge-bases');
  const response = await fetch(url, { method: 'GET', headers: getHeaders() });
  return handleResponse(response);
}

export async function getKnowledgeBase(id: string) {
  const url = buildUrl(`/knowledge-bases/${id}`);
  const response = await fetch(url, { method: 'GET', headers: getHeaders() });
  return handleResponse(response);
}

// ─── Articles ────────────────────────────────────────────────────────────────

export async function listArticles(kbId: string, limit = 100, cursor: string | null = null) {
  const url = buildUrl(`/knowledge-bases/${kbId}/articles`, { limit, cursor });
  const response = await fetch(url, { method: 'GET', headers: getHeaders() });
  return handleResponse(response);
}

export async function getArticle(kbId: string, articleId: string) {
  const url = buildUrl(`/knowledge-bases/${kbId}/articles/${articleId}`);
  const response = await fetch(url, { method: 'GET', headers: getHeaders() });
  return handleResponse(response);
}

export async function createArticle(kbId: string, data: CreateArticlePayload) {
  const url = buildUrl(`/knowledge-bases/${kbId}/articles`);
  const response = await fetch(url, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}

export async function updateArticle(kbId: string, articleId: string, data: UpdateArticlePayload) {
  const url = buildUrl(`/knowledge-bases/${kbId}/articles/${articleId}`);
  const response = await fetch(url, {
    method: 'PATCH',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}

export async function deleteArticle(kbId: string, articleId: string) {
  const url = buildUrl(`/knowledge-bases/${kbId}/articles/${articleId}`);
  const response = await fetch(url, { method: 'DELETE', headers: getHeaders() });
  return handleResponse(response);
}

// ─── Collections ─────────────────────────────────────────────────────────────

export async function listCollections(kbId: string) {
  const url = buildUrl(`/knowledge-bases/${kbId}/collections`);
  const response = await fetch(url, { method: 'GET', headers: getHeaders() });
  return handleResponse(response);
}

export async function getCollection(kbId: string, collectionId: string) {
  const url = buildUrl(`/knowledge-bases/${kbId}/collections/${collectionId}`);
  const response = await fetch(url, { method: 'GET', headers: getHeaders() });
  return handleResponse(response);
}

export async function createCollection(kbId: string, data: CreateCollectionPayload) {
  const url = buildUrl(`/knowledge-bases/${kbId}/collections`);
  const response = await fetch(url, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}

// ─── Route Redirects ─────────────────────────────────────────────────────────

export async function createRouteRedirect(kbId: string, data: CreateRouteRedirectPayload) {
  const url = buildUrl(`/knowledge-bases/${kbId}/route-redirects`);
  const response = await fetch(url, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}
