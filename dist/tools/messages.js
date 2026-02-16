import { z } from 'zod';
import { getIssueMessages, redactMessage } from '../client/messages.js';
// ─── Zod Schemas ─────────────────────────────────────────────────────────────
const GetIssueMessagesSchema = z.object({
    issue_id: z.string().describe('The unique identifier of the issue'),
    limit: z.number().optional().default(100).describe('Maximum number of messages to return'),
    cursor: z.string().optional().describe('Pagination cursor'),
});
const RedactMessageSchema = z.object({
    issue_id: z.string().describe('The unique identifier of the issue'),
    message_id: z.string().describe('The unique identifier of the message to redact'),
});
// ─── Tool Definitions ────────────────────────────────────────────────────────
const tools = [
    {
        name: 'pylon_get_issue_messages',
        description: 'Get all messages for a specific issue.',
        inputSchema: {
            type: 'object',
            properties: {
                issue_id: { type: 'string', description: 'The unique identifier of the issue' },
                limit: { type: 'number', description: 'Maximum number of messages to return (default: 100)' },
                cursor: { type: 'string', description: 'Pagination cursor' },
            },
            required: ['issue_id'],
        },
    },
    {
        name: 'pylon_redact_message',
        description: 'Redact a specific message in an issue.',
        inputSchema: {
            type: 'object',
            properties: {
                issue_id: { type: 'string', description: 'The unique identifier of the issue' },
                message_id: { type: 'string', description: 'The unique identifier of the message to redact' },
            },
            required: ['issue_id', 'message_id'],
        },
    },
];
// ─── Handler ─────────────────────────────────────────────────────────────────
async function handleToolCall(name, args) {
    switch (name) {
        case 'pylon_get_issue_messages': {
            const { issue_id, limit, cursor } = GetIssueMessagesSchema.parse(args);
            const result = await getIssueMessages(issue_id, cursor ?? null, limit);
            return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
        }
        case 'pylon_redact_message': {
            const { issue_id, message_id } = RedactMessageSchema.parse(args);
            const result = await redactMessage(issue_id, message_id);
            return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
        }
        default:
            return null;
    }
}
const messagesModule = { tools, handleToolCall };
export default messagesModule;
//# sourceMappingURL=messages.js.map