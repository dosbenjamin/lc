import { IS_SERVER } from '@common/common.constants';
import { authOptions } from '@users/auth.options';
import { USER_AUTHORIZATIONS } from '@users/users.constants';
import { UserRole } from '@users/users.types';
import type { Session } from 'next-auth';
import { redirect } from 'next/navigation';

export const authMutationKeys = {
  getAuthFlow: () => ['auth-flow'],
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
