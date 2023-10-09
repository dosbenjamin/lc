'use client';

import { authContract } from '@auth/auth.contract';
import { authMutationKeys } from '@auth/auth.helpers';
import { AuthFlow, AuthFlowStepType, AuthFlowType, SignInCredentialsType } from '@auth/auth.types';
import { AuthFlowContext } from '@auth/contexts/auth-flow-context';
import { useQueryClient } from '@tanstack/react-query';
import type { ClientInferResponseBody } from '@ts-rest/core';
import { type PropsWithChildren, useEffect, useMemo, useState } from 'react';

type AuthFlowProviderProps = PropsWithChildren;

const authFlowDispatcher: [
  (authInit: ClientInferResponseBody<typeof authContract.init, 200>) => boolean,
  AuthFlowType,
][] = [
  [({ isSignUpFlow }) => isSignUpFlow, AuthFlowType.SignUp],
  [
    ({ isSignInFlow, signInCredentialsType }) =>
      isSignInFlow && signInCredentialsType === SignInCredentialsType.SmsCode,
    AuthFlowType.SmsCodeSignIn,
  ],
  [
    ({ isSignInFlow, signInCredentialsType }) =>
      isSignInFlow && signInCredentialsType === SignInCredentialsType.Password,
    AuthFlowType.PasswordSignIn,
  ],
];

export const AuthFlowProvider = ({ children }: AuthFlowProviderProps) => {
  const [authFlow, setAuthFlow] = useState<AuthFlow>();
  const [authFlowStepType, setAuthFlowStepType] = useState<AuthFlowStepType>();

  const queryClient = useQueryClient();

  const authFlowSteps = useMemo<Record<AuthFlowType, AuthFlowStepType[]>>(
    () => ({
      [AuthFlowType.SignUp]: [AuthFlowStepType.SignUp, AuthFlowStepType.SignUpInfo],
      [AuthFlowType.SmsCodeSignIn]: [
        AuthFlowStepType.SmsCodeSignIn,
        ...(authFlow?.mustCompleteSignUpInfo ? [AuthFlowStepType.SignUpInfo] : []),
      ],
      [AuthFlowType.PasswordSignIn]: [AuthFlowStepType.PasswordSignIn],
    }),
    [authFlow],
  );

  const initAuthFlow = (authInit: ClientInferResponseBody<typeof authContract.init, 200>): void => {
    const flowType = authFlowDispatcher.find(([predicate]) => predicate(authInit));
    setAuthFlow({ type: flowType?.[1], ...authInit });
  };

  if (!authFlowStepType && authFlow?.type) {
    const currentAuthFlow = authFlowSteps[authFlow.type];
    setAuthFlowStepType(currentAuthFlow[0]);
  }

  useEffect(() => {
    if (!authFlow?.type) return;

    const currentAuthFlow = authFlowSteps[authFlow.type];
    const mutationCache = queryClient.getMutationCache();

    const unsubscribe = mutationCache.subscribe(({ mutation }) => {
      const isAuthFlowMutation = mutation?.options.mutationKey?.toString() === authMutationKeys.getAuth().toString();
      const isAuthFlowMutationSuccess = mutation?.state.status === 'success';

      if (!isAuthFlowMutation || !isAuthFlowMutationSuccess || !authFlowStepType) return;

      const currentAuthFlowStepIndex = currentAuthFlow.indexOf(authFlowStepType);
      const currentAuthFlowStepType = currentAuthFlow[currentAuthFlowStepIndex + 1];
      currentAuthFlowStepType ? setAuthFlowStepType(currentAuthFlowStepType) : console.log('completed');
    });

    return () => unsubscribe();
  }, [queryClient, authFlow, authFlowSteps, authFlowStepType]);

  return (
    <AuthFlowContext.Provider value={{ authFlowStepType, authFlow, initAuthFlow }}>{children}</AuthFlowContext.Provider>
  );
};
