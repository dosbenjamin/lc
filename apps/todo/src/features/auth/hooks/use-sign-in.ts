import { AUTH_CREDENTIALS_PROVIDER_SIGN_IN_ID } from '@auth/auth.constants';
import { authMutationKeys } from '@auth/auth.helpers';
import { SignInSchema } from '@auth/auth.schemas';
import { useMutation } from '@tanstack/react-query';
import { SignInResponse, signIn } from 'next-auth/react';
import { z } from 'zod';

export const useSignIn = () =>
  useMutation<SignInResponse | undefined, unknown, z.infer<typeof SignInSchema>>({
    mutationKey: authMutationKeys.getAuthFlow(),
    mutationFn: async (credentials) =>
      await signIn(AUTH_CREDENTIALS_PROVIDER_SIGN_IN_ID, {
        redirect: false,
        ...credentials,
      }),
  });
