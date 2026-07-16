import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '../api/client';
import type { Article } from '../api/types';
import { useAuth } from '../auth/AuthContext';
import { ArticlePreview } from '../components/ArticlePreview';
import { Pagination } from '../components/Pagination';
import { TagList } from '../components/TagList';
const limit=10;
export function HomePage(){ const {user}=useAuth(); const [sp]=useSearchParams(); const nav=useNavigate(); const [tab,setTab]=useState<'global'|'feed'>('global'); const [articles,setArticles]=useState<Article[]>([]); const [count,setCount]=useState(0); const [tags,setTags]=useState<string[]>([]); const page=Number(sp.get('page')??0); const tag=sp.get('tag'); useEffect(()=>{ api.tags().then(r=>setTags(r.tags)); },[]); useEffect(()=>{ const q=`?limit=${limit}&offset=${page*limit}${tag?`&tag=${tag}`:''}`; (tab==='feed'?api.feed(q):api.listArticles(q)).then(r=>{setArticles(r.articles);setCount(r.articlesCount);}); },[tab,page,tag]); return <main><h1>conduit</h1><div className="tabs"><button className={tab==='global'?'active':''} onClick={()=>setTab('global')}>Global Feed</button>{user&&<button className={tab==='feed'?'active':''} onClick={()=>setTab('feed')}>Your Feed</button>}{tag&&<span>#{tag}</span>}</div>{articles.length?articles.map(a=><ArticlePreview key={a.slug} article={a}/>):<p>No articles are here... yet.</p>}<Pagination count={count} limit={limit} page={page} onPage={p=>nav(`/?page=${p}${tag?`&tag=${tag}`:''}`)}/><aside><h2>Popular Tags</h2><TagList tags={tags} onSelect={t=>nav(`/?tag=${t}`)}/></aside></main>; }
