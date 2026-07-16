import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { createApp } from '../src/app.js';
import { authHeader, installTestDb } from './testDb.js';
installTestDb(); const app=createApp();
async function user(username:string,email:string){ return (await request(app).post('/api/users').send({user:{username,email,password:'password'}})).body.user; }
async function article(token:string,title='Hello'){ return (await request(app).post('/api/articles').set(authHeader(token)).send({article:{title,description:'desc',body:'body',tagList:['tag','news']}})).body.article; }
describe('articles',()=>{
  it('creates, lists with pagination/tag filters, favorites, and protects cross-user edits/deletes', async()=>{
    const alice=await user('alice','a@example.com'); const bob=await user('bob','b@example.com');
    const a=await article(alice.token);
    expect((await request(app).put(`/api/articles/${a.slug}`).set(authHeader(bob.token)).send({article:{title:'Hack'}})).status).toBe(403);
    const fav=await request(app).post(`/api/articles/${a.slug}/favorite`).set(authHeader(bob.token)); expect(fav.body.article.favoritesCount).toBe(1); expect(fav.body.article.favorited).toBe(true);
    const global=await request(app).get('/api/articles?limit=1&offset=0'); expect(global.body.articlesCount).toBe(1); expect(global.body.articles[0].tagList).toContain('tag');
    const filtered=await request(app).get('/api/articles?tag=tag'); expect(filtered.body.articlesCount).toBe(1);
    const byFav=await request(app).get('/api/articles?favorited=bob'); expect(byFav.body.articlesCount).toBe(1);
    const edited=await request(app).put(`/api/articles/${a.slug}`).set(authHeader(alice.token)).send({article:{description:'new'}}); expect(edited.body.article.description).toBe('new');
    expect((await request(app).delete(`/api/articles/${a.slug}`).set(authHeader(bob.token))).status).toBe(403);
    expect((await request(app).delete(`/api/articles/${edited.body.article.slug}`).set(authHeader(alice.token))).status).toBe(204);
  });
  it('returns personal feed after following authors', async()=>{
    const alice=await user('alice','a@example.com'); const bob=await user('bob','b@example.com'); await article(alice.token,'A');
    expect((await request(app).get('/api/articles/feed').set(authHeader(bob.token))).body.articlesCount).toBe(0);
    await request(app).post('/api/profiles/alice/follow').set(authHeader(bob.token));
    const feed=await request(app).get('/api/articles/feed').set(authHeader(bob.token)); expect(feed.body.articlesCount).toBe(1); expect(feed.body.articles[0].author.following).toBe(true);
  });
});
