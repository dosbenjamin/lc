'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignUpInfoSchema } from '@auth/auth.schemas';
import { z } from 'zod';
import { apiClient } from '@api';
import { authMutationKeys } from '@auth/auth.helpers';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@common/components/ui/form';
import { Button } from '@common/components/ui/button';
import { Input } from '@common/components/ui/input';
import { useSession } from 'next-auth/react';

export const AuthFlowSignUpInfoForm = () => {
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof SignUpInfoSchema>>({
    resolver: zodResolver(SignUpInfoSchema),
    defaultValues: {
      userId: session?.user.id,
    },
  });

  const { mutateAsync: signUpInfo, isLoading: isSigningUpInfo } = apiClient.auth.signUpInfo.useMutation({
    mutationKey: authMutationKeys.getAuthFlow(),
  });

  const handleSignUpInfo = form.handleSubmit(async (values) => {
    await signUpInfo({
      body: values,
      params: { userId: values.userId },
    });
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSignUpInfo}>
        <h1 className="text-3xl">Enter your personal informations</h1>
        <FormField
          control={form.control}
          name="firstname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Firstname</FormLabel>
              <FormControl>
                <Input placeholder="Firstname" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lastname</FormLabel>
              <FormControl>
                <Input placeholder="Lastname" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="emailAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email address</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Email address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant="secondary">{isSigningUpInfo ? 'Loading' : 'Submit'}</Button>
      </form>
    </Form>
  );
};
