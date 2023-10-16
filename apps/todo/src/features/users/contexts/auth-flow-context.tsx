'use client';

import { AuthFlow } from '@users/users.types';
import { createContext } from 'react';

type AuthFlowContext = {
  authFlow: AuthFlow;
};

export const AuthFlowContext = createContext<AuthFlowContext | null>(null);
