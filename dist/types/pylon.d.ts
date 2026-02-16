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
    custom_fields?: Record<string, unknown>;
    external_ids?: ExternalId[];
}
export interface UpdateAccountPayload {
    name?: string;
    domains?: string[];
    primary_domain?: string;
    type?: string;
    tags?: string[];
    custom_fields?: Record<string, unknown>;
    is_disabled?: boolean;
}
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
    custom_fields?: Record<string, unknown>;
    title?: string;
}
export interface UpdateIssuePayload {
    assignee_id?: string;
    state?: string;
    priority?: string;
    tags?: string[];
    custom_fields?: Record<string, unknown>;
    title?: string;
}
export type FilterOperator = 'equals' | 'not_equals' | 'contains' | 'not_contains' | 'in' | 'not_in' | 'and' | 'or' | 'time_is_after' | 'time_is_before' | 'time_range';
export interface IssueFilter {
    field?: string;
    operator: FilterOperator;
    value?: string;
    values?: string[];
    subfilters?: IssueFilter[];
}
export interface Message {
    id: string;
    body_html?: string;
    created_at?: string;
    updated_at?: string;
}
export type ExternalIssueSource = 'linear' | 'asana' | 'jira' | 'github';
export type ExternalIssueOperation = 'link' | 'remove';
export type CustomFieldObjectType = 'account' | 'issue' | 'contact';
export type CustomFieldType = 'text' | 'number' | 'decimal' | 'boolean' | 'date' | 'datetime' | 'user' | 'url' | 'select' | 'multiselect';
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
    content: Array<{
        type: 'text';
        text: string;
    }>;
    isError?: boolean;
}
export interface ToolModule {
    tools: ToolDefinition[];
    handleToolCall: (name: string, args: Record<string, unknown>) => Promise<ToolResult | null>;
}
//# sourceMappingURL=pylon.d.ts.map