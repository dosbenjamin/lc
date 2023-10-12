import { useMutation } from '@tanstack/react-query';
import { signOut } from 'next-auth/react';

export const useSignOut = () => useMutation({ mutationFn: () => signOut() });
