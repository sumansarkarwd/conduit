import { createApp } from './app.js';
import { config } from './config.js';
createApp().listen(config.port,()=>console.log(`Conduit API listening on ${config.port}`));
