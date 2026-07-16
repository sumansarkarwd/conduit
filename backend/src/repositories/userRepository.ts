import { query } from '../db/pool.js';
export type UserRow = { id:number; username:string; email:string; password_hash:string; bio:string|null; image:string|null };
export async function findUserById(id:number){ return (await query('select * from users where id=$1',[id])).rows[0] as UserRow|undefined; }
export async function findUserByEmail(email:string){ return (await query('select * from users where lower(email)=lower($1)',[email])).rows[0] as UserRow|undefined; }
export async function findUserByUsername(username:string){ return (await query('select * from users where lower(username)=lower($1)',[username])).rows[0] as UserRow|undefined; }
export async function createUser(username:string,email:string,passwordHash:string){ return (await query('insert into users (username,email,password_hash) values ($1,$2,$3) returning *',[username,email,passwordHash])).rows[0] as UserRow; }
export async function updateUser(id:number, data:{email?:string; username?:string; passwordHash?:string; bio?:string; image?:string}){
  const current=await findUserById(id); if(!current) return undefined;
  return (await query('update users set email=$1, username=$2, password_hash=$3, bio=$4, image=$5, updated_at=now() where id=$6 returning *',[data.email??current.email,data.username??current.username,data.passwordHash??current.password_hash,data.bio??current.bio,data.image??current.image,id])).rows[0] as UserRow;
}
export function publicUser(user:UserRow, token:string){ return { email:user.email, token, username:user.username, bio:user.bio, image:user.image }; }
