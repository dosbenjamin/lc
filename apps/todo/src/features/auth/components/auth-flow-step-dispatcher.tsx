'use client';

import { AuthFlowStepType } from '@auth/auth.types';
import { AuthFlowInit } from '@auth/components/auth-flow-init';
import { AuthFlowSmsCodeSignIn } from '@auth/components/auth-flow-sms-code-sign-in';
import { AuthFlowSignUp } from '@auth/components/auth-flow-sign-up';
import { useAuthFlow } from '@auth/hooks/use-auth-flow';
import { FC } from 'react';

const authFlowSteps: Record<AuthFlowStepType, FC> = {
  [AuthFlowStepType.SignUp]: AuthFlowSignUp,
  [AuthFlowStepType.SignUpInfo]: () => <>SignUpInfo</>,
  [AuthFlowStepType.SmsCodeSignIn]: AuthFlowSmsCodeSignIn,
  [AuthFlowStepType.PasswordSignIn]: () => <>PasswordSignIn</>,
};

export const AuthFlowStepDispatcher = () => {
  const { authFlowStepType } = useAuthFlow();
  const AuthFlowForm = authFlowStepType ? authFlowSteps[authFlowStepType] : AuthFlowInit;

  return <AuthFlowForm />;
};
