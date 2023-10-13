import { nextRoutes } from '@common/common.helpers';
import { useQuery } from '@tanstack/react-query';
import { todosQueryKeys } from '@todos/todos.helpers';
import type { Todo } from '@todos/todos.types';

export const useReadTodos = () =>
  useQuery<Todo[]>({
    queryKey: todosQueryKeys.readTodos(),
    queryFn: () =>
      fetch(nextRoutes.todosApi(), {
        method: 'GET',
      }).then((response) => response.json()),
    staleTime: Infinity,
  });
