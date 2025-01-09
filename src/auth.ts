import NextAuth, { type DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import Credentials from 'next-auth/providers/credentials';

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
        username: { label: 'Username', type: 'text', placeholder: 'rex' },
        password: { label: 'Password', type: 'password', placeholder: 'rex' },
      },
      authorize: async (credentials) => {

        const { username, password } = credentials || {};

        // Example hardcoded user data
        const user = { id: '251atsarq5', username: 'rex', password: 'rex', role: 'admin' };

        // Check if username and password match
        if (username === user.username && password === user.password) {
          return { id: user.id, name: user.username, role: user.role };
        }

        // Return null if authentication fails
        return null;
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
