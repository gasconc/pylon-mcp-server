import { getHeaders, buildUrl, handleResponse } from './http-client.js';
import type { CreateTaskPayload, UpdateTaskPayload } from '../types/pylon.js';

export async function createTask(data: CreateTaskPayload) {
  const url = buildUrl('/tasks');
  const response = await fetch(url, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}

export async function updateTask(taskId: string, data: UpdateTaskPayload) {
  const url = buildUrl(`/tasks/${taskId}`);
  const response = await fetch(url, {
    method: 'PATCH',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}

export async function deleteTask(taskId: string) {
  const url = buildUrl(`/tasks/${taskId}`);
  const response = await fetch(url, {
    method: 'DELETE',
    headers: getHeaders(),
  });
  return handleResponse(response);
}
