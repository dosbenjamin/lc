import { IS_SERVER } from '@common/common.constants';
import { authOptions } from '@users/auth.options';
import { USER_AUTHORIZATIONS } from '@users/users.constants';
import { UserRole } from '@users/users.types';
import type { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import { notFound, redirect } from 'next/navigation';

export const authMutationKeys = {
  authFlow: () => ['auth-flow'],
};

export const isUserAuthorized = (role: UserRole, currentUserRole: UserRole | undefined): boolean =>
  currentUserRole ? USER_AUTHORIZATIONS[role].includes(currentUserRole) : false;

export const getSession = (): Promise<Session | null> =>
  IS_SERVER
    ? import('next-auth').then(({ getServerSession }) => getServerSession(authOptions))
    : import('next-auth/react').then(({ getSession }) => getSession());

export const isAuthenticated = async (): Promise<boolean> => !!(await getSession());

export const redirectIfAuthentificated = async (url: string): Promise<void> => {
  const session = await getSession();
  session && redirect(url);
};

export const userAuthorizationGuard = async (role: UserRole): Promise<void> => {
  const session = await getSession();
  !isUserAuthorized(role, session?.user.role) && notFound();
};

export const isTokenValid = async (): Promise<boolean> => {
  const session = await getSession();
  return !!(session?.accessTokenValidUntil && Date.parse(session.accessTokenValidUntil) > Date.now());
};

// Don't work server-side
export const refreshToken = signOut;
