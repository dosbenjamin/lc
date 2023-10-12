'use client';

import { QueryClientProvider as Provider, QueryClient } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';

type QueryClientProviderProps = PropsWithChildren;

const queryClient = new QueryClient();

export const QueryClientProvider = ({ children }: QueryClientProviderProps) => (
  <Provider client={queryClient}>{children}</Provider>
);
