import { z } from 'zod';
import {
  listCustomFields,
  getCustomField,
  createCustomField,
  updateCustomField,
} from '../client/custom-fields.js';
import type { ToolDefinition, ToolResult, ToolModule, CustomFieldObjectType } from '../types/pylon.js';

// ─── Zod Schemas ─────────────────────────────────────────────────────────────

const ListCustomFieldsSchema = z.object({
  object_type: z.enum(['account', 'issue', 'contact']).describe('Object type: account, issue, or contact'),
  cursor: z.string().optional().describe('Pagination cursor'),
});

const GetCustomFieldSchema = z.object({
  custom_field_id: z.string().describe('The unique identifier of the custom field'),
});

const CreateCustomFieldSchema = z.object({
  label: z.string().describe('Label of the custom field'),
  object_type: z.enum(['account', 'issue', 'contact']).describe('Object type'),
  type: z
    .enum(['text', 'number', 'decimal', 'boolean', 'date', 'datetime', 'user', 'url', 'select', 'multiselect'])
    .describe('Field type'),
  description: z.string().optional().describe('Description of the custom field'),
  slug: z.string().optional().describe('Slug identifier'),
  default_value: z.string().optional().describe('Default value for single-valued fields'),
  default_values: z.array(z.string()).optional().describe('Default values for multi-valued fields'),
  select_options: z
    .array(z.object({ label: z.string(), slug: z.string().optional() }))
    .optional()
    .describe('Options for select/multiselect fields'),
});

const UpdateCustomFieldSchema = z.object({
  custom_field_id: z.string().describe('The unique identifier of the custom field'),
  label: z.string().optional().describe('Label'),
  description: z.string().optional().describe('Description'),
  slug: z.string().optional().describe('Slug identifier'),
  default_value: z.string().optional().describe('Default value'),
  default_values: z.array(z.string()).optional().describe('Default values'),
  select_options: z
    .array(z.object({ label: z.string(), slug: z.string().optional() }))
    .optional()
    .describe('Options for select/multiselect fields'),
});

// ─── Tool Definitions ────────────────────────────────────────────────────────

const tools: ToolDefinition[] = [
  {
    name: 'pylon_list_custom_fields',
    description: 'List all custom fields for a specific object type.',
    inputSchema: {
      type: 'object',
      properties: {
        object_type: { type: 'string', enum: ['account', 'issue', 'contact'], description: 'Object type' },
        cursor: { type: 'string', description: 'Pagination cursor' },
      },
      required: ['object_type'],
    },
  },
  {
    name: 'pylon_get_custom_field',
    description: 'Get a specific custom field by its ID.',
    inputSchema: {
      type: 'object',
      properties: {
        custom_field_id: { type: 'string', description: 'The unique identifier of the custom field' },
      },
      required: ['custom_field_id'],
    },
  },
  {
    name: 'pylon_create_custom_field',
    description: 'Create a new custom field in Pylon.',
    inputSchema: {
      type: 'object',
      properties: {
        label: { type: 'string', description: 'Label of the custom field' },
        object_type: { type: 'string', enum: ['account', 'issue', 'contact'], description: 'Object type' },
        type: {
          type: 'string',
          enum: ['text', 'number', 'decimal', 'boolean', 'date', 'datetime', 'user', 'url', 'select', 'multiselect'],
          description: 'Field type',
        },
        description: { type: 'string', description: 'Description' },
        slug: { type: 'string', description: 'Slug identifier' },
        default_value: { type: 'string', description: 'Default value' },
        default_values: { type: 'array', items: { type: 'string' }, description: 'Default values' },
        select_options: {
          type: 'array',
          items: { type: 'object', properties: { label: { type: 'string' }, slug: { type: 'string' } } },
          description: 'Options for select/multiselect fields',
        },
      },
      required: ['label', 'object_type', 'type'],
    },
  },
  {
    name: 'pylon_update_custom_field',
    description: 'Update an existing custom field in Pylon.',
    inputSchema: {
      type: 'object',
      properties: {
        custom_field_id: { type: 'string', description: 'The unique identifier of the custom field' },
        label: { type: 'string', description: 'Label' },
        description: { type: 'string', description: 'Description' },
        slug: { type: 'string', description: 'Slug identifier' },
        default_value: { type: 'string', description: 'Default value' },
        default_values: { type: 'array', items: { type: 'string' }, description: 'Default values' },
        select_options: {
          type: 'array',
          items: { type: 'object', properties: { label: { type: 'string' }, slug: { type: 'string' } } },
          description: 'Options for select/multiselect fields',
        },
      },
      required: ['custom_field_id'],
    },
  },
];

// ─── Handler ─────────────────────────────────────────────────────────────────

async function handleToolCall(name: string, args: Record<string, unknown>): Promise<ToolResult | null> {
  switch (name) {
    case 'pylon_list_custom_fields': {
      const { object_type, cursor } = ListCustomFieldsSchema.parse(args);
      const result = await listCustomFields(object_type as CustomFieldObjectType, cursor ?? null);
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    case 'pylon_get_custom_field': {
      const { custom_field_id } = GetCustomFieldSchema.parse(args);
      const result = await getCustomField(custom_field_id);
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    case 'pylon_create_custom_field': {
      const data = CreateCustomFieldSchema.parse(args);
      const result = await createCustomField(data);
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    case 'pylon_update_custom_field': {
      const { custom_field_id, ...data } = UpdateCustomFieldSchema.parse(args);
      const result = await updateCustomField(custom_field_id, data);
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    default:
      return null;
  }
}

const customFieldsModule: ToolModule = { tools, handleToolCall };
export default customFieldsModule;
