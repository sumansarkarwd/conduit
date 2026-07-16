import pg from 'pg';
import { config } from '../config.js';

type QueryFn = (text: string, params?: unknown[]) => Promise<{ rows: any[]; rowCount?: number | null }>;
const pool = new pg.Pool({ connectionString: config.databaseUrl });
let queryFn: QueryFn = (text, params = []) => pool.query(text, params as any[]);
export const query: QueryFn = (text, params = []) => queryFn(text, params);
export function setQueryForTests(fn: QueryFn) { queryFn = fn; }
export async function closePool() { await pool.end(); }
