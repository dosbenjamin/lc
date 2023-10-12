'use client';

import { USER_ROLES } from '@users/users.constants';
import { UserRole } from '@users/users.types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@common/components/ui/select';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export const UserRoleSelect = () => {
  const router = useRouter();
  const { data: session, update: updateSession } = useSession();

  const handleChange = async (value: UserRole) => {
    await updateSession({ userRole: value });
    router.refresh();
  };

  return (
    <Select key={session?.user.role} defaultValue={session?.user.role} onValueChange={handleChange}>
      <SelectTrigger className="max-w-[10rem]">
        <SelectValue placeholder="User Role" />
      </SelectTrigger>
      <SelectContent>
        {USER_ROLES.map((userRole) => (
          <SelectItem key={userRole} value={userRole}>
            {userRole}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
