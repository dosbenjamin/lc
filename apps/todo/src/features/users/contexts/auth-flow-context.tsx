'use client';

import { authContract } from '@users/users.contract';
import { AuthFlow } from '@users/users.types';
import { ClientInferResponseBody } from '@ts-rest/core';
import { createContext } from 'react';

type AuthFlowContext = {
  authFlow: AuthFlow;
  initAuthFlow: (authInit: ClientInferResponseBody<typeof authContract.init, 200>) => void;
};

export const AuthFlowContext = createContext<AuthFlowContext | null>(null);
