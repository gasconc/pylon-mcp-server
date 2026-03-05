import { z } from 'zod';
import {
  listKnowledgeBases,
  getKnowledgeBase,
  listArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
  listCollections,
  getCollection,
  createCollection,
  createRouteRedirect,
} from '../client/knowledge-bases.js';
import type { ToolDefinition, ToolResult, ToolModule } from '../types/pylon.js';

// ─── Zod Schemas ─────────────────────────────────────────────────────────────

const GetKnowledgeBaseSchema = z.object({
  knowledge_base_id: z.string().describe('The ID of the knowledge base'),
});

const ListArticlesSchema = z.object({
  knowledge_base_id: z.string().describe('The ID of the knowledge base'),
  limit: z.number().optional().default(100).describe('Maximum number of articles to return (1-1000, default 100)'),
  cursor: z.string().optional().describe('Pagination cursor for fetching next page'),
});

const GetArticleSchema = z.object({
  knowledge_base_id: z.string().describe('The ID of the knowledge base'),
  article_id: z.string().describe('The ID of the article'),
});

const VisibilityConfigSchema = z.object({
  visibility: z.enum(['public', 'customer', 'internal_only']).optional(),
  ai_agent_access: z.enum(['inherit', 'none', 'specific_agents']).optional(),
  allowed_agent_ids: z.array(z.string()).optional(),
}).optional();

const TranslationSchema = z.object({
  body_html: z.string(),
  language: z.string(),
  title: z.string(),
});

const CreateArticleSchema = z.object({
  knowledge_base_id: z.string().describe('The ID of the knowledge base to add the article to'),
  author_user_id: z.string().describe('The ID of the user attributed as the author'),
  body_html: z.string().describe('The HTML body of the article'),
  title: z.string().describe('The title of the article'),
  collection_id: z.string().optional().describe('The ID of the collection to associate the article with'),
  is_published: z.boolean().optional().describe('Whether the article should be published (default false)'),
  is_unlisted: z.boolean().optional().describe('Whether the article is accessible only via direct link (default false)'),
  slug: z.string().optional().describe('The slug of the article (defaults to title-based slug)'),
  translations: z.array(TranslationSchema).optional().describe('Translations of the article in different languages'),
  visibility_config: VisibilityConfigSchema.describe('Visibility and AI agent access configuration'),
});

const UpdateArticleSchema = z.object({
  knowledge_base_id: z.string().describe('The ID of the knowledge base'),
  article_id: z.string().describe('The ID of the article to update'),
  body_html: z.string().optional().describe('The HTML body of the article'),
  title: z.string().optional().describe('The title of the article'),
  language: z.string().optional().describe('Language code of the translation to update (omit for default language)'),
  publish_updated_body_html: z.boolean().optional().describe('Whether changes should be published (default false)'),
  visibility_config: VisibilityConfigSchema.describe('Visibility and AI agent access configuration'),
});

const DeleteArticleSchema = z.object({
  knowledge_base_id: z.string().describe('The ID of the knowledge base'),
  article_id: z.string().describe('The ID of the article to delete'),
});

const ListCollectionsSchema = z.object({
  knowledge_base_id: z.string().describe('The ID of the knowledge base'),
});

const GetCollectionSchema = z.object({
  knowledge_base_id: z.string().describe('The ID of the knowledge base'),
  collection_id: z.string().describe('The ID of the collection'),
});

const CreateCollectionSchema = z.object({
  knowledge_base_id: z.string().describe('The ID of the knowledge base'),
  title: z.string().describe('The title of the collection'),
  description: z.string().optional().describe('Description of the collection'),
  parent_collection_id: z.string().optional().describe('The ID of the parent collection for nesting'),
  slug: z.string().optional().describe('The slug of the collection (defaults to title-based slug)'),
});

const CreateRouteRedirectSchema = z.object({
  knowledge_base_id: z.string().describe('The ID of the knowledge base'),
  from_path: z.string().describe('The path to redirect from'),
  object_id: z.string().describe('The ID of the article or collection to redirect to'),
  object_type: z.string().describe('The type of the target object: "article" or "collection"'),
  language: z.string().optional().describe('Language of the target object (defaults to KB default language)'),
});

// ─── Tool Definitions ────────────────────────────────────────────────────────

