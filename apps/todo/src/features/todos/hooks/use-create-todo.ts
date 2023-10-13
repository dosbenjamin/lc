import { nextRoutes } from '@common/common.helpers';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { todosQueryKeys } from '@todos/todos.helpers';
import { CreateTodoSchema } from '@todos/todos.schemas';
import { Todo } from '@todos/todos.types';
import { z } from 'zod';

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation<Todo[], unknown, z.infer<typeof CreateTodoSchema>>({
    mutationFn: async (values) =>
      fetch(nextRoutes.todosApi(), {
        method: 'POST',
        body: JSON.stringify(values),
      }).then((response) => response.json()),
    onSuccess: (data) => queryClient.setQueryData(todosQueryKeys.readTodos(), data),
  });
};
