'use client';

import { isUserAuthorized } from '@users/users.helpers';
import { UserRole } from '@users/users.types';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@common/components/ui/tooltip';
import { useSession } from 'next-auth/react';
import { ReactNode } from 'react';

type UserAuthorizationGuardProps = {
  children: (isAuthorized: boolean) => ReactNode;
  minimumRole: UserRole;
};

export const UserAuthorizationGuard = ({ children, minimumRole }: UserAuthorizationGuardProps) => {
  const { data: session } = useSession();

  const isAuthorized = isUserAuthorized(minimumRole, session?.user.role);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>{children(isAuthorized)}</div>
        </TooltipTrigger>
        {isAuthorized ? null : (
          <TooltipContent align="start">
            <p>Unauthorized</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};
