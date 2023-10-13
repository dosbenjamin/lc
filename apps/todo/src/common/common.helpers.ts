import { cx } from 'class-variance-authority';
import { getSession } from '@users/users.helpers';
import { ThemeType } from '@common/common.types';
import { DEFAULT_THEME } from '@common/common.constants';
import { cache } from 'react';
import { QueryClient } from '@tanstack/react-query';

export const nextRoutes = {
  home: () => '/',
  login: () => '/login',
  signUp: () => '/signup',
  todos: () => '/todos',
  secretTodos: () => '/todos/secret',
  createTodo: () => '/todos/create',
  todosApi: () => '/api/todos',
};

export const cn = cx;

export const getTheme = async (): Promise<ThemeType> => (await getSession())?.user.theme ?? DEFAULT_THEME;

export const getQueryClient = cache(() => new QueryClient());

export const failAndRetryAsync = async <Fn extends () => Promise<void>>(promise: Fn, retries = 5): Promise<void> => {
  return retries === 0 ? Promise.reject() : promise().catch(() => failAndRetryAsync(promise, retries - 1));
};
