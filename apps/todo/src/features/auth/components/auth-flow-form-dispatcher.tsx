'use client';

import { AuthFlowFormType } from '@auth/auth.types';
import { AuthFlowInitForm } from '@auth/components/auth-flow-init-form';
import { useAuthFlow } from '@auth/hooks/use-auth-flow';
import { FC } from 'react';
import { AuthFlowSignUpInfoForm } from '@auth/components/auth-flow-sign-up-info-form';
import { AuthFlowSignUpForm } from '@auth/components/auth-flow-sign-up-form';
import { AuthFlowSmsCodeSignInForm } from '@auth/components/auth-flow-sms-code-sign-in-form';
import { AuthFlowPasswordSignInForm } from '@auth/components/auth-flow-password-sign-in-form';

const authFlowForms: Record<AuthFlowFormType, FC> = {
  [AuthFlowFormType.AuthInit]: AuthFlowInitForm,
  [AuthFlowFormType.SignUp]: AuthFlowSignUpForm,
  [AuthFlowFormType.SignUpInfo]: AuthFlowSignUpInfoForm,
  [AuthFlowFormType.SmsCodeSignIn]: AuthFlowSmsCodeSignInForm,
  [AuthFlowFormType.PasswordSignIn]: AuthFlowPasswordSignInForm,
};

export const AuthFlowFormDispatcher = () => {
  const { authFlow } = useAuthFlow();
  const AuthFlowForm = authFlowForms[authFlow.formType];

  return <AuthFlowForm />;
};
