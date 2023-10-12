'use client';

import { useSignOut } from '@users/hooks/use-sign-out';

export const SignOutButton = () => {
  const { mutateAsync: signOut } = useSignOut();

  return (
    <button className="opacity-50 hover:opacity-100 transition-opacity" onClick={() => signOut()}>
      Sign Out
    </button>
  );
};
