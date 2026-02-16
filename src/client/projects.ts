import { getHeaders, buildUrl, handleResponse } from './http-client.js';
import type { CreateProjectPayload, UpdateProjectPayload } from '../types/pylon.js';

export async function createProject(data: CreateProjectPayload) {
  const url = buildUrl('/projects');
  const response = await fetch(url, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}

export async function updateProject(projectId: string, data: UpdateProjectPayload) {
  const url = buildUrl(`/projects/${projectId}`);
  const response = await fetch(url, {
    method: 'PATCH',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}

export async function deleteProject(projectId: string) {
  const url = buildUrl(`/projects/${projectId}`);
  const response = await fetch(url, {
    method: 'DELETE',
    headers: getHeaders(),
  });
  return handleResponse(response);
}
