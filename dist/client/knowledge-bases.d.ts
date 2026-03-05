import type { CreateArticlePayload, UpdateArticlePayload, CreateCollectionPayload, CreateRouteRedirectPayload } from '../types/pylon.js';
export declare function listKnowledgeBases(): Promise<unknown>;
export declare function getKnowledgeBase(id: string): Promise<unknown>;
export declare function listArticles(kbId: string, limit?: number, cursor?: string | null): Promise<unknown>;
export declare function getArticle(kbId: string, articleId: string): Promise<unknown>;
export declare function createArticle(kbId: string, data: CreateArticlePayload): Promise<unknown>;
export declare function updateArticle(kbId: string, articleId: string, data: UpdateArticlePayload): Promise<unknown>;
export declare function deleteArticle(kbId: string, articleId: string): Promise<unknown>;
export declare function listCollections(kbId: string): Promise<unknown>;
export declare function getCollection(kbId: string, collectionId: string): Promise<unknown>;
export declare function createCollection(kbId: string, data: CreateCollectionPayload): Promise<unknown>;
export declare function createRouteRedirect(kbId: string, data: CreateRouteRedirectPayload): Promise<unknown>;
//# sourceMappingURL=knowledge-bases.d.ts.map