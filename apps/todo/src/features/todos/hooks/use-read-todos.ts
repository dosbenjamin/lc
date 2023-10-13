import { nextRoutes } from '@common/common.helpers';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@todos/todos.helpers';

export const useReadTodos = () =>
  useQuery({
    queryKey: queryKeys.readTodos(),
    queryFn: () =>
      fetch(nextRoutes.todosApi(), {
        method: 'GET',
      }).then((response) => response.json()),
  });
