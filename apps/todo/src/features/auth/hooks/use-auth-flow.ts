import { AuthFlowContext } from '@auth/contexts/auth-flow-context';
import { ContextType, useContext } from 'react';

export const useAuthFlow = (): NonNullable<ContextType<typeof AuthFlowContext>> => {
  const context = useContext(AuthFlowContext);

  if (!context) {
    throw new Error('useAuthFlow must be used within AuthFlowProvider');
  }

  return context;
};
