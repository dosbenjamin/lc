'use client';

import { SessionProvider as Provider } from 'next-auth/react';
import { PropsWithChildren } from 'react';

type SessionProviderProps = PropsWithChildren;

export const SessionProvider = ({ children }: SessionProviderProps) => <Provider>{children}</Provider>;
