// ─── Shared / Generic ────────────────────────────────────────────────────────

export interface PaginatedResponse<T> {
  data: T[];
  request_id: string;
  cursor?: string;
}

export interface SingleResponse<T> {
  data: T;
  request_id: string;
}

export interface DeleteResponse {
  request_id: string;
}

// ─── Accounts ────────────────────────────────────────────────────────────────

export interface Account {
  id: string;
  name: string;
  domains?: string[];
  primary_domain?: string;
  type?: string;
  tags?: string[];
  custom_fields?: Record<string, unknown>;
  external_ids?: ExternalId[];
  is_disabled?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ExternalId {
  external_id: string;
  label: string;
}

export interface CreateAccountPayload {
  name: string;
  domains?: string[];
  primary_domain?: string;
  type?: string;
  tags?: string[];
  custom_fields?: CustomFieldInput[];
  external_ids?: ExternalId[];
}

export interface UpdateAccountPayload {
  name?: string;
  domains?: string[];
  primary_domain?: string;
  type?: string;
  tags?: string[];
  custom_fields?: CustomFieldInput[];
  is_disabled?: boolean;
}

// ─── Issues ──────────────────────────────────────────────────────────────────

export interface Issue {
  id: string;
  title?: string;
  state?: string;
  priority?: string;
  assignee_id?: string;
  account_id?: string;
  tags?: string[];
  custom_fields?: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
}

export interface CreateIssuePayload {
  body_html: string;
  account_id?: string;
  assignee_id?: string;
  state?: string;
  priority?: string;
  tags?: string[];
  custom_fields?: CustomFieldInput[];
  title?: string;
}

export interface UpdateIssuePayload {
  assignee_id?: string;
  state?: string;
  priority?: string;
  tags?: string[];
  custom_fields?: CustomFieldInput[];
  title?: string;
}

export type FilterOperator =
  | 'equals'
  | 'not_equals'
  | 'contains'
  | 'not_contains'
  | 'does_not_contain'
  | 'in'
  | 'not_in'
  | 'and'
  | 'or'
  | 'time_is_after'
  | 'time_is_before'
  | 'time_range'
  | 'string_contains'
  | 'string_does_not_contain'
  | 'is_set'
  | 'is_unset';

export interface IssueFilter {
  field?: string;
  operator: FilterOperator;
  value?: string;
  values?: string[];
  subfilters?: IssueFilter[];
}

// ─── Messages ────────────────────────────────────────────────────────────────

export interface Message {
  id: string;
  body_html?: string;
  created_at?: string;
  updated_at?: string;
}

// ─── External Issues ─────────────────────────────────────────────────────────

export type ExternalIssueSource = 'linear' | 'asana' | 'jira' | 'github';
export type ExternalIssueOperation = 'link' | 'remove';

// ─── Custom Fields ───────────────────────────────────────────────────────────

/**
 * Input format for setting a custom field value via the Pylon API.
 * Use `value` for single-valued fields and `values` for multi-valued fields (e.g. multiselect).
 * Passing neither `value` nor `values` unsets the field.
 */
export interface CustomFieldInput {
  slug: string;
  value?: string;
  values?: string[];
}

export type CustomFieldObjectType = 'account' | 'issue' | 'contact';

export type CustomFieldType =
  | 'text'
  | 'number'
  | 'decimal'
  | 'boolean'
  | 'date'
  | 'datetime'
  | 'user'
  | 'url'
  | 'select'
  | 'multiselect';

export interface SelectOption {
  label: string;
  slug?: string;
}

export interface CustomField {
  id: string;
  label: string;
  object_type: CustomFieldObjectType;
  type: CustomFieldType;
  description?: string;
  slug?: string;
  default_value?: string;
  default_values?: string[];
  select_options?: SelectOption[];
  created_at?: string;
  updated_at?: string;
}

export interface CreateCustomFieldPayload {
  label: string;
  object_type: CustomFieldObjectType;
  type: CustomFieldType;
  description?: string;
  slug?: string;
  default_value?: string;
  default_values?: string[];
  select_options?: SelectOption[];
}

export interface UpdateCustomFieldPayload {
  label?: string;
  description?: string;
  slug?: string;
  default_value?: string;
  default_values?: string[];
  select_options?: SelectOption[];
}

// ─── Tasks ───────────────────────────────────────────────────────────────────

export type TaskStatus = 'not_started' | 'in_progress' | 'completed';

export interface MiniAccount {
  id: string;
}

export interface MiniUser {
  id: string;
  email?: string;
}

export interface MiniContact {
  id: string;
  email?: string;
}

export interface TaskAssignee {
  contact?: MiniContact;
  user?: MiniUser;
}

export interface MiniMilestone {
  id: string;
}

export interface MiniProject {
  id: string;
}

export interface Task {
  id: string;
  title: string;
  body_html?: string;
  status?: TaskStatus;
  customer_portal_visible?: boolean;
  due_date?: string;
  account?: MiniAccount;
  assignee?: TaskAssignee;
  milestone?: MiniMilestone;
  project?: MiniProject;
  created_at?: string;
  updated_at?: string;
}

export interface CreateTaskPayload {
  title: string;
  account_id?: string;
  assignee_id?: string;
  body_html?: string;
  customer_portal_visible?: boolean;
  due_date?: string;
  milestone_id?: string;
  project_id?: string;
  status?: TaskStatus;
}

export interface UpdateTaskPayload {
  title?: string;
  assignee_id?: string;
  body_html?: string;
  customer_portal_visible?: boolean;
  due_date?: string;
  milestone_id?: string;
  project_id?: string;
  status?: TaskStatus;
}

// ─── Projects ────────────────────────────────────────────────────────────────

export interface MiniProjectTemplate {
  id: string;
}

export interface Project {
  id: string;
  name: string;
  description_html?: string;
  owner_id?: string;
  customer_portal_visible?: boolean;
  start_date?: string;
  end_date?: string;
  is_archived?: boolean;
  archived_at?: string;
  account?: MiniAccount;
  project_template?: MiniProjectTemplate;
  created_at?: string;
  updated_at?: string;
}

export interface CreateProjectPayload {
  account_id: string;
  name: string;
  customer_portal_visible?: boolean;
  description_html?: string;
  end_date?: string;
  owner_id?: string;
  project_template_id?: string;
  start_date?: string;
}

export interface UpdateProjectPayload {
  name?: string;
  customer_portal_visible?: boolean;
  description_html?: string;
  end_date?: string;
  is_archived?: boolean;
  owner_id?: string;
  start_date?: string;
}

// ─── Milestones ──────────────────────────────────────────────────────────────

export interface Milestone {
  id: string;
  name: string;
  due_date?: string;
  account?: MiniAccount;
  project?: MiniProject;
  created_at?: string;
  updated_at?: string;
}

export interface CreateMilestonePayload {
  name: string;
  project_id: string;
  account_id?: string;
  due_date?: string;
}

export interface UpdateMilestonePayload {
  name?: string;
  due_date?: string;
}

// ─── Knowledge Base ──────────────────────────────────────────────────────────

export interface KnowledgeBase {
  id: string;
  title: string;
  slug: string;
  default_language: string;
  supported_languages: string[];
}

export type ArticleVisibility = 'public' | 'customer' | 'internal_only';
export type AIAgentAccess = 'inherit' | 'none' | 'specific_agents';

export interface VisibilityConfig {
  visibility?: ArticleVisibility;
  ai_agent_access?: AIAgentAccess;
  allowed_agent_ids?: string[];
  customer_visibility_condition?: IssueFilter;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  identifier: string;
  collection_id?: string;
  is_published: boolean;
  url: string;
  current_draft_content_html?: string;
  current_published_content_html?: string;
  last_published_at?: string;
  visibility_config?: VisibilityConfig;
}

export interface ArticleTranslationInput {
  body_html: string;
  language: string;
  title: string;
}

export interface CreateArticlePayload {
  author_user_id: string;
  body_html: string;
  title: string;
  collection_id?: string;
  is_published?: boolean;
  is_unlisted?: boolean;
  slug?: string;
  translations?: ArticleTranslationInput[];
  visibility_config?: VisibilityConfig;
}

export interface UpdateArticlePayload {
  body_html?: string;
  title?: string;
  language?: string;
  publish_updated_body_html?: boolean;
  visibility_config?: VisibilityConfig;
}

export interface KBCollection {
  id: string;
  slug: string;
  description?: string;
  icon?: string;
  parent_collection_id?: string;
  created_at?: string;
}

export interface CreateCollectionPayload {
  title: string;
  description?: string;
  parent_collection_id?: string;
  slug?: string;
}

export interface RouteRedirect {
  id: string;
  from_path: string;
  object_id: string;
  object_type: string;
  language?: string;
  created_at?: string;
}

export interface CreateRouteRedirectPayload {
  from_path: string;
  object_id: string;
  object_type: string;
  language?: string;
}

// ─── Tool Registration ───────────────────────────────────────────────────────

export interface ToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required: string[];
  };
}

export interface ToolResult {
  content: Array<{ type: 'text'; text: string }>;
  isError?: boolean;
}

export interface ToolModule {
  tools: ToolDefinition[];
  handleToolCall: (name: string, args: Record<string, unknown>) => Promise<ToolResult | null>;
}
