import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { createApp } from '../src/app.js';
import { authHeader, installTestDb } from './testDb.js';
installTestDb(); const app=createApp();
async function user(username:string,email:string){ return (await request(app).post('/api/users').send({user:{username,email,password:'password'}})).body.user; }
describe('comments',()=>{ it('adds/lists comments and rejects deletion by another user', async()=>{ const alice=await user('alice','a@example.com'); const bob=await user('bob','b@example.com'); const art=(await request(app).post('/api/articles').set(authHeader(alice.token)).send({article:{title:'Post',description:'d',body:'b',tagList:['x']}})).body.article; const c=await request(app).post(`/api/articles/${art.slug}/comments`).set(authHeader(bob.token)).send({comment:{body:'nice'}}); expect(c.status).toBe(201); const list=await request(app).get(`/api/articles/${art.slug}/comments`).set(authHeader(alice.token)); expect(list.body.comments[0].author.username).toBe('bob'); expect((await request(app).delete(`/api/articles/${art.slug}/comments/${c.body.comment.id}`).set(authHeader(alice.token))).status).toBe(403); expect((await request(app).delete(`/api/articles/${art.slug}/comments/${c.body.comment.id}`).set(authHeader(bob.token))).status).toBe(204); }); });
