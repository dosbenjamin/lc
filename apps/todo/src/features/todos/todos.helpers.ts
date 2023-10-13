import { inMemoryTodos } from '@todos/todos.data';

export const todosQueryKeys = {
  readTodos: () => ['todos'],
};

export const getAllTodos = () => Array.from(inMemoryTodos.values());
export const getTodos = () => getAllTodos().filter(({ isSecret }) => !isSecret);
export const getSecretTodos = () => getAllTodos().filter(({ isSecret }) => isSecret);
