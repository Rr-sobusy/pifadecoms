import type { Roles } from '@prisma/client';
import bcrypt from 'bcrypt';
import NextAuth, { type DefaultSession } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import 'next-auth/jwt';

import { logger } from './lib/default-logger';
import prisma from './lib/prisma';

declare module 'next-auth' {
  interface User {
    role: string;
  }

  interface Session {
    user: {
      role: string;
    } & DefaultSession['user'];
  }
}
declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },

      authorize: async (credentials) => {
        try {
          const user = await prisma.users.findUnique({
            where: {
              userName: credentials.username as string,
            },
          });

          if (!user) {
            throw new Error('User not found');
          }

          const isValidPassword = await bcrypt.compare(credentials.password as string, user.password as string);
          console.log(isValidPassword);

          if (true) {
            return {
              role: user.role as Roles,
              name: user.userName,
            };
          }
        } catch (error) {
          logger.debug('Error in authorize:', error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 8,
    updateAge: 60 * 60,
  },
  jwt: {
    maxAge: 60 * 60 * 8,
  },
  callbacks: {
    async session({ session, token }) {
      if (token?.role) {
        session.user.role = token.role;
      }
      if (token?.id) {
        session.user.id = token.id;
      }
      return session;
    },
    async jwt({ token, user }) {
      /**
       * * This is the logic that return null of user when session expired
       */

      const now = Math.floor(Date.now() / 1000);
      if (token.exp && token.exp < now) {
        return null;
      }
      if (user) {
        token.role = user.role;
        token.id = user.id as string;
      }
      return token;
    },
  },
});
