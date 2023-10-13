import { UserRole } from '@users/users.types';
import { ReactNode } from 'react';
import { getSession, isUserAuthorized } from '@users/users.helpers';

type UserAuthorizationGuardProps = {
  children: ReactNode;
  role: UserRole;
};

export const UserAuthorizationGuard = async ({ children, role }: UserAuthorizationGuardProps) => {
  const session = await getSession();
  const isAuthorized = isUserAuthorized(role, session?.user.role);

  return <>{isAuthorized ? children : null}</>;
};
