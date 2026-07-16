import { query } from '../db/pool.js';
export async function favorite(userId:number, articleId:number){ await query('insert into favorites (user_id,article_id) values ($1,$2) on conflict do nothing',[userId,articleId]); }
export async function unfavorite(userId:number, articleId:number){ await query('delete from favorites where user_id=$1 and article_id=$2',[userId,articleId]); }
