import { z } from 'zod';
import { listIssues, getIssue, createIssue, updateIssue, searchIssues } from '../client/issues.js';
// ─── Zod Schemas ─────────────────────────────────────────────────────────────
const ListIssuesSchema = z.object({
    start_time: z.string().describe('Start time in ISO 8601 format'),
    end_time: z.string().describe('End time in ISO 8601 format'),
    limit: z.number().optional().default(100).describe('Maximum number of issues to return'),
    cursor: z.string().optional().describe('Pagination cursor'),
});
const GetIssueSchema = z.object({
    issue_id: z.string().describe('The unique identifier of the issue'),
});
const CreateIssueSchema = z.object({
    body_html: z.string().describe('HTML body of the issue message'),
    account_id: z.string().optional().describe('Account ID to associate with the issue'),
    assignee_id: z.string().optional().describe('User ID to assign the issue to'),
    state: z.string().optional().describe('State of the issue'),
    priority: z.string().optional().describe('Priority of the issue'),
    tags: z.array(z.string()).optional().describe('Tags for the issue'),
    custom_fields: z.record(z.any()).optional().describe('Custom fields for the issue'),
    title: z.string().optional().describe('Title of the issue'),
});
const UpdateIssueSchema = z.object({
    issue_id: z.string().describe('The unique identifier of the issue to update'),
    assignee_id: z.string().optional().describe('User ID to assign the issue to'),
    state: z.string().optional().describe('State of the issue'),
    priority: z.string().optional().describe('Priority of the issue'),
    tags: z.array(z.string()).optional().describe('Tags for the issue'),
    custom_fields: z.record(z.any()).optional().describe('Custom fields'),
    title: z.string().optional().describe('Title of the issue'),
});
const FilterSchema = z.lazy(() => z.object({
    field: z.string().optional().describe('The field to filter on'),
    operator: z
        .enum([
        'equals', 'not_equals', 'contains', 'not_contains', 'in', 'not_in',
        'and', 'or', 'time_is_after', 'time_is_before', 'time_range',
    ])
        .describe('The filter operator'),
    value: z.string().optional().describe('Single value to filter by'),
    values: z.array(z.string()).optional().describe('Multiple values (for in/not_in)'),
    subfilters: z.array(FilterSchema).optional().describe('Nested filters for and/or'),
}));
const SearchIssuesSchema = z.object({
    filter: FilterSchema.optional().describe('Filter object to search issues'),
    cursor: z.string().optional().describe('Pagination cursor'),
    limit: z.number().optional().default(100).describe('Maximum issues to return'),
});
// ─── Tool Definitions ────────────────────────────────────────────────────────
const tools = [
    {
        name: 'pylon_list_issues',
        description: 'List issues within a time range in Pylon.',
        inputSchema: {
            type: 'object',
            properties: {
                start_time: { type: 'string', description: 'Start time in ISO 8601 format' },
                end_time: { type: 'string', description: 'End time in ISO 8601 format' },
                limit: { type: 'number', description: 'Maximum number of issues to return (default: 100)' },
                cursor: { type: 'string', description: 'Pagination cursor' },
            },
            required: ['start_time', 'end_time'],
        },
    },
    {
        name: 'pylon_get_issue',
        description: 'Get a specific issue by its ID.',
        inputSchema: {
            type: 'object',
            properties: {
                issue_id: { type: 'string', description: 'The unique identifier of the issue' },
            },
            required: ['issue_id'],
        },
    },
    {
        name: 'pylon_create_issue',
        description: 'Create a new issue in Pylon.',
        inputSchema: {
            type: 'object',
            properties: {
                body_html: { type: 'string', description: 'HTML body of the issue message' },
                account_id: { type: 'string', description: 'Account ID to associate with the issue' },
                assignee_id: { type: 'string', description: 'User ID to assign the issue to' },
                state: { type: 'string', description: 'State of the issue' },
                priority: { type: 'string', description: 'Priority of the issue' },
                tags: { type: 'array', items: { type: 'string' }, description: 'Tags for the issue' },
                custom_fields: { type: 'object', description: 'Custom fields for the issue' },
                title: { type: 'string', description: 'Title of the issue' },
            },
            required: ['body_html'],
        },
    },
    {
        name: 'pylon_update_issue',
        description: 'Update an existing issue in Pylon.',
        inputSchema: {
            type: 'object',
            properties: {
                issue_id: { type: 'string', description: 'The unique identifier of the issue to update' },
                assignee_id: { type: 'string', description: 'User ID to assign the issue to' },
                state: { type: 'string', description: 'State of the issue' },
                priority: { type: 'string', description: 'Priority of the issue' },
                tags: { type: 'array', items: { type: 'string' }, description: 'Tags for the issue' },
                custom_fields: { type: 'object', description: 'Custom fields' },
                title: { type: 'string', description: 'Title of the issue' },
            },
            required: ['issue_id'],
        },
    },
    {
        name: 'pylon_search_issues',
        description: 'Search issues in Pylon using filters. Supports complex queries with AND/OR operators and nested filters. Common filter fields: state, priority, assignee_id, account_id, tags, requester.email, source, team_id.',
        inputSchema: {
            type: 'object',
            properties: {
                filter: {
                    type: 'object',
                    description: 'Filter object for searching. Use "and"/"or" operators with subfilters for complex queries.',
                    properties: {
                        field: { type: 'string', description: 'Field to filter on' },
                        operator: {
                            type: 'string',
                            enum: ['equals', 'not_equals', 'contains', 'not_contains', 'in', 'not_in', 'and', 'or', 'time_is_after', 'time_is_before', 'time_range'],
                            description: 'The filter operator',
                        },
                        value: { type: 'string', description: 'Single value to filter by' },
                        values: { type: 'array', items: { type: 'string' }, description: 'Multiple values (for in/not_in)' },
                        subfilters: { type: 'array', description: 'Nested filters for and/or', items: { type: 'object', description: 'Nested filter' } },
                    },
                },
                cursor: { type: 'string', description: 'Pagination cursor' },
                limit: { type: 'number', description: 'Maximum issues to return (default: 100)' },
            },
            required: [],
        },
    },
];
// ─── Handler ─────────────────────────────────────────────────────────────────
async function handleToolCall(name, args) {
    switch (name) {
        case 'pylon_list_issues': {
            const { start_time, end_time, limit, cursor } = ListIssuesSchema.parse(args);
            const result = await listIssues(start_time, end_time, cursor ?? null, limit);
            return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
        }
        case 'pylon_get_issue': {
            const { issue_id } = GetIssueSchema.parse(args);
            const result = await getIssue(issue_id);
            return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
        }
        case 'pylon_create_issue': {
            const data = CreateIssueSchema.parse(args);
            const result = await createIssue(data);
            return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
        }
        case 'pylon_update_issue': {
            const { issue_id, ...data } = UpdateIssueSchema.parse(args);
            const result = await updateIssue(issue_id, data);
            return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
        }
        case 'pylon_search_issues': {
            const { filter, cursor, limit } = SearchIssuesSchema.parse(args);
            const result = await searchIssues(filter ?? null, cursor ?? null, limit);
            return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
        }
        default:
            return null;
    }
}
const issuesModule = { tools, handleToolCall };
export default issuesModule;
//# sourceMappingURL=issues.js.map