'use client';

import { authContract } from '@auth/auth.contract';
import { AuthFlow, AuthFlowStepType } from '@auth/auth.types';
import { ClientInferResponseBody } from '@ts-rest/core';
import { createContext } from 'react';

type AuthFlowContext = {
  authFlow: AuthFlow | undefined;
  authFlowStepType: AuthFlowStepType | undefined;
  initAuthFlow: (authInit: ClientInferResponseBody<typeof authContract.init, 200>) => void;
};

export const AuthFlowContext = createContext<AuthFlowContext | null>(null);
