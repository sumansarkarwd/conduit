import { validationError } from './errors.js';
export function required(value: unknown, field: string): string { if (typeof value !== 'string' || !value.trim()) throw validationError(field); return value.trim(); }
export function optionalString(value: unknown): string | undefined { return typeof value === 'string' ? value : undefined; }
export function arrayOfStrings(value: unknown): string[] { return Array.isArray(value) ? value.filter(v => typeof v === 'string' && v.trim()).map(v => v.trim()) : []; }
