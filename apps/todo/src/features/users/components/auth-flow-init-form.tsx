'use client';

import { apiClient } from '@api';
import { authMutationKeys } from '@users/users.helpers';
import { AuthInitSchema } from '@users/users.schemas';
import { useAuthFlow } from '@users/hooks/use-auth-flow';
import { Button } from '@common/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@common/components/ui/form';
import { Input } from '@common/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const AuthFlowInitForm = () => {
  const { initAuthFlow } = useAuthFlow();

  const form = useForm<z.infer<typeof AuthInitSchema>>({
    resolver: zodResolver(AuthInitSchema),
  });

  const { mutateAsync: initAuth, isLoading: isInitializingAuth } = apiClient.auth.init.useMutation({
    mutationKey: authMutationKeys.getAuthFlow(),
    onSuccess: ({ body }) => initAuthFlow(body),
  });

  const handleAuthFlowInit = form.handleSubmit(async (values) => {
    await initAuth({ body: values });
  });

  return (
    <Form {...form}>
      <form onSubmit={handleAuthFlowInit}>
        <h1 className="text-3xl">Enter your phone number</h1>
        <FormField
          control={form.control}
          name="mobilePhoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone number</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="Phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button>{isInitializingAuth ? 'Loading' : 'Submit'}</Button>
      </form>
    </Form>
  );
};
