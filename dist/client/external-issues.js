import { getHeaders, buildUrl, handleResponse } from './http-client.js';
export async function linkExternalIssue(issueId, externalIssueId, source, operation = 'link') {
    const url = buildUrl(`/issues/${issueId}/external-issues`);
    const body = {
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
//# sourceMappingURL=external-issues.js.map