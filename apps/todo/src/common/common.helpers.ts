import { cx } from 'class-variance-authority';
import { getSession } from '@users/users.helpers';
import { ThemeType } from '@common/common.types';
import { DEFAULT_THEME } from '@common/common.constants';

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
