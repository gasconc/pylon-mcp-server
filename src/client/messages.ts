import { getHeaders, buildUrl, handleResponse } from './http-client.js';

export async function getIssueMessages(
  issueId: string,
  cursor: string | null = null,
  limit = 100,
) {
  const url = buildUrl(`/issues/${issueId}/messages`, { cursor, limit });
  const response = await fetch(url, { method: 'GET', headers: getHeaders() });
  return handleResponse(response);
}

export async function redactMessage(issueId: string, messageId: string) {
  const url = buildUrl(`/issues/${issueId}/messages/${messageId}/redact`);
  const response = await fetch(url, { method: 'POST', headers: getHeaders() });
  return handleResponse(response);
}
