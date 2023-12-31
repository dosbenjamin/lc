import { apiClient } from '@api';
import {
  AUTH_CREDENTIALS_PROVIDER_SIGN_IN_ID,
  AUTH_CREDENTIALS_PROVIDER_SIGN_UP_ID,
  DEFAULT_USER_ROLE,
  USER_FAKE_PASSWORD,
} from '@users/users.constants';
import { SignInSchema, SignUpSchema } from '@users/users.schemas';
import { SignInCredentialsType } from '@users/users.types';
import { env } from '@env';
import { AuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { DEFAULT_THEME } from '@common/common.constants';

export const authOptions: AuthOptions = {
  secret: env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      id: AUTH_CREDENTIALS_PROVIDER_SIGN_IN_ID,
      authorize: async (credentials) => {
        const { body, status } = await apiClient.users.signIn.mutation({
          body: credentials as z.infer<typeof SignInSchema>,
        });

        if (status !== 200) return null;

        return {
          id: 'unknown id',
          theme: DEFAULT_THEME,
          role: DEFAULT_USER_ROLE,
          mobilePhoneNumber: (credentials as z.infer<typeof SignInSchema>).mobilePhoneNumber,
          accessToken: body.accessToken,
          accessTokenValidUntil: body.accessTokenValidUntil,
          refreshToken: body.refreshToken,
          refreshTokenValidUntil: body.refreshTokenValidUntil,
        };
      },
      credentials: {},
    }),
    Credentials({
      id: AUTH_CREDENTIALS_PROVIDER_SIGN_UP_ID,
      authorize: async (credentials) => {
        const { body: signUpBody, status: signUpStatus } = await apiClient.users.signUp.mutation({
          body: credentials as z.infer<typeof SignUpSchema>,
        });

        if (signUpStatus !== 200) return null;

        const { status: setPasswordStatus } = await apiClient.users.setPassword.mutation({
          body: {
            password: USER_FAKE_PASSWORD,
            userId: signUpBody.userId,
          },
          params: {
            userId: signUpBody.userId,
          },
        });

        const { body: signInBody, status: signInStatus } = await apiClient.users.signIn.mutation({
          body: {
            password: USER_FAKE_PASSWORD,
            mobilePhoneNumber: (credentials as z.infer<typeof SignUpSchema>).mobilePhoneNumber,
            credentialsType: SignInCredentialsType.Password,
          },
        });

        if (signInStatus !== 200 || setPasswordStatus !== 204) return null;

        return {
          id: signUpBody.userId,
          theme: DEFAULT_THEME,
          role: DEFAULT_USER_ROLE,
          mobilePhoneNumber: signUpBody.mobilePhoneNumber,
          accessToken: signInBody.accessToken,
          accessTokenValidUntil: signInBody.accessTokenValidUntil,
          refreshToken: signInBody.refreshToken,
          refreshTokenValidUntil: signInBody.refreshTokenValidUntil,
        };
      },
      credentials: {},
    }),
  ],
  callbacks: {
    signIn: ({ user }) => !!user,
    jwt({ token, user, session }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.accessTokenValidUntil = user.accessTokenValidUntil;
        token.refreshToken = user.refreshToken;
        token.refreshTokenValidUntil = user.refreshTokenValidUntil;
        token.userId = user.id;
        token.userMobilePhoneNumber = user.mobilePhoneNumber;
        token.userTheme = user.theme;
        token.userRole = user.role;
      }

      if (session?.userTheme) {
        token.userTheme = session.userTheme;
      }

      if (session?.userRole) {
        token.userRole = session.userRole;
      }

      return token;
    },
    session({ session, token }) {
      session.accessToken = token.accessToken;
      session.accessTokenValidUntil = token.accessTokenValidUntil;
      session.refreshToken = token.refreshToken;
      session.refreshTokenValidUntil = token.refreshTokenValidUntil;
      session.user.id = token.userId;
      session.user.mobilePhoneNumber = token.userMobilePhoneNumber;
      session.user.theme = token.userTheme;
      session.user.role = token.userRole;

      return session;
    },
  },
  pages: {
    signIn: '/',
  },
};
