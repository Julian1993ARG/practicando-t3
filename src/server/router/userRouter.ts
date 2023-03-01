import { z } from 'zod';
import { createRouter } from './context';

export const userRouter = createRouter()

  .mutation('addUser', {
    input: z.object({
      name: z.string(),
      surname: z.string(),
      coment: z.string(),
      profileImage: z.string()
    }),
    resolve: async ({ input, ctx }) => {
      const { name, surname, coment, profileImage } = input;

      const user = ctx.prisma.user.create({
        data: {
          name,
          surname,
          coment,
          profileImage
        }
      });
      return user;
    }
  })

  .query('getAllUsers', {
    resolve: async ({ ctx }) => {
      const users = await ctx.prisma.user.findMany();
      return users;
    }
  })

  .query('getUserById', {
    input: z.object({
      id: z.string()
    }),
    resolve: async ({ input, ctx }) => {
      const { id } = input;

      const user = await ctx.prisma.user.findUnique({
        where: {
          id
        }
      });
      return user;
    }
  });
