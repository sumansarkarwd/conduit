import { query } from '../db/pool.js';
import { findUserByUsername } from './userRepository.js';
export async function isFollowing(followerId:number|undefined, followeeId:number){ if(!followerId) return false; return (await query('select 1 from follows where follower_id=$1 and followee_id=$2',[followerId,followeeId])).rows.length>0; }
export async function follow(followerId:number, username:string){ const user=await findUserByUsername(username); if(!user) return undefined; if(user.id!==followerId) await query('insert into follows (follower_id,followee_id) values ($1,$2) on conflict do nothing',[followerId,user.id]); return user; }
export async function unfollow(followerId:number, username:string){ const user=await findUserByUsername(username); if(!user) return undefined; await query('delete from follows where follower_id=$1 and followee_id=$2',[followerId,user.id]); return user; }
