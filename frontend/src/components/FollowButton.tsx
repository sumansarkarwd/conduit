import { useState } from 'react';
import { api } from '../api/client';
import type { Profile } from '../api/types';
import { useAuth } from '../auth/AuthContext';
export function FollowButton({profile,onChange}:{profile:Profile;onChange?:(p:Profile)=>void}){ const {user}=useAuth(); const [p,setP]=useState(profile); if(user?.username===p.username) return null; async function click(){ if(!user) return; const r=p.following?await api.unfollow(p.username):await api.follow(p.username); setP(r.profile); onChange?.(r.profile); } return <button disabled={!user} onClick={click}>{p.following?'Unfollow':'Follow'} {p.username}</button>; }
