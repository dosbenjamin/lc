import { UserRole } from '@users/users.types';

export const AUTH_CREDENTIALS_PROVIDER_SIGN_IN_ID = 'sign-in-credentials';
export const AUTH_CREDENTIALS_PROVIDER_SIGN_UP_ID = 'sign-up-credentials';

export const USER_FAKE_PASSWORD = 'Certinergie@2023';

export const DEFAULT_USER_ROLE = UserRole.Basic;
export const USER_ROLES = Object.values(UserRole);

export const USER_AUTHORIZATIONS: Record<UserRole, UserRole[]> = {
  Basic: [UserRole.Basic, UserRole.Moderator, UserRole.Admin],
  Moderator: [UserRole.Moderator, UserRole.Admin],
  Admin: [UserRole.Admin],
};

export const REFRESH_TOKEN_MAX_RETRIES = 5;
