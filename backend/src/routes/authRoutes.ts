import { Router } from 'express';
import { currentUser, login, register, updateCurrentUser } from '../services/authService.js';
import { requireAuth } from '../middleware/auth.js';
import { optionalString, required } from '../utils/validators.js';
export const authRoutes = Router();
authRoutes.post('/users', async (req,_res,next)=>{ try{ const u=req.body.user??{}; _res.status(201).json({ user: await register(required(u.username,'username'), required(u.email,'email'), required(u.password,'password')) }); }catch(e){ next(e); } });
authRoutes.post('/users/login', async (req,res,next)=>{ try{ const u=req.body.user??{}; res.json({ user: await login(required(u.email,'email'), required(u.password,'password')) }); }catch(e){ next(e); } });
authRoutes.get('/user', requireAuth, async (req,res,next)=>{ try{ res.json({ user: await currentUser(req.user!.id) }); }catch(e){ next(e); } });
authRoutes.put('/user', requireAuth, async (req,res,next)=>{ try{ const u=req.body.user??{}; res.json({ user: await updateCurrentUser(req.user!.id,{ email:optionalString(u.email), username:optionalString(u.username), password:optionalString(u.password), bio:optionalString(u.bio), image:optionalString(u.image) }) }); }catch(e){ next(e); } });
