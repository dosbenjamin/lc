import { cx } from 'class-variance-authority';

export const nextRoutes = {
  getHome: () => '/',
  getLogin: () => '/login',
  getSignUp: () => '/signup',
  getTodos: () => '/todos',
};

export const cn = cx;
