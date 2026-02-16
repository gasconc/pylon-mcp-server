import { getHeaders, buildUrl, handleResponse } from './http-client.js';
import type { ExternalIssueSource, ExternalIssueOperation } from '../types/pylon.js';

export async function linkExternalIssue(
  issueId: string,
  externalIssueId: string,
  source: ExternalIssueSource,
  operation: ExternalIssueOperation = 'link',
) {
  const url = buildUrl(`/issues/${issueId}/external-issues`);

  const body: Record<string, string> = {
    external_issue_id: externalIssueId,
    source,
  };

  if (operation === 'remove') {
    body.operation = 'remove';
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(body),
  });
  return handleResponse(response);
}
