import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { newDb } from 'pg-mem';
import { beforeEach } from 'vitest';
import { setQueryForTests } from '../src/db/pool.js';

export function installTestDb(){
  beforeEach(async()=>{
    const db=newDb({ autoCreateForeignKeyIndices:true });
    db.public.registerFunction({ name:'now', returns:'timestamptz' as any, implementation:()=>new Date() });
    const pg=db.adapters.createPg();
    const pool=new pg.Pool();
    setQueryForTests((text,params=[])=>pool.query(text,params as any[]));
    const sql=readFileSync(join(process.cwd(),'migrations','001_initial.sql'),'utf8');
    await pool.query(sql);
  });
}
export const authHeader=(token:string)=>({ Authorization:`Token ${token}` });
