import { USER_AUTHORIZATIONS } from '@users/users.constants';
import { UserRole } from '@users/users.types';

export const authMutationKeys = {
  getAuthFlow: () => ['auth-flow'],
};

export const isUserAuthorized = (minimumUserRole: UserRole, currentUserRole: UserRole | undefined): boolean =>
  currentUserRole ? USER_AUTHORIZATIONS[minimumUserRole].includes(currentUserRole) : false;
