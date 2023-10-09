'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignUpSchema } from '@auth/auth.schemas';
import { z } from 'zod';
import { apiClient } from '@api';
import { useAuthFlow } from '@auth/hooks/use-auth-flow';
import { authMutationKeys } from '@auth/auth.helpers';

export const AuthFlowSignUp = () => {
  const { authFlow } = useAuthFlow();

  const { handleSubmit, register } = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      mobilePhoneNumber: authFlow?.mobilePhoneNumber,
    },
  });

  const { mutateAsync, isLoading } = apiClient.auth.signUp.useMutation({
    mutationKey: authMutationKeys.getAuth(),
  });

  const handleSignUp = handleSubmit(async (values) => {
    await mutateAsync({ body: values });
  });

  return (
    <form onSubmit={handleSignUp}>
      <input type="text" {...register('verificationCode')} />
      <button>{isLoading ? 'Loading' : 'Submit'}</button>
    </form>
  );
};
