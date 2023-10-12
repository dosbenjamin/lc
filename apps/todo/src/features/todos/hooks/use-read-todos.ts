import { nextRoutes } from '@common/common.helpers';
import { useQuery } from '@tanstack/react-query';

export const useReadTodos = () =>
  useQuery({
    queryFn: () =>
      fetch(nextRoutes.getTodosApi(), {
        method: 'GET',
      }).then((response) => response.json()),
  });
