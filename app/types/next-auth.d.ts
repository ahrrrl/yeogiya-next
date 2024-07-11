import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    accessToken?: string;
    refreshToken?: string;
  }

  interface Session {
    user: User & {
      accessToken?: string;
      refreshToken?: string;
    };
  }
}
