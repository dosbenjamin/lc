import { AUTH_CREDENTIALS_PROVIDER_SIGN_IN_ID } from '@users/users.constants';
import { authMutationKeys } from '@users/users.helpers';
import { SignInSchema } from '@users/users.schemas';
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
