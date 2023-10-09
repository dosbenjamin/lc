import { AccessSchema, SignInCredentialsTypeSchema, SignInSchema, SignUpSchema } from '@auth/auth.schemas';
import { ProblemDetails } from '@common/common.types';
import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const contract = initContract();

export const authContract = contract.router(
  {
    init: {
      method: 'POST',
      path: '/access',
      body: AccessSchema,
      responses: {
        200: z.object({
          mobilePhoneNumber: z.string(),
          isSignUpFlow: z.boolean(),
          isSignInFlow: z.boolean(),
          signInCredentialsType: SignInCredentialsTypeSchema,
          mustCompleteSignUpInfo: z.boolean(),
        }),
        400: contract.type<ProblemDetails<z.infer<typeof AccessSchema>>>(),
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
    signIn: {
      method: 'POST',
      path: '/signin',
      body: SignInSchema,
      responses: {
        200: z.object({
          accessToken: z.string(),
          validUntil: z.string(),
          refreshToken: z.string(),
          refreshTokenValidUntil: z.string(),
        }),
        400: contract.type<ProblemDetails<z.infer<typeof SignInSchema>>>(),
      },
    },
  },
  {
    pathPrefix: '/users',
  },
);
