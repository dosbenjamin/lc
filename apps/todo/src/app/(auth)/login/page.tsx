import { AuthFlowProvider } from '@users/components/auth-flow-provider';
import { AuthFlowFormDispatcher } from '@users/components/auth-flow-form-dispatcher';

const LoginPage = () => (
  <AuthFlowProvider>
    <AuthFlowFormDispatcher />
  </AuthFlowProvider>
);

export default LoginPage;