const tools: ToolDefinition[] = [
  {
    name: 'pylon_list_knowledge_bases',
    description: 'List all knowledge bases for the organization.',
    inputSchema: {
      type: 'object',
      properties: {},
      required: [],
    },
  },
  {
    name: 'pylon_get_knowledge_base',
    description: 'Get a specific knowledge base by its ID.',
    inputSchema: {
      type: 'object',
      properties: {
        knowledge_base_id: { type: 'string', description: 'The ID of the knowledge base' },
      },
      required: ['knowledge_base_id'],
    },
  },
  {
    name: 'pylon_list_articles',
    description: 'List all articles in a knowledge base with optional pagination.',
    inputSchema: {
      type: 'object',
      properties: {
        knowledge_base_id: { type: 'string', description: 'The ID of the knowledge base' },
        limit: { type: 'number', description: 'Maximum number of articles to return (1-1000, default 100)' },
        cursor: { type: 'string', description: 'Pagination cursor for fetching next page' },
      },
      required: ['knowledge_base_id'],
    },
  },
  {
    name: 'pylon_get_article',
    description: 'Get a specific article by its ID within a knowledge base.',
    inputSchema: {
      type: 'object',
      properties: {
        knowledge_base_id: { type: 'string', description: 'The ID of the knowledge base' },
        article_id: { type: 'string', description: 'The ID of the article' },
      },
      required: ['knowledge_base_id', 'article_id'],
    },
  },
  {
    name: 'pylon_create_article',
    description: 'Create a new article within a knowledge base.',
    inputSchema: {
      type: 'object',
      properties: {
        knowledge_base_id: { type: 'string', description: 'The ID of the knowledge base' },
        author_user_id: { type: 'string', description: 'The ID of the user attributed as the author' },
        body_html: { type: 'string', description: 'The HTML body of the article' },
        title: { type: 'string', description: 'The title of the article' },
        collection_id: { type: 'string', description: 'The ID of the collection to associate with' },
        is_published: { type: 'boolean', description: 'Whether the article should be published (default false)' },
        is_unlisted: { type: 'boolean', description: 'Whether accessible only via direct link (default false)' },
        slug: { type: 'string', description: 'The slug of the article' },
        translations: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              body_html: { type: 'string', description: 'Translated HTML body' },
              language: { type: 'string', description: 'Language code' },
              title: { type: 'string', description: 'Translated title' },
            },
            required: ['body_html', 'language', 'title'],
          },
          description: 'Translations of the article in different languages',
        },
        visibility_config: {
          type: 'object',
          properties: {
            visibility: { type: 'string', enum: ['public', 'customer', 'internal_only'], description: 'Visibility setting' },
            ai_agent_access: { type: 'string', enum: ['inherit', 'none', 'specific_agents'], description: 'AI agent access control' },
            allowed_agent_ids: { type: 'array', items: { type: 'string' }, description: 'AI agent IDs for specific_agents access' },
          },
          description: 'Visibility and AI agent access configuration',
        },
      },
      required: ['knowledge_base_id', 'author_user_id', 'body_html', 'title'],
    },
  },
  {
    name: 'pylon_update_article',
    description: 'Update an existing article in a knowledge base. Only provided fields are modified.',
    inputSchema: {
      type: 'object',
      properties: {
        knowledge_base_id: { type: 'string', description: 'The ID of the knowledge base' },
        article_id: { type: 'string', description: 'The ID of the article to update' },
        body_html: { type: 'string', description: 'The HTML body of the article' },
        title: { type: 'string', description: 'The title of the article' },
        language: { type: 'string', description: 'Language code of translation to update (omit for default)' },
        publish_updated_body_html: { type: 'boolean', description: 'Whether changes should be published (default false)' },
        visibility_config: {
          type: 'object',
          properties: {
            visibility: { type: 'string', enum: ['public', 'customer', 'internal_only'], description: 'Visibility setting' },
            ai_agent_access: { type: 'string', enum: ['inherit', 'none', 'specific_agents'], description: 'AI agent access control' },
            allowed_agent_ids: { type: 'array', items: { type: 'string' }, description: 'AI agent IDs for specific_agents access' },
          },
          description: 'Visibility and AI agent access configuration',
        },
      },
      required: ['knowledge_base_id', 'article_id'],
    },
  },
  {
    name: 'pylon_delete_article',
    description: 'Permanently delete an article from a knowledge base.',
    inputSchema: {
      type: 'object',
      properties: {
        knowledge_base_id: { type: 'string', description: 'The ID of the knowledge base' },
        article_id: { type: 'string', description: 'The ID of the article to delete' },
      },
      required: ['knowledge_base_id', 'article_id'],
    },
  },
  {
    name: 'pylon_list_collections',
    description: 'List all collections in a knowledge base.',
    inputSchema: {
      type: 'object',
      properties: {
        knowledge_base_id: { type: 'string', description: 'The ID of the knowledge base' },
      },
      required: ['knowledge_base_id'],
    },
  },
  {
    name: 'pylon_get_collection',
    description: 'Get a specific collection by its ID within a knowledge base.',
    inputSchema: {
      type: 'object',
      properties: {
        knowledge_base_id: { type: 'string', description: 'The ID of the knowledge base' },
        collection_id: { type: 'string', description: 'The ID of the collection' },
      },
      required: ['knowledge_base_id', 'collection_id'],
    },
  },
  {
    name: 'pylon_create_collection',
    description: 'Create a new collection within a knowledge base.',
    inputSchema: {
      type: 'object',
      properties: {
        knowledge_base_id: { type: 'string', description: 'The ID of the knowledge base' },
        title: { type: 'string', description: 'The title of the collection' },
        description: { type: 'string', description: 'Description of the collection' },
        parent_collection_id: { type: 'string', description: 'The ID of the parent collection for nesting' },
        slug: { type: 'string', description: 'The slug of the collection' },
      },
      required: ['knowledge_base_id', 'title'],
    },
  },
  {
    name: 'pylon_create_route_redirect',
    description: 'Create a path redirect within a knowledge base, mapping a source path to an article or collection.',
    inputSchema: {
      type: 'object',
      properties: {
        knowledge_base_id: { type: 'string', description: 'The ID of the knowledge base' },
        from_path: { type: 'string', description: 'The path to redirect from' },
        object_id: { type: 'string', description: 'The ID of the article or collection to redirect to' },
        object_type: { type: 'string', description: 'The type of the target: "article" or "collection"' },
        language: { type: 'string', description: 'Language of the target object (defaults to KB default language)' },
      },
      required: ['knowledge_base_id', 'from_path', 'object_id', 'object_type'],
    },
  },
];

