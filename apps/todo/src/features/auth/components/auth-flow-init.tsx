'use client';

import { apiClient } from '@api';
import { AccessSchema } from '@auth/auth.schemas';
import { useAuthFlow } from '@auth/hooks/use-auth-flow';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const AuthFlowInit = () => {
  const { initAuthFlow } = useAuthFlow();

  const { handleSubmit, register } = useForm<z.infer<typeof AccessSchema>>({
    resolver: zodResolver(AccessSchema),
  });

  const { mutateAsync, isLoading } = apiClient.auth.init.useMutation({
    onSuccess: ({ body }) => initAuthFlow(body),
  });

  const handleAuthFlowInit = handleSubmit(async (values) => {
    await mutateAsync({ body: values });
  });

  return (
    <form onSubmit={handleAuthFlowInit}>
      <input
        type="tel"
        {...register('mobilePhoneNumber', {
          required: true,
        })}
      />
      <button>{isLoading ? 'loading' : 'Submit'}</button>
    </form>
  );
};
