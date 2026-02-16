import { z } from 'zod';
import { createMilestone, updateMilestone, deleteMilestone } from '../client/milestones.js';
import type { ToolDefinition, ToolResult, ToolModule } from '../types/pylon.js';

// ─── Zod Schemas ─────────────────────────────────────────────────────────────

const CreateMilestoneSchema = z.object({
  name: z.string().describe('Name for this milestone'),
  project_id: z.string().describe('Project ID for this milestone'),
  account_id: z.string().optional().describe('Account ID for this milestone'),
  due_date: z.string().optional().describe('Due date in RFC 3339 format'),
});

const UpdateMilestoneSchema = z.object({
  milestone_id: z.string().describe('The unique identifier of the milestone to update'),
  name: z.string().optional().describe('Name for this milestone'),
  due_date: z.string().optional().describe('Due date in RFC 3339 format'),
});

const DeleteMilestoneSchema = z.object({
  milestone_id: z.string().describe('The unique identifier of the milestone to delete'),
});

// ─── Tool Definitions ────────────────────────────────────────────────────────

const tools: ToolDefinition[] = [
  {
    name: 'pylon_create_milestone',
    description: 'Create a new milestone in Pylon. Rate limit: 60 requests per minute.',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Name for this milestone' },
        project_id: { type: 'string', description: 'Project ID for this milestone' },
        account_id: { type: 'string', description: 'Account ID for this milestone' },
        due_date: { type: 'string', description: 'Due date in RFC 3339 format' },
      },
      required: ['name', 'project_id'],
    },
  },
  {
    name: 'pylon_update_milestone',
    description: 'Update an existing milestone in Pylon. Rate limit: 60 requests per minute.',
    inputSchema: {
      type: 'object',
      properties: {
        milestone_id: { type: 'string', description: 'The unique identifier of the milestone to update' },
        name: { type: 'string', description: 'Name for this milestone' },
        due_date: { type: 'string', description: 'Due date in RFC 3339 format' },
      },
      required: ['milestone_id'],
    },
  },
  {
    name: 'pylon_delete_milestone',
    description: 'Delete an existing milestone in Pylon. Rate limit: 60 requests per minute.',
    inputSchema: {
      type: 'object',
      properties: {
        milestone_id: { type: 'string', description: 'The unique identifier of the milestone to delete' },
      },
      required: ['milestone_id'],
    },
  },
];

// ─── Handler ─────────────────────────────────────────────────────────────────

async function handleToolCall(name: string, args: Record<string, unknown>): Promise<ToolResult | null> {
  switch (name) {
    case 'pylon_create_milestone': {
      const data = CreateMilestoneSchema.parse(args);
      const result = await createMilestone(data);
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    case 'pylon_update_milestone': {
      const { milestone_id, ...data } = UpdateMilestoneSchema.parse(args);
      const result = await updateMilestone(milestone_id, data);
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    case 'pylon_delete_milestone': {
      const { milestone_id } = DeleteMilestoneSchema.parse(args);
      const result = await deleteMilestone(milestone_id);
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    default:
      return null;
  }
}

const milestonesModule: ToolModule = { tools, handleToolCall };
export default milestonesModule;
