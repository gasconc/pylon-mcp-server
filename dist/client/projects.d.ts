import type { CreateProjectPayload, UpdateProjectPayload } from '../types/pylon.js';
export declare function createProject(data: CreateProjectPayload): Promise<unknown>;
export declare function updateProject(projectId: string, data: UpdateProjectPayload): Promise<unknown>;
export declare function deleteProject(projectId: string): Promise<unknown>;
//# sourceMappingURL=projects.d.ts.map