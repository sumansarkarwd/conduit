import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api/client';
import type { Article, Profile } from '../api/types';
import { ArticlePreview } from '../components/ArticlePreview';
import { FollowButton } from '../components/FollowButton';
export function ProfilePage(){ const {username=''}=useParams(); const [profile,setProfile]=useState<Profile>(); const [tab,setTab]=useState<'author'|'favorited'>('author'); const [articles,setArticles]=useState<Article[]>([]); useEffect(()=>{ api.profile(username).then(r=>setProfile(r.profile)); },[username]); useEffect(()=>{ const q=tab==='author'?`?author=${username}`:`?favorited=${username}`; api.listArticles(q).then(r=>setArticles(r.articles)); },[username,tab]); if(!profile) return <p>Loading...</p>; return <main><header className="profile"><h1>{profile.username}</h1><p>{profile.bio}</p><FollowButton profile={profile} onChange={setProfile}/></header><div className="tabs"><button className={tab==='author'?'active':''} onClick={()=>setTab('author')}>My Articles</button><button className={tab==='favorited'?'active':''} onClick={()=>setTab('favorited')}>Favorited Articles</button></div>{articles.length?articles.map(a=><ArticlePreview key={a.slug} article={a}/>):<p>No articles are here... yet.</p>}</main>; }
