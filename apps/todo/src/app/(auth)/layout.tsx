import { AuthFlowStepDispatcher } from '@auth/components/auth-flow-step-dispatcher';
import { AuthFlowProvider } from '@auth/components/auth-flow-provider';
import { PropsWithChildren } from 'react';

type AuthLayoutProps = PropsWithChildren;

const AuthLayout = ({ children }: AuthLayoutProps) => (
  <AuthFlowProvider>
    {children}
    <AuthFlowStepDispatcher />
  </AuthFlowProvider>
);

export default AuthLayout;
