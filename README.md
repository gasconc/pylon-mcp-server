# Pylon MCP Server

MCP (Model Context Protocol) server for integrating with the Pylon API. This server provides tools for managing accounts, issues, messages, and custom fields in Pylon.

## Features

- **Accounts**: List, get, create, and update accounts
- **Issues**: List, get, create, update, and search support issues with advanced filters
- **Messages**: Get issue messages and redact messages
- **Custom Fields**: List, get, create, and update custom fields

## Prerequisites

- Node.js 18 or higher
- A Pylon account with API access
- Pylon API token

## Installation

1. Clone or navigate to the project directory:

```bash
cd pylon-mcp-server
```

2. Install dependencies:

```bash
npm install
```

3. Set up your environment variables:

```bash
cp env.example .env
```

4. Edit `.env` and add your Pylon API token:

```
PYLON_API_TOKEN=your_pylon_api_token_here
```

## Configuration in Cursor

Add the following to your Cursor MCP settings file (`~/.cursor/mcp.json` or the project's `.cursor/mcp.json`):

```json
{
  "mcpServers": {
    "pylon": {
      "command": "node",
      "args": ["/path/to/pylon-mcp-server/src/index.js"],
      "env": {
        "PYLON_API_TOKEN": "your_pylon_api_token_here"
      }
    }
  }
}
```

Replace `/path/to/pylon-mcp-server` with the actual path to this project.

## Available Tools

### Accounts

| Tool | Description |
|------|-------------|
| `pylon_list_accounts` | List all accounts with optional pagination |
| `pylon_get_account` | Get a specific account by ID |
| `pylon_create_account` | Create a new account |
| `pylon_update_account` | Update an existing account |

### Issues

| Tool | Description |
|------|-------------|
| `pylon_list_issues` | List issues within a time range |
| `pylon_get_issue` | Get a specific issue by ID |
| `pylon_create_issue` | Create a new issue |
| `pylon_update_issue` | Update an existing issue |
| `pylon_search_issues` | Search issues with advanced filters (state, priority, assignee, tags, etc.) |

### Messages

| Tool | Description |
|------|-------------|
| `pylon_get_issue_messages` | Get all messages for a specific issue |
| `pylon_redact_message` | Redact a specific message in an issue |

### Custom Fields

| Tool | Description |
|------|-------------|
| `pylon_list_custom_fields` | List custom fields by object type (account, issue, contact) |
| `pylon_get_custom_field` | Get a specific custom field by ID |
| `pylon_create_custom_field` | Create a new custom field |
| `pylon_update_custom_field` | Update an existing custom field |

## Usage Examples

### List accounts

```
List all accounts in Pylon
```

### Get issues from last week

```
List all issues from the last 7 days
```

### Create a new account

```
Create a new account named "Acme Corp" with domain "acme.com"
```

### Search for open high-priority issues

```
Search for all open issues with high or urgent priority
```

The `pylon_search_issues` tool supports complex filters with AND/OR operators:

```json
{
  "filter": {
    "operator": "and",
    "subfilters": [
      { "field": "state", "operator": "equals", "value": "open" },
      { "field": "priority", "operator": "in", "values": ["high", "urgent"] }
    ]
  },
  "limit": 50
}
```

Available filter fields: `state`, `priority`, `assignee.id`, `account.id`, `tags`, `requester.email`, `source`, `team.id`

### Create a custom field

```
Create a select custom field called "Priority Level" for issues with options: Low, Medium, High
```

## API Reference

For more information about the Pylon API, see:

- [Accounts API](https://docs.usepylon.com/pylon-docs/developer/api/api-reference/accounts)
- [Issues API](https://docs.usepylon.com/pylon-docs/developer/api/api-reference/issues)
- [Messages API](https://docs.usepylon.com/pylon-docs/developer/api/api-reference/messages)
- [Custom Fields API](https://docs.usepylon.com/pylon-docs/developer/api/api-reference/custom-fields)

## Development

Run in development mode with auto-reload:

```bash
npm run dev
```

## License

MIT

