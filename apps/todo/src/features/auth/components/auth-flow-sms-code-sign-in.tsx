'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignInSchema } from '@auth/auth.schemas';
import { z } from 'zod';
import { useAuthFlow } from '@auth/hooks/use-auth-flow';
import { signIn, useSession } from 'next-auth/react';

export const AuthFlowSmsCodeSignIn = () => {
  const { authFlow } = useAuthFlow();

  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      mobilePhoneNumber: authFlow?.mobilePhoneNumber,
      credentialsType: authFlow?.signInCredentialsType,
    },
  });

  const handleSignUp = handleSubmit(async (values) => {
    await signIn('credentials', values);
  });

  const { data } = useSession();
  console.log(data);

  return (
    <form onSubmit={handleSignUp}>
      <input type="text" {...register('verificationCode')} />
      <button>{isSubmitting ? 'Loading' : 'Submit'}</button>
    </form>
  );
};
