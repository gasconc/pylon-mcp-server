import { getHeaders, buildUrl, handleResponse } from './http-client.js';
import type { CreateAccountPayload, UpdateAccountPayload } from '../types/pylon.js';

export async function listAccounts(limit = 100, cursor: string | null = null) {
  const url = buildUrl('/accounts', { limit, cursor });
  const response = await fetch(url, { method: 'GET', headers: getHeaders() });
  return handleResponse(response);
}

export async function getAccount(accountId: string) {
  const url = buildUrl(`/accounts/${accountId}`);
  const response = await fetch(url, { method: 'GET', headers: getHeaders() });
  return handleResponse(response);
}

export async function createAccount(data: CreateAccountPayload) {
  const url = buildUrl('/accounts');
  const response = await fetch(url, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}

export async function updateAccount(accountId: string, data: UpdateAccountPayload) {
  const url = buildUrl(`/accounts/${accountId}`);
  const response = await fetch(url, {
    method: 'PATCH',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}
