import { getHeaders, buildUrl, handleResponse } from './http-client.js';
import type { CreateIssuePayload, UpdateIssuePayload, IssueFilter } from '../types/pylon.js';

export async function listIssues(
  startTime: string,
  endTime: string,
  cursor: string | null = null,
  limit = 100,
) {
  const url = buildUrl('/issues', {
    start_time: startTime,
    end_time: endTime,
    cursor,
    limit,
  });
  const response = await fetch(url, { method: 'GET', headers: getHeaders() });
  return handleResponse(response);
}

export async function getIssue(issueId: string) {
  const url = buildUrl(`/issues/${issueId}`);
  const response = await fetch(url, { method: 'GET', headers: getHeaders() });
  return handleResponse(response);
}

export async function createIssue(data: CreateIssuePayload) {
  const url = buildUrl('/issues');
  const response = await fetch(url, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}

export async function updateIssue(issueId: string, data: UpdateIssuePayload) {
  const url = buildUrl(`/issues/${issueId}`);
  const response = await fetch(url, {
    method: 'PATCH',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}

export async function searchIssues(
  filter: IssueFilter | null = null,
  cursor: string | null = null,
  limit = 100,
) {
  const url = buildUrl('/issues/search');
  const body: Record<string, unknown> = {};
  if (filter) body.filter = filter;
  if (cursor) body.cursor = cursor;
  if (limit) body.limit = limit;

  const response = await fetch(url, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(body),
  });
  return handleResponse(response);
}
