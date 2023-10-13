import { authOptions } from '@users/auth.options';
import { USER_AUTHORIZATIONS } from '@users/users.constants';
import { UserRole } from '@users/users.types';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export const authMutationKeys = {
  getAuthFlow: () => ['auth-flow'],
};

export const isUserAuthorized = (minimumUserRole: UserRole, currentUserRole: UserRole | undefined): boolean =>
  currentUserRole ? USER_AUTHORIZATIONS[minimumUserRole].includes(currentUserRole) : false;

export const redirectIfAuthentificated = async (url: string): Promise<void> => {
  const session = await getServerSession(authOptions);
  session && redirect(url);
};