// ─── Handler ─────────────────────────────────────────────────────────────────

async function handleToolCall(name: string, args: Record<string, unknown>): Promise<ToolResult | null> {
  switch (name) {
    case 'pylon_list_knowledge_bases': {
      const result = await listKnowledgeBases();
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    case 'pylon_get_knowledge_base': {
      const { knowledge_base_id } = GetKnowledgeBaseSchema.parse(args);
      const result = await getKnowledgeBase(knowledge_base_id);
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    case 'pylon_list_articles': {
      const { knowledge_base_id, limit, cursor } = ListArticlesSchema.parse(args);
      const result = await listArticles(knowledge_base_id, limit, cursor ?? null);
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    case 'pylon_get_article': {
      const { knowledge_base_id, article_id } = GetArticleSchema.parse(args);
      const result = await getArticle(knowledge_base_id, article_id);
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    case 'pylon_create_article': {
      const { knowledge_base_id, ...data } = CreateArticleSchema.parse(args);
      const result = await createArticle(knowledge_base_id, data);
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    case 'pylon_update_article': {
      const { knowledge_base_id, article_id, ...data } = UpdateArticleSchema.parse(args);
      const result = await updateArticle(knowledge_base_id, article_id, data);
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    case 'pylon_delete_article': {
      const { knowledge_base_id, article_id } = DeleteArticleSchema.parse(args);
      const result = await deleteArticle(knowledge_base_id, article_id);
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    case 'pylon_list_collections': {
      const { knowledge_base_id } = ListCollectionsSchema.parse(args);
      const result = await listCollections(knowledge_base_id);
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    case 'pylon_get_collection': {
      const { knowledge_base_id, collection_id } = GetCollectionSchema.parse(args);
      const result = await getCollection(knowledge_base_id, collection_id);
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    case 'pylon_create_collection': {
      const { knowledge_base_id, ...data } = CreateCollectionSchema.parse(args);
      const result = await createCollection(knowledge_base_id, data);
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    case 'pylon_create_route_redirect': {
      const { knowledge_base_id, ...data } = CreateRouteRedirectSchema.parse(args);
      const result = await createRouteRedirect(knowledge_base_id, data);
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    default:
      return null;
  }
}

const knowledgeBasesModule: ToolModule = { tools, handleToolCall };
export default knowledgeBasesModule;
