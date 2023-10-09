import { SignInCredentialsTypeSchema } from '@auth/auth.schemas';
import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const contract = initContract();
export const authContract = contract.router(
  {
    access: {
      method: 'POST',
      path: '/access',
      body: z.object({
        mobilePhoneNumber: z.string().min(1).trim(),
      }),
      responses: {
        200: z.object({
          mobilePhoneNumber: z.string(),
          isSignUpFlow: z.boolean(),
          isSignInFlow: z.boolean(),
          signInCredentialsType: SignInCredentialsTypeSchema,
          mustCompleteSignUpInfo: z.boolean(),
        }),
      },
    },
    signUp: {
      method: 'POST',
      path: '/signup',
      body: z.object({
        mobilePhoneNumber: z.string().min(1).trim(),
        verificationCode: z.string().length(4).trim(),
      }),
      responses: {
        200: z.object({
          userId: z.string().uuid(),
          mobilePhoneNumber: z.string(),
        }),
      },
    },
    signIn: {
      method: 'POST',
      path: '/signin',
      body: z.object({
        credentialsType: SignInCredentialsTypeSchema,
        mobilePhoneNumber: z.string().min(1),
        verificationCode: z.string().nullable(),
        password: z.string().nullable(),
      }),
      responses: {
        200: z.object({
          accessToken: z.string(),
          validUntil: z.date(),
          refreshToken: z.string(),
          refreshTokenValidUntil: z.date(),
        }),
      },
    },
  },
  {
    pathPrefix: '/users',
  },
);
