import { z } from 'zod';
import { listAccounts, getAccount, createAccount, updateAccount } from '../client/accounts.js';
// ─── Zod Schemas ─────────────────────────────────────────────────────────────
const ListAccountsSchema = z.object({
    limit: z.number().optional().default(100).describe('Maximum number of accounts to return'),
    cursor: z.string().optional().describe('Pagination cursor for fetching next page'),
});
const GetAccountSchema = z.object({
    account_id: z.string().describe('The unique identifier of the account'),
});
const CreateAccountSchema = z.object({
    name: z.string().describe('Name of the account'),
    domains: z.array(z.string()).optional().describe('List of domains associated with the account'),
    primary_domain: z.string().optional().describe('Primary domain for the account'),
    type: z.string().optional().describe('Type of the account'),
    tags: z.array(z.string()).optional().describe('Tags to associate with the account'),
    custom_fields: z.record(z.any()).optional().describe('Custom fields for the account'),
    external_ids: z
        .array(z.object({ external_id: z.string(), label: z.string() }))
        .optional()
        .describe('External IDs for the account'),
});
const UpdateAccountSchema = z.object({
    account_id: z.string().describe('The unique identifier of the account to update'),
    name: z.string().optional().describe('Name of the account'),
    domains: z.array(z.string()).optional().describe('List of domains'),
    primary_domain: z.string().optional().describe('Primary domain'),
    type: z.string().optional().describe('Type of the account'),
    tags: z.array(z.string()).optional().describe('Tags for the account'),
    custom_fields: z.record(z.any()).optional().describe('Custom fields'),
    is_disabled: z.boolean().optional().describe('Whether the account is disabled'),
});
// ─── Tool Definitions ────────────────────────────────────────────────────────
const tools = [
    {
        name: 'pylon_list_accounts',
        description: 'List all accounts in Pylon with optional pagination.',
        inputSchema: {
            type: 'object',
            properties: {
                limit: { type: 'number', description: 'Maximum number of accounts to return (default: 100)' },
                cursor: { type: 'string', description: 'Pagination cursor for fetching next page' },
            },
            required: [],
        },
    },
    {
        name: 'pylon_get_account',
        description: 'Get a specific account by its ID.',
        inputSchema: {
            type: 'object',
            properties: {
                account_id: { type: 'string', description: 'The unique identifier of the account' },
            },
            required: ['account_id'],
        },
    },
    {
        name: 'pylon_create_account',
        description: 'Create a new account in Pylon.',
        inputSchema: {
            type: 'object',
            properties: {
                name: { type: 'string', description: 'Name of the account' },
                domains: { type: 'array', items: { type: 'string' }, description: 'List of domains associated with the account' },
                primary_domain: { type: 'string', description: 'Primary domain for the account' },
                type: { type: 'string', description: 'Type of the account' },
                tags: { type: 'array', items: { type: 'string' }, description: 'Tags to associate with the account' },
                custom_fields: { type: 'object', description: 'Custom fields for the account' },
                external_ids: {
                    type: 'array',
                    items: { type: 'object', properties: { external_id: { type: 'string' }, label: { type: 'string' } } },
                    description: 'External IDs for the account',
                },
            },
            required: ['name'],
        },
    },
    {
        name: 'pylon_update_account',
        description: 'Update an existing account in Pylon.',
        inputSchema: {
            type: 'object',
            properties: {
                account_id: { type: 'string', description: 'The unique identifier of the account to update' },
                name: { type: 'string', description: 'Name of the account' },
                domains: { type: 'array', items: { type: 'string' }, description: 'List of domains' },
                primary_domain: { type: 'string', description: 'Primary domain' },
                type: { type: 'string', description: 'Type of the account' },
                tags: { type: 'array', items: { type: 'string' }, description: 'Tags for the account' },
                custom_fields: { type: 'object', description: 'Custom fields' },
                is_disabled: { type: 'boolean', description: 'Whether the account is disabled' },
            },
            required: ['account_id'],
        },
    },
];
// ─── Handler ─────────────────────────────────────────────────────────────────
async function handleToolCall(name, args) {
    switch (name) {
        case 'pylon_list_accounts': {
            const { limit, cursor } = ListAccountsSchema.parse(args);
            const result = await listAccounts(limit, cursor ?? null);
            return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
        }
        case 'pylon_get_account': {
            const { account_id } = GetAccountSchema.parse(args);
            const result = await getAccount(account_id);
            return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
        }
        case 'pylon_create_account': {
            const data = CreateAccountSchema.parse(args);
            const result = await createAccount(data);
            return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
        }
        case 'pylon_update_account': {
            const { account_id, ...data } = UpdateAccountSchema.parse(args);
            const result = await updateAccount(account_id, data);
            return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
        }
        default:
            return null;
    }
}
const accountsModule = { tools, handleToolCall };
export default accountsModule;
//# sourceMappingURL=accounts.js.map