import { authContract } from '@auth/auth.contract';
import { ClientInferResponseBody } from '@ts-rest/core';

export const AuthFlowType = {
  SignUp: 'SignUp',
  SmsCodeSignIn: 'SmsCodeSignIn',
  PasswordSignIn: 'PasswordSignIn',
} as const;
export type AuthFlowType = (typeof AuthFlowType)[keyof typeof AuthFlowType];

export const AuthFlowStepType = {
  SignUp: 'SignUp',
  SignUpInfo: 'SignUpInfo',
  SmsCodeSignIn: 'SmsCodeSignIn',
  PasswordSignIn: 'PasswordSignIn',
} as const;
export type AuthFlowStepType = (typeof AuthFlowStepType)[keyof typeof AuthFlowStepType];

export const SignInCredentialsType = {
  SmsCode: 'SmsCode',
  Password: 'Password',
} as const;
export type SignInCredentialsType = (typeof SignInCredentialsType)[keyof typeof SignInCredentialsType];

export type AuthFlow = {
  type: AuthFlowType | undefined;
} & ClientInferResponseBody<typeof authContract.init, 200>;
