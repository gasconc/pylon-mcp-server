import { getHeaders, buildUrl, handleResponse } from './http-client.js';
import type { CreateMilestonePayload, UpdateMilestonePayload } from '../types/pylon.js';

export async function createMilestone(data: CreateMilestonePayload) {
  const url = buildUrl('/milestones');
  const response = await fetch(url, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}

export async function updateMilestone(milestoneId: string, data: UpdateMilestonePayload) {
  const url = buildUrl(`/milestones/${milestoneId}`);
  const response = await fetch(url, {
    method: 'PATCH',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}

export async function deleteMilestone(milestoneId: string) {
  const url = buildUrl(`/milestones/${milestoneId}`);
  const response = await fetch(url, {
    method: 'DELETE',
    headers: getHeaders(),
  });
  return handleResponse(response);
}
