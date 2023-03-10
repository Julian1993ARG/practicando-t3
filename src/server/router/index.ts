// src/server/router/index.ts
import { createRouter } from './context';
import superjson from 'superjson';
import { itemRouter } from './itemRouter';
import { userRouter } from './userRouter';

export const appRouter = createRouter().transformer(superjson)
  .merge('items.', itemRouter)
  .merge('users.', userRouter);

// export type definition of API
export type AppRouter = typeof appRouter
