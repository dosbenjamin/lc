import { authContract } from '@auth/auth.contract';
import { ClientInferResponseBody } from '@ts-rest/core';

export const AuthFlowType = {
  SignUp: 'SignUp',
  SmsCodeSignIn: 'SmsCodeSignIn',
  PasswordSignIn: 'PasswordSignIn',
} as const;
export type AuthFlowType = (typeof AuthFlowType)[keyof typeof AuthFlowType];

export const AuthFlowFormType = {
  AuthInit: 'AuthInit',
  SignUp: 'SignUp',
  SignUpInfo: 'SignUpInfo',
  SmsCodeSignIn: 'SmsCodeSignIn',
  PasswordSignIn: 'PasswordSignIn',
} as const;
export type AuthFlowFormType = (typeof AuthFlowFormType)[keyof typeof AuthFlowFormType];

export const SignInCredentialsType = {
  SmsCode: 'SmsCode',
  Password: 'Password',
} as const;
export type SignInCredentialsType = (typeof SignInCredentialsType)[keyof typeof SignInCredentialsType];

export type AuthFlow = {
  type?: AuthFlowType;
  formType: AuthFlowFormType;
} & Partial<ClientInferResponseBody<typeof authContract.init, 200>>;
