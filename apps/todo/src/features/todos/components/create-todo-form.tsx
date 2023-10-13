'use client';

import { UserAuthorizationGuard } from '@users/components/user-authorization-guard.client';
import { nextRoutes } from '@common/common.helpers';
import { Button } from '@common/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@common/components/ui/form';
import { Input } from '@common/components/ui/input';
import { Switch } from '@common/components/ui/switch';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateTodo } from '@todos/hooks/use-create-todo';
import { CreateTodoSchema } from '@todos/todos.schemas';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { UserRole } from '@users/users.types';

export const CreateTodoForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof CreateTodoSchema>>({
    defaultValues: {
      isCompleted: false,
      isSecret: false,
    },
    resolver: zodResolver(CreateTodoSchema),
  });

  const { mutateAsync: createTodo, isLoading: isCreatingTodo } = useCreateTodo();

  const handleCreateTodo = form.handleSubmit(async (values) => {
    await createTodo(values);
    router.push(nextRoutes.getTodos());
    router.refresh();
  });

  return (
    <Form {...form}>
      <form onSubmit={handleCreateTodo} className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="task"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task</FormLabel>
              <FormControl>
                <Input placeholder="Task description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isSecret"
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <FormLabel>Secret</FormLabel>
              <FormControl>
                <UserAuthorizationGuard role={UserRole.Admin}>
                  {(isAuthorized) => (
                    <Switch checked={field.value} onCheckedChange={field.onChange} disabled={!isAuthorized} />
                  )}
                </UserAuthorizationGuard>
              </FormControl>
              <FormMessage />
            </div>
          )}
        />
        <Button>{isCreatingTodo ? 'Loading' : 'Create'}</Button>
      </form>
    </Form>
  );
};
