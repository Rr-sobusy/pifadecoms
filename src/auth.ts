import NextAuth, { type DefaultSession } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import 'next-auth/jwt';

import prisma from './lib/prisma';

declare module 'next-auth' {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */

  interface User {
    role: string;
  }

  interface Session {
    user: {
      /** The user's postal address. */
      role: string;
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
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
          const user = await prisma.users.findFirstOrThrow({
            where: {
              AND: [{ userName: credentials.username as string }, { password: credentials.password as string }],
            },
          });

          if (user) {
            return { id: user.userId, name: user.userName, role: user.role };
          }

          return null;
        } catch (error) {
          throw new Error('NO users found');
        }
      },
    }),
  ],
  session: {
    // Adjust the session expiration time (in seconds)
    maxAge: 60 * 60 * 24, // 7 days
  },
  jwt: {
    // Adjust the JWT expiration time (in seconds)
    maxAge: 60 * 60 * 24, // 7 days
  },
  callbacks: {
    async session({ session, token }) {
      if (token?.role) {
        session.user.role = token.role; // Add role to the session object
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role; // Add role to the token
      }
      return token;
    },
  },
});
