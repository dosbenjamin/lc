'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignUpSchema } from '@auth/auth.schemas';
import { z } from 'zod';
import { useAuthFlow } from '@auth/hooks/use-auth-flow';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@common/components/ui/form';
import { Button } from '@common/components/ui/button';
import { Input } from '@common/components/ui/input';
import { useSignUp } from '@auth/hooks/use-sign-up';

export const AuthFlowSignUpForm = () => {
  const { authFlow } = useAuthFlow();

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      mobilePhoneNumber: authFlow?.mobilePhoneNumber,
    },
  });

  const { mutateAsync: signUp, isLoading: isSigningUp } = useSignUp();
  const handleSignUp = form.handleSubmit(async (values) => signUp(values));

  return (
    <Form {...form}>
      <form onSubmit={handleSignUp}>
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
        <Button>{isSigningUp ? 'Loading' : 'Submit'}</Button>
      </form>
    </Form>
  );
};
