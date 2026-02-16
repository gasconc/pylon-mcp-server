import type { CustomFieldObjectType, CreateCustomFieldPayload, UpdateCustomFieldPayload } from '../types/pylon.js';
export declare function listCustomFields(objectType: CustomFieldObjectType, cursor?: string | null): Promise<unknown>;
export declare function getCustomField(customFieldId: string): Promise<unknown>;
export declare function createCustomField(data: CreateCustomFieldPayload): Promise<unknown>;
export declare function updateCustomField(customFieldId: string, data: UpdateCustomFieldPayload): Promise<unknown>;
//# sourceMappingURL=custom-fields.d.ts.map