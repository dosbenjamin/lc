'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignInSchema } from '@auth/auth.schemas';
import { z } from 'zod';
import { useAuthFlow } from '@auth/hooks/use-auth-flow';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@common/components/ui/form';
import { Button } from '@common/components/ui/button';
import { Input } from '@common/components/ui/input';
import { useSignIn } from '@auth/hooks/use-sign-in';

export const AuthFlowPasswordSignInForm = () => {
  const { authFlow } = useAuthFlow();

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      mobilePhoneNumber: authFlow?.mobilePhoneNumber,
      credentialsType: authFlow?.signInCredentialsType,
    },
  });

  const { mutateAsync: signIn, isLoading: isSigningIn } = useSignIn();
  const handleSignIn = form.handleSubmit((values) => signIn(values));

  return (
    <Form {...form}>
      <form onSubmit={handleSignIn}>
        <h1 className="text-3xl">Enter your password</h1>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant="secondary">{isSigningIn ? 'Loading' : 'Submit'}</Button>
      </form>
    </Form>
  );
};