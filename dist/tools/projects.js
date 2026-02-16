import { z } from 'zod';
import { createProject, updateProject, deleteProject } from '../client/projects.js';
// ─── Zod Schemas ─────────────────────────────────────────────────────────────
const CreateProjectSchema = z.object({
    account_id: z.string().describe('Account ID for this project'),
    name: z.string().describe('Name for this project'),
    customer_portal_visible: z.boolean().optional().default(false).describe('Customer portal visible (default: false)'),
    description_html: z.string().optional().describe('Description HTML for this project'),
    end_date: z.string().optional().describe('End date in RFC 3339 format'),
    owner_id: z.string().optional().describe('Owner ID for this project'),
    project_template_id: z.string().optional().describe('Project template ID'),
    start_date: z.string().optional().describe('Start date in RFC 3339 format'),
});
const UpdateProjectSchema = z.object({
    project_id: z.string().describe('The unique identifier of the project to update'),
    name: z.string().optional().describe('Name for this project'),
    customer_portal_visible: z.boolean().optional().describe('Customer portal visible'),
    description_html: z.string().optional().describe('Description HTML'),
    end_date: z.string().optional().describe('End date in RFC 3339 format'),
    is_archived: z.boolean().optional().describe('Whether the project is archived'),
    owner_id: z.string().optional().describe('Owner ID'),
    start_date: z.string().optional().describe('Start date in RFC 3339 format'),
});
const DeleteProjectSchema = z.object({
    project_id: z.string().describe('The unique identifier of the project to delete'),
});
// ─── Tool Definitions ────────────────────────────────────────────────────────
const tools = [
    {
        name: 'pylon_create_project',
        description: 'Create a new project in Pylon. Rate limit: 60 requests per minute.',
        inputSchema: {
            type: 'object',
            properties: {
                account_id: { type: 'string', description: 'Account ID for this project' },
                name: { type: 'string', description: 'Name for this project' },
                customer_portal_visible: { type: 'boolean', description: 'Customer portal visible (default: false)' },
                description_html: { type: 'string', description: 'Description HTML for this project' },
                end_date: { type: 'string', description: 'End date in RFC 3339 format' },
                owner_id: { type: 'string', description: 'Owner ID for this project' },
                project_template_id: { type: 'string', description: 'Project template ID' },
                start_date: { type: 'string', description: 'Start date in RFC 3339 format' },
            },
            required: ['account_id', 'name'],
        },
    },
    {
        name: 'pylon_update_project',
        description: 'Update an existing project in Pylon. Rate limit: 60 requests per minute.',
        inputSchema: {
            type: 'object',
            properties: {
                project_id: { type: 'string', description: 'The unique identifier of the project to update' },
                name: { type: 'string', description: 'Name for this project' },
                customer_portal_visible: { type: 'boolean', description: 'Customer portal visible' },
                description_html: { type: 'string', description: 'Description HTML' },
                end_date: { type: 'string', description: 'End date in RFC 3339 format' },
                is_archived: { type: 'boolean', description: 'Whether the project is archived' },
                owner_id: { type: 'string', description: 'Owner ID' },
                start_date: { type: 'string', description: 'Start date in RFC 3339 format' },
            },
            required: ['project_id'],
        },
    },
    {
        name: 'pylon_delete_project',
        description: 'Delete an existing project in Pylon. Rate limit: 20 requests per minute.',
        inputSchema: {
            type: 'object',
            properties: {
                project_id: { type: 'string', description: 'The unique identifier of the project to delete' },
            },
            required: ['project_id'],
        },
    },
];
// ─── Handler ─────────────────────────────────────────────────────────────────
async function handleToolCall(name, args) {
    switch (name) {
        case 'pylon_create_project': {
            const data = CreateProjectSchema.parse(args);
            const result = await createProject(data);
            return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
        }
        case 'pylon_update_project': {
            const { project_id, ...data } = UpdateProjectSchema.parse(args);
            const result = await updateProject(project_id, data);
            return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
        }
        case 'pylon_delete_project': {
            const { project_id } = DeleteProjectSchema.parse(args);
            const result = await deleteProject(project_id);
            return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
        }
        default:
            return null;
    }
}
const projectsModule = { tools, handleToolCall };
export default projectsModule;
//# sourceMappingURL=projects.js.map