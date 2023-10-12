import { cx } from 'class-variance-authority';

export const nextRoutes = {
  getHome: () => '/',
  getLogin: () => '/login',
  getSignUp: () => '/signup',
  getTodos: () => '/todos',
  getSecretTodos: () => '/todos/secret',
  getCreateTodo: () => '/todos/create',
  getTodosApi: () => '/api/todos',
};

export const cn = cx;
