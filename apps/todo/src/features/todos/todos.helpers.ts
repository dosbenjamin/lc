import { inMemoryTodos } from '@todos/todos.data';

export const queryKeys = {
  readTodos: () => ['todos'],
};

export const getTodos = () => Array.from(inMemoryTodos.values()).filter(({ isSecret }) => !isSecret);
export const getSecretTodos = () => Array.from(inMemoryTodos.values()).filter(({ isSecret }) => isSecret);
