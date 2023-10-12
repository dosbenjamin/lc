import { apiClient } from '@api';
import { AUTH_CREDENTIALS_PROVIDER_SIGN_IN_ID, AUTH_CREDENTIALS_PROVIDER_SIGN_UP_ID } from '@auth/auth.constants';
import { SignInSchema, SignUpSchema } from '@auth/auth.schemas';
import { SignInCredentialsType } from '@auth/auth.types';
import { nextRoutes } from '@common/common.helpers';
import { env } from '@env';
import { AuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';

const FAKE_PASSWORD = 'Certinergie@2023';

export const authOptions: AuthOptions = {
  secret: env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      id: AUTH_CREDENTIALS_PROVIDER_SIGN_IN_ID,
      authorize: async (credentials) => {
        const { body, status } = await apiClient.auth.signIn.mutation({
          body: credentials as z.infer<typeof SignInSchema>,
        });

        if (status !== 200) return null;

        return {
          id: '348dad0c-b321-4e31-60a5-08dbca63b6b8',
          accessToken: body.accessToken,
          refreshToken: body.refreshToken,
          refreshTokenValidUntil: body.refreshTokenValidUntil,
          validUntil: body.validUntil,
        };
      },
      credentials: {},
    }),
    Credentials({
      id: AUTH_CREDENTIALS_PROVIDER_SIGN_UP_ID,
      authorize: async (credentials) => {
        const { body: signUpBody, status: signUpStatus } = await apiClient.auth.signUp.mutation({
          body: credentials as z.infer<typeof SignUpSchema>,
        });

        if (signUpStatus !== 200) return null;

        const { status: setPasswordStatus } = await apiClient.auth.setPassword.mutation({
          body: {
            password: FAKE_PASSWORD,
            userId: signUpBody.userId,
          },
          params: {
            userId: signUpBody.userId,
          },
        });

        const { body: signInBody, status: signInStatus } = await apiClient.auth.signIn.mutation({
          body: {
            password: FAKE_PASSWORD,
            mobilePhoneNumber: (credentials as z.infer<typeof SignUpSchema>).mobilePhoneNumber,
            credentialsType: SignInCredentialsType.Password,
          },
        });

        if (signInStatus !== 200 || setPasswordStatus !== 204) return null;

        return {
          id: signUpBody.userId,
          accessToken: signInBody.accessToken,
          refreshToken: signInBody.refreshToken,
          refreshTokenValidUntil: signInBody.refreshTokenValidUntil,
          validUntil: signInBody.validUntil,
        };
      },
      credentials: {},
    }),
  ],
  callbacks: {
    signIn: ({ user }) => !!user,
    jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.validUntil = user.validUntil;
        token.refreshToken = user.refreshToken;
        token.refreshTokenValidUntil = user.refreshTokenValidUntil;
        token.userId = user.id;
      }

      return token;
    },
    session({ session, token }) {
      session.accessToken = token.accessToken;
      session.validUntil = token.validUntil;
      session.refreshToken = token.refreshToken;
      session.refreshTokenValidUntil = token.refreshTokenValidUntil;
      session.user.id = token.userId;

      return session;
    },
  },
  pages: {
    signIn: nextRoutes.getHome(),
  },
};
