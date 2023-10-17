import { isAuthenticated } from '@users/users.helpers';
import type { ReactNode } from 'react';

type HomeLayoutProps = {
  authenticated: ReactNode;
  unauthenticated: ReactNode;
};

const HomeLayout = async ({ authenticated, unauthenticated }: HomeLayoutProps) => {
  const isConnected = await isAuthenticated();
  return <>{isConnected ? authenticated : unauthenticated}</>;
};

export default HomeLayout;
