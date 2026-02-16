import type { CreateMilestonePayload, UpdateMilestonePayload } from '../types/pylon.js';
export declare function createMilestone(data: CreateMilestonePayload): Promise<unknown>;
export declare function updateMilestone(milestoneId: string, data: UpdateMilestonePayload): Promise<unknown>;
export declare function deleteMilestone(milestoneId: string): Promise<unknown>;
//# sourceMappingURL=milestones.d.ts.map