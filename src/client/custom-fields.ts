import { getHeaders, buildUrl, handleResponse } from './http-client.js';
import type {
  CustomFieldObjectType,
  CreateCustomFieldPayload,
  UpdateCustomFieldPayload,
} from '../types/pylon.js';

export async function listCustomFields(
  objectType: CustomFieldObjectType,
  cursor: string | null = null,
) {
  const url = buildUrl('/custom-fields', { object_type: objectType, cursor });
  const response = await fetch(url, { method: 'GET', headers: getHeaders() });
  return handleResponse(response);
}

export async function getCustomField(customFieldId: string) {
  const url = buildUrl(`/custom-fields/${customFieldId}`);
  const response = await fetch(url, { method: 'GET', headers: getHeaders() });
  return handleResponse(response);
}

export async function createCustomField(data: CreateCustomFieldPayload) {
  const url = buildUrl('/custom-fields');
  const response = await fetch(url, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}

export async function updateCustomField(customFieldId: string, data: UpdateCustomFieldPayload) {
  const url = buildUrl(`/custom-fields/${customFieldId}`);
  const response = await fetch(url, {
    method: 'PATCH',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}
