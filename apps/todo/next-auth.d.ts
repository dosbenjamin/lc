import { UserRole } from '@users/users.types';
import type { ThemeType } from '@theme/theme.types';
import NextAuth, { Theme } from 'next-auth';

declare module 'next-auth' {
  interface User {
    mobilePhoneNumber: string;
    accessToken: string;
    accessTokenValidUntil: string;
    refreshToken: string;
    refreshTokenValidUntil: string;
    theme: ThemeType;
    role: UserRole;
  }

  interface Session {
    user: User;
    accessToken: string;
    accessTokenValidUntil: string;
    refreshToken: string;
    refreshTokenValidUntil: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    userMobilePhoneNumber: string;
    userId: string;
    userTheme: ThemeType;
    userRole: UserRole;
    accessToken: string;
    accessTokenValidUntil: string;
    refreshToken: string;
    refreshTokenValidUntil: string;
  }
}
