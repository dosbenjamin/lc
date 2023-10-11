import { cx } from 'class-variance-authority';

export const nextRoutes = {
  getHome: () => '/',
  getLogin: () => '/login',
  getSignUp: () => '/signup',
  getDashboard: () => '/dashboard',
};

export const cn = cx;
