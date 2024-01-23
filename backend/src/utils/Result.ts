import { BaseError } from './BaseError';
export type Result<T, E extends BaseError = BaseError> = { success: true; result: T } | { success: false; error: E };
