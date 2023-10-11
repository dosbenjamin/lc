import { AUTH_CREDENTIALS_PROVIDER_SIGN_UP_ID } from '@auth/auth.constants';
import { authMutationKeys } from '@auth/auth.helpers';
import { SignUpSchema } from '@auth/auth.schemas';
import { useMutation } from '@tanstack/react-query';
import { SignInResponse, signIn } from 'next-auth/react';
import { z } from 'zod';

export const useSignUp = () =>
  useMutation<SignInResponse | undefined, unknown, z.infer<typeof SignUpSchema>>({
    mutationKey: authMutationKeys.getAuthFlow(),
    mutationFn: async (credentials) =>
      await signIn(AUTH_CREDENTIALS_PROVIDER_SIGN_UP_ID, {
        redirect: false,
        ...credentials,
      }),
  });
