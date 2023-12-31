'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignInSchema } from '@users/users.schemas';
import { z } from 'zod';
import { useAuthFlow } from '@users/hooks/use-auth-flow';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@common/components/ui/form';
import { Button } from '@common/components/ui/button';
import { Input } from '@common/components/ui/input';
import { useSignIn } from '@users/hooks/use-sign-in';

export const AuthFlowSmsCodeSignInForm = () => {
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
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl">Enter your confirmation code</h1>
          <p className="text-sm">
            Please insert the 4 digit code we have sent to your number:{' '}
            <strong className="font-medium">{authFlow?.mobilePhoneNumber}</strong>
          </p>
        </div>
        <FormField
          control={form.control}
          name="verificationCode"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Confirmation code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button>{isSigningIn ? 'Loading' : 'Submit'}</Button>
      </form>
    </Form>
  );
};
