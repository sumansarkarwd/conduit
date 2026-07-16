import type { NextFunction, Request, Response } from 'express';
export class ApiError extends Error { constructor(public status: number, public errors: Record<string, string[]>) { super(Object.values(errors).flat().join(', ')); } }
export const validationError = (field: string, message = "can't be blank") => new ApiError(422, { [field]: [message] });
export const notFound = (field = 'resource') => new ApiError(404, { [field]: ['not found'] });
export const forbidden = () => new ApiError(403, { error: ['forbidden'] });
export const unauthorized = () => new ApiError(401, { error: ['unauthorized'] });
export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ApiError) return res.status(err.status).json({ errors: err.errors });
  console.error(err);
  return res.status(500).json({ errors: { error: ['internal server error'] } });
}
