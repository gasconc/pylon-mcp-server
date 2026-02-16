import { z } from 'zod';
import { linkExternalIssue } from '../client/external-issues.js';
import type { ToolDefinition, ToolResult, ToolModule, ExternalIssueSource, ExternalIssueOperation } from '../types/pylon.js';

// ─── Zod Schemas ─────────────────────────────────────────────────────────────

const LinkExternalIssueSchema = z.object({
  issue_id: z.string().describe('The ID or number of the Pylon issue to link external issues to'),
  external_issue_id: z.string().describe('The ID of the external issue in the source system'),
  source: z.enum(['linear', 'asana', 'jira', 'github']).describe('The source system of the external issue'),
  operation: z
    .enum(['link', 'remove'])
    .optional()
    .default('link')
    .describe('Operation: "link" (default) or "remove"'),
});

// ─── Tool Definitions ────────────────────────────────────────────────────────

const tools: ToolDefinition[] = [
  {
    name: 'pylon_link_external_issue',
    description:
      'Link or unlink external issues (from Linear, Asana, Jira, or GitHub) to/from a Pylon issue.',
    inputSchema: {
      type: 'object',
      properties: {
        issue_id: { type: 'string', description: 'The ID or number of the Pylon issue' },
        external_issue_id: { type: 'string', description: 'The ID of the external issue' },
        source: {
          type: 'string',
          enum: ['linear', 'asana', 'jira', 'github'],
          description: 'The source system',
        },
        operation: {
          type: 'string',
          enum: ['link', 'remove'],
          description: 'Operation: "link" (default) or "remove"',
        },
      },
      required: ['issue_id', 'external_issue_id', 'source'],
    },
  },
];

// ─── Handler ─────────────────────────────────────────────────────────────────

async function handleToolCall(name: string, args: Record<string, unknown>): Promise<ToolResult | null> {
  switch (name) {
    case 'pylon_link_external_issue': {
      const { issue_id, external_issue_id, source, operation } = LinkExternalIssueSchema.parse(args);
      const result = await linkExternalIssue(
        issue_id,
        external_issue_id,
        source as ExternalIssueSource,
        operation as ExternalIssueOperation,
      );
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    default:
      return null;
  }
}

const externalIssuesModule: ToolModule = { tools, handleToolCall };
export default externalIssuesModule;
