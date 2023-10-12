'use client';

import { authContract } from '@users/users.contract';
import { authMutationKeys } from '@users/users.helpers';
import { AuthFlow, AuthFlowFormType, AuthFlowType, SignInCredentialsType } from '@users/users.types';
import { AuthFlowContext } from '@users/contexts/auth-flow-context';
import { nextRoutes } from '@common/common.helpers';
import { Mutation, useQueryClient } from '@tanstack/react-query';
import type { ClientInferResponseBody } from '@ts-rest/core';
import { useRouter } from 'next/navigation';
import { type PropsWithChildren, useEffect, useMemo, useState, useCallback } from 'react';

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

const isAuthMutationSucceded = (mutation: Mutation | undefined) =>
  mutation?.options.mutationKey?.toString() === authMutationKeys.getAuthFlow().toString() &&
  mutation?.state.status === 'success';

export const AuthFlowProvider = ({ children }: AuthFlowProviderProps) => {
  const router = useRouter();

  const [authFlow, setAuthFlow] = useState<AuthFlow>({
    formType: AuthFlowFormType.AuthInit,
  });

  const queryClient = useQueryClient();
  const mutationCache = queryClient.getMutationCache();

  const authFlowForms = useMemo<Record<AuthFlowType, AuthFlowFormType[]>>(
    () => ({
      [AuthFlowType.SignUp]: [AuthFlowFormType.AuthInit, AuthFlowFormType.SignUp, AuthFlowFormType.SignUpInfo],
      [AuthFlowType.SmsCodeSignIn]: [
        AuthFlowFormType.AuthInit,
        AuthFlowFormType.SmsCodeSignIn,
        ...(authFlow?.mustCompleteSignUpInfo ? [AuthFlowFormType.SignUpInfo] : []),
      ],
      [AuthFlowType.PasswordSignIn]: [AuthFlowFormType.AuthInit, AuthFlowFormType.PasswordSignIn],
    }),
    [authFlow],
  );

  const getNextAuthFlowFormType = useCallback(
    (authFlow: AuthFlow) => {
      if (!authFlow.type) return;

      const currentAuthFlow = authFlowForms[authFlow.type];
      const currentAuthFlowFormIndex = currentAuthFlow.indexOf(authFlow.formType);
      const nextAuthFlowFormIndex = currentAuthFlowFormIndex + 1;

      return {
        type: currentAuthFlow[nextAuthFlowFormIndex],
        isLast: currentAuthFlow.length === nextAuthFlowFormIndex,
      };
    },
    [authFlowForms],
  );

  const initAuthFlow = (authInit: ClientInferResponseBody<typeof authContract.init, 200>): void => {
    const flowType = authFlowDispatcher.find(([predicate]) => predicate(authInit));

    const nextAuthFlow = { ...authFlow, ...authInit, type: flowType?.[1] };
    const nextAuthFlowFormType = getNextAuthFlowFormType(nextAuthFlow)?.type;

    setAuthFlow({ ...nextAuthFlow, formType: nextAuthFlowFormType ?? nextAuthFlow.formType });
  };

  useEffect(() => {
    const unsubscribe = mutationCache.subscribe(({ mutation }) => {
      const nextAuthFlowForm = getNextAuthFlowFormType(authFlow);

      if (!isAuthMutationSucceded(mutation) || !nextAuthFlowForm) return;

      nextAuthFlowForm?.isLast
        ? router.push(nextRoutes.getTodos())
        : setAuthFlow((authFlow) => ({ ...authFlow, formType: nextAuthFlowForm?.type }));
    });

    return () => unsubscribe();
  }, [router, authFlow, mutationCache, getNextAuthFlowFormType]);

  return <AuthFlowContext.Provider value={{ authFlow, initAuthFlow }}>{children}</AuthFlowContext.Provider>;
};
