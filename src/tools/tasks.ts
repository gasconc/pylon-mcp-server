import { z } from 'zod';
import { createTask, updateTask, deleteTask } from '../client/tasks.js';
import type { ToolDefinition, ToolResult, ToolModule } from '../types/pylon.js';

// ─── Zod Schemas ─────────────────────────────────────────────────────────────

const CreateTaskSchema = z.object({
  title: z.string().describe('Title for this task'),
  account_id: z.string().optional().describe('Account ID for this task'),
  assignee_id: z.string().optional().describe('Assignee ID for this task'),
  body_html: z.string().optional().describe('Body HTML for this task'),
  customer_portal_visible: z.boolean().optional().default(false).describe('Customer portal visible for this task'),
  due_date: z.string().optional().describe('Due date in RFC 3339 format'),
  milestone_id: z.string().optional().describe('Milestone ID for this task'),
  project_id: z.string().optional().describe('Project ID for this task'),
  status: z
    .enum(['not_started', 'in_progress', 'completed'])
    .optional()
    .describe('Status: not_started, in_progress, or completed'),
});

const UpdateTaskSchema = z.object({
  task_id: z.string().describe('The unique identifier of the task to update'),
  title: z.string().optional().describe('Title for this task'),
  assignee_id: z.string().optional().describe('Assignee ID'),
  body_html: z.string().optional().describe('Body HTML'),
  customer_portal_visible: z.boolean().optional().describe('Customer portal visible'),
  due_date: z.string().optional().describe('Due date in RFC 3339 format'),
  milestone_id: z.string().optional().describe('Milestone ID'),
  project_id: z.string().optional().describe('Project ID'),
  status: z
    .enum(['not_started', 'in_progress', 'completed'])
    .optional()
    .describe('Status: not_started, in_progress, or completed'),
});

const DeleteTaskSchema = z.object({
  task_id: z.string().describe('The unique identifier of the task to delete'),
});

// ─── Tool Definitions ────────────────────────────────────────────────────────

const tools: ToolDefinition[] = [
  {
    name: 'pylon_create_task',
    description: 'Create a new task in Pylon. Rate limit: 60 requests per minute.',
    inputSchema: {
      type: 'object',
      properties: {
        title: { type: 'string', description: 'Title for this task' },
        account_id: { type: 'string', description: 'Account ID for this task' },
        assignee_id: { type: 'string', description: 'Assignee ID for this task' },
        body_html: { type: 'string', description: 'Body HTML for this task' },
        customer_portal_visible: { type: 'boolean', description: 'Customer portal visible (default: false)' },
        due_date: { type: 'string', description: 'Due date in RFC 3339 format' },
        milestone_id: { type: 'string', description: 'Milestone ID for this task' },
        project_id: { type: 'string', description: 'Project ID for this task' },
        status: {
          type: 'string',
          enum: ['not_started', 'in_progress', 'completed'],
          description: 'Status: not_started, in_progress, or completed',
        },
      },
      required: ['title'],
    },
  },
  {
    name: 'pylon_update_task',
    description: 'Update an existing task in Pylon. Rate limit: 60 requests per minute.',
    inputSchema: {
      type: 'object',
      properties: {
        task_id: { type: 'string', description: 'The unique identifier of the task to update' },
        title: { type: 'string', description: 'Title for this task' },
        assignee_id: { type: 'string', description: 'Assignee ID' },
        body_html: { type: 'string', description: 'Body HTML' },
        customer_portal_visible: { type: 'boolean', description: 'Customer portal visible' },
        due_date: { type: 'string', description: 'Due date in RFC 3339 format' },
        milestone_id: { type: 'string', description: 'Milestone ID' },
        project_id: { type: 'string', description: 'Project ID' },
        status: {
          type: 'string',
          enum: ['not_started', 'in_progress', 'completed'],
          description: 'Status: not_started, in_progress, or completed',
        },
      },
      required: ['task_id'],
    },
  },
  {
    name: 'pylon_delete_task',
    description: 'Delete an existing task in Pylon. Rate limit: 20 requests per minute.',
    inputSchema: {
      type: 'object',
      properties: {
        task_id: { type: 'string', description: 'The unique identifier of the task to delete' },
      },
      required: ['task_id'],
    },
  },
];

// ─── Handler ─────────────────────────────────────────────────────────────────

async function handleToolCall(name: string, args: Record<string, unknown>): Promise<ToolResult | null> {
  switch (name) {
    case 'pylon_create_task': {
      const data = CreateTaskSchema.parse(args);
      const result = await createTask(data);
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    case 'pylon_update_task': {
      const { task_id, ...data } = UpdateTaskSchema.parse(args);
      const result = await updateTask(task_id, data);
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    case 'pylon_delete_task': {
      const { task_id } = DeleteTaskSchema.parse(args);
      const result = await deleteTask(task_id);
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    default:
      return null;
  }
}

const tasksModule: ToolModule = { tools, handleToolCall };
export default tasksModule;
