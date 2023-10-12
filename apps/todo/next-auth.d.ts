import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    accessToken: string;
    validUntil: string;
    refreshToken: string;
    refreshTokenValidUntil: string;
  }

  interface Session {
    user: User;
    accessToken: string;
    validUntil: string;
    refreshToken: string;
    refreshTokenValidUntil: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    userId: string;
    accessToken: string;
    validUntil: string;
    refreshToken: string;
    refreshTokenValidUntil: string;
  }
}
