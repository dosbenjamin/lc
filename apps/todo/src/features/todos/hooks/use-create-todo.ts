import { nextRoutes } from '@common/common.helpers';
import { useMutation } from '@tanstack/react-query';
import { CreateTodoSchema } from '@todos/todos.schemas';
import { z } from 'zod';

export const useCreateTodo = () =>
  useMutation({
    mutationFn: async (values: z.infer<typeof CreateTodoSchema>) =>
      fetch(nextRoutes.todosApi(), {
        method: 'POST',
        body: JSON.stringify(values),
      }).then((response) => response.json()),
  });
