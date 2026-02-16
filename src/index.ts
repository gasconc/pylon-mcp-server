#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { validateConfig } from './config.js';
import type { ToolModule, ToolDefinition } from './types/pylon.js';

import accountsModule from './tools/accounts.js';
import issuesModule from './tools/issues.js';
import messagesModule from './tools/messages.js';
import externalIssuesModule from './tools/external-issues.js';
import customFieldsModule from './tools/custom-fields.js';
import tasksModule from './tools/tasks.js';
import projectsModule from './tools/projects.js';
import milestonesModule from './tools/milestones.js';

const modules: ToolModule[] = [
  accountsModule,
  issuesModule,
  messagesModule,
  externalIssuesModule,
  customFieldsModule,
  tasksModule,
  projectsModule,
  milestonesModule,
];

const allTools: ToolDefinition[] = modules.flatMap((m) => m.tools);

async function handleToolCall(name: string, args: Record<string, unknown>) {
  for (const mod of modules) {
    const result = await mod.handleToolCall(name, args);
    if (result !== null) return result;
  }
  throw new Error(`Unknown tool: ${name}`);
}

async function main() {
  validateConfig();

  const server = new Server(
    { name: 'pylon-mcp-server', version: '2.0.0' },
    { capabilities: { tools: {} } },
  );

  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: allTools,
  }));

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    try {
      const result = await handleToolCall(
        request.params.name,
        (request.params.arguments ?? {}) as Record<string, unknown>,
      );
      return result as any;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return {
        content: [{ type: 'text' as const, text: `Error: ${message}` }],
        isError: true,
      } as any;
    }
  });

  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);
