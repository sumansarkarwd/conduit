import 'dotenv/config';
export const config = {
  databaseUrl: process.env.DATABASE_URL ?? 'postgres://conduit:conduit@localhost:5432/conduit',
  jwtSecret: process.env.JWT_SECRET ?? 'test-secret',
  port: Number(process.env.PORT ?? 3001),
  clientOrigin: process.env.CLIENT_ORIGIN ?? 'http://localhost:3000'
};
