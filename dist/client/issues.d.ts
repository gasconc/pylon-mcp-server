import type { CreateIssuePayload, UpdateIssuePayload, IssueFilter } from '../types/pylon.js';
export declare function listIssues(startTime: string, endTime: string, cursor?: string | null, limit?: number): Promise<unknown>;
export declare function getIssue(issueId: string): Promise<unknown>;
export declare function createIssue(data: CreateIssuePayload): Promise<unknown>;
export declare function updateIssue(issueId: string, data: UpdateIssuePayload): Promise<unknown>;
export declare function searchIssues(filter?: IssueFilter | null, cursor?: string | null, limit?: number): Promise<unknown>;
//# sourceMappingURL=issues.d.ts.map