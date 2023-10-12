'use client';

import { AuthFlowFormType } from '@users/users.types';
import { AuthFlowInitForm } from '@users/components/auth-flow-init-form';
import { useAuthFlow } from '@users/hooks/use-auth-flow';
import { FC } from 'react';
import { AuthFlowSignUpInfoForm } from '@users/components/auth-flow-sign-up-info-form';
import { AuthFlowSignUpForm } from '@users/components/auth-flow-sign-up-form';
import { AuthFlowSmsCodeSignInForm } from '@users/components/auth-flow-sms-code-sign-in-form';
import { AuthFlowPasswordSignInForm } from '@users/components/auth-flow-password-sign-in-form';

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
