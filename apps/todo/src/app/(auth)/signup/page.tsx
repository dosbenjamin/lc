import { AuthFlowProvider } from '@users/components/auth-flow-provider';
import { AuthFlowFormDispatcher } from '@users/components/auth-flow-form-dispatcher';

const SignUpPage = () => (
  <AuthFlowProvider>
    <AuthFlowFormDispatcher />
  </AuthFlowProvider>
);

export default SignUpPage;
