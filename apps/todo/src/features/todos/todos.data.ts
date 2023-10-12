import { Todo } from '@todos/todos.types';

export const inMemoryTodos = new Map<ReturnType<typeof crypto.randomUUID>, Todo>();
