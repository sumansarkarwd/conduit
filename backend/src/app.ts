import express from 'express';
import cors from 'cors';
import { config } from './config.js';
import { errorHandler } from './utils/errors.js';
import { authRoutes } from './routes/authRoutes.js';
import { profileRoutes } from './routes/profileRoutes.js';
import { articleRoutes } from './routes/articleRoutes.js';
export function createApp(){ const app=express(); app.use(cors({ origin:config.clientOrigin, credentials:true })); app.use(express.json()); app.get('/health',(_req,res)=>res.json({ok:true})); app.use('/api',authRoutes); app.use('/api',profileRoutes); app.use('/api',articleRoutes); app.use(errorHandler); return app; }
