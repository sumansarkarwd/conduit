import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { createApp } from '../src/app.js';
import { authHeader, installTestDb } from './testDb.js';
installTestDb(); const app=createApp();
async function user(username:string,email:string){ return (await request(app).post('/api/users').send({user:{username,email,password:'password'}})).body.user; }
describe('profiles',()=>{ it('gets profiles and follows/unfollows', async()=>{ const alice=await user('alice','a@example.com'); await user('bob','b@example.com'); expect((await request(app).get('/api/profiles/bob')).body.profile.following).toBe(false); const f=await request(app).post('/api/profiles/bob/follow').set(authHeader(alice.token)); expect(f.body.profile.following).toBe(true); const u=await request(app).delete('/api/profiles/bob/follow').set(authHeader(alice.token)); expect(u.body.profile.following).toBe(false); }); });
