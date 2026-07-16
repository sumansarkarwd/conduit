import { forbidden, notFound } from '../utils/errors.js';
import * as articles from '../repositories/articleRepository.js';
import { favorite, unfavorite } from '../repositories/favoriteRepository.js';
import { createComment, commentsForArticle, deleteComment } from '../repositories/commentRepository.js';
export async function getArticle(slug:string,current?:number){ const a=await articles.getArticle(slug,current); if(!a) throw notFound('article'); return a; }
export async function list(filters:any,current?:number){ return articles.listArticles(filters,current); }
export async function create(userId:number,data:any){ return articles.createArticle(userId,data); }
export async function update(slug:string,userId:number,data:any){ const result=await articles.updateArticle(slug,userId,data); if(!result) throw notFound('article'); if(result==='forbidden') throw forbidden(); return result; }
export async function remove(slug:string,userId:number){ const result=await articles.deleteArticle(slug,userId); if(result==='missing') throw notFound('article'); if(result==='forbidden') throw forbidden(); }
export async function favoriteArticle(slug:string,userId:number){ const row=await articles.findArticleRow(slug); if(!row) throw notFound('article'); await favorite(userId,row.id); return getArticle(slug,userId); }
export async function unfavoriteArticle(slug:string,userId:number){ const row=await articles.findArticleRow(slug); if(!row) throw notFound('article'); await unfavorite(userId,row.id); return getArticle(slug,userId); }
export async function addComment(slug:string,userId:number,body:string){ const row=await articles.findArticleRow(slug); if(!row) throw notFound('article'); await createComment(row.id,userId,body); return (await commentsForArticle(row.id,userId)).at(-1); }
export async function comments(slug:string,current?:number){ const row=await articles.findArticleRow(slug); if(!row) throw notFound('article'); return commentsForArticle(row.id,current); }
export async function removeComment(_slug:string,id:number,userId:number){ const result=await deleteComment(id,userId); if(result==='missing') throw notFound('comment'); if(result==='forbidden') throw forbidden(); }
