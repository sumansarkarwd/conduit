import type { NextFunction, Request, Response } from 'express';
import { unauthorized } from '../utils/errors.js';
import { verifyToken, type CurrentUser } from '../services/authService.js';

declare global { namespace Express { interface Request { user?: CurrentUser } } }
function readToken(req:Request){ const header=req.header('authorization')||''; const match=header.match(/^(Token|Bearer)\s+(.+)$/i); return match?.[2]; }
export function optionalAuth(req:Request,_res:Response,next:NextFunction){ const token=readToken(req); if(token){ const user=verifyToken(token); if(user) req.user=user; } next(); }
export function requireAuth(req:Request,res:Response,next:NextFunction){ optionalAuth(req,res,()=>{ if(!req.user) return next(unauthorized()); next(); }); }
