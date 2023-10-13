import {
  AuthInitSchema,
  SetPasswordSchema,
  SignInCredentialsTypeSchema,
  SignInSchema,
  SignUpInfoSchema,
  SignUpSchema,
} from '@users/users.schemas';
import { ProblemDetails } from '@common/common.types';
import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const contract = initContract();

export const usersContract = contract.router(
  {
    initAuth: {
      method: 'POST',
      path: '/access',
      body: AuthInitSchema,
      responses: {
        200: z.object({
          mobilePhoneNumber: z.string(),
          isSignUpFlow: z.boolean(),
          isSignInFlow: z.boolean(),
          signInCredentialsType: SignInCredentialsTypeSchema,
          mustCompleteSignUpInfo: z.boolean(),
        }),
        400: contract.type<ProblemDetails<z.infer<typeof AuthInitSchema>>>(),
      },
    },
    signUp: {
      method: 'POST',
      path: '/signup',
      body: SignUpSchema,
      responses: {
        200: z.object({
          userId: z.string().uuid(),
          mobilePhoneNumber: z.string(),
        }),
        400: contract.type<ProblemDetails<z.infer<typeof SignUpSchema>>>(),
      },
    },
    signUpInfo: {
      method: 'PUT',
      path: '/:userId/signup',
      body: SignUpInfoSchema,
      pathParams: z.object({
        userId: z.string().min(1).uuid(),
      }),
      responses: {
        400: contract.type<ProblemDetails<z.infer<typeof SignUpInfoSchema>>>(),
      },
    },
    signIn: {
      method: 'POST',
      path: '/signin',
      body: SignInSchema,
      responses: {
        200: z.object({
          accessToken: z.string(),
          accessTokenValidUntil: z.string().datetime(),
          refreshToken: z.string(),
          refreshTokenValidUntil: z.string().datetime(),
        }),
        400: contract.type<ProblemDetails<z.infer<typeof SignInSchema>>>(),
      },
    },
    setPassword: {
      method: 'PUT',
      path: '/:userId/password',
      body: SetPasswordSchema,
      pathParams: z.object({
        userId: z.string().min(1).uuid(),
      }),
      responses: {
        400: contract.type<ProblemDetails<z.infer<typeof SetPasswordSchema>>>(),
      },
    },
  },
  {
    pathPrefix: '/users',
  },
);
