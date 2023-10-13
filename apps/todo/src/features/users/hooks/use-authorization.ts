import { isUserAuthorized } from '@users/users.helpers';
import { UserRole } from '@users/users.types';
import { useSession } from 'next-auth/react';

export const useAuthorization = () => {
  const { data: session } = useSession();

  return (minimumRole: UserRole) => isUserAuthorized(minimumRole, session?.user.role);
};
