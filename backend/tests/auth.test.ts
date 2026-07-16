import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { createApp } from '../src/app.js';
import { authHeader, installTestDb } from './testDb.js';
installTestDb();
const app=createApp();
async function register(username='alice', email='a@example.com'){ return request(app).post('/api/users').send({user:{username,email,password:'password'}}); }
describe('auth',()=>{
  it('registers, rejects duplicates/blanks, logs in, and persists current user', async()=>{
    const res=await register(); expect(res.status).toBe(201); expect(res.body.user.token).toBeTruthy();
    expect((await register('alice','other@example.com')).status).toBe(422);
    expect((await request(app).post('/api/users').send({user:{username:'',email:'',password:''}})).status).toBe(422);
    expect((await request(app).post('/api/users/login').send({user:{email:'a@example.com',password:'bad'}})).status).toBe(401);
    const login=await request(app).post('/api/users/login').send({user:{email:'a@example.com',password:'password'}}); expect(login.status).toBe(200);
    const me=await request(app).get('/api/user').set(authHeader(login.body.user.token)); expect(me.body.user.username).toBe('alice');
  });
  it('updates settings without requiring a password change and protects current user', async()=>{
    expect((await request(app).get('/api/user')).status).toBe(401);
    const token=(await register()).body.user.token;
    const updated=await request(app).put('/api/user').set(authHeader(token)).send({user:{bio:'hi',image:'img.png'}});
    expect(updated.body.user.bio).toBe('hi'); expect(updated.body.user.username).toBe('alice');
  });
});
