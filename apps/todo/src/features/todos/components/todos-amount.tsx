'use client';

import { useReadTodos } from '@todos/hooks/use-read-todos';

export const TodosAmount = () => {
  const { data: todos } = useReadTodos();

  return <div>There is a total of {todos?.length}</div>;
};
