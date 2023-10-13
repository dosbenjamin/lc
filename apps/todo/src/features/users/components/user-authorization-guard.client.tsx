'use client';

import { UserRole } from '@users/users.types';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@common/components/ui/tooltip';
import { ReactNode } from 'react';
import { useAuthorization } from '@users/hooks/use-authorization';

type UserAuthorizationGuardProps = {
  children: (isAuthorized: boolean) => ReactNode;
  role: UserRole;
};

export const UserAuthorizationGuard = ({ children, role }: UserAuthorizationGuardProps) => {
  const isUserAuthorized = useAuthorization();
  const isAuthorized = isUserAuthorized(role);

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
