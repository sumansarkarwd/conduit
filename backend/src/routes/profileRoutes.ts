import { Router } from 'express';
import { optionalAuth, requireAuth } from '../middleware/auth.js';
import { followProfile, profileFor, unfollowProfile } from '../services/profileService.js';
export const profileRoutes=Router();
const param=(value:unknown)=>String(Array.isArray(value)?value[0]:value);
profileRoutes.get('/profiles/:username', optionalAuth, async (req,res,next)=>{ try{ res.json({ profile: await profileFor(param(req.params.username), req.user?.id) }); }catch(e){ next(e); } });
profileRoutes.post('/profiles/:username/follow', requireAuth, async (req,res,next)=>{ try{ res.json({ profile: await followProfile(param(req.params.username), req.user!.id) }); }catch(e){ next(e); } });
profileRoutes.delete('/profiles/:username/follow', requireAuth, async (req,res,next)=>{ try{ res.json({ profile: await unfollowProfile(param(req.params.username), req.user!.id) }); }catch(e){ next(e); } });
