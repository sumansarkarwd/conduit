import { Button } from '@mantine/core';
import { useState } from 'react';
import { api } from '../api/client';
import type { Article } from '../api/types';
import { useAuth } from '../auth/AuthContext';

export function FavoriteButton({article,onChange}:{article:Article;onChange?:(a:Article)=>void}){
  const {user}=useAuth();
  const [a,setA]=useState(article);
  async function click(){ if(!user) return; const r=a.favorited?await api.unfavorite(a.slug):await api.favorite(a.slug); setA(r.article); onChange?.(r.article); }
  return <Button variant={a.favorited?'filled':'light'} color="green" size="xs" disabled={!user} onClick={click}>{a.favorited?'Unfavorite':'Favorite'} {a.favoritesCount}</Button>;
}
