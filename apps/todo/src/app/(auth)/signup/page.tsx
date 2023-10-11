import { AuthFlowProvider } from '@auth/components/auth-flow-provider';
import { AuthFlowFormDispatcher } from '@auth/components/auth-flow-form-dispatcher';

const SignUpPage = () => (
  <AuthFlowProvider>
    <AuthFlowFormDispatcher />
  </AuthFlowProvider>
);

export default SignUpPage;
