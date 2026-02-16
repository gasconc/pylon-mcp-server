import type { CreateTaskPayload, UpdateTaskPayload } from '../types/pylon.js';
export declare function createTask(data: CreateTaskPayload): Promise<unknown>;
export declare function updateTask(taskId: string, data: UpdateTaskPayload): Promise<unknown>;
export declare function deleteTask(taskId: string): Promise<unknown>;
//# sourceMappingURL=tasks.d.ts.map