import config, { getAuthHeader } from '../config.js';

export function getHeaders(): Record<string, string> {
  return {
    Authorization: getAuthHeader(),
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
}

export function buildUrl(
  endpoint: string,
  queryParams: Record<string, string | number | boolean | null | undefined> = {},
): string {
  const baseUrl = config.pylon.baseUrl.replace(/\/$/, '');
  const url = new URL(`${baseUrl}${endpoint}`);

  for (const [key, value] of Object.entries(queryParams)) {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, String(value));
    }
  }

  return url.toString();
}

export async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({})) as Record<string, unknown>;
    throw new Error(
      `Pylon API error: ${response.status} - ${(error.message as string) || (error.error as string) || response.statusText}`,
    );
  }
  return response.json() as Promise<T>;
}
