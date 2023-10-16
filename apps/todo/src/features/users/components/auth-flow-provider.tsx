'use client';

import { authMutationKeys } from '@users/users.helpers';
import { AuthFlow, AuthFlowFormType, AuthFlowType, SignInCredentialsType } from '@users/users.types';
import { AuthFlowContext } from '@users/contexts/auth-flow-context';
import { Mutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { type PropsWithChildren, useEffect, useState, useCallback } from 'react';
import { nextRoutes } from '@common/common.helpers';

type AuthFlowProviderProps = PropsWithChildren;

type AuthFlowFormTypeDescriptor = {
  type: AuthFlowFormType;
  shouldEnableForm?: (authFlow: AuthFlow) => boolean;
};

type AuthFlowTypeDescriptor = {
  determinateAuthFlowType: (authFlow: AuthFlow) => boolean;
  type: AuthFlowType;
  forms: AuthFlowFormTypeDescriptor[];
};

const authFlowDispatcher: AuthFlowTypeDescriptor[] = [
  {
    determinateAuthFlowType: ({ isSignUpFlow }) => !!isSignUpFlow,
    type: AuthFlowType.SignUp,
    forms: [
      {
        type: AuthFlowFormType.AuthInit,
      },
      {
        type: AuthFlowFormType.SignUp,
      },
      {
        type: AuthFlowFormType.SignUpInfo,
      },
    ],
  },
  {
    determinateAuthFlowType: ({ isSignInFlow, signInCredentialsType }) =>
      !!isSignInFlow && signInCredentialsType === SignInCredentialsType.SmsCode,
    type: AuthFlowType.SmsCodeSignIn,
    forms: [
      {
        type: AuthFlowFormType.AuthInit,
      },
      {
        type: AuthFlowFormType.SmsCodeSignIn,
      },
      {
        type: AuthFlowFormType.SignUpInfo,
        shouldEnableForm: ({ mustCompleteSignUpInfo }) => !!mustCompleteSignUpInfo,
      },
    ],
  },
  {
    determinateAuthFlowType: ({ isSignInFlow, signInCredentialsType }) =>
      !!isSignInFlow && signInCredentialsType === SignInCredentialsType.Password,
    type: AuthFlowType.PasswordSignIn,
    forms: [
      {
        type: AuthFlowFormType.AuthInit,
      },
      {
        type: AuthFlowFormType.PasswordSignIn,
      },
    ],
  },
];

const isAuthFlowInitMutationSucceded = (mutation: Mutation | undefined): boolean =>
  mutation?.options.mutationKey?.toString() === authMutationKeys.authFlowInit().toString() &&
  mutation?.state.status === 'success';

const isAuthFlowMutationSucceded = (mutation: Mutation | undefined): boolean =>
  mutation?.options.mutationKey?.toString() === authMutationKeys.authFlow().toString() &&
  mutation?.state.status === 'success';

export const AuthFlowProvider = ({ children }: AuthFlowProviderProps) => {
  const router = useRouter();

  const [authFlow, setAuthFlow] = useState<AuthFlow>({
    formType: AuthFlowFormType.AuthInit,
  });

  const queryClient = useQueryClient();
  const mutationCache = queryClient.getMutationCache();

  const getAuthFlowForms = (authFlow: AuthFlow) => {
    return authFlowDispatcher
      .find(({ determinateAuthFlowType }) => determinateAuthFlowType(authFlow))
      ?.forms.filter(({ shouldEnableForm }) => !shouldEnableForm || shouldEnableForm(authFlow))!;
  };

  useEffect(() => {
    const unsubscribe = mutationCache.subscribe(({ mutation }) => {
      if (!isAuthFlowInitMutationSucceded(mutation)) return;

      const [, nextAuthFlowForm] = getAuthFlowForms(mutation?.state.data.body);

      setAuthFlow((authFlow) => ({
        ...mutation?.state.data.body,
        ...authFlow,
        type: authFlow.type,
        formType: nextAuthFlowForm.type,
      }));

      unsubscribe();
    });

    return () => unsubscribe();
  }, [mutationCache]);

  useEffect(() => {
    const unsubscribe = mutationCache.subscribe(({ mutation }) => {
      if (!isAuthFlowMutationSucceded(mutation)) return;

      const currentAuthFlowForms = getAuthFlowForms(authFlow);
      const currentAuthFlowFormIndex = currentAuthFlowForms.findIndex(({ type }) => type === authFlow.formType);

      const nextAuthFlowFormIndex = currentAuthFlowFormIndex + 1;
      const nextAuthFlowForm = currentAuthFlowForms[nextAuthFlowFormIndex];
      const isLast = nextAuthFlowFormIndex === currentAuthFlowForms.length;

      isLast
        ? router.push(nextRoutes.todos())
        : setAuthFlow((authFlow) => ({ ...authFlow, formType: nextAuthFlowForm?.type }));
    });

    return () => unsubscribe();
  }, [router, authFlow, mutationCache]);

  return <AuthFlowContext.Provider value={{ authFlow }}>{children}</AuthFlowContext.Provider>;
};
