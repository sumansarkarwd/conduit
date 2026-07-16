import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { query } from './pool.js';

export async function migrate(dir = new URL('../../migrations', import.meta.url).pathname) {
  await query('create table if not exists migrations (name text primary key, applied_at timestamptz not null default now())');
  const files = (await readdir(dir)).filter(f => f.endsWith('.sql')).sort();
  for (const file of files) {
    const exists = await query('select name from migrations where name=$1', [file]);
    if (exists.rows.length) continue;
    const sql = await readFile(join(dir, file), 'utf8');
    await query(sql);
    await query('insert into migrations (name) values ($1)', [file]);
  }
}
if (import.meta.url === `file://${process.argv[1]}`) migrate().then(() => console.log('migrations applied')).catch(e => { console.error(e); process.exit(1); });
