import type { Article, Comment, Profile, User } from './types';
const API_BASE=import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
let tokenProvider=()=>localStorage.getItem('conduit_token');
export function setTokenProvider(fn:()=>string|null){ tokenProvider=fn; }
async function request<T>(path:string, options:RequestInit={}){ const token=tokenProvider(); const headers:Record<string,string>={ 'Content-Type':'application/json', ...(options.headers as any) }; if(token) headers.Authorization=`Token ${token}`; const res=await fetch(`${API_BASE}${path}`,{...options,headers}); const body=res.status===204?undefined:await res.json(); if(!res.ok) throw body; return body as T; }
export const api={
  register:(user:{username:string;email:string;password:string})=>request<{user:User}>('/api/users',{method:'POST',body:JSON.stringify({user})}),
  login:(user:{email:string;password:string})=>request<{user:User}>('/api/users/login',{method:'POST',body:JSON.stringify({user})}),
  currentUser:()=>request<{user:User}>('/api/user'),
  updateUser:(user:Partial<User>&{password?:string})=>request<{user:User}>('/api/user',{method:'PUT',body:JSON.stringify({user})}),
  listArticles:(query='')=>request<{articles:Article[];articlesCount:number}>(`/api/articles${query}`),
  feed:(query='')=>request<{articles:Article[];articlesCount:number}>(`/api/articles/feed${query}`),
  getArticle:(slug:string)=>request<{article:Article}>(`/api/articles/${slug}`),
  createArticle:(article:any)=>request<{article:Article}>('/api/articles',{method:'POST',body:JSON.stringify({article})}),
  updateArticle:(slug:string,article:any)=>request<{article:Article}>(`/api/articles/${slug}`,{method:'PUT',body:JSON.stringify({article})}),
  deleteArticle:(slug:string)=>request<void>(`/api/articles/${slug}`,{method:'DELETE'}),
  favorite:(slug:string)=>request<{article:Article}>(`/api/articles/${slug}/favorite`,{method:'POST'}),
  unfavorite:(slug:string)=>request<{article:Article}>(`/api/articles/${slug}/favorite`,{method:'DELETE'}),
  comments:(slug:string)=>request<{comments:Comment[]}>(`/api/articles/${slug}/comments`),
  addComment:(slug:string,body:string)=>request<{comment:Comment}>(`/api/articles/${slug}/comments`,{method:'POST',body:JSON.stringify({comment:{body}})}),
  deleteComment:(slug:string,id:number)=>request<void>(`/api/articles/${slug}/comments/${id}`,{method:'DELETE'}),
  tags:()=>request<{tags:string[]}>('/api/tags'),
  profile:(username:string)=>request<{profile:Profile}>(`/api/profiles/${username}`),
  follow:(username:string)=>request<{profile:Profile}>(`/api/profiles/${username}/follow`,{method:'POST'}),
  unfollow:(username:string)=>request<{profile:Profile}>(`/api/profiles/${username}/follow`,{method:'DELETE'})
};
