import { AUTH_CREDENTIALS_PROVIDER_SIGN_UP_ID } from '@users/users.constants';
import { authMutationKeys } from '@users/users.helpers';
import { SignUpSchema } from '@users/users.schemas';
import { useMutation } from '@tanstack/react-query';
import { SignInResponse, signIn } from 'next-auth/react';
import { z } from 'zod';

export const useSignUp = () =>
  useMutation<SignInResponse | undefined, unknown, z.infer<typeof SignUpSchema>>({
    mutationKey: authMutationKeys.authFlow(),
    mutationFn: async (credentials) =>
      await signIn(AUTH_CREDENTIALS_PROVIDER_SIGN_UP_ID, {
        redirect: false,
        ...credentials,
      }),
  });
