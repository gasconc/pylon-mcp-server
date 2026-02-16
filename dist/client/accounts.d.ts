import type { CreateAccountPayload, UpdateAccountPayload } from '../types/pylon.js';
export declare function listAccounts(limit?: number, cursor?: string | null): Promise<unknown>;
export declare function getAccount(accountId: string): Promise<unknown>;
export declare function createAccount(data: CreateAccountPayload): Promise<unknown>;
export declare function updateAccount(accountId: string, data: UpdateAccountPayload): Promise<unknown>;
//# sourceMappingURL=accounts.d.ts.map