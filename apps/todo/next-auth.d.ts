import type { ThemeType } from '@theme/theme.types';
import NextAuth, { Theme } from 'next-auth';

declare module 'next-auth' {
  interface User {
    mobilePhoneNumber: string;
    accessToken: string;
    validUntil: string;
    refreshToken: string;
    refreshTokenValidUntil: string;
    theme: ThemeType;
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
    userMobilePhoneNumber: string;
    userId: string;
    userTheme: ThemeType;
    accessToken: string;
    validUntil: string;
    refreshToken: string;
    refreshTokenValidUntil: string;
  }
}
