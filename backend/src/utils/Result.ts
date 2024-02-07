import { BaseError } from './BaseError';
export type Result<T, E extends BaseError = BaseError> = { data: T } | { error: E };
export function isError<T, E extends BaseError>(result: Result<T, E>): result is { error: E } {
  return 'error' in result;
}
