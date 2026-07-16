import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import { ApiError, unauthorized, validationError } from '../utils/errors.js';
import { createUser, findUserByEmail, findUserById, findUserByUsername, publicUser, updateUser, type UserRow } from '../repositories/userRepository.js';
export type CurrentUser = { id:number; username:string; email:string };
export function signToken(user: UserRow){ return jwt.sign({ sub:user.id, username:user.username }, config.jwtSecret, { expiresIn:'7d' }); }
export function toUser(user:UserRow){ return publicUser(user, signToken(user)); }
export async function register(username:string,email:string,password:string){
  if(await findUserByUsername(username)) throw new ApiError(422,{username:['already exists']});
  if(await findUserByEmail(email)) throw new ApiError(422,{email:['already exists']});
  return toUser(await createUser(username,email,await bcrypt.hash(password,10)));
}
export async function login(email:string,password:string){ const user=await findUserByEmail(email); if(!user || !(await bcrypt.compare(password,user.password_hash))) throw unauthorized(); return toUser(user); }
export async function currentUser(id:number){ const user=await findUserById(id); if(!user) throw unauthorized(); return toUser(user); }
export async function updateCurrentUser(id:number, data:{email?:string; username?:string; password?:string; bio?:string; image?:string}){
  if(data.email){ const existing=await findUserByEmail(data.email); if(existing && existing.id!==id) throw new ApiError(422,{email:['already exists']}); }
  if(data.username){ const existing=await findUserByUsername(data.username); if(existing && existing.id!==id) throw new ApiError(422,{username:['already exists']}); }
  const passwordHash = data.password ? await bcrypt.hash(data.password,10) : undefined;
  const user=await updateUser(id,{...data,passwordHash}); if(!user) throw validationError('user','not found'); return toUser(user);
}
export function verifyToken(token:string):CurrentUser|null{ try{ const payload=jwt.verify(token, config.jwtSecret) as any; return { id:Number(payload.sub), username:String(payload.username??''), email:'' }; } catch { return null; } }
