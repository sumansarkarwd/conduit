import { notFound } from '../utils/errors.js';
import { findUserByUsername, type UserRow } from '../repositories/userRepository.js';
import { follow, isFollowing, unfollow } from '../repositories/followRepository.js';
export async function profileFor(username:string,currentUserId?:number){ const user=await findUserByUsername(username); if(!user) throw notFound('profile'); return profile(user,currentUserId); }
export async function followProfile(username:string,currentUserId:number){ const user=await follow(currentUserId,username); if(!user) throw notFound('profile'); return profile(user,currentUserId); }
export async function unfollowProfile(username:string,currentUserId:number){ const user=await unfollow(currentUserId,username); if(!user) throw notFound('profile'); return profile(user,currentUserId); }
async function profile(user:UserRow,currentUserId?:number){ return { username:user.username, bio:user.bio, image:user.image, following: await isFollowing(currentUserId,user.id) }; }
